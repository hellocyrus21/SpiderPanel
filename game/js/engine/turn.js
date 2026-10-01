// =====================================================================
// سیستم نوبت: هر نوبت = یک ماه
// ---------------------------------------------------------------------
// ترتیب هر نوبت:
//   ۱) بازار جهانی (قیمت انرژی)
//   ۲) اقتصاد همه‌ی کشورها (با قوانین یکسان)
//   ۳) بررسی وضعیت بازیکن ← اعلان‌ها (وزیر اقتصاد، وزیر کشور، ...)
//   ۴) اخبار جهان (بحران در کشورهای دیگر)
//   ۵) جلو رفتن تاریخ، بررسی فروپاشی
// =====================================================================
(function (SG) {
  'use strict';
  const N = SG.Notify;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  /** عبور از آستانه‌ی رو به پایین (مثلاً ثبات از ۴۵ به زیر ۴۵) */
  const crossedDown = (before, after, t) => before >= t && after < t;
  const crossedUp = (before, after, t) => before < t && after >= t;

  function advance(state) {
    if (state.gameOver) return [];
    const rng = SG.Rng.create(state.rngState);
    const firstNew = (state.nextNotificationId || 0) + 1;
    const pid = state.playerId;
    const player = state.countries[pid];

    // ---------- ۱) قیمت انرژی: نوسان تصادفی با بازگشت به میانگین ----------
    const w = state.world;
    const oldPrice = w.energyPrice;
    w.energyPrice = clamp(w.energyPrice + (0.6 - w.energyPrice) * 0.08 + rng.range(-0.035, 0.035), 0.3, 1.2);

    // تاریخ نوبت جدید (اعلان‌ها با تاریخ جدید ثبت می‌شوند)
    state.turn++;
    state.date.month++;
    if (state.date.month > 12) { state.date.month = 1; state.date.year++; }

    // ---------- ۲) اقتصاد همه‌ی کشورها ----------
    const before = {};
    for (const c of Object.values(state.countries)) {
      before[c.id] = { stability: c.stability, gdp: c.gdp, inflation: c.eco.inflation, debt: c.eco.debt / c.gdp };
    }
    const playerEvents = [];
    for (const id of Object.keys(state.countries)) {
      const ev = SG.Economy.step(state, id, rng);
      if (id === pid) playerEvents.push(...ev);
    }
    w.gdp = Object.values(state.countries).reduce((s, c) => s + c.gdp, 0);

    // ---------- ۲ب) ارتش بازیکن: تولید، حرکت، تدارکات ----------
    const milEvents = SG.Military.step(state, pid, rng);

    // تاریخچه‌ی بازیکن (برای گزارش و نمودار)
    player.eco.history.push({ turn: state.turn, gdp: Math.round(player.gdp), treasury: Math.round(player.eco.treasury), stability: Math.round(player.stability) });
    if (player.eco.history.length > 240) player.eco.history.shift();

    // ---------- ۳) اعلان‌های بازیکن ----------
    playerChecks(state, rng, before[pid], playerEvents, oldPrice);
    militaryNotifications(state, milEvents);

    // ---------- ۴) اخبار جهان ----------
    worldNews(state, rng, before);

    // ---------- ۵) فروپاشی ----------
    if (player.stability <= 5) state.collapseCounter = (state.collapseCounter || 0) + 1;
    else state.collapseCounter = 0;
    if (state.collapseCounter >= 3) {
      state.gameOver = { reason: 'collapse', turn: state.turn };
      N.add(state, { type: 'game_over_collapse', level: 'critical', category: 'domestic', speaker: 'interior', focus: pid });
    }

    state.rngState = rng.getState();
    return state.notifications.filter(n => n.id >= firstNew);
  }

  // -------------------------------------------------------------------
  function playerChecks(state, rng, b, events, oldPrice) {
    const pid = state.playerId;
    const c = state.countries[pid];
    const e = c.eco;
    const Eco = SG.Economy;
    const budget = Eco.computeBudget(state, pid);

    // --- خزانه و بودجه ---
    for (const ev of events) {
      if (ev.type === 'borrowed') {
        if (N.cooldownOk(state, 'borrowed', 3)) {
          N.add(state, { type: 'treasury_borrowed', level: 'warning', category: 'economy', speaker: 'economy', data: { amount: ev.amount, debtPct: e.debt / c.gdp * 100 } });
        }
      } else if (ev.type === 'printed') {
        if (N.cooldownOk(state, 'printed', 4)) {
          N.add(state, { type: 'treasury_printed', level: 'warning', category: 'economy', speaker: 'economy', data: { amount: ev.amount } });
        }
      }
    }
    const months = Eco.monthsOfReserve(state, pid);
    if (months < 4 && e.treasury > 0 && N.cooldownOk(state, 'budget_soon', 3)) {
      N.add(state, { type: 'budget_negative_soon', level: 'warning', category: 'economy', speaker: 'economy', data: { turns: Math.max(1, Math.floor(months)), deficit: -budget.monthly } });
    }

    // --- بدهی ---
    const debtNow = e.debt / c.gdp;
    if (crossedUp(b.debt, debtNow, 1) || crossedUp(b.debt, debtNow, 1.5)) {
      N.add(state, { type: 'debt_high', level: 'warning', category: 'economy', speaker: 'economy', data: { debtPct: debtNow * 100, rate: budget.rate * 100 } });
    }

    // --- تورم ---
    for (const t of [20, 40, 80]) {
      if (crossedUp(b.inflation, e.inflation, t)) {
        N.add(state, { type: 'inflation_high', level: t >= 40 ? 'warning' : 'info', category: 'economy', speaker: 'economy', data: { inflation: e.inflation } });
      }
    }
    if (crossedDown(b.inflation, e.inflation, 10) && state.turn > 1) {
      N.add(state, { type: 'inflation_tamed', level: 'info', category: 'economy', speaker: 'economy', data: { inflation: e.inflation } });
    }

    // --- گزارش فصلی اقتصاد (هر ۳ ماه) ---
    if (state.turn % 3 === 0) {
      N.add(state, { type: 'economy_report', level: 'info', category: 'economy', speaker: 'economy', data: {
        growth: e.growth * 100, monthly: budget.monthly, treasury: e.treasury, inflation: e.inflation } });
    }

    // --- قیمت انرژی ---
    const change = (state.world.energyPrice - oldPrice) / oldPrice;
    const surplus = c.energy.production - c.energy.consumption;
    if (Math.abs(change) > 0.045 && N.cooldownOk(state, 'energy_price', 4)) {
      const good = (change > 0) === (surplus > 0);
      N.add(state, { type: change > 0 ? 'energy_price_up' : 'energy_price_down', level: good ? 'info' : 'warning', category: 'economy', speaker: 'economy',
        data: { pct: Math.abs(change) * 100, exporter: surplus > 0 } });
    }

    // --- ثبات داخلی ---
    const s0 = b.stability, s1 = c.stability;
    const capital = c.capital || c.name;
    if (crossedDown(s0, s1, 45)) N.add(state, { type: 'stability_protests', level: 'warning', category: 'domestic', speaker: 'interior', focus: pid, data: { city: capital, stability: s1 } });
    if (crossedDown(s0, s1, 25)) N.add(state, { type: 'stability_riots', level: 'critical', category: 'domestic', speaker: 'interior', focus: pid, data: { city: capital, stability: s1 } });
    if (crossedDown(s0, s1, 10)) N.add(state, { type: 'stability_coup_risk', level: 'critical', category: 'domestic', speaker: 'intel', focus: pid, data: { stability: s1 } });
    if (crossedUp(s0, s1, 55) && state.turn > 1) N.add(state, { type: 'stability_recovered', level: 'info', category: 'domestic', speaker: 'interior', data: { stability: s1 } });
    // هشدار روند: ثبات در حال سقوط سریع
    if (s0 - s1 > 2.5 && s1 < 60 && N.cooldownOk(state, 'stab_falling', 4)) {
      N.add(state, { type: 'stability_falling', level: 'warning', category: 'domestic', speaker: 'interior', data: { stability: s1 } });
    }

    // --- سال نو ---
    if (state.date.month === 1) {
      N.add(state, { type: 'new_year', level: 'info', category: 'world', speaker: 'news', data: { year: state.date.year } });
    }
  }

  // -------------------------------------------------------------------
  function militaryNotifications(state, events) {
    const pid = state.playerId;
    const c = state.countries[pid];
    for (const ev of events) {
      if (ev.type === 'built') {
        N.add(state, { type: 'unit_built', level: 'info', category: 'military', speaker: 'commander',
          data: { unit: ev.unit, qty: ev.qty } });
      } else if (ev.type === 'arrived') {
        const a = SG.Military.findArmy(state, pid, ev.army);
        if (!a) continue;
        if (ev.kind === 'home') {
          N.add(state, { type: 'army_home', level: 'info', category: 'military', speaker: 'commander', focus: pid,
            data: { army: a.name, commander: a.commander.name, armyId: a.id } });
          continue;
        }
        N.add(state, { type: 'army_arrived', level: 'warning', category: 'military', speaker: 'commander', focus: ev.target,
          data: { army: a.name, commander: a.commander.name, country: ev.target, armyId: a.id } });
        // تجمع نیرو در مرز، همسایه را نگران می‌کند
        const k = SG.Engine.relKey(pid, ev.target);
        state.relations[k] = Math.max(-100, (state.relations[k] ?? 0) - 4);
        if (N.cooldownOk(state, 'massing_' + ev.target, 4)) {
          N.add(state, { type: 'border_tension', level: 'info', category: 'diplomacy', speaker: 'foreign', focus: ev.target,
            data: { country: ev.target } });
        }
      } else if (ev.type === 'supply_low') {
        const a = SG.Military.findArmy(state, pid, ev.army);
        if (a) N.add(state, { type: 'army_supply_low', level: 'warning', category: 'military', speaker: 'commander',
          data: { army: a.name, commander: a.commander.name, supply: a.supply, armyId: a.id } });
      }
    }
    // هزینه‌ی سنگین ارتش
    const share = SG.Military.upkeepMonthly(c) * 12 / c.gdp;
    if (share > 0.08 && N.cooldownOk(state, 'mil_costly', 6)) {
      N.add(state, { type: 'military_costly', level: 'warning', category: 'economy', speaker: 'economy',
        data: { pct: share * 100 } });
    }
  }

  // -------------------------------------------------------------------
  function worldNews(state, rng, before) {
    const pid = state.playerId;
    const all = Object.values(state.countries);

    // بحران در کشورهای دیگر (فقط کشورهای با جمعیت قابل‌توجه، برای جلوگیری از اسپم)
    for (const c of all) {
      if (c.id === pid || c.population < 5) continue;
      const b = before[c.id];
      if (crossedDown(b.stability, c.stability, 25) && N.cooldownOk(state, 'unrest_' + c.id, 18)) {
        N.add(state, { type: 'world_unrest', level: 'info', category: 'world', speaker: 'news', focus: c.id, groupKey: 'unrest', data: { country: c.id } });
      }
      if (crossedUp(b.inflation, c.eco.inflation, 50)) {
        N.add(state, { type: 'world_inflation', level: 'info', category: 'world', speaker: 'news', focus: c.id, data: { country: c.id, inflation: c.eco.inflation } });
      }
    }

    // جابه‌جایی رتبه‌ی اقتصادهای بزرگ (۱۵ اقتصاد اول)
    const rankNow = all.slice().sort((a, b) => b.gdp - a.gdp).slice(0, 15).map(c => c.id);
    const prev = state.world.topGdp;
    if (prev) {
      for (let i = 0; i < rankNow.length; i++) {
        const id = rankNow[i], j = prev.indexOf(id);
        if (j > i && prev[i] && rankNow.indexOf(prev[i]) > i) {
          N.add(state, { type: 'world_gdp_overtake', level: id === pid || prev[i] === pid ? 'warning' : 'info', category: 'world', speaker: 'news', focus: id,
            data: { country: id, other: prev[i], rank: i + 1 } });
        }
      }
    }
    state.world.topGdp = rankNow;

    // جنگ‌های در جریان: گاه‌به‌گاه خبر
    for (const [a, b] of state.wars) {
      if (a !== pid && b !== pid && rng.next() < 0.07) {
        N.add(state, { type: 'world_war_ongoing', level: 'info', category: 'world', speaker: 'news', focus: b, data: { a, b } });
      }
    }
  }

  SG.Turn = { advance };
})(window.SG = window.SG || {});

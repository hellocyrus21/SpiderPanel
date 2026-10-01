// =====================================================================
// سیستم نوبت: هر نوبت = یک ماه
// ---------------------------------------------------------------------
// ترتیب هر نوبت:
//   ۱) بازار جهانی (قیمت انرژی)
//   ۲) اقتصاد همه‌ی کشورها (با قوانین یکسان)
//   ۲ب) ارتش بازیکن (تولید، حرکت، تدارکات) و تحویل سلاح‌های خریداری‌شده
//   ۲ج) جنگ‌ها: هوش مصنوعی، نبرد شهرها، تصرف، خستگی جنگ، صلح (engine/war.js)
//   ۳) بررسی وضعیت بازیکن ← اعلان‌ها (وزیر اقتصاد، وزیر کشور، ...)
//   ۴) اخبار جهان (بحران در کشورهای دیگر)
//   ۵) بررسی فروپاشی
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
    const active = SG.Engine.activeCountries(state);   // کشورهای الحاق‌شده دیگر اقتصاد جدا ندارند
    const before = {};
    for (const c of active) {
      before[c.id] = { stability: c.stability, gdp: c.gdp, inflation: c.eco.inflation, debt: c.eco.debt / c.gdp };
    }
    const playerEvents = [];
    for (const c of active) {
      const ev = SG.Economy.step(state, c.id, rng);
      if (c.id === pid) playerEvents.push(...ev);
    }
    w.gdp = active.reduce((s, c) => s + c.gdp, 0);

    // ---------- ۲ب) ارتش بازیکن: تولید، حرکت، تدارکات + سلاح‌های خریداری‌شده ----------
    const milEvents = SG.Military.step(state, pid);
    const armsEvents = SG.Arms.step(state, pid);

    // ---------- ۲ج) جنگ‌ها ----------
    const warEvents = SG.War.step(state, rng);
    // تلفات نبرد ← نیروها، شاخص‌ها و هزینه‌ی ارتش بازیکن به‌روز
    SG.Military.syncForces(player);
    SG.Military.refreshIndices(player);
    player.eco.policy.military = (SG.Military.upkeepMonthly(player) + SG.Military.productionCostMonthly(state, player)) * 12 / player.gdp;

    // تاریخچه‌ی بازیکن (برای گزارش و نمودار)
    player.eco.history.push({ turn: state.turn, gdp: Math.round(player.gdp), treasury: Math.round(player.eco.treasury), stability: Math.round(player.stability) });
    if (player.eco.history.length > 240) player.eco.history.shift();

    // ---------- ۳) اعلان‌های بازیکن ----------
    playerChecks(state, rng, before[pid], playerEvents, oldPrice);
    militaryNotifications(state, milEvents);
    armsNotifications(state, armsEvents);
    warNotifications(state, warEvents);

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
    const chief = c.mil.chief;
    const defs = window.SG_DATA.units;
    const listText = units => Object.entries(units).map(([k, n]) => `${n.toLocaleString('fa-IR')} ${defs[k].unitWord} ${defs[k].short}`).join('، ');
    for (const ev of events) {
      if (ev.type === 'delivered') {
        N.add(state, { type: 'units_delivered', level: 'info', category: 'military', speaker: 'commander',
          data: { commander: chief, list: listText(ev.units) } });
      } else if (ev.type === 'factory_done') {
        N.add(state, { type: 'factory_done', level: 'warning', category: 'military', speaker: 'commander',
          data: { commander: chief, unit: ev.unit, factories: ev.count } });
      } else if (ev.type === 'arrived') {
        const borders = ev.list.filter(a => a.dest.kind === 'border');
        const cities = ev.list.filter(a => a.dest.kind === 'city');
        // رسیدن به مرز: یک اعلان برای هر مرز
        const byTarget = {};
        for (const a of borders) (byTarget[a.dest.target] ||= []).push(a);
        for (const [target, list] of Object.entries(byTarget)) {
          const units = {};
          for (const a of list) units[a.type] = (units[a.type] || 0) + a.count;
          N.add(state, { type: 'forces_at_border', level: 'warning', category: 'military', speaker: 'commander', focus: target,
            groupKey: target, data: { commander: chief, country: target, list: listText(units), stackId: list[0].stackId } });
          // تجمع نیرو در مرز، همسایه را نگران می‌کند
          const k = SG.Engine.relKey(pid, target);
          state.relations[k] = Math.max(-100, (state.relations[k] ?? 0) - 4);
          if (N.cooldownOk(state, 'massing_' + target, 4)) {
            N.add(state, { type: 'border_tension', level: 'info', category: 'diplomacy', speaker: 'foreign', focus: target, data: { country: target } });
          }
        }
        if (cities.length) {
          const units = {};
          for (const a of cities) units[a.type] = (units[a.type] || 0) + a.count;
          N.add(state, { type: 'forces_relocated', level: 'info', category: 'military', speaker: 'commander',
            data: { commander: chief, list: listText(units) } });
        }
      } else if (ev.type === 'supply_low') {
        if (N.cooldownOk(state, 'supply_low', 3)) {
          N.add(state, { type: 'supply_low', level: 'warning', category: 'military', speaker: 'commander',
            data: { commander: chief, unit: ev.unit, stackId: ev.stack } });
        }
      }
    }
    // هزینه‌ی سنگین ارتش
    const share = (SG.Military.upkeepMonthly(c) + SG.Military.productionCostMonthly(state, c)) * 12 / c.gdp;
    if (share > 0.08 && N.cooldownOk(state, 'mil_costly', 6)) {
      N.add(state, { type: 'military_costly', level: 'warning', category: 'economy', speaker: 'economy', data: { pct: share * 100 } });
    }
  }

  // -------------------------------------------------------------------
  function worldNews(state, rng, before) {
    const pid = state.playerId;
    const all = SG.Engine.activeCountries(state);

    // بحران در کشورهای دیگر (فقط کشورهای با جمعیت قابل‌توجه، برای جلوگیری از اسپم)
    for (const c of all) {
      if (c.id === pid || c.population < 5) continue;
      const b = before[c.id];
      if (!b) continue;
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

    // جنگ‌های در جریان: گاه‌به‌گاه خبر (یک خبر برای هر جنگ، نه برای هر جفت متحد)
    for (const war of state.warsInfo || []) {
      const a = war.leaders.A, b = war.leaders.B;
      if (a !== pid && b !== pid && !SG.War.sideOf(war, pid) && rng.next() < 0.07) {
        N.add(state, { type: 'world_war_ongoing', level: 'info', category: 'world', speaker: 'news', focus: b, data: { a, b } });
      }
    }
  }

  // -------------------------------------------------------------------
  function armsNotifications(state, events) {
    const chief = state.countries[state.playerId].mil.chief;
    for (const ev of events) {
      if (ev.type === 'arms_delivered') {
        N.add(state, { type: 'arms_delivered', level: 'warning', category: 'military', speaker: 'commander',
          data: { commander: chief, country: ev.seller, unit: ev.unit, qty: ev.count, city: ev.city, stackId: ev.stackId } });
      } else if (ev.type === 'arms_cancelled') {
        N.add(state, { type: 'arms_cancelled', level: 'warning', category: 'diplomacy', speaker: 'foreign', focus: ev.seller,
          data: { country: ev.seller, unit: ev.unit, qty: ev.count, amount: ev.refund } });
      }
    }
  }

  // -------------------------------------------------------------------
  function warNotifications(state, events) {
    const pid = state.playerId;
    const c = state.countries[pid];
    const chief = c.mil.chief;
    const W = SG.War;
    const defs = window.SG_DATA.units;
    const listText = units => Object.entries(units).map(([k, n]) => `${n.toLocaleString('fa-IR')} ${defs[k].unitWord} ${defs[k].short}`).join('، ');
    for (const ev of events) {
      if (ev.type === 'battle') {
        const r = ev.report;
        const weAtt = r.att.owners.includes(pid);
        const ours = weAtt ? r.att : r.def, theirs = weAtt ? r.def : r.att;
        const won = (r.result === 'att') === weAtt;
        // فهرست تلفات: «۱.۲ لشکر پیاده، ۴۰ قبضه توپ»
        const lossOf = side => {
          const list = {};
          for (const [k, [, l]] of Object.entries({ ...side.units, ...side.support })) {
            const v = defs[k].counted === 'unit' ? Math.round(l * 10) / 10 : Math.round(l);
            if (v > 0 && !['ballistic', 'cruise', 'drone'].includes(k)) list[k] = v;
          }
          return Object.keys(list).length ? listText(list) : '—';
        };
        if (ev.fresh && !r.fell) {
          N.add(state, { type: weAtt ? 'battle_started' : 'battle_defending', level: 'warning', category: 'military', speaker: 'commander',
            focus: r.country, groupKey: r.city, data: { commander: chief, city: r.cityName, country: theirs.owners[0], rid: r.id, war: r.war } });
        }
        if (!r.fell) {
          N.add(state, { type: won ? 'battle_won' : 'battle_lost', level: 'info', category: 'military', speaker: 'commander', focus: r.country,
            groupKey: r.city, data: { commander: chief, city: r.cityName, ratio: Math.round((weAtt ? r.ratio : 1 / Math.max(r.ratio, 1e-6)) * 10) / 10,
              ours: lossOf(ours), theirs: lossOf(theirs), rid: r.id, war: r.war, cityId: r.city } });
          // در حال باختن در حمله ← پیشنهاد عقب‌نشینی
          if (weAtt && r.ratio < 0.7 && N.cooldownOk(state, 'losing_' + r.city, 3)) {
            N.add(state, { type: 'battle_losing', level: 'warning', category: 'military', speaker: 'commander', focus: r.country,
              data: { commander: chief, city: r.cityName, cityId: r.city, rid: r.id, war: r.war } });
          }
        }
        // مهمات: تدارکات دسته‌های درگیر ما
        for (const s of c.mil.stacks) {
          if (!s.inBattle || s.supply >= 40) continue;
          if (N.cooldownOk(state, 'ammo_' + s.id, 4)) {
            N.add(state, { type: 'ammo_low', level: 'warning', category: 'military', speaker: 'commander', focus: r.country,
              data: { commander: chief, city: r.cityName, turns: Math.max(1, Math.ceil((s.supply - 10) / 10)), unit: s.type, stackId: s.id } });
          }
        }
      } else if (ev.type === 'captured') {
        const city = W.cityById(state, ev.city);
        const orig = W.origOf(ev.city);
        if (!ev.playerWar) {
          // جنگ‌های دیگران: خبر
          N.add(state, { type: 'world_city_captured', level: 'info', category: 'world', speaker: 'news', focus: orig, groupKey: 'wcc',
            data: { city: city.name, country: ev.by, other: ev.from } });
        } else if (ev.by === pid) {
          N.add(state, { type: ev.liberated ? 'city_liberated' : 'city_captured', level: 'warning', category: 'military', speaker: 'commander', focus: orig,
            data: { commander: chief, city: city.name, country: orig, rid: ev.report, war: ev.war, cityId: ev.city } });
        } else if (ev.from === pid) {
          N.add(state, { type: 'city_lost', level: 'critical', category: 'military', speaker: 'commander', focus: orig,
            data: { commander: chief, city: city.name, country: ev.by, rid: ev.report, war: ev.war, cityId: ev.city } });
        } else {
          // متحد یا دشمن دیگرِ همین جنگ
          N.add(state, { type: 'war_city_changed', level: 'info', category: 'military', speaker: 'intel', focus: orig,
            data: { city: city.name, country: ev.by, other: ev.from } });
        }
      } else if (ev.type === 'weariness') {
        N.add(state, { type: 'war_weariness', level: 'warning', category: 'domestic', speaker: 'interior', data: { pct: ev.level } });
      }
    }
  }

  SG.Turn = { advance };
})(window.SG = window.SG || {});

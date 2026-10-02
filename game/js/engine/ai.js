// =====================================================================
// هوش مصنوعی کشورها (مرحله‌ی ۵)
// ---------------------------------------------------------------------
// هر کشور غیر بازیکن هر نوبت (کشورهای مهم) یا هر ۳ تا ۵ نوبت (بقیه) «فکر» می‌کند.
// ورودی‌ها: رابطه‌ها، پیمان‌ها، تجارت، تهدید، قدرت نظامی و اقتصادی خودش، ثبات،
// و «شخصیت» تصادفی در هر بازی: تهاجمی / محتاط / فرصت‌طلب / تجاری.
// برای هر گزینه امتیاز حساب می‌شود و بهترین (اگر از آستانه بگذرد) اجرا می‌شود.
// بدون تقلب: AI همان فرمان‌ها، اسلایدرها، تولید کارخانه، خرید سلاح، دیپلماسی و جنگ بازیکن را دارد.
// بدون سناریوی از پیش نوشته: همه‌چیز از وضعیت لحظه‌ای.
// جنگ‌ها عمداً نادرند (بازی بیشتر روی اقتصاد و دیپلماسی می‌چرخد) و با گذشت زمان بحران بیشتر می‌شود.
// =====================================================================
(function (SG) {
  'use strict';
  const D = () => window.SG_DATA;
  const E = () => SG.Engine, M = () => SG.Military, W = () => SG.War, Dp = () => SG.Diplomacy, N = () => SG.Notify;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  const PERSONALITIES = ['aggressive', 'cautious', 'opportunist', 'mercantile'];
  // احتمال هر شخصیت بر اساس نوع حکومت (دموکراسی‌ها بیشتر محتاط/تجاری)
  const WEIGHTS = { D: [0.08, 0.42, 0.15, 0.35], H: [0.2, 0.32, 0.28, 0.2], A: [0.3, 0.25, 0.3, 0.15], M: [0.18, 0.32, 0.25, 0.25], T: [0.35, 0.25, 0.3, 0.1] };
  const WAR_BASE = { aggressive: 10, opportunist: 0, cautious: -20, mercantile: -25 };
  const MAX_AI_WARS = 2;          // حداکثر جنگ هم‌زمانی که هوش مصنوعی شروع کرده
  const AI_WAR_GAP = 8;           // فاصله‌ی دو اعلان جنگ هوش مصنوعی (ماه)
  const FIRST_AI_WAR = 12;        // سال اول جنگ تازه‌ای شروع نمی‌شود

  const hash = id => (id.charCodeAt(0) * 7 + id.charCodeAt(1) * 13 + id.charCodeAt(2) * 31);
  const isP = (state, id) => id === state.playerId;
  const rel = (state, a, b) => E().getRelation(state, a, b);

  /** شخصیت‌ها (هر بازی تصادفی) */
  function init(state, rng) {
    for (const c of Object.values(state.countries)) {
      const w = WEIGHTS[c.gov] || WEIGHTS.H;
      let x = rng.next(), i = 0;
      while (i < 3 && x > w[i]) { x -= w[i]; i++; }
      c.ai = { personality: PERSONALITIES[i], next: hash(c.id) % 4 };
      c.aggression = c.aggression || 0;
    }
  }

  // -------------------------------------------------------------------
  // وضعیت تهدید یک کشور
  // -------------------------------------------------------------------
  /** دشمن‌های خطرناک: همسایه یا در جنگ، با رابطه‌ی ≤ ۵۰- */
  function threatInfo(state, c) {
    const near = new Set([...c.neighbors, ...c.seaNeighbors]);
    let maxEnemy = 0, enemy = null;
    for (const id of near) {
      const o = state.countries[id];
      if (!o || o.annexedBy) continue;
      let r = rel(state, c.id, id);
      // بازیکنِ تهدیدآمیز را بیشتر دشمن می‌بینند (سختی با زمان بالا می‌رود)
      if (isP(state, id)) r -= Dp().threatOf(state, id) * 0.4 * Dp().timeFactor(state);
      if (r > -50 && !E().isAtWar(state, c.id, id)) continue;
      const p = E().militaryPower(o);
      if (p > maxEnemy) { maxEnemy = p; enemy = id; }
    }
    const atWar = E().warsOf(state, c.id).length > 0;
    return { atWar, enemy, threatened: atWar || maxEnemy > E().militaryPower(c) * 0.9 };
  }

  // -------------------------------------------------------------------
  // اقتصاد: همان اسلایدرها و فرمان‌های بازیکن، فقط در بحران
  // -------------------------------------------------------------------
  function economy(state, c, ti) {
    const A = SG.Actions, Eco = SG.Economy, e = c.eco, ref = e.ref;
    const b = Eco.computeBudget(state, c.id);
    const months = Eco.monthsOfReserve(state, c.id);
    if (b.monthly < 0 && months < 6) {
      if (e.taxRate < ref.tax + 0.06) A.setPolicy(state, c.id, 'taxRate', e.taxRate + 0.01);
      else if (e.policy.welfare > ref.welfare * 0.75) A.setPolicy(state, c.id, 'welfare', e.policy.welfare - 0.005);
    } else if (b.monthly > 0 && e.treasury > c.gdp * 0.15 && e.taxRate > ref.tax + 0.005) {
      A.setPolicy(state, c.id, 'taxRate', e.taxRate - 0.01);
    }
    if (c.stability < 35) {
      if (A.status(state, c.id, 'welfare_package').ready) A.perform(state, c.id, 'welfare_package');
      else if (c.stability < 28 && e.policy.welfare < ref.welfare * 1.3) A.setPolicy(state, c.id, 'welfare', e.policy.welfare + 0.005);
    }
    if (e.inflation > 40 && e.printedRecent && A.status(state, c.id, 'austerity').ready) A.perform(state, c.id, 'austerity');
    // بودجه‌ی نظامی: در خطر بیشتر، در آرامش به حالت عادی برمی‌گردد
    const goal = ref.military * (ti.atWar ? 1.8 : ti.threatened ? 1.35 : 1);
    A.setPolicy(state, c.id, 'military', e.policy.military + (goal - e.policy.military) * 0.15);
  }

  // -------------------------------------------------------------------
  // تولید کارخانه‌ها (همان تولید ثابت بازیکن)، محدود به بودجه‌ی نظامی
  // -------------------------------------------------------------------
  function produce(state, c, ti) {
    const defs = D().units;
    const perCap = c.gdp / Math.max(c.population, 0.001);
    const cf = clamp(perCap / 40, 0.35, 1.3);
    let full = 0;
    for (const t of Object.keys(defs)) full += M().productionRate(state, c, t) * defs[t].cost * cf;
    if (full <= 0) return;
    let share = ti.atWar ? 1 : ti.threatened ? 0.7 : 0.35;
    const budget = c.gdp * c.eco.policy.military / 12 * 0.3;   // سهم خرید تجهیزات از بودجه‌ی نظامی
    share = Math.min(share, budget / full);
    if (share <= 0.01) return;
    const before = W().branchSnapshot(c);
    c.aiProg ||= {};
    let any = false;
    for (const t of Object.keys(defs)) {
      const r = M().productionRate(state, c, t) * share;
      if (!r) continue;
      c.aiProg[t] = (c.aiProg[t] || 0) + r;
      const n = Math.floor(c.aiProg[t]);
      if (n > 0) { c.aiProg[t] -= n; c.forces[t] = (c.forces[t] || 0) + n; any = true; }
    }
    if (any) W().adjustAiIndex(c, before);
  }

  // -------------------------------------------------------------------
  // خرید سلاح (وقتی در خطر است)
  // -------------------------------------------------------------------
  function buyArms(state, c, ti, rng) {
    if (!ti.threatened || c.eco.treasury < c.gdp * 0.03 || rng.next() > 0.15) return;
    const en = ti.enemy && state.countries[ti.enemy];
    const enemyStrike = en ? (en.forces.missile || 0) + (en.forces.drone || 0) / 4 : 0;
    const order = enemyStrike > 300 ? ['airdefense', 'fighter', 'armor'] : ['fighter', 'armor', 'airdefense'];
    for (const type of order) {
      const offers = SG.Arms.sellersFor(state, c.id, type).filter(o => !o.reason);
      if (!offers.length) continue;
      const o = offers[0];
      const count = Math.floor(Math.min(o.capacity, c.gdp * 0.01 / Math.max(o.price, 1e-6)));
      if (count < 1) continue;
      if (isP(state, o.seller)) {
        // از بازیکن می‌خواهد بخرد ← تصمیم با بازیکن
        if ((state.proposals || []).some(p => p.type === 'arms' && p.from === c.id)) return;
        const prop = Dp().propose(state, { type: 'arms', from: c.id, to: o.seller, data: { unit: type, count, amount: count * o.price } });
        N().add(state, { type: 'arms_request', level: 'warning', category: 'diplomacy', speaker: 'foreign', focus: c.id,
          data: { country: c.id, unit: type, qty: count, amount: count * o.price, prop: prop.id } });
      } else SG.Arms.buy(state, c.id, o.seller, type, count);
      return;
    }
  }

  // -------------------------------------------------------------------
  // دیپلماسی هوش مصنوعی (هر بار حداکثر یک اقدام)
  // -------------------------------------------------------------------
  /** فهرست سریع تحریم‌ها و پیمان‌ها (هر نوبت یک بار؛ فقط برای پیدا کردن کاندیدها — اجرای واقعی دوباره بررسی می‌کند) */
  let IX = null;
  function buildIndex(state) {
    IX = { sanc: new Set(state.sanctions.map(([a, b]) => a + '>' + b)), pact: new Set(state.defensePacts.map(([a, b]) => E().relKey(a, b))),
      trade: {} };
    for (const [a, l] of Object.entries(state.trade || {})) IX.trade[a] = new Set(l);
  }
  const ixSanc = (a, b) => IX.sanc.has(a + '>' + b);
  const ixSanctioned = (a, b) => ixSanc(a, b) || ixSanc(b, a);
  const ixPact = (a, b) => IX.pact.has(E().relKey(a, b));
  const ixTrade = (a, b) => !!(IX.trade[a] && IX.trade[a].has(b));

  function diplomacy(state, c, ti, rng) {
    const P = c.ai.personality;
    const pid = state.playerId;
    const opts = [];
    const actives = E().activeCountries(state);
    // لغو تحریم وقتی رابطه بهتر شده / شکستن پیمان با کشوری که دشمن شده
    for (const [by, t] of state.sanctions) if (by === c.id && rel(state, c.id, t) > -25) opts.push({ a: 'lift', b: t, s: 40 + (P === 'mercantile' ? 15 : 0) });
    for (const [x, y] of state.defensePacts) {
      const o = x === c.id ? y : y === c.id ? x : null;
      if (o && rel(state, c.id, o) < 5) opts.push({ a: 'break', b: o, s: 35 - rel(state, c.id, o) });
    }
    // تحریم دشمن
    if (c.gdp >= 50 && P !== 'mercantile') {
      for (const o of actives) {
        if (o.id === c.id || ixSanc(c.id, o.id)) continue;
        let r = rel(state, c.id, o.id);
        if (isP(state, o.id)) r -= Dp().threatOf(state, o.id) * 0.3 * Dp().timeFactor(state);
        if (r <= -70 && !ixTrade(c.id, o.id)) opts.push({ a: 'sanction', b: o.id, s: -r - 45 + (P === 'aggressive' ? 10 : 0) });
      }
    }
    // تجارت با کشورهای دوست
    if (c.gdp >= 15) {
      for (const o of actives) {
        if (o.id === c.id || o.gdp < 15 || ixTrade(c.id, o.id)) continue;
        const r = rel(state, c.id, o.id);
        if (r < 20 || ixSanctioned(c.id, o.id) || E().isAtWar(state, c.id, o.id)) continue;
        opts.push({ a: 'trade', b: o.id, s: r * 0.5 + (P === 'mercantile' ? 20 : 0) + Math.log10(o.gdp) * 4 - (isP(state, o.id) ? 10 : 0) });
      }
    }
    // پیمان دفاعی وقتی در خطر است (یا دشمن مشترک دارد)
    if (Dp().pactCount(state, c.id) < Dp().MAX_PACTS - 1) {
      // دشمن‌های خودش یک بار حساب می‌شود (سریع‌تر از جست‌وجو برای هر کاندید)
      const myEnemies = actives.filter(x => x.id !== c.id && E().militaryPower(x) >= 25 && rel(state, c.id, x.id) <= -40).map(x => x.id);
      for (const o of actives) {
        if (o.id === c.id) continue;
        const r = rel(state, c.id, o.id);
        if (r < 55 || ixPact(c.id, o.id)) continue;
        const shared = myEnemies.find(x => x !== o.id && rel(state, o.id, x) <= -40);
        const playerThreat = pid && !isP(state, o.id) && c.neighbors.includes(pid) && Dp().threatOf(state, pid) * Dp().timeFactor(state) >= 50 ? 20 : 0;
        if (!shared && !ti.threatened && !playerThreat) continue;
        opts.push({ a: 'pact', b: o.id, s: r * 0.5 + (shared ? 20 : 0) + playerThreat + (P === 'cautious' ? 10 : 0) + E().militaryPower(o) * 0.2 });
      }
    }
    if (!opts.length) return;
    opts.sort((x, y) => y.s - x.s);
    const best = opts[0];
    if (best.s < 30 || rng.next() > 0.35) return;
    const b = best.b;
    if (isP(state, b) && (best.a === 'trade' || best.a === 'pact')) {
      // پیشنهاد به بازیکن
      if (Dp().waitOf(state, best.a, c.id, b) || (state.proposals || []).some(p => p.from === c.id && p.to === b)) return;
      const prop = Dp().propose(state, { type: best.a, from: c.id, to: b, data: {} });
      Dp().setCd(state, best.a, c.id, b);
      N().add(state, { type: best.a === 'pact' ? 'alliance_proposal' : 'trade_proposal', level: 'warning', category: 'diplomacy', speaker: 'foreign', focus: c.id,
        data: { country: c.id, prop: prop.id, amount: Dp().tradeValue(state, b, c.id) } });
      return;
    }
    const r = Dp().perform(state, c.id, b, best.a, rng);
    if (!r.ok) return;
    if (isP(state, b)) {
      const type = { sanction: 'sanctioned_us', lift: 'sanction_lifted_us', break: 'pact_broken' }[best.a];
      if (type) N().add(state, { type, level: best.a === 'lift' ? 'info' : 'warning', category: 'diplomacy', speaker: 'foreign', focus: c.id, data: { country: c.id } });
    } else if (r.accepted && pid && (best.a === 'pact' || best.a === 'sanction') && (E().militaryPower(c) >= 40 || c.neighbors.includes(pid) || state.countries[b].neighbors.includes(pid))) {
      N().add(state, { type: best.a === 'pact' ? 'world_pact' : 'world_sanction', level: 'info', category: 'world', speaker: 'news', focus: b, data: { a: c.id, b } });
    }
  }

  // -------------------------------------------------------------------
  // جنگ: نادر، با نقشه‌ی چندماهه (هشدار اطلاعاتی) و اولتیماتوم
  // -------------------------------------------------------------------
  function aiWarCount(state) { return (state.warsInfo || []).filter(w => w.aiStarted).length; }

  /** رابطه‌ی «مؤثر»: بازیکنِ تهدیدآمیز دشمن‌تر دیده می‌شود (حساسیت با زمان بالا می‌رود) */
  function effRel(state, a, b) {
    let r = rel(state, a, b);
    if (isP(state, b)) r -= Dp().threatOf(state, b) * 0.4 * Dp().timeFactor(state);
    return r;
  }

  function warScore(state, c, T, p) {
    const t = state.countries[T];
    let s = WAR_BASE[c.ai.personality] + (Math.min(p.ratio, 4) - 1.8) * 20
      + Math.max(0, -effRel(state, c.id, T) - 30) * 0.5
      + (t.stability < 35 ? 10 : 0) + (E().warsOf(state, T).length ? 15 : 0)
      - (p.justified ? 0 : 15) - (c.warWeariness || 0) * 0.5 - (c.stability < 45 ? 20 : 0);
    if (isP(state, T)) {
      const th = Dp().threatOf(state, T) * Dp().timeFactor(state);
      s += th * 0.2 + (p.ratio >= 2 && t.stability < 40 ? 10 : 0);   // «شکار» بازیکنِ ضعیف یا تهدیدآمیز
    }
    return s;
  }

  function planWar(state, c, rng) {
    if (c.ai.warPlan || E().warsOf(state, c.id).length || state.turn < FIRST_AI_WAR) return;
    if ((state.aiWarNext || 0) > state.turn || aiWarCount(state) >= MAX_AI_WARS) return;
    if ((c.warWeariness || 0) > 25 || c.stability < 30) return;
    let best = null;
    for (const T of c.neighbors) {
      const t = state.countries[T];
      if (!t || t.annexedBy) continue;
      // فقط همسایه‌ی خصمانه (بازیکنِ تهدیدآمیز خصمانه‌تر دیده می‌شود) — کشورها به همسایه‌ی خنثی حمله نمی‌کنند
      if (effRel(state, c.id, T) > -25) continue;
      if (W().canDeclare(state, c.id, T) || E().areAllied(state, c.id, T) || Dp().hasTrade(state, c.id, T)) continue;
      if (W().armyValue(c) < W().armyValue(t, 'def') * 1.6) continue;
      const p = W().predict(state, c.id, T);
      if (!p.land || p.ratio < 1.6) continue;
      const s = warScore(state, c, T, p);
      if (!best || s > best.s) best = { T, s, p };
    }
    if (!best || best.s < 35 || rng.next() > 0.12 * Dp().timeFactor(state)) return;
    c.ai.warPlan = { target: best.T, at: state.turn + 3 };
    const pid = state.playerId;
    if (best.T === pid) {
      N().add(state, { type: 'intel_war_plan', level: 'warning', category: 'military', speaker: 'intel', focus: c.id, data: { country: c.id } });
    } else if (pid && (state.countries[pid].neighbors.includes(c.id) || state.countries[pid].neighbors.includes(best.T))) {
      N().add(state, { type: 'intel_war_plan_other', level: 'info', category: 'world', speaker: 'intel', focus: best.T, data: { country: c.id, other: best.T } });
    }
  }

  function executeWar(state, c, rng) {
    const plan = c.ai.warPlan;
    if (!plan || plan.at > state.turn) return;
    c.ai.warPlan = null;
    const T = plan.target;
    if (W().canDeclare(state, c.id, T) || E().warsOf(state, c.id).length || aiWarCount(state) >= MAX_AI_WARS) return;
    const p = W().predict(state, c.id, T);
    if (p.ratio < 1.5 || effRel(state, c.id, T) > -25) return;   // در این مدت اوضاع عوض شده
    state.aiWarNext = state.turn + AI_WAR_GAP;
    const t = state.countries[T];
    if (isP(state, T)) {
      // اولتیماتوم به بازیکن: پول بده یا جنگ
      const amount = Math.round(Math.max(0, t.eco.treasury) * clamp(0.3 + 0.15 * (p.ratio - 1.5), 0.3, 0.7) * 100) / 100;
      if (amount < 0.5) { startWar(state, c.id, T, rng); return; }
      const prop = Dp().propose(state, { type: 'ultimatum', from: c.id, to: T, data: { amount } });
      N().add(state, { type: 'ai_ultimatum', level: 'critical', category: 'military', speaker: 'foreign', focus: c.id, data: { country: c.id, amount, prop: prop.id } });
      return;
    }
    const u = W().ultimatum(state, c.id, T, rng);
    const P = c.ai.personality;
    if (u.pay && (P === 'mercantile' || P === 'opportunist' || P === 'cautious' || u.amount >= t.gdp * 0.03)) {
      W().acceptTribute(state, c.id, T, u.amount);
      if (state.playerId) N().add(state, { type: 'world_tribute', level: 'info', category: 'world', speaker: 'news', focus: T, data: { a: c.id, b: T, amount: u.amount } });
      return;
    }
    startWar(state, c.id, T, rng);
  }

  function startWar(state, a, b, rng) {
    const r = W().declare(state, a, b, rng);
    r.war.aiStarted = true;
  }

  /** کمک به متحدی که در جنگ است (بعد از شروع جنگ) */
  function helpAllies(state, c, rng) {
    if (E().warsOf(state, c.id).length || (c.warWeariness || 0) > 30) return;
    for (const war of state.warsInfo || []) {
      // پیمان دفاعی است: فقط به کمک متحدی می‌آید که به او حمله شده (طرف B)
      for (const side of ['B']) {
        const leader = war.leaders[side], enemy = war.leaders.A;
        if (!E().areAllied(state, c.id, leader) || E().areAllied(state, c.id, enemy)) continue;
        const s = 45 + rel(state, c.id, leader) * 0.4 - rel(state, c.id, enemy) * 0.3 - (E().militaryPower(state.countries[enemy]) > E().militaryPower(c) * 1.5 ? 15 : 0)
          + (c.ai.personality === 'aggressive' ? 10 : c.ai.personality === 'cautious' ? -10 : 0);
        if (s > 62 && rng.next() < 0.3) {
          W().addToWar(state, war, c.id, side);
          const pid = state.playerId;
          if (pid && W().sideOf(war, pid)) {
            const ours = W().sideOf(war, pid) === side;
            N().add(state, { type: ours ? 'ally_joined_us' : 'ally_joined', level: 'warning', category: 'diplomacy', speaker: 'foreign', focus: c.id, data: { country: c.id, other: ours ? pid : leader } });
          }
          return;
        }
      }
    }
  }

  // -------------------------------------------------------------------
  // ائتلاف علیه بازیکنِ تهدیدآمیز
  // -------------------------------------------------------------------
  function coalition(state) {
    const pid = state.playerId;
    if (!pid) return;
    const p = state.countries[pid];
    const th = Dp().threatOf(state, pid) * Dp().timeFactor(state);
    state.playerThreat = Math.round(th);
    if (th < 50) return;
    const near = [...new Set([...p.neighbors, ...p.seaNeighbors])];
    let worried = 0;
    for (const id of near) {
      const c = state.countries[id];
      if (!c || c.annexedBy || E().areAllied(state, id, pid)) continue;
      if (rel(state, id, pid) < 30) { Dp().addRel(state, id, pid, -1); worried++; }
    }
    if (worried >= 2 && N().cooldownOk(state, 'coalition', 12)) {
      N().add(state, { type: 'coalition_forming', level: 'warning', category: 'diplomacy', speaker: 'intel', focus: pid, data: { n: worried, pct: Math.round(th) } });
    }
  }

  // -------------------------------------------------------------------
  // یک نوبت
  // -------------------------------------------------------------------
  function step(state, rng) {
    const pid = state.playerId;
    const actives = E().activeCountries(state);
    buildIndex(state);
    // حافظه‌ی پرخاشگری کم‌کم پاک می‌شود
    for (const c of actives) if (c.aggression) c.aggression = Math.max(0, c.aggression - 0.5);
    // پیشنهادهای بی‌جواب (۱ نوبت فرصت): اولتیماتوم ← جنگ؛ کمک به متحد ← رد
    for (const p of (state.proposals || []).slice()) {
      if (state.turn - p.turn < 1) continue;
      if (p.type === 'ultimatum' || p.type === 'ally') Dp().respond(state, p.id, false, rng);
      else state.proposals = state.proposals.filter(x => x !== p);
    }
    // تجارت رابطه را گرم می‌کند (هر ۳ ماه)
    if (state.turn % 3 === 0) {
      for (const [a, list] of Object.entries(state.trade || {})) for (const b of list) if (a < b && rel(state, a, b) < 75) Dp().addRel(state, a, b, 1);
    }
    // کشورهای مهم: قدرت‌های بزرگ، همسایه‌های بازیکن، طرف‌های جنگ
    const important = new Set(actives.slice().sort((a, b) => E().militaryPower(b) - E().militaryPower(a)).slice(0, 15).map(c => c.id));
    if (pid) for (const n of [...state.countries[pid].neighbors, ...state.countries[pid].seaNeighbors]) important.add(n);
    for (const w of state.warsInfo || []) for (const id of [...w.sides.A, ...w.sides.B]) important.add(id);

    for (const c of actives) {
      if (c.id === pid) continue;
      c.ai ||= { personality: 'cautious', next: 0 };
      const ti = threatInfo(state, c);
      produce(state, c, ti);
      if (c.armsOrders && c.armsOrders.length) SG.Arms.step(state, c.id);
      const imp = important.has(c.id);
      if (!imp && state.turn < c.ai.next) continue;
      c.ai.next = state.turn + (imp ? 1 : 3 + hash(c.id) % 3);
      economy(state, c, ti);
      buyArms(state, c, ti, rng);
      diplomacy(state, c, ti, rng);
      if (imp) { helpAllies(state, c, rng); executeWar(state, c, rng); planWar(state, c, rng); }
      research(state, c, ti, rng);
    }
    coalition(state);
  }

  // -------------------------------------------------------------------
  // درخت پیشرفت (مرحله‌ی ۶): همان قانون بازیکن — پول از خزانه، یک تحقیق در هر زمان
  // تهدیدشده ← نظامی و دکترین؛ تاجر/محتاط ← اقتصاد
  // -------------------------------------------------------------------
  function research(state, c, ti, rng) {
    if (c.research || rng.next() > 0.25) return;
    const list = SG.Tech.available(state, c).filter(n => SG.Tech.costOf(state, c, n) <= c.eco.treasury * 0.3);
    if (!list.length) return;
    const P = c.ai.personality;
    const milFirst = ti.atWar || ti.threatened || P === 'aggressive';
    const pref = list.filter(n => milFirst ? n.branch !== 'economy' : n.branch === 'economy');
    const pool = pref.length && rng.next() < 0.75 ? pref : list;
    SG.Tech.start(state, c.id, pool[Math.floor(rng.next() * pool.length)].id);
  }

  SG.AI = { init, step, threatInfo, PERSONALITIES };
})(window.SG = window.SG || {});

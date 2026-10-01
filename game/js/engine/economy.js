// =====================================================================
// موتور اقتصاد: بودجه، بدهی، تورم، رشد و ثبات داخلی
// ---------------------------------------------------------------------
// همه‌ی کشورها (بازیکن و هوش مصنوعی) با همین قوانین حساب می‌شوند؛ هیچ تقلبی نیست.
// واحد پول: میلیارد دلار. نرخ‌ها سالانه‌اند و هر نوبت (یک ماه) یک‌دوازدهم اعمال می‌شود.
//
// ایده‌ی اصلی «ثبات»: هر کشور با ثبات اولیه‌ی خودش شروع می‌کند و تا وقتی سیاست‌ها
// مثل روز اول باشند ثابت می‌ماند. تغییر مالیات، رفاه، تورم و رشد نسبت به روز اول
// آن را بالا و پایین می‌برد. پس شروع بازی پایدار است و تصمیم‌های بازیکن معنی دارند.
// =====================================================================
(function (SG) {
  'use strict';

  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  const ADMIN = 0.05;          // هزینه‌ی ثابت دولت (حقوق، آموزش، سلامت پایه) — سهم از GDP
  const ENERGY_PRICE = 0.6;    // قیمت پایه: میلیارد دلار برای هر واحد انرژی در سال
  const EXPORT_SHARE = 0.5;    // سهم دولت از درآمد صادرات انرژی
  const IMPORT_SHARE = 0.25;   // سهم دولت از هزینه‌ی واردات انرژی (یارانه/ذخیره)

  // -------------------------------------------------------------------
  // ابزار
  // -------------------------------------------------------------------
  function modSum(c, stat) {
    let s = 0;
    for (const m of c.eco.mods) if (m.stat === stat) s += m.value;
    return s;
  }

  /** فشار تحریم: سهم اقتصاد جهان که این کشور را تحریم کرده (۰ تا ۰.۶) */
  function sanctionPressure(state, id) {
    let sum = 0;
    for (const [by, target] of state.sanctions) {
      if (target === id && state.countries[by]) sum += state.countries[by].gdp;
    }
    return clamp(sum / state.world.gdp, 0, 0.6);
  }

  /**
   * اثر جنگ و فتح (engine/war.js هر نوبت c.eco.occ را حساب می‌کند):
   *   occ.gdp / occ.energy   ← سهمی از اقتصاد/انرژی کشور که دشمن اشغال کرده (از دست رفته)
   *   occ.gdpGain / energyGain ← اقتصاد/انرژی شهرهایی که ما گرفته‌ایم (میلیارد دلار / واحد انرژی)
   */
  function occOf(c) { return (c.eco && c.eco.occ) || { gdp: 0, energy: 0, gdpGain: 0, energyGain: 0 }; }

  /** تولید انرژی مؤثر (منهای میدان‌های اشغال‌شده، به‌علاوه‌ی میدان‌های تصرف‌شده) */
  function energyProduction(c) {
    const o = occOf(c);
    return c.energy.production * (1 - o.energy) + o.energyGain;
  }

  /** غرامت و باج (سالانه): { income, payments } */
  function warTransfers(state, id) {
    let income = 0, payments = 0;
    for (const r of state.reparations || []) {
      if (r.to === id) income += r.monthly * 12;
      if (r.from === id) payments += r.monthly * 12;
    }
    const c = state.countries[id];
    if (c.puppetOf && state.countries[c.puppetOf]) payments += c.gdp * TRIBUTE;
    for (const o of puppetsOf(state, id)) income += o.gdp * TRIBUTE;
    return { income, payments };
  }
  // دست‌نشانده‌ها (فقط در ذخیره‌های قدیمی) — یک بار در هر نوبت جمع می‌شوند تا بودجه سریع حساب شود
  const puppetCache = new WeakMap();
  function puppetsOf(state, id) {
    let pc = puppetCache.get(state);
    if (!pc || pc.turn !== state.turn) {
      pc = { turn: state.turn, map: {} };
      for (const o of Object.values(state.countries)) if (o.puppetOf && !o.annexedBy) (pc.map[o.puppetOf] ||= []).push(o);
      puppetCache.set(state, pc);
    }
    return pc.map[id] || [];
  }
  const TRIBUTE = 0.012;   // باج سالانه‌ی دولت دست‌نشانده: ۱.۲٪ GDP خودش

  /** نرخ بهره‌ی بدهی (سالانه) */
  function interestRate(state, c, pressure) {
    const dr = c.eco.debt / Math.max(c.gdp, 0.1);
    return 0.025 + 0.06 * pressure + Math.max(0, dr - 1) * 0.03 + Math.max(0, c.eco.inflation) / 100 * 0.15;
  }

  /** آیا این کشور می‌تواند وام بگیرد؟ (وگرنه کسری با چاپ پول جبران می‌شود) */
  function canBorrow(state, c, pressure = sanctionPressure(state, c.id)) {
    const dr = c.eco.debt / Math.max(c.gdp, 0.1);
    const perCap = c.gdp / Math.max(c.population, 0.001);
    const limit = perCap > 30 ? 2.6 : 1.4;
    return dr < limit && pressure < 0.35;
  }

  // -------------------------------------------------------------------
  // بودجه (سالانه، میلیارد دلار)
  // -------------------------------------------------------------------
  function computeBudget(state, id) {
    const c = state.countries[id];
    const e = c.eco, p = e.policy;
    const pressure = sanctionPressure(state, id);
    const price = state.world.energyPrice;

    // کارایی مالیات: کشور بی‌ثبات مالیاتش را کامل جمع نمی‌کند
    const eff = clamp(0.65 + 0.35 * c.stability / 100 + modSum(c, 'taxEff'), 0.3, 1.1);
    // شهرهای اشغال‌شده مالیات نمی‌دهند؛ شهرهای تصرف‌شده بخشی از اقتصادشان را به ما می‌دهند
    const occ = occOf(c);
    const taxBase = c.gdp * (1 - occ.gdp) + occ.gdpGain;
    const tax = taxBase * e.taxRate * eff;

    // ارتش بازیکن سوخت اضافه مصرف می‌کند (نسبت به شروع بازی)
    const milFuel = c.mil && c.mil.useUnits ? SG.Military.extraFuel(c) : 0;
    const surplus = energyProduction(c) - c.energy.consumption - milFuel;
    const energyExport = surplus > 0 ? surplus * price * EXPORT_SHARE * (1 - 0.7 * pressure) : 0;
    const energyImport = surplus < 0 ? -surplus * price * IMPORT_SHARE : 0;

    // بازیکن: هزینه‌ی نظامی = نگهداری واحدهای واقعی. بقیه: سهم ثابت از GDP
    const units = c.mil && c.mil.useUnits;
    const military = units ? SG.Military.upkeepMonthly(c) * 12 : c.gdp * p.military;
    const production = units ? SG.Military.productionCostMonthly(state, c) * 12 : 0;   // خطوط تولید نظامی
    const welfare = c.gdp * p.welfare;
    const investment = c.gdp * p.investment;
    const admin = c.gdp * (ADMIN + modSum(c, 'expense'));
    const rate = interestRate(state, c, pressure);
    const interest = e.debt * rate;

    const tr = warTransfers(state, id);
    const trade = SG.Diplomacy ? SG.Diplomacy.tradeIncome(state, id) : 0;   // قراردادهای تجاری (مرحله‌ی ۵)
    const revenue = tax + energyExport + e.aid + tr.income + trade;
    const expenses = military + production + welfare + investment + admin + interest + energyImport + tr.payments;
    return {
      eff, tax, energyExport, aid: e.aid, warIncome: tr.income, trade, revenue,
      military, production, welfare, investment, admin, interest, energyImport, warPayments: tr.payments, expenses,
      net: revenue - expenses, monthly: (revenue - expenses) / 12,
      rate, pressure, surplus, milFuel,
    };
  }

  // -------------------------------------------------------------------
  // رشد اقتصادی (سالانه، کسر — مثلاً 0.03 یعنی ۳٪)
  // -------------------------------------------------------------------
  function growthRate(state, id, pressure = sanctionPressure(state, id)) {
    const c = state.countries[id], e = c.eco, p = e.policy;
    const perCap = c.gdp / Math.max(c.population, 0.001);
    // کشور فقیر سریع‌تر رشد می‌کند (بازده نزولی)
    const potential = perCap < 5 ? 0.05 : perCap < 15 ? 0.035 : perCap < 40 ? 0.025 : 0.017;
    return potential
      + (p.investment - 0.03) * 0.5                 // سرمایه‌گذاری
      + (c.stability - 55) / 45 * 0.015             // ثبات
      - pressure * 0.05                             // تحریم
      - Math.max(0, e.inflation - 15) * 0.0005      // تورم بالا
      - Math.max(0, p.military - 0.04) * 0.25       // ارتش خیلی پرهزینه
      - Math.max(0, e.taxRate - 0.3) * 0.05         // مالیات خیلی بالا
      - occOf(c).gdp * 0.06                          // خاک اشغال‌شده (تخریب و فرار سرمایه)
      - (c.warWeariness || 0) / 100 * 0.012          // خستگی جنگ
      + modSum(c, 'growth');
  }

  // -------------------------------------------------------------------
  // ثبات هدف: ثبات به آرامی به سمت این عدد حرکت می‌کند
  // -------------------------------------------------------------------
  function stabilityTarget(state, id) {
    const c = state.countries[id], e = c.eco, r = e.ref, p = e.policy;
    return clamp(
      r.stability
      + (p.welfare - r.welfare) * 180
      - (e.taxRate - r.tax) * 120
      - (e.inflation - r.inflation) * 0.5
      + (e.growth - r.growth) * 150
      + modSum(c, 'stability'),
      0, 100);
  }

  // -------------------------------------------------------------------
  // مقداردهی اولیه‌ی اقتصاد همه‌ی کشورها (هنگام ساخت دنیا)
  // -------------------------------------------------------------------
  function init(state) {
    state.world = {
      energyPrice: ENERGY_PRICE,
      gdp: Object.values(state.countries).reduce((s, c) => s + c.gdp, 0),
    };
    for (const c of Object.values(state.countries)) {
      const perCap = c.gdp / Math.max(c.population, 0.001);
      const taxRate = c.gov === 'M' ? 0.10
        : c.gov === 'D' ? (perCap > 25 ? 0.36 : 0.26)
        : c.gov === 'H' ? 0.22 : 0.20;
      c.eco = {
        treasury: Math.round(c.gdp * 0.08 * 10) / 10,
        debt: c.gdp * c.debtRatio,
        inflation: c.inflation,
        baseInflation: c.inflation,
        taxRate,
        policy: { military: c.militarySpendPct / 100, welfare: 0.08, investment: 0.03 },
        aid: 0,
        growth: 0,
        mods: [],
        milBase: { ...c.military },
        ref: null,
        history: [],   // [{turn, gdp, treasury, stability}] برای نمودار در آینده
      };
    }
    // رفاه را طوری تنظیم می‌کنیم که بودجه‌ی اول تقریباً متعادل باشد.
    // کشورهای قابل‌بازی سخت‌تر کمی کسری دارند (سختی از داده می‌آید، نه هاردکد).
    for (const c of Object.values(state.countries)) {
      const e = c.eco;
      e.policy.welfare = 0;
      const b = computeBudget(state, c.id);
      let w = (b.net) / c.gdp - (c.difficulty || 0) * 0.003 + 0.002;
      if (w < 0.02) {
        // کشورهایی که بدون کمک خارجی سرپا نمی‌مانند (مثل کشور در جنگ) از اول کمک می‌گیرند
        if (!c.playable) e.aid = (0.02 - w) * c.gdp;
        w = 0.02;
      }
      e.policy.welfare = clamp(w, 0.02, 0.25);
      e.growth = growthRate(state, c.id);
      e.ref = {
        tax: e.taxRate, welfare: e.policy.welfare, inflation: e.inflation,
        growth: e.growth, military: e.policy.military, investment: e.policy.investment, stability: c.stability,
      };
    }
  }

  // -------------------------------------------------------------------
  // یک ماه اقتصاد برای یک کشور. خروجی: فهرست رویدادها برای اعلان‌ها
  // -------------------------------------------------------------------
  function step(state, id, rng) {
    const c = state.countries[id], e = c.eco;
    const events = [];
    const b = computeBudget(state, id);

    // ۱) خزانه
    e.treasury += b.monthly;
    if (e.treasury < 0) {
      const gap = -e.treasury;
      e.treasury = 0;
      if (canBorrow(state, c, b.pressure)) {
        e.debt += gap;
        events.push({ type: 'borrowed', amount: gap });
      } else {
        // چاپ پول: تورم پایه بالا می‌رود
        e.baseInflation += gap / c.gdp * 100 * 2.5;
        events.push({ type: 'printed', amount: gap });
      }
    }

    // ۲) تورم: تورم «ساختاری» خودبه‌خود پایین نمی‌آید.
    //    فقط با بودجه‌ی مازاد خیلی آرام کم می‌شود؛ کسری بودجه با بدهی بالا آن را بالا می‌برد.
    //    تورم واقعی به سمت تورم پایه می‌رود.
    const printed = events.some(x => x.type === 'printed');
    // حافظه‌ی چاپ پول (برای تحلیل مشاور اقتصادی): چند ماه اخیر پول چاپ شده؟
    e.printedRecent = printed ? 6 : Math.max(0, (e.printedRecent || 0) - 1);
    if (!printed) {
      if (b.net > 0) e.baseInflation += (3 - e.baseInflation) * 0.0025;
      else if (e.debt / c.gdp > 1) e.baseInflation += 0.03;
    }
    e.baseInflation = clamp(e.baseInflation + modSum(c, 'inflation') / 12, -1, 400);
    e.inflation = clamp(e.inflation + (e.baseInflation - e.inflation) * 0.15 + rng.range(-0.3, 0.3), -2, 500);

    // ۳) رشد
    e.growth = growthRate(state, id, b.pressure) + rng.range(-0.004, 0.004);
    c.gdp = Math.max(0.05, c.gdp * Math.pow(1 + e.growth, 1 / 12));

    // ۴) ثبات
    const target = stabilityTarget(state, id);
    c.stability = clamp(c.stability + (target - c.stability) * 0.1 + rng.range(-0.7, 0.7), 0, 100);

    // ۵) ارتش: قدرت به سمت سطحی می‌رود که بودجه‌ی نظامی پشتیبانی می‌کند
    // (در مرحله‌ی ۳ با تولید واحدهای واقعی جایگزین می‌شود)
    if (e.ref.military > 0 && !(c.mil && c.mil.useUnits)) {
      const f = Math.sqrt(e.policy.military / e.ref.military);
      for (const k of Object.keys(e.milBase)) {
        if (typeof e.milBase[k] !== 'number' || k === 'active') continue;
        const goal = clamp(e.milBase[k] * f, 0, 100);
        c.military[k] = Math.round((c.military[k] + (goal - c.military[k]) * 0.03) * 10) / 10;
      }
    }

    // ۶) اثرهای موقت (فرمان‌ها) یک ماه کم می‌شوند
    for (const m of e.mods) m.turns--;
    e.mods = e.mods.filter(m => m.turns > 0);

    // تورم ارزش واقعی بدهی را کم می‌کند (برای همین چاپ پول وسوسه‌انگیز است!)
    if (e.inflation > 0) e.debt *= 1 - Math.min(e.inflation, 100) / 1200 * 0.2;
    c.debtRatio = e.debt / c.gdp;
    c.inflation = e.inflation;
    return events;
  }

  /** چند ماه تا تمام شدن خزانه؟ (Infinity اگر بودجه مثبت است) */
  function monthsOfReserve(state, id) {
    const b = computeBudget(state, id);
    if (b.monthly >= 0) return Infinity;
    return state.countries[id].eco.treasury / -b.monthly;
  }

  SG.Economy = {
    init, step, computeBudget, growthRate, stabilityTarget, sanctionPressure,
    canBorrow, monthsOfReserve, modSum, energyProduction, warTransfers, occOf,
  };
})(window.SG = window.SG || {});

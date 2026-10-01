// =====================================================================
// موتور «مشاور اقتصادی»: علت‌یابی و پیشنهاد با محاسبه‌ی اثر (بدون متن فارسی)
// ---------------------------------------------------------------------
// - علت نارضایتی: سهم هر عامل در «ثبات هدف» (مالیات، رفاه، تورم، رشد، اثرهای موقت)
// - علت تورم: چاپ پول، کسری بودجه، تورم ساختاری
// - هر پیشنهاد سیاستی واقعاً روی یک کپی موقت امتحان می‌شود تا اثرش (تراز ماهانه،
//   ثبات هدف، رشد) دقیق و مخصوص همین کشور حساب شود.
// متن فارسی در js/ui/advisorPanel.js است.
// =====================================================================
(function (SG) {
  'use strict';
  const Eco = SG.Economy;

  /** اثر یک تغییر سیاست را می‌سنجد و همه چیز را به حالت قبل برمی‌گرداند */
  function simulate(state, id, changes) {
    const c = state.countries[id], e = c.eco;
    const before = measure(state, id);
    const saved = { taxRate: e.taxRate, policy: { ...e.policy }, lines: c.mil ? { ...c.mil.lines } : null };
    for (const [k, v] of Object.entries(changes)) {
      if (k === 'taxRate') e.taxRate = v;
      else if (k === 'line') c.mil.lines[v] = false;
      else e.policy[k] = v;
    }
    const after = measure(state, id);
    // برگرداندن «درجا» (همان آبجکت‌ها) تا ارجاع‌های دیگر به آن‌ها خراب نشود
    e.taxRate = saved.taxRate;
    Object.assign(e.policy, saved.policy);
    if (saved.lines) Object.assign(c.mil.lines, saved.lines);
    return {
      monthly: after.monthly - before.monthly,
      target: after.target - before.target,
      growth: (after.growth - before.growth) * 100,
    };
  }

  function measure(state, id) {
    return {
      monthly: Eco.computeBudget(state, id).monthly,
      target: Eco.stabilityTarget(state, id),
      growth: Eco.growthRate(state, id),
    };
  }

  /** سهم هر عامل در ثبات هدف (همان فرمول economy.stabilityTarget) */
  function stabilityFactors(c) {
    const e = c.eco, r = e.ref, p = e.policy;
    return [
      { key: 'welfare', value: (p.welfare - r.welfare) * 180 },
      { key: 'tax', value: -(e.taxRate - r.tax) * 120 },
      { key: 'inflation', value: -(e.inflation - r.inflation) * 0.5 },
      { key: 'growth', value: (e.growth - r.growth) * 150 },
      { key: 'temporary', value: Eco.modSum(c, 'stability') },
    ].filter(f => Math.abs(f.value) >= 0.5).sort((a, b) => a.value - b.value);
  }

  function analyze(state, id) {
    const c = state.countries[id], e = c.eco, p = e.policy;
    const b = Eco.computeBudget(state, id);
    const months = Eco.monthsOfReserve(state, id);
    const target = Eco.stabilityTarget(state, id);
    const canBorrow = Eco.canBorrow(state, c, b.pressure);
    const debtRatio = e.debt / c.gdp;
    const L = SG.Actions.LIMITS;
    const clampTo = (k, v) => Math.max(L[k][0], Math.min(L[k][1], v));
    const decree = k => SG.Actions.status(state, id, k);

    // ---- گزینه‌های سیاستی (با اثر محاسبه‌شده) ----
    const opt = (key, changes) => ({ key, changes, effect: simulate(state, id, changes) });
    const options = {
      welfareUp: opt('welfareUp', { welfare: clampTo('welfare', p.welfare + 0.02) }),
      welfareDown: opt('welfareDown', { welfare: clampTo('welfare', p.welfare - 0.02) }),
      taxDown: opt('taxDown', { taxRate: clampTo('taxRate', e.taxRate - 0.03) }),
      taxUp: opt('taxUp', { taxRate: clampTo('taxRate', e.taxRate + 0.03) }),
      investUp: opt('investUp', { investment: clampTo('investment', p.investment + 0.02) }),
    };
    // گران‌ترین خط تولید روشن
    let costlyLine = null;
    if (c.mil && c.mil.useUnits) {
      let best = 0;
      for (const t of Object.keys(c.mil.lines)) {
        if (!c.mil.lines[t]) continue;
        const cost = SG.Military.productionRate(state, c, t) * SG.Military.unitCost(state, c, t);
        if (cost > best) { best = cost; costlyLine = t; }
      }
      if (costlyLine) options.lineOff = { key: 'lineOff', unit: costlyLine, effect: simulate(state, id, { line: costlyLine }) };
    }

    // ---- علت تورم ----
    const inflationCauses = [];
    if ((e.printedRecent || 0) > 0) inflationCauses.push('printing');
    if (b.monthly < 0 && !canBorrow) inflationCauses.push('deficit_no_credit');
    if (e.baseInflation > 10) inflationCauses.push('structural');
    if (e.inflation > e.baseInflation + 2) inflationCauses.push('converging_down');
    if (Eco.modSum(c, 'inflation') < 0) inflationCauses.push('austerity_working');

    // ---- مشکل‌ها به ترتیب اهمیت ----
    const problems = [];
    if (e.inflation > 15 || inflationCauses.includes('printing')) {
      problems.push({ key: 'inflation', severity: e.inflation > 40 ? 3 : 2 });
    }
    if (c.stability < 50 || target < c.stability - 3) {
      problems.push({ key: 'unrest', severity: c.stability < 25 ? 3 : c.stability < 40 ? 2 : 1 });
    }
    if (b.monthly < 0) {
      problems.push({ key: 'deficit', severity: months < 4 ? 3 : months < 12 ? 2 : 1 });
    }
    if (debtRatio > 0.9) problems.push({ key: 'debt', severity: debtRatio > 1.5 ? 3 : 2 });
    if (e.growth < 0.015) problems.push({ key: 'growth', severity: e.growth < 0 ? 2 : 1 });
    if (b.pressure >= 0.3) problems.push({ key: 'sanctions', severity: 2 });
    if (b.energyImport > b.revenue * 0.1) problems.push({ key: 'energy', severity: 1 });
    problems.sort((a, b2) => b2.severity - a.severity);

    // وضع کلی
    const worst = problems.reduce((m, x) => Math.max(m, x.severity), 0);
    return {
      status: worst >= 3 ? 'crisis' : worst === 2 ? 'warning' : 'ok',
      budget: b, months, target, canBorrow, debtRatio,
      stabilityFactors: stabilityFactors(c),
      inflationCauses, problems, options, costlyLine,
      decrees: {
        austerity: decree('austerity'), welfare_package: decree('welfare_package'), crackdown: decree('crackdown'),
        foreign_loan: decree('foreign_loan'), infrastructure: decree('infrastructure'), anti_corruption: decree('anti_corruption'),
      },
      democracy: c.gov === 'D',
      exporter: c.energy.production > c.energy.consumption,
    };
  }

  SG.EconAdvisor = { analyze, simulate, stabilityFactors };
})(window.SG = window.SG || {});

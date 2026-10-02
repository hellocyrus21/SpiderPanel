// =====================================================================
// درخت پیشرفت (مرحله‌ی ۶): تحقیق، هزینه، زمان، پیش‌نیاز و اثرها
// ---------------------------------------------------------------------
// داده در data/tech.js است؛ اینجا هیچ کشوری خاص نیست (همه با یک قانون).
//   c.techs    = { nodeId: turn }          گره‌های تمام‌شده
//   c.research = { id, left, total, cost } تحقیق جاری (یکی در هر زمان)
//   c.outMul   = { type: 0.2 }             ضریب تولید کارخانه (از گره‌ها)
//   c.doctrine = { groundAtt, groundDef, strike, sortie }  ضریب‌های نبرد
// اثر اقتصادی به‌صورت mod دائمی در c.eco.mods (src: 'tech') ثبت می‌شود تا
// همه‌ی فرمول‌های اقتصاد (و مشاور) خودکار آن را ببینند.
// =====================================================================
(function (SG) {
  'use strict';
  const D = () => window.SG_DATA;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const FOREVER = 1e9;   // mod دائمی (Infinity در JSON ذخیره نمی‌شود)

  const nodes = () => D().tech || [];
  const node = id => nodes().find(n => n.id === id);
  const has = (c, id) => !!(c.techs && c.techs[id] !== undefined);

  /** هزینه‌ی یک گره برای این کشور (میلیارد دلار) */
  function costOf(state, c, n) {
    if (n.costPct) return Math.round(c.gdp * n.costPct * 100) / 100;
    return Math.round(n.cost * (c.mil?.costFactor || 1) * 100) / 100;
  }

  /** زمان تحقیق (ماه): تحریم سنگین تا ۶۰٪ طولانی‌ترش می‌کند */
  function monthsOf(state, c, n) {
    const p = SG.Economy.sanctionPressure(state, c.id);
    return Math.ceil(n.months * (1 + p));
  }

  function visible(c, n) {
    if (n.need && n.need.oil && !(c.energy.production > 0)) return false;
    return true;
  }

  /**
   * وضعیت یک گره برای کشور: done | active | ready | locked | blocked | hidden
   *   locked  ← پیش‌نیاز ندارد   blocked ← هم‌گروهش انتخاب شده (دکترین)
   */
  function statusOf(state, c, n) {
    if (!visible(c, n)) return 'hidden';
    if (has(c, n.id)) return 'done';
    if (c.research && c.research.id === n.id) return 'active';
    if (n.group && nodes().some(o => o.group === n.group && o.id !== n.id && (has(c, o.id) || (c.research && c.research.id === o.id)))) return 'blocked';
    if (!(n.req || []).every(r => has(c, r))) return 'locked';
    return 'ready';
  }

  /** گره‌هایی که الان می‌شود شروع کرد */
  function available(state, c) {
    return nodes().filter(n => statusOf(state, c, n) === 'ready');
  }

  /** شروع تحقیق. خروجی: null یا دلیل ('busy' | 'locked' | 'money') */
  function start(state, id, nodeId) {
    const c = state.countries[id], n = node(nodeId);
    if (!n) return 'locked';
    if (c.research) return 'busy';
    if (statusOf(state, c, n) !== 'ready') return 'locked';
    const cost = costOf(state, c, n);
    if (cost > c.eco.treasury) return 'money';
    c.eco.treasury -= cost;
    const m = monthsOf(state, c, n);
    c.research = { id: n.id, left: m, total: m, cost };
    return null;
  }

  /** لغو تحقیق: نصف پول برمی‌گردد */
  function cancel(state, id) {
    const c = state.countries[id];
    if (!c.research) return false;
    c.eco.treasury += c.research.cost * 0.5;
    c.research = null;
    return true;
  }

  /** اعمال اثر یک گره تمام‌شده */
  function apply(state, c, n) {
    const ef = n.effects || {};
    for (const stat of ['taxEff', 'growth', 'stability']) {
      if (ef[stat]) c.eco.mods.push({ stat, value: ef[stat], turns: FOREVER, src: 'tech', id: n.id });
    }
    if (ef.energyUse) c.energy.consumption = Math.max(0, c.energy.consumption * (1 + ef.energyUse));
    if (ef.energyProd) c.energy.production = c.energy.production * (1 + ef.energyProd);
    if (ef.range) {
      c.ranges ||= {};
      for (const [type, add] of Object.entries(ef.range)) c.ranges[type] = SG.Military.rangeOf(c, type) + add;
    }
    if (ef.output) {
      c.outMul ||= {};
      for (const [type, v] of Object.entries(ef.output)) c.outMul[type] = (c.outMul[type] || 0) + v;
    }
    if (ef.tech) for (const [b, v] of Object.entries(ef.tech)) c.tech[b] = clamp((c.tech[b] || 0) + v, 0, 120);
    if (ef.war) {
      c.doctrine ||= {};
      for (const [k, v] of Object.entries(ef.war)) c.doctrine[k] = (c.doctrine[k] || 0) + v;
    }
  }

  /** یک ماه تحقیق برای یک کشور. خروجی: گره تمام‌شده یا null */
  function stepCountry(state, c) {
    const r = c.research;
    if (!r) return null;
    r.left--;
    if (r.left > 0) return null;
    const n = node(r.id);
    c.research = null;
    if (!n) return null;
    (c.techs ||= {})[n.id] = state.turn;
    apply(state, c, n);
    return n;
  }

  /** پیشرفت تحقیق جاری به اندازه‌ی چند ماه (رویداد «کشف فناوری») */
  function boost(state, id, months) {
    const r = state.countries[id].research;
    if (r) r.left = Math.max(1, r.left - months);
    return !!r;
  }

  const count = c => Object.keys(c.techs || {}).length;
  const warMul = (c, key) => (c && c.doctrine && c.doctrine[key]) || 0;

  SG.Tech = { node, nodes, has, costOf, monthsOf, statusOf, available, start, cancel, apply, stepCountry, boost, count, warMul };
})(window.SG = window.SG || {});

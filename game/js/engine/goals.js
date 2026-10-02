// =====================================================================
// اهداف، امتیاز و دستاوردها (مرحله‌ی ۶)
// ---------------------------------------------------------------------
// - اهداف هر بازی از وضع شروع کشور ساخته می‌شوند (قانون یکسان، بدون کشور خاص):
//   همیشه: ۱۰ سال دوام، اقتصاد ×۱.۵، ثبات پایدار، رتبه‌ی نظامی
//   بسته به شروع: شکستن تحریم (اگر ≥ ۳ تحریم) | خودکفایی انرژی (اگر واردکننده) | شبکه‌ی تجاری
//   + پیشرفت علمی
// - امتیاز: اقتصاد، ثبات، فتح، فناوری، دیپلماسی، اهداف × سختی کشور (× ۱.۵ در حالت سخت)
// - دستاوردها در state.achieved (این بازی) ثبت می‌شوند؛ UI آن‌ها را در پروفایل
//   مرورگر (بین بازی‌ها) جمع می‌کند.
// - پایان دوره: ماه ۱۲۰ ← گزارش پایان و امتیاز؛ بازی ادامه پیدا می‌کند (آزاد).
// =====================================================================
(function (SG) {
  'use strict';
  const E = () => SG.Engine;
  const N = () => SG.Notify;
  const TERM = 120;   // دوره‌ی ۱۰ ساله

  const power = c => E().militaryPower(c);

  function snapshot(state, pid) {
    const c = state.countries[pid];
    return {
      gdp: c.gdp, stability: c.stability, rank: E().rankOf(state, pid, power),
      sanctions: E().sanctionedBy(state, pid).length,
      importer: SG.Economy.energyProduction(c) < c.energy.consumption,
      partners: SG.Diplomacy ? SG.Diplomacy.partners(state, pid).length : 0,
    };
  }

  /** ساخت اهداف در شروع بازی */
  function init(state) {
    const pid = state.playerId;
    const s = state.startStats = snapshot(state, pid);
    const goals = [
      { id: 'survive', target: TERM },
      { id: 'gdp', target: Math.round(s.gdp * 1.5) },
      { id: 'stability', target: Math.min(80, Math.max(55, Math.round(s.stability / 5) * 5 + 10)), streak: 0 },
      { id: 'power', target: Math.max(1, s.rank <= 4 ? Math.max(1, s.rank - 1) : s.rank - 3) },
    ];
    if (s.sanctions >= 3) goals.push({ id: 'sanctions', target: Math.floor(s.sanctions / 3) });
    else if (s.importer) goals.push({ id: 'energy', target: 1 });
    else goals.push({ id: 'trade', target: Math.max(6, s.partners + 4) });
    goals.push({ id: 'tech', target: 8 });
    state.goals = goals.map(g => ({ ...g, done: null }));
    state.achieved ||= {};
    state.stats ||= {};
  }

  /** پیشرفت یک هدف: { now, target, pct } */
  function progress(state, g) {
    const pid = state.playerId, c = state.countries[pid];
    switch (g.id) {
      case 'survive': return { now: state.turn, target: g.target };
      case 'gdp': return { now: c.gdp, target: g.target };
      case 'stability': return { now: g.streak || 0, target: 12, extra: Math.round(c.stability) };
      case 'power': { const r = E().rankOf(state, pid, power); return { now: r, target: g.target, lower: true }; }
      case 'sanctions': return { now: E().sanctionedBy(state, pid).length, target: g.target, lower: true };
      case 'energy': return { now: SG.Economy.energyProduction(c), target: c.energy.consumption };
      case 'trade': return { now: SG.Diplomacy.partners(state, pid).length, target: g.target };
      case 'tech': return { now: SG.Tech.count(c), target: g.target };
    }
    return { now: 0, target: 1 };
  }
  function reached(p) { return p.lower ? p.now <= p.target : p.now >= p.target; }
  function pctOf(p) {
    if (reached(p)) return 1;
    if (p.lower) return Math.max(0, Math.min(1, p.target / Math.max(p.now, 1)));
    return Math.max(0, Math.min(1, p.now / Math.max(p.target, 1e-9)));
  }

  /** امتیاز فعلی: { parts:{...}, base, mult, total } */
  function score(state) {
    const pid = state.playerId, c = state.countries[pid];
    const s = state.startStats || snapshot(state, pid);
    const conquered = Object.values(state.countries).filter(o => o.annexedBy === pid).length;
    const parts = {
      economy: Math.round(Math.max(-500, (c.gdp / s.gdp - 1) * 1000)),
      stability: Math.round(c.stability * 5),
      conquest: conquered * 150 + (state.stats?.warsWon || 0) * 50,
      tech: SG.Tech.count(c) * 15,
      // نسبت به شروع: هر تحریمی که برداشته شود +۲۰، هر تحریم تازه −۲۰
      diplomacy: (SG.Diplomacy ? SG.Diplomacy.partners(state, pid).length * 15 : 0) + E().defensePartners(state, pid).length * 20
        + ((s.sanctions || 0) - E().sanctionedBy(state, pid).length) * 20,
      goals: (state.goals || []).filter(g => g.done !== null).length * 250,
      time: Math.min(state.turn, TERM) * 3,
    };
    const base = Object.values(parts).reduce((a, b) => a + b, 0);
    const mult = (1 + 0.2 * ((c.difficulty || 1) - 1)) * (state.hard ? 1.5 : 1);
    return { parts, base, mult, total: Math.max(0, Math.round(base * mult)) };
  }

  function earn(state, id) {
    if (state.achieved[id]) return;
    state.achieved[id] = state.turn;
    const def = (window.SG_DATA.achievements || []).find(a => a.id === id);
    N().add(state, { type: 'achievement', level: 'warning', category: 'domestic', speaker: 'advisor', groupKey: id, data: { ach: id, name: def ? def.name : id } });
  }

  /** بررسی ماهانه (بعد از همه‌ی سیستم‌ها) */
  function step(state) {
    const pid = state.playerId;
    if (!pid) return;
    if (!state.goals) init(state);
    const c = state.countries[pid];
    state.achieved ||= {}; state.stats ||= {};
    // --- اهداف ---
    for (const g of state.goals) {
      if (g.id === 'stability') g.streak = c.stability >= g.target ? (g.streak || 0) + 1 : 0;
      if (g.done !== null) continue;
      if (reached(progress(state, g))) {
        g.done = state.turn;
        N().add(state, { type: 'goal_done', level: 'warning', category: 'domestic', speaker: 'advisor', groupKey: g.id, data: { goal: g.id } });
      }
    }
    // --- دستاوردها ---
    const s = state.startStats || {};
    const conquered = Object.values(state.countries).filter(o => o.annexedBy === pid).length;
    if (state.turn >= 12) earn(state, 'year1');
    if (state.turn >= TERM) { earn(state, 'decade'); if (state.hard) earn(state, 'hard_decade'); }
    if ((state.stats.warsWon || 0) >= 1) earn(state, 'victory');
    if (conquered >= 1) earn(state, 'conquer');
    if (conquered >= 3) earn(state, 'empire');
    if (SG.Diplomacy.partners(state, pid).length >= 8) earn(state, 'trader');
    if (E().defensePartners(state, pid).length >= 4) earn(state, 'allies');
    if (c.eco.treasury >= c.gdp * 0.25) earn(state, 'rich');
    if (s.gdp && c.gdp >= s.gdp * 2) earn(state, 'miracle');
    if (SG.Tech.count(c) >= 10) earn(state, 'scientist');
    if (c.doctrine && Object.keys(c.doctrine).length) earn(state, 'doctrine');
    if (c.stability >= 80) earn(state, 'calm');
    if ((s.sanctions || 0) >= 3 && E().sanctionedBy(state, pid).length === 0) earn(state, 'free');
    if (state.stats.coupSurvived) earn(state, 'survivor');
    if (state.goals.every(g => g.done !== null)) earn(state, 'all_goals');
    // --- پایان دوره ---
    if (state.turn === TERM && !state.termEnded) {
      state.termEnded = true;
      const sc = score(state);
      state.finalScore = { total: sc.total, turn: state.turn, reason: 'term' };
      N().add(state, { type: 'term_end', level: 'critical', category: 'domestic', speaker: 'advisor', focus: pid,
        data: { score: sc.total, goals: state.goals.filter(g => g.done !== null).length, of: state.goals.length } });
    }
  }

  SG.Goals = { init, step, progress, reached, pctOf, score, TERM };
})(window.SG = window.SG || {});

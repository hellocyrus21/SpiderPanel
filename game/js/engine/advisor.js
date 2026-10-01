// =====================================================================
// موتور «مشاور ارشد»: تحلیل وضعیت یک کشور (بدون هیچ متن فارسی)
// ---------------------------------------------------------------------
// خروجی فقط عدد و کد است؛ متن فارسی در js/ui/advisorPanel.js ساخته می‌شود.
// هیچ کشوری هاردکد نشده: همه چیز از مقایسه‌ی داده‌ها با همسایه‌ها و رقبا می‌آید،
// پس برای هر کشوری (حتی کشورهایی که بعداً قابل‌بازی شوند) کار می‌کند.
// =====================================================================
(function (SG) {
  'use strict';
  const E = SG.Engine;
  const BRANCHES = ['land', 'air', 'navy', 'missile', 'airDefense', 'cyber', 'drone'];

  /**
   * @returns {object} گزارش تحلیل:
   *  { id, threat, gaps, edges, energy, sanctions, allies, candidates, targets, strategy, flags }
   */
  function analyze(state, id) {
    const c = state.countries[id];
    const all = E.activeCountries(state);
    const power = E.militaryPower(c);
    const perCap = c.gdp / Math.max(c.population, 0.001);
    const econRank = E.rankOf(state, id, x => x.gdp);
    const milRank = E.rankOf(state, id, E.militaryPower);
    const rel = other => E.getRelation(state, id, other);
    const near = new Set([...c.neighbors, ...c.seaNeighbors]);

    // ---------- بزرگ‌ترین تهدید ----------
    // امتیاز تهدید = قدرت × خصومت × (نزدیکی ضریب بیشتری دارد)
    let threat = null, threatScore = 0;
    for (const o of all) {
      if (o.id === id) continue;
      const r = rel(o.id);
      if (r > -25 && !E.isAtWar(state, id, o.id)) continue;
      const hostility = E.isAtWar(state, id, o.id) ? 2 : (-r / 100);
      const score = E.militaryPower(o) * hostility * (near.has(o.id) ? 1.5 : 1) * (o.military.nuclear ? 1.2 : 1);
      if (score > threatScore) { threatScore = score; threat = o.id; }
    }

    // ---------- مقایسه‌ی شاخه‌ها با تهدید اصلی ----------
    // gaps: جاهایی که از تهدید عقب‌تریم؛ edges: جاهایی که جلوتریم
    let gaps = [], edges = [];
    if (threat) {
      const t = state.countries[threat].military;
      for (const b of BRANCHES) {
        const d = c.military[b] - t[b];
        if (d <= -10) gaps.push({ branch: b, mine: c.military[b], theirs: t[b], diff: d });
        if (d >= 10) edges.push({ branch: b, mine: c.military[b], theirs: t[b], diff: d });
      }
      gaps.sort((a, b) => a.diff - b.diff);
      edges.sort((a, b) => b.diff - a.diff);
    }
    // بهترین شاخه‌ها به‌طور مطلق (برای پیشنهاد دکترین)
    const best = BRANCHES.slice().sort((a, b) => c.military[b] - c.military[a]).slice(0, 2);

    // ---------- انرژی ----------
    const ratio = c.energy.production / Math.max(c.energy.consumption, 0.01);
    const energy = { ratio, surplus: c.energy.production - c.energy.consumption };

    // ---------- تحریم ----------
    const sanctionedBy = E.sanctionedBy(state, id);
    // تحریم‌کننده‌هایی که رابطه‌شان خیلی بد نیست = قابل مذاکره
    const negotiable = sanctionedBy.filter(s => rel(s) > -50)
      .sort((a, b) => state.countries[b].gdp - state.countries[a].gdp);

    // ---------- متحدان فعلی و کاندیدهای اتحاد ----------
    const allies = all.filter(o => o.id !== id && E.areAllied(state, id, o.id)).map(o => o.id);
    const candidates = all
      .filter(o => o.id !== id && !allies.includes(o.id) && rel(o.id) >= 20)
      .map(o => {
        // اگر دشمن مشترک داشته باشیم، کاندید بهتری است
        const sharedEnemy = threat ? E.getRelation(state, o.id, threat) <= -25 : false;
        const score = E.militaryPower(o) + rel(o.id) * 0.5 + (sharedEnemy ? 30 : 0) + (near.has(o.id) ? 10 : 0);
        return { id: o.id, rel: rel(o.id), sharedEnemy, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    // ---------- هدف‌های ضعیف (فرصت — و خطرش) ----------
    const targets = [...near]
      .map(n => state.countries[n])
      .filter(o => o && rel(o.id) < 0 && E.militaryPower(o) < power * 0.7)
      .map(o => {
        // چه کسانی از او دفاع می‌کنند؟
        const defenders = all.filter(x => x.id !== o.id && x.id !== id && E.areAllied(state, o.id, x.id));
        // متحدانِ متحدان هم حساب‌اند (مثلاً پشتیبان یک متحد، پیمان بزرگ‌تری دارد)
        let defenderPower = 0;
        for (const d of defenders) {
          defenderPower = Math.max(defenderPower, E.militaryPower(d));
          for (const x of all) {
            if (x.id !== id && x.id !== d.id && E.areAllied(state, d.id, x.id)) {
              defenderPower = Math.max(defenderPower, E.militaryPower(x));
            }
          }
        }
        return {
          id: o.id, power: E.militaryPower(o), rel: rel(o.id),
          defenders: defenders.map(x => x.id).slice(0, 4),
          risky: defenderPower > power,
          energyRich: o.energy.production > o.energy.consumption * 1.3,
        };
      })
      .sort((a, b) => a.power - b.power)
      .slice(0, 3);

    // ---------- انتخاب «راهبرد پیشنهادی» با امتیازدهی ----------
    const threatPower = threat ? E.militaryPower(state.countries[threat]) : 0;
    const asym = (c.military.missile + c.military.drone) / 2 - (c.military.air + c.military.navy) / 2;
    const scores = {
      // حفظ برتری: وقتی خودت در صدر هستی
      hegemon: milRank <= 3 ? 90 : 0,
      // رشد اقتصادی: اقتصاد خوب و تهدید کم
      economy: (econRank <= 15 ? 40 : 10) + (perCap > 30 ? 20 : 0) + (threatPower < power ? 25 : 0) - sanctionedBy.length * 3,
      // بازدارندگی نامتقارن: تهدید قوی‌تر از ما + موشک/پهپاد خوب
      deterrence: (threatPower > power ? 40 : 0) + Math.max(0, asym) + (sanctionedBy.length >= 5 ? 15 : 0),
      // ائتلاف‌سازی: بدون متحد نظامی و زیر فشار
      coalition: (allies.length === 0 ? 40 : 0) + (threatPower > power ? 20 : 0) + (candidates.length ? 10 : 0),
      // توسعه‌طلبی: ارتش قوی + همسایه‌ی ضعیف بی‌دفاع
      expansion: targets.some(t => !t.risky) && c.stability >= 50 ? 35 + Math.max(0, power - 50) : 0,
    };
    const strategy = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];

    return {
      id, power, perCap, econRank, milRank,
      threat, gaps: gaps.slice(0, 3), edges: edges.slice(0, 3), best,
      energy, sanctionedBy, negotiable: negotiable.slice(0, 3),
      allies, candidates, targets, strategy,
      flags: {
        lowStability: c.stability < 45,
        nuclear: c.military.nuclear,
        atWar: E.warsOf(state, id),
        bigEconomy: econRank <= 10,
        poor: perCap < 8,
      },
    };
  }

  SG.Advisor = { analyze };
})(window.SG = window.SG || {});

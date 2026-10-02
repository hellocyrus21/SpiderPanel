// =====================================================================
// موتور جنگ و فتح (مرحله‌ی ۴ — نسخه‌ی «جبهه‌ی درصدی»)
// ---------------------------------------------------------------------
// نقشه استان ندارد، پس پیشروی «درصد خاک» است: مثلاً ۵٪ خاک عراق را گرفتیم.
// منطقه‌ی گرفته‌شده روی نقشه از نقطه‌ی مرزی دو کشور شروع می‌شود و با درصد بزرگ می‌شود
// (شعاعش از جدول data/countries.js ← front که در build ساخته می‌شود).
//
// هر ماه در هر جنگ:
//   ۱) جنگ هوایی (فقط طرفی که نقشه‌ی «ترکیبی» دارد): موشک، پهپاد، جنگنده، بمب‌افکن (و اگر اجازه داده شود قاره‌پیما)
//      اول به پدافند دشمن می‌زنند؛ وقتی پدافند نماند، روی نیروی زمینی دشمن بمب و موشک می‌ریزند.
//      هر آتشبار پدافند در ماه: ۵ جنگنده، ۳ بمب‌افکن، ۸۰ پهپاد، ۴۰ موشک یا ۱ قاره‌پیما را می‌زند
//      (جنگنده‌های مدافع هم کمی از هواپیما و پهپادها را می‌زنند؛ سایبری تا ۲۰٪ پدافند را مختل می‌کند).
//   ۲) جبهه‌ی زمینی (اگر مرز زمینی دارند): پیاده، زرهی، توپخانه و پدافند هر طرف در جبهه
//      قدرت = Σ(تعداد × قدرت × نقش حمله/دفاع × کیفیت × روحیه × تدارکات) × زمین و استحکامات (مدافع) × شانس
//      اگر طرفی برتر باشد خاک جابه‌جا می‌شود: حمله‌ی فقط زمینی کند (حداکثر ۴٪ در ماه)،
//      با پشتیبانی هوایی بعد از نابودی پدافند سریع‌تر (حداکثر ۸٪) — × اندازه‌ی کشور (کشور بزرگ کندتر)
//   ۳) تلفات، روحیه، خستگی جنگ، اقتصاد خاک اشغالی، سقوط پایتخت، تسلیم
//
// اعلان جنگ = اول «اولتیماتوم»: کشور هدف یا می‌جنگد یا پول پیشنهاد می‌دهد؛ مهاجم می‌پذیرد یا حمله می‌کند.
// فتح کامل: همه‌ی پول، تجهیزات و مردم کشور مغلوب مال فاتح می‌شود.
// همه‌ی کشورها با همین قوانین؛ هیچ کشوری هاردکد نشده.
// =====================================================================
(function (SG) {
  'use strict';
  const D = () => window.SG_DATA;
  const Tc = () => SG.Tech;
  const E = () => SG.Engine, M = () => SG.Military, N = () => SG.Notify;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  const TERRAIN = { plain: 1.0, desert: 1.1, jungle: 1.2, mountain: 1.4, urban: 1.5 };
  const GROUND = ['infantry', 'armor', 'artillery', 'airdefense'];
  const AIRSTRIKE = ['fighter', 'bomber', 'drone', 'missile', 'icbm'];
  const SALVO = [0.05, 0.1, 0.2];          // شدت شلیک موشک و پهپاد (سهم انبارِ در برد در هر ماه)
  const SORTIE = 0.4;                       // هر ماه ۴۰٪ جنگنده‌ها و بمب‌افکن‌ها عملیاتی‌اند (تعمیر، خلبان، سوخت)
  const RATE_GROUND = 0.04;                 // حداکثر پیشروی ماهانه، فقط زمینی (کسر خاک)
  const RATE_COMBINED = 0.08;               // با پشتیبانی هوایی نزدیک (پدافند دشمن نابود)
  const MAX_REPORTS = 24;
  const PEACE_TERMS = ['annex', 'cede', 'pay', 'white'];

  // ===================================================================
  // پرس‌وجوهای پایه
  // ===================================================================
  function effectiveOwner(state, id) {
    let c = state.countries[id], guard = 0;
    while (c && c.annexedBy && guard++ < 8) c = state.countries[c.annexedBy];
    return c ? c.id : id;
  }
  function wars(state) { return state.warsInfo || (state.warsInfo = []); }
  function sideOf(war, id) {
    if (war.sides.A.includes(id)) return 'A';
    if (war.sides.B.includes(id)) return 'B';
    return null;
  }
  const other = s => (s === 'A' ? 'B' : 'A');
  function members(war) { return [...war.sides.A, ...war.sides.B]; }
  function warOf(state, a, b) {
    return wars(state).find(w => { const sa = sideOf(w, a), sb = sideOf(w, b); return sa && sb && sa !== sb; }) || null;
  }
  function warsOfCountry(state, id) { return wars(state).filter(w => sideOf(w, id)); }
  function warById(state, id) { return wars(state).find(w => w.id === id) || null; }
  function syncPairs(state) {
    const pairs = [];
    for (const w of wars(state)) for (const a of w.sides.A) for (const b of w.sides.B) pairs.push([a, b]);
    state.wars = pairs;
  }
  function setRel(state, a, b, v) { state.relations[E().relKey(a, b)] = Math.round(clamp(v, -100, 100)); }
  function addRel(state, a, b, dv) { if (a !== b) setRel(state, a, b, E().getRelation(state, a, b) + dv); }
  const isPlayer = (state, id) => id === state.playerId;
  const usesStacks = c => !!(c.mil && c.mil.useUnits);

  // ===================================================================
  // جدول جبهه: درصد ← شعاع منطقه‌ی تصرف‌شده (درجه) از نقطه‌ی مرزی
  // ===================================================================
  /** شعاع (درجه) منطقه‌ای از کشور id که از سمت مرز همسایه‌ی from به اندازه‌ی pct (۰..۱) گرفته شده */
  function radiusFor(state, id, from, pct) {
    const c = state.countries[id];
    const t = c && c.front && c.front[from];
    if (!t || pct <= 0) return 0;
    const x = clamp(pct, 0, 1) * 10;
    if (x <= 1) return t.r[0] * x;
    const i = Math.min(9, Math.floor(x)) - 1;
    const f = x - (i + 1);
    return t.r[i] + (t.r[Math.min(9, i + 1)] - t.r[i]) * f;
  }
  /** پایتخت در چند درصد پیشروی از این مرز سقوط می‌کند */
  function capitalAt(state, id, from) {
    const t = state.countries[id]?.front?.[from];
    return Math.max(0.2, t ? t.cap : 0.5);   // حداقل ۲۰٪ خاک تا پایتخت (پایتخت نزدیک مرز یک‌شبه سقوط نکند)
  }
  /** نقطه‌ی شروع پیشروی در خاک id از سمت from */
  function frontPoint(state, id, from) {
    const c = state.countries[id];
    return (c.borderPos && c.borderPos[from]) || c.pos;
  }
  /** شهرهای id که داخل منطقه‌ی تصرف‌شده‌اند */
  function citiesInside(state, id, from, pct) {
    const r = radiusFor(state, id, from, pct);
    if (!r) return [];
    const bp = frontPoint(state, id, from);
    return state.countries[id].cities.filter(ct => M().distanceKm(bp, ct.pos) / 111.2 <= r);
  }
  /** خاکی که از قبل (با صلح) واگذار شده: درصد id که دست by است */
  function cededPct(state, id, by) {
    const t = (state.territory || []).find(x => x.country === id && x.by === by);
    return t ? t.pct : 0;
  }
  function occupied(war, s) { return clamp(war.front[s] - war.base0[s], 0, 1); }
  /** عمق پیشروی ما در خاک target (۰..۱) — برای تدارکات جبهه */
  function depthInto(state, me, target) {
    const w = warOf(state, me, target);
    if (!w) return 0;
    const s = sideOf(w, me);
    if (w.leaders[other(s)] !== target) return 0;
    return occupied(w, other(s));
  }

  // ===================================================================
  // ارزش رزمی
  // ===================================================================
  function role(type, kind) {
    const d = D().units[type];
    const t = d.attack + d.defense || 1;
    return (kind === 'att' ? d.attack : d.defense) / t * 2;
  }
  function quality(c, type) {
    return 0.6 + 0.6 * clamp((c.tech[D().units[type].branch] || 0) / 100, 0, 1.2);
  }
  const moraleMul = m => 0.4 + 0.6 * clamp(m ?? 75, 0, 100) / 100;
  const supplyMul = s => 0.4 + 0.6 * clamp(s ?? 100, 0, 100) / 100;

  /** ارزش کل ارتش (برای مقایسه/پیش‌بینی): زمینی + هوایی + بخشی از موشک و پهپاد */
  function armyValue(c, kind = 'att') {
    let v = 0;
    for (const [type, n] of Object.entries(c.forces || {})) {
      if (!n) continue;
      const d = D().units[type];
      const w = type === 'missile' || type === 'drone' ? 0.4 : type === 'icbm' || type === 'cyber' ? 0 : d.branch === 'navy' ? 0.4 : 1;
      v += n * d.power * role(type, kind) * quality(c, type) * w;
    }
    return v;
  }
  function branchSnapshot(c) {
    const out = {};
    for (const b of M().BRANCHES) out[b] = M().branchStrength(c.forces, b);
    return out;
  }
  /** تلفات یا فروش سلاحِ کشور هوش مصنوعی ← شاخص نظامی‌اش هم پایین می‌آید (همان فرمول بازیکن) */
  function adjustAiIndex(c, before) {
    if (usesStacks(c)) return;
    for (const b of M().BRANCHES) {
      const s1 = M().branchStrength(c.forces, b), s0 = before[b] || 0;
      if (Math.abs(s1 - s0) < 1e-9) continue;
      const delta = 15 * Math.log2((1 + s1) / (1 + s0));
      c.military[b] = Math.round(clamp(c.military[b] + delta, 0, 120) * 10) / 10;
      if (c.eco && c.eco.milBase && typeof c.eco.milBase[b] === 'number') c.eco.milBase[b] = clamp(c.eco.milBase[b] + delta, 0, 120);
    }
  }

  // -------------------------------------------------------------------
  // نیروهای درگیر هر کشور در یک جنگ
  // -------------------------------------------------------------------
  /**
   * [{ type, n, morale, supply, src, w }]
   *   بازیکن: دسته‌های واقعی (src = دسته)؛ هوش مصنوعی: سهمی از c.forces (src = null)
   * kind: 'ground' (جبهه) | 'air' (حمله‌ی هوایی، فقط در برد) | 'ad' (پدافند) | 'fighters' (رهگیر)
   */
  function engaged(state, war, id, kind) {
    const c = state.countries[id];
    const side = sideOf(war, id);
    const enemy = war.leaders[other(side)];
    const target = war.land ? frontPoint(state, enemy, war.leaders[side]) : state.countries[enemy].pos;
    const out = [];
    if (usesStacks(c)) {
      for (const s of c.mil.stacks) {
        if (s.move || s.count <= 0) continue;
        if (kind === 'ground') {
          if (!GROUND.includes(s.type)) continue;
          if (s.loc.kind === 'border' && !s.loc.sea && war.sides[other(side)].includes(s.loc.target)) out.push({ type: s.type, n: s.count, morale: s.morale, supply: s.supply, src: s, w: 1 });
          // پادگان شهرهای نزدیک جبهه با نصف قدرت کمک می‌کنند
          else if (s.loc.kind === 'city' && war.land && M().distanceKm(s.pos, frontPoint(state, id, enemy)) < 600) out.push({ type: s.type, n: s.count * 0.5, morale: s.morale, supply: s.supply, src: s, w: 0.5 });
        } else if (kind === 'air') {
          if (AIRSTRIKE.includes(s.type) && M().distanceKm(s.pos, target) <= M().rangeOf(c, s.type)) out.push({ type: s.type, n: s.count, src: s, w: 1 });
        } else if (kind === 'ad') {
          if (s.type === 'airdefense') out.push({ type: s.type, n: s.count, src: s, w: 1 });
        } else if (kind === 'fighters') {
          if (s.type === 'fighter') out.push({ type: s.type, n: s.count, src: s, w: 1 });
        }
      }
      return out;
    }
    // هوش مصنوعی: رهبر جبهه با سهم commit، متحد با سهم اعزامی (بعد از ۲ ماه)
    const leader = war.leaders[side] === id;
    if (!leader && state.turn - ((war.joinTurn && war.joinTurn[id]) ?? war.startTurn) < 2) return out;
    const share = leader ? (war.commit[id] ?? 0.5) : (c.neighbors.includes(enemy) ? 0.15 : 0.3);
    const morale = war.morale[id] ?? 75;
    for (const [type, n] of Object.entries(c.forces)) {
      if (!n) continue;
      if (kind === 'ground' && GROUND.includes(type)) out.push({ type, n: n * share, morale, supply: 90 - 30 * depthInto(state, id, enemy), src: null, w: share });
      else if (kind === 'air' && AIRSTRIKE.includes(type)) {
        // رهبر از خاک خودش می‌زند (برد مهم است)؛ متحدِ اعزامی در منطقه‌ی جنگ مستقر است
        if (leader && M().distanceKm(c.pos, target) > M().rangeOf(c, type)) continue;
        // رهبرِ مهاجم هم همه‌ی نیروی هوایی‌اش را نمی‌فرستد (بخشی برای دفاع از خودش)
        const airShare = leader ? (war.leaders.B === id ? 1 : Math.min(1, share + 0.15)) : share;
        out.push({ type, n: n * airShare, src: null, w: airShare });
      } else if ((kind === 'ad' && type === 'airdefense') || (kind === 'fighters' && type === 'fighter')) {
        out.push({ type, n: leader ? n : n * share, src: null, w: leader ? 1 : share });
      }
    }
    return out;
  }

  /** کم کردن تعداد از یک «سهم» (دسته‌ی واقعی یا c.forces). خروجی: تعداد کم‌شده */
  function removeUnits(state, c, e, k, rng) {
    if (k <= 0) return 0;
    const def = D().units[e.type];
    if (e.src) {
      const s = e.src;
      if (def.counted === 'unit') {
        s.dmg = (s.dmg || 0) + k;
        const whole = Math.min(s.count, Math.floor(s.dmg));
        s.count -= whole; s.dmg -= whole;
        return k;
      }
      const n = Math.min(s.count, Math.floor(k) + (rng.next() < k - Math.floor(k) ? 1 : 0));
      s.count -= n;
      return n;
    }
    if (def.counted === 'unit') {
      c.wdmg ||= {};
      c.wdmg[e.type] = (c.wdmg[e.type] || 0) + k;
      const whole = Math.min(c.forces[e.type], Math.floor(c.wdmg[e.type]));
      c.forces[e.type] -= whole; c.wdmg[e.type] -= whole;
      return k;
    }
    const n = Math.min(c.forces[e.type], Math.floor(k) + (rng.next() < k - Math.floor(k) ? 1 : 0));
    c.forces[e.type] -= n;
    return n;
  }

  function recordLoss(war, c, type, n) {
    if (!n) return;
    const v = n * D().units[type].power * quality(c, type);
    war.lost[c.id] = (war.lost[c.id] || 0) + v;
    war.monthLost[c.id] = (war.monthLost[c.id] || 0) + v;
  }

  function sideEngaged(state, war, side, kind) {
    const out = [];
    for (const id of war.sides[side]) for (const e of engaged(state, war, id, kind)) out.push({ ...e, c: state.countries[id] });
    return out;
  }
  const sumN = (list, type) => list.filter(e => !type || e.type === type).reduce((s, e) => s + e.n, 0);

  // ===================================================================
  // جنگ هوایی: اول پدافند، بعد نیروی زمینی
  // ===================================================================
  function airCampaign(state, war, side, rng, rep) {
    const out = { fired: {}, lost: {}, adKilled: 0, groundDmg: 0, enemyAd: 0, active: false };
    rep.air[side] = out;
    const enemySide = other(side);
    const enemyAdList = sideEngaged(state, war, enemySide, 'ad');
    out.enemyAd = sumN(enemyAdList);
    out.enemyAdAfter = out.enemyAd;
    if (war.plan[side] !== 'combined') return out;
    const assets = sideEngaged(state, war, side, 'air');
    const salvo = war.salvo[side] ?? 0.1;   // هوش مصنوعی: SALVO متوسط (در سناریو کم)
    const shots = [];
    for (const e of assets) {
      let n;
      if (e.type === 'missile' || e.type === 'drone') n = Math.round(e.n * salvo);
      else if (e.type === 'icbm') n = war.icbm[side] ? Math.min(Math.floor(e.n), Math.max(1, Math.round(e.n * 0.05))) : 0;
      else n = Math.round(e.n * SORTIE * (1 + Tc().warMul(e.c, 'sortie')));   // جنگنده و بمب‌افکن: سهم عملیاتی (دکترین برتری هوایی بیشتر)
      if (n > 0) shots.push({ e, n });
    }
    if (!shots.length) return out;
    out.active = true;
    // ---- رهگیری ----
    const icp = D().units.airdefense.intercept;
    const myCyber = war.sides[side].reduce((s, id) => s + (state.countries[id].forces.cyber || 0), 0);
    const enCyber = war.sides[enemySide].reduce((s, id) => s + (state.countries[id].forces.cyber || 0), 0);
    const cyberCut = 0.2 * myCyber / (myCyber + enCyber + 1e-9);
    const adCap = out.enemyAd * (1 - cyberCut);
    const fCap = 0.2 * sumN(sideEngaged(state, war, enemySide, 'fighters'));
    let Dm = 0, Da = 0;
    for (const { e, n } of shots) {
      const d = n / icp[e.type];
      if (e.type === 'missile' || e.type === 'icbm') Dm += d; else Da += d;
    }
    const Dt = Dm + Da || 1;
    const fm = Dm ? Math.min(0.9, adCap * (Dm / Dt) / Dm) : 0;
    const fa = Da ? Math.min(0.9, (adCap * (Da / Dt) + fCap) / Da) : 0;
    out.interceptM = Math.round(fm * 100); out.interceptA = Math.round(fa * 100);
    // ---- نتیجه ----
    let poolAd = 0, poolGround = 0;
    for (const { e, n } of shots) {
      const t = e.type, def = D().units[t];
      const f = t === 'missile' || t === 'icbm' ? fm : fa;
      const down = n * f;
      out.fired[t] = (out.fired[t] || 0) + n;
      if (t === 'missile' || t === 'drone' || t === 'icbm') removeUnits(state, e.c, e, n, rng);   // شلیک‌شده مصرف می‌شود
      else { const k = removeUnits(state, e.c, e, down, rng); out.lost[t] = (out.lost[t] || 0) + k; recordLoss(war, e.c, t, k); }
      // دکترین جنگ نامتقارن: موشک و پهپاد کاری‌تر
      const leak = (n - down) * (t === 'missile' || t === 'drone' ? 1 + Tc().warMul(e.c, 'strike') : 1);
      poolAd += leak * def.strike.ad;
      poolGround += leak * def.strike.ground;
    }
    // اول پدافند دشمن
    const kill = Math.min(out.enemyAd, poolAd);
    if (kill > 0) { distributeLosses(state, war, enemyAdList, kill, rng); out.adKilled = kill; }
    const usedFrac = poolAd > 0 ? kill / poolAd : 0;
    // بعد: بقیه‌ی ضربه روی سر نیروی زمینی دشمن
    const dmg = poolGround * (1 - usedFrac);
    if (dmg > 0) out.groundDmg = damageGround(state, war, sideEngaged(state, war, enemySide, 'ground').filter(e => e.type !== 'airdefense'), dmg, rng);
    out.enemyAdAfter = sumN(sideEngaged(state, war, enemySide, 'ad'));
    return out;
  }

  /** پخش k عدد تلفات بین سهم‌ها به نسبت تعداد */
  function distributeLosses(state, war, list, k, rng) {
    const tot = sumN(list);
    if (tot <= 0) return;
    for (const e of list) recordLoss(war, e.c, e.type, removeUnits(state, e.c, e, k * e.n / tot, rng));
  }

  /** ضربه‌ی هوایی به نیروی زمینی (dmg = واحد قدرت) — بیشتر روی پیاده‌نظام */
  function damageGround(state, war, list, dmg, rng) {
    const wt = e => e.n * D().units[e.type].power * (e.type === 'infantry' ? 1.5 : 1);
    const tot = list.reduce((s, e) => s + wt(e), 0);
    if (tot <= 0) return 0;
    let done = 0;
    for (const e of list) {
      const k = Math.min(e.n * 0.4, dmg * wt(e) / tot / D().units[e.type].power);   // در یک ماه حداکثر ۴۰٪
      const n = removeUnits(state, e.c, e, k, rng);
      recordLoss(war, e.c, e.type, D().units[e.type].counted === 'unit' ? k : n);
      done += k * D().units[e.type].power;
    }
    return done;
  }

  // ===================================================================
  // جبهه‌ی زمینی
  // ===================================================================
  function groundPower(list, kind) {
    let v = 0;
    const dk = kind === 'att' ? 'groundAtt' : 'groundDef';   // دکترین (درخت پیشرفت)
    for (const e of list) v += e.n * D().units[e.type].power * role(e.type, kind) * quality(e.c, e.type) * moraleMul(e.morale) * supplyMul(e.supply) * (1 + Tc().warMul(e.c, dk));
    return v;
  }
  function sizeScale(state, id) {
    return clamp(Math.pow(200000 / (state.countries[id].area || 200000), 0.35), 0.3, 2.5);
  }
  function fortMul(state, war) { return 1 + clamp((state.turn - war.start) * 0.03, 0, 0.4); }

  function groundFront(state, war, rng, rep) {
    const A = war.leaders.A, B = war.leaders.B;
    const gA = sideEngaged(state, war, 'A', 'ground'), gB = sideEngaged(state, war, 'B', 'ground');
    // پشتیبانی هوایی نزدیک: نقشه‌ی ترکیبی + پدافند دشمن (تقریباً) نابود + هنوز حمله‌ی هوایی داریم
    const casA = war.plan.A === 'combined' && rep.air.A.active && rep.air.A.enemyAdAfter <= Math.max(0.5, (war.adStart.B || 0) * 0.1);
    const casB = war.plan.B === 'combined' && rep.air.B.active && rep.air.B.enemyAdAfter <= Math.max(0.5, (war.adStart.A || 0) * 0.1);
    const luckA = rng.range(0.9, 1.1), luckB = rng.range(0.9, 1.1);
    const terr = id => TERRAIN[state.countries[id].terrain] || 1;
    const libA = occupied(war, 'A') > 0.001, libB = occupied(war, 'B') > 0.001;
    // A می‌خواهد پیش برود (یا خاک خودش را پس بگیرد) و B دفاع می‌کند — و برعکس
    const aAtt = groundPower(gA, 'att') * (casA ? 1.3 : 1) * luckA;
    const bDef = groundPower(gB, 'def') * (libA ? terr(A) : terr(B) * fortMul(state, war)) * luckB;
    const bAtt = groundPower(gB, 'att') * (casB ? 1.3 : 1) * luckB;
    const aDef = groundPower(gA, 'def') * (libB ? terr(B) : terr(A) * fortMul(state, war)) * luckA;
    const r1 = aAtt / Math.max(bDef, 1e-6), r2 = bAtt / Math.max(aDef, 1e-6);
    let winner = null, r = 1;
    if (gA.length && (r1 >= 1 || !gB.length) && r1 >= r2) { winner = 'A'; r = gB.length ? r1 : 9; }
    else if (gB.length && (r2 >= 1 || !gA.length)) { winner = 'B'; r = gA.length ? r2 : 9; }
    rep.ground = {
      A: { owners: war.sides.A.filter(id => engaged(state, war, id, 'ground').length), units: unitsOf(gA), att: aAtt, def: aDef, cas: casA },
      B: { owners: war.sides.B.filter(id => engaged(state, war, id, 'ground').length), units: unitsOf(gB), att: bAtt, def: bDef, cas: casB },
      r1, r2, winner, terrainA: terr(A), terrainB: terr(B), fort: fortMul(state, war), luck: { A: luckA, B: luckB },
    };
    if (!gA.length && !gB.length) return;
    // ---- تلفات (ماهانه، نابودی کامل نیست) ----
    const k = clamp((r - 1) / 2, 0, 1);
    const loserPct = 0.05 + 0.05 * k, winPct = 0.025 - 0.01 * k;
    const pctA = winner === 'A' ? winPct : winner === 'B' ? loserPct : 0.02;
    const pctB = winner === 'B' ? winPct : winner === 'A' ? loserPct : 0.02;
    applyGroundLosses(state, war, gA, pctA, winner === 'A', !winner, rng, rep.ground.A, k);
    applyGroundLosses(state, war, gB, pctB, winner === 'B', !winner, rng, rep.ground.B, k);
    if (!winner) return;
    // ---- جابه‌جایی خاک ----
    const cas = winner === 'A' ? casA : casB;
    const rate = cas ? RATE_COMBINED : RATE_GROUND;
    const raw = Math.min(rate, r >= 9 ? rate : 0.002 + 0.03 * (r - 1) * (cas ? 2 : 1));
    const me = winner, en = other(winner);
    if (occupied(war, me) > 0.001) {
      // اول خاک خودی آزاد می‌شود
      const d = Math.min(occupied(war, me), raw * sizeScale(state, war.leaders[me]));
      war.front[me] -= d;
      rep.liberated = { side: me, pct: d };
    } else {
      const d = Math.min(1 - war.front[en], raw * sizeScale(state, war.leaders[en]));
      war.front[en] += d;
      rep.advance = { side: me, pct: d };
    }
  }

  function unitsOf(list) {
    const u = {};
    for (const e of list) { const x = u[e.type] || (u[e.type] = [0, 0]); x[0] += e.n; }
    return u;
  }

  function applyGroundLosses(state, war, list, pct, won, stalemate, rng, out, k) {
    for (const e of list) {
      const n = e.n * pct;
      const got = removeUnits(state, e.c, e, n, rng);
      const shown = D().units[e.type].counted === 'unit' ? n : got;
      out.units[e.type][1] += shown;
      recordLoss(war, e.c, e.type, shown);
      if (e.src) {
        const dm = won ? 3 : stalemate ? -2 : -(6 + 10 * k);
        e.src.morale = clamp((e.src.morale ?? 75) + dm * (e.w || 1), 0, 100);
        e.src.inBattle = true;
        if (won) e.src.exp = clamp((e.src.exp || 0) + 3, 0, 100);
      }
    }
    for (const id of new Set(list.filter(e => !e.src).map(e => e.c.id))) {
      war.morale[id] = clamp((war.morale[id] ?? 75) + (won ? 3 : stalemate ? -1 : -(6 + 10 * k)), 10, 100);
    }
  }

  // ===================================================================
  // اعلان جنگ، اولتیماتوم، متحدان
  // ===================================================================
  function isJustified(state, att, def) {
    if (E().getRelation(state, att, def) <= -60) return true;
    if (E().warsOf(state, def).some(x => E().areAllied(state, att, x))) return true;
    if ((state.territory || []).some(t => t.country === att && t.by === def)) return true;
    return false;
  }

  function canDeclare(state, att, def) {
    const a = state.countries[att], d = state.countries[def];
    if (!d || att === def) return 'self';
    if (d.annexedBy || a.annexedBy) return 'gone';
    if (E().isAtWar(state, att, def)) return 'already';
    if (d.puppetOf === att) return 'puppet';
    const t = (state.truces || {})[E().relKey(att, def)];
    if (t && t > state.turn) return 'truce';
    return null;
  }

  function joinScore(state, x, att, def) {
    const pact = E().defensePartners(state, def).includes(x);
    const powX = E().militaryPower(state.countries[x]), powA = Math.max(1, E().militaryPower(state.countries[att]));
    return (pact ? 55 : 45) + E().getRelation(state, x, def) * 0.4 - E().getRelation(state, x, att) * 0.3
      + (E().areAllied(state, x, att) ? -45 : 0) + Math.min(25, 25 * powX / powA) - (E().warsOf(state, x).length ? 20 : 0);
  }

  function joinCandidates(state, att, def) {
    const out = [];
    const d = state.countries[def];
    for (const x of Object.values(state.countries)) {
      if (x.id === att || x.id === def || x.annexedBy || E().isAtWar(state, x.id, att)) continue;
      if (!(E().areAllied(state, x.id, def) || x.puppetOf === def || d.puppetOf === x.id)) continue;
      out.push({ id: x.id, score: x.puppetOf === def ? 100 : joinScore(state, x.id, att, def) });
    }
    return out.sort((a, b) => b.score - a.score);
  }

  function landNeighbors(state, a, b) {
    const ca = state.countries[a], cb = state.countries[b];
    return ca.neighbors.includes(b) && !!(cb.borderPos && cb.borderPos[a]);
  }

  /** دسته‌های زمینیِ بازیکن که الان در مرز هدف‌اند */
  function atBorder(state, pid, target) {
    const c = state.countries[pid];
    return usesStacks(c) ? c.mil.stacks.filter(s => !s.move && s.loc.kind === 'border' && !s.loc.sea && s.loc.target === target && GROUND.includes(s.type)) : [];
  }

  /** پیش‌بینی پیامدهای حمله (پنجره‌ی اعلان جنگ و مشاور) */
  function predict(state, att, def) {
    const justified = isJustified(state, att, def);
    const a = state.countries[att], d = state.countries[def];
    const shared = state.alliances.filter(al => al.type === 'military' && al.members.includes(att) && al.members.includes(def));
    const joiners = joinCandidates(state, att, def).map(j => ({
      id: j.id, chance: clamp(((shared.length && !E().defensePartners(state, att).includes(j.id) ? j.score + 45 : j.score) - 45) / 20, 0, 1),
    })).filter(j => j.chance > 0.05);
    const ourValue = armyValue(a, 'att');
    let theirValue = armyValue(d, 'def');
    for (const j of joiners) theirValue += armyValue(state.countries[j.id], 'def') * j.chance * 0.3;
    const sanctionRisk = Object.values(state.countries).filter(x => x.id !== att && x.id !== def && !x.annexedBy && x.gdp >= 30 &&
      E().getRelation(state, x.id, att) - (justified ? 8 : 20) <= -40 && E().getRelation(state, x.id, def) >= 10 &&
      !state.sanctions.some(([by, t]) => by === x.id && t === att)).map(x => x.id);
    const land = landNeighbors(state, att, def);
    const strike = ['missile', 'drone', 'fighter', 'bomber'].reduce((s, t) => s + (a.forces[t] || 0) * D().units[t].strike.ad, 0);
    return {
      justified, joiners, ourValue, theirValue, ratio: ourValue / Math.max(theirValue, 1),
      terrain: d.terrain, land, sanctionRisk, expelled: shared.map(x => x.id), area: d.area,
      atBorder: atBorder(state, att, def).length, relDrop: justified ? 8 : 20, stabilityHit: justified ? 0 : 5,
      capitalAt: land ? capitalAt(state, def, att) : null,
      theirAd: d.forces.airdefense || 0, adKillPower: strike,
    };
  }

  /**
   * اولتیماتوم: کشور هدف می‌جنگد یا پول پیشنهاد می‌دهد؟ → { pay, amount }
   * اگر خیلی ضعیف‌تر است (×۱٫۸ یا بیشتر) و متحد قوی ندارد، بخشی از خزانه‌اش را پیشنهاد می‌کند.
   */
  function ultimatum(state, att, def, rng) {
    const p = predict(state, att, def);
    const d = state.countries[def];
    const joinVal = p.joiners.reduce((s, j) => s + armyValue(state.countries[j.id], 'def') * j.chance * 0.3, 0);
    if (p.ratio < 1.8 || joinVal > p.ourValue * 0.5 || d.eco.treasury <= 0.05) return { pay: false, amount: 0, ratio: p.ratio };
    if (rng.next() > clamp(0.5 + (p.ratio - 1.8) * 0.2, 0.5, 0.95)) return { pay: false, amount: 0, ratio: p.ratio };
    const share = clamp(0.3 + 0.15 * (p.ratio - 1.8), 0.3, 0.8);
    return { pay: true, amount: Math.round(d.eco.treasury * share * 100) / 100, ratio: p.ratio };
  }

  /** مهاجم پول را پذیرفت: پول منتقل می‌شود، جنگی نمی‌شود؛ رابطه خراب و ۲۴ ماه آتش‌بس */
  function acceptTribute(state, att, def, amount) {
    const a = state.countries[att], d = state.countries[def];
    amount = Math.min(amount, Math.max(0, d.eco.treasury));
    d.eco.treasury -= amount;
    a.eco.treasury += amount;
    a.aggression = clamp((a.aggression || 0) + 8, 0, 100);
    addRel(state, att, def, -30);
    for (const x of E().activeCountries(state)) if (x.id !== att && x.id !== def) addRel(state, x.id, att, -3);
    (state.truces ||= {})[E().relKey(att, def)] = state.turn + 24;
    return amount;
  }

  /**
   * اعلان جنگ (بعد از رد اولتیماتوم). خروجی: { war, joiners, sanctions, justified, expelled }
   * opts.scenario: جنگ از قبل در جریان؛ opts.front: درصد خاکی که از قبل گرفته شده
   */
  function declare(state, att, def, rng, opts = {}) {
    const justified = opts.scenario ? true : isJustified(state, att, def);
    const land = landNeighbors(state, att, def);
    const war = {
      id: 'W' + (state.nextWarId = (state.nextWarId || 0) + 1),
      start: opts.scenario ? state.turn - 14 : state.turn, startTurn: state.turn, justified, scenario: !!opts.scenario, land,
      sides: { A: [att], B: [def] }, leaders: { A: att, B: def },
      front: { A: cededPct(state, att, def), B: Math.max(cededPct(state, def, att), opts.front || 0) },
      base0: { A: cededPct(state, att, def), B: cededPct(state, def, att) },
      plan: { A: 'ground', B: 'ground' }, salvo: { A: SALVO[1], B: SALVO[1] }, icbm: { A: false, B: false },
      commit: {}, morale: {}, adStart: {}, adAlarm: { A: 0, B: 0 }, capFallen: { A: false, B: false },
      base: {}, lost: {}, monthLost: {}, groundBase: {}, log: [], lastOffer: state.turn, score: 0,
    };
    wars(state).push(war);
    const out = { war, joiners: [], sanctions: [], justified, expelled: [] };

    if (!opts.scenario) {
      for (const al of state.alliances) {
        if (al.type === 'military' && al.members.includes(att) && al.members.includes(def)) {
          al.members = al.members.filter(m => m !== att);
          out.expelled.push(al.id);
        }
      }
      state.defensePacts = state.defensePacts.filter(([x, y]) => !((x === att && y === def) || (x === def && y === att)));
      if (state.countries[def].puppetOf === att) delete state.countries[def].puppetOf;
      const drop = justified ? 8 : 20;
      for (const x of Object.values(state.countries)) {
        if (x.id === att || x.id === def || x.annexedBy) continue;
        const friend = E().getRelation(state, x.id, def) >= 25 || E().areAllied(state, x.id, def);
        addRel(state, x.id, att, -(drop + (friend ? 15 : 0)));
      }
      if (!justified) {
        const a = state.countries[att];
        a.stability = clamp(a.stability - 5, 0, 100);
        a.eco.mods.push({ stat: 'stability', value: -3, turns: 6 });
      }
      // متحدان مدافع (بازیکن خودکار وارد نمی‌شود؛ از او پرسیده می‌شود)
      for (const j of joinCandidates(state, att, def)) {
        if (j.id === state.playerId) { if (j.score > 30) out.askPlayer = true; continue; }
        if (j.score + rng.range(-10, 10) > 55) { war.sides.B.push(j.id); out.joiners.push(j.id); }
      }
      // متحدان مهاجم (جنگ تهاجمی؛ سخت‌تر وارد می‌شوند)
      out.attJoiners = [];
      for (const j of joinCandidates(state, def, att)) {
        if (j.id === state.playerId || sideOf(war, j.id)) continue;
        if (j.score + rng.range(-10, 10) > 68) { war.sides.A.push(j.id); out.attJoiners.push(j.id); }
      }
      // پرخاشگری: حافظه‌ی جهان (شاخص تهدید)
      const ca = state.countries[att];
      ca.aggression = clamp((ca.aggression || 0) + (justified ? 10 : 20), 0, 100);
      for (const x of Object.values(state.countries)) {
        if (x.id === att || sideOf(war, x.id) || x.annexedBy || x.gdp < 30) continue;
        if (state.sanctions.some(([by, t]) => by === x.id && t === att)) continue;
        if (E().getRelation(state, x.id, att) <= -40 && E().getRelation(state, x.id, def) >= 10 && rng.next() < (justified ? 0.2 : 0.6)) {
          state.sanctions.push([x.id, att]);
          if (SG.Diplomacy) SG.Diplomacy.removeTrade(state, x.id, att);
          out.sanctions.push(x.id);
        }
      }
    }
    for (const a of war.sides.A) for (const b of war.sides.B) { setRel(state, a, b, -100); if (SG.Diplomacy) SG.Diplomacy.removeTrade(state, a, b); }
    syncPairs(state);
    for (const id of members(war)) {
      const c = state.countries[id];
      war.base[id] = Math.max(1, armyValue(c));
      war.lost[id] = 0;
      let g = 0; for (const t of GROUND) g += (c.forces[t] || 0) * D().units[t].power * quality(c, t);
      war.groundBase[id] = Math.max(1, g);
      if (!usesStacks(c)) {
        war.morale[id] = 75;
        war.commit[id] = id === def ? 0.5 : id === att ? (opts.scenario ? 0.35 : 0.5) : 0.3;
      }
    }
    for (const s of ['A', 'B']) {
      if (!isPlayer(state, war.leaders[s])) war.plan[s] = aiPlan(state, war, s);
      war.adStart[s] = sumN(sideEngaged(state, war, s, 'ad'));
    }

    const pid = state.playerId;
    if (pid && (att === pid || def === pid)) {
      const enemy = att === pid ? def : att;
      N().add(state, { type: def === pid ? 'war_declared_on_us' : land ? 'war_declared' : 'war_declared_air', level: 'critical', category: 'military', speaker: 'commander', focus: enemy,
        data: { commander: chiefOf(state), country: enemy, ad: state.countries[enemy].forces.airdefense || 0, war: war.id } });
      for (const j of out.joiners) N().add(state, { type: 'ally_joined', level: 'warning', category: 'diplomacy', speaker: 'foreign', focus: j, data: { country: j, other: def } });
      if (out.sanctions.length) N().add(state, { type: 'sanctions_new', level: 'warning', category: 'diplomacy', speaker: 'foreign', data: { n: out.sanctions.length, country: out.sanctions[0] } });
      for (const al of out.expelled) N().add(state, { type: 'alliance_expelled', level: 'warning', category: 'diplomacy', speaker: 'foreign', data: { alliance: state.alliances.find(x => x.id === al)?.name || al } });
      for (const j of out.attJoiners || []) N().add(state, { type: att === pid ? 'ally_joined_us' : 'ally_joined', level: 'warning', category: 'diplomacy', speaker: 'foreign', focus: j, data: { country: j, other: att } });
    } else if (!opts.scenario && pid) {
      N().add(state, { type: 'world_war_declared', level: 'info', category: 'world', speaker: 'news', focus: def, data: { a: att, b: def } });
      // متحد ما مورد حمله قرار گرفت: کمک می‌کنیم؟
      if (out.askPlayer && SG.Diplomacy) {
        const prop = SG.Diplomacy.propose(state, { type: 'ally', from: def, to: pid, data: { war: war.id, enemy: att } });
        N().add(state, { type: 'ally_attacked', level: 'critical', category: 'diplomacy', speaker: 'foreign', focus: def, data: { country: def, other: att, prop: prop.id } });
      }
    }
    return out;
  }

  function chiefOf(state) {
    const p = state.countries[state.playerId];
    return p && p.mil ? p.mil.chief : '';
  }

  /** نقشه‌ی جنگ هوش مصنوعی: اگر سلاح هوایی/موشکیِ در برد دارد، ترکیبی */
  function aiPlan(state, war, side) {
    // جنگ فرسایشیِ از قبل در جریان (داده‌ی سناریو): جبهه‌ی زمینی، بدون کارزار هوایی بزرگ
    if (war.scenario) return 'ground';
    const strike = sideEngaged(state, war, side, 'air').reduce((s, e) => s + e.n * (D().units[e.type].strike?.ad || 0) * (e.type === 'missile' || e.type === 'drone' ? 0.1 : 1), 0);
    return strike >= 0.5 ? 'combined' : 'ground';
  }

  /** افزودن یک کشور به یک طرف جنگ در جریان (کمک به متحد) */
  function addToWar(state, war, id, side) {
    if (!side || sideOf(war, id)) return;
    war.sides[side].push(id);
    for (const e of war.sides[other(side)]) { setRel(state, id, e, -100); if (SG.Diplomacy) SG.Diplomacy.removeTrade(state, id, e); }
    syncPairs(state);
    const c = state.countries[id];
    war.base[id] = Math.max(1, armyValue(c)); war.lost[id] = 0;
    let g = 0; for (const t of GROUND) g += (c.forces[t] || 0) * D().units[t].power * quality(c, t);
    war.groundBase[id] = Math.max(1, g);
    if (!usesStacks(c)) { war.morale[id] = 75; war.commit[id] = 0.3; }
    war.joinTurn = war.joinTurn || {}; war.joinTurn[id] = state.turn;
  }

  /** دستور جنگ بازیکن: نقشه (ground/combined)، شدت شلیک، اجازه‌ی قاره‌پیما */
  function setOrders(state, warId, id, { plan, salvo, icbm }) {
    const war = warById(state, warId);
    if (!war) return;
    const s = sideOf(war, id);
    if (plan) war.plan[s] = plan === 'combined' ? 'combined' : 'ground';
    if (salvo !== undefined) war.salvo[s] = SALVO.includes(+salvo) ? +salvo : SALVO[1];
    if (icbm !== undefined) war.icbm[s] = !!icbm;
  }

  // ===================================================================
  // یک نوبت
  // ===================================================================
  function step(state, rng) {
    const events = [];
    const pid = state.playerId;
    if (pid && state.countries[pid].mil) for (const s of state.countries[pid].mil.stacks) s.inBattle = false;
    for (const war of wars(state).slice()) {
      if (!wars(state).includes(war)) continue;
      war.monthLost = {};
      const snaps = {};
      for (const id of members(war)) snaps[id] = branchSnapshot(state.countries[id]);
      // هوش مصنوعی: سهم نیروی جبهه کم‌کم بیشتر می‌شود؛ نقشه بازبینی می‌شود
      for (const id of members(war)) {
        if (isPlayer(state, id)) continue;
        if (war.leaders.B === id) war.commit[id] = Math.min(0.85, (war.commit[id] ?? 0.5) + 0.1);
        else if (war.leaders.A === id) war.commit[id] = war.scenario ? 0.35 : Math.min(0.8, (war.commit[id] ?? 0.5) + 0.05);
      }
      for (const s of ['A', 'B']) if (!isPlayer(state, war.leaders[s])) { war.plan[s] = aiPlan(state, war, s); war.salvo[s] = war.scenario ? SALVO[0] : SALVO[1]; }

      const rep = { id: 'R' + (state.nextReportId = (state.nextReportId || 0) + 1), turn: state.turn, date: { ...state.date }, war: war.id,
        frontBefore: { ...war.front }, air: {} };
      airCampaign(state, war, 'A', rng, rep);
      airCampaign(state, war, 'B', rng, rep);
      if (war.land) groundFront(state, war, rng, rep);
      rep.frontAfter = { ...war.front };

      for (const id of members(war)) {
        const c = state.countries[id];
        if (usesStacks(c)) c.mil.stacks = c.mil.stacks.filter(s => s.count > 0);
        adjustAiIndex(c, snaps[id]);
      }
      // آلارم پدافند: ۵۰٪ و ۱۰۰٪ نابود
      for (const s of ['A', 'B']) {
        const start = war.adStart[s] || 0;
        if (start < 1) continue;
        const now = sumN(sideEngaged(state, war, s, 'ad'));
        const lvl = now < 0.5 ? 100 : now <= start * 0.5 ? 50 : 0;
        if (lvl > (war.adAlarm[s] || 0)) {
          war.adAlarm[s] = lvl;
          events.push({ type: 'ad_alarm', war: war.id, side: s, level: lvl, left: Math.round(now), start: Math.round(start) });
        }
      }
      // سقوط پایتخت
      if (war.land) {
        for (const s of ['A', 'B']) {
          const id = war.leaders[s], from = war.leaders[other(s)];
          const at = capitalAt(state, id, from);
          if (!war.capFallen[s] && war.front[s] >= at && occupied(war, s) > 0) {
            war.capFallen[s] = true;
            if (!isPlayer(state, id)) { war.morale[id] = clamp((war.morale[id] ?? 75) - 30, 10, 100); war.commit[id] = Math.max(0.4, (war.commit[id] ?? 0.5) - 0.2); }
            state.countries[id].stability = clamp(state.countries[id].stability - 10, 0, 100);
            events.push({ type: 'capital', war: war.id, side: s, country: id, by: from });
          } else if (war.capFallen[s] && war.front[s] < at - 0.02) {
            war.capFallen[s] = false;
            events.push({ type: 'capital_back', war: war.id, side: s, country: id, by: from });
          }
        }
      }
      // خستگی جنگ
      for (const id of members(war)) {
        const c = state.countries[id];
        const frac = (war.monthLost[id] || 0) / Math.max(war.base[id] || 1, 1);
        const s = sideOf(war, id);
        const occ = war.leaders[s] === id && occupied(war, s) > 0.005 ? 0.5 : 0;
        const before = c.warWeariness || 0;
        c.warWeariness = clamp(before + 0.6 + Math.min(2.4, frac * 30) + occ, 0, 100);
        if (id === pid) for (const t of [30, 60]) if (before < t && c.warWeariness >= t) events.push({ type: 'weariness', level: t, war: war.id });
      }
      computeScore(state, war);
      war.log.push(rep);
      if (war.log.length > MAX_REPORTS) war.log.shift();
      if (pid && sideOf(war, pid)) events.push({ type: 'front', war: war.id, report: rep });
      else if (rep.advance && rep.advance.pct > 0.03) events.push({ type: 'world_front', war: war.id, report: rep, attacker: war.leaders[rep.advance.side], target: war.leaders[other(rep.advance.side)], pct: Math.round(war.front[other(rep.advance.side)] * 100) });

      // فتح کامل: ۱۰۰٪ خاک
      for (const s of ['A', 'B']) {
        if (war.front[s] < 0.995) continue;
        if (isPlayer(state, war.leaders[s])) {
          // کشور بازیکن کامل اشغال شد: پایان بازی
          state.gameOver = { reason: 'conquered', turn: state.turn, by: war.leaders[other(s)] };
          N().add(state, { type: 'game_over_conquered', level: 'critical', category: 'military', speaker: 'news', focus: war.leaders[s], data: { country: war.leaders[other(s)] } });
        } else makePeace(state, war.id, 'annex', war.leaders[other(s)]);
        break;
      }
    }

    // اثر خستگی جنگ و اشغال روی همه
    const atWar = new Set(state.wars.flat());
    refreshOccupation(state);
    for (const c of Object.values(state.countries)) {
      if (c.annexedBy || !c.eco) continue;
      if (!atWar.has(c.id) && c.warWeariness) c.warWeariness = Math.max(0, c.warWeariness - 2);
      const w = c.warWeariness || 0;
      if (w > 0) {
        c.eco.mods.push({ stat: 'stability', value: -w / 10, turns: 1 });
        c.eco.mods.push({ stat: 'inflation', value: w / 25, turns: 1 });
      }
      const occ = c.eco.occ;
      if (occ && occ.gdp > 0) c.eco.mods.push({ stat: 'stability', value: -occ.gdp * 30, turns: 1 });
    }
    integrate(state);
    for (const war of wars(state).slice()) peaceStep(state, war, rng);
    return events;
  }

  // ===================================================================
  // امتیاز، اقتصاد اشغال، صلح
  // ===================================================================
  function computeScore(state, war) {
    const a = war.leaders.A, b = war.leaders.B;
    const sideLost = side => war.sides[side].reduce((s, id) => s + (war.lost[id] || 0), 0) / Math.max(1, war.sides[side].reduce((s, id) => s + (war.base[id] || 1), 0));
    const ca = state.countries[a], cb = state.countries[b];
    const score = occupied(war, 'B') * 100 - occupied(war, 'A') * 100
      + clamp((sideLost('B') - sideLost('A')) * 60, -25, 25)
      + ((cb.warWeariness || 0) - (ca.warWeariness || 0)) * 0.15
      + (war.capFallen.B ? 15 : 0) - (war.capFallen.A ? 15 : 0);
    war.score = Math.round(clamp(score, -100, 100));
    return war.score;
  }
  function scoreFor(state, war, id) { return sideOf(war, id) === 'A' ? war.score : -war.score; }

  /** نیروی زمینیِ کشور فروپاشیده؟ (کمتر از ۱۲٪ ارزش اول جنگ) */
  function collapsed(state, war, id) {
    const c = state.countries[id];
    let v = 0;
    for (const t of GROUND) v += (c.forces[t] || 0) * D().units[t].power * quality(c, t);
    return v < (war.groundBase[id] || 1) * 0.12;
  }

  /** مبلغ پیشنهادی برای شرط «پرداخت پول» (از دید id) */
  function payAmount(state, war, id) {
    const s = sideOf(war, id);
    const en = state.countries[war.leaders[other(s)]];
    const sc = scoreFor(state, war, id);
    return Math.round(Math.max(0, en.eco.treasury) * clamp(0.3 + sc / 150, 0.3, 0.9) * 100) / 100;
  }

  /** دشمن تسلیم است؟ (پایتخت افتاده، ۶۰٪ خاک، یا ارتش فروپاشیده با ۲۵٪ خاک) */
  function surrendered(state, war, s) {
    const held = occupied(war, s);
    return war.capFallen[s] || held >= 0.6 || (held >= 0.25 && collapsed(state, war, war.leaders[s]));
  }

  /** شرط‌های صلح از دید id: [{ term, ok, reason, pct?, amount? }] */
  function peaceTerms(state, war, id) {
    const side = sideOf(war, id), es = other(side);
    const enemy = war.leaders[es];
    const sc = scoreFor(state, war, id);
    const en = state.countries[enemy];
    const isLeader = war.leaders[side] === id;
    const held = occupied(war, es);
    const tired = (en.warWeariness || 0) >= 50 || (war.lost[enemy] || 0) / Math.max(war.base[enemy] || 1, 1) >= 0.5;
    const out = [];
    const add = (term, ok, reason, extra = {}) => out.push({ term, ok, reason: ok ? null : reason, ...extra });
    add('annex', isLeader && war.land && surrendered(state, war, es), !isLeader ? 'not_leader' : !war.land ? 'no_land' : 'need_surrender');
    add('cede', isLeader && held >= 0.02 && sc >= 20, !isLeader ? 'not_leader' : held < 0.02 ? 'no_land_taken' : 'score', { pct: held });
    add('pay', isLeader && sc >= 15 && en.eco.treasury > 0.05, !isLeader ? 'not_leader' : sc < 15 ? 'score' : 'no_money', { amount: payAmount(state, war, id) });
    add('white', sc >= -10 || tired, 'score');
    return out;
  }

  /** بستن صلح. winnerId = کشوری که شرط به نفع اوست */
  function makePeace(state, warId, term, winnerId, amount) {
    const war = warById(state, warId);
    if (!war || !PEACE_TERMS.includes(term)) return false;
    const wSide = sideOf(war, winnerId) || 'A', lSide = other(wSide);
    const W = war.leaders[wSide], L = war.leaders[lSide];
    if (term === 'annex') {
      if (isPlayer(state, L)) return false;   // کشور بازیکن الحاق نمی‌شود (اشغال کامل = پایان بازی)
      endWar(state, war, term, W, L, true); annex(state, W, L); return true;
    }
    if (term === 'cede') cede(state, L, W, war.front[lSide], war.base0[lSide]);
    if (term === 'pay') {
      const lc = state.countries[L], wc = state.countries[W];
      const v = Math.min(amount ?? payAmount(state, war, W), Math.max(0, lc.eco.treasury));
      lc.eco.treasury -= v; wc.eco.treasury += v;
      war.paid = v;
    }
    endWar(state, war, term, W, L);
    return true;
  }

  /** واگذاری درصدی از خاک: GDP، مردم و انرژی همان سهم منتقل می‌شود (با ادغام تدریجی) */
  function cede(state, L, W, pctTotal, base0) {
    const l = state.countries[L], w = state.countries[W];
    const p = clamp((pctTotal - base0) / Math.max(1 - base0, 0.05), 0, 0.95);   // سهمی از باقی‌مانده‌ی کشور
    if (p <= 0) return;
    const gdp = l.gdp * p, pop = l.population * p, prod = l.energy.production * p, cons = l.energy.consumption * p;
    l.gdp -= gdp; l.population -= pop; l.energy.production -= prod; l.energy.consumption -= cons;
    w.gdp += gdp * 0.5; w.population += pop; w.energy.production += prod * 0.5; w.energy.consumption += cons;
    (w.integ ||= []).push({ from: L, gdp, energy: prod, level: 0.5 });
    state.territory ||= [];
    w.aggression = clamp((w.aggression || 0) + 10, 0, 100);
    const t = state.territory.find(x => x.country === L && x.by === W);
    if (t) t.pct = Math.min(0.97, pctTotal); else state.territory.push({ country: L, by: W, pct: Math.min(0.97, pctTotal) });
  }

  function endWar(state, war, term, W, L, quiet) {
    const list = wars(state);
    const i = list.indexOf(war);
    if (i >= 0) list.splice(i, 1);
    syncPairs(state);
    // آمار برای اهداف و دستاوردها (مرحله‌ی ۶)
    if (state.playerId && W === state.playerId && term !== 'white') (state.stats ||= {}).warsWon = (state.stats.warsWon || 0) + 1;
    for (const a of war.sides.A) for (const b of war.sides.B) {
      const ca = state.countries[a], cb = state.countries[b];
      if (!ca || !cb || ca.annexedBy || cb.annexedBy) continue;
      setRel(state, a, b, a === war.leaders.A && b === war.leaders.B ? -45 : -30);
      (state.truces ||= {})[E().relKey(a, b)] = state.turn + 24;
    }
    const pid = state.playerId;
    // آمار برای اهداف و دستاوردها (مرحله‌ی ۶)
    if (pid && W === pid && term !== 'white') (state.stats ||= {}).warsWon = (state.stats.warsWon || 0) + 1;
    if (pid && state.countries[pid].mil) for (const s of state.countries[pid].mil.stacks) s.inBattle = false;
    for (const id of members(war)) { const c = state.countries[id]; if (c) delete c.wdmg; }
    refreshOccupation(state);
    if (quiet) return;
    if (pid && members(war).includes(pid)) {
      N().add(state, { type: 'peace_signed', level: 'warning', category: 'diplomacy', speaker: 'foreign', focus: pid === W ? L : W,
        data: { country: pid === W ? L : W, term, amount: war.paid || 0 } });
    } else if (pid) {
      N().add(state, { type: 'world_peace', level: 'info', category: 'world', speaker: 'news', focus: L, data: { a: W, b: L, term } });
    }
  }

  /**
   * فتح کامل: همه‌ی پول، تجهیزات، کارخانه‌ها و مردم کشور L مال W می‌شود.
   * اقتصاد: ۶۰٪ GDP و انرژی فوراً، بقیه با آرام شدن منطقه (ثبات ≥ ۳۰) ماهی ۲٪.
   */
  function annex(state, W, L) {
    const w = state.countries[W], l = state.countries[L];
    const integ = { from: L, gdp: l.gdp, energy: l.energy.production * 0.85, level: 0.6 };   // ۱۵٪ آسیب جنگ
    w.gdp += l.gdp * 0.6;
    w.population += l.population;
    w.energy.production += integ.energy * 0.6;
    w.energy.consumption += l.energy.consumption;
    (w.integ ||= []).push(integ);
    const money = Math.max(0, l.eco.treasury);
    w.eco.treasury += money;
    const booty = {};
    for (const [t, n] of Object.entries(l.forces || {})) if (n >= 1) booty[t] = Math.floor(n);
    const capCity = l.cities.find(x => x.capital) || l.cities[0];
    if (usesStacks(w)) {
      for (const [t, k] of Object.entries(booty)) M().addToLocation(state, w, t, k, { kind: 'city', city: capCity.id, country: W }, capCity.pos);
      M().syncForces(w); M().refreshIndices(w);
    } else {
      const before = branchSnapshot(w);
      for (const [t, k] of Object.entries(booty)) w.forces[t] = (w.forces[t] || 0) + k;
      adjustAiIndex(w, before);
    }
    for (const [t, n] of Object.entries(l.factories || {})) {
      if (n > 0) { w.factories[t] = (w.factories[t] || 0) + n; if (w.mil && w.mil.lines && !w.mil.lines[t]) w.mil.lines[t] = true; }
    }
    for (const city of l.cities) if (!w.cities.some(x => x.id === city.id)) w.cities.push({ ...city, capital: false });
    for (const n of l.neighbors) {
      if (n === W) continue;
      if (!w.neighbors.includes(n)) w.neighbors.push(n);
      if (!w.borderPos[n] && l.borderPos[n]) w.borderPos[n] = l.borderPos[n];
    }
    w.neighbors = w.neighbors.filter(n => n !== L);
    delete w.borderPos[L];
    for (const n of l.seaNeighbors) if (n !== W && !w.seaNeighbors.includes(n) && !w.neighbors.includes(n)) w.seaNeighbors.push(n);
    w.seaNeighbors = w.seaNeighbors.filter(n => n !== L);
    for (const o of Object.values(state.countries)) {
      if (o.id === W || o.id === L) continue;
      if (o.neighbors.includes(L)) {
        o.neighbors = o.neighbors.filter(n => n !== L);
        if (!o.neighbors.includes(W)) o.neighbors.push(W);
        if (o.borderPos[L] && !o.borderPos[W]) o.borderPos[W] = o.borderPos[L];
        if (o.front && o.front[L] && !o.front[W]) o.front[W] = o.front[L];
        delete o.borderPos[L];
        o.seaNeighbors = o.seaNeighbors.filter(n => n !== W);
      }
      if (o.seaNeighbors.includes(L)) {
        o.seaNeighbors = o.seaNeighbors.filter(n => n !== L);
        if (!o.seaNeighbors.includes(W) && !o.neighbors.includes(W)) o.seaNeighbors.push(W);
      }
      if (o.puppetOf === L) delete o.puppetOf;
    }
    for (const al of state.alliances) al.members = al.members.filter(m => m !== L);
    state.defensePacts = state.defensePacts.filter(([a, b]) => a !== L && b !== L);
    state.sanctions = state.sanctions.filter(([a, b]) => a !== L && b !== L);
    state.territory = (state.territory || []).filter(t => t.country !== L).map(t => (t.by === L ? { ...t, by: W } : t));
    const people = l.population;
    l.annexedBy = W; l.annexedTurn = state.turn;
    l.forces = M().emptyForces(); l.factories = {}; l.eco.treasury = 0;
    for (const war of wars(state).slice()) {
      const s = sideOf(war, L);
      if (!s) continue;
      war.sides[s] = war.sides[s].filter(x => x !== L);
      if (war.leaders[s] === L || !war.sides[s].length) { const i = wars(state).indexOf(war); if (i >= 0) wars(state).splice(i, 1); }
    }
    syncPairs(state);
    w.aggression = clamp((w.aggression || 0) + 25, 0, 100);
    const ratio = people / Math.max(w.population - people, 1);
    const hit = Math.min(15, 35 * ratio);
    w.eco.mods.push({ stat: 'stability', value: -hit, turns: 12 }, { stat: 'stability', value: -hit / 2, turns: 24 });
    for (const o of Object.values(state.countries)) {
      if (o.id === W || o.annexedBy) continue;
      addRel(state, o.id, W, o.neighbors.includes(W) || E().areAllied(state, o.id, L) ? -15 : -6);
    }
    refreshOccupation(state);
    const pid = state.playerId;
    if (pid) {
      const mine = W === pid;
      N().add(state, { type: mine ? 'annexed' : L === pid ? 'annexed_us' : 'world_annexed', level: mine ? 'critical' : 'info',
        category: mine ? 'military' : 'world', speaker: mine ? 'advisor' : 'news', focus: W,
        data: { a: W, b: L, country: L, amount: money, people: Math.round(people * 10) / 10 } });
    }
  }

  /** اقتصاد خاک اشغالی (c.eco.occ) — هر نوبت از نو */
  function refreshOccupation(state) {
    for (const c of Object.values(state.countries)) if (c.eco) c.eco.occ = null;
    for (const war of wars(state)) {
      for (const s of ['A', 'B']) {
        const L = state.countries[war.leaders[s]], W = state.countries[war.leaders[other(s)]];
        const p = occupied(war, s);
        if (!L || !W || p <= 0) continue;
        // اگر شهر نفت‌خیز در منطقه‌ی اشغالی است، سهم انرژی بیشتری از دست می‌رود
        const inside = citiesInside(state, L.id, W.id, war.front[s]).filter(ct => !citiesInside(state, L.id, W.id, war.base0[s]).includes(ct));
        const eShare = Math.max(p, inside.reduce((x, ct) => x + (ct.share ? ct.share.energy : 0), 0));
        const lost = (L.eco.occ ||= { gdp: 0, energy: 0, gdpGain: 0, energyGain: 0 });
        lost.gdp = Math.min(0.95, lost.gdp + p);
        lost.energy = Math.min(0.95, lost.energy + eShare);
        const gain = (W.eco.occ ||= { gdp: 0, energy: 0, gdpGain: 0, energyGain: 0 });
        gain.gdpGain += 0.3 * p * L.gdp;
        gain.energyGain += 0.3 * eShare * L.energy.production;
      }
    }
  }

  function integrate(state) {
    for (const c of Object.values(state.countries)) {
      if (!c.integ || c.annexedBy) continue;
      for (const g of c.integ) {
        if (g.level >= 1 || c.stability < 30) continue;
        const d = Math.min(0.02, 1 - g.level);
        g.level += d;
        c.gdp += g.gdp * d;
        c.energy.production += g.energy * d;
      }
      c.integ = c.integ.filter(g => g.level < 1);
      if (!c.integ.length) delete c.integ;
    }
  }

  /** پیشنهادهای صلح خودکار */
  function peaceStep(state, war, rng) {
    const pid = state.playerId;
    const A = war.leaders.A, B = war.leaders.B;
    const ca = state.countries[A], cb = state.countries[B];
    if (!ca || !cb || ca.annexedBy || cb.annexedBy) return;
    const sinceOffer = state.turn - (war.lastOffer ?? war.start);
    const playerSide = sideOf(war, pid);
    if (playerSide) {
      if (war.leaders[playerSide] !== pid) return;
      const es = other(playerSide), enemy = war.leaders[es];
      const mine = scoreFor(state, war, pid);
      const offer = type => {
        war.lastOffer = state.turn;
        const t = peaceTerms(state, war, pid).filter(x => x.ok);
        if (t.length) N().add(state, { type, level: 'critical', category: 'diplomacy', speaker: 'foreign', focus: enemy,
          data: { country: enemy, war: war.id, allowed: t.map(x => 'peace:' + x.term), pct: Math.round(occupied(war, es) * 100), amount: payAmount(state, war, pid) } });
      };
      if (surrendered(state, war, es) && sinceOffer >= 2) offer('surrender_offer');
      else if (mine >= 45 && sinceOffer >= 3) offer('peace_offer');
      else if ((state.countries[enemy].warWeariness || 0) >= 55 && Math.abs(mine) < 40 && sinceOffer >= 8) offer('peace_offer');
      else if (mine <= -45 && sinceOffer >= 5) {
        war.lastOffer = state.turn;
        const held = occupied(war, playerSide);
        N().add(state, { type: 'peace_demand', level: 'critical', category: 'diplomacy', speaker: 'foreign', focus: enemy,
          data: { country: enemy, war: war.id, term: held >= 0.03 ? 'cede' : 'pay', winner: enemy, pct: Math.round(held * 100), amount: payAmount(state, war, enemy) } });
      }
      return;
    }
    // دو هوش مصنوعی
    if (sinceOffer < 3) return;
    const sc = war.score, tA = ca.warWeariness || 0, tB = cb.warWeariness || 0;
    let term = null, winner = A;
    if (surrendered(state, war, 'B') && sc >= 85) term = 'annex';
    else if (sc >= 55 || surrendered(state, war, 'B') || (sc >= 35 && tB >= 65)) term = occupied(war, 'B') >= 0.02 ? 'cede' : 'pay';
    else if (sc <= -55 || surrendered(state, war, 'A') || (sc <= -35 && tA >= 65)) { winner = B; term = occupied(war, 'A') >= 0.02 ? 'cede' : 'pay'; }
    else if (tA > 75 && tB > 75) term = occupied(war, 'B') >= 0.02 ? 'cede' : 'white';
    if (term && rng.next() < 0.5) { war.lastOffer = state.turn; makePeace(state, war.id, term, winner); }
  }

  /** جنگ‌های ابتدای سناریو */
  function initScenario(state, scenario) {
    state.warsInfo = [];
    state.territory ||= [];
    state.truces ||= {};
    const fronts = (scenario && scenario.warFronts) || (window.SG_DATA.scenario && window.SG_DATA.scenario.warFronts) || {};
    const rng = SG.Rng.create((state.seed ^ 0x5bd1e995) >>> 0);
    for (const [a, b] of state.wars.slice()) {
      if (!state.countries[a] || !state.countries[b]) continue;
      declare(state, a, b, rng, { scenario: true, front: (fronts[a + '>' + b] || 0) / 100 });
    }
    for (const w of wars(state)) {
      // خاکی که قبل از ۲۰۲۶ گرفته شده «پایه» است (اقتصادش از قبل در داده‌ها حساب شده)
      w.base0.B = w.front.B;
      for (const id of members(w)) state.countries[id].warWeariness = 30;
    }
  }

  /** نیروی دشمن در جبهه (برای نقشه و اطلاعات) */
  function enemyFronts(state, pid) {
    const out = [];
    for (const war of warsOfCountry(state, pid)) {
      const s = sideOf(war, pid), es = other(s);
      const enemy = war.leaders[es];
      const ground = sideEngaged(state, war, es, 'ground').filter(e => !e.src);
      const units = {};
      for (const e of ground) units[e.type] = (units[e.type] || 0) + e.n;
      const ad = sumN(sideEngaged(state, war, es, 'ad'));
      const bp = war.land ? frontPoint(state, enemy, war.leaders[s]) : state.countries[enemy].pos;
      const cap = state.countries[enemy].pos;
      const pos = war.land ? [bp[0] + (cap[0] - bp[0]) * 0.12, bp[1] + (cap[1] - bp[1]) * 0.12] : cap;
      out.push({ war: war.id, enemy, pos, units, ad, power: groundPower(ground, 'def') });
    }
    return out;
  }

  /** مناطق تصرف‌شده برای نقشه: [{ country, by, pct, kind: 'war' | 'ceded' }] */
  function occupationAreas(state) {
    const out = [];
    for (const t of state.territory || []) if (!state.countries[t.country].annexedBy && t.pct > 0) out.push({ country: t.country, by: t.by, pct: t.pct, kind: 'ceded' });
    for (const war of wars(state)) {
      if (!war.land) continue;
      for (const s of ['A', 'B']) {
        if (war.front[s] > war.base0[s] + 0.001 || (war.front[s] > 0 && !cededPct(state, war.leaders[s], war.leaders[other(s)])))
          out.push({ country: war.leaders[s], by: war.leaders[other(s)], pct: war.front[s], kind: 'war' });
      }
    }
    return out;
  }

  SG.War = {
    effectiveOwner, warOf, warsOfCountry, warById, sideOf, scoreFor, peaceTerms, predict, canDeclare, isJustified,
    armyValue, quality, role, radiusFor, capitalAt, frontPoint, citiesInside, depthInto, occupied, enemyFronts, occupationAreas,
    engaged, sideEngaged, sumN, payAmount, atBorder, collapsed, surrendered, groundPower,
    ultimatum, acceptTribute, declare, setOrders, makePeace, initScenario, addToWar, joinCandidates,
    step, refreshOccupation, branchSnapshot, adjustAiIndex, syncPairs, computeScore,
    PEACE_TERMS, GROUND, AIRSTRIKE, SALVO,
  };
})(window.SG = window.SG || {});

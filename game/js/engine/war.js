// =====================================================================
// موتور جنگ و فتح (مرحله‌ی ۴)
// ---------------------------------------------------------------------
// خلاصه‌ی منطق (همه‌ی کشورها با همین قوانین؛ هیچ کشوری هاردکد نشده):
//   ۱) اعلان جنگ ← متحدان نظامی هدف تصمیم می‌گیرند وارد شوند یا نه؛ بی‌بهانه = افت روابط، تحریم، افت ثبات
//   ۲) کشور هوش مصنوعیِ درگیر، نیروهایش را به‌صورت «دسته» بین شهرهایش پخش می‌کند (بیشتر نزدیک دشمن و پایتخت)
//   ۳) جنگ شهر به شهر: نیروی زمینی به شهر دشمن می‌رود؛ هر نوبت در هر شهر درگیر یک دور نبرد
//      هواپیما، پهپاد، موشک و ناو از دور (در شعاع بردشان) «پشتیبانی» می‌کنند
//   ۴) قدرت مؤثر = Σ(تعداد × قدرت × نقش حمله/دفاع × کیفیت × تجربه × روحیه × تدارکات × ضعف‌ها)
//                  × برتری هوایی × زمین و استحکامات (فقط مدافع) × شانس ±۱۰٪
//   ۵) بازنده ۱۰ تا ۲۰٪ تلفات و افت روحیه؛ برنده ۳ تا ۸٪. نابودی کامل نیست.
//      شهر وقتی سقوط می‌کند که مدافعی نماند، روحیه‌شان فرو بریزد، یا ۲ نوبت پشت سر هم (پایتخت ۳ نوبت)
//      نسبت قدرت بیش از ۱.۸ باشد؛ مدافعان باقی‌مانده به نزدیک‌ترین شهر خودی عقب می‌نشینند
//   ۶) شهر تصرف‌شده: ۳۰٪ اقتصاد و انرژی‌اش به فاتح و ۱۰۰٪ از صاحبش کم می‌شود (economy.js ← c.eco.occ)
//   ۷) خستگی جنگ هر ماه بالا می‌رود (بیشتر با تلفات) ← ثبات کمتر و تورم بیشتر
//   ۸) صلح: الحاق کامل، واگذاری شهرهای تصرف‌شده، دولت دست‌نشانده، غرامت ۲۴ ماهه یا صلح سفید
// =====================================================================
(function (SG) {
  'use strict';
  const D = () => window.SG_DATA;
  const E = () => SG.Engine, M = () => SG.Military, N = () => SG.Notify;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  const TERRAIN = { plain: 1.0, desert: 1.1, jungle: 1.2, mountain: 1.4, urban: 1.5 };
  const CITY_MIN_TERRAIN = 1.3;            // جنگ شهری همیشه به مدافع کمک می‌کند
  const CAPITAL_BONUS = 0.1;
  const FORT_PER_TURN = 0.04, FORT_MAX = 0.6;   // استحکامات: هرچه جنگ طولانی‌تر، شهرها مستحکم‌تر
  const GROUND = ['infantry', 'armor', 'artillery', 'airdefense'];
  const SUPPORT = ['fighter', 'bomber', 'drone', 'ballistic', 'cruise'];
  const NAVAL = ['ship', 'submarine'];
  const FIRE = { ballistic: 0.06, cruise: 0.06, drone: 0.08 };   // سهم موشک/پهپاد که هر نوبت شلیک (مصرف) می‌شود
  const PEACE_TERMS = ['annex', 'cede', 'puppet', 'reparations', 'white'];
  const MAX_REPORTS = 40;

  // ===================================================================
  // شهرها و کنترل
  // ===================================================================
  /** کشور اصلی یک شهر از روی شناسه‌اش ('IRQ-1' ← 'IRQ') */
  function origOf(cityId) { return cityId.slice(0, cityId.lastIndexOf('-')); }

  function cityById(state, cityId) {
    const c = state.countries[origOf(cityId)];
    return c ? c.cities.find(x => x.id === cityId) : null;
  }

  /** صاحب فعلی یک کشور (اگر الحاق شده، فاتحش) */
  function effectiveOwner(state, id) {
    let c = state.countries[id], guard = 0;
    while (c && c.annexedBy && guard++ < 8) c = state.countries[c.annexedBy];
    return c ? c.id : id;
  }

  /** چه کشوری الان این شهر را در دست دارد؟ */
  function controller(state, cityId) {
    const k = state.control && state.control[cityId];
    return k ? k.by : effectiveOwner(state, origOf(cityId));
  }

  /** شهر «خودی» (نه اشغالی): مال خود کشور، الحاق‌شده یا واگذارشده با صلح */
  function isHomeCity(state, c, cityId) {
    const k = state.control && state.control[cityId];
    if (k) return k.by === c.id && k.kind === 'ceded';
    return effectiveOwner(state, origOf(cityId)) === c.id;
  }

  /** شهرهایی که این کشور بیرون از خاک خودش در دست دارد (اشغال یا واگذاری) */
  function citiesControlledAbroad(state, id) {
    const out = [];
    for (const [cid, k] of Object.entries(state.control || {})) {
      if (k.by !== id) continue;
      const city = cityById(state, cid);
      if (city) out.push(city);
    }
    return out;
  }

  /** همه‌ی شهرهایی که این کشور در دست دارد */
  function controlledCities(state, id) {
    const c = state.countries[id];
    const home = c.cities.filter(x => controller(state, x.id) === id);
    return home.concat(citiesControlledAbroad(state, id));
  }

  /** فاصله تا نزدیک‌ترین نقطه‌ی تدارکاتی خودی (شهر خودی، مرز خودی، شهر تصرف‌شده) */
  function distanceToSupply(state, c, pos, excludeCity) {
    let best = Infinity;
    const dist = M().distanceKm;
    for (const city of controlledCities(state, c.id)) {
      if (city.id === excludeCity) continue;
      best = Math.min(best, dist(pos, city.pos));
    }
    for (const p of Object.values(c.borderPos || {})) best = Math.min(best, dist(pos, p));
    return best === Infinity ? 3000 : best;
  }

  // ===================================================================
  // جنگ‌ها
  // ===================================================================
  function wars(state) { return state.warsInfo || (state.warsInfo = []); }

  function sideOf(war, id) {
    if (war.sides.A.includes(id)) return 'A';
    if (war.sides.B.includes(id)) return 'B';
    return null;
  }
  const other = side => (side === 'A' ? 'B' : 'A');

  function warOf(state, a, b) {
    return wars(state).find(w => { const sa = sideOf(w, a), sb = sideOf(w, b); return sa && sb && sa !== sb; }) || null;
  }

  function warsOfCountry(state, id) { return wars(state).filter(w => sideOf(w, id)); }

  function warById(state, id) { return wars(state).find(w => w.id === id) || null; }

  /** state.wars (جفت‌ها) را از روی جنگ‌ها می‌سازد تا بقیه‌ی کد (isAtWar, warsOf) کار کند */
  function syncPairs(state) {
    const pairs = [];
    for (const w of wars(state)) for (const a of w.sides.A) for (const b of w.sides.B) pairs.push([a, b]);
    state.wars = pairs;
  }

  function setRel(state, a, b, v) {
    state.relations[E().relKey(a, b)] = Math.round(clamp(v, -100, 100));
  }
  function addRel(state, a, b, dv) {
    if (a === b) return;
    setRel(state, a, b, E().getRelation(state, a, b) + dv);
  }

  // ===================================================================
  // ارزش رزمی
  // ===================================================================
  /** نقش هر نوع در حمله و دفاع (نرمال‌شده تا قدرت دو بار حساب نشود) */
  function role(type, kind) {
    const d = D().units[type];
    const t = d.attack + d.defense || 1;
    return (kind === 'att' ? d.attack : d.defense) / t * 2;
  }

  /** کیفیت = ۰.۶ + ۰.۶ × فناوری شاخه/۱۰۰ */
  function quality(c, type) {
    return 0.6 + 0.6 * clamp((c.tech[D().units[type].branch] || 0) / 100, 0, 1.2);
  }

  const moraleMul = m => 0.4 + 0.6 * clamp(m ?? 75, 0, 100) / 100;
  const supplyMul = s => 0.4 + 0.6 * clamp(s ?? 100, 0, 100) / 100;
  const effCount = s => Math.max(0, s.count - (s.dmg || 0));

  /** ارزش یک دسته در نبرد (بدون ضریب‌های میدان) */
  function stackValue(c, s, kind, count = effCount(s)) {
    return count * D().units[s.type].power * role(s.type, kind) * quality(c, s.type) *
      (1 + (s.exp || 0) / 200) * moraleMul(s.morale) * supplyMul(s.supply);
  }

  /** ارزش کل ارتش یک کشور (برای مقایسه و پیش‌بینی) */
  function armyValue(c, kind = 'att') {
    let v = 0;
    for (const [type, n] of Object.entries(c.forces || {})) {
      if (!n) continue;
      const d = D().units[type];
      const w = SUPPORT.includes(type) && type !== 'fighter' && type !== 'bomber' ? (FIRE[type] || 0.1) * 4 : NAVAL.includes(type) ? 0.5 : type === 'cyber' ? 0 : 1;
      v += n * d.power * role(type, kind) * quality(c, type) * w;
    }
    return v;
  }

  /** عکس فوری قدرت شاخه‌ها (برای به‌روز کردن شاخص هوش مصنوعی بعد از تلفات/فروش) */
  function branchSnapshot(c) {
    const out = {};
    for (const b of M().BRANCHES) out[b] = M().branchStrength(c.forces, b);
    return out;
  }

  /** تلفات یا فروش سلاحِ کشور هوش مصنوعی ← شاخص نظامی‌اش هم کم می‌شود (همان فرمول بازیکن) */
  function adjustAiIndex(c, before) {
    if (c.mil && c.mil.useUnits) return;
    for (const b of M().BRANCHES) {
      const s1 = M().branchStrength(c.forces, b), s0 = before[b] || 0;
      if (Math.abs(s1 - s0) < 1e-9) continue;
      const delta = 15 * Math.log2((1 + s1) / (1 + s0));
      c.military[b] = Math.round(clamp(c.military[b] + delta, 0, 120) * 10) / 10;
      if (c.eco && c.eco.milBase && typeof c.eco.milBase[b] === 'number') c.eco.milBase[b] = clamp(c.eco.milBase[b] + delta, 0, 120);
    }
  }

  function terrainFactor(state, cityId) {
    const city = cityById(state, cityId);
    const c = state.countries[origOf(cityId)];
    return Math.max(TERRAIN[c.terrain] || 1, CITY_MIN_TERRAIN) + (city && city.capital ? CAPITAL_BONUS : 0);
  }

  function fortMul(state, war, cityId) {
    const since = war.fortSince[cityId] ?? war.fort0;
    return 1 + clamp((state.turn - since) * FORT_PER_TURN, 0, FORT_MAX);
  }

  /** تلفات با گرد کردن تصادفی (تا تعداد صحیح بماند ولی میانگین درست باشد) */
  function lose(rng, s, n) {
    if (n <= 0) return 0;
    const def = D().units[s.type];
    if (def.counted === 'unit') {
      // لشکر و تیپ: آسیب جزئی جمع می‌شود و هر بار به یک واحد کامل رسید، یک واحد از بین می‌رود
      s.dmg = (s.dmg || 0) + n;
      const whole = Math.min(s.count, Math.floor(s.dmg));
      s.count -= whole; s.dmg -= whole;
      if (s.count <= 0) { s.count = 0; s.dmg = 0; }
      return n;
    }
    const k = Math.min(s.count, Math.floor(n) + (rng.next() < n - Math.floor(n) ? 1 : 0));
    s.count -= k;
    return k;
  }

  // ===================================================================
  // بسیج نیروهای هوش مصنوعی
  // ===================================================================
  /** تقسیم n بین وزن‌ها با عدد صحیح (روش بزرگ‌ترین باقی‌مانده) */
  function allocate(n, weights) {
    const sum = weights.reduce((a, b) => a + b, 0) || 1;
    const raw = weights.map(w => n * w / sum);
    const out = raw.map(Math.floor);
    let rest = n - out.reduce((a, b) => a + b, 0);
    const order = raw.map((r, i) => [r - Math.floor(r), i]).sort((a, b) => b[0] - a[0]);
    for (let i = 0; i < order.length && rest > 0; i++, rest--) out[order[i][1]]++;
    return out;
  }

  function enemyPoints(state, id) {
    const c = state.countries[id];
    const pts = [];
    for (const en of E().warsOf(state, id)) {
      const o = state.countries[en];
      if (!o) continue;
      pts.push(c.borderPos[en] || o.pos);
      for (const city of controlledCities(state, en)) if (M().distanceKm(city.pos, c.pos) < 2500) pts.push(city.pos);
    }
    return pts;
  }

  /** کشور هوش مصنوعی وارد جنگ می‌شود: نیروهایش را به دسته تبدیل و بین شهرهایش پخش می‌کند */
  function mobilize(state, id) {
    const c = state.countries[id];
    if (!c || (c.mil && c.mil.useUnits) || c.annexedBy) return;
    if (c.wstacks && c.wstacks.length) return;
    c.wstacks = [];
    const cities = M().ownCities(state, c);
    const pts = enemyPoints(state, id);
    const dist = M().distanceKm;
    const weights = cities.map(city => {
      const dE = pts.length ? Math.min(...pts.map(p => dist(p, city.pos))) : 2000;
      return (city.capital ? 1.6 : 1) * (1 + 900 / (dE + 300));
    });
    for (const [type, n] of Object.entries(c.forces)) {
      if (!n) continue;
      if (GROUND.includes(type) && cities.length > 1) {
        allocate(n, weights).forEach((k, i) => { if (k) M().addToLocation(state, c, type, k, M().cityLoc(c, cities[i]), cities[i].pos); });
      } else {
        const city = M().homeCityFor(c, type, state);
        M().addToLocation(state, c, type, n, M().cityLoc(c, city), city.pos);
      }
    }
    M().syncForces(c);
  }

  /** پایان جنگ برای یک کشور هوش مصنوعی: دسته‌ها جمع می‌شوند (نیروها در c.forces می‌مانند) */
  function demobilize(state, id) {
    const c = state.countries[id];
    if (!c || (c.mil && c.mil.useUnits)) return;
    if (warsOfCountry(state, id).length) return;
    if (c.wstacks) M().syncForces(c);
    delete c.wstacks;
  }

  /** متحدی که از راه می‌رسد: بخشی از نیروی زمینی و هوایی‌اش را به شهرهای رهبر جبهه می‌فرستد */
  function sendExpedition(state, war, joinerId) {
    const side = sideOf(war, joinerId);
    const leader = state.countries[war.leaders[side]];
    const enemy = state.countries[war.leaders[other(side)]];
    const j = state.countries[joinerId];
    if (!j.wstacks || !leader || leader.mil?.useUnits) return;
    const neighbor = j.neighbors.includes(enemy.id);
    const share = neighbor ? 0.15 : 0.3;
    const front = M().ownCities(state, leader).slice()
      .sort((a, b) => M().distanceKm(a.pos, enemy.pos) - M().distanceKm(b.pos, enemy.pos));
    if (!front.length) return;
    const airCity = front.find(x => x.tags.includes('air')) || front.find(x => x.capital) || front[0];
    for (const s of j.wstacks.slice()) {
      if (s.move || s.loc.kind !== 'city' || !isHomeCity(state, j, s.loc.city)) continue;
      const isGround = GROUND.includes(s.type), isAir = ['fighter', 'bomber', 'drone'].includes(s.type);
      if (!isGround && !isAir) continue;
      const n = Math.floor(s.count * share);
      if (n < 1) continue;
      const city = isGround ? front[0] : airCity;
      M().moveStack(state, j, s, n, { kind: 'city', city: city.id, country: leader.id, pos: city.pos }, undefined, 3);
    }
  }

  // ===================================================================
  // اعلان جنگ
  // ===================================================================
  /** آیا حمله «بهانه‌ی موجه» دارد؟ */
  function isJustified(state, att, def) {
    if (E().getRelation(state, att, def) <= -60) return true;
    // هدف با متحد ما در جنگ است
    if (E().warsOf(state, def).some(x => E().areAllied(state, att, x))) return true;
    // هدف شهری از ما را در دست دارد
    if (Object.entries(state.control || {}).some(([cid, k]) => k.by === def && effectiveOwner(state, origOf(cid)) === att)) return true;
    return false;
  }

  /** دلیل ممنوع بودن اعلان جنگ (null = آزاد) */
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

  /** امتیاز ورود یک کشور به جنگ به نفع مدافع */
  function joinScore(state, x, att, def) {
    const pact = E().defensePartners(state, def).includes(x);
    const powX = E().militaryPower(state.countries[x]), powA = Math.max(1, E().militaryPower(state.countries[att]));
    return (pact ? 55 : 45)
      + E().getRelation(state, x, def) * 0.4
      - E().getRelation(state, x, att) * 0.3
      + (E().areAllied(state, x, att) ? -45 : 0)
      + Math.min(25, 25 * powX / powA)
      - (E().warsOf(state, x).length ? 20 : 0);
  }

  function joinCandidates(state, att, def) {
    const out = [];
    const d = state.countries[def];
    for (const x of Object.values(state.countries)) {
      if (x.id === att || x.id === def || x.annexedBy) continue;
      if (E().isAtWar(state, x.id, att)) continue;
      const linked = E().areAllied(state, x.id, def) || x.puppetOf === def || d.puppetOf === x.id;
      if (!linked) continue;
      const forced = x.puppetOf === def;
      out.push({ id: x.id, score: forced ? 100 : joinScore(state, x.id, att, def) });
    }
    return out.sort((a, b) => b.score - a.score);
  }

  /** پیش‌بینی پیامدهای حمله (برای پنجره‌ی تأیید و مشاور) */
  function predict(state, att, def) {
    const justified = isJustified(state, att, def);
    const a = state.countries[att], d = state.countries[def];
    // اگر عضو یک پیمان نظامی‌ایم، حمله به هم‌پیمان یعنی اخراج از پیمان
    const shared = state.alliances.filter(al => al.type === 'military' && al.members.includes(att) && al.members.includes(def));
    const joiners = joinCandidates(state, att, def).map(j => ({
      id: j.id,
      // پس از اخراج از پیمان مشترک، اثر «هم‌پیمانی با مهاجم» حذف می‌شود
      chance: clamp(((shared.length && !E().defensePartners(state, att).includes(j.id) ? j.score + 45 : j.score) - 45) / 20, 0, 1),
    })).filter(j => j.chance > 0.05);
    const ourValue = armyValue(a, 'att');
    let theirValue = armyValue(d, 'def');
    for (const j of joiners) theirValue += armyValue(state.countries[j.id], 'def') * (j.chance) * 0.3;
    const sanctionRisk = Object.values(state.countries).filter(x => x.id !== att && x.id !== def && !x.annexedBy && x.gdp >= 30 &&
      E().getRelation(state, x.id, att) - (justified ? 8 : 20) <= -40 && E().getRelation(state, x.id, def) >= 10 &&
      !state.sanctions.some(([by, t]) => by === x.id && t === att)).map(x => x.id);
    const neighbor = a.neighbors.includes(def);
    const atBorder = (a.mil?.stacks || []).filter(s => !s.move && s.loc.kind === 'border' && s.loc.target === def);
    return {
      justified, joiners, ourValue, theirValue, ratio: ourValue / Math.max(theirValue, 1),
      terrain: d.terrain, cities: d.cities.length, sanctionRisk, expelled: shared.map(x => x.id),
      neighbor, atBorder: atBorder.length, relDrop: justified ? 8 : 20, stabilityHit: justified ? 0 : 5,
    };
  }

  /**
   * اعلان جنگ. خروجی: { war, joiners, sanctions, justified, expelled }
   * opts.scenario: جنگ از قبل در جریان (داده‌ی سناریو) — بدون پیامد دیپلماتیک، استحکامات کامل
   */
  function declare(state, att, def, rng, opts = {}) {
    const justified = opts.scenario ? true : isJustified(state, att, def);
    const war = {
      id: 'W' + (state.nextWarId = (state.nextWarId || 0) + 1),
      start: state.turn, justified, scenario: !!opts.scenario,
      sides: { A: [att], B: [def] }, leaders: { A: att, B: def },
      siege: {}, lastR: {}, fortSince: {}, fort0: opts.scenario ? state.turn - 20 : state.turn,
      battles: [], base: {}, lost: {}, monthLost: {}, active: [], lastOffer: state.turn, score: 0,
    };
    wars(state).push(war);
    const out = { war, joiners: [], sanctions: [], justified, expelled: [] };

    if (!opts.scenario) {
      // حمله به هم‌پیمان: مهاجم از پیمان مشترک اخراج می‌شود
      for (const al of state.alliances) {
        if (al.type === 'military' && al.members.includes(att) && al.members.includes(def)) {
          al.members = al.members.filter(m => m !== att);
          out.expelled.push(al.id);
        }
      }
      state.defensePacts = state.defensePacts.filter(([x, y]) => !((x === att && y === def) || (x === def && y === att)));
      if (state.countries[def].puppetOf === att) delete state.countries[def].puppetOf;

      // روابط: همه از مهاجم دلخور می‌شوند (بی‌بهانه بیشتر)؛ دوستان هدف خیلی بیشتر
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
      // ورود متحدان مدافع
      for (const j of joinCandidates(state, att, def)) {
        const sc = j.score + rng.range(-10, 10);
        if (sc > 55) { war.sides.B.push(j.id); out.joiners.push(j.id); }
      }
      // تحریم‌های جدید
      for (const x of Object.values(state.countries)) {
        if (x.id === att || sideOf(war, x.id) || x.annexedBy || x.gdp < 30) continue;
        if (state.sanctions.some(([by, t]) => by === x.id && t === att)) continue;
        if (E().getRelation(state, x.id, att) <= -40 && E().getRelation(state, x.id, def) >= 10 && rng.next() < (justified ? 0.2 : 0.6)) {
          state.sanctions.push([x.id, att]);
          out.sanctions.push(x.id);
        }
      }
    }
    for (const a of war.sides.A) for (const b of war.sides.B) setRel(state, a, b, -100);
    syncPairs(state);
    for (const id of [...war.sides.A, ...war.sides.B]) {
      const c = state.countries[id];
      war.base[id] = Math.max(1, armyValue(c));
      war.lost[id] = 0;
      mobilize(state, id);
    }
    for (const j of out.joiners) sendExpedition(state, war, j);

    // اعلان‌ها
    const pid = state.playerId;
    if (pid && (att === pid || def === pid)) {
      N().add(state, { type: 'war_declared', level: 'critical', category: 'military', speaker: 'commander', focus: def,
        data: { commander: chiefOf(state), country: def, justified, joiners: out.joiners.length } });
      for (const j of out.joiners) {
        N().add(state, { type: 'ally_joined', level: 'warning', category: 'diplomacy', speaker: 'foreign', focus: j, data: { country: j, other: def } });
      }
      if (out.sanctions.length) {
        N().add(state, { type: 'sanctions_new', level: 'warning', category: 'diplomacy', speaker: 'foreign',
          data: { count: out.sanctions.length, country: out.sanctions[0] } });
      }
      for (const al of out.expelled) {
        N().add(state, { type: 'alliance_expelled', level: 'warning', category: 'diplomacy', speaker: 'foreign',
          data: { alliance: state.alliances.find(x => x.id === al)?.name || al } });
      }
    } else if (!opts.scenario && pid) {
      N().add(state, { type: 'world_war_declared', level: 'info', category: 'world', speaker: 'news', focus: def, data: { a: att, b: def } });
    }
    return out;
  }

  function chiefOf(state) {
    const p = state.countries[state.playerId];
    return p && p.mil ? p.mil.chief : '';
  }

  // ===================================================================
  // هدف‌های حمله
  // ===================================================================
  /** کشوری که دسته الان در خاکش است */
  function territoryOf(state, s) {
    return s.loc.kind === 'border' ? s.loc.target : origOf(s.loc.city);
  }

  const REACH_KM = 1200;   // نیروی زمینی فقط به شهرهای تا این فاصله از جبهه‌اش حمله می‌کند (نه به آن سر کشور)

  /**
   * آیا دسته‌ی s (در خاک خودی، در مرز یا داخل خاک دشمن) می‌تواند به شهر city برسد؟
   *   داخل خاک همان کشور یا در مرزش: تا ۱۲۰۰ کیلومتر
   *   از خاک کشور همسایه: شهر باید تا ۱۲۰۰ کیلومتری مرز مشترک باشد (مثلاً منطقه‌ی جداافتاده قابل‌دسترس نیست)
   */
  function canReach(state, s, city) {
    const T = origOf(city.id);
    const terr = territoryOf(state, s);
    const dist = M().distanceKm;
    if (terr === T) return dist(s.pos, city.pos) <= REACH_KM;
    const tc = state.countries[terr];
    const bp = tc && tc.borderPos && tc.borderPos[T];
    return !!bp && dist(bp, city.pos) <= REACH_KM && dist(s.pos, city.pos) <= REACH_KM + 300;
  }

  /**
   * شهرهای قابل‌حمله برای یک دسته‌ی زمینی بازیکن:
   * از مرز کشور X یا از شهری داخل خاک X ← شهرهای X که دست دشمنِ در حال جنگ با ماست
   */
  function attackTargets(state, pid, s) {
    if (s.move || !GROUND.includes(s.type)) return [];
    const T = territoryOf(state, s);
    const t = state.countries[T];
    if (!t) return [];
    return t.cities.filter(city => {
      const ctrl = controller(state, city.id);
      return ctrl !== pid && E().isAtWar(state, pid, ctrl) && city.id !== (s.loc.kind === 'city' ? s.loc.city : null) && canReach(state, s, city);
    });
  }

  // ===================================================================
  // نبرد
  // ===================================================================
  function members(war) { return [...war.sides.A, ...war.sides.B]; }

  /** ارزش زمینی یک طرف در یک شهر */
  function groundAt(state, war, side, cityId) {
    const list = [];
    for (const id of war.sides[side]) {
      const c = state.countries[id];
      for (const s of M().stacksOf(c)) {
        if (!s.move && s.count > 0 && s.loc.kind === 'city' && s.loc.city === cityId && GROUND.includes(s.type)) list.push({ c, s });
      }
    }
    return list;
  }

  /** ضریب ضعف: اگر نوعی که از آن ضعیفیم سهم قابل‌توجهی (≥۱۰٪) از نیروی دشمن باشد */
  function weakMul(type, enemyShares) {
    let m = 1;
    for (const [w, f] of Object.entries(D().units[type].weakVs || {})) if ((enemyShares[w] || 0) >= 0.1) m *= f;
    return m;
  }

  function sharesOf(entries) {
    const tot = {}; let sum = 0;
    for (const { s } of entries) { const v = s.count * D().units[s.type].power; tot[s.type] = (tot[s.type] || 0) + v; sum += v; }
    const out = {};
    for (const k of Object.keys(tot)) out[k] = sum ? tot[k] / sum : 0;
    return out;
  }

  /** پشتیبانی‌های هر شهر درگیر: هر هواپیما/موشک/ناو به نزدیک‌ترین نبردِ در بردش کمک می‌کند */
  function assignSupport(state, war, battleCities) {
    const bySide = { A: {}, B: {} };
    const cyber = { A: 0, B: 0 };
    for (const side of ['A', 'B']) {
      for (const id of war.sides[side]) {
        const c = state.countries[id];
        for (const s of M().stacksOf(c)) {
          if (s.move || s.count <= 0) continue;
          if (s.type === 'cyber') { cyber[side] += stackValue(c, s, 'att'); continue; }
          const naval = NAVAL.includes(s.type);
          if (!SUPPORT.includes(s.type) && !naval) continue;
          if (s.hold) continue;
          const range = naval ? Math.max(450, M().rangeOf(c, s.type)) : M().rangeOf(c, s.type);
          let best = null, bd = Infinity;
          for (const cid of battleCities) {
            const city = cityById(state, cid);
            if (naval && !city.tags.includes('port')) continue;
            const d = M().distanceKm(s.pos, city.pos);
            if (d <= range && d < bd) { bd = d; best = cid; }
          }
          if (best) (bySide[side][best] ||= []).push({ c, s });
        }
      }
    }
    return { bySide, cyber };
  }

  /** حل یک دور نبرد در یک شهر. خروجی: گزارش نبرد */
  function resolveBattle(state, war, cityId, support, rng, events) {
    const ctrl = controller(state, cityId);
    const defSide = sideOf(war, ctrl);
    if (!defSide) return null;
    const attSide = other(defSide);
    const att = groundAt(state, war, attSide, cityId);
    if (!att.length) return null;
    const def = groundAt(state, war, defSide, cityId);
    const city = cityById(state, cityId);
    const supA = support.bySide[attSide][cityId] || [], supD = support.bySide[defSide][cityId] || [];

    const report = {
      id: 'B' + (state.nextBattleId = (state.nextBattleId || 0) + 1), turn: state.turn, date: { ...state.date },
      war: war.id, city: cityId, cityName: city.name, country: origOf(cityId), controller: ctrl,
      att: { side: attSide, owners: [], units: {}, support: {}, factors: {} },
      def: { side: defSide, owners: [], units: {}, support: {}, factors: {} },
    };
    for (const x of att) { x.s.inBattle = true; if (!report.att.owners.includes(x.c.id)) report.att.owners.push(x.c.id); }
    for (const x of def) { x.s.inBattle = true; if (!report.def.owners.includes(x.c.id)) report.def.owners.push(x.c.id); }

    // شهر بی‌دفاع: بدون نبرد تصرف می‌شود
    if (!def.length) {
      for (const x of att) addUnits(report.att.units, x.s.type, x.s.count, 0);
      report.ratio = Infinity; report.result = 'att'; report.fell = true; report.undefended = true;
      capture(state, war, cityId, att, rng, events, report);
      return report;
    }

    const allA = att.concat(supA), allD = def.concat(supD);
    const shareA = sharesOf(allA), shareD = sharesOf(allD);

    // پدافند هر طرف در همین شهر (رهگیری موشک/پهپاد/بمب‌افکن و برتری هوایی)
    const adOf = list => list.filter(x => x.s.type === 'airdefense').reduce((v, x) => v + stackValue(x.c, x.s, 'def'), 0);
    const adA = adOf(att), adD = adOf(def);
    const cyA = support.cyber[attSide], cyD = support.cyber[defSide];
    const cyberCutOnD = 0.2 * (cyA / (cyA + cyD + 1e-9));   // سایبری مهاجم پدافند مدافع را تا ۲۰٪ مختل می‌کند
    const cyberCutOnA = 0.2 * (cyD / (cyA + cyD + 1e-9));

    // ---- نیروی زمینی ----
    function ground(list, kind, enemyShares, out) {
      let v = 0;
      for (const x of list) {
        const val = stackValue(x.c, x.s, kind) * weakMul(x.s.type, enemyShares);
        v += val;
        addUnits(out.units, x.s.type, x.s.count, 0);
      }
      return v;
    }
    const gA = ground(att, 'att', shareD, report.att);
    const gD = ground(def, 'def', shareA, report.def);

    // ---- پشتیبانی: جنگنده، بمب‌افکن، پهپاد، موشک، ناو ----
    function supportValue(list, kind, enemyShares, enemyAd, cyberCut, out) {
      let fighters = 0, strike = 0, other = 0;
      const fired = [];
      for (const x of list) {
        const t = x.s.type;
        if (FIRE[t]) {
          const n = Math.min(x.s.count, Math.max(Math.ceil(x.s.count * FIRE[t]), Math.min(x.s.count, 20)));
          const v = stackValue(x.c, x.s, 'att', n) * weakMul(t, enemyShares);
          strike += v;
          fired.push({ x, n });
          addUnits(out.support, t, n, 0);
        } else if (t === 'bomber') {
          strike += stackValue(x.c, x.s, 'att') * weakMul(t, enemyShares);
          addUnits(out.support, t, x.s.count, 0);
        } else if (t === 'fighter') {
          fighters += stackValue(x.c, x.s, kind) * weakMul(t, enemyShares);
          addUnits(out.support, t, x.s.count, 0);
        } else {
          other += stackValue(x.c, x.s, kind) * weakMul(t, enemyShares);
          addUnits(out.support, t, x.s.count, 0);
        }
      }
      const adEff = enemyAd * (1 - cyberCut);
      const intercept = strike > 0 ? clamp(adEff / (adEff + strike * 0.8), 0, 0.65) : 0;
      // موشک و پهپادِ شلیک‌شده مصرف می‌شود (رهگیری‌شده هم)
      const showStrikes = state.playerId && sideOf(war, state.playerId);
      for (const f of fired) {
        f.x.s.count -= f.n;
        out.support[f.x.s.type][1] += f.n;
        // خط شلیک روی نقشه (فقط جنگ‌های بازیکن)
        if (showStrikes) (state.lastStrikes ||= []).push({ from: f.x.s.pos.slice(), to: city.pos.slice(), type: f.x.s.type, own: f.x.c.id === state.playerId });
      }
      out.intercepted = Math.round(intercept * 100);
      return { fighters, total: fighters + strike * (1 - intercept) + other };
    }
    const sA = supportValue(supA, 'att', shareD, adD, cyberCutOnD, report.att);
    const sD = supportValue(supD, 'def', shareA, adA, cyberCutOnA, report.def);

    // ---- برتری هوایی ----
    const airFactor = (mine, theirs, theirAd) => {
      const denom = theirs + 0.5 * theirAd;
      if (mine + denom < 1e-6) return 1;
      const r = denom < 1e-6 ? 99 : mine / denom;
      return r > 1.5 ? 1.25 : r < 0.67 ? 0.75 : 1;
    };
    const airA = airFactor(sA.fighters, sD.fighters, adD), airD = airFactor(sD.fighters, sA.fighters, adA);
    const terr = terrainFactor(state, cityId), fort = fortMul(state, war, cityId);
    const luckA = rng.range(0.9, 1.1), luckD = rng.range(0.9, 1.1);
    const PA = (gA + sA.total) * airA * luckA;
    const PD = (gD + sD.total) * airD * terr * fort * luckD;
    const r = PA / Math.max(PD, 1e-6);

    const avg = (list, f) => { let n = 0, v = 0; for (const x of list) { const w = x.s.count * D().units[x.s.type].power; n += w; v += w * f(x); } return n ? v / n : 0; };
    report.att.factors = { quality: avg(att, x => quality(x.c, x.s.type)), morale: avg(att, x => x.s.morale ?? 75), supply: avg(att, x => x.s.supply),
      air: airA, luck: luckA, ground: gA, support: sA.total, power: PA };
    report.def.factors = { quality: avg(def, x => quality(x.c, x.s.type)), morale: avg(def, x => x.s.morale ?? 75), supply: avg(def, x => x.s.supply),
      air: airD, luck: luckD, terrain: terr, fort, ground: gD, support: sD.total, power: PD };
    report.ratio = r;

    // ---- تلفات و روحیه ----
    const R = Math.max(r, 1 / r), k = clamp((R - 1) / 2, 0, 1);
    const loserPct = 0.10 + 0.10 * k, winnerPct = 0.08 - 0.05 * k;
    const attWins = r >= 1;
    report.result = attWins ? 'att' : 'def';
    const pctA = attWins ? winnerPct : loserPct, pctD = attWins ? loserPct : winnerPct;
    applyLosses(state, war, att, supA, pctA, attWins, report.att, rng, k);
    applyLosses(state, war, def, supD, pctD, !attWins, report.def, rng, k);

    // ---- سقوط شهر؟ ----
    war.siege[cityId] = r > 1.8 ? (war.siege[cityId] || 0) + 1 : 0;
    war.lastR[cityId] = r;
    const needed = city.capital ? 3 : 2;
    const defLeft = def.filter(x => x.s.count > 0);
    const broken = defLeft.length && defLeft.every(x => (x.s.morale ?? 75) < 25);
    if (!defLeft.length || war.siege[cityId] >= needed || broken) {
      report.fell = true;
      capture(state, war, cityId, att.filter(x => x.s.count > 0), rng, events, report);
    } else {
      report.fell = false;
      report.siege = war.siege[cityId]; report.siegeNeeded = needed;
    }
    return report;
  }

  function addUnits(map, type, count, lost) {
    const e = map[type] || (map[type] = [0, 0]);
    e[0] += count; e[1] += lost;
  }

  function applyLosses(state, war, ground, support, pct, won, out, rng, k) {
    for (const x of ground) {
      const before = x.s.count;
      const n = before * pct;
      const lostNow = lose(rng, x.s, n);
      const lostWhole = before - x.s.count;
      out.units[x.s.type][1] += D().units[x.s.type].counted === 'unit' ? lostNow : lostWhole;
      recordLoss(war, x.c, x.s.type, D().units[x.s.type].counted === 'unit' ? lostNow : lostWhole);
      if (won) { x.s.morale = clamp((x.s.morale ?? 75) + 3, 0, 100); x.s.exp = clamp((x.s.exp || 0) + 5, 0, 100); }
      else x.s.morale = clamp((x.s.morale ?? 75) - (10 + 15 * k), 0, 100);
    }
    for (const x of support) {
      const t = x.s.type;
      if (FIRE[t]) continue;   // موشک و پهپادِ شلیک‌شده قبلاً کم شده (مصرف، نه تلفات)
      const lostWhole = lose(rng, x.s, x.s.count * pct * 0.15);
      out.support[t][1] += lostWhole;
      recordLoss(war, x.c, t, lostWhole);
    }
  }

  function recordLoss(war, c, type, n) {
    if (!n) return;
    const v = n * D().units[type].power * quality(c, type);
    war.lost[c.id] = (war.lost[c.id] || 0) + v;
    war.monthLost[c.id] = (war.monthLost[c.id] || 0) + v;
  }

  /** تصرف شهر: کنترل عوض می‌شود و مدافعان باقی‌مانده عقب می‌نشینند */
  function capture(state, war, cityId, attackers, rng, events, report) {
    const prevCtrl = controller(state, cityId);
    // فاتح: صاحب قوی‌ترین دسته‌ی مهاجم
    const val = {};
    for (const x of attackers) val[x.c.id] = (val[x.c.id] || 0) + stackValue(x.c, x.s, 'att');
    const by = Object.keys(val).sort((a, b) => val[b] - val[a])[0];
    if (!by) return;
    const orig = effectiveOwner(state, origOf(cityId));
    state.control ||= {};
    const liberated = sideOf(war, orig) === sideOf(war, by) || orig === by;
    if (liberated) delete state.control[cityId];
    else state.control[cityId] = { by, kind: 'occupied', since: state.turn };
    war.siege[cityId] = 0;
    war.fortSince[cityId] = state.turn;
    report.newController = controller(state, cityId);
    report.liberated = liberated;

    // مدافعان عقب‌نشینی می‌کنند (یا اگر جایی نمانده، تسلیم)
    const defSide = other(sideOf(war, by));
    for (const id of war.sides[defSide]) {
      const c = state.countries[id];
      for (const s of M().stacksOf(c).slice()) {
        if (s.move || s.loc.kind !== 'city' || s.loc.city !== cityId) continue;
        retreatStack(state, war, c, s, cityId);
      }
    }
    events.push({ type: 'captured', war: war.id, city: cityId, by, from: prevCtrl, liberated, report: report.id,
      playerWar: !!(state.playerId && sideOf(war, state.playerId)) });
  }

  /** عقب‌نشینی یک دسته به نزدیک‌ترین شهری که طرف خودش در دست دارد */
  function retreatStack(state, war, c, s, fromCity) {
    const side = sideOf(war, c.id);
    let best = null, bd = Infinity;
    for (const id of war.sides[side]) {
      for (const city of controlledCities(state, id)) {
        if (city.id === fromCity) continue;
        // اولویت با شهرهای خود کشور
        const d = M().distanceKm(s.pos, city.pos) * (id === c.id ? 1 : 1.3);
        if (d < bd) { bd = d; best = city; }
      }
    }
    // اگر شهری نماند ولی مرز خودی هست، به مرز
    if (!best) {
      const T = origOf(fromCity);
      if (c.borderPos && c.borderPos[T]) {
        s.morale = clamp((s.morale ?? 75) - 5, 0, 100);
        M().moveStack(state, c, s, s.count, { kind: 'border', target: T, sea: false, pos: c.borderPos[T] });
        return 'border';
      }
      // محاصره‌ی کامل: تسلیم
      const list = M().stacksOf(c);
      const i = list.indexOf(s); if (i >= 0) list.splice(i, 1);
      recordLoss(war, c, s.type, s.count);
      return 'surrender';
    }
    s.morale = clamp((s.morale ?? 75) - 5, 0, 100);
    s.inBattle = false;
    M().moveStack(state, c, s, s.count, { kind: 'city', city: best.id, country: origOf(best.id), pos: best.pos });
    return 'city';
  }

  /** بازیکن دستور عقب‌نشینی از یک شهر را می‌دهد */
  function retreat(state, pid, cityId) {
    const c = state.countries[pid];
    let n = 0;
    for (const s of M().stacksOf(c).slice()) {
      if (s.move || s.loc.kind !== 'city' || s.loc.city !== cityId || controller(state, cityId) === pid) continue;
      const T = origOf(cityId);
      if (c.borderPos[T]) M().moveStack(state, c, s, s.count, { kind: 'border', target: T, sea: false, pos: c.borderPos[T] });
      else {
        const w = warOf(state, pid, controller(state, cityId));
        if (w) retreatStack(state, w, c, s, cityId);
      }
      n++;
    }
    return n;
  }

  // ===================================================================
  // هوش مصنوعی در جنگ (ساده: دفاع، آزادسازی، حمله‌ی محتاطانه، عقب‌نشینی)
  // ===================================================================
  function aiStep(state, war, rng) {
    for (const id of members(war)) {
      if (id === state.playerId) continue;
      const c = state.countries[id];
      if (!c || c.annexedBy) continue;
      mobilize(state, id);
      aiRetreat(state, war, c);
      const tm = threatMap(state, war, c);
      aiDefend(state, war, c, tm);
      // تا وقتی خودش زیر حمله است یا دشمن پشت مرز جمع شده، حمله نمی‌کند
      const ownGround = M().stacksOf(c).reduce((v, s) => v + (GROUND.includes(s.type) ? stackValue(c, s, 'def') : 0), 0);
      const underAttack = Object.keys(tm.threat).some(cid => groundAt(state, war, other(sideOf(war, id)), cid).length);
      if (!underAttack && tm.massing < ownGround * 0.7) aiAttack(state, war, c, rng);
    }
  }

  /** دسته‌ی زمینیِ آزاد: در شهری که خودمان یا هم‌جبهه‌مان در دست داریم و درگیر نبرد نیست */
  function isFree(state, c, s, war) {
    if (s.move || s.count <= 0 || s.loc.kind !== 'city' || !GROUND.includes(s.type) || s.inBattle) return false;
    const ctrl = controller(state, s.loc.city);
    return ctrl === c.id || (war && sideOf(war, ctrl) === sideOf(war, c.id));
  }

  function enemyGroundValueAt(state, war, side, cityId, kind) {
    return groundAt(state, war, other(side), cityId).reduce((v, x) => v + stackValue(x.c, x.s, kind), 0);
  }

  function aiRetreat(state, war, c) {
    for (const s of M().stacksOf(c).slice()) {
      if (s.move || s.loc.kind !== 'city' || controller(state, s.loc.city) === c.id) continue;
      const ctrl = controller(state, s.loc.city);
      if (sideOf(war, ctrl) === sideOf(war, c.id) || !sideOf(war, ctrl)) continue;
      const r = war.lastR[s.loc.city];
      if (r !== undefined && r < 0.55) retreatStack(state, war, c, s, s.loc.city);
    }
  }

  /**
   * تهدید هر شهر کشور c (ارزش حمله‌ی دشمن):
   *   دشمنی که در شهر می‌جنگد (کامل)، دشمنی که به سمت شهر در حرکت است (کامل)،
   *   و دشمنِ جمع‌شده در مرز (۶۰٪، به نزدیک‌ترین شهر تا ۶۰۰ کیلومتر)
   */
  function threatMap(state, war, c) {
    const side = sideOf(war, c.id);
    const mine = controlledCities(state, c.id);
    const ids = new Set(mine.map(x => x.id));
    const threat = {};
    let massing = 0;
    for (const id of war.sides[other(side)]) {
      const e = state.countries[id];
      for (const s of M().stacksOf(e)) {
        if (s.count <= 0 || !GROUND.includes(s.type)) continue;
        const v = stackValue(e, s, 'att');
        if (s.move && s.move.dest.kind === 'city' && ids.has(s.move.dest.city)) { threat[s.move.dest.city] = (threat[s.move.dest.city] || 0) + v; continue; }
        if (!s.move && s.loc.kind === 'city' && ids.has(s.loc.city)) { threat[s.loc.city] = (threat[s.loc.city] || 0) + v; continue; }
        if (!s.move && s.loc.kind === 'border' && (s.loc.target === c.id || mine.some(x => origOf(x.id) === s.loc.target))) {
          let best = null, bd = 600;
          for (const city of mine) { const d = M().distanceKm(s.pos, city.pos); if (d < bd) { bd = d; best = city; } }
          massing += v;
          if (best) threat[best.id] = (threat[best.id] || 0) + v * 0.6;
        }
      }
    }
    return { threat, massing };
  }

  /** دفاع: شهری که زیر حمله یا تهدید است و کم‌دفاع، از نزدیک‌ترین شهرهای امن نیرو می‌گیرد */
  function aiDefend(state, war, c, tm) {
    const side = sideOf(war, c.id);
    let moves = 0;
    const threatenedIds = new Set(Object.keys(tm.threat));
    const list = Object.entries(tm.threat).sort((a, b) => b[1] - a[1]);
    for (const [cid, enemy] of list) {
      const city = cityById(state, cid);
      // نیروی خودی که الان آن‌جاست یا در راه آن‌جاست
      let own = 0;
      for (const s of M().stacksOf(c)) {
        if (!GROUND.includes(s.type) || s.count <= 0) continue;
        if ((!s.move && s.loc.kind === 'city' && s.loc.city === cid) || (s.move && s.move.dest.kind === 'city' && s.move.dest.city === cid)) own += stackValue(c, s, 'def');
      }
      own *= terrainFactor(state, cid);
      let need = enemy * 1.2 - own;
      if (need <= 0) continue;
      const reserves = M().stacksOf(c).filter(s => isFree(state, c, s, war) && !threatenedIds.has(s.loc.city))
        .sort((a, b) => M().distanceKm(a.pos, city.pos) - M().distanceKm(b.pos, city.pos));
      for (const s of reserves) {
        if (need <= 0 || moves >= 5) break;
        if (M().distanceKm(s.pos, city.pos) > 1800) break;
        const home = cityById(state, s.loc.city);
        const keep = home && home.capital ? 0.5 : 0.25;    // همیشه کمی نیرو در شهر بماند
        const v = stackValue(c, s, 'def') * terrainFactor(state, cid);
        let n = Math.floor(s.count * (1 - keep));
        if (v > 0) n = Math.min(n, Math.ceil(s.count * need / v));
        if (n < 1) continue;
        M().moveStack(state, c, s, n, { kind: 'city', city: cid, country: origOf(cid), pos: city.pos });
        need -= v * n / s.count;
        moves++;
      }
    }
  }

  /** حمله یا آزادسازی: فقط اگر برتری کافی (۱.۶ برابر؛ آزادسازی ۱.۳) و خستگی کم */
  function aiAttack(state, war, c, rng) {
    const side = sideOf(war, c.id);
    if ((c.warWeariness || 0) > 65) return;
    // حمله‌های جاری (دسته‌هایی که به سمت شهر دشمن می‌روند یا آن‌جا می‌جنگند)
    const ongoing = M().stacksOf(c).filter(s => GROUND.includes(s.type) && ((s.move && s.move.dest.kind === 'city' && controller(state, s.move.dest.city) !== c.id && sideOf(war, controller(state, s.move.dest.city)) !== side) ||
      (!s.move && s.loc.kind === 'city' && sideOf(war, controller(state, s.loc.city)) === other(side)))).length;
    const big = E().militaryPower(c) >= 50;
    if (ongoing && !(big && ongoing < 3 && rng.next() < 0.3)) return;
    // آهنگ حمله‌ی هوش مصنوعی: هر ماه همیشه حمله نمی‌کند (جنگ دو هوش مصنوعی کندتر و فرسایشی‌تر)
    const vsPlayer = state.playerId && sideOf(war, state.playerId);
    if (rng.next() > (vsPlayer ? 0.6 : 0.35)) return;

    // کشورهایی که می‌شود به شهرهایشان حمله کرد: همسایه‌ی زمینی ما یا کشوری که نیرویمان در آن است
    const reachable = new Set();
    for (const s of M().stacksOf(c)) if (!s.move && s.loc.kind === 'city') reachable.add(origOf(s.loc.city));
    reachable.add(c.id);
    const fronts = new Set();
    for (const t of reachable) { const tc = state.countries[t]; if (tc) { fronts.add(t); for (const n of tc.neighbors) fronts.add(n); } }

    const cands = [];
    for (const t of fronts) {
      const tc = state.countries[t];
      if (!tc) continue;
      for (const city of tc.cities) {
        const ctrl = controller(state, city.id);
        if (sideOf(war, ctrl) !== other(side)) continue;
        const orig = effectiveOwner(state, origOf(city.id));
        const liberation = sideOf(war, orig) === side;
        const defVal = groundAt(state, war, other(side), city.id).reduce((v, x) => v + stackValue(x.c, x.s, 'def'), 0) *
          terrainFactor(state, city.id) * fortMul(state, war, city.id);
        cands.push({ city, defVal, liberation });
      }
    }
    if (!cands.length) return;
    for (const cand of cands) {
      const near = M().stacksOf(c).filter(s => isFree(state, c, s, war) && canReach(state, s, cand.city));
      let avail = 0;
      for (const s of near) {
        const home = cityById(state, s.loc.city);
        const threatened = groundAt(state, war, other(side), s.loc.city).length > 0;
        if (threatened) continue;
        avail += stackValue(c, s, 'att') * (home && home.capital ? 0.5 : 0.75);
      }
      cand.avail = avail; cand.near = near;
      cand.score = avail / Math.max(cand.defVal, 1) - M().distanceKm(c.pos, cand.city.pos) / 3000 + (cand.liberation ? 0.5 : 0);
    }
    cands.sort((a, b) => b.score - a.score);
    const best = cands[0];
    const need = best.liberation ? 1.3 : 1.6;
    if (best.avail < need * best.defVal || best.avail <= 0) return;
    // نیرو بفرست: تا ۲ برابر قدرت مدافع
    let sent = 0;
    const target = Math.max(best.defVal * 2.2, 1);
    const near = best.near.sort((a, b) => M().distanceKm(a.pos, best.city.pos) - M().distanceKm(b.pos, best.city.pos));
    for (const s of near) {
      if (sent >= target) break;
      if (groundAt(state, war, other(side), s.loc.city).length) continue;
      const home = cityById(state, s.loc.city);
      const share = home && home.capital ? 0.5 : 0.75;
      let n = Math.floor(s.count * share);
      if (n < 1) continue;
      const v = stackValue(c, s, 'att') / s.count;
      n = Math.min(n, Math.max(1, Math.ceil((target - sent) / Math.max(v, 1e-6))));
      M().moveStack(state, c, s, n, { kind: 'city', city: best.city.id, country: origOf(best.city.id), pos: best.city.pos });
      sent += v * n;
    }
  }

  // ===================================================================
  // امتیاز جنگ، خستگی، صلح
  // ===================================================================
  const cityWeight = city => (city.capital ? 3 : 1);

  /** درصد (۰..۱) شهرهای کشور id که دست طرف مقابل است (پایتخت ۳ برابر) */
  function occupiedFrac(state, war, id) {
    const c = state.countries[id];
    if (!c) return 0;
    const side = sideOf(war, id);
    let tot = 0, occ = 0;
    for (const city of c.cities) {
      tot += cityWeight(city);
      const ctrl = controller(state, city.id);
      if (ctrl !== id && sideOf(war, ctrl) === other(side)) occ += cityWeight(city);
    }
    return tot ? occ / tot : 0;
  }

  function capitalHeldBy(state, war, id) {
    const cap = state.countries[id].cities.find(x => x.capital);
    if (!cap) return false;
    return sideOf(war, controller(state, cap.id)) === other(sideOf(war, id));
  }

  /** امتیاز جنگ از دید طرف A (۱۰۰- تا ۱۰۰+) */
  function computeScore(state, war) {
    const a = war.leaders.A, b = war.leaders.B;
    const sideLost = side => war.sides[side].reduce((s, id) => s + (war.lost[id] || 0), 0) / Math.max(1, war.sides[side].reduce((s, id) => s + (war.base[id] || 1), 0));
    const ca = state.countries[a], cb = state.countries[b];
    let score = occupiedFrac(state, war, b) * 70 - occupiedFrac(state, war, a) * 70
      + clamp((sideLost('B') - sideLost('A')) * 60, -25, 25)
      + ((cb.warWeariness || 0) - (ca.warWeariness || 0)) * 0.15;
    if (capitalHeldBy(state, war, b)) score += 10;
    if (capitalHeldBy(state, war, a)) score -= 10;
    war.score = Math.round(clamp(score, -100, 100));
    return war.score;
  }

  function scoreFor(state, war, id) {
    const s = war.score ?? computeScore(state, war);
    return sideOf(war, id) === 'A' ? s : -s;
  }

  /**
   * شرط‌های صلح از دید کشور id (که پیشنهاد می‌دهد) و این‌که طرف مقابل می‌پذیرد یا نه.
   * خروجی: [{ term, ok, reason }]
   */
  function peaceTerms(state, war, id) {
    const side = sideOf(war, id);
    const enemyLeader = war.leaders[other(side)];
    const sc = scoreFor(state, war, id);
    const en = state.countries[enemyLeader];
    // پایتخت با «واگذاری» داده نمی‌شود (فقط با الحاق کامل)
    const heldCities = en.cities.filter(city => !city.capital && sideOf(war, controller(state, city.id)) === side);
    const capital = capitalHeldBy(state, war, enemyLeader);
    const enemyTired = (en.warWeariness || 0) >= 50 || (war.lost[enemyLeader] || 0) / Math.max(war.base[enemyLeader] || 1, 1) >= 0.5;
    const isLeader = war.leaders[side] === id;
    const out = [];
    const add = (term, ok, reason) => out.push({ term, ok, reason });
    add('annex', isLeader && capital && sc >= 70, !isLeader ? 'not_leader' : !capital ? 'need_capital' : sc < 70 ? 'score' : null);
    add('cede', isLeader && heldCities.length > 0 && sc >= 35, !isLeader ? 'not_leader' : !heldCities.length ? 'no_cities' : sc < 35 ? 'score' : null);
    add('puppet', isLeader && sc >= 55, !isLeader ? 'not_leader' : sc < 55 ? 'score' : null);
    add('reparations', isLeader && sc >= 30, !isLeader ? 'not_leader' : sc < 30 ? 'score' : null);
    add('white', sc >= -10 || enemyTired, sc >= -10 || enemyTired ? null : 'score');
    return out;
  }

  /**
   * بستن صلح. winnerId = کشوری که شرط به نفعش است (برای white فرقی ندارد).
   * خروجی: true اگر انجام شد
   */
  function makePeace(state, warId, term, winnerId) {
    const war = warById(state, warId);
    if (!war || !PEACE_TERMS.includes(term)) return false;
    const wSide = sideOf(war, winnerId) || 'A';
    const W = war.leaders[wSide], L = war.leaders[other(wSide)];
    const Lc = state.countries[L];
    if (term === 'annex') {
      // اول شهرهای اشغالی دیگر به صاحبانشان برمی‌گردد؛ بعد الحاق کامل
      returnCities(state, war, city => origOf(city) !== L);
      annex(state, W, L);
    } else if (term === 'cede') {
      for (const city of Lc.cities) {
        if (city.capital) continue;   // پایتخت برمی‌گردد
        const k = state.control && state.control[city.id];
        if (k && sideOf(war, k.by) === wSide) state.control[city.id] = { by: k.by, kind: 'ceded', since: state.turn, integ: 0.5 };
      }
      returnCities(state, war, () => true);
    } else if (term === 'puppet') {
      returnCities(state, war, () => true);
      Lc.puppetOf = W;
      state.defensePacts.push([W, L]);
    } else if (term === 'reparations') {
      returnCities(state, war, () => true);
      (state.reparations ||= []).push({ from: L, to: W, monthly: Lc.gdp * 0.02 / 12, left: 24 });
    } else {
      returnCities(state, war, () => true);
    }
    endWar(state, war, term, W, L);
    return true;
  }

  /** پس دادن شهرهای اشغالیِ این جنگ (فقط اشغالی؛ واگذارشده‌ها می‌مانند) */
  function returnCities(state, war, filter) {
    for (const [cid, k] of Object.entries(state.control || {})) {
      if (k.kind !== 'occupied') continue;
      const orig = effectiveOwner(state, origOf(cid));
      const sb = sideOf(war, k.by), so = sideOf(war, orig);
      if (sb && so && sb !== so && filter(cid)) delete state.control[cid];
    }
  }

  function endWar(state, war, term, W, L) {
    const list = wars(state);
    const i = list.indexOf(war);
    if (i >= 0) list.splice(i, 1);
    syncPairs(state);
    const all = members(war);
    for (const a of war.sides.A) for (const b of war.sides.B) {
      if (!state.countries[a] || !state.countries[b] || state.countries[a].annexedBy || state.countries[b].annexedBy) continue;
      setRel(state, a, b, a === war.leaders.A && b === war.leaders.B ? -45 : -30);
      (state.truces ||= {})[E().relKey(a, b)] = state.turn + 24;
    }
    if (term === 'puppet') setRel(state, W, L, 50);
    // نیروهایی که در شهرهای دیگران مانده‌اند به خانه برمی‌گردند
    for (const id of all) {
      const c = state.countries[id];
      if (!c || c.annexedBy) continue;
      for (const s of M().stacksOf(c).slice()) {
        s.inBattle = false;
        const loc = s.move ? s.move.dest : s.loc;
        if (loc.kind !== 'city') continue;
        const ctrl = controller(state, loc.city);
        if (ctrl === c.id) continue;
        // شهر یک هم‌پیمانِ همین جنگ (اعزامی) یا شهر دشمن سابق ← برگرد
        const home = M().homeCityFor(c, s.type, state);
        if (s.move) { s.move.dest = M().cityLoc(c, home); s.move.to = home.pos.slice(); s.move.from = s.pos.slice(); s.move.left = s.move.total = Math.max(1, Math.ceil(M().distanceKm(s.pos, home.pos) / D().units[s.type].speed)); }
        else M().moveStack(state, c, s, s.count, { kind: 'city', city: home.id, country: c.id, pos: home.pos }, undefined, 4);
      }
    }
    for (const id of all) demobilize(state, id);
    refreshOccupation(state);
    const pid = state.playerId;
    if (pid && all.includes(pid)) {
      N().add(state, { type: 'peace_signed', level: 'warning', category: 'diplomacy', speaker: 'foreign', focus: pid === W ? L : W,
        data: { country: pid === W ? L : W, term, won: pid === W && term !== 'white' } });
    } else if (pid) {
      N().add(state, { type: 'world_peace', level: 'info', category: 'world', speaker: 'news', focus: L, data: { a: W, b: L, term } });
    }
  }

  /** الحاق کامل: کشور L جزئی از W می‌شود (با ادغام تدریجی اقتصاد) */
  function annex(state, W, L) {
    const w = state.countries[W], l = state.countries[L];
    const damage = 0.2 + 0.3 * occupiedDamage(state, L);
    // ۵۰٪ فوراً، بقیه با «ضریب ادغام» ماهانه ~۲٪ تا ۱۰۰٪
    const integ = { from: L, gdp: l.gdp, energy: l.energy.production * (1 - damage), level: 0.5 };
    w.gdp += l.gdp * 0.5;
    w.population += l.population;
    w.energy.production += integ.energy * 0.5;
    w.energy.consumption += l.energy.consumption;
    (w.integ ||= []).push(integ);
    w.eco.treasury += Math.max(0, l.eco.treasury) * 0.5;
    // غنیمت: ۱۰٪ تجهیزات باقی‌مانده
    const booty = {};
    if (l.wstacks) M().syncForces(l);
    for (const [t, n] of Object.entries(l.forces || {})) { const k = Math.floor(n * 0.1); if (k > 0) booty[t] = k; }
    const capCity = l.cities.find(x => x.capital) || l.cities[0];
    if (w.mil && w.mil.useUnits) {
      for (const [t, k] of Object.entries(booty)) M().addToLocation(state, w, t, k, { kind: 'city', city: capCity.id, country: W }, capCity.pos);
      M().syncForces(w); M().refreshIndices(w);
    } else {
      const before = branchSnapshot(w);
      for (const [t, k] of Object.entries(booty)) w.forces[t] = (w.forces[t] || 0) + k;
      if (w.wstacks) for (const [t, k] of Object.entries(booty)) M().addToLocation(state, w, t, k, { kind: 'city', city: capCity.id, country: W }, capCity.pos);
      adjustAiIndex(w, before);
    }
    // شهرها به فهرست فاتح اضافه می‌شوند (نه پایتخت)
    for (const city of l.cities) {
      if (!w.cities.some(x => x.id === city.id)) w.cities.push({ ...city, capital: false });
      if (state.control) delete state.control[city.id];
    }
    // همسایه‌ها
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
        delete o.borderPos[L];
        o.seaNeighbors = o.seaNeighbors.filter(n => n !== W);
      }
      if (o.seaNeighbors.includes(L)) {
        o.seaNeighbors = o.seaNeighbors.filter(n => n !== L);
        if (!o.seaNeighbors.includes(W) && !o.neighbors.includes(W)) o.seaNeighbors.push(W);
      }
      if (o.puppetOf === L) delete o.puppetOf;
    }
    // پاک کردن کشور مغلوب از دیپلماسی
    for (const al of state.alliances) al.members = al.members.filter(m => m !== L);
    state.defensePacts = state.defensePacts.filter(([a, b]) => a !== L && b !== L);
    state.sanctions = state.sanctions.filter(([a, b]) => a !== L && b !== L);
    state.reparations = (state.reparations || []).filter(r => r.from !== L && r.to !== L);
    l.annexedBy = W;
    l.annexedTurn = state.turn;
    delete l.wstacks;
    l.forces = M().emptyForces();
    // بقیه‌ی جنگ‌های L تمام می‌شود
    for (const war of wars(state).slice()) {
      if (!sideOf(war, L)) continue;
      const s = sideOf(war, L);
      war.sides[s] = war.sides[s].filter(x => x !== L);
      if (war.leaders[s] === L || !war.sides[s].length) {
        const i = wars(state).indexOf(war); if (i >= 0) wars(state).splice(i, 1);
        for (const id of members(war)) demobilize(state, id);
      }
    }
    syncPairs(state);
    // ناآرامی و ترس جهانی
    const ratio = l.population / Math.max(w.population - l.population, 1);
    const hit = Math.min(15, 35 * ratio);   // مثلاً الحاق کشوری نصف جمعیت ما ← ۱۵- ثبات (۱۲ ماه) و ۷.۵- (۲۴ ماه)
    w.eco.mods.push({ stat: 'stability', value: -hit, turns: 12 }, { stat: 'stability', value: -hit / 2, turns: 24 });
    for (const o of Object.values(state.countries)) {
      if (o.id === W || o.annexedBy) continue;
      const close = o.neighbors.includes(W) || E().areAllied(state, o.id, L);
      addRel(state, o.id, W, close ? -15 : -6);
    }
    const pid = state.playerId;
    if (pid) N().add(state, { type: W === pid ? 'annexed' : L === pid ? 'annexed_us' : 'world_annexed', level: W === pid ? 'critical' : 'info',
      category: W === pid ? 'military' : 'world', speaker: W === pid ? 'advisor' : 'news', focus: W, data: { a: W, b: L, country: L } });
  }

  function occupiedDamage(state, id) {
    const c = state.countries[id];
    let lost = 0;
    for (const city of c.cities) if (controller(state, city.id) !== id) lost += city.share ? city.share.energy : 0;
    return clamp(lost, 0, 1);
  }

  /** اثر اقتصادی شهرهای اشغالی و واگذارشده (c.eco.occ) — هر نوبت از نو */
  function refreshOccupation(state) {
    for (const c of Object.values(state.countries)) if (c.eco) c.eco.occ = null;
    for (const [cid, k] of Object.entries(state.control || {})) {
      const o = state.countries[origOf(cid)], by = state.countries[k.by];
      const city = cityById(state, cid);
      if (!o || !by || o.annexedBy || !city) continue;
      const share = city.share || { gdp: 1 / o.cities.length, energy: 1 / o.cities.length };
      const lost = (o.eco.occ ||= { gdp: 0, energy: 0, gdpGain: 0, energyGain: 0 });
      lost.gdp = Math.min(0.95, lost.gdp + share.gdp);
      lost.energy = Math.min(0.95, lost.energy + share.energy);
      const gain = (by.eco.occ ||= { gdp: 0, energy: 0, gdpGain: 0, energyGain: 0 });
      const f = k.kind === 'ceded' ? (k.integ ?? 0.5) : 0.3;
      gain.gdpGain += f * share.gdp * o.gdp;
      gain.energyGain += f * share.energy * o.energy.production;
    }
  }

  // ===================================================================
  // یک نوبت
  // ===================================================================
  function step(state, rng) {
    const events = [];
    state.lastStrikes = [];
    state.lastBattles = [];
    const pid = state.playerId;
    const list = wars(state);
    // ۰) پرچم «در نبرد» از نوبت قبل پاک می‌شود
    for (const war of list) for (const id of members(war)) for (const s of M().stacksOf(state.countries[id])) s.inBattle = false;

    for (const war of list.slice()) {
      if (!wars(state).includes(war)) continue;
      war.monthLost = {};
      const snaps = {};
      for (const id of members(war)) snaps[id] = branchSnapshot(state.countries[id]);

      // ۱) هوش مصنوعی: بسیج، دفاع، حمله (حرکت‌ها از نوبت بعد اثر می‌کنند)
      aiStep(state, war, rng);
      // ۲) حرکت و تدارکات دسته‌های هوش مصنوعی (بازیکن در Military.step)
      for (const id of members(war)) {
        if (id === pid) continue;
        const c = state.countries[id];
        M().stepStacks(state, c, []);
      }
      // ۳) نبردها
      const battleCities = new Set();
      for (const id of members(war)) {
        const c = state.countries[id];
        for (const s of M().stacksOf(c)) {
          if (s.move || s.count <= 0 || s.loc.kind !== 'city' || !GROUND.includes(s.type)) continue;
          const ctrl = controller(state, s.loc.city);
          const sc = sideOf(war, ctrl);
          if (sc && sc !== sideOf(war, id)) battleCities.add(s.loc.city);
        }
      }
      const support = assignSupport(state, war, [...battleCities]);
      const prevActive = new Set(war.active || []);
      war.active = [];
      for (const cid of battleCities) {
        const rep = resolveBattle(state, war, cid, support, rng, events);
        if (!rep) continue;
        war.battles.push(rep);
        if (war.battles.length > MAX_REPORTS) war.battles.shift();
        if (!rep.fell) war.active.push(cid);
        const involvesPlayer = pid && (rep.att.owners.includes(pid) || rep.def.owners.includes(pid));
        if (involvesPlayer) {
          state.lastBattles.push({ city: cid, pos: cityById(state, cid).pos, war: war.id, report: rep.id });
          events.push({ type: 'battle', war: war.id, report: rep, fresh: !prevActive.has(cid) });
        }
      }
      // دسته‌های خالی حذف می‌شوند
      for (const id of members(war)) {
        const c = state.countries[id];
        const arr = M().stacksOf(c);
        for (let i = arr.length - 1; i >= 0; i--) if (arr[i].count <= 0) arr.splice(i, 1);
        M().syncForces(c);
        adjustAiIndex(c, snaps[id]);
      }
      // ۴) خستگی جنگ
      for (const id of members(war)) {
        const c = state.countries[id];
        const frac = (war.monthLost[id] || 0) / Math.max(war.base[id] || 1, 1);
        const occ = occupiedFrac(state, war, id) > 0 ? 0.5 : 0;
        const before = c.warWeariness || 0;
        c.warWeariness = clamp(before + 0.6 + Math.min(2.4, frac * 30) + occ, 0, 100);
        if (id === pid) {
          for (const t of [30, 60]) if (before < t && c.warWeariness >= t) events.push({ type: 'weariness', level: t, war: war.id });
        }
      }
      computeScore(state, war);
    }

    // ۵) اثر خستگی جنگ و اشغال روی همه (ثبات و تورم) — همان قانون برای بازیکن و هوش مصنوعی
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

    // ۶) ادغام سرزمین‌های الحاقی و شهرهای واگذارشده؛ غرامت
    integrate(state);
    for (const r of state.reparations || []) r.left--;
    state.reparations = (state.reparations || []).filter(r => r.left > 0 && state.countries[r.from] && !state.countries[r.from].annexedBy);

    // ۷) صلح
    for (const war of wars(state).slice()) peaceStep(state, war, rng);
    return events;
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
    for (const k of Object.values(state.control || {})) {
      if (k.kind === 'ceded' && (k.integ ?? 0.5) < 1) k.integ = Math.min(1, (k.integ ?? 0.5) + 0.02);
    }
  }

  /** تصمیم‌های صلح: هوش مصنوعیِ بازنده پیشنهاد صلح می‌دهد؛ بین دو هوش مصنوعی خودکار */
  function peaceStep(state, war, rng) {
    const pid = state.playerId;
    const A = war.leaders.A, B = war.leaders.B;
    const ca = state.countries[A], cb = state.countries[B];
    if (!ca || !cb || ca.annexedBy || cb.annexedBy) return;
    const sc = war.score;
    const playerSide = sideOf(war, pid);
    const sinceOffer = state.turn - (war.lastOffer ?? war.start);
    if (playerSide) {
      const playerLeads = war.leaders[playerSide] === pid;
      const enemy = war.leaders[other(playerSide)];
      const mine = playerSide === 'A' ? sc : -sc;
      if (!playerLeads) return;
      // دشمن شکست‌خورده پیشنهاد صلح می‌دهد
      if ((mine >= 60 || capitalHeldBy(state, war, enemy)) && sinceOffer >= 4) {
        war.lastOffer = state.turn;
        const allowed = peaceTerms(state, war, pid).filter(t => t.ok).map(t => 'peace:' + t.term);
        N().add(state, { type: 'peace_offer', level: 'critical', category: 'diplomacy', speaker: 'foreign', focus: enemy,
          data: { country: enemy, war: war.id, score: mine, allowed } });
      } else if ((state.countries[enemy].warWeariness || 0) >= 55 && Math.abs(mine) < 40 && sinceOffer >= 8) {
        // بن‌بست: دشمنِ خسته آتش‌بس (یا هر شرطی که امتیاز اجازه می‌دهد) پیشنهاد می‌کند
        war.lastOffer = state.turn;
        const allowed = peaceTerms(state, war, pid).filter(t => t.ok).map(t => 'peace:' + t.term);
        if (allowed.length) N().add(state, { type: 'peace_offer', level: 'critical', category: 'diplomacy', speaker: 'foreign', focus: enemy,
          data: { country: enemy, war: war.id, score: mine, allowed, tired: true } });
      } else if (mine <= -45 && sinceOffer >= 5) {
        // ما در حال باختیم: دشمن غرامت می‌خواهد (یا شهرهایی که گرفته)
        war.lastOffer = state.turn;
        const held = state.countries[pid].cities.some(city => !city.capital && sideOf(war, controller(state, city.id)) === other(playerSide));
        N().add(state, { type: 'peace_demand', level: 'critical', category: 'diplomacy', speaker: 'foreign', focus: enemy,
          data: { country: enemy, war: war.id, term: held && mine <= -60 ? 'cede' : 'reparations', winner: enemy } });
      }
      return;
    }
    // دو هوش مصنوعی
    if (sinceOffer < 3) return;
    const tA = ca.warWeariness || 0, tB = cb.warWeariness || 0;
    let term = null, winner = A;
    if (capitalHeldBy(state, war, B) && sc >= 90) term = 'annex';
    else if (sc >= 60 || capitalHeldBy(state, war, B) || (sc >= 35 && tB >= 50)) term = state.countries[B].cities.some(x => !x.capital && sideOf(war, controller(state, x.id)) === 'A') ? 'cede' : 'reparations';
    else if (sc <= -60 || capitalHeldBy(state, war, A) || (sc <= -35 && tA >= 50)) { winner = B; term = state.countries[A].cities.some(x => !x.capital && sideOf(war, controller(state, x.id)) === 'B') ? 'cede' : 'reparations'; }
    else if (sc <= -25 && tA > 50) { term = 'white'; }
    else if (tA > 80 && tB > 80) term = state.countries[B].cities.some(x => !x.capital && sideOf(war, controller(state, x.id)) === 'A') ? 'cede' : 'white';
    if (term && rng.next() < 0.5) { war.lastOffer = state.turn; makePeace(state, war.id, term, winner); }
  }

  /** جنگ‌های ابتدای سناریو (مثلاً جنگ‌های در جریان ۲۰۲۶) */
  function initScenario(state) {
    state.warsInfo = [];
    state.control ||= {};
    state.reparations ||= [];
    state.truces ||= {};
    const pairs = state.wars.slice();
    const rng = SG.Rng.create((state.seed ^ 0x5bd1e995) >>> 0);
    for (const [a, b] of pairs) {
      if (!state.countries[a] || !state.countries[b]) continue;
      declare(state, a, b, rng, { scenario: true });
    }
    // مهاجم سناریو کمی خسته است (سال‌ها جنگ)؛ استحکامات کامل
    for (const w of wars(state)) for (const id of members(w)) state.countries[id].warWeariness = 30;
  }

  /** دسته‌های کشورهایی که با بازیکن در جنگ‌اند (برای نمایش روی نقشه) */
  function enemyStacks(state, pid) {
    const out = [];
    for (const en of E().warsOf(state, pid)) {
      const c = state.countries[en];
      for (const s of (c && c.wstacks) || []) if (s.count > 0) out.push({ owner: en, s });
    }
    return out;
  }

  /** نیروهای دشمن در یک شهر (اطلاعات برای بازیکن) */
  function cityIntel(state, pid, cityId) {
    const units = {};
    let value = 0;
    const ctrl = controller(state, cityId);
    const war = warOf(state, pid, ctrl);
    if (!war) return { units, value, ctrl };
    const side = other(sideOf(war, pid));
    for (const x of groundAt(state, war, side, cityId)) {
      units[x.s.type] = (units[x.s.type] || 0) + x.s.count;
      value += stackValue(x.c, x.s, 'def');
    }
    return { units, value: value * terrainFactor(state, cityId) * fortMul(state, war, cityId), ctrl, terrain: terrainFactor(state, cityId), fort: fortMul(state, war, cityId), war: war.id };
  }

  /** پیش‌بینی ساده‌ی نبرد برای فرستادن count از دسته‌ی s به شهر */
  function attackPreview(state, pid, s, count, cityId) {
    const c = state.countries[pid];
    const intel = cityIntel(state, pid, cityId);
    const mine = stackValue(c, s, 'att', Math.min(count, s.count));
    return { mine, theirs: intel.value, ratio: mine / Math.max(intel.value, 1e-6), intel };
  }

  SG.War = {
    // پرس‌وجو
    origOf, cityById, controller, isHomeCity, citiesControlledAbroad, controlledCities, distanceToSupply, effectiveOwner,
    warOf, warsOfCountry, warById, sideOf, scoreFor, peaceTerms, predict, canDeclare, isJustified, attackTargets,
    enemyStacks, cityIntel, attackPreview, armyValue, occupiedFrac, capitalHeldBy, terrainFactor, quality, role,
    // دستورها
    declare, makePeace, retreat, initScenario, mobilize,
    // موتور
    step, refreshOccupation, branchSnapshot, adjustAiIndex, syncPairs, computeScore,
    PEACE_TERMS, GROUND, SUPPORT, NAVAL,
  };
})(window.SG = window.SG || {});

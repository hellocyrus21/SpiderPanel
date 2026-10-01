// =====================================================================
// موتور بازی: ساخت «حالت بازی» (state) و توابع پرس‌وجو
// ---------------------------------------------------------------------
// قانون مهم معماری: این فایل هیچ کاری با صفحه (DOM) ندارد.
// state یک آبجکت JSON ساده است؛ بعداً به همین شکل در localStorage ذخیره می‌شود.
// هیچ منطقی برای کشور خاصی هاردکد نشده؛ همه چیز از داده می‌آید.
// =====================================================================
(function (SG) {
  'use strict';

  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const deepCopy = obj => JSON.parse(JSON.stringify(obj));

  /** کلید یکتای رابطه‌ی دوجانبه (ترتیب حروف الفبا، تا A|B و B|A یکی باشند) */
  function relKey(a, b) { return a < b ? a + '|' + b : b + '|' + a; }

  // -------------------------------------------------------------------
  // ساخت دنیای جدید
  // دنیا قبل از انتخاب کشور ساخته می‌شود تا در صفحه‌ی انتخاب، همان روابطی دیده
  // شود که در بازی هست. بعد startGame کشور بازیکن را تعیین می‌کند.
  // -------------------------------------------------------------------
  /**
   * @param {object} opts
   * @param {object} opts.countries  داده‌ی کشورها (SG_DATA.countries)
   * @param {object} opts.scenario   سناریوی شروع (SG_DATA.scenario)
   * @param {number} [opts.seed]     بذر تصادفی (اگر نباشد، تازه ساخته می‌شود)
   */
  function createWorld({ countries, scenario, seed }) {
    seed = seed ?? SG.Rng.newSeed();
    const rng = SG.Rng.create(seed);

    // --- کشورها: کپی داده + کمی تصادف (بخش ۷: هر بار کمی متفاوت) ---
    const stateCountries = {};
    for (const id of Object.keys(countries).sort()) {
      const c = deepCopy(countries[id]);
      c.gdp = Math.round(c.gdp * rng.range(0.96, 1.04) * 10) / 10;
      c.stability = Math.round(clamp(c.stability + rng.range(-4, 4), 5, 98));
      stateCountries[id] = c;
    }

    const state = {
      version: 2,
      seed,
      scenarioId: scenario.id,
      date: { ...scenario.startDate },
      turn: 0,
      playerId: null,      // با startGame تعیین می‌شود
      countries: stateCountries,
      alliances: deepCopy(scenario.alliances),
      defensePacts: deepCopy(scenario.defensePacts),
      wars: deepCopy(scenario.wars),
      sanctions: deepCopy(scenario.sanctions),
      relations: {},
      notifications: [],   // اعلان‌ها (engine/notify.js)
      cooldowns: {},
      gameOver: null,
    };
    state.relations = buildRelations(state, scenario, rng);
    SG.Economy.init(state);
    state.rngState = rng.getState();   // ادامه‌ی همان دنباله‌ی تصادفی در نوبت‌ها
    return state;
  }

  /** تعیین کشور بازیکن و شروع بازی */
  function startGame(state, playerId) {
    const c = state.countries[playerId];
    if (!c || !c.playable) throw new Error('Country is not playable: ' + playerId);
    state.playerId = playerId;
    SG.Notify.add(state, { type: 'welcome', level: 'warning', category: 'domestic', speaker: 'advisor', focus: playerId, data: { country: playerId } });
    return state;
  }

  // -------------------------------------------------------------------
  // رابطه‌های اولیه
  // ترتیب محاسبه: بلوک‌های مشترک → پیمان دفاعی → تحریم → رابطه‌ی خاص (جایگزین)
  //               → جنگ (همیشه ۱۰۰-) → کمی تصادف
  // -------------------------------------------------------------------
  function buildRelations(state, scenario, rng) {
    const ids = Object.keys(state.countries).sort();
    const rel = {};

    // عضویت هر کشور در بلوک‌ها
    const blocsOf = {};
    for (const al of state.alliances) {
      for (const m of al.members) (blocsOf[m] ||= []).push(al.id);
    }
    const pactSet = new Set(state.defensePacts.map(([a, b]) => relKey(a, b)));
    const sanctionCount = {};
    for (const [a, b] of state.sanctions) {
      const k = relKey(a, b);
      sanctionCount[k] = (sanctionCount[k] || 0) + 1;
    }
    const warSet = new Set(state.wars.map(([a, b]) => relKey(a, b)));

    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const a = ids[i], b = ids[j], k = relKey(a, b);
        let v = 0;
        // بلوک‌های مشترک
        const ba = blocsOf[a] || [], bb = blocsOf[b] || [];
        for (const bloc of ba) if (bb.includes(bloc)) v += scenario.blocBonus[bloc] || 0;
        // پیمان دفاعی دوجانبه
        if (pactSet.has(k)) v += 40;
        // تحریم
        v -= 20 * (sanctionCount[k] || 0);
        // رابطه‌ی خاص از سناریو (هر دو جهت را بررسی می‌کنیم)
        const special = scenario.relations[a]?.[b] ?? scenario.relations[b]?.[a];
        if (special !== undefined) v = special;
        // تصادف کوچک تا هر بازی کمی متفاوت شروع شود
        v += rng.range(-6, 6);
        if (warSet.has(k)) v = -100;
        rel[k] = Math.round(clamp(v, -100, 100));
      }
    }
    return rel;
  }

  // -------------------------------------------------------------------
  // توابع پرس‌وجو (فقط می‌خوانند، چیزی را تغییر نمی‌دهند)
  // -------------------------------------------------------------------
  function getRelation(state, a, b) {
    if (a === b) return 100;
    return state.relations[relKey(a, b)] ?? 0;
  }

  /** پیمان‌ها و بلوک‌هایی که کشور عضوشان است */
  function alliancesOf(state, id) {
    return state.alliances.filter(al => al.members.includes(id));
  }

  /** شرکای پیمان دفاعی دوجانبه */
  function defensePartners(state, id) {
    return state.defensePacts
      .filter(([a, b]) => a === id || b === id)
      .map(([a, b]) => (a === id ? b : a));
  }

  function warsOf(state, id) {
    return state.wars
      .filter(([a, b]) => a === id || b === id)
      .map(([a, b]) => (a === id ? b : a));
  }

  function isAtWar(state, a, b) {
    return state.wars.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
  }

  /** کشورهایی که این کشور را تحریم کرده‌اند */
  function sanctionedBy(state, id) {
    return state.sanctions.filter(([, t]) => t === id).map(([by]) => by);
  }

  /** آیا دو کشور در یک پیمان نظامی (یا پیمان دفاعی دوجانبه) هستند؟ */
  function areAllied(state, a, b) {
    if (defensePartners(state, a).includes(b)) return true;
    return state.alliances.some(al => al.type === 'military' &&
      al.members.includes(a) && al.members.includes(b));
  }

  /**
   * قدرت نظامی کلی (۰ تا ~۱۰۰) — میانگین وزنی شاخه‌ها.
   * این فقط یک «نمای کلی» برای نمایش و مقایسه است؛ نبرد واقعی در مرحله‌ی ۴ با واحدها محاسبه می‌شود.
   */
  function militaryPower(country) {
    const m = country.military;
    const base = m.land * 0.25 + m.air * 0.2 + m.navy * 0.12 + m.missile * 0.12 +
      m.airDefense * 0.1 + m.cyber * 0.08 + m.drone * 0.13;
    return Math.round(base + (m.nuclear ? 5 : 0));
  }

  /** رتبه‌ی یک مقدار بین همه‌ی کشورها (۱ = بیشترین) */
  function rankOf(state, id, valueFn) {
    const mine = valueFn(state.countries[id]);
    let rank = 1;
    for (const c of Object.values(state.countries)) if (valueFn(c) > mine) rank++;
    return rank;
  }

  SG.Engine = {
    createWorld, startGame, relKey, getRelation, alliancesOf, defensePartners, warsOf, isAtWar,
    sanctionedBy, areAllied, militaryPower, rankOf,
  };
})(window.SG = window.SG || {});

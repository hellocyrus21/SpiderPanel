// =====================================================================
// دیپلماسی (مرحله‌ی ۵): قرارداد تجاری، پیمان دفاعی، تحریم، مذاکره، بهبود رابطه، پیشنهادها
// ---------------------------------------------------------------------
// همه‌ی اقدام‌ها برای بازیکن و هوش مصنوعی یکسان است (بدون تقلب):
//   improve   بهبود رابطه (هیئت و کمک): پول می‌خواهد، رابطه بالا می‌رود (هرچه بهتر، کندتر)
//   trade     قرارداد تجاری: هر دو طرف هر سال ۰.۲٪ × √(GDP الف × GDP ب) درآمد دارند؛ رابطه ماهانه کمی گرم‌تر
//   pact      پیمان دفاعی: اگر به یکی حمله شود، دیگری احتمالاً وارد جنگ می‌شود (رابطه‌ی ۴۰+ لازم)
//   sanction  تحریم: تجارت قطع، فشار تحریم بر هدف (سهم اقتصاد جهان که تحریمش کرده) بالا می‌رود
//   lift      لغو تحریمی که خودمان گذاشته‌ایم
//   negotiate مذاکره برای لغو تحریمی که طرف مقابل روی ما گذاشته (پول + شانس)
//   cancel / break   لغو قرارداد تجاری / شکستن پیمان (رابطه بدتر)
// طرف هوش مصنوعی پیشنهاد را با «امتیاز» می‌پذیرد یا رد می‌کند (acceptScore)؛ پیشنهاد هوش مصنوعی به بازیکن
// به‌صورت proposal + اعلان با دکمه‌ی قبول/رد می‌آید.
// =====================================================================
(function (SG) {
  'use strict';
  const E = () => SG.Engine;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  const TRADE_RATE = 0.002;     // درآمد سالانه‌ی هر طرف از یک قرارداد = ۰.۲٪ × √(GDP₁ × GDP₂)
  const MAX_PACTS = 5;
  const COOLDOWN = { improve: 6, trade: 6, pact: 12, sanction: 6, lift: 3, negotiate: 6, cancel: 3, break: 6 };

  // -------------------------------------------------------------------
  // تجارت
  // -------------------------------------------------------------------
  function partners(state, id) { return (state.trade && state.trade[id]) || []; }
  function hasTrade(state, a, b) { return partners(state, a).includes(b); }
  /** درآمد سالانه‌ی یک طرف از قرارداد با دیگری (میلیارد دلار) */
  function tradeValue(state, a, b) {
    const ca = state.countries[a], cb = state.countries[b];
    if (!ca || !cb || ca.annexedBy || cb.annexedBy) return 0;
    return TRADE_RATE * Math.sqrt(Math.max(ca.gdp, 0) * Math.max(cb.gdp, 0));
  }
  /** کل درآمد تجاری سالانه‌ی یک کشور */
  function tradeIncome(state, id) {
    let s = 0;
    for (const p of partners(state, id)) s += tradeValue(state, id, p);
    return s;
  }
  function addTrade(state, a, b) {
    state.trade ||= {};
    (state.trade[a] ||= []).includes(b) || state.trade[a].push(b);
    (state.trade[b] ||= []).includes(a) || state.trade[b].push(a);
  }
  function removeTrade(state, a, b) {
    if (!state.trade) return;
    if (state.trade[a]) state.trade[a] = state.trade[a].filter(x => x !== b);
    if (state.trade[b]) state.trade[b] = state.trade[b].filter(x => x !== a);
  }

  /** قراردادهای تجاری اول بازی: کشورهای با رابطه‌ی خیلی خوب و اقتصاد قابل‌توجه */
  function seedTrade(state) {
    state.trade = {};
    const ids = Object.keys(state.countries).filter(id => state.countries[id].gdp >= 40).sort();
    for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) {
      const a = ids[i], b = ids[j];
      if (E().getRelation(state, a, b) >= 50 && !sanctioned(state, a, b)) addTrade(state, a, b);
    }
  }

  // -------------------------------------------------------------------
  // پرس‌وجوها
  // -------------------------------------------------------------------
  function sanctioned(state, a, b) { return state.sanctions.some(([x, y]) => (x === a && y === b) || (x === b && y === a)); }
  function sanctions(state, by, target) { return state.sanctions.some(([x, y]) => x === by && y === target); }
  function hasPact(state, a, b) { return state.defensePacts.some(([x, y]) => (x === a && y === b) || (x === b && y === a)); }
  function pactCount(state, id) { return state.defensePacts.filter(([x, y]) => x === id || y === id).length; }
  const rel = (state, a, b) => E().getRelation(state, a, b);
  function addRel(state, a, b, d) {
    if (a === b) return;
    const k = E().relKey(a, b);
    state.relations[k] = Math.round(clamp((state.relations[k] ?? 0) + d, -100, 100));
  }
  function cdKey(action, a, b) { return action + '|' + E().relKey(a, b); }
  function waitOf(state, action, a, b) {
    const t = (state.diploCd || {})[cdKey(action, a, b)];
    return t && t > state.turn ? t - state.turn : 0;
  }
  function setCd(state, action, a, b, turns) { (state.diploCd ||= {})[cdKey(action, a, b)] = state.turn + (turns ?? COOLDOWN[action]); }

  /** «تهدید» یک کشور از دید دیگران (۰..۱۰۰): پرخاشگری اخیر (جنگ، فتح) + قدرت نسبت به همسایه‌ها */
  function threatOf(state, id) {
    const c = state.countries[id];
    const near = [...new Set([...c.neighbors, ...c.seaNeighbors])].map(n => state.countries[n]).filter(x => x && !x.annexedBy);
    const avg = near.length ? near.reduce((s, x) => s + E().militaryPower(x), 0) / near.length : 30;
    const powerRel = E().militaryPower(c) / Math.max(10, avg);
    return clamp((c.aggression || 0) + Math.max(0, powerRel - 1.2) * 15, 0, 100);
  }
  /** حساسیت جهان به تهدید با گذشت زمان بالا می‌رود (سختی) */
  function timeFactor(state) { return 1 + Math.floor(state.turn / 12) * 0.15; }

  function personality(state, id) { return state.countries[id].ai?.personality || 'cautious'; }

  /** آیا دو کشور دشمن مشترک دارند؟ (رابطه‌ی هر دو با یک کشور ≤ ۴۰-) */
  function sharedEnemy(state, a, b) {
    for (const x of E().activeCountries(state)) {
      if (x.id === a || x.id === b) continue;
      if (rel(state, a, x.id) <= -40 && rel(state, b, x.id) <= -40 && E().militaryPower(x) >= 25) return x.id;
    }
    return null;
  }

  // -------------------------------------------------------------------
  // پذیرش پیشنهاد توسط کشور هوش مصنوعی (to)
  // -------------------------------------------------------------------
  /** امتیاز پذیرش (۵۰ یا بیشتر ≈ می‌پذیرد) */
  function acceptScore(state, type, from, to) {
    const r = rel(state, from, to);
    const p = personality(state, to);
    const t = state.countries[to], f = state.countries[from];
    const aggr = f.aggression || 0;
    if (type === 'trade') {
      const needMoney = SG.Economy.computeBudget(state, to).monthly < 0 ? 10 : 0;
      return 38 + r * 0.6 + (p === 'mercantile' ? 20 : p === 'aggressive' ? -10 : 0) + needMoney - aggr * 0.2
        - (E().warsOf(state, to).some(x => E().areAllied(state, x, from)) ? 30 : 0);
    }
    if (type === 'pact') {
      // پیمان یعنی تعهد به جنگیدن برای دیگری: شریکِ خیلی ضعیف‌تر بار است و قدرت‌های بزرگ سخت‌گیرترند
      const shared = sharedEnemy(state, from, to) ? 20 : 0;
      const ratio = E().militaryPower(f) / Math.max(1, E().militaryPower(t));
      const pw = ratio >= 1 ? 10 : ratio >= 0.5 ? 0 : -15;
      const great = E().militaryPower(t) >= 80 && r < 60 ? -10 : 0;
      return r * 0.8 + shared + pw + great - 15 + (p === 'cautious' ? 10 : p === 'aggressive' ? -5 : 0)
        - (pactCount(state, to) >= MAX_PACTS - 1 ? 30 : 0) - (E().warsOf(state, from).length ? 25 : 0) - aggr * 0.3;
    }
    if (type === 'negotiate') {
      return 28 + r * 0.7 + (p === 'mercantile' ? 15 : p === 'aggressive' ? -10 : 0) - aggr * 0.5
        - (E().warsOf(state, from).some(x => E().areAllied(state, x, to)) ? 40 : 0);
    }
    return 0;
  }
  const chanceOf = score => clamp((score - 40) / 20, 0, 1);

  // -------------------------------------------------------------------
  // وضعیت و اجرای اقدام‌ها (برای بازیکن و هوش مصنوعی)
  // -------------------------------------------------------------------
  function costOf(state, action, a) {
    const g = state.countries[a].gdp;
    if (action === 'improve') return Math.max(0.05, g * 0.001);
    if (action === 'negotiate') return Math.max(0.1, g * 0.003);
    return 0;
  }

  /**
   * وضعیت یک اقدام از a به b: { ok, reason, cost, chance, wait }
   * reason: war | cooldown | money | relation | already | none | pacts | sanction | self
   */
  function status(state, a, b, action) {
    const ca = state.countries[a], cb = state.countries[b];
    const cost = costOf(state, action, a);
    const out = { ok: false, reason: null, cost, chance: 1, wait: waitOf(state, action, a, b) };
    const r = rel(state, a, b);
    const atWar = E().isAtWar(state, a, b);
    let reason = null;
    if (!cb || a === b || cb.annexedBy) reason = 'self';
    else if (out.wait) reason = 'cooldown';
    else if (atWar && action !== 'sanction' && action !== 'lift') reason = 'war';
    else if (cost > ca.eco.treasury) reason = 'money';
    else if (action === 'trade') {
      if (hasTrade(state, a, b)) reason = 'already';
      else if (sanctioned(state, a, b)) reason = 'sanction';
      else out.chance = chanceOf(acceptScore(state, 'trade', a, b));
    } else if (action === 'cancel') { if (!hasTrade(state, a, b)) reason = 'none'; }
    else if (action === 'pact') {
      if (hasPact(state, a, b)) reason = 'already';
      else if (r < 40) reason = 'relation';
      else if (pactCount(state, a) >= MAX_PACTS || pactCount(state, b) >= MAX_PACTS) reason = 'pacts';
      else out.chance = chanceOf(acceptScore(state, 'pact', a, b));
    } else if (action === 'break') { if (!hasPact(state, a, b)) reason = 'none'; }
    else if (action === 'sanction') { if (sanctions(state, a, b)) reason = 'already'; }
    else if (action === 'lift') { if (!sanctions(state, a, b)) reason = 'none'; }
    else if (action === 'negotiate') {
      if (!sanctions(state, b, a)) reason = 'none';
      else out.chance = chanceOf(acceptScore(state, 'negotiate', a, b));
    } else if (action === 'improve') { if (r >= 95) reason = 'already'; }
    out.reason = reason;
    out.ok = !reason;
    return out;
  }

  /**
   * اجرای اقدام a ← b. اگر b بازیکن نیست، پیشنهادها با امتیاز پذیرفته یا رد می‌شوند.
   * خروجی: { ok, accepted, reason }
   */
  function perform(state, a, b, action, rng) {
    const st = status(state, a, b, action);
    if (!st.ok) return { ok: false, reason: st.reason };
    const ca = state.countries[a];
    ca.eco.treasury -= st.cost;
    const decide = type => state.playerId === b ? null : acceptScore(state, type, a, b) + (rng ? rng.range(-10, 10) : 0) >= 50;
    let accepted = true;
    if (action === 'improve') {
      const r = rel(state, a, b);
      addRel(state, a, b, Math.round(8 * (1 - Math.max(0, r) / 120)));
    } else if (action === 'trade') {
      accepted = decide('trade');
      if (accepted) { addTrade(state, a, b); addRel(state, a, b, 5); } else addRel(state, a, b, -1);
    } else if (action === 'cancel') {
      removeTrade(state, a, b); addRel(state, a, b, -10);
    } else if (action === 'pact') {
      accepted = decide('pact');
      if (accepted) { state.defensePacts.push([a, b]); addRel(state, a, b, 10); } else addRel(state, a, b, -2);
    } else if (action === 'break') {
      state.defensePacts = state.defensePacts.filter(([x, y]) => !((x === a && y === b) || (x === b && y === a)));
      addRel(state, a, b, -30);
      ca.aggression = clamp((ca.aggression || 0) + 5, 0, 100);
    } else if (action === 'sanction') {
      state.sanctions.push([a, b]);
      removeTrade(state, a, b);
      addRel(state, a, b, -25);
      for (const x of E().activeCountries(state)) if (x.id !== a && x.id !== b && rel(state, x.id, b) >= 70) addRel(state, x.id, a, -2);
    } else if (action === 'lift') {
      state.sanctions = state.sanctions.filter(([x, y]) => !(x === a && y === b));
      addRel(state, a, b, 10);
    } else if (action === 'negotiate') {
      accepted = decide('negotiate');
      if (accepted) { state.sanctions = state.sanctions.filter(([x, y]) => !(x === b && y === a)); addRel(state, a, b, 10); }
      else addRel(state, a, b, 2);
    }
    // پیشنهاد به بازیکن: تصمیم با بازیکن است (این مسیر فقط برای AI ← AI و بازیکن ← AI است)
    if (accepted === null) accepted = false;
    setCd(state, action, a, b, accepted ? COOLDOWN[action] : COOLDOWN[action]);
    return { ok: true, accepted };
  }

  // -------------------------------------------------------------------
  // پیشنهادهای هوش مصنوعی به بازیکن (قبول/رد با دکمه‌ی اعلان)
  // -------------------------------------------------------------------
  /** { id, type: 'pact'|'trade'|'arms'|'ally'|'ultimatum', from, to, turn, data } */
  function propose(state, p) {
    state.proposals ||= [];
    const item = { id: 'P' + (state.nextPropId = (state.nextPropId || 0) + 1), turn: state.turn, ...p };
    state.proposals.push(item);
    return item;
  }
  function proposalById(state, id) { return (state.proposals || []).find(p => p.id === id) || null; }

  /** پاسخ بازیکن (یا انقضا). خروجی: { ok, text } — text فقط کد است */
  function respond(state, propId, accept, rng) {
    const p = proposalById(state, propId);
    if (!p) return { ok: false, code: 'expired' };
    state.proposals = state.proposals.filter(x => x !== p);
    const { from, to } = p;
    if (p.type === 'pact') {
      if (accept && !hasPact(state, from, to) && pactCount(state, to) < MAX_PACTS) { state.defensePacts.push([from, to]); addRel(state, from, to, 10); return { ok: true, code: 'pact_ok' }; }
      addRel(state, from, to, -5); return { ok: true, code: 'pact_no' };
    }
    if (p.type === 'trade') {
      if (accept && !sanctioned(state, from, to)) { addTrade(state, from, to); addRel(state, from, to, 5); return { ok: true, code: 'trade_ok' }; }
      addRel(state, from, to, -3); return { ok: true, code: 'trade_no' };
    }
    if (p.type === 'arms') {
      if (!accept) { addRel(state, from, to, -3); return { ok: true, code: 'arms_no' }; }
      const r = SG.Arms.buy(state, from, to, p.data.unit, p.data.count);
      if (!r.ok) return { ok: false, code: 'arms_fail' };
      addRel(state, from, to, 2);
      return { ok: true, code: 'arms_ok', amount: r.order.cost };
    }
    if (p.type === 'ally') {
      // متحد ما مورد حمله قرار گرفته: کمک کنیم؟
      const war = SG.War.warById(state, p.data.war);
      if (accept && war && !SG.War.sideOf(war, to)) { SG.War.addToWar(state, war, to, SG.War.sideOf(war, from)); addRel(state, from, to, 15); return { ok: true, code: 'ally_ok' }; }
      addRel(state, from, to, -25);
      state.defensePacts = state.defensePacts.filter(([x, y]) => !((x === from && y === to) || (x === to && y === from)));
      return { ok: true, code: 'ally_no' };
    }
    if (p.type === 'ultimatum') {
      if (accept) { const got = SG.War.acceptTribute(state, from, to, p.data.amount); return { ok: true, code: 'ult_paid', amount: got }; }
      if (!E().isAtWar(state, from, to) && !SG.War.canDeclare(state, from, to)) SG.War.declare(state, from, to, rng || SG.Rng.create(state.rngState));
      return { ok: true, code: 'ult_war' };
    }
    return { ok: false };
  }

  SG.Diplomacy = {
    partners, hasTrade, tradeValue, tradeIncome, addTrade, removeTrade, seedTrade,
    sanctioned, sanctions, hasPact, pactCount, threatOf, timeFactor, sharedEnemy,
    acceptScore, chanceOf, status, perform, costOf, propose, respond, proposalById, addRel, setCd, waitOf,
    MAX_PACTS, COOLDOWN,
  };
})(window.SG = window.SG || {});

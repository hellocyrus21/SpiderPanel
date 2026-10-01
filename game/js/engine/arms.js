// =====================================================================
// خرید سلاح از کشورهای دیگر
// ---------------------------------------------------------------------
// ایده: هر کشوری که کارخانه‌ی یک نوع سلاح را دارد، می‌تواند بخشی از انبارش را بفروشد.
// این‌طور کشوری که خودش نمی‌تواند چیزی بسازد (مثلاً جنگنده) راه دیگری دارد — ولی با شرط:
//   - رابطه‌ی خوب (سلاح پیشرفته رابطه‌ی خیلی خوب یا هم‌پیمانی می‌خواهد)
//   - تحریم و جنگ معامله را می‌بندد؛ فروشنده به متحدِ دشمنِ در حال جنگش سلاح نمی‌دهد
//   - فروشنده‌ای که خودش در جنگ است، انبارش را نمی‌فروشد
//   - خریدار باید حداقل فناوری لازم برای به‌کار بردن آن سلاح را داشته باشد
//   - قیمت = قیمت ساخت در کشور فروشنده × سود فروشنده (رابطه‌ی بهتر = ارزان‌تر)
//   - هر قرارداد حداکثر ۸٪ انبار فروشنده + ۳ ماه تولیدش؛ با هر فروشنده هر ۳ ماه یک قرارداد
//   - پول نقد از خزانه، تحویل چند ماه بعد (به فاصله بستگی دارد)
// همه‌ی عددها برای همه‌ی کشورها یکسان است؛ تفاوت‌ها از داده (کارخانه، تخصص، رابطه، فاصله) می‌آید.
// =====================================================================
(function (SG) {
  'use strict';
  const D = () => window.SG_DATA;
  const E = () => SG.Engine, M = () => SG.Military;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  const RULES = {
    minRel: 10,            // حداقل رابطه برای خرید سلاح معمولی
    minRelAdvanced: 35,    // حداقل رابطه برای سلاح پیشرفته (مگر هم‌پیمان باشیم)
    stockShare: 0.08,      // هر قرارداد: حداکثر این سهم از انبار فروشنده ...
    prodMonths: 3,         // ... به‌علاوه‌ی این‌قدر ماه تولید کارخانه‌هایش
    cooldown: 3,           // با هر فروشنده هر چند ماه یک قرارداد
    techGap: 30,           // خریدار حداقل (فناوری لازم − ۳۰) را برای به‌کار بردن سلاح لازم دارد
    refundOnCancel: 0.5,   // اگر قبل از تحویل معامله لغو شود (جنگ/تحریم)، نصف پول برمی‌گردد
  };
  const BULKY = ['ship', 'submarine', 'armor'];   // حمل سنگین‌تر = یک ماه بیشتر

  /** ضریب هزینه‌ی ساخت در هر کشور (همان فرمول ساخت داخلی: دستمزد ارزان‌تر = ارزان‌تر) */
  function costFactor(c) {
    const perCap = c.gdp / Math.max(c.population, 0.001);
    return clamp(perCap / 40, 0.35, 1.3);
  }

  /** آیا این کشور با یکی از دشمنانِ در حال جنگِ خریدار هم‌پیمان است؟ */
  function alliedWithEnemy(state, sellerId, buyerId) {
    return E().warsOf(state, buyerId).some(en => en === sellerId || E().areAllied(state, sellerId, en));
  }

  function sanctions(state, a, b) {
    return state.sanctions.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
  }

  /** ظرفیت فروش یک قرارداد (تعداد) */
  function capacity(state, seller, type) {
    const stock = seller.forces[type] || 0;
    const prod = M().productionRate(state, seller, type) * RULES.prodMonths;
    const cap = Math.floor(Math.min(stock, stock * RULES.stockShare + prod));
    return Math.max(0, cap);
  }

  /** زمان تحویل (ماه) */
  function deliveryMonths(buyer, seller, type) {
    const d = M().distanceKm(buyer.pos, seller.pos);
    return 1 + Math.ceil(d / 4000) + (BULKY.includes(type) ? 1 : 0);
  }

  /**
   * پیشنهاد یک فروشنده برای یک نوع سلاح.
   * خروجی: { seller, type, price (هر عدد)، capacity, months, rel, allied, special, reason }
   *   reason: null یعنی می‌شود خرید؛ وگرنه کد دلیل (متن در UI)
   */
  function offer(state, buyerId, sellerId, type) {
    const buyer = state.countries[buyerId], seller = state.countries[sellerId];
    const def = D().units[type];
    const rel = E().getRelation(state, buyerId, sellerId);
    const allied = E().areAllied(state, buyerId, sellerId);
    const special = !!(M().specialty(seller, type).output);
    const out = { seller: sellerId, type, rel, allied, special, price: 0, capacity: 0, months: 0, reason: null };

    // قیمت: هزینه‌ی ساخت در کشور فروشنده × سود (۱۰ تا ۶۰ درصد بسته به رابطه)
    let markup = clamp(1.45 - rel / 200 - (allied ? 0.1 : 0), 1.1, 1.6);
    // خریدار زیر تحریم سنگین: فروشنده ریسک می‌کند و گران‌تر می‌دهد
    if (def.factory.advanced && SG.Economy.sanctionPressure(state, buyerId) >= 0.3) markup += 0.25;
    out.price = def.cost * costFactor(seller) * markup;
    out.capacity = capacity(state, seller, type);
    out.months = deliveryMonths(buyer, seller, type);

    const last = buyer.mil?.deals?.[sellerId];
    let reason = null;
    if (sellerId === buyerId) reason = 'self';
    else if (seller.annexedBy) reason = 'gone';
    else if (!(seller.factories[type] > 0)) reason = 'no_factory';
    else if (E().isAtWar(state, buyerId, sellerId)) reason = 'war';
    else if (sanctions(state, buyerId, sellerId)) reason = 'sanction';
    else if (E().warsOf(state, sellerId).length) reason = 'seller_war';
    else if (alliedWithEnemy(state, sellerId, buyerId)) reason = 'enemy_ally';
    else if (rel < RULES.minRel) reason = 'relation';
    else if (def.factory.advanced && !allied && rel < RULES.minRelAdvanced) reason = 'relation_adv';
    else if ((buyer.tech[def.branch] || 0) < def.factory.requires - RULES.techGap) reason = 'tech';
    else if (last !== undefined && state.turn - last < RULES.cooldown) reason = 'cooldown';
    else if (out.capacity < 1) reason = 'no_stock';
    out.reason = reason;
    out.wait = last !== undefined ? Math.max(0, last + RULES.cooldown - state.turn) : 0;
    return out;
  }

  /** همه‌ی فروشنده‌های ممکن یک نوع (اول قابل‌خریدها به ترتیب قیمت، بعد بقیه) */
  function sellersFor(state, buyerId, type) {
    const list = [];
    for (const c of Object.values(state.countries)) {
      if (c.id === buyerId || c.annexedBy || !(c.factories[type] > 0) || !(c.forces[type] > 0)) continue;
      list.push(offer(state, buyerId, c.id, type));
    }
    const rank = o => (o.reason ? 1 : 0);
    return list.sort((a, b) => rank(a) - rank(b) || (a.reason ? b.rel - a.rel : a.price - b.price));
  }

  /** چه سلاح‌هایی را یک کشور به ما می‌فروشد؟ */
  function catalogOf(state, buyerId, sellerId) {
    const seller = state.countries[sellerId];
    return Object.keys(D().units)
      .filter(t => seller.factories[t] > 0 && seller.forces[t] > 0)
      .map(t => offer(state, buyerId, sellerId, t));
  }

  /** خرید. خروجی: { ok, reason, order } */
  function buy(state, buyerId, sellerId, type, count) {
    const o = offer(state, buyerId, sellerId, type);
    if (o.reason) return { ok: false, reason: o.reason };
    count = Math.floor(Math.min(count, o.capacity));
    if (count < 1) return { ok: false, reason: 'no_stock' };
    const buyer = state.countries[buyerId], seller = state.countries[sellerId];
    const total = o.price * count;
    if (total > buyer.eco.treasury) return { ok: false, reason: 'money' };

    buyer.eco.treasury -= total;
    seller.eco.treasury += total;                         // پول به خزانه‌ی فروشنده می‌رود (بدون تقلب)
    const before = SG.War ? SG.War.branchSnapshot(seller) : null;
    seller.forces[type] -= count;                         // از انبار فروشنده کم می‌شود
    if (before) SG.War.adjustAiIndex(seller, before);
    // معامله‌ی تسلیحاتی روابط را گرم می‌کند
    const k = E().relKey(buyerId, sellerId);
    state.relations[k] = clamp((state.relations[k] ?? 0) + 3, -100, 100);

    buyer.mil.orders ||= [];
    buyer.mil.deals ||= {};
    const order = { id: 'O' + (state.nextOrderId = (state.nextOrderId || 0) + 1), seller: sellerId, type, count,
      cost: total, left: o.months, total: o.months };
    buyer.mil.orders.push(order);
    buyer.mil.deals[sellerId] = state.turn;
    return { ok: true, order };
  }

  /** یک نوبت: تحویل سفارش‌های رسیده (یا لغو اگر جنگ/تحریم پیش آمده). خروجی: رویدادها */
  function step(state, buyerId) {
    const c = state.countries[buyerId];
    if (!c.mil || !c.mil.orders || !c.mil.orders.length) return [];
    const events = [];
    for (const o of c.mil.orders) o.left--;
    for (const o of c.mil.orders.filter(x => x.left <= 0)) {
      const seller = state.countries[o.seller];
      const blocked = !seller || seller.annexedBy || E().isAtWar(state, buyerId, o.seller) || sanctions(state, buyerId, o.seller);
      if (blocked) {
        const refund = o.cost * RULES.refundOnCancel;
        c.eco.treasury += refund;
        events.push({ type: 'arms_cancelled', seller: o.seller, unit: o.type, count: o.count, refund });
        continue;
      }
      const city = M().homeCityFor(c, o.type, state);
      const s = M().addToLocation(state, c, o.type, o.count, M().cityLoc(c, city), city.pos);
      events.push({ type: 'arms_delivered', seller: o.seller, unit: o.type, count: o.count, city: city.name, stackId: s && s.id });
    }
    c.mil.orders = c.mil.orders.filter(x => x.left > 0);
    return events;
  }

  SG.Arms = { RULES, offer, sellersFor, catalogOf, buy, step, capacity };
})(window.SG = window.SG || {});

// =====================================================================
// پنل «ارتش» و پنجره‌ی «فرستادن نیرو»
// ---------------------------------------------------------------------
// پنل ارتش سه زبانه دارد:
//   نیروها     ← همه‌ی نیروها به تفکیک محل (روی هر ردیف بزنی، پنجره‌ی فرستادن باز می‌شود)
//   کارخانه‌ها ← هر نوع واحد: چند کارخانه، تولید ماهانه، روشن/خاموش، ساخت کارخانه‌ی جدید
//   خرید سلاح  ← خرید از کشورهای دیگر (engine/arms.js): فروشنده‌ها، قیمت، ظرفیت، زمان تحویل
// در جنگ، پنجره‌ی هر دسته‌ی زمینی در مرز یا خاک دشمن «حمله به شهر» هم دارد.
// پنجره‌ی فرستادن (با زدن روی نشان نیرو روی نقشه هم باز می‌شود):
//   «۲۸ تیپ زرهی در تهران» ← چندتا؟ ← کجا؟ (شهر خودی، مرز زمینی یا دریایی)
// =====================================================================
(function (SG) {
  'use strict';
  const F = SG.Fmt, M = SG.Military;
  const U = () => window.SG_DATA.units;

  let ctx = null;   // { state, id, onChange, onShowStack, onDeclare }
  let view = 'forces';
  let sendCount = 0;
  let armsType = 'fighter';   // نوع انتخاب‌شده در زبانه‌ی خرید
  let buyPick = null;         // { seller, type } فروشنده‌ای که پنجره‌ی خریدش باز است
  let buyCount = 0;
  const W = SG.War, A = SG.Arms;

  const country = () => ctx.state.countries[ctx.id];
  const num = v => F.num(Math.round(v));
  const qty = (type, n) => `${F.num(Math.round(n))} ${U()[type].unitWord}`;

  function rateText(r) {
    if (r >= 1) return F.num(Math.round(r * 10) / 10) + ' در ماه';
    if (r > 0) return 'هر ' + F.num(Math.round(1 / r)) + ' ماه یکی';
    return '—';
  }

  // -------------------------------------------------------------------
  function tabs() {
    const t = [['forces', '🎖️ نیروها'], ['factories', '🏭 کارخانه‌ها'], ['arms', '🛒 خرید سلاح']];
    const cur = view.startsWith('stack:') ? 'forces' : view.startsWith('seller:') ? 'arms' : view;
    return `<div class="seg mil-tabs">${t.map(([k, l]) => `<button class="${cur === k ? 'on' : ''}" data-view="${k}">${l}</button>`).join('')}</div>`;
  }

  // -------------------------------------------------------------------
  // نیروها
  // -------------------------------------------------------------------
  function forcesView() {
    const c = country(), st = ctx.state;
    const upkeep = M.upkeepMonthly(c), prod = M.productionCostMonthly(st, c);
    // گروه‌بندی بر اساس محل
    const groups = {};
    for (const s of c.mil.stacks) {
      const key = s.move ? 'moving' : (s.loc.kind === 'city' ? s.loc.city : 'b:' + s.loc.target + (s.loc.sea ? 's' : ''));
      const front = !s.move && s.loc.kind === 'border' && !s.loc.sea && SG.Engine.isAtWar(st, ctx.id, s.loc.target);
      const icon = s.move ? '🚚 ' : front ? '⚔️ جبهه‌ی ' : s.loc.kind === 'city' ? '🏙️ ' : (s.loc.sea ? '⚓ ' : '🚩 ');
      (groups[key] ||= { title: s.move ? '🚚 در حال حرکت' : icon + M.locName(st, s.loc), list: [] }).list.push(s);
    }
    const order = Object.keys(groups).sort((a, b) => (a === 'moving') - (b === 'moving') || (a.startsWith('b:')) - (b.startsWith('b:')));
    const sections = order.map(k => `<div class="loc-group"><div class="row-label">${F.esc(groups[k].title)}</div>
      <div class="stack-list">${groups[k].list.map(s => `<button class="stack-row" data-stack="${s.id}">
        <span>${U()[s.type].icon} ${U()[s.type].name}</span><b>${qty(s.type, s.count)}</b>
        ${s.move ? `<small class="muted">→ ${F.esc(M.locName(st, s.move.dest))} | ${F.num(s.move.left)} ماه</small>` : ''}
        ${s.supply < 50 ? '<small class="bad">تدارکات ' + num(s.supply) + '</small>' : ''}
      </button>`).join('')}</div></div>`).join('');
    const totals = Object.entries(U()).filter(([k]) => c.forces[k] > 0)
      .map(([k, d]) => `<span class="total-chip">${d.icon} ${F.num(c.forces[k])}</span>`).join('');
    return `
      <div class="gov-kpis">
        <div class="kpi"><span>قدرت کل</span><b>${num(SG.Engine.militaryPower(c))}</b><small>رتبه ${F.num(SG.Engine.rankOf(st, ctx.id, SG.Engine.militaryPower))} جهان</small></div>
        <div class="kpi"><span>نگهداری ماهانه</span><b>${F.money(upkeep)}</b></div>
        <div class="kpi"><span>تولید ماهانه</span><b>${F.money(prod)}</b><small>خطوط روشن</small></div>
        <div class="kpi"><span>سوخت ارتش</span><b>${num(M.fuelUse(c))}</b><small>واحد انرژی در سال</small></div>
      </div>
      <div class="totals">${totals}</div>
      ${c.mil.orders && c.mil.orders.length ? `<div class="row-label">📦 سلاح‌های خریداری‌شده در راه</div><div class="stack-list">${c.mil.orders.map(o =>
        `<div class="stack-row static"><span>${U()[o.type].icon} ${U()[o.type].name} از ${F.esc(st.countries[o.seller].name)}</span><b>${qty(o.type, o.count)}</b><small class="muted">${F.num(o.left)} ماه دیگر</small></div>`).join('')}</div>` : ''}
      <p class="muted small">روی هر ردیف (یا روی نشان نیرو روی نقشه) بزنید تا تعداد دلخواه را به شهر یا مرز بفرستید.</p>
      ${sections}`;
  }

  // -------------------------------------------------------------------
  // کارخانه‌ها
  // -------------------------------------------------------------------
  function factoriesView() {
    const c = country(), st = ctx.state;
    const rows = Object.entries(U()).map(([k, d]) => {
      const n = c.factories[k] || 0;
      const rate = M.productionRate(st, c, k);
      const perFactory = n ? rate / n : 0;
      const on = !!c.mil.lines[k];
      const allowed = (c.tech[d.branch] || 0) >= d.factory.requires;
      const building = c.mil.construction.filter(x => x.type === k);
      const sanctioned = M.sanctionHit(st, c, k);
      const spec = (window.SG_DATA.specialties[c.id] || {})[k];
      const range = M.rangeOf(c, k);
      return `<div class="fac-card ${allowed ? '' : 'off'}">
        <div class="uc-head"><span class="uc-icon">${d.icon}</span><b>${d.factory.name}</b>
          ${spec && spec.output ? '<span class="badge gold" title="تخصص این کشور">تخصص</span>' : ''}
          ${sanctioned ? '<span class="badge danger" title="تحریم: تولید کمتر و گران‌تر">تحریم</span>' : ''}</div>
        ${allowed ? `
          <div class="fac-line"><span>کارخانه‌ها: <b>${F.num(n)}</b></span>
            <span>هر کارخانه: <b>${perFactory ? rateText(perFactory) : '—'}</b></span></div>
          <div class="fac-line"><span>تولید کل: <b class="${on ? 'good' : 'muted'}">${n ? rateText(rate) : '—'}</b> ${d.unitWord}</span>
            <span>قیمت هر ${d.unitWord}: <b>${F.money(M.unitCost(st, c, k))}</b></span></div>
          ${range && range < 9000 ? `<div class="muted small">برد: ${F.num(range)} کیلومتر</div>` : ''}
          <div class="fac-actions">
            ${n ? `<button class="btn tiny ${on ? 'primary' : ''}" data-line="${k}">${on ? '⏸ خاموش کن' : '▶ روشن کن'}</button>
              ${on ? `<small class="muted">${F.money(rate * M.unitCost(st, c, k))} در ماه</small>` : ''}` : '<small class="muted">کارخانه‌ای ندارید</small>'}
            <button class="btn tiny" data-build="${k}">➕ کارخانه‌ی جدید | ${F.money(M.factoryCost(st, c, k))} | ${F.num(d.factory.time)} ماه | نگهداری ${F.money(d.factory.upkeep * (c.mil.costFactor || 1))}/ماه</button>
          </div>
          ${building.length ? `<div class="small">🏗️ در حال ساخت: ${building.map(b => F.num(b.left) + ' ماه').join('، ')}</div>` : ''}`
        : `<div class="muted small">🔒 فناوری لازم: ${F.BRANCH[d.branch]} ${F.num(d.factory.requires)} (شما ${num(c.tech[d.branch])}). با درخت پیشرفت (مرحله‌ی ۶) باز می‌شود.
            فعلاً می‌توانید <button class="btn tiny" data-armstype="${k}">🛒 از کشورهای دیگر بخرید</button></div>`}
      </div>`;
    }).join('');
    return `
      <p class="muted small">تولید هر کارخانه در همه‌ی کشورها یکسان است (مثلاً کارخانه‌ی موشک ماهی ۳۰ فروند)؛ کشور قوی‌تر کارخانه‌ی بیشتری دارد.
        هر کارخانه نگهداری ماهانه دارد (حتی خاموش) و خطوط روشن هزینه‌ی ساخت هم دارند. نگهداری کارخانه‌ها: <b>${F.money(M.factoryUpkeepMonthly(c))}</b> در ماه.
        خزانه: <b>${F.money(c.eco.treasury)}</b></p>
      <div class="fac-grid">${rows}</div>`;
  }

  // -------------------------------------------------------------------
  // فرستادن نیرو
  // -------------------------------------------------------------------
  function stackView(stackId) {
    const c = country(), st = ctx.state;
    const s = M.findStack(st, ctx.id, stackId);
    if (!s) { view = 'forces'; return forcesView(); }
    const d = U()[s.type];
    if (sendCount <= 0 || sendCount > s.count) sendCount = s.count;
    const weak = Object.keys(d.weakVs).map(w => U()[w].name).join('، ');
    const head = `<section class="card stack-head">
        <div class="sh-icon">${d.icon}</div>
        <div><h3>${d.name}: ${qty(s.type, s.count)}</h3>
          <div class="small">${s.move ? `🚚 در راه ${F.esc(M.locName(st, s.move.dest))} | ${F.num(s.move.left)} ماه دیگر` : '📍 ' + F.esc(M.locName(st, s.loc))}</div>
          <div class="muted small">⚔️ حمله ${F.num(d.attack)} | 🛡 دفاع ${F.num(d.defense)}${M.rangeOf(c, s.type) && M.rangeOf(c, s.type) < 9000 ? ` | 📏 برد ${F.num(M.rangeOf(c, s.type))} کیلومتر` : ''}${weak ? ` | ضعیف در برابر: ${weak}` : ''}</div>
          <div class="ac-bars"><span>تدارکات</span><div class="bar ${s.supply < 50 ? 'bad' : s.supply < 75 ? 'mid' : 'good'}"><span style="width:${s.supply}%"></span></div><b>${num(s.supply)}</b></div>
        </div></section>`;
    if (s.move) return `<button class="btn ghost tiny" data-view="forces">→ همه‌ی نیروها</button>${head}
      <p class="muted">این نیرو در حال حرکت است؛ وقتی رسید می‌توانید دوباره جابه‌جایش کنید.</p>`;

    const dests = M.destinations(st, ctx.id, s);
    const destBtn = x => {
      let name, extra = '';
      if (x.kind === 'city') name = `${x.capital ? '★' : '🏙️'} ${F.esc(x.name)}`;
      else {
        name = `${x.sea ? '⚓' : '🚩'} مرز ${F.esc(st.countries[x.target].name)}`;
        const atWar = SG.Engine.isAtWar(st, ctx.id, x.target);
        const lab = F.relationLabel(SG.Engine.getRelation(st, ctx.id, x.target));
        extra = atWar ? ' <small class="bad">جبهه‌ی جنگ</small>' : ` <small class="${lab.cls}">${lab.text}</small>`;
      }
      return `<button class="dest" data-dest="${x.kind}|${x.city || x.target}|${x.sea ? 1 : 0}"><span>${name}${extra}</span><small>${F.num(x.turns)} ماه</small></button>`;
    };
    const borders = dests.filter(x => x.kind === 'border'), cities = dests.filter(x => x.kind === 'city');
    const step = s.count >= 1000 ? 100 : s.count >= 100 ? 10 : 1;
    const isLand = W.GROUND.includes(s.type), isStrike = W.AIRSTRIKE.includes(s.type);
    const borderTarget = s.loc.kind === 'border' && !s.loc.sea ? s.loc.target : null;
    const atFront = borderTarget && SG.Engine.isAtWar(st, ctx.id, borderTarget);
    const canDeclare = borderTarget && !atFront && !W.canDeclare(st, ctx.id, borderTarget);
    // در برد کدام جبهه‌ها هستیم؟
    const inRange = isStrike ? W.warsOfCountry(st, ctx.id).filter(w => W.engaged(st, w, ctx.id, 'air').some(e => e.src === s))
      .map(w => st.countries[w.leaders[W.sideOf(w, ctx.id) === 'A' ? 'B' : 'A']].name) : [];
    const atWarAny = W.warsOfCountry(st, ctx.id).length > 0;
    return `<button class="btn ghost tiny" data-view="forces">→ همه‌ی نیروها</button>${head}
      ${atFront ? `<section class="card warn-card"><h3>⚔️ در جبهه‌ی ${F.esc(st.countries[borderTarget].name)}</h3>
          <p class="small">این نیرو هر ماه در نبرد جبهه شرکت می‌کند. پیشروی به درصد خاک است و در پنل جنگ دیده می‌شود. برای عقب‌نشینی به یکی از شهرهای خودی بفرستید.</p>
          <button class="btn tiny" data-openwar>🔥 دستور جنگ</button></section>` : ''}
      ${isStrike && atWarAny ? `<section class="card"><h3>🎯 جنگ هوایی</h3>
          <p class="small muted">هواپیما، پهپاد و موشک فقط وقتی در «نقشه‌ی ترکیبی» (پنل جنگ) و در برد دشمن باشند شلیک می‌کنند. برد: ${F.num(M.rangeOf(c, s.type))} کیلومتر.</p>
          <div class="small">${inRange.length ? 'در برد جبهه‌ی: ' + inRange.map(F.esc).join('، ') : '<span class="bad">الان در برد هیچ جبهه‌ای نیست — به شهری نزدیک‌تر بفرستید.</span>'}</div></section>` : ''}
      <section class="card"><h3>چندتا بفرستیم؟</h3>
        <div class="send-count">
          <button class="btn tiny" data-cnt="-${step}">−${F.num(step)}</button>
          <input type="range" min="1" max="${s.count}" value="${sendCount}" data-range>
          <button class="btn tiny" data-cnt="${step}">+${F.num(step)}</button>
        </div>
        <div class="send-quick">
          <b class="send-val">${qty(s.type, sendCount)}</b>
          <button class="btn tiny ghost" data-frac="0.25">ربع</button>
          <button class="btn tiny ghost" data-frac="0.5">نصف</button>
          <button class="btn tiny ghost" data-frac="1">همه</button>
        </div>
      </section>
      ${canDeclare && isLand ? `<section class="card"><h3>⚔️ حمله به ${F.esc(st.countries[borderTarget].name)}</h3>
        <p class="muted small">با این کشور در جنگ نیستیم. اول باید اعلان جنگ بدهید (کشور هدف ممکن است برای جلوگیری از جنگ پول پیشنهاد کند).</p>
        <button class="btn danger" data-declare="${borderTarget}">⚔️ اعلان جنگ به ${F.esc(st.countries[borderTarget].name)}…</button></section>` : ''}
      ${borders.length ? `<section class="card"><h3>🚩 به مرز</h3><p class="muted small">نیروی زمینی در مرز کشوری که با آن در جنگیم، در جبهه می‌جنگد. تجمع نیرو در مرز، همسایه را نگران می‌کند.</p>
        <div class="dests">${borders.map(destBtn).join('')}</div></section>` : ''}
      ${cities.length ? `<section class="card"><h3>🏙️ به شهرهای خودی</h3><div class="dests">${cities.map(destBtn).join('')}</div></section>` : ''}
      ${s.loc.kind === 'city' ? `<button class="btn ghost tiny" data-demob title="هزینه‌ی نگهداری کم می‌شود؛ پولی برنمی‌گردد">مرخص کردن ${qty(s.type, sendCount)}</button>` : ''}`;
  }

  // -------------------------------------------------------------------
  // خرید سلاح
  // -------------------------------------------------------------------
  const REASON = {
    war: 'در جنگیم', sanction: 'تحریم', seller_war: 'خودش در جنگ است', enemy_ally: 'هم‌پیمان دشمن ما',
    relation: 'رابطه کافی نیست', relation_adv: 'برای این سلاح رابطه‌ی خیلی خوب یا پیمان لازم است',
    tech: 'فناوری ما برای به‌کار بردنش کم است', cooldown: 'قرارداد قبلی تازه بسته شده', no_stock: 'موجودی ندارد',
    no_factory: 'این را نمی‌سازد', no_export: 'سلاح راهبردی؛ فروخته نمی‌شود', gone: 'وجود ندارد', self: '', money: 'پول کافی نیست',
  };

  function offerRow(st, o, showType) {
    const d = U()[o.type];
    const lab = F.relationLabel(o.rel);
    const open = buyPick && buyPick.seller === o.seller && buyPick.type === o.type;
    const who = showType ? `${d.icon} ${d.name}` : `${F.esc(st.countries[o.seller].name)} <small class="${lab.cls}">${lab.text}${o.allied ? ' | هم‌پیمان' : ''}</small>`;
    return `<div class="offer ${o.reason ? 'off' : ''} ${open ? 'open' : ''}">
      <div class="offer-main">
        <span>${who} ${o.special ? '<span class="badge gold" title="تخصص فروشنده">تخصص</span>' : ''}</span>
        <span class="small">هر ${d.unitWord}: <b>${F.money(o.price)}</b> | موجودی قابل فروش: <b>${F.num(o.capacity)}</b> | تحویل: <b>${F.num(o.months)} ماه</b></span>
        ${o.reason ? `<small class="bad">${REASON[o.reason] || o.reason}${o.reason === 'cooldown' && o.wait ? ` (${F.num(o.wait)} ماه دیگر)` : ''}</small>`
          : `<button class="btn tiny primary" data-buypick="${o.seller}|${o.type}">🛒 خرید</button>`}
      </div>
      ${open ? buyBox(st, o) : ''}
    </div>`;
  }

  function buyBox(st, o) {
    const c = country();
    const maxMoney = Math.floor(c.eco.treasury / Math.max(o.price, 1e-9));
    const max = Math.max(1, Math.min(o.capacity, maxMoney));
    if (buyCount <= 0 || buyCount > max) buyCount = Math.min(max, Math.max(1, Math.ceil(o.capacity / 2)));
    const total = buyCount * o.price;
    return `<div class="buy-box">
      ${maxMoney < 1 ? '<p class="bad small">پول خزانه برای حتی یک عدد کافی نیست.</p>' : `
      <div class="send-count"><input type="range" min="1" max="${max}" value="${buyCount}" data-buyrange></div>
      <div class="send-quick"><b class="buy-val">${qty(o.type, buyCount)} = ${F.money(total)}</b>
        <button class="btn tiny ghost" data-buyfrac="0.25">ربع</button><button class="btn tiny ghost" data-buyfrac="1">حداکثر</button></div>
      <p class="muted small">پول همین حالا از خزانه (${F.money(c.eco.treasury)}) کم می‌شود؛ ${F.num(o.months)} ماه بعد در ${F.esc(M.homeCityFor(c, o.type, st).name)} تحویل می‌شود.
        رابطه با فروشنده کمی بهتر می‌شود. اگر قبل از تحویل جنگ یا تحریم پیش بیاید، فقط نصف پول برمی‌گردد.</p>
      <button class="btn primary" data-buy="${o.seller}|${o.type}">✅ پرداخت و سفارش</button>`}
    </div>`;
  }

  function armsView() {
    const c = country(), st = ctx.state;
    const def = U()[armsType];
    const offers = A.sellersFor(st, ctx.id, armsType);
    const avail = offers.filter(o => !o.reason);
    const shown = avail.concat(offers.filter(o => o.reason).slice(0, Math.max(3, 8 - avail.length)));
    const techOk = (c.tech[def.branch] || 0) >= def.factory.requires - A.RULES.techGap;
    return `
      <p class="muted small">هر کشوری که کارخانه‌ی یک سلاح را دارد، بخشی از انبارش را می‌فروشد. رابطه‌ی بهتر = قیمت کمتر.
        سلاح پیشرفته (جنگنده، بمب‌افکن، ناو، زیردریایی، موشک) رابطه‌ی خیلی خوب (۳۵+) یا هم‌پیمانی می‌خواهد. خزانه: <b>${F.money(c.eco.treasury)}</b></p>
      <div class="chips arms-types">${Object.entries(U()).map(([k, d]) => `<button class="chip ${k === armsType ? 'on' : ''}" data-armstype="${k}">${d.icon} ${d.short}</button>`).join('')}</div>
      <section class="card"><h3>${def.icon} ${def.name}</h3>
        <div class="muted small">⚔️ حمله ${F.num(def.attack)} | 🛡 دفاع ${F.num(def.defense)} | داریم: ${qty(armsType, c.forces[armsType] || 0)} | قیمت ساخت در کشور خودمان: ${F.money(M.unitCost(st, c, armsType))}
          ${(c.factories[armsType] || 0) > 0 ? '' : ' | <span class="bad">خودمان کارخانه‌اش را نداریم</span>'}</div>
        ${techOk ? '' : `<p class="bad small">فناوری ${F.BRANCH[def.branch]} ما (${num(c.tech[def.branch])}) برای به‌کار بردن این سلاح کم است؛ حداقل ${F.num(def.factory.requires - A.RULES.techGap)} لازم است.</p>`}
        ${shown.length ? `<div class="offers">${shown.map(o => offerRow(st, o, false)).join('')}</div>` : '<p class="muted">هیچ کشوری این سلاح را نمی‌فروشد.</p>'}
        ${offers.length > shown.length ? `<p class="muted small">و ${F.num(offers.length - shown.length)} فروشنده‌ی دیگر که فعلاً به ما نمی‌فروشند.</p>` : ''}
      </section>`;
  }

  /** همه‌ی سلاح‌هایی که یک کشور مشخص به ما می‌فروشد (از پنل آن کشور) */
  function sellerView(sellerId) {
    const st = ctx.state, c = country();
    const list = A.catalogOf(st, ctx.id, sellerId);
    const s = st.countries[sellerId];
    const lab = F.relationLabel(SG.Engine.getRelation(st, ctx.id, sellerId));
    return `<button class="btn ghost tiny" data-view="arms">→ همه‌ی سلاح‌ها</button>
      <section class="card"><h3>🛒 خرید از ${F.esc(s.name)}</h3>
        <div class="small">رابطه: <span class="${lab.cls}">${lab.text} (${F.num(SG.Engine.getRelation(st, ctx.id, sellerId))})</span> | خزانه‌ی ما: <b>${F.money(c.eco.treasury)}</b></div>
        ${list.length ? `<div class="offers">${list.map(o => offerRow(st, o, true)).join('')}</div>` : '<p class="muted">این کشور سلاحی برای فروش تولید نمی‌کند.</p>'}
      </section>`;
  }

  // -------------------------------------------------------------------
  function body() {
    let html = tabs();
    if (view === 'forces') html += forcesView();
    else if (view === 'factories') html += factoriesView();
    else if (view === 'arms') html += armsView();
    else if (view.startsWith('seller:')) html += sellerView(view.slice(7));
    else if (view.startsWith('stack:')) html += stackView(view.slice(6));
    return html;
  }

  function rerender() {
    const el = document.querySelector('.modal-body');
    if (!el || !el.querySelector('.mil-tabs') || !ctx) return;
    const top = el.scrollTop;
    el.innerHTML = body();
    el.scrollTop = top;
    bindRange();
  }

  function bindRange() {
    const br = document.querySelector('.modal-body [data-buyrange]');
    if (br) br.addEventListener('input', () => {
      buyCount = +br.value;
      const o = A.offer(ctx.state, ctx.id, buyPick.seller, buyPick.type);
      document.querySelector('.modal-body .buy-val').textContent = `${qty(o.type, buyCount)} = ${F.money(buyCount * o.price)}`;
    });
    const r = document.querySelector('.modal-body [data-range]');
    if (!r) return;
    r.addEventListener('input', () => {
      sendCount = +r.value;
      const s = M.findStack(ctx.state, ctx.id, view.slice(6));
      document.querySelector('.modal-body .send-val').textContent = qty(s.type, sendCount);
      const demob = document.querySelector('.modal-body [data-demob]');
      if (demob) demob.textContent = 'مرخص کردن ' + qty(s.type, sendCount);
    });
  }

  function go(v) {
    view = v;
    rerender();
    const el = document.querySelector('.modal-body');
    if (el) el.scrollTop = 0;
  }

  function onClick(e) {
    const t = e.target.closest('button');
    if (!t) return;
    const ds = t.dataset, st = ctx.state, id = ctx.id;
    if (ds.view) { buyPick = null; go(ds.view); return; }
    if (ds.armstype) { armsType = ds.armstype; buyPick = null; go('arms'); return; }
    if (ds.buypick) {
      const [seller, type] = ds.buypick.split('|');
      buyPick = buyPick && buyPick.seller === seller && buyPick.type === type ? null : { seller, type };
      buyCount = 0; rerender(); return;
    }
    if (ds.buyfrac) {
      const o = A.offer(st, id, buyPick.seller, buyPick.type);
      const max = Math.max(1, Math.min(o.capacity, Math.floor(st.countries[id].eco.treasury / Math.max(o.price, 1e-9))));
      buyCount = Math.max(1, Math.floor(max * +ds.buyfrac)); rerender(); return;
    }
    if (ds.buy) {
      const [seller, type] = ds.buy.split('|');
      const r = A.buy(st, id, seller, type, buyCount);
      if (!r.ok) { SG.NotifyUI.simpleToast('خرید انجام نشد: ' + (REASON[r.reason] || r.reason), 'lvl-warning'); rerender(); return; }
      SG.NotifyUI.simpleToast(`📦 ${qty(type, r.order.count)} ${U()[type].name} از ${F.esc(st.countries[seller].name)} سفارش داده شد؛ ${F.num(r.order.left)} ماه تا تحویل.`, 'lvl-info');
      buyPick = null; buyCount = 0; changed(); return;
    }
    if (ds.declare) { SG.WarPanel.confirmDeclare(st, id, ds.declare, () => { ctx.onChange(); }); return; }
    if (ds.openwar !== undefined) { ctx.onOpenWar && ctx.onOpenWar(); return; }
    if (ds.stack) { sendCount = 0; go('stack:' + ds.stack); return; }
    if (ds.line) { M.setLine(st, id, ds.line, !st.countries[id].mil.lines[ds.line]); changed(); return; }
    if (ds.build) {
      const r = M.buildFactory(st, id, ds.build);
      if (r === 'money') SG.NotifyUI.simpleToast('پول کافی در خزانه نیست.', 'lvl-warning');
      else if (!r) SG.NotifyUI.simpleToast(`🏗️ ساخت ${U()[ds.build].factory.name} شروع شد.`, 'lvl-info');
      changed(); return;
    }
    const s = view.startsWith('stack:') ? M.findStack(st, id, view.slice(6)) : null;
    if (!s) return;
    if (ds.cnt) { sendCount = Math.max(1, Math.min(s.count, sendCount + +ds.cnt)); rerender(); return; }
    if (ds.frac) { sendCount = Math.max(1, Math.round(s.count * +ds.frac)); rerender(); return; }
    if (ds.demob !== undefined) {
      if (!confirm(`${qty(s.type, sendCount)} ${U()[s.type].name} مرخص شوند؟`)) return;
      M.demobilize(st, id, s.id, sendCount); sendCount = 0; go('forces'); ctx.onChange(); return;
    }
    if (ds.dest) {
      const [kind, key, sea] = ds.dest.split('|');
      const d = M.destinations(st, id, s).find(x => x.kind === kind && (x.city || x.target) === key && (x.sea ? '1' : '0') === sea);
      if (!d) return;
      const n = sendCount;
      const mover = M.send(st, id, s.id, n, d);
      if (mover) {
        SG.NotifyUI.simpleToast(`🚚 ${qty(mover.type, n)} ${U()[mover.type].name} به ${d.kind === 'city' ? F.esc(d.name) : 'مرز ' + F.esc(st.countries[d.target].name)} حرکت کرد؛ ${F.num(d.turns)} ماه تا رسیدن.`, 'lvl-info');
        sendCount = 0;
        ctx.onChange();
        SG.Modal.close();
        ctx.onShowStack(mover.id);
      }
    }
  }

  function changed() { ctx.onChange(); rerender(); }

  /** @param {string} [startView] 'forces' | 'factories' | 'arms' | 'seller:<ISO3>' | 'stack:<id>' */
  function open(state, id, { onChange, onShowStack, onOpenWar }, startView) {
    ctx = { state, id, onChange, onShowStack, onOpenWar };
    if (startView) view = startView;
    if (startView && startView.startsWith('stack:')) sendCount = 0;
    buyPick = null;
    SG.Modal.open({ title: '⚔️ ارتش — ' + state.countries[id].name, html: body(), onClick });
    bindRange();
  }

  SG.MilitaryPanel = { open, refresh: rerender };
})(window.SG = window.SG || {});

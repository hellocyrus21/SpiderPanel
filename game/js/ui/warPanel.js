// =====================================================================
// پنل «جنگ»، گزارش نبرد، پنجره‌ی اعلان جنگ و اطلاعات نیروی دشمن
// ---------------------------------------------------------------------
// پنل جنگ: هر جنگ ← طرفین، امتیاز جنگ، خستگی، شهرهای تصرف‌شده، نبردهای جاری، پیشنهاد صلح
// گزارش نبرد: دو ستون (مهاجم/مدافع) با آیکون و تلفات هر نوع و همه‌ی ضریب‌ها تا معلوم شود چرا برد یا باخت
// اعلان جنگ: پیش‌بینی مشاور (بهانه‌ی موجه، متحدان هدف، مقایسه‌ی قدرت، تحریم احتمالی)
// =====================================================================
(function (SG) {
  'use strict';
  const F = SG.Fmt, E = SG.Engine, W = SG.War;
  const U = () => window.SG_DATA.units;
  const T = () => window.SG_DATA.peaceTerms;

  let ctx = null;   // { state, pid, onChange, onFocus }

  const name = (st, id) => F.esc(st.countries[id]?.name || id);
  const names = (st, ids) => ids.map(id => name(st, id)).join('، ');
  const pct = v => F.num(Math.round(v)) + '٪';
  const x2 = v => '×' + F.num(Math.round(v * 100) / 100, 2);
  const qty = (type, n) => {
    const d = U()[type];
    const v = d.counted === 'unit' ? Math.round(n * 10) / 10 : Math.round(n);
    return `${F.num(v)} ${d.unitWord}`;
  };

  function scoreBar(score) {
    const half = Math.abs(score) / 2;
    const style = score >= 0 ? `right:50%;width:${half}%` : `left:50%;width:${half}%`;
    return `<div class="relbar ${score >= 0 ? 'pos' : 'neg'}"><span style="${style}"></span></div>`;
  }

  function bar(v, cls) {
    return `<div class="bar ${cls}"><span style="width:${Math.max(0, Math.min(100, v))}%"></span></div>`;
  }

  // -------------------------------------------------------------------
  // پنل جنگ
  // -------------------------------------------------------------------
  function warCard(st, pid, war) {
    const side = W.sideOf(war, pid), enemySide = side === 'A' ? 'B' : 'A';
    const enemy = war.leaders[enemySide];
    const sc = W.scoreFor(st, war, pid);
    const me = st.countries[pid], en = st.countries[enemy];
    const months = st.turn - war.start;
    const lostFrac = id => (war.lost[id] || 0) / Math.max(war.base[id] || 1, 1) * 100;
    const held = [], lost = [];
    for (const [cid, k] of Object.entries(st.control || {})) {
      if (k.kind !== 'occupied') continue;
      const city = W.cityById(st, cid);
      if (!city) continue;
      const byMe = W.sideOf(war, k.by) === side, orig = W.effectiveOwner(st, W.origOf(cid));
      if (byMe && W.sideOf(war, orig) === enemySide) held.push(city);
      if (!byMe && W.sideOf(war, k.by) === enemySide && W.sideOf(war, orig) === side) lost.push(city);
    }
    const cityChip = city => `<button class="chip" data-city="${city.id}">${city.capital ? '★ ' : ''}${F.esc(city.name)}</button>`;
    const active = (war.active || []).map(cid => {
      const city = W.cityById(st, cid);
      const last = war.battles.slice().reverse().find(b => b.city === cid);
      if (!city || !last) return '';
      const weAtt = last.att.owners.includes(pid) || W.sideOf(war, last.att.owners[0]) === side;
      const r = weAtt ? last.ratio : 1 / Math.max(last.ratio, 1e-6);
      const siege = weAtt && last.siegeNeeded ? ` | محاصره ${F.num(last.siege || 0)} از ${F.num(last.siegeNeeded)}` : '';
      return `<button class="battle-row" data-report="${last.id}">
        <span>${weAtt ? '⚔️' : '🛡️'} ${F.esc(city.name)} <small class="muted">(${F.esc(st.countries[W.origOf(cid)].name)})</small></span>
        <b class="${r >= 1 ? 'good' : 'bad'}">${x2(r)}</b><small class="muted">${weAtt ? 'حمله‌ی ما' : 'دفاع ما'}${siege}</small></button>`;
    }).join('');
    const recent = war.battles.slice(-8).reverse().map(b => {
      const weAtt = W.sideOf(war, b.att.owners[0]) === side;
      const won = (b.result === 'att') === weAtt;
      return `<button class="battle-row small" data-report="${b.id}"><span>${F.date(b.date)} — ${F.esc(b.cityName)}</span>
        <b class="${won ? 'good' : 'bad'}">${b.fell ? (weAtt ? '🏴 تصرف' : '🏳️ از دست رفت') : won ? 'برتری' : 'عقب'}</b></button>`;
    }).join('');
    const terms = W.peaceTerms(st, war, pid).map(t => {
      const def = T()[t.term];
      const why = t.ok ? 'می‌پذیرد' : { score: 'امتیاز جنگ کافی نیست', need_capital: 'اول پایتخت را بگیرید', no_cities: 'شهری نگرفته‌ایم', not_leader: 'فقط رهبر جبهه' }[t.reason] || 'نمی‌پذیرد';
      return `<button class="decree ${t.ok ? '' : 'off'}" data-peace="${t.term}" data-war="${war.id}" ${t.ok ? '' : 'disabled'}>
        <span class="d-icon">${def.icon}</span><span class="d-main"><b>${def.name}</b><small>${def.desc}</small></span>
        <span class="d-cost ${t.ok ? 'good' : 'bad'}">${why}</span></button>`;
    }).join('');
    return `<section class="card war-card">
      <h3>⚔️ ${name(st, war.leaders[side])} در برابر ${name(st, enemy)}</h3>
      <div class="muted small">${months ? F.num(months) + ' ماه جنگ' : 'همین ماه شروع شد'} | ${war.justified ? 'با بهانه‌ی موجه' : '<span class="bad">بدون بهانه‌ی موجه</span>'}${war.scenario ? ' | از قبل در جریان' : ''}</div>
      ${war.sides[side].length > 1 ? `<div class="row-label">جبهه‌ی ما</div><div class="chips">${war.sides[side].map(id => `<button class="chip" data-goto="${id}">${name(st, id)}</button>`).join('')}</div>` : ''}
      <div class="row-label">دشمن</div><div class="chips">${war.sides[enemySide].map(id => `<button class="chip danger" data-goto="${id}">${name(st, id)}</button>`).join('')}</div>
      <div class="stat-line"><span>امتیاز جنگ</span><b class="${sc >= 0 ? 'good' : 'bad'}">${sc >= 0 ? '+' : '−'}${F.num(Math.abs(sc))}</b>
        <small class="muted">${sc >= 60 ? 'پیروزی نزدیک است' : sc >= 25 ? 'به نفع ما' : sc > -25 ? 'برابر' : sc > -60 ? 'به ضرر ما' : 'در حال شکست'}</small></div>
      ${scoreBar(sc)}
      <div class="war-grid">
        <div><span>خستگی جنگ ما</span>${bar(me.warWeariness || 0, (me.warWeariness || 0) > 50 ? 'bad' : 'mid')}<b>${pct(me.warWeariness || 0)}</b></div>
        <div><span>خستگی ${name(st, enemy)}</span>${bar(en.warWeariness || 0, 'mid')}<b>${pct(en.warWeariness || 0)}</b></div>
        <div><span>تلفات ما (از کل ارتش)</span>${bar(lostFrac(pid), 'bad')}<b>${pct(lostFrac(pid))}</b></div>
        <div><span>تلفات ${name(st, enemy)}</span>${bar(lostFrac(enemy), 'good')}<b>${pct(lostFrac(enemy))}</b></div>
      </div>
      ${held.length ? `<div class="row-label">🏴 شهرهایی که گرفته‌ایم</div><div class="chips">${held.map(cityChip).join('')}</div>` : ''}
      ${lost.length ? `<div class="row-label bad">🏳️ شهرهای ما در دست دشمن</div><div class="chips">${lost.map(cityChip).join('')}</div>` : ''}
      ${active ? `<div class="row-label">🔥 نبردهای جاری (روی هر کدام بزنید تا گزارش را ببینید)</div><div class="battle-list">${active}</div>` : '<p class="muted small">الان نبردی در جریان نیست. برای حمله روی نیروهای مستقر در مرز بزنید و شهر هدف را انتخاب کنید.</p>'}
      ${recent ? `<details><summary>نبردهای اخیر</summary><div class="battle-list">${recent}</div></details>` : ''}
      <div class="row-label">🕊️ پیشنهاد صلح</div>
      <div class="gov-decrees">${terms}</div>
    </section>`;
  }

  function noWarHtml(st, pid) {
    const c = st.countries[pid];
    const myVal = W.armyValue(c);
    const list = [...new Set([...c.neighbors, ...c.seaNeighbors])].filter(id => st.countries[id] && !st.countries[id].annexedBy)
      .map(id => ({ id, rel: E.getRelation(st, pid, id), ratio: myVal / Math.max(W.armyValue(st.countries[id], 'def'), 1) }))
      .sort((a, b) => a.rel - b.rel).slice(0, 8);
    return `<section class="card"><h3>در صلح هستیم</h3>
      <p>برای جنگ: ۱) نیروی زمینی را به مرز کشور هدف بفرستید (⚔️ ارتش ← روی نیرو بزنید ← «مرز ...»)،
        ۲) اعلان جنگ بدهید (همین‌جا یا در پنل آن کشور)، ۳) روی نیروی مستقر در مرز بزنید و شهر هدف را انتخاب کنید.</p>
      <p class="muted small">حمله بدون «بهانه‌ی موجه» (رابطه‌ی بدتر از ۶۰-، یا حمله‌ی قبلی هدف به ما یا متحدمان) روابط با همه را خراب می‌کند، تحریم می‌آورد و ثبات را کم می‌کند.</p>
    </section>
    <section class="card"><h3>همسایه‌ها</h3>
      <div class="battle-list">${list.map(x => {
        const lab = F.relationLabel(x.rel);
        return `<div class="battle-row static"><span><button class="chip" data-goto="${x.id}">${name(st, x.id)}</button> <small class="${lab.cls}">${lab.text}</small></span>
          <small class="muted">قدرت ما ${x2(x.ratio)}</small><button class="btn tiny" data-declare="${x.id}">⚔️ اعلان جنگ</button></div>`;
      }).join('')}</div></section>`;
  }

  function body() {
    const { state: st, pid } = ctx;
    const list = W.warsOfCountry(st, pid);
    return list.length ? list.map(w => warCard(st, pid, w)).join('') : noWarHtml(st, pid);
  }

  function rerender() {
    const el = document.querySelector('.modal-body');
    if (!el || !el.querySelector('.war-card, [data-declare]') || !ctx) return;
    const top = el.scrollTop;
    el.innerHTML = body();
    el.scrollTop = top;
  }

  function onClick(e) {
    const t = e.target.closest('button');
    if (!t) return;
    const ds = t.dataset, st = ctx.state;
    if (ds.report) { openReport(st, ds.report); return; }
    if (ds.city) { SG.Modal.close(); ctx.onFocusCity(ds.city); return; }
    if (ds.goto) { SG.Modal.close(); ctx.onGoto(ds.goto); return; }
    if (ds.declare) { confirmDeclare(st, ctx.pid, ds.declare, ctx.onChange); return; }
    if (ds.peace) {
      const def = T()[ds.peace];
      if (!confirm(`صلح با شرط «${def.name}»؟`)) return;
      if (W.makePeace(st, ds.war, ds.peace, ctx.pid)) {
        SG.NotifyUI.simpleToast(`🕊️ صلح امضا شد: ${def.name}`, 'lvl-info');
        ctx.onChange();
        SG.Modal.open({ title: '🔥 جنگ', html: body(), onClick });
      }
    }
  }

  function open(state, pid, handlers) {
    ctx = { state, pid, ...handlers };
    SG.Modal.open({ title: '🔥 جنگ — ' + state.countries[pid].name, html: body(), onClick });
  }

  // -------------------------------------------------------------------
  // گزارش نبرد
  // -------------------------------------------------------------------
  function findReport(st, rid) {
    for (const w of st.warsInfo || []) { const b = w.battles.find(x => x.id === rid); if (b) return { b, w }; }
    return null;
  }

  function sideCol(st, s, title, isDef, pid) {
    const rows = (map, support) => Object.entries(map).map(([type, [n, lost]]) => `<tr>
        <td>${U()[type].icon} ${U()[type].short}</td><td>${qty(type, n)}</td>
        <td class="${lost > 0 ? 'bad' : 'muted'}">${support && ['ballistic', 'cruise', 'drone'].includes(type) ? 'شلیک: ' + F.num(Math.round(lost)) : lost > 0 ? '−' + qty(type, lost) : '—'}</td></tr>`).join('');
    const f = s.factors || {};
    const fac = (label, v, neutral = 1) => v === undefined ? '' : `<div class="b-row"><span>${label}</span><b class="${v > neutral + 0.01 ? 'good' : v < neutral - 0.01 ? 'bad' : ''}">${x2(v)}</b></div>`;
    return `<div class="rep-col ${s.owners.includes(pid) ? 'mine' : ''}">
      <div class="b-title">${title}: ${names(st, s.owners)}</div>
      <table class="mil-table"><tr><th>نیرو</th><th>تعداد</th><th>تلفات</th></tr>${rows(s.units)}${Object.keys(s.support).length ? `<tr><th colspan="3">پشتیبانی از دور</th></tr>${rows(s.support, true)}` : ''}</table>
      ${f.power !== undefined ? `<div class="factors">
        ${fac('کیفیت (فناوری)', f.quality)}
        ${fac('روحیه', 0.4 + 0.6 * f.morale / 100)}
        ${fac('تدارکات', 0.4 + 0.6 * f.supply / 100)}
        ${fac('برتری هوایی', f.air)}
        ${isDef ? fac('زمین و شهر', f.terrain) + fac('استحکامات', f.fort) : ''}
        ${fac('شانس', f.luck)}
        ${s.intercepted ? `<div class="b-row"><span>رهگیری موشک/پهپادِ این طرف</span><b class="bad">${pct(s.intercepted)}</b></div>` : ''}
        <div class="b-row"><span>قدرت زمینی + پشتیبانی</span><b>${F.num(Math.round(f.ground))} + ${F.num(Math.round(f.support))}</b></div>
        <div class="b-row total"><span>قدرت مؤثر</span><b>${F.num(Math.round(f.power))}</b></div>
      </div>` : ''}
    </div>`;
  }

  function openReport(st, rid) {
    const found = findReport(st, rid);
    if (!found) { SG.NotifyUI.simpleToast('این گزارش دیگر در دسترس نیست (جنگ تمام شده).', 'lvl-warning'); return; }
    const { b } = found;
    const pid = st.playerId;
    const weAtt = b.att.owners.includes(pid), weDef = b.def.owners.includes(pid);
    const won = b.result === 'att' ? weAtt : weDef;
    let banner;
    if (b.undefended) banner = `🏴 ${F.esc(b.cityName)} بی‌دفاع بود و بدون نبرد تصرف شد.`;
    else if (b.fell) banner = b.liberated ? `🎉 ${F.esc(b.cityName)} آزاد شد.` : `🏴 ${F.esc(b.cityName)} سقوط کرد و به دست ${name(st, b.newController)} افتاد.`;
    else banner = `${b.result === 'att' ? 'مهاجم' : 'مدافع'} این دور را برد (نسبت قدرت مهاجم به مدافع ${x2(b.ratio)}).` +
      (b.siegeNeeded ? ` محاصره: ${F.num(b.siege || 0)} از ${F.num(b.siegeNeeded)} دور پیروزی قاطع (بیش از ×۱٫۸) لازم است.` : '');
    // چرا؟ بزرگ‌ترین ضریب‌ها
    const why = [];
    const fa = b.att.factors || {}, fd = b.def.factors || {};
    if (fa.air > 1) why.push('برتری هوایی مهاجم'); if (fd.air > 1) why.push('برتری هوایی مدافع');
    if (fd.terrain >= 1.4) why.push('زمین و شهر به نفع مدافع'); if (fd.fort > 1.2) why.push('استحکامات مدافع');
    if (fa.supply < 60) why.push('تدارکات ضعیف مهاجم'); if (fd.morale < 40) why.push('روحیه‌ی فروریخته‌ی مدافع'); if (fa.morale < 40) why.push('روحیه‌ی پایین مهاجم');
    if (fa.quality - fd.quality > 0.12) why.push('فناوری بهتر مهاجم'); if (fd.quality - fa.quality > 0.12) why.push('فناوری بهتر مدافع');
    SG.Modal.open({
      title: `📋 نبرد ${b.cityName} — ${F.date(b.date)}`,
      html: `<div class="rep-banner ${weAtt || weDef ? (won ? 'good' : 'bad') : ''}">${banner}</div>
        ${why.length ? `<p class="small">عامل‌های مهم: ${why.join('، ')}.</p>` : ''}
        <div class="rep-cols">${sideCol(st, b.att, '⚔️ مهاجم', false, pid)}${sideCol(st, b.def, '🛡️ مدافع', true, pid)}</div>
        <p class="muted small">قدرت مؤثر = Σ(تعداد × قدرت × نقش حمله/دفاع × کیفیت × تجربه × روحیه × تدارکات × ضعف‌ها) × برتری هوایی × زمین و استحکامات (فقط مدافع) × شانس.
          بازنده ۱۰ تا ۲۰٪ تلفات و افت روحیه می‌دهد، برنده ۳ تا ۸٪. موشک و پهپادِ شلیک‌شده مصرف می‌شود؛ پدافند بخشی را رهگیری می‌کند.</p>
        <button class="btn" data-backwar>→ پنل جنگ</button>`,
      onClick: e => { if (e.target.closest('[data-backwar]') && ctx) open(ctx.state, ctx.pid, ctx); },
    });
  }

  // -------------------------------------------------------------------
  // اعلان جنگ
  // -------------------------------------------------------------------
  function confirmDeclare(st, pid, target, onDone) {
    const why = W.canDeclare(st, pid, target);
    if (why) {
      const txt = { already: 'همین حالا در جنگیم.', truce: 'آتش‌بس هنوز برقرار است (۲۴ ماه بعد از صلح).', puppet: 'این کشور دست‌نشانده‌ی ماست.', gone: 'این کشور دیگر وجود ندارد.', self: '' }[why];
      SG.NotifyUI.simpleToast(txt || 'ممکن نیست.', 'lvl-warning');
      return;
    }
    const p = W.predict(st, pid, target);
    const t = st.countries[target];
    const ratioTxt = p.ratio >= 2 ? '<b class="good">برتری قاطع</b>' : p.ratio >= 1.2 ? '<b class="good">برتری</b>' : p.ratio >= 0.8 ? '<b class="mid">برابر</b>' : '<b class="bad">ضعیف‌تریم</b>';
    const joiners = p.joiners.length ? p.joiners.slice(0, 10).map(j => `<span class="chip static">${name(st, j.id)} ${pct(j.chance * 100)}</span>`).join('') + (p.joiners.length > 10 ? ` <span class="muted">و ${F.num(p.joiners.length - 10)} کشور دیگر</span>` : '') : '<span class="muted">هیچ متحد نظامی ندارد</span>';
    SG.Modal.open({
      title: `⚔️ اعلان جنگ به ${t.name}؟`,
      html: `<section class="card"><h3>🧑‍💼 تحلیل مشاور</h3>
          <div class="b-row"><span>بهانه‌ی موجه</span><b class="${p.justified ? 'good' : 'bad'}">${p.justified ? 'دارد' : 'ندارد'}</b></div>
          <div class="b-row"><span>مقایسه‌ی قدرت (ما / آن‌ها با متحدان احتمالی)</span><b>${x2(p.ratio)} ${ratioTxt}</b></div>
          <div class="b-row"><span>زمین ${name(st, target)}</span><b>${F.TERRAIN[p.terrain] || ''} (مدافع ${x2(W.terrainFactor(st, t.cities[0].id))} در پایتخت)</b></div>
          <div class="b-row"><span>تعداد شهرها</span><b>${F.num(p.cities)}</b></div>
          <div class="b-row"><span>نیروی ما در مرزش</span><b class="${p.atBorder ? 'good' : 'bad'}">${p.atBorder ? F.num(p.atBorder) + ' دسته' : (p.neighbor ? 'هیچ — اول نیرو به مرز بفرستید' : 'مرز زمینی نداریم؛ فقط هوایی و موشکی')}</b></div>
        </section>
        <section class="card"><h3>واکنش جهان</h3>
          <div class="row-label">متحدانی که احتمالاً وارد جنگ می‌شوند</div><div class="chips">${joiners}</div>
          ${p.expelled.length ? `<p class="bad small">⚠️ چون هم‌پیمان ماست، از ${p.expelled.map(id => F.esc(st.alliances.find(a => a.id === id)?.name || id)).join('، ')} اخراج می‌شویم.</p>` : ''}
          <div class="b-row"><span>افت رابطه با همه‌ی کشورها</span><b class="bad">−${F.num(p.relDrop)} (دوستانش −${F.num(p.relDrop + 15)})</b></div>
          <div class="b-row"><span>کشورهایی که ممکن است تحریم کنند</span><b class="${p.sanctionRisk.length ? 'bad' : ''}">${F.num(p.sanctionRisk.length)}</b></div>
          ${p.stabilityHit ? `<div class="b-row"><span>ثبات داخلی</span><b class="bad">−${F.num(p.stabilityHit)} فوری، −۳ تا ۶ ماه</b></div>` : ''}
          <p class="muted small">جنگ هر ماه «خستگی جنگ» می‌آورد (ثبات کمتر، تورم بیشتر). هر شهر معمولاً ۱ تا ۳ نوبت مقاومت می‌کند و پایتخت ۳ نوبت.</p>
        </section>
        <div class="crit-actions"><button class="btn danger big" data-yes>⚔️ اعلان جنگ</button><button class="btn ghost" data-no>انصراف</button></div>`,
      onClick: e => {
        if (e.target.closest('[data-no]')) { SG.Modal.close(); return; }
        if (!e.target.closest('[data-yes]')) return;
        const rng = SG.Rng.create(st.rngState);
        W.declare(st, pid, target, rng);
        st.rngState = rng.getState();
        SG.Modal.close();
        onDone && onDone(true);
      },
    });
  }

  // -------------------------------------------------------------------
  // اطلاعات نیروی دشمن (کلیک روی نشان دشمن روی نقشه)
  // -------------------------------------------------------------------
  function enemyInfo(st, pid, stackId) {
    let found = null;
    for (const x of W.enemyStacks(st, pid)) if (x.s.id === stackId) found = x;
    if (!found) return;
    const s = found.s;
    const where = s.move ? `در حرکت به ${F.esc(SG.Military.locName(st, s.move.dest))} (${F.num(s.move.left)} ماه)` : F.esc(SG.Military.locName(st, s.loc));
    const here = W.enemyStacks(st, pid).filter(x => !x.s.move && !s.move && x.s.loc.kind === s.loc.kind && (x.s.loc.city || x.s.loc.target) === (s.loc.city || s.loc.target));
    const rows = (here.length ? here : [found]).map(x => `<tr><td>${U()[x.s.type].icon} ${U()[x.s.type].name}</td><td>${qty(x.s.type, x.s.count)}</td><td>${name(st, x.owner)}</td>
      <td>${F.num(Math.round(x.s.morale ?? 75))}</td></tr>`).join('');
    const intel = s.loc.kind === 'city' && !s.move ? W.cityIntel(st, pid, s.loc.city) : null;
    SG.Modal.open({
      title: '🕵️ نیروی دشمن',
      html: `<p>📍 ${where}</p>
        <table class="mil-table"><tr><th>نیرو</th><th>تعداد</th><th>کشور</th><th>روحیه</th></tr>${rows}</table>
        ${intel && intel.value ? `<p class="small">قدرت دفاعی برآوردشده‌ی این شهر: <b>${F.num(Math.round(intel.value))}</b> (با زمین ${x2(intel.terrain)} و استحکامات ${x2(intel.fort)}).
          برای حمله، نیرویی با قدرت حمله‌ی حداقل ۱٫۸ برابر بفرستید.</p>` : ''}`,
    });
  }

  SG.WarPanel = { open, refresh: rerender, openReport, confirmDeclare, enemyInfo };
})(window.SG = window.SG || {});

// =====================================================================
// پنل «جنگ»، گزارش ماهانه‌ی جبهه، پنجره‌ی اعلان جنگ/اولتیماتوم و اطلاعات نیروی دشمن
// ---------------------------------------------------------------------
// پنل جنگ برای هر جنگ: درصد خاک گرفته‌شده/از دست‌رفته، پدافند دو طرف، قدرت جبهه،
//   «دستور جنگ» (فقط زمینی یا ترکیبی، شدت شلیک موشک/پهپاد، اجازه‌ی قاره‌پیما)،
//   آخرین گزارش ماهانه و پیشنهاد صلح.
// اعلان جنگ: تحلیل مشاور ← اولتیماتوم ← هدف می‌جنگد یا پول پیشنهاد می‌دهد ← پذیرفتن یا حمله.
// =====================================================================
(function (SG) {
  'use strict';
  const F = SG.Fmt, E = SG.Engine, W = SG.War;
  const U = () => window.SG_DATA.units;
  const T = () => window.SG_DATA.peaceTerms;

  let ctx = null;   // { state, pid, onChange, onFocus, onGoto }

  const name = (st, id) => F.esc(st.countries[id]?.name || id);
  const names = (st, ids) => ids.map(id => name(st, id)).join('، ');
  const pct = v => F.num(Math.round(v)) + '٪';
  const pct1 = v => F.num(Math.round(v * 1000) / 10) + '٪';
  const x2 = v => '×' + F.num(Math.round(v * 100) / 100, 2);
  const qty = (type, n) => {
    const d = U()[type];
    const v = d.counted === 'unit' ? Math.round(n * 10) / 10 : Math.round(n);
    return `${F.num(v)} ${d.unitWord}`;
  };
  const otherSide = s => (s === 'A' ? 'B' : 'A');

  function scoreBar(score) {
    const half = Math.abs(score) / 2;
    const style = score >= 0 ? `right:50%;width:${half}%` : `left:50%;width:${half}%`;
    return `<div class="relbar ${score >= 0 ? 'pos' : 'neg'}"><span style="${style}"></span></div>`;
  }
  function bar(v, cls) { return `<div class="bar ${cls}"><span style="width:${Math.max(0, Math.min(100, v))}%"></span></div>`; }

  /** پیشنهاد ارتش (درخواست کاربر): اول پدافند، بعد بمباران و هم‌زمان حمله‌ی زمینی */
  function advice(st, war, side) {
    const es = otherSide(side);
    const enemyAd = W.sumN(W.sideEngaged(st, war, es, 'ad'));
    const air = W.sideEngaged(st, war, side, 'air');
    const strikeAd = air.reduce((s, e) => s + e.n * (U()[e.type].strike?.ad || 0) * (e.type === 'missile' || e.type === 'drone' ? (war.salvo[side] || 0.1) : e.type === 'icbm' ? 0 : 0.4), 0);
    if (!air.length) return '🎖️ پیشنهاد ارتش: هیچ هواپیما، پهپاد یا موشکی در برد دشمن نداریم. یا آن‌ها را به شهرهای نزدیک‌تر ببرید، یا فقط حمله‌ی زمینی (کند) ممکن است.';
    const months = strikeAd > 0 ? Math.ceil(enemyAd / strikeAd) : Infinity;
    return `🎖️ پیشنهاد ارتش: اول با موشک، پهپاد و جنگنده پدافند دشمن (${F.num(Math.round(enemyAd))} آتشبار) را نابود کنیم — با شدت فعلی حدود
      <b>${months === Infinity ? 'نامعلوم' : F.num(Math.max(1, months)) + ' ماه'}</b> — بعد روی نیروی زمینی‌اش بمب و موشک بریزیم و هم‌زمان پیاده‌نظام، زرهی و توپخانه حمله کنند.
      این‌طور پیشروی تا دو برابر سریع‌تر است. حمله‌ی فقط زمینی ارزان‌تر ولی کند است.`;
  }

  // -------------------------------------------------------------------
  // پنل جنگ
  // -------------------------------------------------------------------
  function warCard(st, pid, war) {
    const side = W.sideOf(war, pid), es = otherSide(side);
    const enemy = war.leaders[es];
    const sc = W.scoreFor(st, war, pid);
    const me = st.countries[pid], en = st.countries[enemy];
    const months = st.turn - war.startTurn;
    const lostFrac = id => (war.lost[id] || 0) / Math.max(war.base[id] || 1, 1) * 100;
    const leader = war.leaders[side] === pid;
    const takenByUs = W.occupied(war, es), takenByThem = W.occupied(war, side);
    const capAt = war.land ? W.capitalAt(st, enemy, war.leaders[side]) : null;
    const adEnemy = W.sumN(W.sideEngaged(st, war, es, 'ad')), adMine = W.sumN(W.sideEngaged(st, war, side, 'ad'));
    const gMine = W.groundPower(W.sideEngaged(st, war, side, 'ground'), 'att');
    const gEnemy = W.groundPower(W.sideEngaged(st, war, es, 'ground'), 'def');
    const last = war.log[war.log.length - 1];
    const hasIcbm = (me.forces.icbm || 0) > 0;
    const plan = war.plan[side];

    const terms = W.peaceTerms(st, war, pid).map(t => {
      const def = T()[t.term];
      const extra = t.term === 'cede' && t.pct ? ` (${pct1(t.pct)} خاک)` : t.term === 'pay' && t.amount ? ` (${F.money(t.amount)})` : '';
      const why = t.ok ? 'می‌پذیرد' : { score: 'امتیاز جنگ کافی نیست', need_surrender: 'دشمن هنوز تسلیم نیست (پایتخت، ۶۰٪ خاک یا فروپاشی ارتش)', no_land: 'مرز زمینی نداریم', no_land_taken: 'خاکی نگرفته‌ایم', not_leader: 'فقط رهبر جبهه', no_money: 'پولی ندارد' }[t.reason] || 'نمی‌پذیرد';
      return `<button class="decree ${t.ok ? '' : 'off'}" data-peace="${t.term}" data-war="${war.id}" ${t.ok ? '' : 'disabled'}>
        <span class="d-icon">${def.icon}</span><span class="d-main"><b>${def.name}${extra}</b><small>${def.desc}</small></span>
        <span class="d-cost ${t.ok ? 'good' : 'bad'}">${why}</span></button>`;
    }).join('');

    return `<section class="card war-card">
      <h3>⚔️ ${name(st, war.leaders[side])} در برابر ${name(st, enemy)}</h3>
      <div class="muted small">${months ? F.num(months) + ' ماه جنگ' : 'همین ماه شروع شد'} | ${war.justified ? 'با بهانه‌ی موجه' : '<span class="bad">بدون بهانه‌ی موجه</span>'}${war.scenario ? ' | از قبل در جریان' : ''}</div>
      ${war.sides[side].length > 1 ? `<div class="row-label">جبهه‌ی ما</div><div class="chips">${war.sides[side].map(id => `<button class="chip" data-goto="${id}">${name(st, id)}</button>`).join('')}</div>` : ''}
      <div class="row-label">دشمن</div><div class="chips">${war.sides[es].map(id => `<button class="chip danger" data-goto="${id}">${name(st, id)}</button>`).join('')}</div>

      ${war.land ? `<div class="front-box">
        <div class="front-line"><span>🏴 خاک ${name(st, enemy)} در دست ما</span><b class="good">${pct1(takenByUs)}</b></div>
        <div class="bar good front-bar"><span style="width:${takenByUs * 100}%"></span><i style="right:${capAt * 100}%" title="پایتخت"></i></div>
        <div class="muted small">★ پایتخت دشمن در ${pct(capAt * 100)} پیشروی سقوط می‌کند${war.capFallen[es] ? ' — <b class="good">سقوط کرده</b>' : ''}</div>
        ${takenByThem > 0.001 ? `<div class="front-line"><span>🏳️ خاک ما در دست دشمن</span><b class="bad">${pct1(takenByThem)}</b></div>${bar(takenByThem * 100, 'bad')}` : ''}
        <div class="front-line"><span>قدرت حمله‌ی جبهه‌ی ما</span><b class="${gMine >= gEnemy ? 'good' : 'bad'}">${F.num(Math.round(gMine))}</b></div>
        <div class="front-line"><span>قدرت دفاع دشمن در جبهه (بدون زمین و استحکامات)</span><b>${F.num(Math.round(gEnemy))}</b></div>
        ${gMine < 1 ? '<p class="bad small">⚠️ در مرز دشمن نیروی زمینی نداریم! پیاده، زرهی و توپخانه را به «مرز» او بفرستید.</p>' : ''}
      </div>` : '<p class="small">مرز زمینی نداریم: خاک جابه‌جا نمی‌شود؛ فقط جنگ هوایی و موشکی برای فشار و صلح.</p>'}

      <div class="war-grid">
        <div><span>📡 پدافند ${name(st, enemy)}</span>${bar(war.adStart[es] ? adEnemy / war.adStart[es] * 100 : 0, 'mid')}<b>${F.num(Math.round(adEnemy))} از ${F.num(Math.round(war.adStart[es] || 0))}</b></div>
        <div><span>📡 پدافند ما</span>${bar(war.adStart[side] ? adMine / war.adStart[side] * 100 : 0, adMine < (war.adStart[side] || 0) / 2 ? 'bad' : 'good')}<b>${F.num(Math.round(adMine))} از ${F.num(Math.round(war.adStart[side] || 0))}</b></div>
        <div><span>خستگی جنگ ما</span>${bar(me.warWeariness || 0, (me.warWeariness || 0) > 50 ? 'bad' : 'mid')}<b>${pct(me.warWeariness || 0)}</b></div>
        <div><span>خستگی ${name(st, enemy)}</span>${bar(en.warWeariness || 0, 'mid')}<b>${pct(en.warWeariness || 0)}</b></div>
        <div><span>تلفات ما (از کل ارتش)</span>${bar(lostFrac(pid), 'bad')}<b>${pct(lostFrac(pid))}</b></div>
        <div><span>تلفات ${name(st, enemy)}</span>${bar(lostFrac(enemy), 'good')}<b>${pct(lostFrac(enemy))}</b></div>
      </div>
      <div class="stat-line"><span>امتیاز جنگ</span><b class="${sc >= 0 ? 'good' : 'bad'}">${sc >= 0 ? '+' : '−'}${F.num(Math.abs(sc))}</b>
        <small class="muted">${sc >= 50 ? 'پیروزی نزدیک است' : sc >= 20 ? 'به نفع ما' : sc > -20 ? 'برابر' : sc > -50 ? 'به ضرر ما' : 'در حال شکست'}</small></div>
      ${scoreBar(sc)}

      ${leader ? `<div class="row-label">🎖️ دستور جنگ</div>
      <p class="small advice">${advice(st, war, side)}</p>
      <div class="plan-btns">
        <button class="plan ${plan === 'ground' ? 'on' : ''}" data-plan="ground" data-war="${war.id}"><b>🪖 فقط حمله‌ی زمینی</b><small>پیاده، زرهی و توپخانه. موشک و هواپیما ذخیره می‌مانند. کند: حداکثر ${F.num(4)}٪ خاک در ماه.</small></button>
        <button class="plan ${plan === 'combined' ? 'on' : ''}" data-plan="combined" data-war="${war.id}"><b>🚀 اول پدافند، بعد بمباران + حمله‌ی زمینی</b><small>موشک، پهپاد، جنگنده و بمب‌افکن اول پدافند را می‌زنند، بعد نیروی زمینی دشمن را. سریع: تا ${F.num(8)}٪ در ماه. پرهزینه.</small></button>
      </div>
      ${plan === 'combined' ? `<div class="row-label">شدت شلیک موشک و پهپاد (از انبارِ در برد، هر ماه)</div>
        <div class="seg salvo">${W.SALVO.map((v, i) => `<button class="${war.salvo[side] === v ? 'on' : ''}" data-salvo="${v}" data-war="${war.id}">${['کم', 'متوسط', 'سنگین'][i]} ${pct(v * 100)}</button>`).join('')}</div>
        ${hasIcbm ? `<label class="switch-row"><input type="checkbox" data-icbm="${war.id}" ${war.icbm[side] ? 'checked' : ''}> ☄️ اجازه‌ی شلیک موشک قاره‌پیما (${F.num(me.forces.icbm)} فروند) — ویرانگر، ولی روابط جهانی را خراب می‌کند</label>` : ''}` : ''}` : ''}

      ${last ? `<button class="battle-row" data-report="${last.id}"><span>📋 گزارش ${F.date(last.date)}</span><small class="muted">${reportSummary(st, war, last, side)}</small></button>` : ''}
      ${war.log.length > 1 ? `<details><summary>گزارش‌های قبلی</summary><div class="battle-list">${war.log.slice(0, -1).reverse().slice(0, 10).map(r =>
        `<button class="battle-row small" data-report="${r.id}"><span>${F.date(r.date)}</span><small class="muted">${reportSummary(st, war, r, side)}</small></button>`).join('')}</div></details>` : ''}
      <div class="row-label">🕊️ پیشنهاد صلح</div>
      <div class="gov-decrees">${terms}</div>
    </section>`;
  }

  function reportSummary(st, war, r, side) {
    const es = otherSide(side);
    const parts = [];
    if (r.advance) parts.push(r.advance.side === side ? `<span class="good">+${pct1(r.advance.pct)} پیشروی</span>` : `<span class="bad">−${pct1(r.advance.pct)} خاک از دست رفت</span>`);
    else if (r.liberated) parts.push(r.liberated.side === side ? `<span class="good">${pct1(r.liberated.pct)} آزاد شد</span>` : `<span class="bad">دشمن ${pct1(r.liberated.pct)} پس گرفت</span>`);
    else if (r.ground) parts.push('بن‌بست');
    const a = r.air[side];
    if (a && a.active) parts.push(`🎯 ${F.num(Math.round(a.adKilled * 10) / 10)} پدافند زدیم`);
    const b = r.air[es];
    if (b && b.active) parts.push(`دشمن ${F.num(Math.round(b.adKilled * 10) / 10)} پدافند ما را زد`);
    return parts.join(' | ') || '—';
  }

  function noWarHtml(st, pid) {
    const c = st.countries[pid];
    const myVal = W.armyValue(c);
    const list = [...new Set([...c.neighbors, ...c.seaNeighbors])].filter(id => st.countries[id] && !st.countries[id].annexedBy)
      .map(id => ({ id, rel: E.getRelation(st, pid, id), ratio: myVal / Math.max(W.armyValue(st.countries[id], 'def'), 1) }))
      .sort((a, b) => a.rel - b.rel).slice(0, 8);
    return `<section class="card"><h3>در صلح هستیم</h3>
      <p>برای جنگ: ۱) نیروی زمینی را به مرز کشور هدف بفرستید، ۲) روی آن کشور بزنید ← «⚔️ اعلان جنگ».
        کشور هدف ممکن است برای جلوگیری از جنگ پول پیشنهاد کند؛ می‌توانید بپذیرید یا حمله کنید.</p>
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
    const t = e.target.closest('button, input[data-icbm]');
    if (!t) return;
    const ds = t.dataset, st = ctx.state;
    if (ds.report) { openReport(st, ds.report); return; }
    if (ds.goto) { SG.Modal.close(); ctx.onGoto(ds.goto); return; }
    if (ds.declare) { confirmDeclare(st, ctx.pid, ds.declare, ctx.onChange); return; }
    if (ds.plan) { W.setOrders(st, ds.war, ctx.pid, { plan: ds.plan }); ctx.onChange(); rerender(); return; }
    if (ds.salvo) { W.setOrders(st, ds.war, ctx.pid, { salvo: +ds.salvo }); ctx.onChange(); rerender(); return; }
    if (ds.icbm) { W.setOrders(st, ds.icbm, ctx.pid, { icbm: t.checked }); ctx.onChange(); return; }
    if (ds.peace) {
      const def = T()[ds.peace];
      if (!confirm(`صلح با شرط «${def.name}»؟`)) return;
      if (W.makePeace(st, ds.war, ds.peace, ctx.pid)) {
        SG.NotifyUI.simpleToast(`🕊️ ${def.name}`, 'lvl-info');
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
  // گزارش ماهانه‌ی جبهه
  // -------------------------------------------------------------------
  function findReport(st, rid) {
    for (const w of st.warsInfo || []) { const r = w.log.find(x => x.id === rid); if (r) return { r, w }; }
    return null;
  }

  function airCol(st, a, title) {
    if (!a || !a.active) return `<div class="rep-col"><div class="b-title">${title}</div><p class="muted small">حمله‌ی هوایی نکرد (نقشه‌ی فقط زمینی یا سلاحی در برد نبود).</p></div>`;
    const rows = Object.entries(a.fired).map(([t, n]) => `<tr><td>${U()[t].icon} ${U()[t].short}</td><td>${F.num(n)}</td><td class="${a.lost[t] ? 'bad' : 'muted'}">${['missile', 'drone', 'icbm'].includes(t) ? 'مصرف شد' : a.lost[t] ? '−' + F.num(a.lost[t]) + ' سرنگون' : '—'}</td></tr>`).join('');
    return `<div class="rep-col"><div class="b-title">${title}</div>
      <table class="mil-table"><tr><th>سلاح</th><th>پرواز/شلیک</th><th>نتیجه</th></tr>${rows}</table>
      <div class="factors">
        <div class="b-row"><span>رهگیری موشک‌ها</span><b>${pct(a.interceptM || 0)}</b></div>
        <div class="b-row"><span>رهگیری هواپیما و پهپاد</span><b>${pct(a.interceptA || 0)}</b></div>
        <div class="b-row"><span>📡 پدافند نابودشده</span><b class="good">${F.num(Math.round(a.adKilled * 10) / 10)}</b></div>
        <div class="b-row"><span>پدافند باقی‌مانده‌ی هدف</span><b>${F.num(Math.round(a.enemyAdAfter))}</b></div>
        <div class="b-row"><span>ضربه به نیروی زمینی (قدرت)</span><b>${F.num(Math.round(a.groundDmg))}</b></div>
      </div></div>`;
  }

  function groundCol(st, g, title, side, rep) {
    if (!g) return '';
    const rows = Object.entries(g.units).map(([t, [n, l]]) => `<tr><td>${U()[t].icon} ${U()[t].short}</td><td>${qty(t, n)}</td><td class="${l > 0 ? 'bad' : 'muted'}">${l > 0 ? '−' + qty(t, l) : '—'}</td></tr>`).join('');
    return `<div class="rep-col"><div class="b-title">${title}: ${names(st, g.owners) || '—'}</div>
      ${rows ? `<table class="mil-table"><tr><th>نیرو</th><th>در جبهه</th><th>تلفات</th></tr>${rows}</table>` : '<p class="bad small">در جبهه نیروی زمینی نداشت.</p>'}
      <div class="factors">
        <div class="b-row"><span>قدرت حمله</span><b>${F.num(Math.round(g.att))}</b></div>
        <div class="b-row"><span>قدرت دفاع (با زمین${rep.ground.fort > 1 ? ' و استحکامات' : ''})</span><b>${F.num(Math.round(g.def))}</b></div>
        ${g.cas ? '<div class="b-row"><span>پشتیبانی هوایی نزدیک</span><b class="good">×۱٫۳</b></div>' : ''}
        <div class="b-row"><span>شانس</span><b>${x2(rep.ground.luck[side])}</b></div>
      </div></div>`;
  }

  function openReport(st, rid) {
    const found = findReport(st, rid);
    if (!found) { SG.NotifyUI.simpleToast('این گزارش دیگر در دسترس نیست (جنگ تمام شده).', 'lvl-warning'); return; }
    const { r, w } = found;
    const pid = st.playerId;
    const side = W.sideOf(w, pid) || 'A', es = otherSide(side);
    let banner;
    if (r.advance) banner = r.advance.side === side ? `🏴 ${pct1(r.advance.pct)} از خاک ${name(st, w.leaders[es])} گرفته شد.` : `🏳️ دشمن ${pct1(r.advance.pct)} از خاک ما را گرفت.`;
    else if (r.liberated) banner = r.liberated.side === side ? `🎉 ${pct1(r.liberated.pct)} از خاک ما آزاد شد.` : `دشمن ${pct1(r.liberated.pct)} از خاکی را که گرفته بودیم پس گرفت.`;
    else if (r.ground) banner = 'بن‌بست: هیچ طرف به‌اندازه‌ی کافی قوی نبود که پیش برود.';
    else banner = 'فقط جنگ هوایی (مرز زمینی نداریم).';
    const good = (r.advance && r.advance.side === side) || (r.liberated && r.liberated.side === side);
    const g = r.ground;
    SG.Modal.open({
      title: `📋 جبهه‌ی ${st.countries[w.leaders[es]].name} — ${F.date(r.date)}`,
      html: `<div class="rep-banner ${good ? 'good' : r.advance || r.liberated ? 'bad' : ''}">${banner}
          ${w.land ? `<div class="small">خاک دشمن در دست ما: <b>${pct1(W.occupied(w, es))}</b> | خاک ما در دست دشمن: <b>${pct1(W.occupied(w, side))}</b></div>` : ''}</div>
        <h3>🚀 جنگ هوایی</h3>
        <div class="rep-cols">${airCol(st, r.air[side], 'حمله‌ی ما')}${airCol(st, r.air[es], 'حمله‌ی دشمن')}</div>
        ${g ? `<h3>🪖 جبهه‌ی زمینی</h3>
          <p class="small">نسبت قدرت حمله‌ی ما به دفاع دشمن: <b>${x2(side === 'A' ? g.r1 : g.r2)}</b> | دشمن به ما: <b>${x2(side === 'A' ? g.r2 : g.r1)}</b>. بیش از ۱ یعنی پیشروی.</p>
          <div class="rep-cols">${groundCol(st, g[side], 'ما', side, r)}${groundCol(st, g[es], 'دشمن', es, r)}</div>` : ''}
        <p class="muted small">هر آتشبار پدافند در ماه ۵ جنگنده، ۳ بمب‌افکن، ۸۰ پهپاد، ۴۰ موشک یا ۱ قاره‌پیما را می‌زند. ضربه‌ای که رد شود اول پدافند را نابود می‌کند و وقتی پدافند نماند، نیروی زمینی را.
          جبهه: قدرت = تعداد × قدرت × نقش × کیفیت × روحیه × تدارکات؛ مدافع × زمین و استحکامات؛ بازنده ۵ تا ۱۰٪ تلفات ماهانه، برنده ۱٫۵ تا ۲٫۵٪.</p>
        <button class="btn" data-backwar>→ پنل جنگ</button>`,
      onClick: e => { if (e.target.closest('[data-backwar]') && ctx) open(ctx.state, ctx.pid, ctx); },
    });
  }

  // -------------------------------------------------------------------
  // اعلان جنگ ← اولتیماتوم
  // -------------------------------------------------------------------
  function confirmDeclare(st, pid, target, onDone) {
    const why = W.canDeclare(st, pid, target);
    if (why) {
      const txt = { already: 'همین حالا در جنگیم.', truce: 'آتش‌بس هنوز برقرار است (۲۴ ماه بعد از صلح یا باج).', puppet: 'این کشور دست‌نشانده‌ی ماست.', gone: 'این کشور دیگر وجود ندارد.' }[why];
      SG.NotifyUI.simpleToast(txt || 'ممکن نیست.', 'lvl-warning');
      return;
    }
    const p = W.predict(st, pid, target);
    const t = st.countries[target];
    const ratioTxt = p.ratio >= 2 ? '<b class="good">برتری قاطع</b>' : p.ratio >= 1.2 ? '<b class="good">برتری</b>' : p.ratio >= 0.8 ? '<b class="mid">برابر</b>' : '<b class="bad">ضعیف‌تریم</b>';
    const joiners = p.joiners.length ? p.joiners.slice(0, 10).map(j => `<span class="chip static">${name(st, j.id)} ${pct(j.chance * 100)}</span>`).join('') + (p.joiners.length > 10 ? ` <span class="muted">و ${F.num(p.joiners.length - 10)} کشور دیگر</span>` : '') : '<span class="muted">هیچ متحد نظامی ندارد</span>';
    const adMonths = p.adKillPower > 0 ? Math.max(1, Math.ceil(p.theirAd / (p.adKillPower * 0.1))) : null;
    SG.Modal.open({
      title: `⚔️ اعلان جنگ به ${t.name}؟`,
      html: `<section class="card"><h3>🧑‍💼 تحلیل مشاور</h3>
          <div class="b-row"><span>بهانه‌ی موجه</span><b class="${p.justified ? 'good' : 'bad'}">${p.justified ? 'دارد' : 'ندارد'}</b></div>
          <div class="b-row"><span>مقایسه‌ی قدرت (ما / آن‌ها با متحدان احتمالی)</span><b>${x2(p.ratio)} ${ratioTxt}</b></div>
          <div class="b-row"><span>مرز زمینی</span><b class="${p.land ? 'good' : 'bad'}">${p.land ? 'دارد' : 'ندارد — فقط جنگ هوایی'}</b></div>
          ${p.land ? `<div class="b-row"><span>پایتختش در چند درصد پیشروی می‌افتد</span><b>${pct(p.capitalAt * 100)}</b></div>` : ''}
          <div class="b-row"><span>زمین / مساحت</span><b>${F.TERRAIN[p.terrain] || ''} | ${F.num(Math.round((p.area || 0) / 1000))} هزار کیلومتر مربع</b></div>
          <div class="b-row"><span>پدافند او</span><b>${F.num(p.theirAd)} آتشبار${adMonths ? ` (حدود ${F.num(adMonths)} ماه حمله‌ی هوایی برای نابودی)` : ''}</b></div>
          <div class="b-row"><span>نیروی ما در مرزش</span><b class="${p.atBorder ? 'good' : 'bad'}">${p.atBorder ? F.num(p.atBorder) + ' دسته' : (p.land ? 'هیچ — اول نیرو به مرز بفرستید' : '—')}</b></div>
        </section>
        <section class="card"><h3>واکنش جهان</h3>
          <div class="row-label">متحدانی که احتمالاً وارد جنگ می‌شوند</div><div class="chips">${joiners}</div>
          ${p.expelled.length ? `<p class="bad small">⚠️ چون هم‌پیمان ماست، از ${p.expelled.map(id => F.esc(st.alliances.find(a => a.id === id)?.name || id)).join('، ')} اخراج می‌شویم.</p>` : ''}
          <div class="b-row"><span>افت رابطه با همه‌ی کشورها</span><b class="bad">−${F.num(p.relDrop)} (دوستانش −${F.num(p.relDrop + 15)})</b></div>
          <div class="b-row"><span>کشورهایی که ممکن است تحریم کنند</span><b class="${p.sanctionRisk.length ? 'bad' : ''}">${F.num(p.sanctionRisk.length)}</b></div>
          ${p.stabilityHit ? `<div class="b-row"><span>ثبات داخلی</span><b class="bad">−${F.num(p.stabilityHit)} فوری، −۳ تا ۶ ماه</b></div>` : ''}
          <p class="muted small">اول اولتیماتوم داده می‌شود: اگر خیلی ضعیف‌تر باشد ممکن است برای جلوگیری از جنگ پول پیشنهاد کند.</p>
        </section>
        <div class="crit-actions"><button class="btn danger big" data-yes>⚔️ اولتیماتوم و اعلان جنگ</button><button class="btn ghost" data-no>انصراف</button></div>`,
      onClick: e => {
        if (e.target.closest('[data-no]')) { SG.Modal.close(); return; }
        if (!e.target.closest('[data-yes]')) return;
        const rng = SG.Rng.create(st.rngState);
        const u = W.ultimatum(st, pid, target, rng);
        st.rngState = rng.getState();
        if (u.pay) { showTribute(st, pid, target, u.amount, onDone); return; }
        doDeclare(st, pid, target, onDone, true);
      },
    });
  }

  function doDeclare(st, pid, target, onDone, refused) {
    const rng = SG.Rng.create(st.rngState);
    W.declare(st, pid, target, rng);
    st.rngState = rng.getState();
    SG.Modal.close();
    if (refused) SG.NotifyUI.simpleToast(`${F.esc(st.countries[target].name)} اولتیماتوم را رد کرد و آماده‌ی جنگ است.`, 'lvl-warning');
    onDone && onDone(true);
  }

  function showTribute(st, pid, target, amount, onDone) {
    const t = st.countries[target];
    SG.Modal.open({
      title: `💰 پیشنهاد ${t.name}`,
      html: `<section class="card"><p>${F.esc(t.name)} نمی‌خواهد بجنگد و پیشنهاد می‌کند <b>${F.money(amount)}</b> بپردازد تا جنگ نشود
          (از خزانه‌ی ${F.money(t.eco.treasury)} او).</p>
        <ul class="small">
          <li><b>پذیرفتن:</b> پول همین حالا به خزانه‌ی ما می‌آید. جنگی نمی‌شود، ولی رابطه با ${F.esc(t.name)} −۳۰ و با بقیه‌ی دنیا −۳ می‌شود و تا ۲۴ ماه نمی‌توانیم به او حمله کنیم.</li>
          <li><b>رد و حمله:</b> جنگ شروع می‌شود. اگر کل کشورش را فتح کنیم، همه‌ی پول، تجهیزات و مردمش مال ما می‌شود.</li>
        </ul></section>
        <div class="crit-actions"><button class="btn primary big" data-accept>💰 قبول پول</button><button class="btn danger" data-attack>⚔️ رد و حمله</button></div>`,
      onClick: e => {
        if (e.target.closest('[data-accept]')) {
          const got = W.acceptTribute(st, pid, target, amount);
          SG.Notify.add(st, { type: 'tribute_paid', level: 'info', category: 'diplomacy', speaker: 'foreign', focus: target, data: { country: target, amount: got } });
          SG.Modal.close();
          SG.NotifyUI.simpleToast(`💰 ${F.money(got)} از ${F.esc(t.name)} گرفتیم.`, 'lvl-info');
          onDone && onDone(false);
        } else if (e.target.closest('[data-attack]')) doDeclare(st, pid, target, onDone, false);
      },
    });
  }

  // -------------------------------------------------------------------
  // اطلاعات نیروی دشمن در جبهه (کلیک روی نشان دشمن روی نقشه)
  // -------------------------------------------------------------------
  function enemyInfo(st, pid, warId) {
    const f = W.enemyFronts(st, pid).find(x => x.war === warId);
    if (!f) return;
    const rows = Object.entries(f.units).map(([t, n]) => `<tr><td>${U()[t].icon} ${U()[t].name}</td><td>${qty(t, n)}</td></tr>`).join('');
    SG.Modal.open({
      title: `🕵️ نیروی ${st.countries[f.enemy].name}`,
      html: `<p class="small">نیروی زمینی که ${F.esc(st.countries[f.enemy].name)} (و متحدانش) در جبهه دارند، و کل پدافند هوایی‌اش:</p>
        <table class="mil-table"><tr><th>نیرو</th><th>تعداد</th></tr>${rows || '<tr><td colspan="2">—</td></tr>'}</table>
        <p class="small">قدرت دفاعی جبهه (بدون زمین): <b>${F.num(Math.round(f.power))}</b>. برای پیشروی، قدرت حمله‌ی جبهه‌ی ما باید بیشتر از قدرت دفاع او با زمین و استحکامات باشد.</p>
        <button class="btn" data-backwar>🔥 پنل جنگ</button>`,
      onClick: e => { if (e.target.closest('[data-backwar]') && ctx) open(ctx.state, ctx.pid, ctx); },
    });
  }

  SG.WarPanel = { open, refresh: rerender, openReport, confirmDeclare, enemyInfo, setCtx: c => { ctx = c; } };
})(window.SG = window.SG || {});

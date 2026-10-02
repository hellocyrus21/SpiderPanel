// =====================================================================
// پنل «🔬 درخت پیشرفت» (مرحله‌ی ۶)
// ---------------------------------------------------------------------
//   - تحقیق جاری (نوار پیشرفت، ماه‌های باقی، لغو با برگشت نصف پول)
//   - سه شاخه: اقتصاد، نظامی، دکترین — هر گره: هزینه، زمان، پیش‌نیاز، اثر
// منطق در SG.Tech است؛ اینجا فقط نمایش و دکمه.
// =====================================================================
(function (SG) {
  'use strict';
  const F = SG.Fmt;
  let ctx = null;          // { state, pid, onChange }
  let branch = 'economy';

  const STATUS = {
    done: '<span class="tag good">✅ تمام‌شده</span>',
    active: '<span class="tag mid">⏳ در حال تحقیق</span>',
    blocked: '<span class="tag muted">دکترین دیگری انتخاب شده</span>',
  };

  function nodeCard(st, c, n) {
    const T = SG.Tech;
    const s = T.statusOf(st, c, n);
    if (s === 'hidden') return '';
    const cost = T.costOf(st, c, n), months = T.monthsOf(st, c, n);
    const reqNames = (n.req || []).filter(r => !T.has(c, r)).map(r => T.node(r)?.name || r);
    let foot;
    if (s === 'ready') {
      const busy = !!c.research, poor = cost > c.eco.treasury;
      foot = `<div class="tn-meta">💰 ${F.money(cost)} · ⏱️ ${F.num(months)} ماه</div>
        <button class="btn tiny ${busy || poor ? '' : 'primary'}" data-start="${n.id}" ${busy || poor ? 'disabled' : ''}>${busy ? 'یک تحقیق در جریان است' : poor ? 'پول کافی نیست' : '🔬 شروع تحقیق'}</button>`;
    } else if (s === 'locked') {
      foot = `<div class="tn-meta">💰 ${F.money(cost)} · ⏱️ ${F.num(months)} ماه</div><div class="muted small">🔒 پیش‌نیاز: ${reqNames.map(F.esc).join('، ')}</div>`;
    } else foot = STATUS[s] || '';
    return `<div class="tech-node st-${s}">
      <div class="tn-head"><span class="tn-icon">${n.icon}</span><b>${F.esc(n.name)}</b></div>
      <div class="tn-desc small">${F.esc(n.desc)}</div>
      ${foot}
    </div>`;
  }

  function body() {
    const { state: st, pid } = ctx;
    const c = st.countries[pid], T = SG.Tech;
    const r = c.research, rn = r && T.node(r.id);
    const pressure = SG.Economy.sanctionPressure(st, pid);
    const branches = window.SG_DATA.techBranches;
    const list = T.nodes().filter(n => n.branch === branch);
    return `
      <section class="card">
        <h3>🔬 تحقیق جاری</h3>
        ${rn ? `<div class="stat-line"><span>${rn.icon} ${F.esc(rn.name)}</span><b>${F.num(r.left)} ماه مانده</b></div>
          <div class="bar mid"><span style="width:${Math.round((1 - r.left / r.total) * 100)}%"></span></div>
          <button class="btn tiny ghost" data-cancel>✖ لغو (نصف پول برمی‌گردد)</button>`
        : '<p class="muted">هیچ تحقیقی در جریان نیست — یکی را از پایین شروع کنید. هر بار فقط یک تحقیق ممکن است.</p>'}
        <p class="muted small">تمام‌شده: ${F.num(T.count(c))} از ${F.num(T.nodes().filter(n => T.statusOf(st, c, n) !== 'hidden').length)}.
          ${pressure > 0.05 ? `<span class="bad">تحریم‌ها تحقیق را ${F.num(Math.round(pressure * 100))}٪ کندتر کرده‌اند.</span>` : ''}
          هزینه‌ی هر تحقیق اول کار از خزانه پرداخت می‌شود.</p>
      </section>
      <div class="chips tech-tabs">${Object.entries(branches).map(([k, b]) =>
        `<button class="chip ${k === branch ? 'on' : ''}" data-branch="${k}">${b.icon} ${b.name}</button>`).join('')}</div>
      ${branch === 'doctrine' ? '<p class="muted small">دکترین شیوه‌ی جنگیدن ارتش است. فقط <b>یکی</b> را می‌شود انتخاب کرد.</p>' : ''}
      ${branch === 'military' ? `<p class="muted small">فناوری فعلی: ${['land', 'air', 'navy', 'missile', 'airDefense', 'drone', 'cyber'].map(b =>
        `${{ land: 'زمینی', air: 'هوایی', navy: 'دریایی', missile: 'موشکی', airDefense: 'پدافند', drone: 'پهپاد', cyber: 'سایبری' }[b]} ${F.num(Math.round(c.tech[b] || 0))}`).join(' · ')}</p>` : ''}
      <div class="tech-grid">${list.map(n => nodeCard(st, c, n)).join('')}</div>`;
  }

  function onClick(e) {
    const t = e.target.closest('button');
    if (!t || !ctx) return;
    const { state: st, pid } = ctx;
    if (t.dataset.branch) { branch = t.dataset.branch; rerender(); return; }
    if (t.dataset.start) {
      const err = SG.Tech.start(st, pid, t.dataset.start);
      SG.NotifyUI.simpleToast(err ? ({ busy: 'یک تحقیق در جریان است.', money: 'پول کافی نیست.', locked: 'پیش‌نیاز کامل نیست.' }[err]) : `🔬 تحقیق «${F.esc(SG.Tech.node(t.dataset.start).name)}» شروع شد.`, err ? 'lvl-warning' : 'lvl-info');
      ctx.onChange(); rerender(); return;
    }
    if (t.dataset.cancel !== undefined && confirm('تحقیق لغو شود؟ نصف پول برمی‌گردد.')) { SG.Tech.cancel(st, pid); ctx.onChange(); rerender(); }
  }

  function rerender() {
    const el = document.querySelector('.modal-body');
    if (!el || !el.querySelector('.tech-panel') || !ctx) return;
    const top = el.scrollTop;
    el.innerHTML = `<div class="tech-panel">${body()}</div>`;
    el.scrollTop = top;
  }

  function open(state, pid, onChange) {
    ctx = { state, pid, onChange };
    SG.Modal.open({ title: '🔬 درخت پیشرفت — ' + state.countries[pid].name, html: `<div class="tech-panel">${body()}</div>`, onClick });
  }

  SG.TechPanel = { open, refresh: rerender };
})(window.SG = window.SG || {});

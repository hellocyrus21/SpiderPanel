// =====================================================================
// پنل «🏆 اهداف و امتیاز» (مرحله‌ی ۶)
// ---------------------------------------------------------------------
//   - اهداف این بازی (پیشرفت هر کدام) و امتیاز فعلی (به تفکیک)
//   - دستاوردها (همه‌ی بازی‌ها، از پروفایل مرورگر)
//   - بهترین امتیازها
// =====================================================================
(function (SG) {
  'use strict';
  const F = SG.Fmt;
  let ctx = null;   // { state, pid }
  let tab = 'goals';

  const PARTS = { economy: '📈 رشد اقتصاد', stability: '⚖️ ثبات', conquest: '🏴 فتح و پیروزی', tech: '🔬 فناوری', diplomacy: '🌐 دیپلماسی', goals: '🎯 اهداف', time: '⏳ دوام' };

  function goalRow(st, g) {
    const G = SG.Goals, T = window.SG_DATA.goalTexts[g.id] || { icon: '•', name: g.id, desc: '' };
    const p = G.progress(st, g);
    const pct = Math.round(G.pctOf(p) * 100);
    const done = g.done !== null;
    let target = F.num(g.target);
    if (g.id === 'gdp') target = F.money(g.target);
    if (g.id === 'power') target = 'رتبه‌ی ' + F.num(g.target);
    let now;
    if (g.id === 'gdp') now = F.money(p.now);
    else if (g.id === 'power') now = 'رتبه‌ی ' + F.num(p.now);
    else if (g.id === 'stability') now = `${F.num(p.now)} از ۱۲ ماه (ثبات فعلی ${F.num(p.extra)})`;
    else if (g.id === 'energy') now = `تولید ${F.num(Math.round(p.now))} / مصرف ${F.num(Math.round(p.target))}`;
    else if (g.id === 'survive') now = `ماه ${F.num(p.now)} از ${F.num(p.target)}`;
    else now = `${F.num(p.now)} از ${F.num(p.target)}`;
    return `<div class="goal-row ${done ? 'done' : ''}">
      <div class="gr-head"><span>${T.icon} <b>${F.esc(T.name)}</b></span>${done ? `<span class="tag good">✅ ماه ${F.num(g.done)}</span>` : `<small class="muted">${F.num(pct)}٪</small>`}</div>
      <div class="muted small">${F.esc(T.desc.replace('{target}', target))}</div>
      ${done ? '' : `<div class="bar ${pct >= 70 ? 'good' : 'mid'}"><span style="width:${pct}%"></span></div><div class="small">${now}</div>`}
    </div>`;
  }

  function goalsTab() {
    const { state: st, pid } = ctx;
    const sc = SG.Goals.score(st);
    const c = st.countries[pid];
    const left = SG.Goals.TERM - st.turn;
    return `
      <section class="card score-card">
        <div class="score-big">${F.num(sc.total)}<small> امتیاز</small></div>
        <div class="muted small">${left > 0 ? `${F.num(left)} ماه تا پایان دوره‌ی ۱۰ ساله` : st.gameOver ? 'بازی تمام شد' : 'دوره‌ی ۱۰ ساله تمام شده؛ بازی آزاد'} ·
          ضریب سختی ×${F.num(Math.round(sc.mult * 100) / 100)} (${'★'.repeat(c.difficulty || 1)}${st.hard ? ' + حالت سخت' : ''})</div>
        <div class="score-parts">${Object.entries(sc.parts).map(([k, v]) => `<div><span>${PARTS[k]}</span><b class="${v < 0 ? 'bad' : ''}">${F.num(v)}</b></div>`).join('')}</div>
      </section>
      <section class="card"><h3>🎯 اهداف این دوره (${F.num(st.goals.filter(g => g.done !== null).length)} از ${F.num(st.goals.length)})</h3>
        <p class="muted small">هر هدف کامل‌شده +۲۵۰ امتیاز. اهداف از وضع شروع کشور شما ساخته شده‌اند.</p>
        ${st.goals.map(g => goalRow(st, g)).join('')}
      </section>`;
  }

  function achTab() {
    const prof = SG.Save.loadProfile();
    const st = ctx.state;
    const list = window.SG_DATA.achievements;
    const got = list.filter(a => prof.achievements[a.id] || (st.achieved || {})[a.id]).length;
    return `<section class="card"><h3>🏅 دستاوردها (${F.num(got)} از ${F.num(list.length)})</h3>
      <p class="muted small">دستاوردها بین همه‌ی بازی‌ها در همین مرورگر نگه داشته می‌شوند.</p>
      <div class="ach-grid">${list.map(a => {
        const p = prof.achievements[a.id], here = (st.achieved || {})[a.id] !== undefined;
        const on = p || here;
        return `<div class="ach ${on ? 'on' : ''}"><div class="ach-icon">${on ? a.icon : '🔒'}</div>
          <div><b>${F.esc(a.name)}</b><div class="muted small">${F.esc(a.desc)}</div>
          ${on ? `<div class="small good">${here ? 'در همین بازی' : F.esc(st.countries[p.country]?.name || p.country)}</div>` : ''}</div></div>`;
      }).join('')}</div></section>`;
  }

  function bestTab() {
    const prof = SG.Save.loadProfile();
    const R = { term: 'پایان دوره', collapse: 'فروپاشی', conquered: 'فتح شد', coup: 'کودتا' };
    return `<section class="card"><h3>🥇 بهترین امتیازها</h3>
      ${prof.best.length ? `<div class="battle-list">${prof.best.map((b, i) => `<div class="battle-row static">
        <span>${F.num(i + 1)}. <b>${F.esc(b.name)}</b> ${b.hard ? '🔥' : ''} <small class="muted">ماه ${F.num(b.turn)} · ${R[b.reason] || ''}</small></span><b>${F.num(b.score)}</b></div>`).join('')}</div>`
      : '<p class="muted">هنوز امتیازی ثبت نشده. امتیاز در پایان دوره‌ی ۱۰ ساله یا پایان بازی ثبت می‌شود.</p>'}
      <p class="muted small">🔥 حالت سخت بعد از تمام کردن یک دوره‌ی ۱۰ ساله باز می‌شود (در صفحه‌ی انتخاب کشور): رویدادهای بد بیشتر، هوش مصنوعی حساس‌تر، امتیاز ×۱.۵.</p>
    </section>`;
  }

  function body() {
    const tabs = { goals: '🎯 اهداف و امتیاز', ach: '🏅 دستاوردها', best: '🥇 بهترین‌ها' };
    return `<div class="chips tech-tabs">${Object.entries(tabs).map(([k, t]) => `<button class="chip ${k === tab ? 'on' : ''}" data-tab="${k}">${t}</button>`).join('')}</div>
      ${tab === 'goals' ? goalsTab() : tab === 'ach' ? achTab() : bestTab()}`;
  }

  function onClick(e) {
    const t = e.target.closest('[data-tab]');
    if (t) { tab = t.dataset.tab; const el = document.querySelector('.modal-body'); if (el) el.innerHTML = `<div class="goals-panel">${body()}</div>`; }
  }

  function open(state, pid, startTab) {
    ctx = { state, pid };
    if (startTab) tab = startTab;
    SG.Modal.open({ title: '🏆 اهداف و امتیاز', html: `<div class="goals-panel">${body()}</div>`, onClick });
  }

  SG.GoalsPanel = { open };
})(window.SG = window.SG || {});

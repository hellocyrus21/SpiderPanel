// =====================================================================
// نمایش اعلان‌ها: پیام کوتاه (toast)، پنجره‌ی بحرانی، صندوق اعلان‌ها، تنظیمات
// ---------------------------------------------------------------------
// موتور فقط داده می‌دهد؛ این فایل متن فارسی را از data/messages.js می‌سازد.
//   info     ← فقط در صندوق
//   warning  ← پیام کوتاه که خودش بعد از چند ثانیه می‌رود (موبایل: پایین صفحه، قابل کشیدن)
//   critical ← پنجره‌ای که بازی را متوقف می‌کند
// =====================================================================
(function (SG) {
  'use strict';
  const F = SG.Fmt;
  const D = () => window.SG_DATA;

  const MONEY_KEYS = ['amount', 'deficit', 'treasury', 'monthly'];
  const PCT_KEYS = ['inflation', 'growth', 'pct', 'debtPct', 'rate', 'gain'];
  const COUNTRY_KEYS = ['country', 'other', 'a', 'b'];

  let opts = null;          // { getState, onAction(actionId, notification), onFocus(countryId), onCritical() }
  let settings = { muted: {} };
  let criticalQueue = [];
  let filter = 'all';

  // -------------------------------------------------------------------
  // متن اعلان
  // -------------------------------------------------------------------
  function signedMoney(v) {
    return (v >= 0 ? '+' : '−') + F.money(Math.abs(v));
  }

  function fill(template, data, state) {
    return template.replace(/\{(\w+)\}/g, (m, key) => {
      const v = data[key];
      if (v === undefined) return m;
      if (COUNTRY_KEYS.includes(key)) return F.esc(state.countries[v]?.name || v);
      if (key === 'monthly') return signedMoney(v);
      if (MONEY_KEYS.includes(key)) return F.money(v);
      if (PCT_KEYS.includes(key)) return F.num(Math.round(v * 10) / 10);
      if (key === 'stability') return F.num(Math.round(v));
      if (key === 'unit') return F.esc(D().units[v]?.name || v);
      if (key === 'term') return F.esc(D().peaceTerms[v]?.name || v);
      if (key === 'goal') return F.esc(D().goalTexts?.[v]?.name || v);
      if (key === 'year') return new Intl.NumberFormat('fa-IR', { useGrouping: false }).format(v);
      if (typeof v === 'number') return F.num(v);
      return F.esc(v);
    });
  }

  // -------------------------------------------------------------------
  // رویدادهای تصادفی (مرحله‌ی ۶): متن و گزینه‌ها از data/events.js
  // -------------------------------------------------------------------
  const evOf = n => (D().events || []).find(e => e.id === n.data?.event);
  const sgn = v => (v >= 0 ? '+' : '−');
  const pct1 = v => F.num(Math.round(Math.abs(v) * 10) / 10);
  /** خلاصه‌ی اثر یک گزینه: «💰 −۳٫۷ میلیارد · ⚖️ +۶ ثبات» */
  function effectHint(state, id, ef) {
    const T = (turns) => turns ? ` (${F.num(turns)} ماه)` : '';
    return SG.Events.preview(state, id, ef).map(x => {
      switch (x.k) {
        case 'treasury': return `💰 ${sgn(x.v)}${F.money(Math.abs(x.v))}`;
        case 'stability': return `⚖️ ${sgn(x.v)}${F.num(Math.abs(x.v))} ثبات`;
        case 'gdp': return `📉 ${sgn(x.v)}${pct1(x.v)}٪ اقتصاد`;
        case 'inflation': return `🔥 ${sgn(x.v)}${pct1(x.v)} تورم`;
        case 'debt': return `💳 +${F.money(x.v)} بدهی`;
        case 'relation': return `🤝 ${sgn(x.v)}${F.num(Math.abs(x.v))} رابطه با همه`;
        case 'energy': return `🛢️ +${pct1(x.v)}٪ تولید انرژی`;
        case 'research': return `🔬 تحقیق ${F.num(x.v)} ماه جلو`;
        case 'mod:growth': return `📈 ${sgn(x.v)}${pct1(x.v * 100)}٪ رشد${T(x.turns)}`;
        case 'mod:stability': return `⚖️ ${sgn(x.v)}${F.num(Math.abs(x.v))} ثبات${T(x.turns)}`;
        case 'mod:taxEff': return `🧾 ${sgn(x.v)}${pct1(x.v * 100)}٪ کارایی مالیات${T(x.turns)}`;
        case 'mod:expense': return `🏛️ ${x.v > 0 ? 'هزینه‌ی دولت +' : 'صرفه‌جویی '}${pct1(x.v * 100)}٪ GDP${T(x.turns)}`;
        case 'mod:energyProd': return `🛢️ ${sgn(x.v)}${pct1(x.v * 100)}٪ تولید انرژی${T(x.turns)}`;
        case 'mod:inflation': return `🔥 ${sgn(x.v)}${pct1(x.v)} تورم${T(x.turns)}`;
        case 'coup': return `🎲 ${F.num(x.v)}٪ خطر سرنگونی`;
        case 'chain': return `⚠️ ${F.num(x.v)}٪ احتمال بدتر شدن`;
      }
      return '';
    }).filter(Boolean).join(' · ');
  }
  function eventDef(n) {
    const ev = evOf(n);
    if (!ev) return null;
    const state = opts.getState();
    const head = `<b>${ev.icon} ${F.esc(ev.title)}</b><br>`;
    const chose = n.data.chose !== undefined && ev.options[n.data.chose] ? `<div class="muted small">انتخاب: ${F.esc(ev.options[n.data.chose].label)}</div>` : '';
    const auto = ev.effects ? effectHint(state, n.data.country, ev.effects) : '';
    return {
      variants: ev.text.map(t => head + t + (auto ? `<div class="ev-auto small">${auto}</div>` : '') + chose),
      actions: n.data.info ? null : (ev.options || []).map((o, i) => ({ id: 'event:' + i, label: o.label, hint: effectHint(state, n.data.country, o.effects) })),
    };
  }
  function worldEventText(n, state) {
    const ev = evOf(n);
    if (!ev) return n.type;
    return `${ev.icon} ${F.esc(ev.title)} در ${F.esc(state.countries[n.data.country]?.name || '')}${n.data.coup ? ' — <b>دولت سرنگون شد!</b>' : '.'}`;
  }
  const defOf = n => n.type === 'event' ? eventDef(n) : D().messages[n.type];

  /** متن نهایی یک اعلان (انتخاب متن بر اساس شناسه، تا با هر بار نمایش عوض نشود) */
  function textOf(n) {
    const state = opts.getState();
    if (n.type === 'world_event') return worldEventText(n, state);
    const def = defOf(n);
    if (!def) return n.type;
    const list = n.count > 1 && def.plural ? def.plural : def.variants;
    const tpl = list[n.id % list.length];
    return fill(tpl, { ...n.data, count: n.count }, state);
  }

  function speakerOf(n) {
    const sp = D().speakers[n.speaker] || { title: '', icon: '•' };
    // فرمانده با نام خودش حرف می‌زند
    if (n.speaker === 'commander' && n.data && n.data.commander) return { ...sp, title: sp.title + ' — ' + n.data.commander };
    return sp;
  }

  function actionsOf(n) {
    const state = opts.getState();
    const def = defOf(n);
    if (!def || !def.actions || n.acted) return [];
    // دکمه‌ها فقط برای اعلان‌های تازه (اعلان‌های قدیمی ممکن است دیگر معنی نداشته باشند)
    if (n.turn < state.turn - 1 && !n.type.startsWith('game_over')) return [];
    // پیشنهاد صلح: فقط شرط‌هایی که طرف مقابل می‌پذیرد
    if (n.data && n.data.allowed) return def.actions.filter(a => !a.id.startsWith('peace:') || n.data.allowed.includes(a.id));
    return def.actions;
  }

  function actionButtons(n) {
    const state = opts.getState();
    return actionsOf(n).map(a => `<button class="btn ${a.id === 'dismiss' ? 'ghost' : ''} ${a.hint !== undefined ? 'opt' : ''}" data-act="${a.id}" data-nid="${n.id}">${fill(F.esc(a.label), n.data || {}, state)}${a.hint ? `<small class="opt-hint">${a.hint}</small>` : ''}</button>`).join('');
  }

  function findById(id) {
    return opts.getState().notifications.find(n => n.id === +id);
  }

  function isMuted(n) {
    return n.level !== 'critical' && settings.muted[n.category];
  }

  // -------------------------------------------------------------------
  // پیام کوتاه (toast)
  // -------------------------------------------------------------------
  const toastBox = () => document.getElementById('toasts');

  function toast(html, { nid = null, timeout = 6000, cls = '' } = {}) {
    const el = document.createElement('div');
    el.className = 'toast ' + cls;
    el.innerHTML = html;
    if (nid) el.dataset.nid = nid;
    toastBox().appendChild(el);
    // حداکثر ۳ پیام هم‌زمان
    while (toastBox().children.length > 3) toastBox().firstChild.remove();
    let timer = setTimeout(() => remove(el), timeout);
    el.addEventListener('mouseenter', () => clearTimeout(timer));
    el.addEventListener('mouseleave', () => { timer = setTimeout(() => remove(el), 2500); });
    // کشیدن برای بستن (موبایل)
    let x0 = null, dx = 0;
    el.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; dx = 0; el.style.transition = 'none'; }, { passive: true });
    el.addEventListener('touchmove', e => { if (x0 === null) return; dx = e.touches[0].clientX - x0; el.style.transform = `translateX(${dx}px)`; el.style.opacity = String(1 - Math.min(Math.abs(dx) / 200, 0.8)); }, { passive: true });
    el.addEventListener('touchend', () => {
      el.style.transition = '';
      if (Math.abs(dx) > 70) remove(el); else { el.style.transform = ''; el.style.opacity = ''; }
      x0 = null;
    });
    return el;
  }

  function remove(el) {
    el.classList.add('out');
    setTimeout(() => el.remove(), 250);
  }

  function notificationToast(n) {
    const sp = speakerOf(n);
    toast(`<div class="t-head">${sp.icon} <b>${sp.title}</b></div>
      <div class="t-text">${textOf(n)}</div>
      ${actionsOf(n).length ? `<div class="t-actions">${actionButtons(n)}</div>` : ''}`, { nid: n.id, cls: 'lvl-' + n.level });
  }

  /** پیام ساده (مثلاً «فرمان اجرا شد») */
  function simpleToast(text, cls = '') {
    toast(`<div class="t-text">${text}</div>`, { timeout: 3500, cls });
  }

  // -------------------------------------------------------------------
  // پنجره‌ی بحرانی
  // -------------------------------------------------------------------
  function showNextCritical() {
    const box = document.getElementById('critical');
    const n = criticalQueue[0];
    if (!n) { box.classList.add('hidden'); return; }
    const sp = speakerOf(n);
    box.querySelector('.crit-body').innerHTML = `
      <div class="crit-speaker">${sp.icon} ${sp.title}</div>
      <div class="crit-text">${textOf(n)}</div>
      <div class="crit-actions">${actionButtons(n) || `<button class="btn primary" data-act="dismiss" data-nid="${n.id}">متوجه شدم</button>`}</div>`;
    box.classList.remove('hidden');
    n.read = true;
    updateBell();
  }

  // -------------------------------------------------------------------
  // صندوق اعلان‌ها
  // -------------------------------------------------------------------
  function renderInbox() {
    const state = opts.getState();
    const cats = D().categories;
    const list = state.notifications.slice().reverse()
      .filter(n => filter === 'all' || n.category === filter);
    const html = `
      <div class="chips inbox-filter">
        <button class="chip ${filter === 'all' ? 'on' : ''}" data-filter="all">همه</button>
        ${Object.entries(cats).map(([k, t]) => `<button class="chip ${filter === k ? 'on' : ''}" data-filter="${k}">${t}</button>`).join('')}
      </div>
      <div class="inbox-list">
        ${list.length ? list.map(n => {
          const sp = speakerOf(n);
          return `<div class="inbox-item lvl-${n.level} ${n.read ? '' : 'unread'}" data-focus="${n.focus || ''}" data-nid="${n.id}">
            <div class="ii-head"><span>${sp.icon} ${sp.title}</span><span class="muted">${F.date(n.date)}</span></div>
            <div class="ii-text">${textOf(n)}</div>
            ${actionsOf(n).length ? `<div class="t-actions">${actionButtons(n)}</div>` : ''}
          </div>`;
        }).join('') : '<p class="muted">اعلانی نیست.</p>'}
      </div>`;
    return html;
  }

  function openInbox() {
    SG.Modal.open({ title: '🔔 صندوق اعلان‌ها', html: renderInbox(), onClick: inboxClick });
    // با باز شدن صندوق، همه خوانده‌شده حساب می‌شوند
    opts.getState().notifications.forEach(n => { n.read = true; });
    updateBell();
  }

  function inboxClick(e) {
    const f = e.target.closest('[data-filter]');
    if (f) { filter = f.dataset.filter; SG.Modal.open({ title: '🔔 صندوق اعلان‌ها', html: renderInbox(), onClick: inboxClick }); return; }
    if (e.target.closest('[data-act]')) return;   // دکمه‌ها جداگانه مدیریت می‌شوند
    const item = e.target.closest('.inbox-item');
    if (item && item.dataset.focus) { SG.Modal.close(); opts.onFocus(item.dataset.focus); }
  }

  // -------------------------------------------------------------------
  // تنظیمات اعلان‌ها
  // -------------------------------------------------------------------
  function settingsHtml() {
    const cats = D().categories;
    return `<div class="card"><h3>اعلان‌ها</h3>
      <p class="muted small">دسته‌ی خاموش پیام کوتاه نمی‌دهد ولی در صندوق ثبت می‌شود. اعلان‌های بحرانی همیشه نمایش داده می‌شوند.</p>
      ${Object.entries(cats).map(([k, t]) => `<label class="switch-row"><input type="checkbox" data-cat="${k}" ${settings.muted[k] ? '' : 'checked'}> ${t}</label>`).join('')}
    </div>`;
  }

  function bindSettings(root) {
    root.querySelectorAll('[data-cat]').forEach(inp => inp.addEventListener('change', () => {
      settings.muted[inp.dataset.cat] = !inp.checked;
      SG.Save.saveSettings(settings);
      updateBell();
    }));
  }

  // -------------------------------------------------------------------
  // زنگ (تعداد خوانده‌نشده‌ها)
  // -------------------------------------------------------------------
  function updateBell() {
    const el = document.querySelector('[data-top="inbox"] .count');
    if (!el) return;
    const n = opts.getState().notifications.filter(x => !x.read && !isMuted(x)).length;
    el.textContent = n ? F.num(Math.min(n, 99)) : '';
    el.classList.toggle('hidden', !n);
  }

  // -------------------------------------------------------------------
  // ورودی اصلی: نمایش اعلان‌های تازه‌ی یک نوبت
  // -------------------------------------------------------------------
  function showNew(list) {
    const wasEmpty = criticalQueue.length === 0;
    for (const n of list) {
      if (n.level === 'critical') criticalQueue.push(n);
      else if (n.level === 'warning' && !isMuted(n)) notificationToast(n);
    }
    if (criticalQueue.length) {
      opts.onCritical();               // بازی خودکار متوقف می‌شود
      if (wasEmpty) showNextCritical();
    }
    updateBell();
  }

  /** کلیک روی هر دکمه‌ی اعلان (در toast، پنجره‌ی بحرانی یا صندوق) */
  function handleClick(e) {
    const b = e.target.closest('[data-act]');
    if (b) {
      const n = findById(b.dataset.nid);
      if (!n) return;
      const act = b.dataset.act;
      if (act !== 'dismiss') n.acted = true;
      n.read = true;
      // بستن toast یا پنجره‌ی بحرانی مربوطه
      const t = b.closest('.toast'); if (t) remove(t);
      if (b.closest('#critical')) { criticalQueue.shift(); showNextCritical(); }
      if (act !== 'dismiss') opts.onAction(act, n);
      if (SG.Modal.isOpen() && b.closest('.modal')) SG.Modal.open({ title: '🔔 صندوق اعلان‌ها', html: renderInbox(), onClick: inboxClick });
      updateBell();
      return;
    }
    // کلیک روی خود toast ← زوم روی محل
    const t = e.target.closest('.toast[data-nid]');
    if (t) {
      const n = findById(t.dataset.nid);
      if (n) { n.read = true; if (n.focus) opts.onFocus(n.focus); }
      remove(t);
      updateBell();
    }
  }

  function init(o) {
    opts = o;
    settings = Object.assign({ muted: {} }, SG.Save.loadSettings());
    document.addEventListener('click', handleClick);
  }

  function reset() {
    criticalQueue = [];
    document.getElementById('critical').classList.add('hidden');
    toastBox().innerHTML = '';
  }

  SG.NotifyUI = {
    init, showNew, openInbox, updateBell, simpleToast, settingsHtml, bindSettings, reset,
    hasCritical: () => criticalQueue.length > 0, textOf,
  };
})(window.SG = window.SG || {});

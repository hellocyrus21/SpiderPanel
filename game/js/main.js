// =====================================================================
// نقطه‌ی شروع برنامه: اتصال موتور بازی به رابط کاربری
// ---------------------------------------------------------------------
// فازها:
//   choose  ← صفحه‌ی انتخاب کشور (می‌شود روی نقشه هم گشت و کشورها را دید)
//   game    ← بازی: نوبت، اقتصاد، اعلان‌ها، ارتش، جنگ و خرید سلاح (و در مراحل بعد دیپلماسی)
// =====================================================================
(function (SG) {
  'use strict';
  const E = SG.Engine, F = SG.Fmt;

  const app = {
    state: null,
    phase: 'choose',
    selected: null,       // کشوری که پنل اطلاعاتش باز است
    mapMode: 'political', // political | alliances | relations | stability
    map: null, panel: null, start: null,
    politicalColor: {},
    autoplay: { on: false, speed: 0, timer: null },
  };

  // -------------------------------------------------------------------
  // رنگ‌ها
  // -------------------------------------------------------------------
  const PALETTE = ['#5b7a99', '#7d6a9e', '#4f8a7a', '#9a7b55', '#8a5f6f', '#6b8f4e', '#577590', '#8c6d46'];
  const PLAYER_COLOR = '#e0b84d';
  const NEUTRAL = '#4a5566';
  const UNOWNED = '#2c3440';
  const relScale = d3.scaleLinear().domain([-100, -30, 0, 30, 100])
    .range(['#9b1c1c', '#c2603a', '#5b6575', '#4c8d6b', '#2f9e5b']).clamp(true);
  const stabScale = d3.scaleLinear().domain([0, 25, 50, 75, 100])
    .range(['#7f1d1d', '#c2410c', '#a8892f', '#4c8d6b', '#2f9e5b']).clamp(true);

  /**
   * رنگ سیاسی: «رنگ‌آمیزی گراف» ساده تا دو همسایه هم‌رنگ نشوند.
   * کشورها به ترتیب تعداد همسایه رنگ می‌گیرند؛ هر کشور اولین رنگی را می‌گیرد که همسایه‌اش ندارد.
   */
  function buildPoliticalColors(countries) {
    const ids = Object.keys(countries).sort((a, b) =>
      countries[b].neighbors.length - countries[a].neighbors.length || (a < b ? -1 : 1));
    const color = {};
    for (const id of ids) {
      const c = countries[id];
      const used = new Set([...c.neighbors, ...c.seaNeighbors].map(n => color[n]));
      const start = (id.charCodeAt(0) + id.charCodeAt(1) * 3 + id.charCodeAt(2) * 7) % PALETTE.length;
      let pick = PALETTE[start];
      for (let i = 0; i < PALETTE.length; i++) {
        const cand = PALETTE[(start + i) % PALETTE.length];
        if (!used.has(cand)) { pick = cand; break; }
      }
      color[id] = pick;
    }
    return color;
  }

  /** اولویت نمایش در حالت «اتحادها»: پیمان نظامی، سپس بلوک‌های دیگر */
  function allianceColor(id) {
    const list = E.alliancesOf(app.state, id);
    const mil = list.find(a => a.type === 'military');
    if (mil) return mil.color;
    const other = list.find(a => a.id !== 'ARAB') || list[0];
    return other ? d3.interpolateRgb(other.color, NEUTRAL)(0.45) : NEUTRAL;
  }

  function fillFor(id) {
    if (!id) return UNOWNED;
    const s = app.state;
    if (app.mapMode === 'stability' && app.phase === 'game') return stabScale(s.countries[id].stability);
    if (id === s.playerId) return PLAYER_COLOR;

    if (app.phase === 'choose') {
      return s.countries[id].playable ? app.politicalColor[id] : d3.interpolateRgb(app.politicalColor[id], UNOWNED)(0.6);
    }
    if (app.mapMode === 'alliances') return allianceColor(id);
    if (app.mapMode === 'relations') {
      if (E.isAtWar(s, s.playerId, id)) return '#6b0f0f';
      return relScale(E.getRelation(s, s.playerId, id));
    }
    return app.politicalColor[id];
  }

  // -------------------------------------------------------------------
  // راهنمای رنگ و انتخاب حالت نقشه
  // -------------------------------------------------------------------
  function renderLegend() {
    const el = document.getElementById('legend');
    let html = '';
    if (app.phase === 'game' && app.mapMode === 'alliances') {
      html = app.state.alliances.filter(a => a.id !== 'ARAB').map(a =>
        `<div><i style="background:${a.type === 'military' ? a.color : d3.interpolateRgb(a.color, NEUTRAL)(0.45)}"></i>${F.esc(a.name)}</div>`).join('') +
        `<div><i style="background:${NEUTRAL}"></i>بدون پیمان</div>`;
    } else if (app.phase === 'game' && app.mapMode === 'relations') {
      html = [[80, 'متحد'], [35, 'دوست'], [0, 'خنثی'], [-40, 'خصمانه'], [-90, 'دشمن']]
        .map(([v, t]) => `<div><i style="background:${relScale(v)}"></i>${t}</div>`).join('') +
        `<div><i style="background:#6b0f0f"></i>در جنگ</div>`;
    } else if (app.phase === 'game' && app.mapMode === 'stability') {
      html = [[85, 'باثبات'], [60, 'آرام'], [40, 'ناراضی'], [20, 'بحرانی'], [5, 'در حال فروپاشی']]
        .map(([v, t]) => `<div><i style="background:${stabScale(v)}"></i>${t}</div>`).join('');
    } else if (app.phase === 'choose') {
      html = `<div><i style="background:${PALETTE[0]}"></i>قابل‌بازی</div>
              <div><i style="background:${d3.interpolateRgb(PALETTE[0], UNOWNED)(0.6)}"></i>کنترل هوش مصنوعی</div>`;
    }
    el.innerHTML = html;
    el.classList.toggle('hidden', !html);
  }

  function renderMapModes() {
    const el = document.getElementById('mapmodes');
    if (app.phase !== 'game') { el.classList.add('hidden'); return; }
    const modes = [['political', 'سیاسی'], ['alliances', 'اتحادها'], ['relations', 'روابط'], ['stability', 'ثبات']];
    el.innerHTML = modes.map(([k, t]) => `<button class="${app.mapMode === k ? 'on' : ''}" data-mode="${k}">${t}</button>`).join('');
    el.classList.remove('hidden');
  }

  document.getElementById('mapmodes').addEventListener('click', e => {
    const b = e.target.closest('[data-mode]');
    if (!b) return;
    app.mapMode = b.dataset.mode;
    renderMapModes(); renderLegend(); app.map.refresh();
  });

  // -------------------------------------------------------------------
  // نوار بالا
  // -------------------------------------------------------------------
  function renderTopbar() {
    const s = app.state;
    const bar = document.getElementById('topbar');
    if (app.phase === 'choose') {
      bar.innerHTML = `
        <div class="brand">ژئوپلیتیک ۲۰۲۶</div>
        <div class="spacer"></div>
        <button class="btn icon" data-top="guide" title="راهنما">❓<span> راهنما</span></button>
        <button class="btn" data-top="choose">انتخاب کشور</button>`;
    } else {
      const p = s.countries[s.playerId];
      bar.innerHTML = `
        <button class="player-tag" data-top="me" title="نمایش کشور من">${SG.Leader.avatar(s.playerId, 26)} ${F.esc(p.name)}</button>
        <div class="date">${F.date(s.date)}</div>
        <div class="spacer"></div>
        <button class="btn icon bell" data-top="inbox" title="صندوق اعلان‌ها">🔔<span class="count hidden"></span></button>
        <button class="btn icon" data-top="settings" title="تنظیمات">⚙️</button>
        <button class="btn icon" data-top="guide" title="راهنما">❓</button>`;
      SG.NotifyUI.updateBell();
    }
  }

  document.getElementById('topbar').addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    const t = b.dataset.top;
    if (t === 'choose') { app.panel.hide(); app.start.show(); }
    else if (t === 'guide') SG.Guide.open();
    else if (t === 'me') select(app.state.playerId, true);
    else if (t === 'inbox') SG.NotifyUI.openInbox();
    else if (t === 'settings') openSettings();
  });

  // -------------------------------------------------------------------
  // دکمه‌های نوار منابع و نوار فرمان
  // -------------------------------------------------------------------
  function openPanel(name, sub) {
    if (name === 'government') SG.Government.open(app.state, app.state.playerId, onPolicyChange);
    else if (name === 'military') SG.MilitaryPanel.open(app.state, app.state.playerId, { onChange: onMilitaryChange, onShowStack: showStack, onOpenWar: () => openPanel('war') }, sub);
    else if (name === 'advisor') SG.AdvisorPanel.open(app.state, app.state.playerId, id => select(id, true), undefined, onPolicyChange);
    else if (name === 'econ') SG.AdvisorPanel.open(app.state, app.state.playerId, id => select(id, true), 'economy', onPolicyChange);
    else if (name === 'arms') SG.MilitaryPanel.open(app.state, app.state.playerId, { onChange: onMilitaryChange, onShowStack: showStack }, sub || 'arms');
    else if (name === 'war') SG.WarPanel.open(app.state, app.state.playerId, warHandlers());
  }

  function warHandlers() {
    return { onChange: onWarChange, onGoto: id => select(id, true) };
  }

  /** اعلان جنگ یا صلح: نقشه، نیروها، روابط و ذخیره به‌روز می‌شوند */
  function onWarChange() {
    renderTopbar();
    renderHud();
    renderWar();
    app.map.refresh();
    if (app.selected && app.panel.isOpen()) app.panel.show(app.state, app.selected, 'game', { keepScroll: true });
    SG.NotifyUI.showNew(app.state.notifications.filter(n => n.turn === app.state.turn && !n.shown));
    app.state.notifications.forEach(n => { n.shown = true; });
    SG.Save.save(app.state);
  }

  /** رنگ فاتح روی نقشه */
  function occColor(by) {
    const pid = app.state.playerId;
    if (by === pid) return PLAYER_COLOR;
    if (pid && E.isAtWar(app.state, pid, by)) return '#d9534f';
    return app.politicalColor[by] || '#888';
  }

  /** نمایش جنگ روی نقشه: صاحب نواحی (الحاق)، خاک تصرف‌شده (درصدی)، شهرها، نیروها */
  function renderWar() {
    const s = app.state, W = SG.War;
    app.map.setOwner(id => W.effectiveOwner(s, id));
    const areas = W.occupationAreas(s).map(a => ({
      key: a.country + '>' + a.by + ':' + a.kind, country: a.country, center: W.frontPoint(s, a.country, a.by),
      r: W.radiusFor(s, a.country, a.by, a.pct), color: occColor(a.by), war: a.kind === 'war',
    })).filter(a => a.r > 0);
    app.map.setOccupation(areas);
    renderCities();
    renderForces();
    app.map.setStrikes([]);
  }

  function onPolicyChange() {
    renderHud();
    SG.Save.save(app.state);
  }

  function onMilitaryChange() {
    renderHud();
    renderForces();
    SG.Save.save(app.state);
  }

  // -------------------------------------------------------------------
  // نیروها و شهرها روی نقشه
  // -------------------------------------------------------------------
  /** عدد کوتاه برای نشان روی نقشه: ۶۰۰۰ ← ۶K */
  function shortNum(n) {
    if (n >= 10000) return F.num(Math.round(n / 1000)) + 'K';
    if (n >= 1000) return F.num(Math.round(n / 100) / 10) + 'K';
    return F.num(n);
  }

  function renderForces() {
    if (app.phase !== 'game') { app.map.setForces([], []); return; }
    const c = app.state.countries[app.state.playerId];
    const defs = window.SG_DATA.units;
    const groups = {}, routes = [];
    const typeOrder = Object.keys(defs);
    for (const s of c.mil.stacks) {
      // هر دسته‌ی در حال حرکت گروه خودش را دارد؛ بقیه بر اساس محل گروه می‌شوند
      const key = s.move ? 'm:' + s.id : (s.loc.kind === 'city' ? s.loc.city : 'b:' + s.loc.target + (s.loc.sea ? 's' : ''));
      const g = (groups[key] ||= { key, pos: s.pos, stacks: [], moving: !!s.move, eta: s.move ? F.num(s.move.left) + ' ماه' : '' });
      g.stacks.push({ id: s.id, type: s.type, icon: defs[s.type].icon, label: shortNum(s.count), moving: !!s.move,
        low: s.supply < 50, selected: s.id === app.selectedStack, fighting: !!s.inBattle });
      if (s.move) routes.push({ id: s.id, from: s.pos, to: s.move.to });
    }
    // نیروی دشمن در جبهه (فقط کشورهایی که با ما در جنگ‌اند) — قرمز، کلیک = اطلاعات
    for (const f of SG.War.enemyFronts(app.state, app.state.playerId)) {
      const key = 'e:' + f.war;
      const g = (groups[key] ||= { key, pos: f.pos, stacks: [], moving: false, enemy: true, eta: '' });
      for (const [type, n] of Object.entries(f.units)) {
        if (n < 0.5) continue;
        g.stacks.push({ id: 'E:' + f.war + ':' + type, type, icon: defs[type].icon, label: shortNum(Math.round(n)), enemy: true });
      }
      if (!g.stacks.length) delete groups[key];
    }
    for (const g of Object.values(groups)) g.stacks.sort((a, b) => typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type));
    app.map.setForces(Object.values(groups), routes);
  }

  /** شهرهای همه‌ی کشورها (پایتخت‌ها و شهرهای مهم) + شهرهایی که داخل خاک تصرف‌شده افتاده‌اند */
  function renderCities() {
    const s = app.state, W = SG.War;
    const pid = s.playerId;
    const enemies = new Set(pid ? E.warsOf(s, pid) : []);
    const taken = {};   // cityId ← فاتح
    for (const a of W.occupationAreas(s)) for (const ct of W.citiesInside(s, a.country, a.by, a.pct)) taken[ct.id] = a.by;
    const list = [];
    for (const c of Object.values(s.countries)) {
      if (c.annexedBy) {
        // شهرهای کشور الحاق‌شده با پرچم فاتح
        for (const city of c.cities) list.push({ id: city.id, name: city.name, pos: city.pos, capital: false, own: c.annexedBy === pid, occ: null, front: false });
        continue;
      }
      for (const city of c.cities || []) {
        if (city.id.slice(0, city.id.lastIndexOf('-')) !== c.id) continue;   // کپی شهرهای الحاقی
        const by = taken[city.id];
        const front = !!by || enemies.has(c.id) || (c.id === pid && enemies.size > 0);
        if (city.generic && !front) continue;
        list.push({ id: city.id, name: city.name, pos: city.pos, capital: city.capital, own: c.id === pid,
          occ: by ? occColor(by) : null, battle: false, front });
      }
    }
    app.map.setCities(list);
  }
  const phaseGame = () => app.phase === 'game';

  function showStack(stackId) {
    const s = SG.Military.findStack(app.state, app.state.playerId, stackId);
    if (!s) return;
    app.selectedStack = stackId;
    renderForces();
    app.map.zoomToPoint(s.move ? [(s.pos[0] + s.move.to[0]) / 2, (s.pos[1] + s.move.to[1]) / 2] : s.pos, 5);
  }

  document.addEventListener('click', e => {
    const o = e.target.closest('[data-open]');
    if (o && (o.closest('#hud') || o.closest('#actionbar'))) { openPanel(o.dataset.open); return; }
    if (e.target.closest('#actionbar [data-next]')) { stopAuto(); nextTurn(); return; }
    if (e.target.closest('#actionbar [data-play]')) { app.autoplay.on ? stopAuto() : startAuto(); return; }
    if (e.target.closest('#actionbar [data-speed]')) {
      app.autoplay.speed = (app.autoplay.speed + 1) % SG.Hud.SPEEDS.length;
      if (app.autoplay.on) { stopAuto(); startAuto(); } else renderHud();
    }
  });

  function renderHud() {
    if (app.phase !== 'game') return;
    SG.Hud.renderResources(app.state);
    SG.Hud.renderActionBar(app.state, app.autoplay);
  }

  // -------------------------------------------------------------------
  // نوبت
  // -------------------------------------------------------------------
  function nextTurn() {
    if (app.state.gameOver || SG.NotifyUI.hasCritical()) return;
    const fresh = SG.Turn.advance(app.state);
    SG.Save.save(app.state);
    renderTopbar();
    renderHud();
    if (app.mapMode !== 'political' && app.mapMode !== 'alliances') app.map.refresh();
    renderWar();
    if (app.state.warsInfo.length || (app.state.territory || []).length) app.map.refresh();
    SG.MilitaryPanel.refresh();
    SG.WarPanel.refresh();
    if (app.selected && app.panel.isOpen()) app.panel.show(app.state, app.selected, 'game', { keepScroll: true });
    SG.Government.refresh();
    fresh.forEach(n => { n.shown = true; });
    SG.NotifyUI.showNew(fresh);
    if (app.state.gameOver) stopAuto();
  }

  function startAuto() {
    if (app.state.gameOver) return;
    app.autoplay.on = true;
    clearInterval(app.autoplay.timer);
    app.autoplay.timer = setInterval(() => {
      // وقتی پنجره‌ای باز است یا اعلان بحرانی هست، صبر کن
      if (SG.Modal.isOpen() || SG.NotifyUI.hasCritical()) return;
      nextTurn();
    }, SG.Hud.SPEEDS[app.autoplay.speed].ms);
    renderHud();
  }

  function stopAuto() {
    app.autoplay.on = false;
    clearInterval(app.autoplay.timer);
    renderHud();
  }

  // -------------------------------------------------------------------
  // اقدام‌های اعلان‌ها
  // -------------------------------------------------------------------
  function onNotificationAction(act, n) {
    if (act === 'newgame') { newGame(); return; }
    if (act === 'show:stack') { showStack(n.data.stackId); return; }
    if (act === 'show:front') { SG.WarPanel.setCtx({ state: app.state, pid: app.state.playerId, ...warHandlers() }); SG.WarPanel.openReport(app.state, n.data.rid); return; }
    if (act.startsWith('peace:')) {
      const term = act.slice(6);
      // peace:accept ← پذیرفتن شرط دشمن؛ بقیه ← شرط ما که دشمن پیشنهادش را پذیرفته
      const ok = term === 'accept'
        ? SG.War.makePeace(app.state, n.data.war, n.data.term, n.data.winner, n.data.amount)
        : SG.War.makePeace(app.state, n.data.war, term, app.state.playerId, n.data.amount);
      if (!ok) SG.NotifyUI.simpleToast('این جنگ دیگر در جریان نیست.', 'lvl-warning');
      onWarChange(); return;
    }
    if (act.startsWith('open:')) { openPanel(act.slice(5)); return; }
    if (act.startsWith('decree:')) {
      const r = SG.Government.runDecree(app.state, app.state.playerId, act.slice(7));
      SG.NotifyUI.simpleToast(r.text, r.ok ? 'lvl-info' : 'lvl-warning');
      onPolicyChange();
    }
  }

  // -------------------------------------------------------------------
  // تنظیمات و بازی جدید
  // -------------------------------------------------------------------
  function openSettings() {
    SG.Modal.open({
      title: '⚙️ تنظیمات',
      html: SG.NotifyUI.settingsHtml() + `
        <div class="card"><h3>بازی</h3>
          <p class="muted small">بازی بعد از هر نوبت خودکار ذخیره می‌شود. بذر این دنیا: ${app.state.seed}</p>
          <button class="btn" data-newgame>🔄 شروع بازی جدید</button>
        </div>
        <div class="card"><h3>انتقال به دستگاه دیگر</h3>
          <p class="muted small">ذخیره داخل همین مرورگر است. برای ادامه روی دستگاه دیگر: اینجا فایل ذخیره را بگیرید،
            به آن دستگاه بفرستید و در صفحه‌ی اول بازی با «بارگذاری فایل ذخیره» بازش کنید.</p>
          <button class="btn" data-export>💾 دانلود فایل ذخیره</button>
        </div>`,
      onClick: e => {
        if (e.target.closest('[data-newgame]') && confirm('بازی فعلی پاک شود و بازی جدید شروع شود؟')) newGame();
        if (e.target.closest('[data-export]')) exportSave();
      },
    });
    SG.NotifyUI.bindSettings(document.querySelector('.modal-body'));
  }

  function exportSave() {
    const s = app.state, p = s.countries[s.playerId];
    const blob = new Blob([SG.Save.exportText(s)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `geopolitics2026-${s.playerId}-${s.date.year}-${s.date.month}.json`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    SG.NotifyUI.simpleToast(`💾 فایل ذخیره‌ی ${F.esc(p.name)} دانلود شد.`, 'lvl-info');
  }

  /** بارگذاری فایل ذخیره (از صفحه‌ی اول) */
  function importSave(file) {
    const reader = new FileReader();
    reader.onload = () => {
      const s = SG.Save.importText(reader.result);
      if (!s) { alert('این فایل، فایل ذخیره‌ی بازی نیست.'); return; }
      SG.Save.save(s);
      continueGame(s);
    };
    reader.readAsText(file);
  }

  function newGame() {
    stopAuto();
    SG.Save.clear();
    location.reload();
  }

  // -------------------------------------------------------------------
  // انتخاب کشور روی نقشه / پنل
  // -------------------------------------------------------------------
  function select(id, zoom = false) {
    app.selected = id;
    app.map.setSelected(id);
    if (!id) { app.panel.hide(); return; }
    app.panel.show(app.state, id, app.phase === 'choose' ? 'choose' : 'game');
    if (zoom) app.map.zoomTo(id);
  }

  /** ورود به حالت بازی (برای بازی جدید و ادامه‌ی بازی ذخیره‌شده) */
  function enterGame() {
    app.phase = 'game';
    app.mapMode = 'political';
    app.start.hide();
    app.map.setPlayer(app.state.playerId);
    app.map.refresh();
    document.body.classList.add('in-game');
    renderTopbar(); renderLegend(); renderMapModes(); renderHud(); renderWar();
  }

  function startGame(id) {
    E.startGame(app.state, id);
    enterGame();
    select(id, true);
    SG.Save.save(app.state);
    app.state.notifications.forEach(n => { n.shown = true; });
    SG.NotifyUI.showNew(app.state.notifications.slice());
  }

  function continueGame(saved) {
    app.state = E.migrate(saved, window.SG_DATA.countries);
    app.state.notifications.forEach(n => { n.shown = true; });
    app.politicalColor = buildPoliticalColors(app.state.countries);
    enterGame();
    app.map.zoomTo(saved.playerId);
    SG.NotifyUI.updateBell();
    if (saved.gameOver) SG.NotifyUI.showNew(saved.notifications.filter(n => n.type === 'game_over_collapse' || n.type === 'game_over_conquered'));
  }

  // -------------------------------------------------------------------
  // راه‌اندازی
  // -------------------------------------------------------------------
  function init() {
    const D = window.SG_DATA;
    if (!D || !D.world || !D.countries || !D.scenario || !D.messages) {
      document.body.innerHTML = '<p class="fatal">فایل‌های داده (پوشه‌ی data) پیدا نشد.</p>';
      return;
    }

    app.state = E.createWorld({ countries: D.countries, scenario: D.scenario });
    app.politicalColor = buildPoliticalColors(app.state.countries);

    SG.NotifyUI.init({
      getState: () => app.state,
      onAction: onNotificationAction,
      onFocus: id => select(id, true),
      onCritical: () => stopAuto(),
    });

    app.map = SG.MapView.create(document.getElementById('map'), D.world, {
      onSelect: id => select(id),
      fillFor,
      nameFor: id => app.state.countries[id]?.name || id,
      onStackClick: id => {
        if (id.startsWith('E:')) {
          SG.WarPanel.setCtx({ state: app.state, pid: app.state.playerId, ...warHandlers() });
          SG.WarPanel.enemyInfo(app.state, app.state.playerId, id.split(':')[1]); return;
        }
        app.selectedStack = id; renderForces(); openPanel('military', 'stack:' + id);
      },
      getOcclusion: () => {
        const el = document.getElementById('info-panel');
        if (!el.classList.contains('open')) return { right: 0, bottom: 0 };
        return window.matchMedia('(max-width: 720px)').matches
          ? { right: 0, bottom: el.offsetHeight }
          : { right: el.offsetWidth, bottom: 0 };
      },
    });

    app.panel = SG.InfoPanel.create(document.getElementById('info-panel'), {
      onGoto: id => select(id, true),
      onClose: () => select(null),
      onStart: id => startGame(id),
      onAdvisor: id => SG.AdvisorPanel.open(app.state, id, gid => select(gid, true)),
      onBack: () => { select(null); app.start.show(); },
      onGovernment: () => openPanel('government'),
      onDeclare: id => SG.WarPanel.confirmDeclare(app.state, app.state.playerId, id, onWarChange),
      onWar: () => openPanel('war'),
      onArms: id => openPanel('arms', 'seller:' + id),
      onCity: () => {},
    });

    const saved = SG.Save.load();
    app.start = SG.StartScreen.create(document.getElementById('start-screen'), {
      onPick: id => { app.start.hide(); select(id, true); },
      onBrowse: () => app.start.hide(),
      onContinue: () => continueGame(saved),
      onNewGame: () => { SG.Save.clear(); app.start.render(app.state, null); },
      onImport: file => importSave(file),
    });

    document.getElementById('zoom-in').addEventListener('click', () => app.map.zoomBy(1.6));
    document.getElementById('zoom-out').addEventListener('click', () => app.map.zoomBy(1 / 1.6));
    document.getElementById('zoom-reset').addEventListener('click', () => app.map.resetView());

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !SG.Modal.isOpen()) select(null);
      // فاصله (Space) = نوبت بعد، وقتی چیزی باز نیست
      if (e.key === ' ' && app.phase === 'game' && !SG.Modal.isOpen() && !/input|textarea/i.test(e.target.tagName)) {
        e.preventDefault(); stopAuto(); nextTurn();
      }
    });

    renderCities();
    app.start.render(app.state, saved);
    renderTopbar();
    renderLegend();
    renderMapModes();
    document.body.classList.remove('loading');

    // برای کنجکاوها و تست از کنسول مرورگر
    window.SG.app = app;
  }

  init();
})(window.SG = window.SG || {});

// =====================================================================
// نقطه‌ی شروع برنامه: اتصال موتور بازی به رابط کاربری
// ---------------------------------------------------------------------
// فازها:
//   choose  ← صفحه‌ی انتخاب کشور (می‌شود روی نقشه هم گشت و کشورها را دید)
//   game    ← بازی شروع شده (در مراحل بعد: نوبت، اقتصاد، ارتش و ...)
// =====================================================================
(function (SG) {
  'use strict';
  const E = SG.Engine, F = SG.Fmt;

  const app = {
    state: null,
    phase: 'choose',
    selected: null,       // کشوری که پنل اطلاعاتش باز است
    mapMode: 'political', // political | alliances | relations
    map: null, panel: null, start: null,
    politicalColor: {},
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
      // شروع از یک رنگ وابسته به کد کشور، تا نقشه یکنواخت نشود
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
    if (id === s.playerId) return PLAYER_COLOR;

    if (app.phase === 'choose') {
      // در صفحه‌ی انتخاب، کشورهای قابل‌بازی پررنگ‌اند
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
  // راهنمای رنگ (legend)
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
    } else if (app.phase === 'choose') {
      html = `<div><i style="background:${PALETTE[0]}"></i>قابل‌بازی</div>
              <div><i style="background:${d3.interpolateRgb(PALETTE[0], UNOWNED)(0.6)}"></i>کنترل هوش مصنوعی</div>`;
    }
    el.innerHTML = html;
    el.classList.toggle('hidden', !html);
  }

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
      const modes = [['political', 'سیاسی'], ['alliances', 'اتحادها'], ['relations', 'روابط']];
      bar.innerHTML = `
        <button class="player-tag" data-top="me" title="نمایش کشور من">${F.esc(p.name)}</button>
        <div class="date">${F.date(s.date)}</div>
        <div class="spacer"></div>
        <div class="seg" role="group" aria-label="حالت نقشه">
          ${modes.map(([k, t]) => `<button class="${app.mapMode === k ? 'on' : ''}" data-mode="${k}">${t}</button>`).join('')}
        </div>
        <button class="btn icon" data-top="advisor" title="مشاور ارشد">🧑‍💼<span> مشاور</span></button>
        <button class="btn icon" data-top="guide" title="راهنما">❓<span> راهنما</span></button>`;
    }
  }

  document.getElementById('topbar').addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.mode) {
      app.mapMode = b.dataset.mode;
      renderTopbar(); renderLegend(); app.map.refresh();
    } else if (b.dataset.top === 'choose') {
      app.panel.hide(); app.start.show();
    } else if (b.dataset.top === 'guide') {
      SG.Guide.open();
    } else if (b.dataset.top === 'advisor') {
      SG.AdvisorPanel.open(app.state, app.state.playerId, id => select(id, true));
    } else if (b.dataset.top === 'me') {
      select(app.state.playerId, true);
    }
  });

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

  function startGame(id) {
    E.startGame(app.state, id);
    app.phase = 'game';
    app.mapMode = 'political';
    app.start.hide();
    app.map.setPlayer(id);
    app.map.refresh();
    renderTopbar(); renderLegend();
    select(id, true);
    console.info('Game started', { player: id, seed: app.state.seed });
  }

  // -------------------------------------------------------------------
  // راه‌اندازی
  // -------------------------------------------------------------------
  function init() {
    const D = window.SG_DATA;
    if (!D || !D.world || !D.countries || !D.scenario) {
      document.body.innerHTML = '<p class="fatal">فایل‌های داده (پوشه‌ی data) پیدا نشد.</p>';
      return;
    }

    app.state = E.createWorld({ countries: D.countries, scenario: D.scenario });
    app.politicalColor = buildPoliticalColors(app.state.countries);

    app.map = SG.MapView.create(document.getElementById('map'), D.world, {
      onSelect: id => select(id),
      fillFor,
      nameFor: id => app.state.countries[id]?.name || id,
      getOcclusion: () => {
        const el = document.getElementById('info-panel');
        if (!el.classList.contains('open')) return { right: 0, bottom: 0 };
        // offsetWidth/Height تحت تأثیر انیمیشن باز شدن (transform) نیست
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
    });

    app.start = SG.StartScreen.create(document.getElementById('start-screen'), {
      onPick: id => { app.start.hide(); select(id, true); },
      onBrowse: () => app.start.hide(),
    });

    document.getElementById('zoom-in').addEventListener('click', () => app.map.zoomBy(1.6));
    document.getElementById('zoom-out').addEventListener('click', () => app.map.zoomBy(1 / 1.6));
    document.getElementById('zoom-reset').addEventListener('click', () => app.map.resetView());

    // کلید Esc پنل را می‌بندد
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !SG.Modal.isOpen()) select(null); });

    app.start.render(app.state);
    renderTopbar();
    renderLegend();
    document.body.classList.remove('loading');

    // برای کنجکاوها و تست از کنسول مرورگر
    window.SG.app = app;
  }

  init();
})(window.SG = window.SG || {});

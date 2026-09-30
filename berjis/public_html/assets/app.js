/* برجیس — چارت + اندیکاتور Matrix Series + مدیریت آلارم */
(function () {
  'use strict';

  var LC = window.LightweightCharts;
  var TZ_SHIFT = 12600; // نمایش ساعت تهران (UTC+03:30)
  var PRICE_DEC = { BTC: 2, XRP: 4, LINK: 3, DOGE: 5 };
  var POLL_MS = { '1m': 3000, '5m': 4000, '15m': 8000, '1h': 15000 };
  var LINE_FA = { up: 'Up', down: 'Down', res: 'مقاومت', sup: 'حمایت', ob: 'OB', os: 'OS' };
  var COND_FA = { touch: 'لمس', cross_up: 'شکست ↑', cross_down: 'شکست ↓' };

  var S = {
    symbol: lsGet('symbol', 'BTC'),
    tf: lsGet('tf', '5m'),
    settings: null,
    defaults: null,
    candles: [],
    matrix: null,
    alarms: [],
    pollTimer: null,
    loadSeq: 0,
    picking: false,
    alarmLines: [],
    levelLines: [],
  };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function lsGet(k, d) { try { return localStorage.getItem('berjis_' + k) || d; } catch (_) { return d; } }
  function lsSet(k, v) { try { localStorage.setItem('berjis_' + k, v); } catch (_) {} }

  function api(action, body, query) {
    var url = 'api.php?action=' + action + (query ? '&' + query : '');
    var opt = body === undefined ? {} : {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Berjis': '1' }, body: JSON.stringify(body),
    };
    return fetch(url, opt).then(function (r) {
      return r.json().catch(function () { return { ok: false, error: 'پاسخ نامعتبر سرور (' + r.status + ')' }; })
        .then(function (j) {
          if (r.status === 401 && action !== 'login') { location.reload(); }
          return j;
        });
    }).catch(function () { return { ok: false, error: 'ارتباط با سرور قطع است' }; });
  }

  function toast(msg, bad) {
    var t = $('#toast');
    t.textContent = msg;
    t.className = 'toast show' + (bad ? ' bad' : '');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { t.className = 'toast'; }, 3500);
  }

  function fmt(v, d) {
    if (v === null || v === undefined || !isFinite(v)) return '—';
    return Number(v).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }

  function params() { return S.settings.indicator[S.tf]; }
  function style() { return S.settings.style; }

  /* ------------------------------------------------------------------ چارت */
  var chart, priceSeries, mxCandles, upLine, downLine, resLine, supLine, markers;

  function buildChart() {
    var el = $('#chart');
    chart = LC.createChart(el, {
      autoSize: true,
      layout: {
        background: { type: 'solid', color: '#0b1020' },
        textColor: '#9aa4bf',
        fontFamily: 'Vazirmatn, Tahoma, sans-serif',
        panes: { separatorColor: '#334155', separatorHoverColor: 'rgba(56,189,248,.35)', enableResize: true },
      },
      grid: { vertLines: { color: 'rgba(148,163,184,.06)' }, horzLines: { color: 'rgba(148,163,184,.06)' } },
      rightPriceScale: { borderColor: '#1e293b', minimumWidth: 70 },
      timeScale: { borderColor: '#1e293b', timeVisible: true, secondsVisible: false, rightOffset: 6, barSpacing: 7 },
      crosshair: { mode: LC.CrosshairMode.Normal },
      localization: { locale: 'en-US' },
    });

    priceSeries = chart.addSeries(LC.CandlestickSeries, {
      upColor: '#22c55e', downColor: '#ef4444', borderVisible: false,
      wickUpColor: '#22c55e', wickDownColor: '#ef4444',
    }, 0);

    // پنل ۱: اندیکاتور
    mxCandles = chart.addSeries(LC.CandlestickSeries, {
      borderVisible: false, wickVisible: false, priceLineVisible: false, lastValueVisible: false,
      priceFormat: { type: 'price', precision: 2, minMove: 0.01 },
    }, 1);
    var lineOpt = function (title) {
      return { lineWidth: 1, priceLineVisible: false, lastValueVisible: true, title: title,
        crosshairMarkerVisible: false, priceFormat: { type: 'price', precision: 2, minMove: 0.01 } };
    };
    upLine = chart.addSeries(LC.LineSeries, lineOpt('Up'), 1);
    downLine = chart.addSeries(LC.LineSeries, lineOpt('Down'), 1);
    resLine = chart.addSeries(LC.LineSeries, lineOpt('Res'), 1);
    supLine = chart.addSeries(LC.LineSeries, lineOpt('Sup'), 1);
    markers = LC.createSeriesMarkers(mxCandles, []);

    applyPaneSize(Number(lsGet('pane', '40')));
    chart.subscribeCrosshairMove(onCrosshair);
    window.addEventListener('resize', positionOverlays);
    chart.subscribeClick(onChartClick);
  }

  function applyStyle() {
    var st = style();
    var w = Number(st.lineWidth) || 1;
    mxCandles.applyOptions({ visible: !!st.showCandles });
    upLine.applyOptions({ visible: !!st.showUp, color: st.upColor, lineWidth: w });
    downLine.applyOptions({ visible: !!st.showDown, color: st.downColor, lineWidth: w });
    resLine.applyOptions({ visible: !!st.showRes, color: st.resColor, lineWidth: w, lineStyle: LC.LineStyle.Solid });
    supLine.applyOptions({ visible: !!st.showSup, color: st.supColor, lineWidth: w, lineStyle: LC.LineStyle.Solid });
    var d = PRICE_DEC[S.symbol];
    priceSeries.applyOptions({ priceFormat: { type: 'price', precision: d, minMove: Math.pow(10, -d) } });
    drawLevels();
  }

  function drawLevels() {
    S.levelLines.forEach(function (l) { upLine.removePriceLine(l); });
    S.levelLines = [];
    var st = style(), p = params();
    if (!st.showOBOS) return;
    [[p.overbought, 'OB'], [0, ''], [p.oversold, 'OS']].forEach(function (x) {
      S.levelLines.push(upLine.createPriceLine({
        price: x[0], color: st.obosColor, lineWidth: 1, lineStyle: LC.LineStyle.Dotted,
        axisLabelVisible: x[1] !== '', title: x[1],
      }));
    });
  }

  function applyPaneSize(pct) {
    pct = Math.max(15, Math.min(85, pct || 40));
    var panes = chart.panes();
    if (panes.length < 2) return;
    panes[0].setStretchFactor(100 - pct);
    panes[1].setStretchFactor(pct);
    $('#pane-size').value = pct;
    lsSet('pane', String(pct));
    requestAnimationFrame(positionOverlays);
  }

  function currentPanePct() {
    var p = chart.panes();
    if (p.length < 2) return 40;
    var a = p[0].getHeight(), b = p[1].getHeight();
    return a + b > 0 ? Math.round(b * 100 / (a + b)) : 40;
  }

  function paneRect(idx) {
    var p = chart.panes()[idx];
    var el = p && p.getHTMLElement && p.getHTMLElement();
    return el ? el.getBoundingClientRect() : null;
  }

  function positionOverlays() {
    var r = paneRect(1), host = $('.chart-area').getBoundingClientRect();
    if (!r) return;
    $('#legend').style.top = (r.top - host.top + 6) + 'px';
    $('#pane-tools').style.top = (r.top - host.top + 4) + 'px';
    // اگر کاربر مرز پنل را با ماوس جابجا کرد، اسلایدر هم به‌روز شود
    $('#pane-size').value = currentPanePct();
  }

  /* ------------------------------------------------------------------ داده */
  function tt(t) { return t + TZ_SHIFT; }

  function pointsAt(i) {
    var c = S.candles[i], m = S.matrix, t = tt(c[0]);
    var u = m.up[i], d = m.down[i];
    var mx = (u === null || d === null) ? { time: t } : {
      time: t, open: Math.min(u, d), high: Math.max(u, d), low: Math.min(u, d), close: Math.max(u, d),
      color: u > d ? style().candleUp : style().candleDown,
    };
    var ln = function (v) { return v === null ? { time: t } : { time: t, value: v }; };
    return {
      price: { time: t, open: c[1], high: c[2], low: c[3], close: c[4] },
      mx: mx, up: ln(u), down: ln(d), res: ln(m.res[i]), sup: ln(m.sup[i]),
    };
  }

  function renderAll() {
    var n = S.candles.length, arr = { price: [], mx: [], up: [], down: [], res: [], sup: [] };
    for (var i = 0; i < n; i++) {
      var p = pointsAt(i);
      for (var k in arr) arr[k].push(p[k]);
    }
    priceSeries.setData(arr.price);
    mxCandles.setData(arr.mx);
    upLine.setData(arr.up);
    downLine.setData(arr.down);
    resLine.setData(arr.res);
    supLine.setData(arr.sup);
    renderMarkers();
  }

  function renderFrom(start) {
    for (var i = start; i < S.candles.length; i++) {
      var p = pointsAt(i);
      priceSeries.update(p.price);
      mxCandles.update(p.mx);
      upLine.update(p.up);
      downLine.update(p.down);
      resLine.update(p.res);
      supLine.update(p.sup);
    }
    renderMarkers();
  }

  function renderMarkers() {
    var m = S.matrix, list = [];
    if (style().showShapes) {
      for (var i = 0; i < S.candles.length; i++) {
        var t = tt(S.candles[i][0]);
        if (m.upShape[i] !== null) list.push({ time: t, position: 'aboveBar', shape: 'circle', color: '#f43f5e', size: 0.4 });
        if (m.downShape[i] !== null) list.push({ time: t, position: 'belowBar', shape: 'circle', color: '#22c55e', size: 0.4 });
      }
    }
    markers.setMarkers(list);
  }

  function recompute() {
    S.matrix = window.MatrixSeries.compute(S.candles, params());
  }

  function setMsg(text) {
    var m = $('#chart-msg');
    m.textContent = text || '';
    m.style.display = text ? 'block' : 'none';
  }

  function loadChart() {
    var seq = ++S.loadSeq;
    clearTimeout(S.pollTimer);
    setMsg('در حال دریافت کندل‌ها…');
    $('#price').textContent = '—';
    api('candles', undefined, 'symbol=' + S.symbol + '&tf=' + S.tf).then(function (j) {
      if (seq !== S.loadSeq) return;
      if (!j.ok) {
        setMsg((j.error || 'خطا در دریافت داده') + ' — دوباره تلاش می‌شود…');
        setStatus(false);
        S.pollTimer = setTimeout(loadChart, 5000);
        return;
      }
      setMsg('');
      S.candles = j.candles;
      recompute();
      applyStyle();
      renderAll();
      var bars = Math.max(40, Math.min(160, Math.round($('#chart').clientWidth / 8)));
      chart.timeScale().setVisibleLogicalRange({ from: S.candles.length - bars, to: S.candles.length + 5 });
      afterData(j);
      renderAlarmLines();
      schedulePoll(seq);
    });
  }

  function schedulePoll(seq) {
    clearTimeout(S.pollTimer);
    S.pollTimer = setTimeout(function () { poll(seq); }, POLL_MS[S.tf]);
  }

  function poll(seq) {
    if (seq !== S.loadSeq) return;
    if (document.hidden) { schedulePoll(seq); return; }
    api('candles', undefined, 'symbol=' + S.symbol + '&tf=' + S.tf + '&limit=5').then(function (j) {
      if (seq !== S.loadSeq) return;
      if (j.ok && j.candles.length) {
        var start = merge(j.candles);
        if (start !== null) {
          recompute();
          if (start === -1) renderAll(); else renderFrom(start);
        }
        afterData(j);
      } else {
        setStatus(false);
      }
      schedulePoll(seq);
    });
  }

  /** کندل‌های جدید را ادغام می‌کند؛ خروجی: اولین اندیس تغییرکرده، -1 = رسم کامل، null = بدون تغییر */
  function merge(fresh) {
    var arr = S.candles, n = arr.length, first = null;
    fresh.forEach(function (c) {
      var lastT = arr.length ? arr[arr.length - 1][0] : 0;
      if (c[0] > lastT) {
        arr.push(c);
        if (first === null) first = arr.length - 1;
        return;
      }
      for (var i = arr.length - 1; i >= 0 && i >= arr.length - 10; i--) {
        if (arr[i][0] === c[0]) {
          if (arr[i][1] !== c[1] || arr[i][2] !== c[2] || arr[i][3] !== c[3] || arr[i][4] !== c[4]) {
            arr[i] = c;
            if (first === null || i < first) first = i;
          }
          return;
        }
      }
    });
    if (arr.length > 1500) { arr.splice(0, arr.length - 1500); return -1; }
    if (first === null) return null;
    return first < n - 1 ? -1 : first;
  }

  function afterData(j) {
    var last = S.candles[S.candles.length - 1];
    $('#price').textContent = fmt(last[4], PRICE_DEC[S.symbol]);
    $('#source').textContent = j.stale ? 'داده قدیمی' : (j.source || '');
    setStatus(!j.stale);
    updateLegend(null);
    updateNowValues();
  }

  function setStatus(ok) {
    $('#status-dot').className = 'status-dot ' + (ok ? 'ok' : 'bad');
  }

  /* ------------------------------------------------------------------ لجند */
  function onCrosshair(param) {
    if (!S.matrix) return;
    var idx = null;
    if (param && param.time !== undefined) {
      var t = param.time - TZ_SHIFT;
      for (var i = S.candles.length - 1; i >= 0; i--) { if (S.candles[i][0] === t) { idx = i; break; } }
    }
    updateLegend(idx);
  }

  function updateLegend(idx) {
    if (!S.matrix || !S.candles.length) return;
    var i = idx === null ? S.candles.length - 1 : idx, m = S.matrix, st = style();
    var trend = m.up[i] !== null && m.down[i] !== null ? (m.up[i] > m.down[i] ? '▲' : '▼') : '';
    $('#legend').innerHTML =
      '<b>Matrix Series ' + S.tf + '</b> ' + trend +
      ' <span style="color:' + st.upColor + '">Up ' + fmt(m.up[i], 2) + '</span>' +
      ' <span style="color:' + st.downColor + '">Down ' + fmt(m.down[i], 2) + '</span>' +
      ' <span style="color:' + st.resColor + '">Res ' + fmt(m.res[i], 2) + '</span>' +
      ' <span style="color:' + st.supColor + '">Sup ' + fmt(m.sup[i], 2) + '</span>';
    positionOverlays();
  }

  /* ------------------------------------------------------------------ انتخاب عدد از روی چارت */
  function setPicking(on) {
    S.picking = on;
    $('#pick-hint').classList.toggle('show', on);
    document.body.classList.toggle('picking', on);
    if (on && window.innerWidth < 900) closeDrawer();
  }

  function onChartClick(param) {
    if (!S.picking || !param || !param.point) return;
    if (param.paneIndex !== 1) { toast('روی بخش اندیکاتور (پایین) کلیک کنید', true); return; }
    window.__lastClick = param.point;
    var v = upLine.coordinateToPrice(param.point.y);
    if (v === null) return;
    var f = $('#alarm-form');
    f.target_value.value = Math.round(v * 100) / 100;
    setPicking(false);
    openDrawer();
    toast('عدد هدف: ' + f.target_value.value);
  }

  /* ------------------------------------------------------------------ آلارم‌ها */
  function loadAlarms() {
    return api('alarms').then(function (j) {
      if (!j.ok) return;
      S.alarms = j.alarms;
      renderAlarmList();
      renderLog(j.log);
      renderAlarmLines();
    });
  }

  function alarmText(a) {
    var target = a.target_type === 'line' ? LINE_FA[a.target_line] : fmt(a.target_value, 2);
    return LINE_FA[a.line] + ' ' + COND_FA[a.condition] + ' ' + target;
  }

  function renderAlarmList() {
    var active = S.alarms.filter(function (a) { return a.enabled; }).length;
    $('#alarm-badge').textContent = active;
    var box = $('#alarm-list');
    if (!S.alarms.length) { box.innerHTML = '<p class="muted">هنوز آلارمی ثبت نشده.</p>'; return; }
    box.innerHTML = S.alarms.slice().reverse().map(function (a) {
      return '<div class="item ' + (a.enabled ? '' : 'off') + '" data-id="' + esc(a.id) + '">' +
        '<div class="item-main"><b>' + esc(a.symbol) + ' · ' + esc(a.tf) + '</b> — ' + esc(alarmText(a)) +
        (a.condition === 'touch' ? ' <small>(±' + fmt(a.tolerance, 2) + ')</small>' : '') +
        '<div class="muted small">' + (a.mode === 'close' ? 'بسته شدن کندل' : 'لحظه‌ای') + ' · ' +
        (a.repeat === 'once' ? 'یک بار' : 'تکراری') +
        (a.last_value !== undefined && a.last_value !== null ? ' · مقدار فعلی ' + fmt(a.last_value, 2) : '') +
        (a.fired_count ? ' · ' + a.fired_count + ' بار ارسال' : '') +
        (a.note ? ' · ' + esc(a.note) : '') + '</div></div>' +
        '<div class="item-act">' +
        '<label class="switch" title="فعال/غیرفعال"><input type="checkbox" data-act="toggle" ' + (a.enabled ? 'checked' : '') + '><span></span></label>' +
        '<button class="btn sm" data-act="edit">ویرایش</button>' +
        '<button class="btn sm danger" data-act="del">حذف</button></div></div>';
    }).join('');
  }

  function renderLog(log) {
    var box = $('#alarm-log');
    if (!log || !log.length) { box.innerHTML = '<p class="muted">—</p>'; return; }
    box.innerHTML = log.slice(0, 20).map(function (l) {
      var d = new Date(l.at * 1000).toLocaleString('fa-IR', { timeZone: 'Asia/Tehran' });
      return '<div class="item"><div class="item-main"><b>' + esc(l.symbol) + ' · ' + esc(l.tf) + '</b> ' + esc(l.text) +
        '<div class="muted small">' + d + ' · مقدار ' + fmt(l.value, 2) +
        (l.sent ? ' · ✅ ارسال شد' : ' · ⚠️ ' + esc(l.error || 'ارسال نشد')) + '</div></div></div>';
    }).join('');
  }

  function renderAlarmLines() {
    if (!upLine) return;
    S.alarmLines.forEach(function (l) { upLine.removePriceLine(l); });
    S.alarmLines = [];
    S.alarms.forEach(function (a) {
      if (!a.enabled || a.symbol !== S.symbol || a.tf !== S.tf || a.target_type !== 'value') return;
      S.alarmLines.push(upLine.createPriceLine({
        price: Number(a.target_value), color: '#eab308', lineWidth: 1, lineStyle: LC.LineStyle.Dashed,
        axisLabelVisible: true, title: '🔔 ' + LINE_FA[a.line] + ' ' + COND_FA[a.condition],
      }));
    });
  }

  function formData() {
    var f = $('#alarm-form'), o = {};
    ['id', 'symbol', 'tf', 'line', 'condition', 'target_type', 'target_value', 'target_line', 'tolerance', 'mode', 'repeat', 'note']
      .forEach(function (k) { o[k] = f[k].value; });
    return o;
  }

  function resetAlarmForm() {
    var f = $('#alarm-form');
    f.reset();
    f.id.value = '';
    f.symbol.value = S.symbol;
    f.tf.value = S.tf;
    setTargetType('value');
    $('#alarm-submit').textContent = 'ثبت آلارم';
    $('#alarm-reset').hidden = true;
    $('#alarm-err').textContent = '';
    syncFormVisibility();
    updateNowValues();
  }

  function editAlarm(a) {
    var f = $('#alarm-form');
    ['id', 'symbol', 'tf', 'line', 'condition', 'target_value', 'target_line', 'tolerance', 'mode', 'repeat', 'note']
      .forEach(function (k) { f[k].value = a[k] === undefined || a[k] === null ? '' : a[k]; });
    setTargetType(a.target_type);
    $('#alarm-submit').textContent = 'ذخیره تغییرات';
    $('#alarm-reset').hidden = false;
    syncFormVisibility();
    f.scrollIntoView({ behavior: 'smooth' });
  }

  function setTargetType(v) {
    $('#alarm-form').target_type.value = v;
    $$('#target-type button').forEach(function (b) { b.classList.toggle('on', b.dataset.v === v); });
    $('#tt-value').hidden = v !== 'value';
    $('#tt-line').hidden = v !== 'line';
    $('#alarm-form').target_value.required = v === 'value';
  }

  function syncFormVisibility() {
    $('#tol-wrap').hidden = $('#alarm-form').condition.value !== 'touch';
  }

  /** مقدار فعلی خطوط برای نماد/تایم‌فریم انتخابی فرم (کمک به انتخاب عدد) */
  function updateNowValues() {
    var f = $('#alarm-form'), box = $('#now-values');
    if (!S.matrix || f.symbol.value !== S.symbol || f.tf.value !== S.tf) {
      box.innerHTML = '<span class="muted small">برای دیدن مقادیر فعلی، همین نماد و تایم‌فریم را روی چارت باز کنید.</span>';
      return;
    }
    var i = S.candles.length - 1, m = S.matrix;
    box.innerHTML = 'مقادیر فعلی: ' + ['up', 'down', 'res', 'sup'].map(function (k) {
      return '<button type="button" class="chip" data-v="' + (m[k][i] === null ? '' : m[k][i].toFixed(2)) + '">' +
        LINE_FA[k] + ' ' + fmt(m[k][i], 2) + '</button>';
    }).join(' ');
  }

  /* ------------------------------------------------------------------ پنل‌ها */
  function openDrawer() { $('#drawer-alarms').classList.add('open'); document.body.classList.add('drawer-open'); setTimeout(positionOverlays, 250); }
  function closeDrawer() { $('#drawer-alarms').classList.remove('open'); document.body.classList.remove('drawer-open'); setTimeout(positionOverlays, 250); }

  function openDialog(name) {
    if (name === 'alarms') {
      if ($('#drawer-alarms').classList.contains('open')) { closeDrawer(); return; }
      openDrawer(); loadAlarms(); resetAlarmFormIfEmpty(); return;
    }
    if (name === 'indicator') buildIndicatorForm(S.tf);
    if (name === 'bale') fillBaleForm();
    if (name === 'diag') { $('#worker-url').value = S.settings.worker_url; $('#diag-out').textContent = ''; }
    $('#dlg-' + name).showModal();
  }

  function resetAlarmFormIfEmpty() {
    var f = $('#alarm-form');
    if (!f.id.value && !f.target_value.value) { f.symbol.value = S.symbol; f.tf.value = S.tf; updateNowValues(); }
  }

  /* ---- تنظیمات اندیکاتور */
  var PARAM_FIELDS = [
    ['smoother', 'Smoother (نرم‌کننده)', 1],
    ['supResPeriod', 'SupResPeriod (دوره حمایت/مقاومت)', 1],
    ['supResPercentage', 'SupResPercentage (درصد)', 'any'],
    ['pricePeriod', 'PricePeriod (دوره CCI)', 1],
    ['overbought', 'Overbought (اشباع خرید)', 'any'],
    ['oversold', 'Oversold (اشباع فروش)', 'any'],
  ];
  var STYLE_FIELDS = [
    ['showCandles', 'کندل‌های Matrix', 'candleUp', 'رنگ صعودی'],
    [null, null, 'candleDown', 'رنگ نزولی'],
    ['showUp', 'خط Up', 'upColor'],
    ['showDown', 'خط Down', 'downColor'],
    ['showRes', 'خط مقاومت', 'resColor'],
    ['showSup', 'خط حمایت', 'supColor'],
    ['showOBOS', 'سطوح OB/OS و صفر', 'obosColor'],
    ['showShapes', 'نقاط اشباع (UP/DOWN shape)', null],
  ];
  var indDraft = null, indTf = null;

  function buildIndicatorForm(tf) {
    if (!indDraft) indDraft = JSON.parse(JSON.stringify({ indicator: S.settings.indicator, style: S.settings.style }));
    indTf = tf;
    $('#ind-tfs').innerHTML = Object.keys(indDraft.indicator).map(function (t) {
      return '<button type="button" data-tf="' + t + '" class="' + (t === tf ? 'on' : '') + '">' + t + '</button>';
    }).join('');
    var p = indDraft.indicator[tf];
    $('#ind-params').innerHTML = PARAM_FIELDS.map(function (f) {
      return '<label>' + f[1] + '<input type="number" data-p="' + f[0] + '" step="' + f[2] + '" value="' + p[f[0]] + '"></label>';
    }).join('');
    var st = indDraft.style;
    $('#ind-style').innerHTML = STYLE_FIELDS.map(function (f) {
      var h = '<div class="style-row">';
      if (f[0]) h += '<label class="check"><input type="checkbox" data-s="' + f[0] + '" ' + (st[f[0]] ? 'checked' : '') + '> ' + f[1] + '</label>';
      else h += '<span></span>';
      if (f[2]) h += '<label class="color">' + (f[3] || '') + '<input type="color" data-s="' + f[2] + '" value="' + st[f[2]] + '"></label>';
      return h + '</div>';
    }).join('') +
      '<div class="style-row"><label>ضخامت خطوط<select data-s="lineWidth">' + [1, 2, 3, 4].map(function (w) {
        return '<option ' + (Number(st.lineWidth) === w ? 'selected' : '') + '>' + w + '</option>';
      }).join('') + '</select></label></div>';
    $('#ind-err').textContent = '';
  }

  function readIndicatorForm() {
    var p = indDraft.indicator[indTf];
    $$('#ind-params input').forEach(function (i) { p[i.dataset.p] = Number(i.value); });
    $$('#ind-style [data-s]').forEach(function (i) {
      indDraft.style[i.dataset.s] = i.type === 'checkbox' ? i.checked : (i.tagName === 'SELECT' ? Number(i.value) : i.value);
    });
  }

  function saveIndicator() {
    readIndicatorForm();
    api('save_settings', indDraft).then(function (j) {
      if (!j.ok) { $('#ind-err').textContent = j.error; return; }
      S.settings = j.settings;
      indDraft = null;
      $('#dlg-indicator').close();
      recompute(); applyStyle(); renderAll();
      toast('تنظیمات ذخیره شد');
    });
  }

  /* ---- بله */
  function fillBaleForm() {
    var f = $('#bale-form'), b = S.settings.bale;
    f.token.value = b.token;
    f.chat_id.value = b.chat_id;
    f.enabled.checked = !!b.enabled;
    $('#bale-chats').innerHTML = '';
    $('#bale-err').textContent = '';
  }

  function baleBody() {
    var f = $('#bale-form');
    return { token: f.token.value.trim(), chat_id: f.chat_id.value.trim(), enabled: f.enabled.checked };
  }

  /* ------------------------------------------------------------------ رویدادها */
  function bindUI() {
    $('#symbols').innerHTML = ['BTC', 'XRP', 'LINK', 'DOGE'].map(function (s) { return '<button data-s="' + s + '">' + s + '</button>'; }).join('');
    $('#tfs').innerHTML = ['1m', '5m', '15m', '1h'].map(function (t) { return '<button data-t="' + t + '">' + t + '</button>'; }).join('');
    var f = $('#alarm-form');
    f.symbol.innerHTML = ['BTC', 'XRP', 'LINK', 'DOGE'].map(function (s) { return '<option value="' + s + '">' + s + '/USDT</option>'; }).join('');
    f.tf.innerHTML = ['1m', '5m', '15m', '1h'].map(function (t) { return '<option>' + t + '</option>'; }).join('');

    function markSeg() {
      $$('#symbols button').forEach(function (b) { b.classList.toggle('on', b.dataset.s === S.symbol); });
      $$('#tfs button').forEach(function (b) { b.classList.toggle('on', b.dataset.t === S.tf); });
    }
    markSeg();

    $('#symbols').addEventListener('click', function (e) {
      var s = e.target.dataset.s; if (!s || s === S.symbol) return;
      S.symbol = s; lsSet('symbol', s); markSeg(); loadChart(); resetAlarmFormIfEmpty();
    });
    $('#tfs').addEventListener('click', function (e) {
      var t = e.target.dataset.t; if (!t || t === S.tf) return;
      S.tf = t; lsSet('tf', t); markSeg(); loadChart(); resetAlarmFormIfEmpty();
    });

    $$('[data-open]').forEach(function (b) { b.addEventListener('click', function () { openDialog(b.dataset.open); }); });
    $$('[data-close]').forEach(function (b) { b.addEventListener('click', closeDrawer); });
    $('#logout').addEventListener('click', function () { api('logout', {}).then(function () { location.reload(); }); });

    // اندازه پنل اندیکاتور
    $('#pane-size').addEventListener('input', function () { applyPaneSize(Number(this.value)); });
    $$('#pane-tools [data-size]').forEach(function (b) {
      b.addEventListener('click', function () { applyPaneSize(currentPanePct() + Number(b.dataset.size) * 10); });
    });
    $('#chart').addEventListener('mouseup', function () { setTimeout(function () { lsSet('pane', String(currentPanePct())); positionOverlays(); }, 50); });

    // فرم آلارم
    $('#target-type').addEventListener('click', function (e) { if (e.target.dataset.v) setTargetType(e.target.dataset.v); });
    f.condition.addEventListener('change', syncFormVisibility);
    f.symbol.addEventListener('change', updateNowValues);
    f.tf.addEventListener('change', updateNowValues);
    $('#now-values').addEventListener('click', function (e) {
      if (e.target.dataset.v) { setTargetType('value'); f.target_value.value = e.target.dataset.v; }
    });
    $('#pick-btn').addEventListener('click', function () {
      if (f.symbol.value !== S.symbol || f.tf.value !== S.tf) { f.symbol.value = S.symbol; f.tf.value = S.tf; }
      setPicking(true);
    });
    $('#pick-cancel').addEventListener('click', function () { setPicking(false); openDrawer(); });
    $('#alarm-reset').addEventListener('click', resetAlarmForm);
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      $('#alarm-err').textContent = '';
      api('alarm_save', formData()).then(function (j) {
        if (!j.ok) { $('#alarm-err').textContent = j.error; return; }
        toast(f.id.value ? 'آلارم به‌روز شد' : 'آلارم ثبت شد');
        if (!S.settings.bale.has_token || !S.settings.bale.chat_id) toast('آلارم ثبت شد — ولی هنوز بله تنظیم نشده!', true);
        resetAlarmForm();
        loadAlarms();
      });
    });
    $('#alarm-list').addEventListener('click', function (e) {
      var act = e.target.dataset.act, item = e.target.closest('.item');
      if (!act || !item) return;
      var a = S.alarms.find(function (x) { return x.id === item.dataset.id; });
      if (!a) return;
      if (act === 'edit') editAlarm(a);
      if (act === 'del' && confirm('این آلارم حذف شود؟')) api('alarm_delete', { id: a.id }).then(loadAlarms);
      if (act === 'toggle') api('alarm_toggle', { id: a.id, enabled: e.target.checked }).then(loadAlarms);
    });
    $('#log-clear').addEventListener('click', function () { api('log_clear', {}).then(loadAlarms); });

    // اندیکاتور
    $('#ind-tfs').addEventListener('click', function (e) {
      if (!e.target.dataset.tf) return;
      readIndicatorForm(); buildIndicatorForm(e.target.dataset.tf);
    });
    $('#ind-copy-all').addEventListener('click', function () {
      readIndicatorForm();
      var src = indDraft.indicator[indTf];
      Object.keys(indDraft.indicator).forEach(function (t) { indDraft.indicator[t] = Object.assign({}, src); });
      toast('روی همه تایم‌فریم‌ها کپی شد (برای اعمال، ذخیره کنید)');
    });
    $('#ind-reset').addEventListener('click', function () {
      indDraft.indicator[indTf] = Object.assign({}, S.defaults.indicator);
      indDraft.style = Object.assign({}, S.defaults.style);
      buildIndicatorForm(indTf);
    });
    $('#ind-save').addEventListener('click', saveIndicator);
    $('#dlg-indicator').addEventListener('close', function () { indDraft = null; });

    // بله
    $('#bale-find').addEventListener('click', function () {
      $('#bale-err').textContent = '';
      $('#bale-chats').innerHTML = '<p class="muted">در حال جستجو…</p>';
      api('bale_chats', { token: $('#bale-form').token.value.trim() }).then(function (j) {
        if (!j.ok) { $('#bale-chats').innerHTML = ''; $('#bale-err').textContent = j.error; return; }
        $('#bale-chats').innerHTML = j.chats.length ? j.chats.map(function (c) {
          return '<button type="button" class="item chat" data-id="' + esc(c.id) + '">' + esc(c.name || '(بدون نام)') +
            ' <small dir="ltr">' + esc(c.id) + '</small></button>';
        }).join('') : '<p class="muted">پیامی پیدا نشد. اول به بات خودتان در بله یک پیام بدهید و دوباره امتحان کنید.</p>';
      });
    });
    $('#bale-chats').addEventListener('click', function (e) {
      var b = e.target.closest('[data-id]'); if (!b) return;
      $('#bale-form').chat_id.value = b.dataset.id;
    });
    $('#bale-test').addEventListener('click', function () {
      $('#bale-err').textContent = '';
      api('bale_test', baleBody()).then(function (j) {
        if (j.ok) toast('پیام آزمایشی ارسال شد ✅'); else $('#bale-err').textContent = j.error;
      });
    });
    $('#bale-save').addEventListener('click', function () {
      api('save_settings', { bale: baleBody() }).then(function (j) {
        if (!j.ok) { $('#bale-err').textContent = j.error; return; }
        S.settings = j.settings;
        $('#dlg-bale').close();
        toast('تنظیمات بله ذخیره شد');
      });
    });

    // اتصال
    $('#worker-save').addEventListener('click', function () {
      api('save_settings', { worker_url: $('#worker-url').value.trim() }).then(function (j) {
        if (!j.ok) { toast(j.error, true); return; }
        S.settings = j.settings; toast('آدرس ورکر ذخیره شد'); loadChart();
      });
    });
    $('#diag-run').addEventListener('click', function () {
      $('#diag-out').textContent = 'در حال تست…';
      api('diag', undefined, 'symbol=' + S.symbol + '&tf=' + S.tf).then(function (j) {
        $('#diag-out').textContent = JSON.stringify(j, null, 2);
      });
    });

    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && S.picking) setPicking(false); });
    document.addEventListener('visibilitychange', function () { if (!document.hidden && S.candles.length) poll(S.loadSeq); });
  }

  /* ------------------------------------------------------------------ بررسی آلارم از مرورگر (پشتیبان کرون) */
  function backgroundCheck() {
    api('check', {}).then(function (j) {
      if (j.ok && j.result && j.result.fired) { toast('🔔 ' + j.result.fired + ' آلارم ارسال شد'); }
      if (j.ok) {
        var c = j.last_cron;
        var ageMin = c ? Math.round((Date.now() / 1000 - c.at) / 60) : null;
        $('#cron-status').textContent = c
          ? (ageMin <= 2 ? '✅ کرون سرور فعال است (آخرین اجرا ' + ageMin + ' دقیقه پیش)' : '⚠️ کرون ' + ageMin + ' دقیقه است اجرا نشده؛ آلارم فقط وقتی صفحه باز است بررسی می‌شود.')
          : '⚠️ کرون سرور هنوز اجرا نشده؛ تا تنظیمش نکنید، آلارم فقط وقتی این صفحه باز است بررسی می‌شود.';
      }
      loadAlarms();
    });
  }

  /* ------------------------------------------------------------------ شروع */
  api('bootstrap').then(function (j) {
    if (!j.ok) { setMsg(j.error || 'خطا'); return; }
    S.settings = j.settings;
    S.defaults = j.defaults;
    if (['BTC', 'XRP', 'LINK', 'DOGE'].indexOf(S.symbol) < 0) S.symbol = 'BTC';
    if (['1m', '5m', '15m', '1h'].indexOf(S.tf) < 0) S.tf = '5m';
    buildChart();
    bindUI();
    resetAlarmForm();
    loadChart();
    loadAlarms();
    backgroundCheck();
    setInterval(function () { if (!document.hidden) backgroundCheck(); }, 20000);
  });
})();

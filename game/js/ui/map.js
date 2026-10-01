// =====================================================================
// نمای نقشه‌ی جهان (SVG + D3)
// ---------------------------------------------------------------------
// - نقشه یک‌بار در یک «فضای ثابت» به اندازه‌ی WORLD_W × WORLD_H رسم می‌شود.
// - زوم و جابه‌جایی (پن) فقط transform گروه اصلی را عوض می‌کند؛ پس با تغییر
//   اندازه‌ی صفحه (مثلاً بالا/پایین رفتن نوار آدرس موبایل) لازم نیست چیزی دوباره رسم شود.
// - رنگ هر ناحیه از تابع fillFor می‌آید که بیرون از این فایل تعیین می‌شود.
// =====================================================================
(function (SG) {
  'use strict';

  const WORLD_W = 1000, WORLD_H = 520;
  const MAX_ZOOM = 60;          // نسبت به حالت «کل جهان»
  const LABEL_PX = 11;          // اندازه‌ی ثابت نام کشورها روی صفحه (پیکسل)
  const LABEL_MIN_AREA = 1800;  // ناحیه باید حداقل این‌قدر پیکسل مربع روی صفحه باشد تا نامش دیده شود

  /**
   * @param {HTMLElement} container
   * @param {object} topo  TopoJSON جهان (SG_DATA.world)
   * @param {object} opts
   * @param {(id:string|null)=>void} opts.onSelect  کلیک روی کشور (یا جای خالی = null)
   * @param {(id:string|null)=>string} opts.fillFor  رنگ هر کشور
   * @param {(id:string)=>string} opts.nameFor       نام فارسی کشور
   * @param {()=>{right:number,bottom:number}} [opts.getOcclusion]  چند پیکسل از راست/پایین نقشه زیر پنل پنهان است
   * @param {(stackId:string)=>void} [opts.onStackClick]  کلیک روی نشان یک نوع نیرو
   */
  function create(container, topo, opts) {
    const obj = topo.objects.countries;
    const features = topojson.feature(topo, obj).features;

    // پروجکشن Natural Earth: ظاهر آشنا و تحریف کم
    const projection = d3.geoNaturalEarth1()
      .fitExtent([[4, 4], [WORLD_W - 4, WORLD_H - 4]], { type: 'Sphere' });
    const path = d3.geoPath(projection);

    const svg = d3.select(container).append('svg')
      .attr('class', 'map-svg')
      .attr('role', 'img')
      .attr('aria-label', 'نقشه‌ی جهان');

    // الگوی هاشور برای کشورهایی که بخشی از خاکشان اشغال شده
    const defs = svg.append('defs');
    const hatch = defs.append('pattern').attr('id', 'occ-hatch').attr('patternUnits', 'userSpaceOnUse')
      .attr('width', 4).attr('height', 4).attr('patternTransform', 'rotate(45)');
    hatch.append('rect').attr('width', 4).attr('height', 4).attr('fill', 'none');
    hatch.append('line').attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', 4).attr('stroke', '#000').attr('stroke-opacity', 0.45).attr('stroke-width', 1.6);

    const root = svg.append('g').attr('class', 'map-root');
    // صاحب فعلی هر ناحیه (بعد از الحاق ممکن است عوض شود)
    let ownerOf = id => id;

    // اقیانوس و خطوط مختصات
    root.append('path').datum({ type: 'Sphere' }).attr('class', 'sphere').attr('d', path)
      .on('click', () => opts.onSelect(null));
    root.append('path').datum(d3.geoGraticule10()).attr('class', 'graticule').attr('d', path);

    // نواحی (هر کشور ممکن است چند ناحیه داشته باشد، مثل سرزمین‌های وابسته)
    const regions = root.append('g').attr('class', 'regions')
      .selectAll('path')
      .data(features)
      .join('path')
      .attr('class', d => 'region' + (d.properties.o ? '' : ' unowned'))
      .attr('d', path)
      .on('click', (event, d) => opts.onSelect(d.properties.o ? ownerOf(d.properties.o) : null));

    // لایه‌ی هاشور (اشغال)
    const hatchLayer = root.append('g').attr('class', 'hatch-layer');

    // مرز بین کشورها (فقط جایی که مالک دو طرف فرق دارد) و خط ساحلی
    const bordersPath = root.append('path').attr('class', 'borders');
    function drawBorders() {
      bordersPath.attr('d', path(topojson.mesh(topo, obj, (a, b) => a !== b && ownerOf(a.properties.o) !== ownerOf(b.properties.o))));
    }
    drawBorders();
    root.append('path').attr('class', 'coast')
      .attr('d', path(topojson.mesh(topo, obj, (a, b) => a === b)));

    // دور کشور بازیکن و کشور انتخاب‌شده
    const playerOutline = root.append('path').attr('class', 'outline-player');
    const selectOutline = root.append('path').attr('class', 'outline-select');

    // --- «شکل اصلی» هر کشور: بزرگ‌ترین چندضلعیِ سرزمین اصلی (برای برچسب و زوم) ---
    // سرزمین اصلی = ناحیه‌ای که شناسه‌اش با کد کشور یکی است؛ پس برچسب دانمارک
    // روی خود دانمارک می‌آید نه گرینلند، و برای فرانسه روی فرانسه نه گویان.
    const mainShape = {};
    const hasHome = new Set(features.filter(f => f.id === f.properties.o).map(f => f.id));
    for (const f of features) {
      const id = f.properties.o;
      if (!id) continue;
      if (hasHome.has(id) && f.id !== id) continue;
      const polys = f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [f.geometry.coordinates];
      for (const coords of polys) {
        const poly = { type: 'Polygon', coordinates: coords };
        const area = path.area(poly);
        if (!mainShape[id] || area > mainShape[id].area) {
          mainShape[id] = { area, bounds: path.bounds(poly), centroid: path.centroid(poly) };
        }
      }
    }

    // --- برچسب نام کشورها ---
    const labelData = Object.entries(mainShape).map(([id, s]) => ({ id, ...s }));
    const labelLayer = root.append('g').attr('class', 'labels');
    const labels = labelLayer.selectAll('text')
      .data(labelData)
      .join('text')
      .attr('x', d => d.centroid[0])
      .attr('y', d => d.centroid[1])
      .text(d => opts.nameFor(d.id));

    // --- لایه‌ی شهرها ---
    // پایتخت ★ ، شهرهای دیگر نقطه. نام شهرها با زوم بیشتر ظاهر می‌شود.
    const cityLayer = root.append('g').attr('class', 'cities');
    let cityData = [];
    function setCities(list) {
      cityData = list.map(c => { const [x, y] = projection(c.pos); return { ...c, x, y }; });
      cityLayer.selectAll('g.city').data(cityData, d => d.id).join(enter => {
        const e = enter.append('g');
        e.append('text').attr('class', 'c-mark');
        e.append('text').attr('class', 'c-flag').attr('x', 7).attr('y', -6).text('⚑');
        e.append('text').attr('class', 'c-name').attr('y', -9);
        e.append('text').attr('class', 'c-battle').attr('y', 14).text('⚔️');
        return e;
      })
        .attr('class', d => 'city' + (d.capital ? ' capital' : '') + (d.own ? ' own' : '') + (d.occ ? ' occupied' : '') + (d.battle ? ' battle' : '') + (d.front ? ' front' : ''))
        .call(sel => {
          sel.select('.c-mark').text(d => (d.capital ? '★' : '●'));
          sel.select('.c-name').text(d => d.name);
          sel.select('.c-flag').attr('fill', d => d.occ || null);
        });
      updateCities();
    }
    function updateCities() {
      const k = currentK || 1, rel = k / fitScale;
      cityLayer.selectAll('g.city')
        .attr('transform', d => `translate(${d.x},${d.y}) scale(${1 / k})`)
        // شهرهای جبهه (جنگ، اشغال) زودتر دیده می‌شوند
        .attr('display', d => (rel >= (d.capital ? 1.6 : d.own || d.front ? 2 : 4) ? null : 'none'))
        .classed('named', d => rel >= (d.capital ? 2.5 : d.front ? 3 : 4));
    }

    // --- لایه‌ی شلیک موشک/پهپاد (خط کمانی از محل پرتاب تا هدف) ---
    const strikeLayer = root.append('g').attr('class', 'strikes');
    function setStrikes(list) {
      // هم‌مسیرها یکی می‌شوند تا نقشه شلوغ نشود
      const seen = new Set(), data = [];
      for (const s of list) {
        const key = s.from.map(v => Math.round(v)).join(',') + '>' + s.to.join(',') + s.own;
        if (seen.has(key)) continue;
        seen.add(key);
        const [x1, y1] = projection(s.from), [x2, y2] = projection(s.to);
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - Math.hypot(x2 - x1, y2 - y1) * 0.25;
        data.push({ ...s, key, d: `M${x1},${y1} Q${mx},${my} ${x2},${y2}`, x2, y2 });
      }
      strikeLayer.selectAll('path').data(data, d => d.key).join('path').attr('class', d => 'strike' + (d.own ? ' own' : ' enemy')).attr('d', d => d.d);
      strikeLayer.selectAll('text').data(data, d => d.key).join('text').attr('class', 'boom').text('💥');
      updateStrikes();
    }
    function updateStrikes() {
      const k = currentK || 1;
      strikeLayer.selectAll('path').attr('stroke-width', 1.6 / k);
      strikeLayer.selectAll('text').attr('transform', d => `translate(${d.x2},${d.y2}) scale(${1 / k})`);
    }

    // --- لایه‌ی نیروها ---
    // هر محل (شهر یا مرز) یک گروه است؛ داخلش برای هر نوع واحد یک نشان (آیکون + تعداد).
    // با زوم کم، گروه جمع می‌شود و فقط یک نشان «🎖️ تعداد نوع» دارد.
    const routeLayer = root.append('g').attr('class', 'force-routes');
    const forceLayer = root.append('g').attr('class', 'forces');
    let groupData = [];
    const CHIP_W = 46, CHIP_H = 20, COLS = 4;

    function setForces(groups, routes) {
      groupData = groups.map(g => { const [x, y] = projection(g.pos); return { ...g, x, y }; });
      routeLayer.selectAll('line').data(routes.map(r => {
        const [x1, y1] = projection(r.from), [x2, y2] = projection(r.to);
        return { ...r, x1, y1, x2, y2 };
      }), d => d.id).join('line').classed('enemy', d => !!d.enemy)
        .attr('x1', d => d.x1).attr('y1', d => d.y1).attr('x2', d => d.x2).attr('y2', d => d.y2);

      const groupsSel = forceLayer.selectAll('g.fgroup').data(groupData, d => d.key).join('g').attr('class', 'fgroup');
      // نشان جمع‌شده (زوم کم)
      groupsSel.selectAll('g.fcompact').data(d => [d]).join(enter => {
        const e = enter.append('g').attr('class', 'fcompact')
          .on('click', (event, d) => { event.stopPropagation(); zoomToPoint(d.pos, 4); });
        e.append('rect').attr('x', -20).attr('width', 40).attr('height', 18).attr('rx', 9);
        e.append('text');
        return e;
      }).call(sel => { sel.select('rect').attr('y', d => (d.enemy ? -24 : 6)); sel.select('text').attr('y', d => (d.enemy ? -14 : 16)); })
        .classed('moving', d => d.moving).classed('enemy', d => !!d.enemy).select('text').text(d => (d.enemy ? '☠️' : '🎖️') + d.stacks.length.toLocaleString('fa-IR'));
      // نشان هر نوع واحد (زوم زیاد)
      groupsSel.selectAll('g.chip').data(d => d.stacks.map((s, i) => ({ ...s, i, n: d.stacks.length })), s => s.id).join(enter => {
        const e = enter.append('g').attr('class', 'chip')
          .on('click', (event, s) => { event.stopPropagation(); if (opts.onStackClick) opts.onStackClick(s.id); });
        e.append('rect').attr('width', CHIP_W - 2).attr('height', CHIP_H - 2).attr('rx', 5);
        e.append('text').attr('class', 'ch-icon').attr('x', CHIP_W - 13).attr('y', CHIP_H / 2);
        e.append('text').attr('class', 'ch-num').attr('x', (CHIP_W - 22) / 2).attr('y', CHIP_H / 2);
        return e;
      })
        .classed('enemy', s => !!s.enemy).classed('fighting', s => !!s.fighting)
        .attr('transform', s => {
          // نیروی خودی زیر نقطه، نیروی دشمن بالای آن (تا در شهر درگیر روی هم نیفتند)
          const cols = Math.min(COLS, s.n), row = Math.floor(s.i / COLS), col = s.i % COLS;
          const y = s.enemy ? -CHIP_H - 6 - row * CHIP_H : 8 + row * CHIP_H;
          return `translate(${-cols * CHIP_W / 2 + col * CHIP_W},${y})`;
        })
        .classed('moving', s => s.moving).classed('low', s => s.low).classed('selected', s => s.selected)
        .call(sel => { sel.select('.ch-icon').text(s => s.icon); sel.select('.ch-num').text(s => s.label); });
      // برچسب زمان رسیدن
      groupsSel.selectAll('text.eta').data(d => (d.eta ? [d] : [])).join('text').attr('class', 'eta').attr('y', 2).text(d => d.eta);
      updateForces();
    }

    function updateForces() {
      const k = currentK || 1, rel = k / fitScale;
      const compact = rel < 2.2;
      forceLayer.selectAll('g.fgroup').attr('transform', d => `translate(${d.x},${d.y}) scale(${1 / k})`);
      forceLayer.selectAll('g.fcompact').attr('display', compact ? null : 'none');
      forceLayer.selectAll('g.chip').attr('display', compact ? 'none' : null);
    }

    function scaleArmies() { updateCities(); updateForces(); updateStrikes(); }

    // --- راهنمای موس (فقط دسکتاپ) ---
    const tooltip = d3.select(container).append('div').attr('class', 'map-tooltip').style('display', 'none');
    const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (hasMouse) {
      regions
        .on('mousemove', (event, d) => {
          if (!d.properties.o) { tooltip.style('display', 'none'); return; }
          const [x, y] = d3.pointer(event, container);
          tooltip.style('display', 'block').text(opts.nameFor(ownerOf(d.properties.o)))
            .style('left', (x + 14) + 'px').style('top', (y + 10) + 'px');
        })
        .on('mouseleave', () => tooltip.style('display', 'none'));
    }

    // --- زوم و پن ---
    let fitScale = 1;     // مقیاسی که کل جهان را در صفحه جا می‌دهد
    let currentK = 1;
    let labelFrame = null;

    const zoom = d3.zoom()
      .clickDistance(6)   // حرکت کوچک انگشت هنوز «کلیک» حساب شود
      .on('zoom', event => {
        root.attr('transform', event.transform);
        currentK = event.transform.k;
        // به‌روزرسانی برچسب‌ها حداکثر یک‌بار در هر فریم
        if (!labelFrame) labelFrame = requestAnimationFrame(updateLabels);
      });
    svg.call(zoom).on('dblclick.zoom', null);

    function updateLabels() {
      labelFrame = null;
      const k = currentK;
      labelLayer.attr('font-size', LABEL_PX / k);
      labels.attr('display', d => (ownerOf(d.id) === d.id && d.area * k * k > LABEL_MIN_AREA ? null : 'none'));
      hatch.attr('patternTransform', `rotate(45) scale(${1.4 / k})`);
      scaleArmies();
    }

    function size() {
      const r = container.getBoundingClientRect();
      return { w: Math.max(r.width, 1), h: Math.max(r.height, 1) };
    }

    /** محدوده‌ی زوم را با اندازه‌ی فعلی صفحه هماهنگ کن */
    function updateExtent() {
      const { w, h } = size();
      // «کل جهان» = مقیاسی که کل نقشه داخل صفحه جا شود
      fitScale = Math.min(w / WORLD_W, h / WORLD_H);
      zoom.extent([[0, 0], [w, h]])
        .scaleExtent([fitScale * 0.9, fitScale * MAX_ZOOM])
        .translateExtent([[-WORLD_W * 0.15, -WORLD_H * 0.15], [WORLD_W * 1.15, WORLD_H * 1.15]]);
    }

    /** نمایش کل جهان */
    function resetView(animate = true) {
      updateExtent();
      const { w, h } = size();
      const t = d3.zoomIdentity
        .translate((w - WORLD_W * fitScale) / 2, (h - WORLD_H * fitScale) / 2)
        .scale(fitScale);
      (animate ? svg.transition().duration(600) : svg).call(zoom.transform, t);
    }

    /** زوم روی یک کشور */
    function zoomTo(id, { padding = 0.4, maxRelZoom = 8 } = {}) {
      const s = mainShape[id];
      if (!s) return;
      updateExtent();
      // فقط بخشی از نقشه که زیر پنل نیست را حساب می‌کنیم
      const occ = opts.getOcclusion ? opts.getOcclusion() : { right: 0, bottom: 0 };
      const full = size();
      const w = Math.max(full.w - occ.right, 100), h = Math.max(full.h - occ.bottom, 100);
      const [[x0, y0], [x1, y1]] = s.bounds;
      const dx = Math.max(x1 - x0, 1), dy = Math.max(y1 - y0, 1);
      let k = (1 - padding) / Math.max(dx / w, dy / h);
      k = Math.min(k, fitScale * maxRelZoom);
      const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
      const t = d3.zoomIdentity.translate(w / 2 - cx * k, h / 2 - cy * k).scale(k);
      svg.transition().duration(750).call(zoom.transform, t);
    }

    /** زوم روی یک نقطه (مثلاً محل ارتش) */
    function zoomToPoint(lonlat, relZoom = 6) {
      updateExtent();
      const occ = opts.getOcclusion ? opts.getOcclusion() : { right: 0, bottom: 0 };
      const full = size();
      const w = Math.max(full.w - occ.right, 100), h = Math.max(full.h - occ.bottom, 100);
      const [x, y] = projection(lonlat);
      const k = fitScale * relZoom;
      svg.transition().duration(700).call(zoom.transform, d3.zoomIdentity.translate(w / 2 - x * k, h / 2 - y * k).scale(k));
    }

    function zoomBy(factor) {
      svg.transition().duration(250).call(zoom.scaleBy, factor);
    }

    // --- رنگ‌آمیزی و هایلایت ---
    function outlineOf(id) {
      if (!id) return null;
      return path(topojson.merge(topo, obj.geometries.filter(g => g.properties.o && ownerOf(g.properties.o) === id)));
    }

    function refresh() {
      regions.attr('fill', d => opts.fillFor(d.properties.o ? ownerOf(d.properties.o) : null));
    }

    /** صاحب نواحی عوض شد (الحاق): مرزها و دور کشورها دوباره رسم می‌شوند */
    let playerId = null;
    function setOwner(fn) {
      ownerOf = fn || (id => id);
      drawBorders();
      if (playerId) playerOutline.attr('d', outlineOf(playerId));
      updateLabels();
    }

    /** هاشور روی کشورهایی که بخشی از خاکشان اشغال شده */
    function setHatch(ids) {
      const set = new Set(ids);
      hatchLayer.selectAll('path').data(features.filter(f => f.properties.o && set.has(f.properties.o)), f => f.id)
        .join('path').attr('d', path).attr('fill', 'url(#occ-hatch)');
    }

    function setSelected(id) {
      selectOutline.attr('d', outlineOf(id));
      regions.classed('selected', d => !!id && !!d.properties.o && ownerOf(d.properties.o) === id);
    }

    function setPlayer(id) {
      playerId = id;
      playerOutline.attr('d', outlineOf(id));
    }

    // تغییر اندازه‌ی صفحه: فقط محدوده‌ی زوم به‌روز می‌شود، نه رسم دوباره
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateExtent, 150);
    });

    refresh();
    resetView(false);
    updateLabels();

    return { refresh, setSelected, setPlayer, zoomTo, zoomBy, resetView, setForces, setCities, zoomToPoint, setStrikes, setOwner, setHatch };
  }

  SG.MapView = { create };
})(window.SG = window.SG || {});

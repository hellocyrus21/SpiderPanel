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
   * @param {(armyId:string)=>void} [opts.onArmyClick]  کلیک روی نشان ارتش
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

    const root = svg.append('g').attr('class', 'map-root');

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
      .on('click', (event, d) => opts.onSelect(d.properties.o || null));

    // مرز بین کشورها (فقط جایی که مالک دو طرف فرق دارد) و خط ساحلی
    root.append('path').attr('class', 'borders')
      .attr('d', path(topojson.mesh(topo, obj, (a, b) => a !== b && a.properties.o !== b.properties.o)));
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

    // --- لایه‌ی ارتش‌ها (روی همه چیز) ---
    // هر ارتش: خط‌چین مسیر حرکت + نشان (آیکون و تعداد واحد) با اندازه‌ی ثابت روی صفحه
    const routeLayer = root.append('g').attr('class', 'army-routes');
    const armyLayer = root.append('g').attr('class', 'armies');
    let armyData = [];

    function setArmies(list) {
      armyData = list.map(a => {
        const [x, y] = projection(a.pos);
        const dest = a.dest ? projection(a.dest) : null;
        return { ...a, x, y, dx: dest && dest[0], dy: dest && dest[1] };
      });
      routeLayer.selectAll('line').data(armyData.filter(a => a.dest), d => d.id).join('line')
        .attr('x1', d => d.x).attr('y1', d => d.y).attr('x2', d => d.dx).attr('y2', d => d.dy);
      const g = armyLayer.selectAll('g.army').data(armyData, d => d.id).join(enter => {
        const e = enter.append('g').attr('class', 'army').style('cursor', 'pointer')
          .on('click', (event, d) => { event.stopPropagation(); if (opts.onArmyClick) opts.onArmyClick(d.id); });
        e.append('rect').attr('x', -21).attr('y', -12).attr('width', 42).attr('height', 24).attr('rx', 6);
        e.append('text').attr('class', 'a-icon').attr('x', 9).attr('y', 1);
        e.append('text').attr('class', 'a-num').attr('x', -9).attr('y', 1);
        e.append('text').attr('class', 'a-eta').attr('y', -18);
        return e;
      });
      g.classed('moving', d => !!d.dest).classed('selected', d => !!d.selected).classed('low', d => d.supply < 50);
      g.select('.a-icon').text(d => d.icon);
      g.select('.a-num').text(d => d.label);
      g.select('.a-eta').text(d => d.eta || '');
      scaleArmies();
    }

    function scaleArmies() {
      const k = currentK || 1;
      armyLayer.selectAll('g.army').attr('transform', d => `translate(${d.x},${d.y}) scale(${1 / k})`);
    }

    // --- راهنمای موس (فقط دسکتاپ) ---
    const tooltip = d3.select(container).append('div').attr('class', 'map-tooltip').style('display', 'none');
    const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (hasMouse) {
      regions
        .on('mousemove', (event, d) => {
          if (!d.properties.o) { tooltip.style('display', 'none'); return; }
          const [x, y] = d3.pointer(event, container);
          tooltip.style('display', 'block').text(opts.nameFor(d.properties.o))
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
      labels.attr('display', d => (d.area * k * k > LABEL_MIN_AREA ? null : 'none'));
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
      return path(topojson.merge(topo, obj.geometries.filter(g => g.properties.o === id)));
    }

    function refresh() {
      regions.attr('fill', d => opts.fillFor(d.properties.o || null));
    }

    function setSelected(id) {
      selectOutline.attr('d', outlineOf(id));
      regions.classed('selected', d => !!id && d.properties.o === id);
    }

    function setPlayer(id) {
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

    return { refresh, setSelected, setPlayer, zoomTo, zoomBy, resetView, setArmies, zoomToPoint };
  }

  SG.MapView = { create };
})(window.SG = window.SG || {});

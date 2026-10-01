// =====================================================================
// ساخت فایل‌های داده‌ی بازی
// اجرا:  cd game/tools && npm install && npm run build
// خروجی:
//   ../data/world.js        نقشه‌ی جهان (TopoJSON) — هر ناحیه مالکش را دارد
//   ../data/countries.js    داده‌ی ~۱۹۵ کشور
//   ../data/scenario_2026.js رابطه‌ها، پیمان‌ها، تحریم‌ها و جنگ‌های شروع ۲۰۲۶
//   ../lib/*.js و ../fonts/*  کتابخانه‌ها و فونت‌ها به‌صورت لوکال (بدون CDN)
// =====================================================================
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import * as topojson from 'topojson-client';
import { geoCentroid, geoArea, geoContains } from 'd3';
import * as S from './source-data.mjs';

const require = createRequire(import.meta.url);
const iso = require('i18n-iso-countries');
iso.registerLocale(require('i18n-iso-countries/langs/fa.json'));

const OUT = path.resolve('..');
const world = require('world-atlas/countries-50m.json');
const geoms = world.objects.countries.geometries;

// ---------- ۱) مالک هر ناحیه‌ی نقشه ----------
const warnings = [];
for (const g of geoms) {
  const a3 = g.id ? iso.numericToAlpha3(g.id) : undefined;
  let owner = S.NAMED_GEOMETRY_OWNER[g.properties.name] || S.TERRITORY_OWNER[a3] || a3;
  if (a3 === 'ATA') owner = null; // جنوبگان: مالک ندارد
  if (owner && !S.BASE[owner]) { warnings.push(`no data for ${owner} (${g.properties.name})`); owner = null; }
  g.id = a3 || g.properties.name;            // شناسه‌ی ناحیه
  g.properties = { o: owner };               // o = owner (کد سه‌حرفی کشور مالک)
}

// ---------- ۲) همسایه‌های زمینی (خودکار از مرزهای مشترک نقشه) ----------
const neighborIdx = topojson.neighbors(geoms);
const landNeighbors = {};
geoms.forEach((g, i) => {
  const a = g.properties.o; if (!a) return;
  for (const j of neighborIdx[i]) {
    const b = geoms[j].properties.o;
    if (!b || b === a) continue;
    (landNeighbors[a] ||= new Set()).add(b);
  }
});
// روی هم افتادن خطوط برخی سرزمین‌های دور (مثل گویان فرانسه) همسایه‌ی ساختگی نسازد
const FAKE = [['FRA', 'BRA'], ['FRA', 'SUR'], ['NLD', 'VEN'], ['GBR', 'ARG'], ['DNK', 'CAN'],
  ['FRA', 'NLD']];
// توجه: فرانسه و هلند در جزیره‌ی سنت‌مارتن مرز دارند؛ در اروپا مرز مستقیم ندارند.
for (const [a, b] of FAKE) { landNeighbors[a]?.delete(b); landNeighbors[b]?.delete(a); }

const seaNeighbors = {};
for (const [a, b] of S.SEA_NEIGHBORS) {
  (seaNeighbors[a] ||= new Set()).add(b);
  (seaNeighbors[b] ||= new Set()).add(a);
}

// ---------- ۲ب) موقعیت روی نقشه: پایتخت (یا مرکز سرزمین اصلی) و نقطه‌های مرزی ----------
const r2 = v => Math.round(v * 100) / 100;
const homePos = {};
for (const g of geoms) {
  const id = g.properties.o;
  if (!id || g.id !== id) continue;           // فقط سرزمین اصلی
  const f = topojson.feature(world, g);
  const polys = f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [f.geometry.coordinates];
  let best = null, bestA = -1;
  for (const coords of polys) {
    const poly = { type: 'Polygon', coordinates: coords };
    const a = geoArea(poly);
    if (a > bestA) { bestA = a; best = poly; }
  }
  homePos[id] = geoCentroid(best).map(r2);
}
for (const [id, p] of Object.entries(S.CAPITAL_POS)) homePos[id] = p;
// کشورهایی که سرزمین اصلی‌شان شناسه‌ی جدا دارد
for (const g of geoms) {
  const id = g.properties.o;
  if (id && !homePos[id]) homePos[id] = geoCentroid(topojson.feature(world, g)).map(r2);
}

// نقطه‌ی مرزی هر جفت همسایه‌ی زمینی = نقطه‌ی وسط طولانی‌ترین تکه‌ی مرز مشترک
const borderPos = {};
for (const [a, set] of Object.entries(landNeighbors)) {
  for (const b of set) {
    if (a > b) continue;
    const mesh = topojson.mesh(world, world.objects.countries, (x, y) =>
      (x.properties.o === a && y.properties.o === b) || (x.properties.o === b && y.properties.o === a));
    let line = null;
    for (const l of mesh.coordinates) if (!line || l.length > line.length) line = l;
    if (!line) continue;
    const p = line[Math.floor(line.length / 2)].map(r2);
    (borderPos[a] ||= {})[b] = p;
    (borderPos[b] ||= {})[a] = p;
  }
}

// ---------- ۳) ساخت داده‌ی هر کشور ----------
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const r1 = v => Math.round(v * 10) / 10;

function persianName(id) {
  return S.NAME_OVERRIDES[id] || iso.getName(id, 'fa') || id;
}

// برآورد قدرت نظامی کشورهایی که داده‌ی دستی ندارند، از روی بودجه‌ی نظامی و سطح فناوری
function estimateMilitary(gdp, pop, pct) {
  const budget = gdp * pct / 100;                                  // میلیارد دلار
  const P = 100 * Math.log10(1 + budget) / Math.log10(1 + 1000);   // ۰ تا ۱۰۰
  const perCapita = gdp / Math.max(pop, 0.001);                    // هزار دلار
  const tech = clamp(Math.log10(1 + perCapita) / Math.log10(81), 0.15, 1);
  const r = v => Math.round(clamp(v, 0, 100));
  return {
    active: Math.round(clamp(pop * 1000 * 0.003 * (0.5 + pct / 2), 0.1, pop * 1000 * 0.02)),
    land: r(P * 0.95), air: r(P * (0.4 + 0.6 * tech)), navy: r(P * 0.6 * (0.5 + 0.5 * tech)),
    missile: r(P * 0.45 * tech), airDefense: r(P * (0.35 + 0.45 * tech)),
    cyber: r(P * 0.8 * tech), drone: r(P * 0.65 * tech),
  };
}

/**
 * شهرهای یک کشور: [{ id, name, pos, capital, tags, share:{gdp,energy}, generic? }] — اولی همیشه پایتخت است.
 * کشورهایی که فهرست دستی ندارند: پایتخت + (برای کشورهای پرجمعیت) ۱ تا ۲ «منطقه‌ی» مجازی
 * به سمت طولانی‌ترین مرزها، تا جنگ با آن‌ها هم شهر به شهر پیش برود (generic = نامش ساختگی است).
 * share = سهم شهر از اقتصاد و انرژی کشور (برای فتح، مرحله‌ی ۴): پایتخت ۳۵٪، شهرهای نفتی (oil) سهم انرژی بیشتر.
 */
const DIRS = (dx, dy) => (Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'شرق' : 'غرب') : (dy > 0 ? 'شمال' : 'جنوب'));
function virtualCities(id, home, pop) {
  const want = pop >= 10 ? 2 : pop >= 3 ? 1 : 0;
  if (!want || !borderPos[id]) return [];
  const shape = topojson.merge(world, geoms.filter(g => g.properties.o === id));
  const cands = Object.values(borderPos[id])
    .map(p => ({ p, d: Math.hypot(p[0] - home[0], p[1] - home[1]) }))
    .filter(x => x.d > 1.2)
    .sort((a, b) => b.d - a.d);
  const out = [], used = new Set();
  for (const { p } of cands) {
    if (out.length >= want) break;
    const dir = DIRS(p[0] - home[0], p[1] - home[1]);
    if (used.has(dir)) continue;
    // نقطه‌ای بین پایتخت و مرز که داخل خاک کشور باشد
    for (const t of [0.6, 0.5, 0.4, 0.7]) {
      const pt = [r2(home[0] + (p[0] - home[0]) * t), r2(home[1] + (p[1] - home[1]) * t)];
      if (geoContains(shape, pt)) { out.push({ name: dir + ' ' + persianName(id), pos: pt }); used.add(dir); break; }
    }
  }
  return out;
}

function withShares(list) {
  const n = list.length;
  const ew = list.map(c => (c.tags.includes('oil') ? 4 : 1));
  const esum = ew.reduce((a, b) => a + b, 0);
  const r3 = v => Math.round(v * 1000) / 1000;
  list.forEach((c, i) => {
    c.share = { gdp: r3(n === 1 ? 1 : c.capital ? 0.35 : 0.65 / (n - 1)), energy: r3(ew[i] / esum) };
  });
  return list;
}

function buildCities(id, home, capitalName, pop) {
  const list = S.CITIES[id];
  if (!list) {
    const cap = { id: id + '-0', name: capitalName || 'پایتخت ' + persianName(id), pos: home, capital: true, tags: [], generic: !capitalName };
    const extra = virtualCities(id, home, pop).map((v, i) => ({ id: id + '-' + (i + 1), name: v.name, pos: v.pos, capital: false, tags: [], generic: true }));
    return withShares([cap, ...extra]);
  }
  return withShares(list.map(([name, lon, lat, tags], i) => ({
    id: id + '-' + i, name, pos: i === 0 ? home : [lon, lat], capital: i === 0,
    tags: tags ? tags.split(' ') : [],
  })));
}

const countries = {};
for (const [id, [gdp, pop, pct, gov, stab]] of Object.entries(S.BASE)) {
  const d = S.DETAILED[id];
  const est = estimateMilitary(gdp, pop, pct);
  const military = d
    ? { active: d.active, nuclear: d.nuclear, ...d.mil }
    : { active: est.active, nuclear: false, land: est.land, air: est.air, navy: est.navy,
        missile: est.missile, airDefense: est.airDefense, cyber: est.cyber, drone: est.drone };

  const energyPair = d?.energy || S.ENERGY[id];
  const consumption = energyPair ? energyPair[1] : r1(0.09 * gdp + 0.15 * pop);
  const production = energyPair ? energyPair[0] : r1(consumption * 0.5);

  countries[id] = {
    id,
    name: persianName(id),
    playable: id in S.PLAYABLE,
    difficulty: S.PLAYABLE[id] || 0,
    detailed: !!d,
    capital: d?.capital || null,
    gov,
    gdp,                     // میلیارد دلار
    population: pop,         // میلیون نفر
    stability: stab,         // ۰ تا ۱۰۰
    militarySpendPct: pct,   // درصد GDP
    inflation: (S.MACRO[id] || [4, 0.5])[0],  // تورم سالانه ٪
    debtRatio: (S.MACRO[id] || [4, 0.5])[1],  // بدهی دولت / GDP
    military,
    energy: { production, consumption },
    terrain: d?.terrain || 'plain',
    pos: homePos[id] || [0, 0],                // [طول, عرض] محل پایتخت/مرکز
    cities: buildCities(id, homePos[id] || [0, 0], d?.capital, pop),
    borderPos: borderPos[id] || {},            // نقطه‌ی مرزی با هر همسایه‌ی زمینی
    neighbors: [...(landNeighbors[id] || [])].sort(),
    seaNeighbors: [...(seaNeighbors[id] || [])].filter(x => !landNeighbors[id]?.has(x)).sort(),
  };
}

// کنترل: هر کشوری در جدول روی نقشه باشد
const onMap = new Set(geoms.map(g => g.properties.o).filter(Boolean));
for (const id of Object.keys(countries)) if (!onMap.has(id)) warnings.push(`not on map: ${id}`);
// کنترل: کدهای استفاده‌شده در رابطه‌ها/پیمان‌ها وجود داشته باشند
const check = (id, where) => { if (!countries[id]) warnings.push(`unknown ${id} in ${where}`); };
for (const [a, row] of Object.entries(S.RELATIONS)) { check(a, 'RELATIONS'); Object.keys(row).forEach(b => check(b, 'RELATIONS.' + a)); }
S.ALLIANCES.forEach(al => al.members.forEach(m => check(m, al.id)));
S.DEFENSE_PACTS.flat().forEach(m => check(m, 'DEFENSE_PACTS'));
S.SANCTIONS.flat().forEach(m => check(m, 'SANCTIONS'));
S.SEA_NEIGHBORS.flat().forEach(m => check(m, 'SEA_NEIGHBORS'));
Object.keys(S.MACRO).forEach(m => check(m, 'MACRO'));
Object.keys(S.CAPITAL_POS).forEach(m => check(m, 'CAPITAL_POS'));
Object.keys(S.CITIES).forEach(m => { check(m, 'CITIES'); if (!S.CAPITAL_POS[m]) warnings.push('city list without capital pos: ' + m); });

// ---------- ۴) نوشتن فایل‌ها ----------
// داده‌ها به‌صورت فایل .js (نه .json) نوشته می‌شوند تا بازی با دابل‌کلیک روی
// index.html هم اجرا شود؛ مرورگرها خواندن فایل .json را از روی دیسک (file://) مسدود می‌کنند.
const header = '// این فایل خودکار ساخته شده (tools/build-data.mjs). دستی ویرایش نکنید؛ tools/source-data.mjs را ویرایش کنید.\n' +
  'window.SG_DATA = window.SG_DATA || {};\n';
const write = (file, body) => {
  fs.writeFileSync(path.join(OUT, file), header + body);
  console.log('wrote', file, (fs.statSync(path.join(OUT, file)).size / 1024).toFixed(0) + 'KB');
};

write('data/world.js', 'SG_DATA.world = ' + JSON.stringify(world) + ';\n');
write('data/countries.js', 'SG_DATA.countries = ' + JSON.stringify(countries, null, 1) + ';\n');
write('data/scenario_2026.js', 'SG_DATA.scenario = ' + JSON.stringify({
  id: 'world_2026',
  name: 'جهان ۲۰۲۶',
  startDate: { year: 2026, month: 1 },
  alliances: S.ALLIANCES,
  defensePacts: S.DEFENSE_PACTS,
  blocBonus: S.BLOC_BONUS,
  relations: S.RELATIONS,
  wars: S.WARS,
  sanctions: S.SANCTIONS,
}, null, 1) + ';\n');

// کتابخانه‌ها و فونت لوکال
// مسیر مستقیم داخل node_modules (برخی پکیج‌ها اجازه‌ی require.resolve زیرمسیر را نمی‌دهند)
const copy = (from, to) => { fs.copyFileSync(path.join('node_modules', from), path.join(OUT, to)); console.log('copied', to); };
copy('d3/dist/d3.min.js', 'lib/d3.min.js');
copy('topojson-client/dist/topojson-client.min.js', 'lib/topojson-client.min.js');
copy('d3/LICENSE', 'lib/d3-LICENSE.txt');
copy('topojson-client/LICENSE', 'lib/topojson-client-LICENSE.txt');
const vz = 'node_modules/vazirmatn';
for (const w of ['Regular', 'Bold']) {
  fs.copyFileSync(path.join(vz, `fonts/webfonts/Vazirmatn-${w}.woff2`), path.join(OUT, `fonts/Vazirmatn-${w}.woff2`));
}
fs.copyFileSync(path.join(vz, 'OFL.txt'), path.join(OUT, 'fonts/Vazirmatn-OFL.txt'));

console.log(`\n${Object.keys(countries).length} countries, ${geoms.length} map regions`);
if (warnings.length) console.log('WARNINGS:\n  ' + warnings.join('\n  '));

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
    military,
    energy: { production, consumption },
    terrain: d?.terrain || 'plain',
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

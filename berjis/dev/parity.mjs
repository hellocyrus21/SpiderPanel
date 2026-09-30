// مقایسه خروجی matrix.js و matrix.php روی داده یکسان
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
const require = createRequire(import.meta.url);
const MS = require('../public_html/assets/matrix.js');
const dir = new URL('.', import.meta.url).pathname;
const cases = [
  ['1', '0.12'], ['2', '64000'], ['3', '2.5'], ['4', '14.2'],
];
const paramSets = [
  { smoother: 5, supResPeriod: 50, supResPercentage: 100, pricePeriod: 16, overbought: 200, oversold: -200 },
  { smoother: 9, supResPeriod: 30, supResPercentage: 35, pricePeriod: 20, overbought: 150, oversold: -150 },
  { smoother: 2, supResPeriod: 1, supResPercentage: 0, pricePeriod: 2, overbought: 50, oversold: -50 },
];
let fail = 0;
for (const [seed, base] of cases) {
  const candles = JSON.parse(execFileSync('node', [dir + 'gen.mjs', seed, base, '1200']).toString());
  for (const p of paramSets) {
    writeFileSync('/tmp/berjis_parity.json', JSON.stringify({ candles, p }));
    const php = JSON.parse(execFileSync('php', [dir + 'matrix_cli.php', '/tmp/berjis_parity.json']).toString());
    const js = MS.compute(candles, p);
    let maxd = 0, nullMismatch = 0, nonNullLast = 0;
    for (const k of ['up', 'down', 'res', 'sup', 'cci', 'upShape', 'downShape']) {
      for (let i = 0; i < candles.length; i++) {
        const a = js[k][i], b = php[k][i];
        if ((a === null) !== (b === null)) { nullMismatch++; continue; }
        if (a === null) continue;
        if (!Number.isFinite(a)) nullMismatch++;
        maxd = Math.max(maxd, Math.abs(a - b));
      }
      if (['up', 'down', 'res', 'sup'].includes(k) && js[k][candles.length - 1] !== null) nonNullLast++;
    }
    const ok = maxd < 1e-9 && nullMismatch === 0 && nonNullLast === 4;
    if (!ok) fail++;
    console.log(`${ok ? 'OK  ' : 'FAIL'} price=${base} params=${JSON.stringify(p)} maxDiff=${maxd} nullMismatch=${nullMismatch} lastValid=${nonNullLast}/4`);
  }
}
process.exit(fail ? 1 : 0);

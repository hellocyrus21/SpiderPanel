// پیاده‌سازی مرجع با معناشناسی خود Pine (na، ema با شروع از اولین مقدار) برای مقایسه
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
const MS = createRequire(import.meta.url)('../public_html/assets/matrix.js');
const dir = new URL('.', import.meta.url).pathname;
const na = v => v === null || v === undefined || Number.isNaN(v);
function ema(src, len) { const a = 2 / (len + 1); let s = null; return src.map(v => { if (na(v)) return s = na(s) ? null : null; s = na(s) ? v : a * v + (1 - a) * s; return s; }); }
function stdev(src, len) { return src.map((_, i) => { if (i < len - 1) return null; const w = src.slice(i - len + 1, i + 1); const m = w.reduce((x, y) => x + y) / len; return Math.sqrt(w.reduce((x, y) => x + (y - m) ** 2, 0) / len); }); }
function cci(src, len) { return src.map((v, i) => { if (i < len - 1) return null; const w = src.slice(i - len + 1, i + 1); const m = w.reduce((x, y) => x + y) / len; const d = w.reduce((x, y) => x + Math.abs(y - m), 0) / len; return (v - m) / (0.015 * d); }); }
function hl(src, len, f) { return src.map((_, i) => { if (i < len - 1) return null; const w = src.slice(i - len + 1, i + 1); return w.some(na) ? null : f(...w); }); }
function pine(c, p) {
  const ys1 = c.map(x => (x[2] + x[3] + x[4] * 2) / 4), nn = p.smoother;
  const rk3 = ema(ys1, nn), rk4 = stdev(ys1, nn);
  const rk5 = ys1.map((v, i) => na(rk3[i]) || na(rk4[i]) || rk4[i] === 0 ? null : (v - rk3[i]) * 200 / rk4[i]);
  const up = ema(ema(rk5, nn), nn), down = ema(up, nn);
  const c3 = cci(c.map(x => x[4]), p.pricePeriod);
  const v2 = hl(c3, p.supResPeriod, Math.max), v3 = hl(c3, p.supResPeriod, Math.min);
  const pct = p.supResPercentage / 100;
  return { up, down, res: v2.map((h, i) => na(h) ? null : v3[i] + (h - v3[i]) * pct), sup: v2.map((h, i) => na(h) ? null : h - (h - v3[i]) * pct) };
}
const candles = JSON.parse(execFileSync('node', [dir + 'gen.mjs', '7', '14.4', '1000']).toString())
  .map((c, i) => (i % 97 > 85 ? [c[0], c[1], c[2] + 0.004, c[3] - 0.004, c[4] + ((i * 7919) % 13 - 6) * 0.0005, c[5]] : c)); // بدون کندل صاف
for (const p of [{ smoother: 3, supResPeriod: 3, supResPercentage: 10, pricePeriod: 16, overbought: 200, oversold: -200 },
                 { smoother: 5, supResPeriod: 50, supResPercentage: 100, pricePeriod: 16, overbought: 200, oversold: -200 }]) {
  const a = MS.compute(candles, p), b = pine(candles, p);
  let max = 0;
  for (const k of ['up', 'down', 'res', 'sup']) for (let i = 200; i < candles.length; i++) max = Math.max(max, Math.abs(a[k][i] - b[k][i]));
  console.log(JSON.stringify(p), 'max diff after warm-up:', max.toExponential(2), '| last up/down/res/sup ours', ['up','down','res','sup'].map(k => a[k].at(-1).toFixed(2)).join(' '), 'pine', ['up','down','res','sup'].map(k => b[k].at(-1).toFixed(2)).join(' '));
}

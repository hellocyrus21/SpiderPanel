// تولید کندل تستی: قیمت ریز (DOGE)، کندل‌های کاملاً صاف، جهش
const [,, seed = '1', base = '0.12', n = '1200'] = process.argv;
let s = Number(seed);
const rnd = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648);
let p = Number(base), t = 1700000000 - (1700000000 % 60);
const out = [];
for (let i = 0; i < Number(n); i++) {
  const flat = (i % 97) > 85;              // دوره‌های کاملاً صاف (بازار خوابیده ۱ دقیقه)
  const o = p;
  const step = flat ? 0 : (rnd() - 0.5) * p * 0.002;
  const c = Math.max(o + step, 1e-6);
  const h = flat ? o : Math.max(o, c) + rnd() * p * 0.0005;
  const l = flat ? o : Math.min(o, c) - rnd() * p * 0.0005;
  out.push([t + i * 60, +o.toFixed(6), +h.toFixed(6), +l.toFixed(6), +c.toFixed(6), 100]);
  p = +c.toFixed(6);
}
process.stdout.write(JSON.stringify(out));

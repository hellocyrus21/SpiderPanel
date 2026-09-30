/**
 * ورکر کلودفلر برجیس (اختیاری)
 * ------------------------------------------------------------
 * فقط اگر در صفحه «🔧 اتصال» سایت، تایم‌فریم ۱ یا ۵ دقیقه خطای
 * «تایم‌فریم اشتباه برگرداند» داد، این کد را در همان ورکر فعلی
 * (trade66.hellocyrus21.workers.dev) جایگزین کنید. لینک عوض نمی‌شود.
 *
 * Cloudflare Dashboard → Workers & Pages → trade66 → Edit code → این کد → Deploy
 *
 * دو نوع درخواست را پشتیبانی می‌کند:
 *   /?base=BTC&quote=USDT&interval=1m&limit=1000        → خروجی UDF  {s,t,o,h,l,c,v}
 *   /api/v1/market/candles?type=1min&symbol=BTC-USDT    → پاسخ خام کوکوین
 */
const KUCOIN = 'https://api.kucoin.com';
const TYPES = { '1m': '1min', '5m': '5min', '15m': '15min', '1h': '1hour' };
const BASES = ['BTC', 'XRP', 'LINK', 'DOGE'];

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*', 'cache-control': 'no-store' },
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (request.method !== 'GET') return json({ s: 'error', errmsg: 'GET only' }, 405);

    // حالت پروکسی مستقیم (فقط داده‌های عمومی بازار)
    if (url.pathname.startsWith('/api/v1/market/')) {
      const r = await fetch(KUCOIN + url.pathname + url.search, { headers: { accept: 'application/json' } });
      return new Response(r.body, { status: r.status, headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*' } });
    }

    // حالت UDF
    const base = (url.searchParams.get('base') || 'BTC').toUpperCase();
    const interval = url.searchParams.get('interval') || '15m';
    const limit = Math.max(20, Math.min(1500, parseInt(url.searchParams.get('limit') || '500', 10) || 500));
    if (!BASES.includes(base) || !TYPES[interval]) return json({ s: 'error', errmsg: 'bad symbol/interval' }, 400);

    const r = await fetch(`${KUCOIN}/api/v1/market/candles?type=${TYPES[interval]}&symbol=${base}-USDT`, { headers: { accept: 'application/json' } });
    const j = await r.json().catch(() => null);
    if (!j || j.code !== '200000' || !Array.isArray(j.data)) return json({ s: 'error', errmsg: 'kucoin error', upstream: j }, 502);

    // کوکوین: [time, open, close, high, low, volume, turnover] جدیدترین اول
    const rows = j.data.slice(0, limit).reverse();
    return json({
      s: 'ok',
      source: 'kucoin',
      interval,
      t: rows.map((x) => Number(x[0])),
      o: rows.map((x) => Number(x[1])),
      h: rows.map((x) => Number(x[3])),
      l: rows.map((x) => Number(x[4])),
      c: rows.map((x) => Number(x[2])),
      v: rows.map((x) => Number(x[5])),
    });
  },
};

/**
 * اندیکاتور Matrix Series — نسخه مرورگر
 * خط‌به‌خط معادل lib/matrix.php (آلارم سرور با همین اعداد کار می‌کند).
 * هر تغییری اینجا باید در matrix.php هم اعمال شود.
 */
(function (root) {
  'use strict';

  var EPS = 1e-10;

  function ema(src, len) {
    var n = src.length, out = new Array(n).fill(null);
    var alpha = 2 / (len + 1), prev = null, seedSum = 0, seedCount = 0;
    for (var i = 0; i < n; i++) {
      var v = src[i];
      if (prev === null) {
        if (v === null) { seedSum = 0; seedCount = 0; continue; }
        seedSum += v;
        seedCount++;
        if (seedCount >= len) { prev = seedSum / len; out[i] = prev; }
        continue;
      }
      if (v !== null) prev = alpha * v + (1 - alpha) * prev;
      out[i] = prev;
    }
    return out;
  }

  function windowMean(src, i, len) {
    var sum = 0;
    for (var j = i - len + 1; j <= i; j++) sum += src[j];
    return sum / len;
  }

  /**
   * candles: [[time, open, high, low, close, volume], ...]
   * params: {smoother, supResPeriod, supResPercentage, pricePeriod, overbought, oversold}
   */
  function compute(candles, p) {
    var n = candles.length, i, j;
    var nn = Math.max(2, p.smoother | 0);
    var srPeriod = Math.max(1, p.supResPeriod | 0);
    var srPct = Number(p.supResPercentage) / 100;
    var pp = Math.max(2, p.pricePeriod | 0);
    var ob = Number(p.overbought), os = Number(p.oversold);

    var ys1 = new Array(n), close = new Array(n);
    for (i = 0; i < n; i++) {
      var c = candles[i];
      ys1[i] = (c[2] + c[3] + c[4] * 2) / 4;
      close[i] = c[4];
    }

    var rk3 = ema(ys1, nn);
    var rk5 = new Array(n).fill(null);
    for (i = nn - 1; i < n; i++) {
      if (rk3[i] === null) continue;
      var mean = windowMean(ys1, i, nn), sq = 0;
      for (j = i - nn + 1; j <= i; j++) { var d = ys1[j] - mean; sq += d * d; }
      var sd = Math.sqrt(sq / nn);
      if (sd <= Math.abs(mean) * EPS) {
        rk5[i] = i > 0 ? rk5[i - 1] : null;
      } else {
        rk5[i] = (ys1[i] - rk3[i]) * 200 / sd;
      }
    }
    var rk6 = ema(rk5, nn);
    var up = ema(rk6, nn);
    var down = ema(up, nn);

    var cci = new Array(n).fill(null);
    for (i = pp - 1; i < n; i++) {
      var m = windowMean(close, i, pp), md = 0;
      for (j = i - pp + 1; j <= i; j++) md += Math.abs(close[j] - m);
      md = md / pp;
      if (md <= Math.abs(m) * EPS) {
        cci[i] = i > 0 ? cci[i - 1] : null;
      } else {
        cci[i] = (close[i] - m) / (0.015 * md);
      }
    }

    var res = new Array(n).fill(null), sup = new Array(n).fill(null);
    for (i = 0; i < n; i++) {
      var start = i - srPeriod + 1;
      if (start < 0) continue;
      var hi = null, lo = null;
      for (j = start; j <= i; j++) {
        var v = cci[j];
        if (v === null) { hi = null; break; }
        if (hi === null || v > hi) hi = v;
        if (lo === null || v < lo) lo = v;
      }
      if (hi === null) continue;
      var v5 = (hi - lo) * srPct;
      res[i] = lo + v5;
      sup[i] = hi - v5;
    }

    var upShape = new Array(n).fill(null), downShape = new Array(n).fill(null);
    for (i = 0; i < n; i++) {
      var u = up[i], dn = down[i];
      if (u === null || dn === null) continue;
      if (u > ob && u !== dn) upShape[i] = (u > dn ? u : dn) + 20;
      if (dn < os && u !== dn) downShape[i] = (u > dn ? dn : u) - 20;
    }

    return { up: up, down: down, res: res, sup: sup, cci: cci, upShape: upShape, downShape: downShape };
  }

  var api = { compute: compute, ema: ema };
  root.MatrixSeries = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);

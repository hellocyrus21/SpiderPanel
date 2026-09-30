<?php
/**
 * اندیکاتور Matrix Series — نسخه سمت سرور (PHP)
 * ------------------------------------------------------------
 * این فایل خط‌به‌خط با assets/matrix.js یکسان است تا عددی که روی چارت
 * می‌بینید دقیقاً همان عددی باشد که آلارم در سرور با آن مقایسه می‌کند.
 * هر تغییری در یکی، باید در دیگری هم اعمال شود (تست: dev/parity-test.sh).
 *
 * Pine Script اصلی:
 *   ys1 = (high + low + close*2) / 4
 *   rk3 = ema(ys1, nn)          rk4 = stdev(ys1, nn)
 *   rk5 = (ys1 - rk3) * 200 / rk4
 *   rk6 = ema(rk5, nn)          up  = ema(rk6, nn)      down = ema(up, nn)
 *   Value1 = cci(close, PricePeriod)
 *   Value2 = highest(Value1, SupResPeriod)   Value3 = lowest(Value1, SupResPeriod)
 *   Value5 = (Value2 - Value3) * SupResPercentage/100
 *   Resistance = Value3 + Value5             Support = Value2 - Value5
 *
 * تفاوت عمدی با تریدینگ‌ویو (برای کندل‌های ریز ۱ و ۵ دقیقه):
 *   وقتی چند کندل پشت‌سرهم کاملاً صاف باشند، انحراف معیار صفر می‌شود و
 *   تریدینگ‌ویو خط را قطع می‌کند (na). اینجا مقدار قبلی ادامه پیدا می‌کند
 *   تا اندیکاتور و آلارم هیچ‌وقت قطع نشوند.
 */
if (!defined('BERJIS')) { http_response_code(404); exit; }

const MS_EPS = 1e-10;

/** EMA با شروع SMA (مثل Pine). مقدار null ورودی = ادامه مقدار قبلی */
function ms_ema(array $src, int $len): array
{
    $n = count($src);
    $out = array_fill(0, $n, null);
    $alpha = 2.0 / ($len + 1);
    $prev = null;
    $seedSum = 0.0;
    $seedCount = 0;
    for ($i = 0; $i < $n; $i++) {
        $v = $src[$i];
        if ($prev === null) {
            if ($v === null) { $seedSum = 0.0; $seedCount = 0; continue; }
            $seedSum += $v;
            $seedCount++;
            if ($seedCount >= $len) { $prev = $seedSum / $len; $out[$i] = $prev; }
            continue;
        }
        if ($v !== null) $prev = $alpha * $v + (1 - $alpha) * $prev;
        $out[$i] = $prev;
    }
    return $out;
}

/** میانگین و انحراف معیار جمعیتی (مثل stdev پیش‌فرض Pine) پنجره انتهای i */
function ms_window_mean(array $src, int $i, int $len): float
{
    $sum = 0.0;
    for ($j = $i - $len + 1; $j <= $i; $j++) $sum += $src[$j];
    return $sum / $len;
}

/**
 * @param array $candles  [[time, open, high, low, close, volume], ...] به ترتیب زمان
 * @return array  up, down, res, sup, cci, upShape, downShape (آرایه هم‌طول کندل‌ها؛ null = هنوز گرم نشده)
 */
function matrix_compute(array $candles, array $p): array
{
    $n = count($candles);
    $nn = max(2, (int)$p['smoother']);
    $srPeriod = max(1, (int)$p['supResPeriod']);
    $srPct = (float)$p['supResPercentage'] / 100;
    $pp = max(2, (int)$p['pricePeriod']);
    $ob = (float)$p['overbought'];
    $os = (float)$p['oversold'];

    $ys1 = [];
    $close = [];
    for ($i = 0; $i < $n; $i++) {
        $c = $candles[$i];
        $ys1[$i] = ((float)$c[2] + (float)$c[3] + (float)$c[4] * 2) / 4;
        $close[$i] = (float)$c[4];
    }

    // rk3, rk4, rk5
    $rk3 = ms_ema($ys1, $nn);
    $rk5 = array_fill(0, $n, null);
    for ($i = $nn - 1; $i < $n; $i++) {
        if ($rk3[$i] === null) continue;
        $mean = ms_window_mean($ys1, $i, $nn);
        $sq = 0.0;
        for ($j = $i - $nn + 1; $j <= $i; $j++) { $d = $ys1[$j] - $mean; $sq += $d * $d; }
        $sd = sqrt($sq / $nn);
        if ($sd <= abs($mean) * MS_EPS) {
            $rk5[$i] = $i > 0 ? $rk5[$i - 1] : null;
        } else {
            $rk5[$i] = ($ys1[$i] - $rk3[$i]) * 200 / $sd;
        }
    }
    $rk6 = ms_ema($rk5, $nn);
    $up = ms_ema($rk6, $nn);
    $down = ms_ema($up, $nn);

    // CCI
    $cci = array_fill(0, $n, null);
    for ($i = $pp - 1; $i < $n; $i++) {
        $mean = ms_window_mean($close, $i, $pp);
        $md = 0.0;
        for ($j = $i - $pp + 1; $j <= $i; $j++) $md += abs($close[$j] - $mean);
        $md = $md / $pp;
        if ($md <= abs($mean) * MS_EPS) {
            $cci[$i] = $i > 0 ? $cci[$i - 1] : null;
        } else {
            $cci[$i] = ($close[$i] - $mean) / (0.015 * $md);
        }
    }

    // حمایت و مقاومت داینامیک
    $res = array_fill(0, $n, null);
    $sup = array_fill(0, $n, null);
    for ($i = 0; $i < $n; $i++) {
        $start = $i - $srPeriod + 1;
        if ($start < 0) continue;
        $hi = null; $lo = null;
        for ($j = $start; $j <= $i; $j++) {
            $v = $cci[$j];
            if ($v === null) { $hi = null; break; }
            if ($hi === null || $v > $hi) $hi = $v;
            if ($lo === null || $v < $lo) $lo = $v;
        }
        if ($hi === null) continue;
        $v5 = ($hi - $lo) * $srPct;
        $res[$i] = $lo + $v5;
        $sup[$i] = $hi - $v5;
    }

    // علامت‌های اشباع خرید/فروش
    $upShape = array_fill(0, $n, null);
    $downShape = array_fill(0, $n, null);
    for ($i = 0; $i < $n; $i++) {
        $u = $up[$i]; $d = $down[$i];
        if ($u === null || $d === null) continue;
        if ($u > $ob && $u != $d) $upShape[$i] = ($u > $d ? $u : $d) + 20;
        if ($d < $os && $u != $d) $downShape[$i] = ($u > $d ? $d : $u) - 20;
    }

    return [
        'up' => $up, 'down' => $down, 'res' => $res, 'sup' => $sup, 'cci' => $cci,
        'upShape' => $upShape, 'downShape' => $downShape,
    ];
}

<?php
/**
 * دریافت کندل‌های کوکوین از طریق ورکر کلودفلر (با کش فایل)
 * ------------------------------------------------------------
 * سه مسیر به ترتیب امتحان می‌شود و مسیری که جواب داد به خاطر سپرده می‌شود:
 *   worker-udf    : WORKER/?base=BTC&quote=USDT&interval=1m&limit=1000   (همان فرمت ورکر قبلی)
 *   worker-pass   : WORKER/api/v1/market/candles?type=1min&symbol=BTC-USDT (ورکر به‌عنوان پروکسی مستقیم)
 *   kucoin-direct : api.kucoin.com (از ایران معمولاً بسته است؛ فقط آخرین راه)
 *
 * مهم: فاصله زمانی کندل‌های دریافتی بررسی می‌شود. اگر ورکر برای ۱ یا ۵ دقیقه
 * کندل ۱۵ دقیقه برگرداند، رد می‌شود (باگ اصلی نسخه قبلی).
 */
if (!defined('BERJIS')) { http_response_code(404); exit; }

const KC_TYPES = ['1m' => '1min', '5m' => '5min', '15m' => '15min', '1h' => '1hour'];
const CACHE_TTL = ['1m' => 3, '5m' => 5, '15m' => 8, '1h' => 15];

function http_get(string $url, int $timeout = 8): array
{
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        $verify = (bool)cfg('ssl_verify');
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_MAXREDIRS      => 3,
            CURLOPT_TIMEOUT        => $timeout,
            CURLOPT_CONNECTTIMEOUT => 4,
            CURLOPT_USERAGENT      => 'Berjis/' . BERJIS_VERSION,
            CURLOPT_HTTPHEADER     => ['Accept: application/json'],
            CURLOPT_SSL_VERIFYPEER => $verify,
            CURLOPT_SSL_VERIFYHOST => $verify ? 2 : 0,
            CURLOPT_ENCODING       => '',
        ]);
        $body = curl_exec($ch);
        $code = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $err = $body === false ? curl_error($ch) : '';
        curl_close($ch);
        return [$code, $body === false ? null : $body, $err];
    }
    $ctx = stream_context_create([
        'http' => ['timeout' => $timeout, 'ignore_errors' => true,
                   'header' => "User-Agent: Berjis/" . BERJIS_VERSION . "\r\nAccept: application/json\r\n"],
        'ssl'  => ['verify_peer' => (bool)cfg('ssl_verify'), 'verify_peer_name' => (bool)cfg('ssl_verify')],
    ]);
    $body = @file_get_contents($url, false, $ctx);
    $code = 0;
    if (isset($http_response_header[0]) && preg_match('/\s(\d{3})\s/', $http_response_header[0], $m)) $code = (int)$m[1];
    return [$code, $body === false ? null : $body, $body === false ? 'اتصال برقرار نشد' : ''];
}

function worker_root(): string
{
    return rtrim(get_settings()['worker_url'], '/') . '/';
}

function market_strategies(string $symbol, string $tf, int $limit): array
{
    $root = worker_root();
    $kc = KC_TYPES[$tf];
    return [
        'worker-udf'    => $root . '?' . http_build_query(['base' => $symbol, 'quote' => 'USDT', 'interval' => $tf, 'limit' => $limit]),
        'worker-pass'   => $root . 'api/v1/market/candles?' . http_build_query(['type' => $kc, 'symbol' => "$symbol-USDT"]),
        'kucoin-direct' => 'https://api.kucoin.com/api/v1/market/candles?' . http_build_query(['type' => $kc, 'symbol' => "$symbol-USDT"]),
    ];
}

/**
 * پاسخ را (هر دو فرمت UDF و کوکوین) به [[t,o,h,l,c,v], ...] صعودی تبدیل می‌کند
 */
function parse_candles(?string $body): ?array
{
    if ($body === null || $body === '') return null;
    $j = json_decode($body, true);
    if (!is_array($j)) return null;

    $rows = [];
    if (($j['s'] ?? null) === 'ok' && !empty($j['t']) && is_array($j['t'])) {
        foreach ($j['t'] as $i => $t) {
            $rows[] = [$t, $j['o'][$i] ?? null, $j['h'][$i] ?? null, $j['l'][$i] ?? null, $j['c'][$i] ?? null, $j['v'][$i] ?? 0];
        }
    } elseif ((string)($j['code'] ?? '') === '200000' && !empty($j['data']) && is_array($j['data'])) {
        // کوکوین: [time, open, close, high, low, volume, turnover] — جدیدترین اول
        foreach ($j['data'] as $r) {
            if (!is_array($r) || count($r) < 5) continue;
            $rows[] = [$r[0], $r[1], $r[3], $r[4], $r[2], $r[5] ?? 0];
        }
    } else {
        return null;
    }

    $clean = [];
    foreach ($rows as $r) {
        $t = (int)$r[0];
        if ($t > 100000000000) $t = intdiv($t, 1000); // میلی‌ثانیه → ثانیه
        $o = (float)$r[1]; $h = (float)$r[2]; $l = (float)$r[3]; $c = (float)$r[4]; $v = (float)$r[5];
        if ($t <= 0 || $o <= 0 || $h <= 0 || $l <= 0 || $c <= 0) continue;
        if (!is_finite($o) || !is_finite($h) || !is_finite($l) || !is_finite($c)) continue;
        $h = max($h, $o, $c, $l);
        $l = min($l, $o, $c);
        $clean[$t] = [$t, $o, $h, $l, $c, $v];
    }
    if (!$clean) return null;
    ksort($clean);
    return array_values($clean);
}

/** آیا فاصله کندل‌ها با تایم‌فریم درخواستی یکی است؟ */
function candles_match_tf(array $candles, string $tf): bool
{
    $n = count($candles);
    if ($n < 3) return false;
    $diffs = [];
    for ($i = max(1, $n - 60); $i < $n; $i++) $diffs[] = $candles[$i][0] - $candles[$i - 1][0];
    sort($diffs);
    $median = $diffs[intdiv(count($diffs), 2)];
    return $median === TIMEFRAMES[$tf];
}

function fetch_candles_upstream(string $symbol, string $tf, int $limit): array
{
    $meta = store_read('cache/market_meta', []);
    $strategies = market_strategies($symbol, $tf, $limit);
    $preferred = $meta['preferred'][$tf] ?? null;
    if ($preferred && isset($strategies[$preferred])) {
        $strategies = [$preferred => $strategies[$preferred]] + $strategies;
    }

    $errors = [];
    $deadline = microtime(true) + 12; // سقف کل زمان؛ تا پروسه‌های PHP روی هاست جمع نشوند
    $workerDown = false;
    foreach ($strategies as $name => $url) {
        if (microtime(true) > $deadline) { $errors[] = "$name: زمان تمام شد"; break; }
        $isWorker = strpos($name, 'worker') === 0;
        if ($isWorker && $workerDown) { $errors[] = "$name: رد شد (ورکر در دسترس نیست)"; continue; }
        [$code, $body, $err] = http_get($url);
        if ($body === null) { $errors[] = "$name: $err"; if ($isWorker) $workerDown = true; continue; }
        if ($code >= 400) { $errors[] = "$name: HTTP $code"; continue; }
        $candles = parse_candles($body);
        if (!$candles) { $errors[] = "$name: پاسخ نامعتبر"; continue; }
        if (!candles_match_tf($candles, $tf)) { $errors[] = "$name: تایم‌فریم اشتباه برگرداند"; continue; }

        if ($preferred !== $name) {
            store_update('cache/market_meta', function (&$m) use ($tf, $name) { $m['preferred'][$tf] = $name; });
        }
        return ['ok' => true, 'candles' => array_slice($candles, -$limit), 'source' => $name, 'errors' => $errors];
    }
    return ['ok' => false, 'candles' => [], 'source' => null, 'errors' => $errors];
}

/**
 * کندل‌ها با کش کوتاه‌مدت (تا کرون و چند تب مرورگر فشار اضافه نیاورند)
 */
function get_candles(string $symbol, string $tf, ?int $maxAge = null): array
{
    if (!in_array($symbol, SYMBOLS, true) || !isset(TIMEFRAMES[$tf])) {
        return ['ok' => false, 'error' => 'نماد یا تایم‌فریم نامعتبر'];
    }
    ensure_data_dir();
    $maxAge = $maxAge ?? CACHE_TTL[$tf];
    $key = "cache/c_{$symbol}_{$tf}";

    $cached = store_read($key, null);
    if ($cached && (microtime(true) - $cached['at']) < $maxAge) {
        return ['ok' => true] + $cached;
    }

    // اگر همین الان اتصال شکست خورده، تا ۲۰ ثانیه دوباره تلاش نکن (جلوگیری از خطای 508 هاست)
    $failKey = "cache/f_{$symbol}_{$tf}";
    $fail = store_read($failKey, null);
    if ($fail && (microtime(true) - $fail['at']) < 20) {
        return stale_or_error($cached, $fail['errors'] ?? []);
    }

    $lock = fopen(BERJIS_DATA . "/cache/c_{$symbol}_{$tf}.lock", 'c');
    // اگر درخواست دیگری در حال دریافت است، منتظر نمان؛ حداکثر ۳ ثانیه صبر و بعد داده کش
    $got = false;
    for ($i = 0; $i < 15 && !($got = flock($lock, LOCK_EX | LOCK_NB)); $i++) usleep(200000);
    if (!$got) {
        fclose($lock);
        $cached = store_read($key, null);
        if ($cached && (microtime(true) - $cached['at']) < 120) return ['ok' => true] + $cached;
        return stale_or_error($cached, ['در حال دریافت توسط درخواست دیگر']);
    }
    try {
        // شاید درخواست دیگری همین الان کش را تازه کرده باشد
        $cached = store_read($key, null);
        if ($cached && (microtime(true) - $cached['at']) < $maxAge) {
            return ['ok' => true] + $cached;
        }
        $limit = max(200, min(1500, (int)cfg('candle_limit')));
        $r = fetch_candles_upstream($symbol, $tf, $limit);
        if ($r['ok']) {
            $data = ['at' => microtime(true), 'source' => $r['source'], 'stale' => false, 'candles' => $r['candles']];
            store_write($key, $data);
            return ['ok' => true] + $data;
        }
        store_write($failKey, ['at' => microtime(true), 'errors' => $r['errors']]);
        return stale_or_error($cached, $r['errors']);
    } finally {
        flock($lock, LOCK_UN);
        fclose($lock);
    }
}

/** اتصال قطع است: تا ۱۵ دقیقه از داده قبلی استفاده کن */
function stale_or_error(?array $cached, array $errors): array
{
    if ($cached && (microtime(true) - $cached['at']) < 900) {
        return ['ok' => true, 'stale' => true, 'errors' => $errors] + $cached;
    }
    return ['ok' => false, 'error' => 'اتصال به کوکوین (از طریق ورکر) برقرار نشد', 'errors' => $errors];
}

/** اندیس آخرین کندل بسته‌شده */
function last_closed_index(array $candles, string $tf): int
{
    $n = count($candles);
    return ($candles[$n - 1][0] + TIMEFRAMES[$tf] <= time()) ? $n - 1 : $n - 2;
}

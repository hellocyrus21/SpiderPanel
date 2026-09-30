<?php
/**
 * موتور آلارم روی خطوط اندیکاتور + ارسال پیام بله
 * ------------------------------------------------------------
 * آلارم روی «مقدار اندیکاتور» است، نه قیمت:
 *   خط منبع  : Up / Down / مقاومت / حمایت
 *   هدف      : یک عدد ثابت روی محور اندیکاتور  یا  یک خط دیگر (مثلاً Up به مقاومت)
 *   شرط      : لمس  |  شکست به بالا  |  شکست به پایین
 *   حالت     : لحظه‌ای (کندل در حال تشکیل)  |  بسته شدن کندل (تأییدشده، بدون ری‌پینت)
 */
if (!defined('BERJIS')) { http_response_code(404); exit; }

const ALARM_LINES = ['up' => 'خط Up (سریع)', 'down' => 'خط Down (کند)', 'res' => 'مقاومت', 'sup' => 'حمایت'];
const ALARM_TARGET_LINES = ALARM_LINES + ['ob' => 'سطح اشباع خرید', 'os' => 'سطح اشباع فروش'];
const ALARM_CONDITIONS = ['touch' => 'لمس', 'cross_up' => 'شکست به بالا', 'cross_down' => 'شکست به پایین'];
const PRICE_DECIMALS = ['BTC' => 2, 'XRP' => 4, 'LINK' => 3, 'DOGE' => 5];

/** اعتبارسنجی آلارم ورودی از فرم */
function alarm_sanitize(array $in, ?array $old = null): array
{
    $pick = fn($v, array $allowed, $def) => in_array($v, $allowed, true) ? $v : $def;
    $a = [
        'id'          => $old['id'] ?? ('a' . bin2hex(random_bytes(6))),
        'symbol'      => $pick($in['symbol'] ?? '', SYMBOLS, 'BTC'),
        'tf'          => $pick($in['tf'] ?? '', array_keys(TIMEFRAMES), '5m'),
        'line'        => $pick($in['line'] ?? '', array_keys(ALARM_LINES), 'up'),
        'target_type' => $pick($in['target_type'] ?? '', ['value', 'line'], 'value'),
        'target_value'=> is_numeric($in['target_value'] ?? null) ? (float)$in['target_value'] : 0.0,
        'target_line' => $pick($in['target_line'] ?? '', array_keys(ALARM_TARGET_LINES), 'res'),
        'condition'   => $pick($in['condition'] ?? '', array_keys(ALARM_CONDITIONS), 'touch'),
        'mode'        => $pick($in['mode'] ?? '', ['live', 'close'], 'close'),
        'tolerance'   => is_numeric($in['tolerance'] ?? null) ? max(0, (float)$in['tolerance']) : 5.0,
        'repeat'      => $pick($in['repeat'] ?? '', ['once', 'every'], 'once'),
        'note'        => mb_substr(trim((string)($in['note'] ?? '')), 0, 200),
        'enabled'     => true,
        'created_at'  => $old['created_at'] ?? time(),
        'updated_at'  => microtime(true),
        'fired_count' => $old['fired_count'] ?? 0,
        'last_fired_at' => $old['last_fired_at'] ?? null,
    ];
    if ($a['target_type'] === 'line' && $a['target_line'] === $a['line']) {
        throw new InvalidArgumentException('خط منبع و خط هدف نمی‌توانند یکی باشند');
    }
    return $a;
}

function alarm_describe(array $a): string
{
    $target = $a['target_type'] === 'line' ? ALARM_TARGET_LINES[$a['target_line']] : fmt_num($a['target_value'], 2);
    return ALARM_LINES[$a['line']] . ' ← ' . ALARM_CONDITIONS[$a['condition']] . ' ← ' . $target;
}

function fmt_num($v, int $dec): string
{
    return $v === null ? '-' : number_format((float)$v, $dec, '.', ',');
}

function line_value(array $m, array $params, string $key, int $i): ?float
{
    if ($key === 'ob') return (float)$params['overbought'];
    if ($key === 'os') return (float)$params['oversold'];
    return $m[$key][$i] ?? null;
}

/** فاصله خط منبع از هدف در کندل i (مثبت = بالای هدف) */
function alarm_diff(array $a, array $m, array $params, int $i): ?array
{
    if ($i < 0) return null;
    $v = line_value($m, $params, $a['line'], $i);
    $t = $a['target_type'] === 'line' ? line_value($m, $params, $a['target_line'], $i) : (float)$a['target_value'];
    if ($v === null || $t === null) return null;
    return ['value' => $v, 'target' => $t, 'diff' => $v - $t];
}

/**
 * ارزیابی یک آلارم. خروجی: state جدید + آیا شلیک شود
 */
function alarm_evaluate(array $a, array $candles, array $m, array $params): array
{
    $tf = $a['tf'];
    $n = count($candles);
    $state = [
        'last_check' => time(),
        'last_diff'  => $a['last_diff'] ?? null,
        'last_value' => $a['last_value'] ?? null,
        'last_eval_candle' => $a['last_eval_candle'] ?? null,
        'armed'      => $a['armed'] ?? true,
    ];

    if ($a['mode'] === 'close') {
        $i = last_closed_index($candles, $tf);
        if ($i < 1) return ['state' => $state, 'fire' => false];
        $candleT = $candles[$i][0];
        if (($a['last_eval_candle'] ?? null) === $candleT) return ['state' => $state, 'fire' => false];
        $cur = alarm_diff($a, $m, $params, $i);
        $prevD = alarm_diff($a, $m, $params, $i - 1);
        $prev = $prevD['diff'] ?? null;
        $state['last_eval_candle'] = $candleT;
    } else {
        $i = $n - 1;
        $candleT = $candles[$i][0];
        $cur = alarm_diff($a, $m, $params, $i);
        $recent = isset($a['last_check'], $a['last_diff']) && (time() - $a['last_check']) < 3 * TIMEFRAMES[$tf];
        if ($recent) {
            $prev = (float)$a['last_diff'];
        } else {
            $prevD = alarm_diff($a, $m, $params, $i - 1);
            $prev = $prevD['diff'] ?? null;
        }
    }
    if ($cur === null) return ['state' => $state, 'fire' => false];

    $d = $cur['diff'];
    $state['last_diff'] = $d;
    $state['last_value'] = $cur['value'];

    $crossUp = $prev !== null && $prev < 0 && $d >= 0;
    $crossDown = $prev !== null && $prev > 0 && $d <= 0;
    $tol = (float)$a['tolerance'];

    switch ($a['condition']) {
        case 'cross_up':   $hit = $crossUp; break;
        case 'cross_down': $hit = $crossDown; break;
        default:
            $hit = abs($d) <= $tol || $crossUp || $crossDown;
            // بعد از هر لمس، خط باید از محدوده دور شود تا دوباره آلارم بدهد
            if (!$hit) { $state['armed'] = true; }
            elseif (!$state['armed']) { $hit = false; }
    }

    // در حالت تکرار: حداکثر یک پیام در هر کندل
    if ($hit && ($a['last_fired_candle'] ?? null) === $candleT) $hit = false;

    if ($hit && $a['condition'] === 'touch') $state['armed'] = false;

    return [
        'state' => $state,
        'fire'  => $hit,
        'info'  => [
            'value' => $cur['value'], 'target' => $cur['target'], 'candle' => $candleT,
            'price' => $candles[$i][4], 'kind' => $crossUp ? 'cross_up' : ($crossDown ? 'cross_down' : 'touch'),
        ],
    ];
}

/**
 * یک دور بررسی همه آلارم‌های فعال. با قفل تا دو اجرای همزمان (کرون + مرورگر) تداخل نکنند.
 */
function run_alarm_check(): array
{
    ensure_data_dir();
    $lock = fopen(BERJIS_DATA . '/check.lock', 'c');
    if (!flock($lock, LOCK_EX | LOCK_NB)) { fclose($lock); return ['skipped' => true]; }

    $summary = ['checked' => 0, 'fired' => 0, 'errors' => []];
    try {
        $alarms = array_filter(store_read('alarms', []), fn($a) => !empty($a['enabled']));
        if (!$alarms) return $summary;

        $groups = [];
        foreach ($alarms as $a) $groups[$a['symbol'] . '|' . $a['tf']][] = $a;

        $results = [];
        foreach ($groups as $key => $list) {
            [$symbol, $tf] = explode('|', $key);
            $c = get_candles($symbol, $tf);
            if (!$c['ok'] || count($c['candles']) < 50) { $summary['errors'][] = "$symbol $tf: " . ($c['error'] ?? 'داده کافی نیست'); continue; }
            if (!empty($c['stale'])) { $summary['errors'][] = "$symbol $tf: داده قدیمی (اتصال قطع)"; continue; }
            $params = indicator_params($tf);
            $m = matrix_compute($c['candles'], $params);
            foreach ($list as $a) {
                $results[$a['id']] = ['updated_at' => $a['updated_at'], 'alarm' => $a] + alarm_evaluate($a, $c['candles'], $m, $params);
                $summary['checked']++;
            }
        }

        // ثبت وضعیت (فقط اگر کاربر در این فاصله آلارم را ویرایش نکرده باشد)
        $fired = store_update('alarms', function (&$all) use ($results) {
            $fired = [];
            foreach ($all as &$a) {
                $r = $results[$a['id']] ?? null;
                if (!$r || $a['updated_at'] !== $r['updated_at'] || empty($a['enabled'])) continue;
                $a = array_merge($a, $r['state']);
                if ($r['fire']) {
                    $a['fired_count'] = ($a['fired_count'] ?? 0) + 1;
                    $a['last_fired_at'] = time();
                    $a['last_fired_candle'] = $r['info']['candle'];
                    if ($a['repeat'] === 'once') $a['enabled'] = false;
                    $fired[] = ['alarm' => $a, 'info' => $r['info']];
                }
            }
            return $fired;
        });

        foreach ($fired as $f) {
            $send = bale_send_alarm($f['alarm'], $f['info']);
            log_event($f['alarm'], $f['info'], $send);
            $summary['fired']++;
        }
    } catch (Throwable $e) {
        $summary['errors'][] = $e->getMessage();
    } finally {
        flock($lock, LOCK_UN);
        fclose($lock);
    }
    return $summary;
}

function log_event(array $a, array $info, array $send): void
{
    store_update('log', function (&$log) use ($a, $info, $send) {
        array_unshift($log, [
            'at' => time(), 'alarm_id' => $a['id'], 'symbol' => $a['symbol'], 'tf' => $a['tf'],
            'text' => alarm_describe($a), 'value' => $info['value'], 'target' => $info['target'],
            'price' => $info['price'], 'sent' => $send['ok'], 'error' => $send['error'] ?? null,
        ]);
        $log = array_slice($log, 0, 100);
    });
}

function fa_datetime(int $ts): string
{
    if (class_exists('IntlDateFormatter')) {
        $f = new IntlDateFormatter('fa_IR@calendar=persian', IntlDateFormatter::SHORT, IntlDateFormatter::MEDIUM,
            cfg('timezone'), IntlDateFormatter::TRADITIONAL, 'yyyy/MM/dd HH:mm:ss');
        $s = $f->format($ts);
        if ($s) return $s;
    }
    return date('Y-m-d H:i:s', $ts);
}

function bale_send_alarm(array $a, array $info): array
{
    $kindText = ['touch' => '🎯 لمس', 'cross_up' => '🟢 شکست به بالا', 'cross_down' => '🔴 شکست به پایین'][$a['condition']];
    if ($a['condition'] === 'touch' && $info['kind'] !== 'touch') $kindText .= $info['kind'] === 'cross_up' ? ' (عبور رو به بالا)' : ' (عبور رو به پایین)';
    $target = $a['target_type'] === 'line'
        ? ALARM_TARGET_LINES[$a['target_line']] . ' (' . fmt_num($info['target'], 2) . ')'
        : fmt_num($info['target'], 2);
    $lines = [
        '🔔 آلارم Matrix Series',
        "{$a['symbol']}/USDT  |  تایم‌فریم {$a['tf']}",
        '',
        $kindText . ' — ' . ALARM_LINES[$a['line']],
        'هدف: ' . $target,
        'مقدار فعلی اندیکاتور: ' . fmt_num($info['value'], 2),
        'قیمت: ' . fmt_num($info['price'], PRICE_DECIMALS[$a['symbol']]) . ' USDT',
        'حالت: ' . ($a['mode'] === 'close' ? 'بسته شدن کندل' : 'لحظه‌ای'),
    ];
    if ($a['note'] !== '') $lines[] = '📝 ' . $a['note'];
    $lines[] = '🕒 ' . fa_datetime(time());
    return bale_send(implode("\n", $lines));
}

/* ------------------------------------------------------------------
 * پیام‌رسان بله (API سازگار با تلگرام، سرور داخل ایران)
 * ------------------------------------------------------------------ */
function bale_request(string $token, string $method, array $payload = []): array
{
    $token = trim($token);
    if (!preg_match('/^[0-9]+:[A-Za-z0-9_\-]+$/', $token)) return ['ok' => false, 'error' => 'توکن بات نامعتبر است'];
    $url = rtrim(cfg('bale_api') ?: 'https://tapi.bale.ai', '/') . "/bot{$token}/{$method}";
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => json_encode($payload, JSON_UNESCAPED_UNICODE),
        CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_CONNECTTIMEOUT => 7,
        CURLOPT_SSL_VERIFYPEER => (bool)cfg('ssl_verify'),
        CURLOPT_SSL_VERIFYHOST => cfg('ssl_verify') ? 2 : 0,
    ]);
    $body = curl_exec($ch);
    $err = curl_error($ch);
    curl_close($ch);
    if ($body === false) return ['ok' => false, 'error' => 'اتصال به بله برقرار نشد: ' . $err];
    $j = json_decode($body, true);
    if (!is_array($j)) return ['ok' => false, 'error' => 'پاسخ نامعتبر از بله'];
    if (empty($j['ok'])) return ['ok' => false, 'error' => (string)($j['description'] ?? 'خطای ناشناخته بله')];
    return ['ok' => true, 'result' => $j['result'] ?? null];
}

function bale_send(string $text, ?array $bale = null): array
{
    $bale = $bale ?? get_settings()['bale'];
    if (empty($bale['enabled'])) return ['ok' => false, 'error' => 'ارسال بله غیرفعال است'];
    if ($bale['token'] === '' || $bale['chat_id'] === '') return ['ok' => false, 'error' => 'توکن یا چت‌آیدی بله وارد نشده'];
    return bale_request($bale['token'], 'sendMessage', ['chat_id' => $bale['chat_id'], 'text' => $text]);
}

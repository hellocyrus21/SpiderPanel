<?php
/**
 * API داخلی سایت (فقط برای صفحه اصلی؛ همه‌چیز پشت رمز عبور)
 */
require __DIR__ . '/lib/bootstrap.php';

$action = $_GET['action'] ?? '';
$isPost = ($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST';
$body = [];
if ($isPost) {
    // هدر سفارشی = جلوگیری از CSRF (سایت دیگری نمی‌تواند این هدر را بفرستد)
    if (($_SERVER['HTTP_X_BERJIS'] ?? '') !== '1') fail('درخواست نامعتبر', 403);
    $body = json_decode(file_get_contents('php://input') ?: '[]', true) ?: [];
}

try {
    if ($action === 'login' && $isPost) {
        start_session();
        if (password_is_default()) fail('ابتدا رمز را در فایل config.php عوض کنید (admin_password)', 403);
        if (!hash_equals((string)cfg('admin_password'), (string)($body['password'] ?? ''))) {
            sleep(2);
            fail('رمز اشتباه است', 401);
        }
        session_regenerate_id(true);
        $_SESSION['berjis_auth'] = auth_fingerprint();
        json_out(['ok' => true]);
    }

    if (!is_logged_in()) fail('ابتدا وارد شوید', 401);
    session_write_close(); // قفل سشن آزاد شود تا درخواست‌های موازی کند نشوند

    switch ($action) {
        case 'logout':
            start_session();
            $_SESSION = [];
            session_destroy();
            json_out(['ok' => true]);

        case 'bootstrap':
            $s = get_settings();
            json_out([
                'ok' => true,
                'settings' => public_settings($s),
                'defaults' => ['indicator' => default_indicator_params(), 'style' => default_style()],
                'symbols' => SYMBOLS,
                'timeframes' => array_keys(TIMEFRAMES),
                'version' => BERJIS_VERSION,
            ]);

        case 'candles':
            $symbol = strtoupper((string)($_GET['symbol'] ?? ''));
            $tf = (string)($_GET['tf'] ?? '');
            $r = get_candles($symbol, $tf);
            if (!$r['ok']) json_out($r, 502);
            $limit = max(1, min(1500, (int)($_GET['limit'] ?? 1500)));
            json_out([
                'ok' => true, 'symbol' => $symbol, 'tf' => $tf, 'source' => $r['source'],
                'stale' => !empty($r['stale']), 'server_time' => time(),
                'candles' => array_slice($r['candles'], -$limit),
            ]);

        case 'save_settings':
            if (!$isPost) fail('POST لازم است');
            store_update('settings', function (&$s) use ($body) {
                if (isset($body['indicator']) && is_array($body['indicator'])) {
                    foreach (array_keys(TIMEFRAMES) as $tf) {
                        if (isset($body['indicator'][$tf])) $s['indicator'][$tf] = sanitize_params((array)$body['indicator'][$tf]);
                    }
                }
                if (isset($body['style']) && is_array($body['style'])) {
                    $s['style'] = array_merge(sanitize_style((array)($s['style'] ?? [])), sanitize_style($body['style']));
                }
                if (isset($body['bale']) && is_array($body['bale'])) {
                    $b = (array)($s['bale'] ?? []);
                    if (isset($body['bale']['token']) && $body['bale']['token'] !== '••••') $b['token'] = trim((string)$body['bale']['token']);
                    if (isset($body['bale']['chat_id'])) $b['chat_id'] = trim((string)$body['bale']['chat_id']);
                    if (isset($body['bale']['enabled'])) $b['enabled'] = (bool)$body['bale']['enabled'];
                    $s['bale'] = $b;
                }
                if (isset($body['worker_url'])) {
                    $u = trim((string)$body['worker_url']);
                    if ($u !== '' && !preg_match('#^https://[^\s]+$#', $u)) throw new InvalidArgumentException('آدرس ورکر باید با https:// شروع شود');
                    $s['worker_url'] = $u;
                }
            });
            if (isset($body['worker_url'])) store_write('cache/market_meta', []);
            json_out(['ok' => true, 'settings' => public_settings(get_settings())]);

        case 'alarms':
            json_out(['ok' => true, 'alarms' => array_values(store_read('alarms', [])), 'log' => array_slice(store_read('log', []), 0, 50)]);

        case 'alarm_save':
            if (!$isPost) fail('POST لازم است');
            $alarm = store_update('alarms', function (&$all) use ($body) {
                $id = (string)($body['id'] ?? '');
                foreach ($all as $k => $a) {
                    if ($id !== '' && $a['id'] === $id) { $all[$k] = alarm_sanitize($body, $a); return $all[$k]; }
                }
                if (count($all) >= 100) throw new InvalidArgumentException('حداکثر ۱۰۰ آلارم مجاز است');
                $a = alarm_sanitize($body);
                $all[] = $a;
                return $a;
            });
            json_out(['ok' => true, 'alarm' => $alarm]);

        case 'alarm_toggle':
        case 'alarm_delete':
            if (!$isPost) fail('POST لازم است');
            $id = (string)($body['id'] ?? '');
            store_update('alarms', function (&$all) use ($id, $action, $body) {
                foreach ($all as $k => $a) {
                    if ($a['id'] !== $id) continue;
                    if ($action === 'alarm_delete') { unset($all[$k]); break; }
                    $a['enabled'] = (bool)($body['enabled'] ?? !$a['enabled']);
                    // با فعال‌سازی دوباره، وضعیت قبلی پاک می‌شود
                    foreach (['last_diff', 'last_value', 'last_check', 'last_eval_candle', 'last_fired_candle', 'armed'] as $f) unset($a[$f]);
                    $a['updated_at'] = microtime(true);
                    $all[$k] = $a;
                    break;
                }
                $all = array_values($all);
            });
            json_out(['ok' => true]);

        case 'log_clear':
            if (!$isPost) fail('POST لازم است');
            store_write('log', []);
            json_out(['ok' => true]);

        case 'check':
            // وقتی صفحه باز است، علاوه بر کرون، مرورگر هم بررسی را صدا می‌زند
            json_out(['ok' => true, 'result' => run_alarm_check(), 'last_cron' => store_read('cron_status', null)]);

        case 'bale_test':
            if (!$isPost) fail('POST لازم است');
            $b = get_settings()['bale'];
            $b['enabled'] = true;
            if (!empty($body['token']) && $body['token'] !== '••••') $b['token'] = (string)$body['token'];
            if (isset($body['chat_id']) && $body['chat_id'] !== '') $b['chat_id'] = (string)$body['chat_id'];
            $r = bale_send("✅ پیام آزمایشی برجیس\nاتصال به بله برقرار است.\n🕒 " . fa_datetime(time()), $b);
            json_out($r, $r['ok'] ? 200 : 400);

        case 'bale_chats':
            if (!$isPost) fail('POST لازم است');
            $token = (string)($body['token'] ?? '');
            if ($token === '' || $token === '••••') $token = get_settings()['bale']['token'];
            $r = bale_request($token, 'getUpdates', ['limit' => 50]);
            if (!$r['ok']) json_out($r, 400);
            $chats = [];
            foreach ((array)$r['result'] as $u) {
                $chat = $u['message']['chat'] ?? $u['channel_post']['chat'] ?? $u['my_chat_member']['chat'] ?? null;
                if (!$chat || !isset($chat['id'])) continue;
                $name = trim(($chat['title'] ?? '') . ' ' . ($chat['first_name'] ?? '') . ' ' . ($chat['last_name'] ?? ''));
                $chats[(string)$chat['id']] = ['id' => (string)$chat['id'], 'name' => $name ?: ($chat['username'] ?? ''), 'type' => $chat['type'] ?? ''];
            }
            json_out(['ok' => true, 'chats' => array_values($chats)]);

        case 'diag':
            // عیب‌یابی اتصال: همه مسیرها را برای یک نماد/تایم‌فریم امتحان می‌کند
            $symbol = in_array($_GET['symbol'] ?? '', SYMBOLS, true) ? $_GET['symbol'] : 'BTC';
            $tf = isset(TIMEFRAMES[$_GET['tf'] ?? '']) ? $_GET['tf'] : '1m';
            $out = [];
            foreach (market_strategies($symbol, $tf, 300) as $name => $url) {
                $t0 = microtime(true);
                [$code, $b, $err] = http_get($url);
                $c = parse_candles($b);
                $out[] = [
                    'name' => $name, 'http' => $code, 'ms' => (int)((microtime(true) - $t0) * 1000),
                    'error' => $err, 'candles' => $c ? count($c) : 0,
                    'tf_ok' => $c ? candles_match_tf($c, $tf) : false,
                    'sample' => $c ? null : mb_substr((string)$b, 0, 200),
                ];
            }
            json_out([
                'ok' => true, 'symbol' => $symbol, 'tf' => $tf, 'results' => $out,
                'php' => PHP_VERSION, 'curl' => function_exists('curl_init'),
                'data_writable' => is_writable(BERJIS_DATA), 'last_cron' => store_read('cron_status', null),
            ]);

        default:
            fail('عملیات ناشناخته', 404);
    }
} catch (InvalidArgumentException $e) {
    fail($e->getMessage());
} catch (Throwable $e) {
    error_log('[berjis] ' . $e);
    fail('خطای سرور: ' . $e->getMessage(), 500);
}

function public_settings(array $s): array
{
    // توکن بله هیچ‌وقت کامل به مرورگر برنمی‌گردد
    $s['bale']['has_token'] = $s['bale']['token'] !== '';
    $s['bale']['token'] = $s['bale']['token'] !== '' ? '••••' : '';
    return $s;
}

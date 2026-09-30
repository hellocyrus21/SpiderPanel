<?php
// شبیه‌ساز ورکر کلودفلر + API بله برای تست محلی
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
header('Content-Type: application/json');
$secs = ['1min' => 60, '5min' => 300, '15min' => 900, '1hour' => 3600, '1m' => 60, '5m' => 300, '15m' => 900, '1h' => 3600];
function gen($step, $n, $base) {
    $now = time(); $t0 = $now - $now % $step - ($n - 1) * $step;
    mt_srand(crc32($base . $step)); $p = $base; $rows = [];
    for ($i = 0; $i < $n; $i++) {
        $o = $p; $c = $o * (1 + (mt_rand() / mt_getrandmax() - 0.5) * 0.004);
        $h = max($o, $c) * 1.0005; $l = min($o, $c) * 0.9995;
        $rows[] = [$t0 + $i * $step, $o, $h, $l, $c, 10]; $p = $c;
    }
    return $rows;
}
if (preg_match('#^/bot([^/]+)/(\w+)#', $path, $m)) {
    $in = json_decode(file_get_contents('php://input'), true);
    file_put_contents('/tmp/berjis_bale.log', $m[2] . ' ' . json_encode($in, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND);
    if ($m[2] === 'getUpdates') { echo json_encode(['ok' => true, 'result' => [['update_id' => 1, 'message' => ['chat' => ['id' => 987654, 'first_name' => 'Cyrus', 'type' => 'private']]]]]); exit; }
    echo json_encode(['ok' => true, 'result' => ['message_id' => 1]]); exit;
}
if ($path === '/api/v1/market/candles') {
    $rows = gen($secs[$_GET['type']], 1500, 0.12);
    $data = array_map(fn($r) => [(string)$r[0], (string)$r[1], (string)$r[4], (string)$r[2], (string)$r[3], '10', '1'], array_reverse($rows));
    echo json_encode(['code' => '200000', 'data' => $data]); exit;
}
// فرمت UDF — مثل باگ ورکر قدیمی برای ۱ دقیقه کندل ۱۵ دقیقه برمی‌گرداند
$iv = $_GET['interval'] ?? '15m';
$step = $iv === '1m' ? 900 : $secs[$iv];
$rows = gen($step, (int)($_GET['limit'] ?? 300), 0.12);
echo json_encode(['s' => 'ok', 't' => array_column($rows, 0), 'o' => array_column($rows, 1), 'h' => array_column($rows, 2), 'l' => array_column($rows, 3), 'c' => array_column($rows, 4), 'v' => array_column($rows, 5)]);

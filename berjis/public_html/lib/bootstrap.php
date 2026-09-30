<?php
/**
 * هسته مشترک: بارگذاری تنظیمات، ذخیره‌سازی فایل‌محور، احراز هویت و پاسخ JSON
 */
if (!defined('BERJIS')) define('BERJIS', true);

define('BERJIS_ROOT', dirname(__DIR__));
define('BERJIS_DATA', BERJIS_ROOT . '/data');
define('BERJIS_VERSION', '2.0.0');

const SYMBOLS = ['BTC', 'XRP', 'LINK', 'DOGE'];
const TIMEFRAMES = ['1m' => 60, '5m' => 300, '15m' => 900, '1h' => 3600];

$GLOBALS['BERJIS_CONFIG'] = array_merge([
    'admin_password' => 'change-me',
    'worker_url'     => 'https://trade66.hellocyrus21.workers.dev/',
    'ssl_verify'     => true,
    'cron_key'       => '',
    'check_interval' => 10,
    'candle_limit'   => 1000,
    'timezone'       => 'Asia/Tehran',
], (array)(include BERJIS_ROOT . '/config.php'));

date_default_timezone_set(cfg('timezone'));

require_once __DIR__ . '/matrix.php';
require_once __DIR__ . '/market.php';
require_once __DIR__ . '/alarms.php';

function cfg(string $key)
{
    return $GLOBALS['BERJIS_CONFIG'][$key] ?? null;
}

/* ------------------------------------------------------------------
 * ذخیره‌سازی: فایل‌های JSON با پسوند .php و هدر exit تا حتی بدون
 * .htaccess هم از بیرون خوانده نشوند.
 * ------------------------------------------------------------------ */
const STORE_GUARD = "<?php http_response_code(404); exit; ?>\n";

function store_path(string $name): string
{
    return BERJIS_DATA . '/' . $name . '.json.php';
}

function store_read(string $name, $default = [])
{
    $file = store_path($name);
    if (!is_file($file)) return $default;
    $raw = @file_get_contents($file);
    if ($raw === false) return $default;
    if (strncmp($raw, '<?php', 5) === 0) {
        $pos = strpos($raw, "\n");
        $raw = $pos === false ? '' : substr($raw, $pos + 1);
    }
    $data = json_decode($raw, true);
    return is_array($data) ? $data : $default;
}

function store_write(string $name, $data): void
{
    ensure_data_dir();
    $file = store_path($name);
    $tmp = $file . '.' . getmypid() . '.tmp';
    $json = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_PRESERVE_ZERO_FRACTION);
    if (file_put_contents($tmp, STORE_GUARD . $json, LOCK_EX) === false) {
        throw new RuntimeException('نوشتن در پوشه data ممکن نیست (دسترسی پوشه را 755 یا 775 کنید)');
    }
    rename($tmp, $file);
}

/** خواندن-تغییر-نوشتن اتمیک با قفل سراسری */
function store_update(string $name, callable $fn, $default = [])
{
    ensure_data_dir();
    $lock = fopen(BERJIS_DATA . '/store.lock', 'c');
    flock($lock, LOCK_EX);
    try {
        $data = store_read($name, $default);
        $result = $fn($data);
        store_write($name, $data);
        return $result;
    } finally {
        flock($lock, LOCK_UN);
        fclose($lock);
    }
}

function ensure_data_dir(): void
{
    foreach ([BERJIS_DATA, BERJIS_DATA . '/cache'] as $dir) {
        if (!is_dir($dir)) @mkdir($dir, 0755, true);
    }
}

/* ------------------------------------------------------------------
 * تنظیمات قابل ویرایش از پنل
 * ------------------------------------------------------------------ */
function default_indicator_params(): array
{
    // مقادیر پیش‌فرض اسکریپت اصلی Matrix Series در تریدینگ‌ویو
    return [
        'smoother'         => 5,
        'supResPeriod'     => 50,
        'supResPercentage' => 100,
        'pricePeriod'      => 16,
        'overbought'       => 200,
        'oversold'         => -200,
    ];
}

function default_style(): array
{
    return [
        'showCandles'  => true,
        'candleUp'     => '#22c55e',
        'candleDown'   => '#ef4444',
        'showUp'       => true,
        'upColor'      => '#38bdf8',
        'showDown'     => true,
        'downColor'    => '#f59e0b',
        'showRes'      => true,
        'resColor'     => '#f43f5e',
        'showSup'      => true,
        'supColor'     => '#10b981',
        'showOBOS'     => true,
        'obosColor'    => '#94a3b8',
        'showShapes'   => true,
        'lineWidth'    => 1,
    ];
}

function get_settings(): array
{
    $s = store_read('settings', []);
    $out = [
        'indicator'  => [],
        'style'      => array_merge(default_style(), (array)($s['style'] ?? [])),
        'bale'       => array_merge(['token' => '', 'chat_id' => '', 'enabled' => true], (array)($s['bale'] ?? [])),
        'worker_url' => trim((string)($s['worker_url'] ?? '')) ?: cfg('worker_url'),
    ];
    foreach (array_keys(TIMEFRAMES) as $tf) {
        $out['indicator'][$tf] = sanitize_params(array_merge(default_indicator_params(), (array)($s['indicator'][$tf] ?? [])));
    }
    return $out;
}

function sanitize_params(array $p): array
{
    $d = default_indicator_params();
    $num = fn($k, $min, $max) => max($min, min($max, is_numeric($p[$k] ?? null) ? (float)$p[$k] : $d[$k]));
    return [
        'smoother'         => (int)round($num('smoother', 2, 200)),
        'supResPeriod'     => (int)round($num('supResPeriod', 1, 500)),
        'supResPercentage' => $num('supResPercentage', 0, 100),
        'pricePeriod'      => (int)round($num('pricePeriod', 2, 500)),
        'overbought'       => $num('overbought', -10000, 10000),
        'oversold'         => $num('oversold', -10000, 10000),
    ];
}

function indicator_params(string $tf): array
{
    return get_settings()['indicator'][$tf] ?? default_indicator_params();
}

/* ------------------------------------------------------------------
 * وب: سشن، احراز هویت، خروجی JSON
 * ------------------------------------------------------------------ */
function start_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) return;
    session_name('BERJISSESS');
    session_set_cookie_params([
        'lifetime' => 60 * 60 * 24 * 30,
        'path'     => '/',
        'httponly' => true,
        'samesite' => 'Lax',
        'secure'   => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
    ]);
    session_start();
}

function password_is_default(): bool
{
    $p = (string)cfg('admin_password');
    return $p === '' || $p === 'change-me';
}

function is_logged_in(): bool
{
    start_session();
    return !empty($_SESSION['berjis_auth']) && $_SESSION['berjis_auth'] === auth_fingerprint();
}

/** با تغییر رمز در config.php همه سشن‌های قبلی باطل می‌شوند */
function auth_fingerprint(): string
{
    return hash('sha256', 'berjis|' . cfg('admin_password'));
}

function json_out($data, int $code = 200): void
{
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRESERVE_ZERO_FRACTION);
    exit;
}

function fail(string $msg, int $code = 400): void
{
    json_out(['ok' => false, 'error' => $msg], $code);
}

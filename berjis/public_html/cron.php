<?php
/**
 * بررسی آلارم‌ها — برای Cron Job دایرکت‌ادمین (هر ۱ دقیقه)
 *
 *   * * * * *  /usr/local/bin/php /home/USER/domains/DOMAIN/public_html/berjis/cron.php >/dev/null 2>&1
 *
 * چون کمترین فاصله کرون ۱ دقیقه است، این اسکریپت داخل همان دقیقه
 * چند بار (هر check_interval ثانیه) بررسی می‌کند تا آلارم‌های ۱ دقیقه جا نمانند.
 *
 * اجرای وب (اگر PHP-CLI در دسترس نبود): cron.php?key=CRON_KEY
 */
require __DIR__ . '/lib/bootstrap.php';

$cli = PHP_SAPI === 'cli';
if (!$cli) {
    $key = (string)cfg('cron_key');
    if ($key === '' || !hash_equals($key, (string)($_GET['key'] ?? ''))) { http_response_code(403); exit('forbidden'); }
    header('Content-Type: text/plain; charset=utf-8');
    ignore_user_abort(true);
}
@set_time_limit(70);

// فقط یک نمونه از کرون همزمان اجرا شود
ensure_data_dir();
$lock = fopen(BERJIS_DATA . '/cron.lock', 'c');
if (!flock($lock, LOCK_EX | LOCK_NB)) exit("already running\n");

$interval = max(5, min(60, (int)cfg('check_interval')));
$deadline = time() + 55;
$runs = 0;
$fired = 0;
$errors = [];

do {
    $start = microtime(true);
    $r = run_alarm_check();
    $runs++;
    $fired += $r['fired'] ?? 0;
    if (!empty($r['errors'])) $errors = $r['errors'];
    $sleep = $interval - (microtime(true) - $start);
    if (time() + $sleep >= $deadline) break;
    if ($sleep > 0) usleep((int)($sleep * 1e6));
} while (time() < $deadline);

store_write('cron_status', ['at' => time(), 'runs' => $runs, 'fired' => $fired, 'errors' => array_slice($errors, 0, 5), 'mode' => $cli ? 'cli' : 'web']);
echo "ok runs=$runs fired=$fired\n";

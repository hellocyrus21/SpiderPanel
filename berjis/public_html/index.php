<?php
require __DIR__ . '/lib/bootstrap.php';
$logged = is_logged_in();
session_write_close();
header('Cache-Control: no-store');
header('X-Frame-Options: DENY');
header('Referrer-Policy: same-origin');
$v = BERJIS_VERSION;
?><!doctype html>
<html lang="fa" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#0b1020">
<title>برجیس | آلارم Matrix Series</title>
<link rel="stylesheet" href="assets/style.css?v=<?= $v ?>">
</head>
<body>
<?php if (!$logged): ?>
<main class="login">
  <form id="login-form" class="card login-card">
    <div class="brand big">برجیس<span>Matrix Alarm</span></div>
    <?php if (password_is_default()): ?>
      <p class="warn">برای امنیت، ابتدا در فایل <b>config.php</b> مقدار <b>admin_password</b> را به یک رمز دلخواه تغییر دهید.</p>
    <?php endif; ?>
    <label>رمز عبور<input type="password" name="password" autocomplete="current-password" required autofocus></label>
    <button class="btn primary" type="submit">ورود</button>
    <p class="err" id="login-err"></p>
  </form>
</main>
<script>
document.getElementById('login-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const err = document.getElementById('login-err');
  err.textContent = '';
  try {
    const r = await fetch('api.php?action=login', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Berjis': '1' },
      body: JSON.stringify({ password: this.password.value })
    });
    const j = await r.json();
    if (j.ok) location.reload(); else err.textContent = j.error || 'خطا';
  } catch (_) { err.textContent = 'ارتباط با سرور برقرار نشد'; }
});
</script>
<?php else: ?>
<header class="topbar">
  <div class="brand">برجیس<span>Matrix Alarm</span></div>
  <div class="seg" id="symbols"></div>
  <div class="seg" id="tfs"></div>
  <div class="price-box">
    <span class="status-dot" id="status-dot" title="وضعیت اتصال"></span>
    <span id="price">—</span>
    <small id="source"></small>
  </div>
  <nav class="actions">
    <button class="btn" data-open="alarms">🔔 آلارم‌ها <b class="badge" id="alarm-badge">0</b></button>
    <button class="btn" data-open="indicator">⚙️ اندیکاتور</button>
    <button class="btn" data-open="bale">✉️ بله</button>
    <button class="btn" data-open="diag">🔧 اتصال</button>
    <button class="btn ghost" id="logout">خروج</button>
  </nav>
</header>

<div class="layout">
  <section class="chart-area">
    <div id="chart" dir="ltr"></div>
    <div id="legend" class="legend" dir="ltr"></div>
    <div class="pane-tools" id="pane-tools">
      <span>اندازه اندیکاتور</span>
      <button class="btn sm" data-size="-1" title="کوچک‌تر">−</button>
      <input type="range" id="pane-size" min="15" max="85" step="1">
      <button class="btn sm" data-size="1" title="بزرگ‌تر">+</button>
    </div>
    <div class="pick-hint" id="pick-hint">روی بخش اندیکاتور کلیک کنید تا عدد هدف انتخاب شود — <button class="btn sm" id="pick-cancel">لغو</button></div>
    <div class="chart-msg" id="chart-msg"></div>
  </section>

  <aside class="drawer" id="drawer-alarms">
    <div class="drawer-head"><h2>آلارم روی اندیکاتور</h2><button class="x" data-close>✕</button></div>
    <form id="alarm-form" class="form">
      <input type="hidden" name="id">
      <div class="row">
        <label>نماد<select name="symbol"></select></label>
        <label>تایم‌فریم<select name="tf"></select></label>
      </div>
      <label>خط اندیکاتور (منبع)
        <select name="line">
          <option value="up">خط Up (سریع)</option>
          <option value="down">خط Down (کند)</option>
          <option value="res">مقاومت (Resistance)</option>
          <option value="sup">حمایت (Support)</option>
        </select>
      </label>
      <label>شرط
        <select name="condition">
          <option value="touch">لمس</option>
          <option value="cross_up">شکست به بالا</option>
          <option value="cross_down">شکست به پایین</option>
        </select>
      </label>
      <div class="seg small" id="target-type">
        <button type="button" data-v="value" class="on">عدد روی اندیکاتور</button>
        <button type="button" data-v="line">یک خط دیگر</button>
      </div>
      <input type="hidden" name="target_type" value="value">
      <div id="tt-value" class="row">
        <label>عدد هدف<input name="target_value" type="number" step="any" required></label>
        <button type="button" class="btn" id="pick-btn" title="انتخاب از روی چارت">📍 از روی چارت</button>
      </div>
      <label id="tt-line" hidden>خط هدف
        <select name="target_line">
          <option value="res">مقاومت</option>
          <option value="sup">حمایت</option>
          <option value="up">خط Up</option>
          <option value="down">خط Down</option>
          <option value="ob">سطح اشباع خرید (OB)</option>
          <option value="os">سطح اشباع فروش (OS)</option>
        </select>
      </label>
      <label id="tol-wrap">محدوده لمس (±)<input name="tolerance" type="number" step="any" min="0" value="5"></label>
      <div class="row">
        <label>زمان بررسی
          <select name="mode">
            <option value="close">بسته شدن کندل (مطمئن)</option>
            <option value="live">لحظه‌ای (سریع‌تر)</option>
          </select>
        </label>
        <label>تکرار
          <select name="repeat">
            <option value="once">فقط یک بار</option>
            <option value="every">هر بار (حداکثر یکی در هر کندل)</option>
          </select>
        </label>
      </div>
      <label>یادداشت (اختیاری)<input name="note" maxlength="200"></label>
      <div class="now-values" id="now-values"></div>
      <div class="row">
        <button class="btn primary" type="submit" id="alarm-submit">ثبت آلارم</button>
        <button class="btn ghost" type="button" id="alarm-reset" hidden>انصراف از ویرایش</button>
      </div>
      <p class="err" id="alarm-err"></p>
    </form>
    <h3>آلارم‌های من</h3>
    <div id="alarm-list" class="list"></div>
    <h3>آخرین آلارم‌های ارسال‌شده <button class="btn sm ghost" id="log-clear">پاک کردن</button></h3>
    <div id="alarm-log" class="list log"></div>
    <p class="muted" id="cron-status"></p>
  </aside>
</div>

<dialog id="dlg-indicator" class="dlg">
  <form method="dialog" class="form" id="ind-form">
    <div class="drawer-head"><h2>تنظیمات Matrix Series</h2><button class="x" value="cancel">✕</button></div>
    <p class="muted">برای هر تایم‌فریم تنظیمات جدا دارید. آلارم‌ها هم با همین تنظیمات در سرور محاسبه می‌شوند. برای مقایسه با تریدینگ‌ویو، همان اعداد جلوی «MS» در تریدینگ‌ویو را اینجا وارد کنید (به ترتیب: Smoother، SupResPeriod، SupResPercentage، PricePeriod، OB، OS).</p>
    <div class="seg small" id="ind-tfs"></div>
    <div class="grid2" id="ind-params"></div>
    <div class="row">
      <button type="button" class="btn sm" id="ind-copy-all">اعمال این تنظیمات روی همه تایم‌فریم‌ها</button>
      <button type="button" class="btn sm ghost" id="ind-reset">پیش‌فرض</button>
    </div>
    <h3>ظاهر</h3>
    <div class="list" id="ind-style"></div>
    <div class="row end">
      <button type="button" class="btn primary" id="ind-save">ذخیره</button>
    </div>
    <p class="err" id="ind-err"></p>
  </form>
</dialog>

<dialog id="dlg-bale" class="dlg">
  <form method="dialog" class="form" id="bale-form">
    <div class="drawer-head"><h2>اتصال به بله</h2><button class="x" value="cancel">✕</button></div>
    <ol class="muted steps">
      <li>در بله به <b>@botfather</b> پیام دهید و یک بات بسازید؛ توکن را اینجا وارد کنید.</li>
      <li>به بات خودتان یک پیام (مثلاً «سلام») بفرستید.</li>
      <li>دکمه «پیدا کردن چت‌آیدی» را بزنید و چت خودتان را انتخاب کنید.</li>
      <li>«ارسال پیام آزمایشی» و بعد «ذخیره».</li>
    </ol>
    <label>توکن بات<input name="token" autocomplete="off" dir="ltr" placeholder="123456789:ABC..."></label>
    <div class="row">
      <label>چت‌آیدی<input name="chat_id" dir="ltr" autocomplete="off"></label>
      <button type="button" class="btn" id="bale-find">پیدا کردن چت‌آیدی</button>
    </div>
    <div id="bale-chats" class="list"></div>
    <label class="check"><input type="checkbox" name="enabled"> ارسال آلارم‌ها به بله فعال باشد</label>
    <div class="row end">
      <button type="button" class="btn" id="bale-test">ارسال پیام آزمایشی</button>
      <button type="button" class="btn primary" id="bale-save">ذخیره</button>
    </div>
    <p class="err" id="bale-err"></p>
  </form>
</dialog>

<dialog id="dlg-diag" class="dlg">
  <form method="dialog" class="form">
    <div class="drawer-head"><h2>اتصال به کوکوین (ورکر کلودفلر)</h2><button class="x" value="cancel">✕</button></div>
    <label>آدرس ورکر<input id="worker-url" dir="ltr"></label>
    <div class="row end"><button type="button" class="btn primary" id="worker-save">ذخیره آدرس</button></div>
    <div class="row">
      <button type="button" class="btn" id="diag-run">تست اتصال (نماد و تایم‌فریم فعلی)</button>
    </div>
    <pre id="diag-out" class="pre" dir="ltr"></pre>
  </form>
</dialog>

<div id="toast" class="toast"></div>
<script src="assets/lightweight-charts.standalone.production.js?v=5.2.1"></script>
<script src="assets/matrix.js?v=<?= $v ?>"></script>
<script src="assets/app.js?v=<?= $v ?>"></script>
<?php endif; ?>
</body>
</html>

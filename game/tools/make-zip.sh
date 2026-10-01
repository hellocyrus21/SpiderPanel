#!/bin/sh
# ساخت فایل زیپ برای آپلود روی هاست
# اجرا: sh game/tools/make-zip.sh
# خروجی: dist/geopolitics2026.zip — محتوایش را مستقیم در public_html اکسترکت کنید
# (index.html در ریشه‌ی زیپ است، نه داخل پوشه).
set -e
cd "$(dirname "$0")/.."            # پوشه‌ی game
OUT="../dist/geopolitics2026.zip"
mkdir -p ../dist
rm -f "$OUT"
zip -r -q -X "$OUT" index.html css data fonts js lib
echo "ساخته شد: dist/geopolitics2026.zip"
unzip -l "$OUT" | tail -1

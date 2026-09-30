<?php
define('BERJIS', true);
require __DIR__ . '/../public_html/lib/matrix.php';
$in = json_decode(file_get_contents($argv[1]), true);
echo json_encode(matrix_compute($in['candles'], $in['p']), JSON_PRESERVE_ZERO_FRACTION);

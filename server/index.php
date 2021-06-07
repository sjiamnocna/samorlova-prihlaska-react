<?php declare(strict_types = 1);

// basic checks for request origin
if(!(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest') ||
    !(isset($_SERVER['HTTP_REFERER']) && strpos(str_replace('www.', '', $_SERVER['HTTP_REFERER']), 'http://samorlova.cz') === 0)){
    header('HTTP/1.0 403 Forbidden');
    exit;
}

define('ROOT_PATH', __DIR__ . '/');
define('ACCESS_KEY', 'sampan');
define('TEMPLATE_DIR', ROOT_PATH . 'inc/src/templattes/');
define('QRCACHE_PATH', ROOT_PATH . 'inc/qrcache/');

include_once ROOT_PATH . 'vendor/autoload.php';
require_once './config.php';
require_once './inc/services.php';

$postData = json_decode(file_get_contents('php://input'), true);
$dataPrices = json_decode(file_get_contents(ROOT_PATH . 'sam_prices.json'), true);

require_once ROOT_PATH . 'inc/action.php';
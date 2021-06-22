<?php
define('ROOT_PATH', __DIR__ . '/');
define('ACCESS_KEY', 'sampan');
define('TEMPLATE_DIR', ROOT_PATH . 'inc/src/templattes/');
define('QRCACHE_PATH', ROOT_PATH . 'inc/qrcache/');

include_once ROOT_PATH . 'vendor/autoload.php';
require_once './config.php';
require_once './inc/services.php';
<?php declare(strict_types = 1);

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

// basic checks for request origin
if(!(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest') ||
    !(isset($_SERVER['HTTP_REFERER']) && $_SERVER['HTTP_REFERER'] === 'http://localhost:3000/')){
    header('HTTP/1.0 403 Forbidden');
    exit;
}

define('ROOT_PATH', __DIR__);
define('ACCESS_KEY', 'sampan');

require_once './inc/src/sessionManager.class.php';

$postData = json_decode(file_get_contents('php://input'), true);

$SessionManager = new App\session();

require_once './inc/action.php';
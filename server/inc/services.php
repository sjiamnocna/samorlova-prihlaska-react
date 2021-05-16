<?php declare(strict_types = 1);

include_once ROOT_PATH . '/vendor/autoload.php';
require_once './inc/src/sessionManager.class.php';

$SERVICES = [
    'sessionManager' => new App\session(),
    'pdo' => new PDO('mysql:host=localhost;port=3306;dbname=samorlova', 'root', '12345'),
    'latte' => new Latte\Engine(),
];
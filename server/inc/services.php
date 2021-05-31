<?php declare(strict_types = 1);

require_once './inc/src/sessionManager.class.php';

$SERVICES = [
    'sessionManager' => new App\session(),
    'pdo' => new PDO('mysql:host=' . DB_HOST . ';port=3306;dbname=' . DB_NAME . ';', DB_USER, DB_PASSWORD),
    'latte' => new Latte\Engine(),
    'mailer' => new Nette\Mail\SendmailMailer
];

// make PDO throw exception on SQL error
$SERVICES['pdo']->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
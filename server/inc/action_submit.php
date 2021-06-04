<?php declare(strict_types = 1);

use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;

if (!defined('ROOT_PATH')){
    header('HTTP/1.0 403 Forbidden');
    exit;
}

require_once 'variables.php';
require_once 'functions.php';

$personalData = process_personal_data($postData['user-data'], $fields);
/**
 * @var array [program, strava, celkem, dbString]
 */
$sum = calculate_prices();

$templateVars = [
    'name' => $personalData['name'],
    'sname' => $personalData['sname'],
    'address' => implode(',', [$personalData['street'], $personalData['streetNo'], $personalData['town'], $personalData['postcode']]),
    'vs' => $personalData['name'],
    'name' => $personalData['name'],
    'acc' => '19-3568510277/0100',
    'iban' => 'CZ8301000000193568510277',
    'program' => number_format($sum[0], 2),
    'strava' => number_format($sum[1], 2),
    'total' => number_format($sum[2], 2),
    'splatnost' => "12. 8. 2021",
    'vs' => 1234, // get from database YEAR + ID,
    'msg' => "SAM {$personalData['name']} {$personalData['sname']}",
    'respondMail' => 'sam@samorlova.cz'
];

$lastInsert = dbInsert([
    'name' => $personalData['name'],
    'sname' => $personalData['sname'],
    'byear' => $personalData['byear'],
    'email' => $personalData['mail'],
    'address' => $templateVars['address'],
    'accomodation' => $personalData['accomodation'],
    'vegetarian' => $personalData['vegetarian'],
    'appdetail' => $sum[3],
    'donation' => 0,
    'note' => $personalData['note'],
    'price' => $sum[2]
]);

if ($lastInsert[1]){
    // respond with error and quit
    $template = "page.error.{$lastInsert[1]}.latte";
    if (!file_exists(TEMPLATE_DIR . $template)){
        $template = 'page.error.php';
    }
    
    // add error code to template
    $templateVars += [
        'errorCode' => $lastInsert[1],
    ];

    // log to file or console
    console_log($templateVars);

    json_response([
        'message' => 'Něco se nepovedlo při vkládání do databáze',
        'html' => $SERVICES['latte']->renderToString(TEMPLATE_DIR, $templateVars),
    ], $lastInsert[1]);
}

$templateVars['vs'] = (new DateTime())->format('Y') . $lastInsert[0];

$QRString = "SPD*1.0*ACC:{$templateVars['iban']}*AM:{$templateVars['total']}*CC:CZK*MSG:{$templateVars['msg']}*X-VS:{$templateVars['vs']}";

$QRWriter = new Endroid\QrCode\Writer\PngWriter;
$QRCode = \Endroid\QrCode\QrCode::create($QRString)
    ->setSize(300)
    ->setMargin(10);
$QRresult = $QRWriter->write($QRCode)->getString();
// add to template
$templateVars['qrCode'] = base64_encode($QRresult);

$mail = new Nette\Mail\Message;
$mail->setFrom('Přihlášky SAM <prihlasky@samorlova.cz>')
->addReplyTo('SAM Orlova <sam@samorlova.cz>')
->addTo("{$templateVars['name']} {$templateVars['sname']} <{$personalData['mail']}>")
->setHtmlBody($SERVICES['latte']->renderToString(ROOT_PATH . 'inc/src/templattes/successMail.latte', $templateVars));

$SERVICES['mailer']->send($mail);

json_response([
    'html' => $SERVICES['latte']->renderToString(TEMPLATE_DIR . 'success.latte', $templateVars)
]);
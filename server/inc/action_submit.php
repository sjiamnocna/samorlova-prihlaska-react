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

$bd = (new DateTime($personalData['bdate']))->modify('+18 years');
$fd = (new DateTime(START_DATE))->modify('+3 days');
if ($bd > $fd) $under18 = "true";
else $under18 = "";

$templateVars = [
    'name' => $personalData['name'],
    'sname' => $personalData['sname'],
    'under18' => $under18,
    'address' => implode(',', [$personalData['street'], $personalData['streetNo'], $personalData['town'], $personalData['postcode']]),
    'vs' => $personalData['name'],
    'name' => $personalData['name'],
    'acc' => '19-3568510277/0100',
    'iban' => 'CZ8301000000193568510277',
    'program' => number_format($sum[0], 2),
    'strava' => number_format($sum[1], 2),
    'donation' => number_format($sum[2], 2),
    'total' => number_format($sum[3], 2, '.', ''),
    'appprogram_text' => $sum[6],
    'appfood_text' => $sum[7],
    'splatnost' => (new DateTime(SPLATNOST))->format('j. n. Y'),
    'msg' => "SAM {$personalData['name']} {$personalData['sname']}",
    'respondMail' => 'sam@samorlova.cz',
    'year' => date("Y"),
    'yearName' => YEAR_NAME
];

$lastInsert = dbInsert([
    'year' => date("Y"),
    'name' => $personalData['name'],
    'sname' => $personalData['sname'],
    'bdate' => $personalData['bdate'],
    'email' => $personalData['mail'],
    'address' => $templateVars['address'],
    'accomodation' => $personalData['accomodation'],
    'foodrestrict' => $personalData['foodrestrict'],
    'donation' => $sum[2],
    'price' => $sum[3],
    'appprogram' => $sum[4],
    'appfood' => $sum[5],
], strtolower($personalData['foodrestrict']) === 'test_data');

if ($lastInsert[0] === 0 || $lastInsert[1]){
    // respond with error if last insert id is 0 or error code occured (both should work) and quit
    $template = "page.error.{$lastInsert[1]}.latte";
    if (!file_exists(TEMPLATE_DIR . $template)){
        $template = 'page.error.latte';
    }
    
    // add error code to template
    $templateVars += [
        'errorCode' => $lastInsert[1],
    ];

    json_response([
        'message' => 'Něco se nepovedlo při vkládání do databáze',
        'dstring' => $lastInsert[2],
        'html' => $SERVICES['latte']->renderToString(TEMPLATE_DIR . $template, $templateVars),
    ], $lastInsert[1]);
}

$templateVars['vs'] = (new DateTime())->format('Y') . $lastInsert[0];

$QRString = "SPD*1.0*ACC:{$templateVars['iban']}*AM:{$templateVars['total']}*CC:CZK*MSG:{$templateVars['msg']}*X-VS:{$templateVars['vs']}";

if (!is_dir(QRCACHE_PATH)){
    mkdir(QRCACHE_PATH, 0755);
}
/**
 * @var string New QR Code png image filename
 */
$QRfilename = (new DateTime())->format('Y') . $templateVars['vs'] . '.png';

$templateVars['QRCode'] = $QRfilename;

$QRWriter = new PngWriter;
$QRCode = QrCode::create($QRString)
    ->setSize(300)
    ->setMargin(10);
$QRresult = $QRWriter->write($QRCode)->saveToFile(QRCACHE_PATH . $QRfilename);

$mail = new Nette\Mail\Message;
$mail->setFrom('Přihlášky SAM <prihlasky@samorlova.cz>')
->addReplyTo('SAM Orlova <sam@samorlova.cz>')
->addBcc('Kuchař <damilda@seznam.cz>')
->addTo("{$templateVars['name']} {$templateVars['sname']} <{$personalData['mail']}>")
->setHtmlBody(
    $SERVICES['latte']->renderToString(ROOT_PATH . 'inc/src/templattes/successMail.latte', $templateVars),
    QRCACHE_PATH
);

$SERVICES['mailer']->send($mail);

json_response([
    'html' => $SERVICES['latte']->renderToString(TEMPLATE_DIR . 'success.latte', $templateVars)
]);

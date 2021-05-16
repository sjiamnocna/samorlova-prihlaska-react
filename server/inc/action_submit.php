<?php declare(strict_types = 1);

use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;

if (!defined('ROOT_PATH')){
    header('HTTP/1.0 403 Forbidden');
    exit;
}

function console_log($data): void
{
    $STDERR = fopen("php://stderr", "w");
    fwrite($STDERR, "\n". var_export($data, true) ."\n-----------------");
    fclose($STDERR);
}

function json_response($data, string $type = 'ok'): void
{
    die(json_encode(
        [
            'type' => $type
        ] + $data
    ));
}

$fieldsToCheck = [
    'name',
    'sname',
    'mail',
    'byear',
    'street',
    'streetNo',
    'postcode',
    'town',
    'vegetarian',
    'accomodation',
    'note'
];

$personalData = [];

foreach($fieldsToCheck as $field){
    $personalData[$field] = $postData['user-data'][$field][0] ?? false;
}

/**
 * @var int[] prices [program, strava]
 */
$sum = [0, 0];

$strava = $postData['strava'];
$program = $postData['program'];

$orders = [];
for($day = 0, $c = count($dataPrices); $day < $c; $day++){
    $dayData = $dataPrices[$day];
    $dayChecked = $postData['program'][$day] ?? false;
    if ($dayChecked){
        $orders[] = $day;
        $sum[0] += intval($dayData['price']);
    }
    for($meal = 0, $mc = count($dayData['options']); $meal < $mc; $meal++){
        $mealData = $dayData['options'][$meal];
        $key = $day . '.' . $meal;
        $mealChecked = $postData['strava'][$key] ?? false;
        if ($mealChecked){
            $orders[] = $key;
            $sum[1] += intval($mealData['price']);
        }
    }
}

$sum[0] = $sum[0] >= 480 ? 390 : $sum[0];
$sum[1] = $sum[1] >= 400 ? 400 : $sum[1];
$total = array_sum($sum);

/* $QRWriter = new PngWriter();
$QRCode = QrCode::create($QRString)
    ->setSize(300)
    ->setMargin(10);
$QRresult = $QRWriter->write($QRCode); */

$templateVars = [
    'name' => $personalData['name'],
    'sname' => $personalData['sname'],
    'address' => implode(',', [$personalData['street'], $personalData['streetNo'], $personalData['town'], $personalData['postcode']]),
    'vs' => $personalData['name'],
    'name' => $personalData['name'],
    'acc' => '19-3568510277/0100',
    'iban' => 'CZ8301000000193568510277',
    'total' => number_format($total, 2),
    'splatnost' => "12. 8. 2021",
    'vs' => 1234, // get from database YEAR + ID,
    'msg' => "SAM {$personalData['name']} {$personalData['sname']}",
];

$stm = $SERVICES['pdo']->prepare(
    'INSERT INTO sam_prihlasky
    (
        `name`,
        `sname`,
        `byear`,
        `email`,
        `address`,
        `accomodation`,
        `vegetarian`,
        `appdetail`,
        `donation`,
        `note`,
        `price`
    )
    SELECT
        ? AS `name`,
        ? AS `sname`,
        ? AS `byear`,
        ? AS `email`,
        ? AS `address`,
        ? AS `accomodation`,
        ? AS `vegetarian`,
        ? AS `appdetail`,
        ? AS `donation`,
        ? AS `note`,
        ? AS `price`'
);
$stm->execute( $d = [
    $personalData['name'],
    $personalData['sname'],
    $personalData['byear'],
    $personalData['mail'],
    $templateVars['address'],
    $personalData['accomodation'] ? 1 : 0,
    $personalData['vegetarian'] ? 1 : 0,
    implode(';', $orders),
    0,
    $personalData['note'],
    $total,
]);

if (!$SERVICES['pdo']->lastInsertId()){
    $response = [
        'code' => 500,
        'message' => 'Něco se nepovedlo při vkládání do databáze',
    ];
    // log error data
    console_log($stm->errorInfo());
    // respond
    json_response($response, 'error');
}

$templateVars['vs'] = (new DateTime())->format('Y') . $SERVICES['pdo']->lastInsertId();

$QRString = "SPD*1.0*ACC:{$templateVars['iban']}*AM:{$templateVars['total']}*CC:CZK*MSG:{$templateVars['msg']}*X-VS:{$templateVars['vs']}";

json_response([
    'qr' => $QRString,
    'html' => $SERVICES['latte']->renderToString(ROOT_PATH . '/inc/src/templattes/success.latte', $templateVars)
]);
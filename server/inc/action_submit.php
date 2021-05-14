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
    die(json_encode([
        'type' => $type,
        'data' => $data
    ]));
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

$paymentData = [
    '@name' => $personalData['name'],
    '@sname' => $personalData['sname'],
    '@acc' => '19-3568510277/0100',
    '@iban' => 'CZ8301000000193568510277',
    '@cena' => 42,//number_format($databaseData['price'], 2),
    '@splatnost' => "12. 8. 2020",
    '@vs' => (new DateTime())->format('Y'),
    '@msg' => implode(',', [ 'SAM', $personalData['sname'], $personalData['name'] ])
];

$QRString = str_replace(array_keys($paymentData), array_values($paymentData), 'SPD*1.0*ACC:@iban*AM:@price*CC:CZK*MSG:@msg*X-VS:@vs');

$QRWriter = new PngWriter();
$QRCode = QrCode::create($QRString)
    ->setSize(300)
    ->setMargin(10);
$QRresult = $QRWriter->write($QRCode);

die(json_response([
    'personal_data' => $personalData,
    'qr' => $QRresult->getString(),
]));
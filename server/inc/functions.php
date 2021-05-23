<?php declare(strict_types = 1);

function console_log($data): void
{
    $STDERR = fopen("php://stderr", "w");
    fwrite($STDERR, "\n". var_export($data, true) ."\n-----------------");
    fclose($STDERR);
}

function json_response(array $data, int $code = 0): void
{
    die(json_encode(
        [
            'code' => $code
        ] + $data
    ));
}

function calculate_prices(): array
{
    global $postData, $dataPrices;

    $sum = [0, 0];
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

    $sum[] = array_sum($sum);
    $sum[] = implode(';', $orders);

    // return sums for program/price/total and orders string for DB
    return $sum;
}

function process_personal_data(array $data, array $fieldList): array
{
    /**
     * @var array data aggregator
     */
    $personalData = [];
    
    foreach($fieldList as $fieldName => $props){
        $hasProps = !is_int($fieldName);
        // field has specific properties
        $key = $hasProps ? $fieldName : $props;
        // insert value into result
        $personalData[$key] = $data[$key][0] ?? false;

        if ($hasProps){
            foreach($props AS $propName => $propValue){
                switch($propName){
                    case 'required':
                        if($propValue && !$personalData[$key]){
                            throw new Exception("pole $key nesmí být prázdné");
                        }
                        break;
                    case 'convertTo':
                        switch($propValue){
                            case 'integer':
                                $personalData[$key] = intval($data[$key][0]);
                                break;
                            case 'bool':
                                $personalData[$key] = $data[$key][0] ? 1 : 0;
                                break;
                        }
                        break;
                }
            }
        }
    }

    return $personalData;
}

function dbInsert(array $data): array
{
    global $SERVICES;

    $stmt = $SERVICES['pdo']->prepare(
        'SELECT
            COUNT(*)
        FROM
            sam_prihlasky
        WHERE `year` = YEAR(CURRENT_DATE()) AND `name` = ? AND `sname` = ?'
    );
    $stmt->execute([
        $data['name'],
        $data['sname']
    ]);

    if ($stmt->fetchColumn(0)){
        // already existing entry
        return [0, 1062, ''];
    }

    /**
     * Prepare inserting data to DB
     */

    $cols = '`' . implode('`,`', array_keys($data)) . '`';
    $placeholders = str_repeat('?,', count($data) - 1) . '?';
    
    $stmt = $SERVICES['pdo']->prepare(
        'INSERT INTO sam_prihlasky (' . $cols . ') VALUES (' . $placeholders . ')'
    );

    $stmt->execute(array_values($data));

    $lastInsertedId = intval($SERVICES['pdo']->lastInsertId());

    // handle errors
    [$eNum, $eCode, $eMessage] = $stmt->errorInfo() ?? null;

    return [intval($lastInsertedId), intval($eCode), $eMessage];
}
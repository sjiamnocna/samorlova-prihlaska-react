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

    $sum = [0, 0, 0];
    $orders_program = [];
    $orders_food = [];
    $orders_program_text = "";
    $orders_food_text = "";

    for($day = 0, $c = count($dataPrices); $day < $c; $day++){
        $dayData = $dataPrices[$day];
        $day_text = $dayData['title'];
        $tmp = [];
        for($program = 0, $pc = count($dayData['program']); $program < $pc; $program++){
            $programData = $dayData['program'][$program];
            $key = $day . '.' . $program;
            $programChecked = $postData['program'][$key] ?? false;
            if ($programChecked){
                $orders_program[] = $key;
                $sum[0] += intval($programData['price']);
                $tmp[] = $programData['title'];
            }
        }
        if (count($tmp) > 0){
            $tmp = implode(', ', $tmp);
            $orders_program_text = $orders_program_text . implode(': ', [$day_text, $tmp]) . ";  ";
        }
        $tmp = [];
        for($meal = 0, $mc = count($dayData['food']); $meal < $mc; $meal++){
            $mealData = $dayData['food'][$meal];
            $key = $day . '.' . $meal;
            $mealChecked = $postData['strava'][$key] ?? false;
            if ($mealChecked){
                $orders_food[] = $key;
                $sum[1] += intval($mealData['price']);
                $tmp[] = $mealData['title'];
            }
        }
        if (count($tmp) > 0){
            $tmp = implode(', ', $tmp);
            $orders_food_text = $orders_food_text . implode(': ', [$day_text, $tmp]) . ";  ";
        }
    }

    $sum[2] = intval($postData['donation']);

    $sum[] = array_sum($sum);
    $sum[] = implode(';', $orders_program);
    $sum[] = implode(';', $orders_food);
    if (strlen($orders_program_text) > 0){
        $sum[] = rtrim($orders_program_text, ";  ");
    }else $sum[] = "";
    if (strlen($orders_food_text) > 0){
        $sum[] = rtrim($orders_food_text, ";  ");
    }else $sum[] = "";

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

/**
 * Insert data to sam_prihlasky
 * 
 * @var array   Assoc array of table_name => data
 * @var bool    Allow to change target table
 * 
 * @return array [lastInsertId, errorCode = 0, ?errorMessage]
 */
function dbInsert(array $data, bool $debug = false): array
{
    global $SERVICES;
    /**
     * Prepare inserting data to DB
     */

    $cols = '`' . implode('`,`', array_keys($data)) . '`';
    $placeholders = str_repeat('?,', count($data) - 1) . '?';
    $targetTable = $debug ? 'test_sam_prihlasky_3' : 'sam_prihlasky_3';
    
    $stmt = $SERVICES['pdo']->prepare(
        "INSERT INTO
            {$targetTable}
        ({$cols})
        VALUES
            ({$placeholders})"
    );

    try{
        // catch error and return it
        $stmt->execute(array_values($data));
    } catch(\PDOException $e){
        [$eNum, $eCode, $eMessage] = $e->errorInfo ?? null;
        return [0, $eCode, $eMessage];
    }

    $lastInsertedId = intval($SERVICES['pdo']->lastInsertId());

    return [$lastInsertedId, 0];
}

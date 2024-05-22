<?php declare(strict_types = 1);

require_once './bootstrap.php';

// FETCH error
$_POST = json_decode(file_get_contents('php://input'), true);

if(!isset($_POST['access-token']) || $_POST['access-token'] !== ACCESS_KEY){
    header('HTTP/1.0 403 Forbidden');
    throw new Exception('Cannot allow access');
}

$vs = $_POST['vs'];

if (!is_numeric($vs)){
    throw new \Exception('VS must be numeric YYYYID');
}

$year = substr($vs, 0, 4);
$id = substr($vs, 4);

/*
*   @var \PDOStatement
*/
$stm = $SERVICES['pdo']->prepare(
    'SELECT
        `foodrestrict`,
        `appfood`
    FROM
        `sam_prihlasky_3`
    WHERE
        `year`=? AND id=?'
);
$stm->execute([$year, $id]);

$data = $stm->fetch(PDO::FETCH_ASSOC);

if (isset($_POST['spec'])){
    // if string is present
    $data['allowed'] = strpos($data['appfood'], $_POST['spec']) > -1;
}

print json_encode($data);

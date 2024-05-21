<?php declare(strict_types = 1);

if (!defined('ROOT_PATH')){
    header('HTTP/1.0 403 Forbidden');
    exit;
}

require_once 'config.php';
require_once 'variables.php';
require_once 'functions.php';

$now = new DateTime();
$appOpen = new DateTime(APP_OPEN);
$appClose = new DateTime(APP_CLOSE);
$appClose_php = new DateTime(APP_CLOSE);
$appClose_php = $appClose_php->modify('+1 day');

// allow access to APP
// including opening and closing day
if(!($_SESSION['external_allow_register'] ?? false && $_SESSION['external_allow_register'] === PRIVATE_TOKEN) && ($now <= $appOpen || $now > $appClose_php)){
    json_response([
        'html' => $SERVICES['latte']->renderToString(TEMPLATE_DIR . 'app_closed.latte', [
            'appOpen' => $appOpen->format('j. n. Y'),
            'appClose' => $appClose->format('j. n. Y'),
        ]),
        'controls' => 'none'
    ], 1);
}

switch($postData['action']){
    case 'fetch_session':
        // init session if it wasn't yet
        if(!$SERVICES['sessionManager']->is_active()){
            $SERVICES['sessionManager']->session_begin($postData['access-key']);
        }

        // return session access code to identify session
        die(json_encode([
            'key' => $SERVICES['sessionManager']->get_property('key'),
        ]));
    case 'fetch_prices':
        if (!$SERVICES['sessionManager']->is_active()){
            die(json_encode([
                !$SERVICES['sessionManager']->is_active(),
                $SERVICES['sessionManager']->session_unlock($postData['session-key']),
            ]));
        }
        die(json_encode($dataPrices));
    case 'submit_form':
        if (!$SERVICES['sessionManager']->is_active()){
            die(json_encode([
                !$SERVICES['sessionManager']->is_active(),
                $SERVICES['sessionManager']->session_unlock($postData['session-key']),
            ]));
        }
        require_once ROOT_PATH . '/inc/action_submit.php';
}

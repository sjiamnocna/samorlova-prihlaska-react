<?php declare(strict_types = 1);

if (!defined('ROOT_PATH')){
    header('HTTP/1.0 403 Forbidden');
    exit;
}

$dataPrices = json_decode(file_get_contents('../src/sam_prices.json'), true);

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
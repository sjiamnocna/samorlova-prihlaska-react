<?php declare(strict_types = 1);

$fields = [
    'name' => [
        'required' => true,
    ],
    'sname' => [
        'required' => true,
    ],
    'mail' => [
        'required' => true,
    ],
    'bdate' => [
        'required' => true,
    ],
    'street' => [
        'required' => true,
    ],
    'streetNo' => [
        'required' => true,
    ],
    'postcode' => [
        'required' => true,
        'convertTo' => 'integer',
    ],
    'town' => [
        'required' => true,
    ],
    'accomodation' => [
        'convertTo' => 'bool',
    ],
    'foodrestrict',
];

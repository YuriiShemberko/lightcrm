<?php

defined('SYSPATH') or die('No direct script access.');

const CONTACT_STATUS_NEW = 'new';
const CONTACT_STATUS_CALLED = 'called';
const CONTACT_STATUS_FAILED = 'failed';
const CONTACT_STATUS_CALLBACK = 'callback';

const VALID_CONTACT_STATUSES = [
    CONTACT_STATUS_NEW,
    CONTACT_STATUS_CALLED,
    CONTACT_STATUS_FAILED,
    CONTACT_STATUS_CALLBACK
];

class Validation_Contact_Params
{
    public static function validate(array $params)
    {
        $v = Validation::factory($params)
            ->rule('name', 'regex', array(':value', '/^[а-яіїєґ\'\-\s]+$/ui'))
            ->rule('phone', 'regex', array(':value', '/^\+?[\d\s\-\(\)]+$/'))
            ->rule('phone', 'min_length', array(':value', 10))
            ->rule('phone', 'max_length', array(':value', 15))
            ->rule('status', 'in_array', array(':value', VALID_CONTACT_STATUSES));

        if (isset($params['status']) && $params['status'] === CONTACT_STATUS_CALLBACK) {
            $v->rule('callback_at', 'not_empty');
        }

        if (!$v->check()) {
            throw new Kohana_Exception(implode(", ", $v->errors('validation')), null, 400);
        }

        return array_filter([
            'name' => Arr::get($params, 'name'),
            'phone' => Arr::get($params, 'phone'),
            'status' => Arr::get($params, 'status'),
            'callback_at' => Arr::get($params, 'callback_at'),
        ], function ($v) {
            return $v !== null;
        });
    }
}

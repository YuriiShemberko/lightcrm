<?php defined('SYSPATH') or die('No direct script access.');

class Validation_Contact_Params {

    public static function validate(array $params)
    {
        $v = Validation::factory($params)
            ->rule('name', 'regex', array(':value', '/^[а-яіїєґ\'\-\s]+$/ui'))
            ->rule('phone', 'regex', array(':value', '/^\+?[\d\s\-\(\)]+$/'))
            ->rule('phone', 'min_length', array(':value', 10))
            ->rule('phone', 'max_length', array(':value', 15));

        if (!$v->check()) {
            throw new Kohana_Validation_Exception($v, 'Invalid contact parameters');
        }

        return [
            'name' => (string) Arr::get($params, 'name'),
            'phone' => (string) Arr::get($params, 'phone'),
        ];
    }
}
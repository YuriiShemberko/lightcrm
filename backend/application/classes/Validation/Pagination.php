<?php

defined('SYSPATH') or die('No direct script access.');

class Validation_Pagination
{
    public static function validate(array $params)
    {
        $v = Validation::factory($params)
            ->rule('page', 'digit')
            ->rule('page', 'range', array(':value', 1, 999999))
            ->rule('per_page', 'digit')
            ->rule('per_page', 'range', array(':value', 1, 100));

        if (!$v->check()) {
            throw new Kohana_Exception(implode(", ", $v->errors('validation')), null, 400);
        }

        return [
            'page'  => (int) Arr::get($params, 'page', 1),
            'per_page' => (int) Arr::get($params, 'per_page', 10),
        ];
    }
}

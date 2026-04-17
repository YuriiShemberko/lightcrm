<?php defined('SYSPATH') or die('No direct script access.');

class Validation_Auth_Params {

    public static function validate($params)
    {
        if (!$params) {
            throw new Kohana_Exception('Missing parameters', null, 400);
        }

        $v = Validation::factory($params)
            ->rule('login', 'not_empty')
            ->rule('password', 'not_empty');

        if (!$v->check()) {
            throw new Kohana_Exception(implode(", ", $v->errors('validation')), null, 400);
        }

        return [
            'login' => (string) Arr::get($params, 'login'),
            'password' => (string) Arr::get($params, 'password'),
        ];
    }
}
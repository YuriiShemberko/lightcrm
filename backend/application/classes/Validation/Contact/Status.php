<?php defined('SYSPATH') or die('No direct script access.');

class Validation_Contact_Status {

    public static function validate(array $params)
    {
        $v = Validation::factory($params)
            ->rule('status', 'not_empty')
            ->rule('status', 'in_array', array(':value', ['new', 'called', 'failed', 'callback']));

        if ($params['status'] === 'callback') {
            $v->rule('callback_at', 'not_empty');
        }

        if (!$v->check()) {
            throw new Kohana_Validation_Exception($v, 'Invalid status parameters');
        }

        $result = [
            'status' => (string) Arr::get($params, 'status'),
        ];

        if (isset($params['callback_at'])) {
            $result['callback_at'] = (string) Arr::get($params, 'callback_at');
        }

        return $result;
    }
}

<?php

defined('SYSPATH') or die('No direct script access.');

const CALL_RESULT_ANSWERED = 'answered';
const CALL_RESULT_NO_ANSWER = 'no_answer';
const CALL_RESULT_BUSY = 'busy';

const VALID_CALL_RESULTS = [CALL_RESULT_ANSWERED, CALL_RESULT_NO_ANSWER, CALL_RESULT_BUSY];

class Validation_CallLog_Params
{
    public static function validate(array $params)
    {
        $v = Validation::factory($params)
            ->rule('contact_id', 'digit')
            ->rule('contact_id', 'not_empty')
            ->rule('duration_sec', 'digit')
            ->rule('result', 'not_empty')
            ->rule('result', 'in_array', array(':value', VALID_CALL_RESULTS));

        if (!$v->check()) {
            throw new Kohana_Exception(implode(", ", $v->errors('validation')), null, 400);
        }

        return [
            'contact_id' => (int) Arr::get($params, 'contact_id'),
            'result' => (string) Arr::get($params, 'result'),
            'duration_sec' => (int) Arr::get($params, 'duration_sec', 0),
        ];
    }
}

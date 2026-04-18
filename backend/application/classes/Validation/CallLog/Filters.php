<?php

defined('SYSPATH') or die('No direct script access.');

const CALL_RESULT_SUCCESS = 'success';
const CALL_RESULT_FAILED = 'failed';
const CALL_RESULT_NO_ANSWER = 'no_answer';
const CALL_RESULT_BUSY = 'busy';

const VALID_CALL_RESULTS = [
    CALL_RESULT_SUCCESS,
    CALL_RESULT_FAILED,
    CALL_RESULT_NO_ANSWER,
    CALL_RESULT_BUSY
];

class Validation_CallLog_Filters
{
    public static function validateResult($result)
    {
        $valid_results = VALID_CALL_RESULTS;
        if (!in_array($result, $valid_results)) {
            throw new Kohana_Exception("Invalid call result", null, 400);
        }
        return $result;
    }

    public static function validate($params)
    {
        $filters = [];

        if (isset($params['result'])) {
            $filters['result'] = self::validateResult($params['result']);
        }

        if (isset($params['contact_id'])) {
            $filters['contact_id'] = (int) $params['contact_id'];
        }

        return $filters;
    }
}

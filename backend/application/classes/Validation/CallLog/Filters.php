<?php defined('SYSPATH') or die('No direct script access.');

class Validation_CallLog_Filters {

    public static function validateResult($result) {
        $valid_results = ['success', 'failed', 'no_answer', 'busy'];
        if (!in_array($result, $valid_results)) {
            throw new Kohana_Validation_Exception('Invalid call result');
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
<?php defined('SYSPATH') or die('No direct script access.');

class Validation_ContactFilters {

    public static function validateStatus($status) {
        $valid_statuses = ['new', 'called', 'failed', 'callback'];
        if (!in_array($status, $valid_statuses)) {
            throw new Kohana_Exception_Validation('Invalid contact status');
        }
        return $status;
    }

    public static function validate($params)
    {
        $filters = [];

        if (isset($params['status'])) {
            $filters['status'] = self::validateStatus($params['status']);
        }
        return $filters;
    }
}
<?php defined('SYSPATH') or die('No direct script access.');

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

class Validation_Contact_Filters {

    public static function validateStatus($status) {
        $v = Validation::factory(['status' => $status])
            ->rule('status', 'in_array', array(':value', VALID_CONTACT_STATUSES));

        if (!$v->check()) {
            throw new Kohana_Exception(implode(", ", $v->errors('validation')), null, 400);
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
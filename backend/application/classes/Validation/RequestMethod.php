<?php defined('SYSPATH') or die('No direct script access.');

class Validation_RequestMethod {

    public static function validate($method, $allowed_methods)
    {
        if (!in_array($method, $allowed_methods)) {
            throw new Kohana_Exception('Method not allowed', null, 405);
        }
    }
}
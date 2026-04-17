<?php defined('SYSPATH') or die('No direct script access.');

class Service_ContactNext {
    public static function getNextContact()
    {
        // First try to get a callback contact with past callback_at timestamp
        $next_contact = ORM::factory('Contact')
            ->where('status', '=', 'callback')
            ->where('callback_at', '<=', DB::expr('NOW()'))
            ->order_by('callback_at', 'ASC')
            ->find();

        if ($next_contact->loaded()) {
            return $next_contact;
        }

        // If no callback found, get the oldest 'new' contact
        $next_contact = ORM::factory('Contact')
            ->where('status', '=', 'new')
            ->order_by('created_at', 'ASC')
            ->find();

        return $next_contact->loaded() ? $next_contact : null;
    }
}

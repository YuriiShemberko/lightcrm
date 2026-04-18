<?php

defined('SYSPATH') or die('No direct script access.');

class Controller_Api_ContactNext extends Controller_Api_Core_Rest
{
    public function action_post()
    {
        $next_contact = Service_ContactNext::getNextContact();

        return $this->sendResponse(200, [
            'success' => true,
            'data' => $next_contact ? $next_contact->as_array() : null
        ]);
    }
}

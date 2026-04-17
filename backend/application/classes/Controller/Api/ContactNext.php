<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Api_ContactNext extends Controller_Api_Core_Rest
{
    public function action_post()
    {
        $next_contact = ORM::factory('Contact')->get_next();
        
        return $this->send_response(200, [
            'success' => true,
            'data' => $next_contact ? $next_contact->as_array() : null
        ]);
    }
}
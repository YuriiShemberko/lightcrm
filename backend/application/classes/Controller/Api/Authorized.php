<?php defined('SYSPATH') or die('No direct script access.');

abstract class Controller_Api_Authorized extends Controller_Api_Base {

    public function before()
    {
        parent::before();
        $user_id = Session::instance()->get('user_id');

        if (!$user_id) {
            $this->send_response(401, ['error' => 'Unauthorized']);
            $this->response->send_headers();
            exit; 
        }
    }
}
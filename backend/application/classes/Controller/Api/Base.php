<?php defined('SYSPATH') or die('No direct script access.');

abstract class Controller_Api_Base extends Controller {
    protected function send_response($status, $data)
    {
        $this->response
            ->status($status)
            ->headers('Content-Type', 'application/json')
            ->body(json_encode($data));
    }
}
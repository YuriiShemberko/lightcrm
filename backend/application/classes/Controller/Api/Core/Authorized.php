<?php defined('SYSPATH') or die('No direct script access.');

abstract class Controller_Api_Core_Authorized extends Controller_Api_Core_Base {

    public function before()
    {
        parent::before();

        try {
            Service_Auth::loginRequiredGuard();
        } catch (Kohana_Exception $e) {
            $exception = new HTTP_Exception_401($e->getMessage());
            $exception->headers('WWW-Authenticate', 'Token');
            throw $exception;
        }
    }
}
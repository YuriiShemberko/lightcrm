<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Api_Core_Rest extends Controller_Api_Core_Authorized
{
    public function execute()
    {
        $this->request->action(strtolower($this->request->method()));

        return parent::execute();
    }

}
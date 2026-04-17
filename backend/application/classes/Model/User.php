<?php defined('SYSPATH') or die('No direct script access.');

class Model_User extends ORM {

    protected $_table_name = 'users';

    public function getByLogin($login)
    {
        $user = $this->where('login', '=', $login)->find();
        if ($user->loaded())
        {
            return $user->as_array();
        }

        return NULL;
    }
}
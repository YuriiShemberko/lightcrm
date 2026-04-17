<?php defined('SYSPATH') or die('No direct script access.');

class Model_User extends ORM {

    protected $_table_name = 'users';

    public function get_by_login($login)
    {
        $user = $this->where('login', '=', $login)->find();
        if ($user->loaded())
        {
            return $user->as_array();
        }

        return NULL;
    }

    public function check_password($password)
    {
        // Якщо в базі паролі захешовані, тут буде логіка перевірки
        // return Password::verify($password, $this->password);
    }
}
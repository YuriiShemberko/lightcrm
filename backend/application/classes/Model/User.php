<?php defined('SYSPATH') OR die('No direct access allowed.');


class Model_User extends Model {
    public function get_by_login($login) {
        return DB::select()->from('users')->where('login', '=', $login)->execute()->current();
    }
}
<?php

defined('SYSPATH') or die('No direct script access.');

class Service_Auth
{
    public static function login($login_params)
    {
        $login = $login_params['login'];
        $password = $login_params['password'];

        $user = Model::factory('User')->getByLogin($login);

        if ($user && password_verify($password, $user['password'])) {
            $session = Session::instance();
            $session->set('user_id', $user['id']);
            $session->set('user_login', $user['login']);
        } else {
            throw new Kohana_Exception('Invalid credentials', null, 401);
        }

        return $user;
    }

    public static function logout()
    {
        Session::instance()->destroy();
    }

    public static function loginRequiredGuard()
    {
        $session = Session::instance();
        if (!$session->get('user_id')) {
            throw new Kohana_Exception('Not authenticated', null, 401);
        }
    }

    public static function alreadyLoggedInGuard()
    {
        $session = Session::instance();
        if ($session->get('user_id')) {
            throw new Kohana_Exception('Already logged in', null, 400);
        }
    }

    public static function getCurrentUser()
    {
        $session = Session::instance();
        $user_id = $session->get('user_id');
        if ($user_id) {
            return Model::factory('User')->getById($user_id);
        }

        throw new Kohana_Exception('Not authenticated', null, 401);
    }

}

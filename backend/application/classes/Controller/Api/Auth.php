<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Api_Auth extends Controller_Api_Base {

    /**
     * POST /api/auth/login
     * Accepts login and password, creates a session
     */
    public function action_login()
    {
        $data = json_decode($this->request->body(), true);
        $login = $data['login'] ?? null;
        $password = $data['password'] ?? null;

        if (!$login || !$password)
        {
            return $this->send_response(400, array('error' => 'Login and password required'));
        }

        $user = Model::factory('User')->get_by_login($login);

        if (Session::instance()->get('user_id')) {
            return $this->send_response(400, array('error' => 'Already logged in'));
        }

        // Hash check
        if ($user && password_verify($password, $user['password']))
        {
            // Start session and store user info
            $session = Session::instance();
            $session->set('user_id', $user['id']);
            $session->set('user_login', $user['login']);

            return $this->send_response(200, [
                'success' => true,
                'data' => [
                    'id' => $user['id'],
                    'login' => $user['login']
                ],
            ]);
        }

        return $this->send_response(401, array('error' => 'Invalid credentials'));
    }

    /**
     * POST /api/auth/logout
     * Destroys the current session
     */
    public function action_logout()
    {
        Session::instance()->destroy();

        return $this->send_response(200, [
            'success' => true,
            'message' => 'Logged out successfully'
        ]);
    }

    /**
     * GET /api/auth/me
     * Returns current authenticated user info based on session
     */
    public function action_me()
    {
        $session = Session::instance();
        $user_id = $session->get('user_id');
        $user_login = $session->get('user_login');

        if ($user_id && $user_login) {
            return $this->send_response(200, [
                'success' => true,
                'data' => [
                    'id' => $user_id,
                    'login' => $user_login
                ],
            ]);
        }

        return $this->send_response(401, array('error' => 'Not authenticated'));
    }
}
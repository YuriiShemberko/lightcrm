<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Api_Auth extends Controller_Api_Core_Base {

    /**
     * POST /api/auth/login
     * Accepts login and password, creates a session
     */
    public function action_login()
    {
        try {
            Validation_RequestMethod::validate($this->request->method(), ['POST']);
            
            $data = json_decode($this->request->body(), true);
            
            $login_params = Validation_Auth_Params::validate($data);

            Service_Auth::alreadyLoggedInGuard();

            $user = Service_Auth::login($login_params);

            return $this->sendResponse(200, [
                'success' => true,
                'data' => [
                    'id' => $user['id'],
                    'login' => $user['login']
                ],
            ]);

        } catch (Kohana_Exception $e) {
            return $this->sendResponse($e->getCode(), array('error' => $e->getMessage()));
        }
    }

    /**
     * POST /api/auth/logout
     * Destroys the current session
     */
    public function action_logout()
    {
        try {
            Validation_RequestMethod::validate($this->request->method(), ['POST']);
            Service_Auth::logout();

            return $this->sendResponse(200, [
                'success' => true,
                'message' => 'Logged out successfully'
            ]);
        
        } catch (Kohana_Exception $e) {
            return $this->sendResponse($e->getCode(), array('error' => $e->getMessage()));
        }
    }

    /**
     * GET /api/auth/me
     * Returns current authenticated user info based on session
     */
    public function action_me()
    {
        try {
            $user = Service_Auth::getCurrentUser();
    
            return $this->sendResponse(200, [
                'success' => true,
                'data' => [
                    'id' => $user['id'],
                    'login' => $user['login']
                ],
            ]);

        } catch (Kohana_Exception $e) {
            return $this->sendResponse($e->getCode(), array('error' => $e->getMessage()));
        }
    }
}
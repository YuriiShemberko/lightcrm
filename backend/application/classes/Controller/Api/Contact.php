<?php

defined('SYSPATH') or die('No direct script access.');

class Controller_Api_Contact extends Controller_Api_Core_Rest
{
    public function action_patch()
    {
        try {
            $contact_id = $this->request->param('id');
            $data = json_decode($this->request->body(), true);
            $params = Validation_Contact_Params::validate($data);

            $contact = ORM::factory('Contact')->updateContact($contact_id, $params);

            return $this->sendResponse(200, [
                'success' => true,
                'contact' => [
                    'id' => $contact['id'],
                    'name' => $contact['name'],
                    'phone' => $contact['phone'],
                    'status' => $contact['status'],
                    'callback_at' => $contact['callback_at'],
                ]
            ]);
        } catch (Kohana_Exception $e) {
            return $this->sendResponse($e->getCode(), [
                'success' => false,
                'errors'  => $e->getMessage()
            ]);
        }
    }
}

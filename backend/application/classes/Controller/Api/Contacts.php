<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Api_Contacts extends Controller_Api_Base {

    // Primary REST handler function
    public function action_rest()
    {
        $id = $this->request->param('id');
        $method = $this->request->method();

        switch ($method) {
            case HTTP_Request::GET:
                $id ? $this->_item($id) : $this->_list();
                break;
            case HTTP_Request::POST:
                $this->_create();
                break;
            case HTTP_Request::PATCH:
                $this->_update($id);
                break;
            case HTTP_Request::DELETE:
                $this->_delete($id);
                break;
            default:
                return $this->send_response(405, ['error' => 'Method Not Allowed']);
        }
    }

    private function _item($id)
    {
        $contact = Model::factory('Contact')->get_by_id($id);
        if ($contact) {
            return $this->send_response(200, ['success' => true, 'data' => $contact]);
        } else {
            return $this->send_response(404, ['error' => 'Contact not found']);
        }
    }

    private function _list()
    {
        $contacts = Model::factory('Contact')->get_all();
        return $this->send_response(200, ['success' => true, 'data' => $contacts]);
    }

    private function _update($id)
    {
        if (!$id) return $this->send_response(400, ['error' => 'ID is required in URL']);

        $data = json_decode($this->request->body(), true);
        
        if (empty($data)) {
            return $this->send_response(400, ['error' => 'No data to update']);
        }

        $allowed = ['status', 'callback_at', 'name', 'phone'];
        $update_data = array_intersect_key($data, array_flip($allowed));

        Model::factory('Contact')->update_contact($id, $update_data);

        return $this->send_response(200, ['success' => true]);
    }
}
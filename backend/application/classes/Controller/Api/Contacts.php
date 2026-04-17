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
        $contact = ORM::factory('Contact')->get_by_id($id);
        
        if ($contact) {
            return $this->send_response(200, ['success' => true, 'data' => $contact]);
        } else {
            return $this->send_response(404, ['error' => 'Contact not found']);
        }
    }

    private function _list()
    {
        try {
            $pagination = Validation_Pagination::validate($this->request->query());
            $filters = Validation_ContactFilters::validate($this->request->query());
            $result = ORM::factory('Contact')->get_paged(
                $pagination,
                $filters,
            );
            
            return $this->send_response(200, [
                'success' => true,
                'data' => [
                    'items' => $result['items'],
                    'meta' => [
                        'total' => $result['total'],
                        'page' => $pagination['page'],
                        'per_page' => $pagination['per_page']
                    ],
                ],
            ]);
        } catch (Kohana_Exception_Validation $e) {
            return $this->send_response(400, [
                'success' => false, 
                'errors'  => $e->errors('validation')
            ]);
        } catch (Exception $e) {
            return $this->send_response(500, ['error' => $e->getMessage()]);
        }
    }

    private function _update($id)
    {
        if (!$id) return $this->send_response(400, ['error' => 'ID is required']);

        $data = json_decode($this->request->body(), true);
        
        if (empty($data)) {
            return $this->send_response(400, ['error' => 'No data to update']);
        }

        $allowed = ['status', 'callback_at', 'name', 'phone'];
        $update_data = array_intersect_key($data, array_flip($allowed));

        $success = ORM::factory('Contact')->update_contact($id, $update_data);

        if ($success) {
            return $this->send_response(200, ['success' => true]);
        }
        
        return $this->send_response(404, ['error' => 'Contact not found or update failed']);
    }

    private function _delete($id)
    {
        if (!$id) return $this->send_response(400, ['error' => 'ID is required']);
        
        $success = ORM::factory('Contact')->delete_contact($id);
        return $this->send_response($success ? 200 : 404, ['success' => $success]);
    }
}
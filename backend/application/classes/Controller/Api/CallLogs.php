<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Api_CallLogs extends Controller_Api_Authorized {

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
            default:
                return $this->send_response(405, ['error' => 'Method Not Allowed']);
        }
    }

    private function _list()
    {
        try {
            $pagination = Validation_Pagination::validate($this->request->query());
            $filters = Validation_CallLog_Filters::validate($this->request->query());
            $result = ORM::factory('CallLog')->get_paged(
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
        } catch (Kohana_Validation_Exception $e) {
            return $this->send_response(400, [
                'success' => false, 
                'errors'  => $e->array->errors('validation')
            ]);
        } catch (Exception $e) {
            return $this->send_response(500, ['error' => $e->getMessage()]);
        }
    }

    private function _create()
    {
        try {
            $data = json_decode($this->request->body(), true);
            
            if (!isset($data['contact_id']) || !isset($data['result'])) {
                return $this->send_response(400, ['error' => 'contact_id and result are required']);
            }

            $call_log = ORM::factory('CallLog');
            $id = $call_log->add_log($data['contact_id'], $data['result'], $data['duration_sec'] ?? 0);
            
            return $this->send_response(201, ['success' => true, 'id' => $id]);
        } catch (Exception $e) {
            return $this->send_response(500, ['error' => $e->getMessage()]);
        }
    }
}
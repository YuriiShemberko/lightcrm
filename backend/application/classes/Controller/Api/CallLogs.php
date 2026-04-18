<?php

defined('SYSPATH') or die('No direct script access.');

class Controller_Api_CallLogs extends Controller_Api_Core_Rest
{
    public function action_get()
    {
        try {
            $pagination = Validation_Pagination::validate($this->request->query());
            $filters = Validation_CallLog_Filters::validate($this->request->query());
            $result = ORM::factory('CallLog')->getPaged(
                $pagination,
                $filters,
            );

            return $this->sendResponse(200, [
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
        } catch (Kohana_Exception $e) {
            return $this->sendResponse($e->getCode(), ['errors'  => $e->getMessage()]);
        }
    }

    public function action_post()
    {
        try {
            $data = json_decode($this->request->body(), true);
            $call_log_params = Validation_CallLog_Params::validate($data);

            $call_log = ORM::factory('CallLog');
            $id = $call_log->add_log($call_log_params['contact_id'], $call_log_params['result'], $call_log_params['duration_sec']);

            return $this->sendResponse(201, ['success' => true, 'id' => $id]);
        } catch (Kohana_Exception $e) {
            return $this->sendResponse($e->getCode(), ['errors' => $e->getMessage()]);
        }
    }
}

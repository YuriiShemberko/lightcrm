<?php

defined('SYSPATH') or die('No direct script access.');

class Controller_Api_Contacts extends Controller_Api_Core_Rest
{
    public function action_get()
    {
        try {
            $pagination = Validation_Pagination::validate($this->request->query());
            $filters = Validation_Contact_Filters::validate($this->request->query());
            $result = ORM::factory('Contact')->getPaged(
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
            return $this->sendResponse($e->getCode(), [
                'success' => false,
                'errors'  => $e->getMessage()
            ]);
        }
    }

    public function action_post()
    {
        try {
            $data = json_decode($this->request->body(), true);
            $validated = Validation_Contact_Params::validate($data);
            $new_id = ORM::factory('Contact')->createContact($validated['name'], $validated['phone']);

            return $this->sendResponse(201, ['success' => true, 'id' => $new_id]);

        } catch (Kohana_Exception $e) {
            return $this->sendResponse($e->getCode(), [
                'success' => false,
                'errors'  => $e->getMessage()
            ]);
        }
    }

}

<?php

defined('SYSPATH') or die('No direct script access.');

const PAGINATION_DEFAULT_PAGE = 1;
const PAGINATION_DEFAULT_PER_PAGE = 10;

class Model_Contact extends ORM
{
    protected $_table_name = 'contacts';

    public function getPaged($pagination, $filters)
    {
        $page = $pagination['page'] ?? PAGINATION_DEFAULT_PAGE;
        $limit = $pagination['per_page'] ?? PAGINATION_DEFAULT_PER_PAGE;

        $filtered_items = ORM::factory($this->_object_name);
        foreach ($filters as $field => $value) {
            $filtered_items->where($field, '=', $value);
        }

        $total_items = ORM::factory($this->_object_name);
        foreach ($filters as $field => $value) {
            $total_items->where($field, '=', $value);
        }
        $total = $total_items->count_all();

        $items = $filtered_items
            ->limit($limit)
            ->offset(($page - 1) * $limit)
            ->order_by('created_at', 'DESC')
            ->find_all();

        $data = [];
        foreach ($items as $item) {
            $data[] = $item->as_array();
        }

        return [
            'items' => $data,
            'total' => (int) $total
        ];
    }

    public function createContact($name, $phone)
    {
        $this->name = $name;
        $this->phone = $phone;
        $this->save();

        return $this->id;
    }

    public function updateContact($id, $data)
    {
        $contact = ORM::factory('Contact', $id);
        if ($contact->loaded()) {
            // If status is being updated and it's not 'callback', clear callback_at
            if (isset($data['status']) && $data['status'] !== 'callback') {
                $data['callback_at'] = null;
            }

            $contact->values($data)->save();

            return $contact->as_array();
        } else {
            throw new Kohana_Exception("Contact not found", null, 404);
        }
    }
}

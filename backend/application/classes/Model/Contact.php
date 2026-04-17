<?php defined('SYSPATH') or die('No direct script access.');

class Model_Contact extends ORM {

    protected $_table_name = 'contacts';

    public function get_all()
    {
        return $this->order_by('created_at', 'DESC')
                    ->find_all()
                    ->as_array();
    }

    public function get_paged($pagination, $filters)
    {
        $page = $pagination['page'] ?? 1;
        $limit = $pagination['per_page'] ?? 10;

        $filtered_items = (clone $this);
        foreach ($filters as $field => $value) {
            $filtered_items->where($field, '=', $value);
        }

        $total = (clone $filtered_items)->count_all();

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

    public function get_next()
    {
        // First try to get a callback contact with past callback_at timestamp
        $next_contact = (clone $this)->where('status', '=', 'callback')
                                      ->where('callback_at', '<=', DB::expr('NOW()'))
                                      ->order_by('callback_at', 'ASC')
                                      ->find();

        if ($next_contact->loaded()) {
            return $next_contact;
        }

        // If no callback found, get the oldest 'new' contact
        $next_contact = (clone $this)->where('status', '=', 'new')
                                      ->order_by('created_at', 'ASC')
                                      ->find();

        return $next_contact->loaded() ? $next_contact : null;
    }

    public function create_contact($name, $phone)
    {
        $this->name = $name;
        $this->phone = $phone;
        $this->save();
        
        return $this->id;
    }

    public function get_by_id($id)
    {
        $contact = ORM::factory('Contact', $id);
        return $contact->loaded() ? $contact->as_array() : NULL;
    }

    public function update_contact($id, $data)
    {
        $contact = ORM::factory('Contact', $id);
        if ($contact->loaded())
        {
            // If status is being updated and it's not 'callback', clear callback_at
            if (isset($data['status']) && $data['status'] !== 'callback') {
                $data['callback_at'] = NULL;
            }
            
            $contact->values($data)->save();
            return TRUE;
        }
        return FALSE;
    }

    public function delete_contact($id)
    {
        $contact = ORM::factory('Contact', $id);
        if ($contact->loaded())
        {
            $contact->delete();
            return TRUE;
        }
        return FALSE;
    }
}
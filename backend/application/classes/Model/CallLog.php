<?php defined('SYSPATH') or die('No direct script access.');

class Model_CallLog extends ORM {

    protected $_table_name = 'call_log';

    protected $_belongs_to = array(
        'contact' => array(
            'model'       => 'Contact',
            'foreign_key' => 'contact_id',
        ),
    );

    public function add_log($contact_id, $result, $duration = 0)
    {
        $this->contact_id = $contact_id;
        $this->result     = $result;
        $this->duration_sec = $duration;
        $this->save();
        
        return $this->id;
    }

    public function get_by_contact($contact_id)
    {
        return $this->where('contact_id', '=', (int)$contact_id)
                    ->order_by('called_at', 'DESC')
                    ->find_all()
                    ->as_array();
    }

    public function get_paged($pagination, $filters)
    {
        $page = $pagination['page'] ?? 1;
        $limit = $pagination['per_page'] ?? 10;

        $filtered_items = (clone $this)->with('contact');
        foreach ($filters as $field => $value) {
            $filtered_items->where($field, '=', $value);
        }

        $total = (clone $filtered_items)->count_all();

        $items = $filtered_items
                    ->limit($limit)
                    ->offset(($page - 1) * $limit)
                    ->order_by('called_at', 'DESC')
                    ->find_all();

        $data = [];
        foreach ($items as $item) {
            $arr = $item->as_array();
            $arr['contact_name'] = $item->contact->name ?? null;
            $data[] = $arr;
        }

        return [
            'items' => $data,
            'total' => (int) $total
        ];
    }
}
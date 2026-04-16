<?php defined('SYSPATH') or die('No direct script access.');

class Model_Contact extends Model {

    public function get_all()
    {
        return DB::select('*')
            ->from('contacts')
            ->order_by('created_at', 'DESC')
            ->execute()
            ->as_array();
    }

    public function create($name, $phone)
    {
        $result = DB::insert('contacts', ['name', 'phone'])
            ->values([$name, $phone])
            ->execute();
        
        return $result[0];
    }

    public function get_by_id($id)
    {
        return DB::select('*')
            ->from('contacts')
            ->where('id', '=', (int)$id)
            ->execute()
            ->current();
    }

    public function update_contact($id, $data)
    {
        return DB::update('contacts')
            ->set($data)
            ->where('id', '=', (int)$id)
            ->execute();
    }

    public function delete_contact($id)
    {
        return DB::delete('contacts')
            ->where('id', '=', (int)$id)
            ->execute();
    }
}
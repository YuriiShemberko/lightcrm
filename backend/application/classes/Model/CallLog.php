<?php defined('SYSPATH') or die('No direct script access.');

class Model_CallLog extends Model {

    public function add($contact_id, $result, $duration = 0)
    {
        return DB::insert('call_log', ['contact_id', 'result', 'duration_sec'])
            ->values([$contact_id, $result, $duration])
            ->execute();
    }

    public function get_by_contact($contact_id)
    {
        return DB::select('*')
            ->from('call_log')
            ->where('contact_id', '=', (int)$contact_id)
            ->order_by('called_at', 'DESC')
            ->execute()
            ->as_array();
    }
}
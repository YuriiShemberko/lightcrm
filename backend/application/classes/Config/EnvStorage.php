<?php defined('SYSPATH') or die('No direct script access.');

// Class responsible for loading environment variables from the env.php file

class EnvStorage {

    private static $_instance;
    private $_data = [];

    private function __construct()
    {
        $path = APPPATH . '../env.php';
        if (file_exists($path)) {
            $this->_data = include $path;
        }
    }

    private function __clone() {}

    public static function instance()
    {
        if (self::$_instance === NULL) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function get($key, $default = NULL)
    {
        return isset($this->_data[$key]) ? $this->_data[$key] : $default;
    }
}

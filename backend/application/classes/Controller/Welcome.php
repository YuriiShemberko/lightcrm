<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Welcome extends Controller {

    public function action_index()
    {
        try {
            // Пробуємо отримати адміна з таблиці users
            $admin = DB::select('login', 'created_at')
                ->from('users')
                ->where('login', '=', 'admin')
                ->execute()
                ->current();

            if ($admin) {
                $this->response->body("Зв'язок встановлено! Користувач: " . $admin['login'] . " (створений: " . $admin['created_at'] . ")");
            } else {
                $this->response->body("База порожня або користувач 'admin' не знайдений.");
            }
        } catch (Exception $e) {
            $this->response->body("Помилка БД: " . $e->getMessage());
        }
    }

}
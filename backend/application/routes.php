<?php defined('SYSPATH') or die('No direct script access.');

Route::set('api_auth', 'api/auth(/<action>)')
    ->defaults(array(
        'directory'  => 'Api',
        'controller' => 'Auth',
    ));

// RESTful API route with optional ID parameter
Route::set('api_id', 'api/<controller>/<id>', array('id' => '\d+'))
    ->defaults(array(
        'directory'  => 'Api',
        'action'     => 'rest',
    ));

// Default API route for actions without ID
Route::set('api_default', 'api/<controller>(/<action>)')
    ->defaults(array(
        'directory' => 'Api',
        'action'    => 'index',
    ));

Route::set('default', '(<controller>(/<action>(/<id>)))')
    ->defaults(array(
        'controller' => 'welcome',
        'action'     => 'index',
    ));

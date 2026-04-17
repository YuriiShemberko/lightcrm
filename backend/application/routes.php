<?php defined('SYSPATH') or die('No direct script access.');

Route::set('api_auth', 'api/auth(/<action>)')
    ->defaults(array(
        'directory'  => 'Api',
        'controller' => 'Auth',
    ));

Route::set('api_rest', 'api/<controller>(/<id>)', array('id' => '\d+'))
    ->defaults(array(
        'directory'  => 'Api',
        'action'     => 'rest',
    ));

Route::set('api_actions', 'api/<controller>/<action>')
    ->defaults(array(
        'directory' => 'Api',
    ));

Route::set('api_default', 'api/<controller>')
    ->defaults(array(
        'directory' => 'Api',
        'action'    => 'index',
    ));
    
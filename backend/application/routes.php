<?php defined('SYSPATH') or die('No direct script access.');

Route::set('api_auth', 'api/auth(/<action>)')
    ->defaults(array(
        'directory'  => 'Api',
        'controller' => 'Auth',
    ));

Route::set('api_contacts', 'api/contacts')
    ->defaults(array(
        'directory'  => 'Api',
        'controller' => 'Contacts',
    ));

Route::set('api_contact', 'api/contact/<id>', array('id' => '\d+'))
    ->defaults(array(
        'directory'  => 'Api',
        'controller' => 'Contact',
    ));

Route::set('api_call_logs', 'api/call-logs')
    ->defaults(array(
        'directory' => 'Api',
        'controller' => 'CallLogs',
    ));

Route::set('api_call_log', 'api/call-log/<id>', array('id' => '\d+'))
    ->defaults(array(
        'directory' => 'Api',
        'controller' => 'CallLog',
    ));

Route::set('api_contact_next', 'api/contact/next')
    ->defaults(array(
        'directory' => 'Api',
        'controller' => 'ContactNext',
    ));

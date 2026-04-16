<?php

/*  This is a .env imitation, since Kohana doesn't have built-in support for .env files, we can use a simple PHP file
    to return an array of environment variables.
*/

return [
    'COOKIE_SALT' => '$2a$12$LxhFqBj.DawHctOUphNeO.S511mDnlSDigRHq6VTwJhzqGmN5ISUW',
    'DB_HOST'     => 'db',
    'DB_NAME'     => 'lightcrm',
    'DB_USER'     => 'root',
    'DB_PASS'     => 'root',
];
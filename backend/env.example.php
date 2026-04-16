<?php

/*
    Example file. Create a new file env.php at the same level and fill in the values for your environment.
    This file should not be committed to version control, so it is included in .gitignore.
    This is a .env imitation, since Kohana doesn't have built-in support for .env files, we can use a simple PHP file
    to return an array of environment variables.
*/

return [
    'COOKIE_SALT' => '',
    'DB_HOST'     => 'db',
    'DB_NAME'     => '',
    'DB_USER'     => '',
    'DB_PASS'     => '',
];
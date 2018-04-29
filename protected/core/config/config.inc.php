<?php

date_default_timezone_set('Europe/Moscow');

if (!defined('MEMCACHE_COMPRESSED'))
{
    define('MEMCACHE_COMPRESSED', true);
}

if (LOCAL_SERVER && file_exists(PATH_CORE . '/config/dev/config.db.php')) {
	require_once PATH_CORE . '/config/dev/config.db.php';
}
else {
	require_once PATH_CORE . '/config/config.db.php';
}

require_once PATH_CORE . '/fns/i18n.functions.php';
require_once PATH_CORE . '/fns/fns.inc.php';
require_once PATH_CORE . '/fns/user.functions.php';
require_once PATH_CORE . '/fns/re.php';

require_once PATH_CORE . '/lib/F/F.php';
require_once PATH_CORE . '/lib/O/O.php';
require_once PATH_CORE . '/lib/Q/Q.php';

if (!session_id())
{
	session_start();

    // if (!_session_start())
    // {
    //     session_id(uniqid());
    //     session_start();
    //     session_regenerate_id();
    // }
}

# I18N
$locale = Tools::getLocale($_SERVER['REQUEST_URI']);
setlocale(LC_ALL, $locale);

$_SESSION['sql'] = 0;
$_SESSION['sql_log'] = array();

QF('mysqli://'.DB_USER.':'.DB_PASS.'@'.DB_HOST.':'.DB_PORT.'/'.DB_BASE.'?encoding=utf8')->connect()->alias('default')->tablePrefix(DB_PREF);

FConfig(array(
    'upload_dir'	=> '/upload_dir/',
    'upload_lvl'	=> 1,
    'upload_sym'	=> 1,
    'use_temp_dir'	=> false,
	'image_driver'	=> 'Imagick' // Imagick Gmagick Gd
));

spl_autoload_register('__autoload');

$ErrorHandler = new ErrorHandler;
$ErrorHandler->register();
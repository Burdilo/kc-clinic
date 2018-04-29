<?php

error_reporting(E_ALL | E_STRICT);

define('LOCAL_SERVER', in_array($_SERVER['REMOTE_ADDR'], array('127.0.0.1', '::1')));
define('DEV_MODE', LOCAL_SERVER);

ini_set('display_errors', DEV_MODE);
ini_set('display_startup_errors', DEV_MODE);
ini_set('error_reporting', 32767);

ini_set('session.gc_maxlifetime', 2678400);
ini_set('session.cookie_lifetime', 2678400);
ini_set('session.use_only_cookies', 1);
ini_set('session.use_trans_sid', 0);

if (!defined(__DIR__))
{
	$_ROOT = $_SERVER['DOCUMENT_ROOT'];
}
else {
	$_ROOT = __DIR__;
}

if (substr($_ROOT, -1) == '/') $_ROOT = substr($_ROOT, 0, -1);

define('ADMIN_DIR', 		'cp');
define('TEMPLATING',        'Smarty'); // PHP | Smarty | Fenom | Twig
define('GZIP_COMPRESS',     true);
define('CSRF_PROTECTION',   true);
define('DEFAULT_LANGUAGE',  'ru');

# PATH
define('PATH_ROOT',			$_ROOT);
define('PATH_PROTECTED', 	'protected');
define('PATH_SECURE', 		PATH_ROOT.'/'.'protected');
define('ADMIN_PATH', 		PATH_ROOT.'/'.ADMIN_DIR);
define('PATH_CORE',         PATH_SECURE.'/'.'core');
define('PATH_MODULE', 		PATH_SECURE.'/'.'modules');
define('PATH_RUNTIME', 		PATH_SECURE.'/'.'runtime');
define('PATH_TPL', 			PATH_SECURE.'/'.'templates');
define('PATH_PUBLIC', 		PATH_ROOT.'/'.'apps');
define('PATH_EXTENSIONS', 	PATH_CORE.'/'.'extensions');

# API
define('TRANSLATE_API', 'trnsl.1.1.20150906T141528Z.634470d03ea1e762.2bad0e1f563db5cf22a91b87182866b13d349941');

require_once PATH_CORE.'/'.'config'.'/'.'config.inc.php';

// exit( t('add.something', ['string'=> 'ed']) );

//🙈🙉🙊
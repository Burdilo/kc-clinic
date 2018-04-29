<?php

/**
* CELEBRO.CMS (http://cms.celebro.ru)
*
* @copyright Copyright (c) CELEBRO lab. (http://celebro.ru)
* @license http://cms.celebro.ru/license.txt
*/

$memory = 0;
$memory = memory_get_usage();
$timestart = microtime(true);

error_reporting(E_ALL & ~E_NOTICE);

ini_set('display_errors', 1);
ini_set('session.gc_maxlifetime', 2678400);
ini_set('session.cookie_lifetime', 2678400);
//ini_set('session.save_path', PATH_RUNTIME . '/sessions');

include_once 'define.php';
include_once PATH_CORE . '/config/config.inc.php';

$filling = Q("SELECT * FROM `#__str_filling`")->all();

foreach ($filling as &$item)
{
	$item['content'] = preg_replace('/(<[^>]*) style=("[^"]+"|\'[^\']+\')([^>]*>)/i', '$1$3', $item['content']);
	$item['content'] = str_replace(array('<o:p></o:p>', ' class="MsoNormal"'), '', $item['content']);

	//Q("UPDATE `#__str_filling` SET `content`=?s WHERE `id`=?i LIMIT 1", array( $item['content'], $item['id'] ));
	$item['content'] = htmlspecialchars($item['content']);
}

exit(__debug($filling));
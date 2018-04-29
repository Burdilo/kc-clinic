<?php

/**
 * CELEBRO.CMS (http://cms.celebro.ru)
 * @copyright Copyright (c) CELEBRO lab. (http://celebro.ru)
 * @license http://cms.celebro.ru/license.txt
 */

$t1 = microtime(true);

require_once __DIR__.DIRECTORY_SEPARATOR.'define.php';

if (isset($_GET['getfile']))
{
    file_force_download($_GET['getfile']);
    exit;
}

$app = new Application;
$app->run($_SERVER);

# Log load time
#
$app->log($t1);
<?php

// files storage folder
$dir = $_SERVER['DOCUMENT_ROOT'];

$contentType = $_POST['contentType'];
$data = base64_decode($_POST['data']);

$filename = '/upload_dir/' . md5(date('YmdHis')) . '.jpg';
$file = $dir . $filename;

file_put_contents($file, $data);

$array = array(
    'filelink' => $filename
);

echo stripslashes(json_encode($array));
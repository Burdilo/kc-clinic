<?php

// files storage folder
$dir = $_SERVER['DOCUMENT_ROOT'];

$_FILES['file']['type'] = strtolower($_FILES['file']['type']);

if( in_array( $_FILES['file']['type'], array( 'image/png', 'image/jpg', 'image/gif', 'image/jpeg', 'image/pjpeg' ) ) )
{
	$ext = explode('.', $_FILES['file']['name']);
	$ext = end($ext);

    $file = '/upload_dir/' . md5(date('YmdHis')) . '.' . $ext;

    // copying
    move_uploaded_file($_FILES['file']['tmp_name'], $dir . $file);
    
    // displaying file
    $array = array(
        'filelink' => $file
    );

    echo stripslashes(json_encode($array));
}
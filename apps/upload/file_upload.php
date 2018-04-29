<?php

move_uploaded_file($_FILES['file']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . '/upload_dir/' . $_FILES['file']['name']);

$array = array(
    'filelink' => '/upload_dir/' . $_FILES['file']['name'],
    'filename' => $_FILES['file']['name']
);

echo stripslashes(json_encode($array));
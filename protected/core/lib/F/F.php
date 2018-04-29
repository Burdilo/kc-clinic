<?php

define('F_PATH', realpath(dirname(__FILE__)));

require_once F_PATH . '/file_driver.php';

function imagineLoader($class)
{
    $path = PATH_CORE . '/lib/' . str_replace('\\', DIRECTORY_SEPARATOR, $class) . '.php';
    
    if (file_exists($path)) {
        include $path;
    }
}

spl_autoload_register('\imagineLoader');

function FConfig($config = array())
{
	if (!empty($config))
	{
		file_driver::config($config);
	}
}

function F($args = array())
{
	return new file_driver($args);
}

/*
->create(100, 100)
->resize(100, 100)
->rotate(45)
->crop(new Point(0, 0), new Box(45, 45))

---

$watermark = $imagine->open('/my/watermark.png');
$image     = $imagine->open('/path/to/image.jpg');
$size      = $image->getSize();
$wSize     = $watermark->getSize();

$bottomRight = new Imagine\Image\Point($size->getWidth() - $wSize->getWidth(), $size->getHeight() - $wSize->getHeight());
$image->paste($watermark, $bottomRight);

---

$imagine->open('/path/to/image.jpg')
->show('jpg');

---

$imagine = new Imagine\Imagick\Imagine();

$imagine->open('/path/to/image.jpg')
->save('/path/to/image.jpg', array('jpeg_quality' => 50)) // from 0 to 100
->save('/path/to/image.png', array('png_compression_level' => 9)); // from 0 to 9
*/

/*
$imagine = new Imagine\Gd\Imagine();
// or
$imagine = new Imagine\Imagick\Imagine();
// or
$imagine = new Imagine\Gmagick\Imagine();

$size    = new Imagine\Image\Box(40, 40);

$mode    = Imagine\Image\ImageInterface::THUMBNAIL_INSET;
// or
$mode    = Imagine\Image\ImageInterface::THUMBNAIL_OUTBOUND;

$imagine->open('/path/to/large_image.jpg')
->thumbnail($size, $mode)
->save('/path/to/thumbnail.png')
;
*/

/*
exif

Дата съемки	01.01.70, 0:00
Размеры	1280 x 853
Название файла	-
Размер файла	-
Камера	-
Объектив	-
Фокусное расстояние	-
Экспозиция	-
Диафрагма	-
ISO	-
Марка фотокамеры	-
Вспышка	Не использовалась
Смещение экспозиции	-
Просмотры	-

*/
<?php

/*
https://github.com/verot/class.upload.php
Насколько я помню, imagecopyresized даёт более качественную картинку, так-как использует более точные алгоритмы интерполяции
*/

/*
// путь к файлу
$filename = '1.jpg';

// задание ширины и высоты
$width = 200;
$height = 200;

// создаем пустое полотно
$image_p = imagecreatetruecolor($width, $height);
// загружаем изображение из файла
$image = imagecreatefromjpeg($filename);

list($width_orig, $height_orig) = getimagesize($filename);

$ratio_orig = $width_orig/$height_orig;

if ($width/$height > $ratio_orig) {
   $width = $height*$ratio_orig;
} else {
   $height = $width/$ratio_orig;
}
// перемещаем изображение из файла на полотно с изменением масштаба
imagecopyresampled($image_p, $image, 0, 0, 0, 0, $width, $height, $width_orig,$height_orig);

// вывод
imagejpeg($image_p, '2.jpg', 100);
*/

//class image_driver_Imagick extends file_driver
//Imagick Gmagick Gd

//class Image_Driver_Imagick extends file_driver
//class Image_Driver_Gmagick extends file_driver

class image_Driver_GD extends file_driver
{
	public function thumbnail()
	{
		return $this;
	}
	
	public function crop()
	{
		return $this;
	}
	
	public function resize()
	{
		return $this;
	}
	
	public function watermark()
	{
		return $this;
	}

	public function optimize()
	{
		return $this;
	}

	private function destroy()
	{

	}
}

$image = new Image('1.jpg');

$image->resize(200,200,'width')->crop(200,200)->save('2.jpg');

/**
 * Драйвер работы с изображениями библиотеке GD.
 *
 * @author		Беляев Дмитрий <admin@cogear.ru>
 * @copyright		Copyright (c) 2012, Беляев Дмитрий
 * @license		http://cogear.ru/license.html
 * @link		http://cogear.ru
 */
class Image_Driver_GD extends Image_Driver_Abstract {

    /**
     * Создает изображение
     */
    public function create() {
        switch ($this->info->type) {
            case IMAGETYPE_JPEG:
            case IMAGETYPE_JPEG2000:
                $this->source = imagecreatefromjpeg($this->info->file);
                break;
            case IMAGETYPE_PNG:
                $this->source = imagecreatefrompng($this->info->file);
                imagecolortransparent($this->source, imagecolorallocate($this->source, 0, 0, 0));
                imagealphablending($this->source, FALSE);
                imagesavealpha($this->source, TRUE);
                break;
            case IMAGETYPE_GIF:
                $this->source = imagecreatefromgif($this->info->file);
                imagecolortransparent($this->source, imagecolorallocate($this->source, 0, 0, 0));
                imagealphablending($this->source, FALSE);
                imagesavealpha($this->source, TRUE);
                break;
            case IMAGETYPE_ICO:
                $this->source = imagecreatefromwbmp($this->info->file);
                break;
        }
    }

    /**
     * Уничтожает изображение
     */
    public function destroy() {
        imagedestroy($this->source);
        is_resource($this->target) && imagedestroy($this->target);
    }

    /**
     *  Создает целевое изображение
     *
     * @param mixed $width
     * @param mixed $height
     */
    public function createTarget($width, $height) {
        $this->target = imagecreatetruecolor($width, $height);
        if ($this->info->type == IMAGETYPE_PNG OR IMAGETYPE_GIF == $this->info->type) {
            imagecolortransparent($this->target, imagecolorallocate($this->target, 0, 0, 0));
            imagealphablending($this->target, FALSE);
            imagesavealpha($this->target, TRUE);
        }
        return $this->target;
    }

    /**
     * Изменяет масштаб изображения
     *
     * @param   int|string $width   Ширина
     * @param   int|string $height  Высота
     * @param   string $fit   Тип масштабирования width, height, fit
     * @param   int|string $scale   Какие изображения масштабировать any, up, down
     * @return  object  Изображение
     */
    public function resize($width, $height, $fit = 'width', $scale = 'any') {
        $source_width = $this->smartSize($width, 'width');
        $source_height = $this->smartSize($height, 'height');
        // Проверяем тип масштабирования
        switch ($fit) {
            // Если подравниваем по ширине, то приводим высоту к нужным пропорциям
            case 'width':
                $width = $source_width;
                $height = round(($source_width * $this->info->height) / $this->info->width);
                break;
            // Если подравниванием по высоте, то приводим ширину к нужным пропорциям
            case 'height':
                $width = round(($this->info->width * $source_height) / $this->info->height);
                $height = $source_height;
                break;
            case 'crop':
                if ($this->info->width > $this->info->height) {
                    $width = round(($this->info->width * $source_height) / $this->info->height);
                    $height = $source_height;
                }
                else {
                    $width = $source_width;
                    $height = round(($this->info->height * $source_width) / $this->info->width);
                }
                break;
            // По умолчанию просто растягиваем
            default:
            case 'fit':
        }
        // Проверяем будет ли производиться масштабирование
        switch ($scale) {
            // Если изображение больше указанных размеров, с ним ничего не происходит
            case 'up':
                if ($width < $this->info->width && $height < $this->info->height) {
                    return $this;
                }
                break;
            // Если изображение меньше указанных размеров, с ним ничего не происходит
            case 'down':
                if ($width > $this->info->width && $height > $this->info->height) {
                    return $this;
                }
                break;
            case 'any':
            default:
            // Ничего не делаем. Филоним
        }

        $this->target = $this->createTarget($width, $height);
        if (imagecopyresampled($this->target, $this->source, 0, 0, 0, 0, $width, $height, $this->info->width, $this->info->height)) {
            $this->source = $this->target;
            $this->info->width = $width;
            $this->info->height = $height;
            if('crop' == $fit){
                return $this->crop('center','center' ,$source_width,$source_height);
            }
        }
        return $this;
    }

    /**
     * Производит обрезку изображения
     *
     * @param   mixed   $x  Координата обрезки x
     * @param   mixed   $y  Координата обрезки y
     * @param   mixed   $width Ширина обрезки
     * @param   mixed   $height Высотка обрезки
     * @return  object  Изображение
     */
    public function crop($x, $y, $width, $height) {
        $x = $this->smartSize($x, 'width') - $width/2;
        $y = $this->smartSize($y, 'height') - $height/2;
        $width = $this->smartSize($width, 'width');
        $height = $this->smartSize($height, 'height');
        $this->target = $this->createTarget($width, $height);
        if (imagecopyresampled($this->target, $this->source, 0, 0, $x, $y, $width, $height, $width, $height)) {
            $this->source = $this->target;
            $this->info->width = $width;
            $this->info->height = $height;
        }
        return $this;
    }

    /**
     * Производит слияние изображений
     */
    public function merge(Image $image, $x, $y, $percent = 100) {
        $x = $this->smartSize($x, 'width');
        $y = $this->smartSize($y, 'height');
        if (imagecopymerge($this->source, $image->getSource(), $x, $y, 0, 0, $image->object()->image->width, $image->object()->image->height, $percent)) {

        }
        return $this;
    }

    /**
     * Сохраняет изображение
     */
    public function save($file = NULL, $options = array()) {
        $this->target OR $this->target = $this->source;
        if (strpos($file, '.') OR $file = $this->info->file) {
            $ext = pathinfo($file, PATHINFO_EXTENSION);
            $ext = strtolower($ext);
        } else {
            $ext = strtolower($file);
            $file = NULL;
        }
        switch ($ext) {
            case 'jpg':
            case 'jpeg':
                $options OR $options = 90;
                imagejpeg($this->target, $file, $options);
                break;
            case 'gif':
                imagecolortransparent($this->target, imagecolorallocatealpha($this->target, 0, 0, 0, 127));
                imagealphablending($this->target, FALSE);
                imagesavealpha($this->target, TRUE);
                imagegif($this->target, $file);
                break;
            case 'png':
                imagealphablending($this->target, FALSE);
                imagesavealpha($this->target, TRUE);
                if (is_numeric($options)) {
                    $quality = $options;
                    $filters = PNG_NO_FILTER;
                } else {
                    $quality = isset($options['quality']) ? $options['quality'] : 9;
                    $filters = isset($options['filters']) ? $options['filters'] : PNG_NO_FILTER;
                }
                imagepng($this->target, $file, $quality, $filters);
                break;
        }
        $this->destroy();
    }

    /**
     * Выводит изображение
     */
    public function output($format, $options) {
        $this->save($format, $options);
    }

}


$img=new cms_img;
# Создает изображение с шириной и высотой и цветом, если false заменить на 1 то изображение будет прозрачным
$img->create(350,350,"#000000",false);
# Загружаем существующее изображение
$img->load("img.jpg");
# загружает картинку через CURL ,
# $url - адрес изображения, $tmp - временный файл изображения (не папка)
# файл не сохраняется, а только загружается в класс, для сохранения используйте метод save()
$img->load_url($url,$tmp)
# Установка логотипа, возможны варианты в 4 угла.
# углы пронумерованы по часовой стрелке , начало с верхнего левого угла
$img->setlogo("logo.png",1);
# Изменяет изображение на 90%
$img->resize(90);
# Изменяет изображение до указаной ширины высоты
$img->resize(500,400);
# Сохраняет изображение по указанному адресу
# второй аргумент если установить =1, то к названию файла будет автоматически прикрепляться расширение файла
$img->save("2.jpg",false);
# возвращает идентификатор изображения
# это на случай, если на каком то этапе с изображением, кто-то решит своими руками внести чего
$img->return_img();
# Передать индекатор изображения, ну из предыдущей команды должно быть понятно зачем
$img->set_img($img);
# Печатаем текст на картинку
# должны быть свой шрифт, смотрите чтоб шрифт поддерживал, то что печатаем
# text(текст,шрифт,цвет в виде #000000,размер,угол,координата x,координата y,прозрачность от 0-непрозрачно до 127 - обсалютно прозрачно)
$img->text("STARTS","action.ttf","#ffffff",30,-50,10,10,0);
# Выводит картинку на экран
$img->output();
# Освобождает память от изображения
$img->destroy();
# возращает массив данных на текущий момент array('w'=>'длинна изображения','h'='высота')
$imglogo->sxy();
# Произвести принудительную замену типа изображения, доступные значение для $type:
# 1=GIF ; 2=JPEG; 3=PNG
$img->set_type(1);
# Метод получения расширения картинки, метод предназначен для использования в методе save, но может кому понадобится
# метод не имеет аргументов
$img->extension();

/*
Ну и собственно как примеры использования:

Вариант 1:

$img=new cms_img;
$img->load(«111.jpg»);
$img->setlogo(«logo.png»,1);
$img->set_type(1); // изменяем тип изображения на GIF
$img->save(«2»); // сохранится с именем 2
$img->save(«2»,1); // сохранится с именем 2.gif
$img->output();
$img->destroy();

Вариант 2:

$img=new cms_img;
$img->create(350,350,"#000000");
$im=$img->return_img();
$text_color = imagecolorallocate ($im, 233, 14, 91);
imagestring ($im, 50, 5, 5,«A Simple Text String», $text_color);
$img->set_img($im);
$img->save(«2.jpg»);
$img->output();
$img->destroy();

Вариант 3:

$img=new cms_img;
$img->load(«111.jpg»);
$img->resize(60);
$img->save(«2.jpg»);
$img->output();
$img->destroy();

Вариант 4:

$img=new cms_img;
$img->load(«111.jpg»);
$img->resize(180,150);
$img->save(«2.jpg»);
$img->output();
$img->destroy();

Вариант 5:

$img=new cms_img;
$img->load(«111.jpg»);
$img->text(«CLASS CMS_IMG»,«action.ttf»,"#F5a50f",30,-30,20,20,100);
$img->save(«2.jpg»);
$img->output();
$img->destroy();

Вариант 6:
Вот тут даже математику добавил с вычислением угла под которым в диагонали накладывать надпись

$text=«TEXT TEXT»;
$img=new cms_img;
$img->load(«660.jpg»);
$sxy=$img->sxy();
$sxy['g']=hypot ($sxy['w'],$sxy['h']);
$st=($sxy['h']==min($sxy['w'],$sxy['h']))?$sxy['h']:$sxy['w'];
$gr=floor(rad2deg($st*sin(90)/$sxy['g']));
$size= ceil(($sxy['w']+$sxy['h'])/2/strlen($text));
$ot_w=ceil($sxy['w']-$size*strlen($text)+30);
$img->text($text,«SKURRI.TTF»,"#Ffffff",$size,$gr,$ot_w,ceil($sxy['h']/100*80),110);
$img->output();
$img->destroy();

Вариант 7:

$img=new cms_img;
$img->load_url('http://vi.sualize.us/thumbs/09/02/02/animal,animals,bitty2,cat,cute-a966d93a53edd4728202920b20aebbfd_h.jpg',tmp/tmp.png');
$img->resize(50);
$img->output();
$img->save(«img1.gif»);
$img->destroy();

*/

class cms_img {

protected $srcImage=false;  //  дескриптор созданного изображения
protected $coordinate=4; // 1-верхний, левый, 2-правый, верхний, 3-нижний, правый...
protected $coord=array();
protected $namefile='000.png';
protected $tmp='000.png';
public $image_type=3;

// Передаем дефолтное название картинки, если оно в дальнейшем не будет указано и тип создаваемого изображения
function __construct($tmp='000.png',$image_type=3,$namefile='000.png') {
  $this->image_type=$image_type;
  $this->namefile=$namefile;
  $this->tmp=$tmp;
}


// Произвести принудительную замену типа изображения? доступные значение:
// 1=GIF ; 2=JPEG; 3=PNG
protected function set_type($type) {
  $type=strtr($type,array("gif"=>1,"jpeg"=>2,"jpg"=>2,"png"=>3,"GIF"=>1,"JPEG"=>2,"JPG"=>2,"PNG"=>3));
  if($type==1||$type==2||$type==3){
    $this->image_type=$type;
  }
}


// Метод для получения dst_x и dst_y  функции  imagecopy
protected function coordinat($srcWidth, $srcHeight, $logoWidth, $logoHeight){
  if($this->coordinate==1){
    $this->coord['dst_x']=0;
    $this->coord['dst_y']=0;
  } elseif($this->coordinate==2){
    $this->coord['dst_x']=$srcWidth - $logoWidth;
    $this->coord['dst_y']=0;
  } elseif($this->coordinate==3){
    $this->coord['dst_x']=$srcWidth - $logoWidth;
    $this->coord['dst_y']=$srcHeight - $logoHeight;
  } else {
    $this->coord['dst_x']=0;
    $this->coord['dst_y']=$srcHeight - $logoHeight;
  }
}

// создаёт новое изображение из файла
// $filename адрес исхизображения
protected function imagecreatefrom($filename) {
    $image_info = getimagesize($filename);
    $this->image_type=$image_info[2];
    if($this->image_type==2 ) {
        return imagecreatefromjpeg($filename);
    } elseif($this->image_type==1 ) {
        return imagecreatefromgif($filename);
    } elseif($this->image_type==3 ) {
        return imagecreatefrompng($filename);
    } else {
      return false;
    }
}

// загрузка изображения из файла  аргумент
// $img от куда читаем
public function load($img){
  $this->namefile=$img;
  if($this->imagecreatefrom($this->namefile)!=false){
    	$this->srcImage = $this->imagecreatefrom($this->namefile);
    } else {
        return false;
    }
}

// Вывод изображения на экран
public function output(){
    if($this->image_type==2){
        header("Content-Type: image/jpg");
        ImageJPEG($this->srcImage);
    } elseif($this->image_type==1){
        header("Content-Type: image/gif");
        ImageGIF($this->srcImage);
    } else {
        header("Content-Type: image/png");
        ImagePNG($this->srcImage);
    }
}


// Получаем расширение файла, метод необходим для автоматическом добавлении расширения файла используемом в методе save()
public function extension(){
    if($this->image_type==2){
        return "jpg";
    } elseif($this->image_type==1){
        return "gif";
    } else {
        return "png";
    }
}

// Сохранение изображения в файл  аргумент $namefile - куда сохранять
public function save($namefile=false,$type=false){
  $this_namefile=$namefile?$namefile:$this->namefile;
  $type==1?$this_namefile.'.'.$this->extension():$this_namefile;
    if($this->image_type==2) {
        ImageJPEG($this->srcImage, $this_namefile, 100);
    } elseif($this->image_type==1 ) {
        ImageGIF($this->srcImage, $this_namefile);
    } else {
        ImagePNG($this->srcImage, $this_namefile);
    }
}

// Получение ширины и высоты текущего изображения
public function sxy(){
    $this->srcWidth  = ImageSX($this->srcImage);
    $this->srcHeight = ImageSY($this->srcImage);
    return  array("w"=>$this->srcWidth,"h"=>$this->srcHeight);
}

// Установка логотипа на изображение
// $logosrc - адрес логотипа, $coordinate = угол изображения:
// 1-верхний, левый, 2-правый, верхний, 3-нижний, правый...
public function setlogo($logosrc,$coordinate=false)
{
  $this->coordinate=$coordinate!=false&&filter_var($coordinate,FILTER_VALIDATE_INT)?$coordinate:$this->coordinate;
    $logoImage = $this->imagecreatefrom($logosrc);

    $srcWidth  = ImageSX($this->srcImage);
    $srcHeight = ImageSY($this->srcImage);

    $logoWidth  = ImageSX($logoImage);
    $logoHeight = ImageSY($logoImage);

    imageAlphaBlending($logoImage, false);
    imageSaveAlpha($logoImage, true);

    $trcolor = ImageColorAllocate($logoImage, 255, 255, 255);
    ImageColorTransparent($logoImage , $trcolor);

    $this->coordinat($srcWidth, $srcHeight, $logoWidth, $logoHeight);
    imagecopy($this->srcImage, $logoImage, $this->coord['dst_x'], $this->coord['dst_y'],0,0, $logoWidth, $logoHeight);

    unset($logoImage);
}

// Изменение размера изображения
// $width - ширина,  $height высота,
// если не указать $height , то аргумент $width будет считать процентным соотношением во сколько процентов изменять масштаб
public function resize($width,$height=false){

  // Проверяем корректность введения ширины и высоты
  $width=filter_var($width,FILTER_VALIDATE_INT)?$width:false;
  $height=filter_var($height,FILTER_VALIDATE_INT)?$height:false;

  // Если ширина не указана или указана некорректно, то будет игнорироватся изменение масштаба изображения
  if(($width!='100'&&$height==false) or ($width!=false&&$height!=false)){
  $w_src = ImageSX($this->srcImage);
  $h_src = ImageSY($this->srcImage);

  // Если не указана высота, то по процентному соотношению вычисляем новый масштаб
 	if($height==false){
    $height=($h_src/100)*$width;
    $width=($w_src/100)*$width;
 	}

  $dest = imagecreatetruecolor($width,$height);

  if($height==$width){
    if ($w_src>$h_src) {
      imagecopyresized($dest, $this->srcImage, 0, 0, round((max($w_src,$h_src)-min($w_src,$h_src))/2), 0, $width, $height, min($w_src,$h_src), min($w_src,$h_src));
    } else {
      imagecopyresized($dest, $this->srcImage, 0, 0, 0, round((max($w_src,$h_src)-min($w_src,$h_src))/2), $width, $height, min($w_src,$h_src), min($w_src,$h_src));
    	}
    } else {
  imagecopyresized($dest, $this->srcImage, 0, 0, 0, 0, $width, $height, $w_src, $h_src);
  }

  $this->srcImage=$dest;
  unset($dest);

  }
}

// освобождает память, ассоциированную с изображением
public function destroy(){
  ImageDestroy($this->srcImage);
}

// Наложение текста на изображение
// $text - текст, $fontfile - путь к файлу со шрифтами, $color цвет в виде #000000, по умолчанию #000000
// $size - размер шрифта , $angle - угол в градусах , $x - координата x - от куда печатать, $y - координата y, от куда печатать,
// $pr - прозрачность от 0-непрозрачно до 127 - обсалютно прозрачно
public function text($text,$fontfile,$color='#000000',$size=20,$angle=0,$x=10,$y=10,$pr=0){
    $col=$this->htmltorgb($color);
    $color = imagecolorallocatealpha($this->srcImage, $col[0],$col[1], $col[2],$pr);
  imagettftext ($this->srcImage,$size,$angle,$x,$y,$color,$fontfile,$text);
}

// Метод для получения цвета из html в rgb
// $color - цвет в html
protected function htmltorgb($color)
{
    if ($color[0] == '#'){
        $color = substr($color, 1);
    }
    if (strlen($color)==6){
        list($r,$g,$b)=array($color[0].$color[1], $color[2].$color[3], $color[4].$color[5]);
    } elseif (strlen($color) == 3){
        list($r, $g, $b) = array($color[0].$color[0], $color[1].$color[1], $color[2].$color[2]);
    } else {
        return false;
  }
    $r = hexdec($r); $g = hexdec($g); $b = hexdec($b);
    return array($r, $g, $b);
}

// Создает новое изображение шириной $width и высотой $height
// цветом $color (в html виде , по умолчанию #ffffff)
// Если нужна прозрачность то 4 аргумент $pr указывать $pr=1
public function create($width,$height,$color='#ffffff',$pr=false) {
  $width=filter_var($width,FILTER_VALIDATE_INT)?$width:200;
  $height=filter_var($height,FILTER_VALIDATE_INT)?$height:200;
    $col=$this->htmltorgb($color);
    $this->srcImage = imagecreatetruecolor($width,$height);
    $color = imagecolorallocate($this->srcImage, $col[0],$col[1], $col[2]);
    imagefilledrectangle($this->srcImage, 0, 0, ($width-1), ($height-1), $color);
    if($pr==1){
    	imagetruecolortopalette($this->srcImage, true, 1);
    	imagecolortransparent($this->srcImage,$color);
    }
}

// Возвращает идентификатор изображения для работы с ним вне класса
public function return_img(){
 	return $this->srcImage;
}

// Передаем идентификатор изображения для работы с ним внутри класса
// $img - идентификатор загружаемого изображения
public function set_img($img){
    $this->srcImage=$img;
}

// освобождает память, ассоциированную с изображением
function __destruct() {
  ImageDestroy($this->srcImage);
}

// метод получения изображения по URL
// $url - урл изображения, $tmp - временное место хранения
public function load_url($url,$tmp){
  if(filter_var($url,FILTER_VALIDATE_URL)){
    	$ch = curl_init($url);
    $fp = fopen($tmp, "w");
    curl_setopt ($ch,CURLOPT_USERAGENT,'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.1) Gecko/20061204 Firefox/2.0.0.1');
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_FILE, $fp);
    curl_exec($ch);
    curl_close($ch);
    fclose($fp);
    if(file_exists($tmp)&&$this->load($tmp)==false){
      unlink($tmp);
      return false;
    } else {
       	unlink($tmp);
      return true;
    }
  } else {
    return false;
  }
}

}
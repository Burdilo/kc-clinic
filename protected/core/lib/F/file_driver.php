<?php

class file_driver
{
    use Singleton, Tools;

	private static $_instance 	= null;

	private static $config		= array(
	    'image_driver'		=> 'Gd', // Imagick Gmagick Gd
	    'upload_dir'		=> '/upload_dir/',
	    'upload_lvl'		=> 1,
	    'upload_sym'		=> 2,
	    'use_temp_dir'		=> false,
	    'options'			=> array('jpeg_quality' => 80, 'png_compression_level' => 9)
	);

	protected $_config	= array();

	protected $_args 	= array();
	protected $_folder 	= null;
	protected $_upload_dir = '';
	protected $_upload_lvl = 2;
	
	protected $imagine	= null;
	protected $db_files	= '#__sys_files';
	protected $is_multi	= false;
	protected $_temp 	= array();
	protected $last_id	= 0;
	protected $file_id	= 0;
	protected $group_id	= '';
	protected $file_prefix	= 'original';

	protected $valid = array(
			0 => UPLOAD_ERR_OK,
			1 => UPLOAD_ERR_INI_SIZE,
			2 => UPLOAD_ERR_FORM_SIZE,
			3 => UPLOAD_ERR_PARTIAL,
			4 => UPLOAD_ERR_NO_FILE,
			6 => UPLOAD_ERR_NO_TMP_DIR,
			7 => UPLOAD_ERR_CANT_WRITE,
			8 => UPLOAD_ERR_EXTENSION
		);

	public static function getInstance()
	{
		if (is_null(self::$_instance))
		{
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	public function __construct($args = array())
	{
		$this->_args = $args;
		$this->_config = self::$config;

		$this->_validate();

		if (extension_loaded($this->_config['image_driver']))
		{
			$_driver = $this->_config['image_driver'];
		}
		else
		{
			$_driver = null;

			$drivers = array(
				'Imagick',
				'Gmagick',
				'Gd'
			);

			$alternative = array_diff($drivers, array($this->_config['image_driver']));

			foreach ($alternative as $a)
			{
				if (extension_loaded($a) && $_driver === null)
				{
					$_driver = $a;
				}
			}
		}
		
		$this->_imageDriver($_driver);
	}

	public static function config($config = array())
	{
		if (!empty($config))
		{
			self::$config = array_merge(self::$config, $config);
		}
	}

	public function upload($group_id = '', $settings = array())
	{
		$this->group_id = $group_id;

		if (!$this->group_id)
		{
			$this->group_id = substr(md5(uniqid() . time()), 0, 12);
		}

		if (!empty($this->_args))
		{
			$flag = false;

			if (!$this->is_multi)
			{
				$this->_temp = $this->_args;

				// Создаем подпапки
				$this->_create();

				// Загружаем файлы
				$this->_upload();
			}
			else
			{
				$this->_args = $this->_prepareArray($this->_args);

				foreach ($this->_args as $name => $file)
				{
					$this->_temp = $file;

					// Создаем подпапки
					$this->_create();
					
					// Загружаем файлы
					$this->_upload();
				}
			}
		}

		return $this;
	}

	public function getImage()
	{
		return $this->_temp;
	}

	public function resize($settings = array())
	{
		if (empty($this->_temp) && empty($this->_args)) {
			return $this;
		}

		if (!empty($settings))
		{
			if (empty($this->_temp))
			{
				$this->_temp = $this->_args;
			}

			$_source  = PATH_ROOT . $this->_temp['file'];
			$original = $this->imagine->open($_source);

			if (file_exists($_source))
			{
				list($w, $h) = getimagesize($_source);

				$ratio = 1;

				if ($w >= $h)
				{
				 $ratio = $w / $h;
				}
				else
				{
				 $ratio = $h / $w;
				}

				foreach ($settings as $param)
				{
					$_width  = $param['width'];
					$_height = $param['height'];

					if ($_width == 0 && $_height !== 0)
					{
						$_width = ceil($_height * $ratio);
					}

					if ($_height == 0 && $_width !== 0)
					{
						$_height = ceil($_width * $ratio);
					}

					if ($_width > 0 && $_height > 0)
					{
						$image = str_replace('.', '_' . $param['prefix'] . '.', $this->_temp['file']);

						$mode   = Imagine\Image\ImageInterface::THUMBNAIL_INSET;
						$mode   = Imagine\Image\ImageInterface::THUMBNAIL_OUTBOUND;

						$size 	= new Imagine\Image\Box($_width, $_height);

						$original
								->thumbnail($size, $mode)
								->save(PATH_ROOT . $image, $this->_config['options']);

						if (file_exists(PATH_ROOT . $image))
						{
							Q("INSERT INTO `#__sys_files` SET `gid`=?s, `prefix`=?s, `fid`=?i, `file`=?s, `size`=?s, `created`=?i", array(
								$this->_temp['gid'],
								$param['prefix'],
								$this->_temp['id'],
								$image,
								filesize(PATH_ROOT . $image),
								time()
							));
						}
					}
				}
			}
		}

		/*
		$image->resize(
			$image->getSize()->widen( 700 )
		);

		$image->resize(new Box(15, 25))
		   ->rotate(45)
		   ->crop(new Point(0, 0), new Box(45, 45))
		   ->save('/path/to/new/image.jpg');

		$image->resize(new Box(15, 25))

		$image->resize(new Box(15, 25), ImageInterface::FILTER_LANCZOS);

		$size  = new Imagine\Image\Box(400, 300);
		$image = $imagine->create($size);

		$palette = new Imagine\Image\Palette\RGB();
		$size  = new Imagine\Image\Box(400, 300);
		$color = $palette->color('#000', 100);
		$image = $imagine->create($size, $color);


		$watermark = $imagine->open('/my/watermark.png');
		$image     = $imagine->open('/path/to/image.jpg');
		$size      = $image->getSize();
		$wSize     = $watermark->getSize();
		$bottomRight = new Imagine\Image\Point($size->getWidth() - $wSize->getWidth(), $size->getHeight() - $wSize->getHeight());
		$image->paste($watermark, $bottomRight);


		$wm = $imagine->open('watermark_path');
		$image = $imagine->open('image_path');
		$point = new Point($x, $y); // position on image

		$image->paste($wm, $point);
		$image->save('path_to_save');
	   */
	}

	/**
	 * 
	 */
	
	public function search()
	{
		/*
		$dir = "./backups/";
	    // проверяем, что $dir - каталог
	    if (is_dir($dir)) {
	        // открываем каталог
	        if ($dh = opendir($dir)) {
	            // читаем и выводим все элементы
	            // от первого до последнего
	            while (($file = readdir($dh)) !== false) {
	                if(fnmatch('myfile_*.txt', $file))
	                    echo 'Резервная копия: ';

	                echo "$file : " .
	                     filetype($dir . $file) . "<br />\n";

	            }
	            // закрываем каталог
	            closedir($dh);
	        }
	    }

	    foreach (glob("./backups/*.txt") as $filename) {
	        echo "$filename : " . filesize($filename) . " байт\n";
	    }
	    */
	}

	public function readDir()
	{
		/*
		$full_path = "/full/path/to/myfile.txt";
	    echo basename($full_path);
	    // выводит "myfile.txt"
	    echo basename($full_path, '.ext');
	    // выводит "myfile"
	    */

	  	/*Возвращает строку или массив строк, содержащий части пути $path (имя каталога, имя файла, расширение)

	    $filename = "/full/path/to/myfile.txt";
	    $parts = pathinfo($filename);

	    echo $parts['dirname'], "\n";
	    echo $parts['basename'], "\n";
	    echo $parts['extension'], "\n";
	    echo $parts['filename'], "\n";

	    // получим на выходе
	    //  /full/path/to
	    //  myfile.txt
	    //  txt
	    //  myfile*/

		return $this;
	}
	/**
	 * 
	 */
	
	public function save()
	{
		/*
		Создаёт в системном временном каталоге временный файл со случайным именем. Созданный файл удаляется немедленно после закрытия.
	    $temp_file = tmpfile();
	    fwrite($temp, "=пишем в файл...=");
	    fseek($temp, 0);
	    echo fread($temp, 1024);
	    // выводится
	    // =пишем в файл...=
	    fclose($temp); // закрываем и удаляем файл
		*/

		return $this;
	}

	/**
	 * 
	 */

	protected function remove()
	{
		/*
		$file = "./backups/readme_123.txt";

	    if(!unlink($file)) {
	        echo "Ошибка удаления файла $file...<br />\n";
	    }

	    //удаления каталогов

	    $directory = "./backups";

	    if(!rmdir($directory)) {
	        echo "Ошибка удаления каталога $directory...<br />\n";
	    }
	    */

		return $this;
	}

	/**
	 * 
	 */

	protected function duplicate()
	{
		/*
		$source = 'readme.txt';
	    $dest = 'readme_copy.txt';

	    if(!copy($source, $dest)) {
	        echo "Ошибка копирования файла $source...<br />\n";
	    }
		*/

		return $this;
	}

	/**
	 * 
	 */

	protected function relocate()
	{
		/*
		$number = 123;

	    $source = 'readme.txt';
	    $dest = "./backups/readme_$number.txt";

	    if(!rename($source, $dest)) {
	        echo "Ошибка перемещения файла $source...<br />\n";
	    }
	    */

		return $this;
	}


	/**
	 * 
	 */
	
	private function _upload()
	{
		$this->_upload_file($this->_temp);
	}

	/**
	 * 
	 */

	protected function _create($dir = '')
	{
		if (isset($this->_temp['name']))
		{
			if (is_array($this->_temp['name']))
			{
				$name = $this->_temp['name'][0];
			}
			else
			{
				$name = $this->_temp['name'];
			}
		
			$this->_filedir = substr(md5($name), 0, $this->_config['upload_sym']);

			if (!is_dir(PATH_ROOT . $this->_config['upload_dir'] . $this->_filedir))
			{
				if (!is_dir(PATH_ROOT . $this->_config['upload_dir']))
				{
					mkdir(PATH_ROOT . $this->_config['upload_dir']);
				}
				
				mkdir(PATH_ROOT . $this->_config['upload_dir'] . $this->_filedir);
			}
		}

		return $this;
	}

	private function _validate()
	{
		if (is_array($this->_args))
		{
			if ($this->is_associative())
			{
				$this->is_multi = true;

				foreach ($this->_args as $key => $value)
				{
					if (isset($value['error']) && ($value['error'] == 4 || $value['error'][0] == 4))
					{
						unset($this->_args[$key]);
					}

					if (isset($value['link']))
					{
						$ch = curl_init($value['link']);

						curl_setopt($ch, CURLOPT_NOBODY, true);
						curl_exec($ch);

						$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
						curl_close($ch);

						if ($code !== 200)
						{
							unset($this->_args[$key]);
						}
					}
				}
			}
			else
			{
				$this->is_multi = false;

				if (isset($this->_args['error']) && ($this->_args['error'] == 4 || $this->_args['error'][0] == 4))
				{
					unset($this->_args);
				}

				if (isset($this->_args['link']))
				{
					$ch = curl_init($this->_args['link']);

					curl_setopt($ch, CURLOPT_NOBODY, true);
					curl_exec($ch);

					$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
					curl_close($ch);

					if ($code !== 200)
					{
						unset($this->_args);
					}
				}
			}
		}
		else
		{

		}
	}

	private function _download($link = '', $output_filename = '')
	{
		if ($link != '')
		{
			if (function_exists('curl_version'))
			{
				set_time_limit(0);
				
				$url = parse_url($link);

			    $ch = curl_init();
			    curl_setopt($ch, CURLOPT_URL, $link);
			    curl_setopt($ch, CURLOPT_VERBOSE, 1);
			    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			    curl_setopt($ch, CURLOPT_AUTOREFERER, false);
			    curl_setopt($ch, CURLOPT_REFERER, $url['host']);
			    curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
			    curl_setopt($ch, CURLOPT_HEADER, 0);
			    $result = curl_exec($ch);
			    curl_close($ch);

			    $fp = fopen(PATH_ROOT . $output_filename, 'w');
			    fwrite($fp, $result);
			    fclose($fp);

				return true;
			}
			else
			{
				return file_put_contents(PATH_ROOT . $output_filename, file_get_contents($link));
			}
		}

		return false;
	}

	private function _imageDriver($driver = 'Gd')
	{
		switch ($driver)
		{
			case 'Gd':
				$this->imagine = new Imagine\Gd\Imagine();
			break;
			
			case 'Imagick':
				$this->imagine = new Imagine\Imagick\Imagine();
			break;

			case 'Gmagick':
				$this->imagine = new Imagine\Gmagick\Imagine();
			break;
			
			default:
				$this->imagine = new Imagine\Gd\Imagine();
			break;
		}
	}

	private function _upload_file($file = array())
	{
		if (isset($file['tmp_name']))
		{
			$tmp_name = $file['tmp_name'];
		}
		elseif (isset($file['link']))
		{
		 	$tmp_name = $file['link'];
		}

		$file_name = $this->_prepare_name($file['name'], $tmp_name);
		$file_path = $this->_config['upload_dir'] . $this->_filedir . '/' . $file_name;

		if (isset($file['tmp_name']) && move_uploaded_file($file['tmp_name'], PATH_ROOT . $file_path) ||
			isset($file['link']) && $this->_download($file['link'], $file_path))
		{
			chmod(PATH_ROOT . $file_path, 0644);
			
			$this->_insert($file_name, $file_path, filesize(PATH_ROOT . $file_path));

			$this->_temp['id'] = $this->last_id;
			$this->_temp['gid'] = $this->group_id;
			$this->_temp['file'] = $file_path;

			return $file_path;
		}

		return false;
	}

	private function _prepare_name($name = '', $tmp_name = '')
	{
		$temp = explode('.', $name);

		$file_name = substr(md5(uniqid()), 0, 5);
		$file_name .= '_';
		$file_name .= substr(md5(uniqid()), 5, 10);
		$file_name .= '.' . end($temp);

		return $file_name;
	}

	private function _insert($name = '', $file = '', $size = '', $title = '')
	{
		if ($title == '')
		{
			$title = $name;
		}

		$ord = 0;		
		
		$file = str_replace('/', '/', $file);

		$this->last_id = 
			Q("INSERT INTO `" . $this->db_files . "` SET 
				`gid`=?s,
				`fid`=?i,
				`prefix`=?s,
				`name`=?s,
				`file`=?s,
				`size`=?i,
				`alt`=?s,
				`title`=?s,
				`ord`=?i,
				`created`=?i,
				`updated`=?i",
				//ON DUPLICATE KEY UPDATE `updated`=?s",
			array(
				$this->group_id,
				$this->file_id,
				$this->file_prefix,
				$name,
				$file,
				$size,
				$title,
				$title,
				$ord,
				time(),
				time()
			));
	}

	private function is_associative()
	{
		return is_array($this->_args['name']);
	}
}
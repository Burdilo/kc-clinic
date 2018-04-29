<?php

final class imagesController extends cpLoader
{
    use Singleton;
	
	public function __construct()
	{
        parent::__construct();
        
		define("SOURCE_DIR", "/exchange/");
		define("IMPORT_DIR", "/upload_dir/");
	}
	
	public function index()
	{
		$group_id 	= __get("group_id");
		$field_id 	= __get("field_id");

		$info['field_info'] = getFieldInfo($field_id);

		if ($this->method == "read")
		{
			$info['rDir'] = rDir(PATH_ROOT.IMPORT_DIR);
		}
		elseif ($this->method == "import")
		{
			$f = new Files();
			$q = new Mysql();
			$f->prefix = "import";
			$settings = unserialize($info['field_info']['photo_settings']);

			foreach( rDir(PATH_ROOT.IMPORT_DIR) as $k=>$v )
			{
				$file_name = SOURCE_DIR. $f->prepareName($v['name'], $k);
				rename( PATH_ROOT. IMPORT_DIR . iconv( "UTF-8", "windows-1251", $v['name'] ) , PATH_ROOT.$file_name);
				
				if ( file_exists( PATH_ROOT . $file_name ) ) {
					$size = filesize( PATH_ROOT.$file_name);
					$file_id = Q("INSERT INTO `#__sys_files` SET `group_id`=?s, `real_name`=?s, `sys_name`=?s, `size`=?i ON DUPLICATE KEY UPDATE `created`=NOW()", array(
						$group_id, $v['name'], $file_name, $size
					));
					#	Crop or resize
					crop_resize($file_name, $file_id, $settings);
				}
			}
			
			redirect($this->base_path . '/?good&field_id=' . __get("field_id"));
		}
		elseif ($this->method == "good")
		{
			$info['good'] = 1;
		}

        return $info;
	}
}
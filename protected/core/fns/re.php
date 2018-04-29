<?php

function get_data($url)
{
	$ch = curl_init();
	$userAgent = 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322)';
	
	curl_setopt($ch, CURLOPT_USERAGENT, $userAgent);
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
	curl_setopt($ch, CURLOPT_FAILONERROR, true);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
	curl_setopt($ch, CURLOPT_AUTOREFERER, true);
	curl_setopt($ch, CURLOPT_TIMEOUT, 10);
	
	$data = curl_exec($ch);
	curl_close($ch);

	return $data;
}

function getProvenPath($url)
{
	if (checkLink($url) && is_url($url))
	{
		return $url;
	}
	return '';
}

function checkLink($url)
{
	$handle = fopen($url, "r");
	if ($handle) {
		fclose($handle); return true;
	}
	return false;
}

function getUniqueCode($length = 12)
{
	$code = md5(uniqid(rand(), true));
	if ($length != "") return substr($code, 0, $length);
	else return $code ;
}

function getfl($list, $val='')
{
	if ($val == '')
	{
		$arr = Q("SELECT `var`, `value` FROM `#__mdd_lists` WHERE `list_name` LIKE ?s ORDER BY `var` ASC", array($list))->all('value');
		
		if (!empty($arr))
		{
			foreach($arr as $k => $v)
			{
				$arr[ $k ] = $v['var'] ;
			}
		}
		
		return $arr ;
	}
	else
	{
		return Q("SELECT `var` FROM `#__mdd_lists` WHERE `list_name` LIKE ?s AND `value` LIKE ?s LIMIT 1 ", array($list, $val))->row('var');
	}
}

function getfl_asoc($list, $val='')
{
	if ($val == '')
	{
		$arr = Q("SELECT `var`, `value`, `default` FROM `#__mdd_lists` WHERE `list_name` LIKE ?s ORDER BY `var` ASC", array($list))->all('value');
		
		if (!empty($arr))
		{
			foreach($arr as $k => $v)
			{
				$arr[ $k ] = array(
					'name'      =>  $v['var'],
					'default'   =>  $v['default']
			   );
			}
		}
		
		return $arr ;
	}
	else
	{
		return Q("SELECT `var` FROM `#__mdd_lists` WHERE `list_name` LIKE ?s AND `value` LIKE ?s LIMIT 1 ", array($list, $val))->row('var');
	}
}

function getfl_arr($name)
{
	return Q("SELECT `id`, `var`, `value` FROM `#__mdd_lists` WHERE `list_name`=?s ORDER BY `var`", array($name))->all() ;
}

if (!function_exists('__'))
{
	function __()
	{
		$args = func_get_args();
		$nargs = func_num_args();
		$trace = debug_backtrace();
		$caller = array_shift($trace);

		$key = $caller['file'].':'.$caller['line'];

		echo '<pre>', $key, "\n";
		for ($i=0; $i<$nargs; $i++)
			echo print_r($args[$i], 1), "\n";
		
		echo '</pre>';
	}
}

function nextOrd($table,$field='ord',$where='',$step='10')
{
	if ($where)
	{
		$where = "WHERE " . $where;
	}

	return Q("SELECT (MAX(`".$field."`)+?i) as `ord` FROM `".$table."` " . $where, array( $step ))->row('ord');
}

function getLists()
{
	$numargs = func_num_args();
	$arr = array();
	//  Another table
	if ($numargs == 2)
	{
		$table = func_get_arg(0);   //  first arg is table name
		$field = func_get_arg(1);   //  second arg is field name
		//  Prepare sql query
		$sql = "SELECT `id` as `value`,`".$field."` as `var` FROM `".$table."` ";
		$q = new Mysql($sql);
		while($q->next_record()){
			$arr[ $q->f("value") ] = from_base($q->f("var"));
		}
		return $arr;
	}
	//  #__mdd_lists
	elseif ($numargs == 1)
	{
		$bind = func_get_arg(0);    //  One arg is the bind name
		$sql = "SELECT `var`,`value` FROM `#__mdd_lists` WHERE `list_name`='".$bind."' ";
		$q = new Mysql($sql);
		while($q->next_record()){
			$arr[ $q->f("value") ] = from_base($q->f("var"));
		}
		return $arr;
	}
}

function printPager($arr)
{
	if ($arr['page_count'] > 15) {
		$offset = 0;
		$page_count = $arr['page_count'];
		$curr_page = $arr['curr_page']+1;
		$show_page_count = 13;
		$offset_middle = 1+intval($show_page_count/2);
		
		if ($curr_page > $page_count - $offset_middle + 1)
			$offset = $page_count - $show_page_count;
		elseif ($curr_page > $offset_middle)
			$offset = $curr_page - $offset_middle;
		
		$loop = $offset+$show_page_count;
		
		$arr['advanced'] = array(
			"show_page_count" => $show_page_count,
			"offset_middle" => $offset_middle,
			"offset" => $offset,
			"loop" => $loop
	   );
	}
	
	#   Prepare REQUEST_STRING
	$qstring = "?";
	if ($_SERVER['QUERY_STRING'])
	{
		$a = explode("&",$_SERVER['QUERY_STRING']);
		foreach($a as $v) {
			if (!strstr($v, "page="))
				$qstring .= $v."&amp;";
		}
		$qstring .= "page=";
		
	} else {
		$qstring .= "page=";
	}
	
	#   Prepare Links
	$arr_pages = array();
	for($i = 0; $i < $arr['page_count']; $i++) {
		array_push($arr_pages , array(
		'point' =>  $i,
		'qstring'   =>  $qstring.$i,
	   ));
	}

	$arr['arr_pages'] = $arr_pages;
	$arr['int'] = 3 ;

	return $arr ;
}



function crop_resize($file_name, $file_id, $photo_settings)
{
	$f = new Files();

	$original_photo = $file_name ;

	foreach($photo_settings as $k=>$v){
		if ($v['width'] || $v['height']){
			if ($v['width'] == 0) $v['width'] = 5000;
			if ($v['height'] == 0) $v['height'] = 5000;
			//  Change the original photo
			
			if ($v['method'] == 'crop'){
				if ($k != "or") {
					$file_name = $f->crop($original_photo, $v['width'], $v['height'], true, $k);
					if (strstr($file_name, PATH_ROOT))
						$file_name = substr($file_name, strlen(PATH_ROOT));
					Q("UPDATE `#__sys_files` SET `photo_".$k."`='".$file_name."' WHERE `id`=?i LIMIT 1", array($file_id));
				}
				else {
					$file_name = $f->crop($original_photo, $v['width'], $v['height'], false);
				}
			}
			else {
				if ($k != "or") {
					$file_name = $f->resize($original_photo, $v['width'], $v['height'], true, $k);
					//  Cut full path
					if (strstr($file_name, PATH_ROOT))
						$file_name = substr($file_name, strlen(PATH_ROOT));
					Q("UPDATE `#__sys_files` SET `photo_".$k."`='".$file_name."' WHERE `id`=?i LIMIT 1", array($file_id));
					
				}
				//  Change small & middle photo
				else 
					$file_name = $f->resize($original_photo, $v['width'], $v['height'], false);
			}
		}
	}
}

function insertData($arr = array(), $fields = array(), $module = '')
{
	if (!empty($arr) && !empty($fields))
	{
		$sql = "INSERT INTO `#_mdd_" . $module . "` SET ";

		foreach($arr as $index => $value)
		{
			if (isset($fields[$index]))
			{
				$sql .= "`" . $fields[$index] . "`" . "='" . addslashes(str_replace(array('#'), array('№'), $value)) . "', ";
			}
		}
		
		Q($sql . " `created`=NOW() ON DUPLICATE KEY UPDATE `updated`=NOW()");
	}
}

function transliterate($string)
{
	$string = preg_replace('/\s{2}+/', '', $string);
	$string = preg_replace('/\s{1}+/', '-', $string);

	if ($string !== '')
	{
		$cyrillic = array('а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я','А','Б','В','Г','Д','Е','Ж','З','И','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я');
		$latin = array('a','b','v','g','d','e','io','zh','z','i','y','k','l','m','n','o','p','r','s','t','u','f','h','ts','ch','sh','sht','a','i','y','e','yu','ya','A','B','V','G','D','E','Zh','Z','I','Y','K','L','M','N','O','P','R','S','T','U','F','H','Ts','Ch','Sh','Sht','A','Y','Yu','Ya');

		return strtolower(preg_replace('#[^\s0-9A-Za-z\-]+#u', '', str_replace($cyrillic, $latin, $string)));
	}
}

function importFile($csv, $fields = array(), $module_id = '', $ln = 0, $limit = 10)
{
	if (($handle_f = fopen(PATH_ROOT . '/exchange/' . $csv, "r")) !== FALSE)
	{
		$module = Q("SELECT `sys_name` FROM `#__mdd_modules` WHERE `id`=?i LIMIT 1", array($module_id))->row('sys_name');

		fseek($handle_f, $ln);
		
		$count = 0;

		while (!feof($handle_f))
		{
			$line = fgets($handle_f, 4096);

			if (trim($line) !== '')
			{
				$count++;

				$line = iconv('windows-1251', 'UTF-8', $line);

				$arr = explode(';', $line);
				
				//обрабатываем строку
				insertData($arr, $fields, $module);
				
				//считаем количество строк
				if ($count >= $limit)
				{
					echo "<div><a href='?filename=" . $csv . "&setimport=" . ftell($handle_f) . "&module_id=" . $module_id . "'>Продолжить импорт с " . ftell($handle_f) . "</a>";
					exit;
					break 1;
				}
			}
		}

		fclose($handle_f);
	}
	else
	{
		echo "Не получилось открыть файл";
	}
}

function getFieldInfo($id){
	return Q("SELECT `f`.`id`, `f`.`module_id`, `f`.`f_name`, `f`.`f_sys_name`, `m`.`name` as `module_name` FROM `#__mdd_fields` as `f` LEFT JOIN `#__mdd_modules` as `m` ON `f`.`module_id`=`m`.`id` WHERE `f`.`id`=?i LIMIT 1", array($id))->row();
}
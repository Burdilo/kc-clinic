<?php

function __autoload($_class)
{
	$name = strtolower($_class);
	
	if (strstr($name, 'controller'))
	{
		if (file_exists(PATH_CORE.DIRECTORY_SEPARATOR.'controllers'.DIRECTORY_SEPARATOR.$_class . '.php'))
		{
			require_once PATH_CORE.DIRECTORY_SEPARATOR.'controllers'.DIRECTORY_SEPARATOR.$_class . '.php';
		}
	}

	elseif (strstr($name, 'helper'))
	{
		if (file_exists(PATH_SECURE.DIRECTORY_SEPARATOR.'helpers'.DIRECTORY_SEPARATOR.$_class . '.php'))
		{
			require_once PATH_SECURE.DIRECTORY_SEPARATOR.'helpers'.DIRECTORY_SEPARATOR.$_class . '.php';
		}
	}
	
	elseif (strstr($name, 'smarty'))
	{
		if (file_exists(PATH_CORE.DIRECTORY_SEPARATOR.'lib'.DIRECTORY_SEPARATOR.'templaters'.DIRECTORY_SEPARATOR.'smarty'.DIRECTORY_SEPARATOR.$_class . '.class.php'))
		{
			require_once PATH_CORE.DIRECTORY_SEPARATOR.'lib'.DIRECTORY_SEPARATOR.'templaters'.DIRECTORY_SEPARATOR.'smarty'.DIRECTORY_SEPARATOR.$_class . '.class.php';
		}
	}

	else
	{
		if (file_exists(PATH_CORE.DIRECTORY_SEPARATOR.'classes'.DIRECTORY_SEPARATOR.$name . '.class.php'))
		{
			require_once PATH_CORE.DIRECTORY_SEPARATOR.'classes'.DIRECTORY_SEPARATOR.$name . '.class.php';
		}
	}
}

function strposa($haystack, $needle, $offset=0)
{
    if (!is_array($needle))
    {
    	$needle = array($needle);
    }
    
    foreach($needle as $query)
    {
        if (strpos($haystack, $query, $offset) !== false)
        {
    		return true;
        }
    }
    return false;
}

if(!function_exists('hash_equals'))
{
	function hash_equals($str1, $str2)
	{
		if(strlen($str1) != strlen($str2))
		{
			return false;
		}
		else
		{
			$res = $str1 ^ $str2;
			$ret = 0;
			for($i = strlen($res) - 1; $i >= 0; $i--) $ret |= ord($res[$i]);
			return !$ret;
		}
	}
}

function url($path = '', $mask = array())
{
	//'link'      => ''.DIRECTORY_SEPARATOR.$this->module_root.DIRECTORY_SEPARATOR.$news['system']
	// exit(__debug($path));
}

function checkUrlLink($path = array(), $needle = array())
{
	$needle = str_replace(array("\r","\n"), '', $needle);
	$needle = preg_split('/\;+/', $needle, -1, PREG_SPLIT_NO_EMPTY);
	
	$valid = false;

	if (!empty($needle) && !empty($path))
	{
		foreach($needle as $item)
		{
			$compared = preg_split('/\/+/', $item, -1, PREG_SPLIT_NO_EMPTY);
		
			if (count($path) <= count($compared) || end($compared) == '*')
			{
				$difference = array_diff($compared, $path);
				
				if (!empty($difference))
				{
					$difference = array_values($difference);
					
					if ($difference[0] == '*')
					{
						$valid = true;
					}
				}
				else
				{
					$valid = true;
				}
			}
		}
	}
	elseif(empty($path) && in_array('main', $needle))
	{
		$valid = true;
	}

	return $valid;
}

function _session_start()
{
	$sn = session_name();

	if (isset($_COOKIE[$sn]))
	{
		$sessid = $_COOKIE[$sn];
	}
	else if (isset($_GET[$sn]))
	{
		$sessid = $_GET[$sn];
	}
	else
	{
		return session_start();
	}

	if (!preg_match('/^[a-zA-Z0-9,\-]{22,40}$/', $sessid))
	{
		return false;
	}
	
	return session_start();
}

function simpleUpload($name = '', $group = '')
{
	if (!$group) {
		$group = 'upload_' . substr(md5(uniqid()), 3, 8)  . '_' . substr(md5(uniqid()), 5, 10);
	}

	$files = new Files();
	$flist = $files->upload($name, $group);

	return $flist;
}

function humanFileSize($size)
{
	if ($size >= 1073741824) {
	  $fileSize = round($size / 1024 / 1024 / 1024,1) . 'GB';
	} elseif ($size >= 1048576) {
		$fileSize = round($size / 1024 / 1024,1) . 'MB';
	} elseif ($size >= 1024) {
		$fileSize = round($size / 1024,1) . 'KB';
	} else {
		$fileSize = $size . ' bytes';
	}
	return $fileSize;
}

function clean_data($html)
{
	$html = str_replace("\n"," ",str_replace("\r","", $html));
	
	$content = '';
	
	if ($content = strstr($html,'<!-- profile -->'))
	{
		$content = trim(substr($content,strlen('<!-- profile -->')));
		$content = trim(substr($content,0,(0 - strlen($content) + strpos($content,'<!-- /profile -->'))));
	}

	$content = preg_replace('/<script\b[^>]*>(.*?)<\/script>/is', "", $content);
	$content = preg_replace("/\&[^\;]*\;/", "", $content);
	$content = str_replace('&quot;','', $content);
	$content = trim($content);

	return $content;
}

function rrmdir($dir)
{
	if (is_dir($dir))
	{
		$files = array_diff(scandir($dir), array('.', '..', '.gitkeep', '.gitignore'));

		foreach ($files as $file)
		{
			if (is_dir($dir.DIRECTORY_SEPARATOR.$file))
			{
				rrmdir($dir.DIRECTORY_SEPARATOR.$file); 
			}
			else
			{
				unlink($dir.DIRECTORY_SEPARATOR.$file);
			}
		}

		reset($files);
		rmdir($dir);
	}
}

function sendMail($subject = '', $message = '', $from = '', $to = '', $password = '', $host = '')
{
	$tpl = new Smarty();
	
	$tpl->setTemplateDir(PATH_TPL . '/themes/');
	$tpl->setCompileDir(PATH_RUNTIME . '/cache');
	$tpl->setCacheDir(PATH_RUNTIME . '/cache');
	$tpl->setCaching(false);

	$tpl->addPluginsDir(PATH_CORE.DIRECTORY_SEPARATOR.'lib/templaters/smarty/plugins/');
	$tpl->addPluginsDir(PATH_CORE.DIRECTORY_SEPARATOR.'lib/templaters/smarty/plugins_cms/');

	$domain = str_replace(array('http://', 'www.', 'www') , '', $_SERVER['SERVER_NAME']);
	
	$tpl->assign('domain', $domain);
	$tpl->assign('subject', $subject);
	$tpl->assign('message', $message);

	$mail = new PHPMailer();

	try {

		if (!empty($to))
		{
			$mail->IsSMTP();
			$mail->IsHTML(true);

			$mail->Host       = $host; 					// sets the SMTP server
			$mail->SMTPAuth   = true;                  	// enable SMTP authentication
			$mail->SMTPKeepAlive = true;
			
			// $mail->SMTPDebug  = 1;                     	// enables SMTP debug information (for testing)
			
			$mail->Username   = $from; 					// SMTP account username
			$mail->Password   = $password;        		// SMTP account password
			
			$mail->SMTPSecure		= "ssl";
			$mail->Port				= 465;

			$mail->setFrom($from, $from);

			if (file_exists(PATH_ROOT.'/images/logo.png'))
			{
				$mail->addAttachment('/images/logo.png');
			}

			if (is_array($to))
			{
				foreach ($to as $email => $value)
				{
					if (is_email($email))
					{
						$mail->AddAddress(trim($email));
					}
				}
			}
			elseif (is_email($to))
			{
				$mail->AddAddress(trim($to));
			}

			$mail->CharSet = 'utf-8';
			$mail->Subject = $subject;

			$mail->msgHTML($tpl->fetch(PATH_TPL . '/themes/base/smarty/message.tpl'));
			
			if ($mail->send())
			{
				return true;
			}
			else {
				// echo "Mailer Error: " . $mail->ErrorInfo;
			}
			
			$mail->ClearAddresses();
			$mail->ClearAttachments();
		}
		
		return false;
	}
	catch (phpmailerException $e)
	{
		echo $e->errorMessage();
	}
	catch (Exception $e)
	{
		echo $e->getMessage();
	}
}

function _curl($url)
{
	$user_agent='Mozilla/5.0 (Windows NT 6.1; rv:8.0) Gecko/20100101 Firefox/8.0';

	$options = array(
		CURLOPT_CUSTOMREQUEST  => "GET",        //set request type post or get
		CURLOPT_POST           => false,        //set to GET
		CURLOPT_USERAGENT      => $user_agent, //set user agent
		CURLOPT_COOKIEFILE     => "cookie.txt", //set cookie file
		CURLOPT_COOKIEJAR      => "cookie.txt", //set cookie jar
		CURLOPT_RETURNTRANSFER => true,     // return web page
		CURLOPT_HEADER         => false,    // don't return headers
		CURLOPT_FOLLOWLOCATION => true,     // follow redirects
		CURLOPT_ENCODING       => "",       // handle all encodings
		CURLOPT_AUTOREFERER    => true,     // set referer on redirect
		CURLOPT_CONNECTTIMEOUT => 120,      // timeout on connect
		CURLOPT_TIMEOUT        => 120,      // timeout on response
		CURLOPT_MAXREDIRS      => 10,       // stop after 10 redirects
   );

	$ch      = curl_init($url);
	curl_setopt_array($ch, $options);
	$content = curl_exec($ch);
	$err     = curl_errno($ch);
	$errmsg  = curl_error($ch);
	$header  = curl_getinfo($ch);
	curl_close($ch);

	$header['errno']   = $err;
	$header['errmsg']  = $errmsg;
	$header['content'] = $content;
	
	return $header;
}

if (!function_exists('json_encode')) {
	function json_encode($data) {
		$json = new Services_JSON();
		return($json->encode($data));
	}
}

if (!function_exists('json_decode')) {
	function json_decode($data, $bool) {
		if ($bool) {
			$json = new Services_JSON(SERVICES_JSON_LOOSE_TYPE);
		} else {
			$json = new Services_JSON();
		}
		return($json->decode($data));
	}
}

function to_money($number = 0, $d = 0)
{
	return number_format($number, $d, ',', ' ');
}

function is_assoc($arr = array())
{
	return array_keys($arr) !== range(0, count($arr) - 1);
}

function is_url($url)
{
	return preg_match('|^http(s)?://[a-z0-9-]+(.[a-z0-9-]+)*(:[0-9]+)?(/.*)?$|i', $url);
}

function is_phone($phone)
{
	return (strlen(preg_replace("/[^0-9]/", '', $phone)) == 11);
}

function is_email($email)
{
	return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function __debug($var = array(), $name = '')
{
	echo '<pre>';
	if ($name) echo "$name:\n";
	print_r($var);
	echo '</pre>';
}

function __get($val)
{
	return isset($_GET[$val])?$_GET[$val]:false;
}

function __post($key = '', $post = array())
{
	$result = false;

	if (isset($post) && !empty($post))
	{
		if (isset($post[$key]))
		{
			$result = $post[$key];
		}
	}
	elseif (!empty($_POST))
	{
		if (isset($_POST[$key]))
		{
			$result = $_POST[$key];
		}
	}

	return $result;
}

function __cookie($val)
{
	return isset($_COOKIE[$val])?$_COOKIE[$val]:false;
}

function redirect($url = '', $referer = '')
{
	if ($url !== '')
	{  
		header("Location: $url", true, 301);
	}    
	else
	{
		if ($referer !== '')
		{
			header("Location: $referer", true, 301);
		}
		else {
			if ($_SERVER['QUERY_STRING'] !== '') header("Location: ". $_SERVER['SCRIPT_NAME'] . "?" . $_SERVER['QUERY_STRING']);
			else header("Location: " . $_SERVER['SCRIPT_NAME']);
		}
	}

	exit;
}

function to_base($string)
{
	if (is_string($string))
	{
		$string = trim($string);
		return addslashes($string);
	}

	return $string;
}

function from_base($string)
{
	return stripslashes($string);
}

function rDir($dir)
{
	$arr = array();
	$d = scandir($dir);
	foreach($d as $v)
		if ($v != "." and $v != "..")
			$arr[] = array(
				"name" => iconv("windows-1251" , "UTF-8", $v),
				"info" => getImageSize(PATH_ROOT.IMPORT_DIR.$v),
		   );
	
	return $arr;
}
<?php

class templateRender
{
	protected $data = array();
	protected $template = null;
	protected $charset = 'utf-8';
	protected $fileExtension = '.tpl';

	public function __construct($dir = '', $caching = null)
	{
		$this->template = new Smarty;

		$this->template->setCacheDir(PATH_RUNTIME.DIRECTORY_SEPARATOR.'cache'.DIRECTORY_SEPARATOR);
		$this->template->setCompileDir(PATH_RUNTIME.DIRECTORY_SEPARATOR.'cache'.DIRECTORY_SEPARATOR);
		$this->template->setTemplateDir(PATH_TPL.DIRECTORY_SEPARATOR.$dir);
		
		$this->template->setCaching($caching);
		$this->template->setCacheLifetime(60);

		$this->template->use_sub_dirs           = true;
		$this->template->debugging              = false;
		$this->template->cache_modified_check   = false;
		$this->template->compile_check          = false;
		$this->template->force_compile          = false;
		$this->template->error_reporting        = (defined('SYSTEM_DEBUG') && SYSTEM_DEBUG == 1) ? E_ALL & ~E_NOTICE & ~E_WARNING : E_ALL & ~E_NOTICE;

		$pluginsDir = array(
			PATH_CORE.DIRECTORY_SEPARATOR.'lib'.DIRECTORY_SEPARATOR.'templaters'.DIRECTORY_SEPARATOR.'smarty'.DIRECTORY_SEPARATOR.'plugins'.DIRECTORY_SEPARATOR,
			PATH_CORE.DIRECTORY_SEPARATOR.'lib'.DIRECTORY_SEPARATOR.'templaters'.DIRECTORY_SEPARATOR.'smarty'.DIRECTORY_SEPARATOR.'plugins_cms'.DIRECTORY_SEPARATOR
		);

		foreach ($pluginsDir as $d)
		{
			if (is_dir($d))
			{
				$this->template->addPluginsDir($d);
			}
		}
	}

	public function assign($key = '', $value = '', $caching = false)
	{
		$this->template->assign($key, $value, $caching);
	}

	public function fetch($template = '', $cache_id = '', $compile_id = '')
	{
		if (file_exists($template . $this->fileExtension))
		{
			return $this->template->fetch($template . $this->fileExtension);
		}
		else if (!strstr(strtolower($template), strtolower(PATH_ROOT)))
		{
			return $this->template->fetch($template);
		}
	}

	public function display($template = '')
	{
		$this->template->display($template . $this->fileExtension);
	}
}
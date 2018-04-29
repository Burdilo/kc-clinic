<?php

class cpLoader extends Initialize
{
	use Singleton, Tools;

	private $controller		=	'';
	private $config			= 	null;

	protected $tpl_path		= 	'';
	protected $tpl_exbody	=	'index';
	protected $info_array	= 	array();
	protected $submenu		= 	array();

	protected $module 		=	'meta';
	protected $action 		=	'index';
	protected $method 		=	'list';
	protected $transfer		=	array();
	protected $element		=	null;
	protected $argument		=	0;
	protected $base_path	= 	'';
	protected $request_path	= 	'';

	public $tpl				=	array('base' => 'base', 'new' => 'new', 'auth' => 'auth');
	public $parts			=	array ();
	public $localize		=	array ();
	public $language		=	'ru';

	public $error_hdr		=	'Ошибка';
	public $error_msg		=	'Ошибка. Путь для модуля не задан.';

    public function __construct()
	{
		$this->template_driver = 'Smarty';
		$this->template_dir = 'admin';
		
		parent::__construct();

		$this->declaration();

		if (defined('SYSTEM_LOCALE'))
		{
			$this->language = SYSTEM_LOCALE;
		}
	
		if (isset($this->path[1]))
		{
			$this->module = $this->path[1];
		}

		if (isset($this->path[2]))
		{
			$this->action = str_replace('-', '_', $this->path[2]);
		}

		if (isset($this->path[3]))
		{
			$this->method = $this->path[3];
		}

		if (isset($this->path[4]))
		{
			$this->element = $this->path[4];
		}

		if (isset($this->path[5]))
		{
			$this->argument = $this->path[5];
		}

		$this->base_path = DIRECTORY_SEPARATOR.ADMIN_DIR.DIRECTORY_SEPARATOR.$this->module;

		if (count($_POST) && $this->module != 'ajax' && (empty($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest'))
		{
			$this->action = 'post';
			$this->transfer = $_POST;
		}

		$this->tpl_path = PATH_TPL.DIRECTORY_SEPARATOR.'admin'.DIRECTORY_SEPARATOR.'view'.DIRECTORY_SEPARATOR.$this->module;
		$this->request_path = DIRECTORY_SEPARATOR.implode(DIRECTORY_SEPARATOR, $this->path);
	}

	private function loadController()
	{
		$this->controller = $this->module . 'Controller';
		
		if (!class_exists($this->controller))
		{
			$this->errorPage();
		}
		else
		{
			$controller = new $this->controller;
			
			if (method_exists($controller, $this->action))
			{
				$data = $controller->{$this->action}($this->transfer);

				if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
				{
					exit(json_encode($data, 64 | 256));
				}

				if ($this->module == 'ajax')
				{
					if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
					{
						exit($data);
					}

					return true;
				}

				$tpl_exbody = '';

				if (!empty($data) && is_array($data))
				{
					foreach($data as $key => $value)
					{
						$this->viewer->assign($key, $value, false);	
					}

					if (isset($data['tpl_exbody']))
					{
						$tpl_exbody = $data['tpl_exbody'];
					}
				}

				$this->info_array = array();

				if (isset($this->localize[$this->action . '_name']))
				{
					$this->info_array['name']	= $this->localize[$this->action . '_name'];
				}
				else if (isset($this->localize[$this->module . '_name']))
				{
					$this->info_array['name']	= $this->localize[$this->module . '_name'];
				}

				if (isset($this->localize[$this->action . '_header']))
				{
					$this->info_array['header']	= $this->localize[$this->action . '_header'];
				}
				else if (isset($this->localize[$this->module . '_header']))
				{
					$this->info_array['header']	= $this->localize[$this->module . '_header'];
				}

				foreach($this->info_array as $k=>$v)
				{
					$this->viewer->assign($k, $v);
				}

				$tpl_exbody = $this->moduleTemplate($tpl_exbody);
				
				if (!file_exists($tpl_exbody . '.tpl' ))
				{
					$this->errorPage();
				}
				else
				{
					$this->viewer->assign('content', $this->viewer->fetch($tpl_exbody), true);
		        }
			}
		}
	}

	private function moduleTemplate($tpl_exbody = '')
	{
		if ($tpl_exbody)
		{
			$this->tpl_exbody = $tpl_exbody;
		}
		else
		{
			if ($this->action == 'list' && !$this->method)
			{
				$this->tpl_exbody = $this->tpl_exbody;
			}
			else
			{
				$action = $this->action;

				if ($this->action == 'post')
				{
					$action = 'index';
				}

				if ($this->method == 'list')
				{
					$this->tpl_exbody =  $action.DIRECTORY_SEPARATOR.'index';
				}
				else
				{
					$this->tpl_exbody =  $action.DIRECTORY_SEPARATOR.$this->method;
				}
			}
		}
		
		if (!file_exists($this->tpl_path.DIRECTORY_SEPARATOR.$this->tpl_exbody) && !in_array($this->method, array('visible', 'del', 'delete')))
		{
			//exit($this->tpl_path.DIRECTORY_SEPARATOR.$this->tpl_exbody);
		}

		return $this->tpl_path.DIRECTORY_SEPARATOR.$this->tpl_exbody;
	}

	private function errorPage()
	{
		$this->viewer->assign('header', $this->error_hdr);
        $this->viewer->assign('content', $this->error_msg);
	}

	/**
	 * @return string
	 */
	public function navigation($pid = 0)
	{
		if (!$this->mcache_enable || ($this->mcache_enable && !$slice = $this->getCache('cp_structure_' . $pid)))
		{
			$slice = Q("SELECT `id`, `name`, `sys_name` as `root`, `icon`, `dir`, `bonds`, `groups` as `group` FROM `#__cp_structure` WHERE `visible`=1 AND `pid`=?i ORDER BY `ord`",  array( $pid ))->all('root');

			if (!empty($slice))
			{
				foreach($slice as $k => &$str)
				{
					if (isset($this->localize[$str['name']]))
					{
						$str['name'] = $this->localize[$str['name']];
					}

					if ($str['group'] !== '' && isset($_SESSION['userinf']['gid']) && !in_array($_SESSION['userinf']['gid'], explode(',', $str['group'])))
				    {
				        unset($slice[$k]);
				    }

				    if ($str['root'] == 'tasks' || $str['root'] == 'shopping')
				    {
				    	$str['count'] = Q("SELECT COUNT(*) AS `count` FROM `#__cp_tasks` LIMIT 1")->row('count');
				    }
				}
			}
			
			if ($this->mcache_enable)
			{
				$this->setCache('cp_structure_' . $pid, $slice);
			}
		}

		if ($pid == 0)
		{
			$this->parts = $slice;
		}

		return $slice;
	}

	private function localization()
	{
		if (!$this->mcache_enable || ($this->mcache_enable && !$this->localize = $this->getCache('localization')))
		{
			$this->localize = Q("SELECT `key`, `value` FROM `#__cp_translate` WHERE `lang`=?s", array(
				$this->language
			))->all('key');
			
			if (!empty($this->localize))
			{
				foreach($this->localize as $key => $arr)
				{
					$this->localize[$key] = $arr['value'];
				}
			}

			if ($this->mcache_enable)
			{
				$this->setCache('localization', $this->localize);
			}
		}
	}

	public function configure()
	{
		if (!isset($_SESSION['configuration']) || empty($_SESSION['configuration']))
		{
			if (file_exists(ADMIN_PATH.DIRECTORY_SEPARATOR.'json'.DIRECTORY_SEPARATOR.'config.json'))
			{
				$_SESSION['configuration'] = json_decode(file_get_contents(ADMIN_PATH.DIRECTORY_SEPARATOR.'json'.DIRECTORY_SEPARATOR.'config.json'), true);
			}
		}

		$this->config = $_SESSION['configuration'];
	}

	public function clearCache($request = array())
	{
		if (!empty($request['server']))
		{
		    $this->server = $request['server'];
		}

		$allow = array( 'task', 'config', 'smarty', 'scripts', 'styles', 'memory', 'all' ); 

		if (isset($_GET['cleancache']) && !empty($_GET['cleancache']))
		{
			$cleancache = $_GET['cleancache'];

			if (in_array($cleancache, $allow))
			{
				$cache = new Cache;

				switch ($cleancache)
				{
					case 'all':
						
						$cache->clearFiles(array('php', 'css', 'js'));
						$cache->clearMemory();
						$cache->clearSession(array('site_menu', 'configuration'));

					break;
					
					case 'smarty':

						$cache->clearSmarty();

					break;

					case 'styles':
					
						$cache->clearStyles();
					
					break;

					case 'scripts':

						$cache->clearScripts();

					break;
					
					case 'memory':

						$cache->clearMemory();

					break;
					
					case 'task':
						
					break;
					
					case 'config':
						
						$cache->clearSession(array('site_menu', 'configuration'));

					break;
				}
			}

		    $backuri = DIRECTORY_SEPARATOR.ADMIN_DIR.DIRECTORY_SEPARATOR.'meta';

		    if (isset($_GET['backuri']) && $_GET['backuri'] !== '')
		    {
		    	$backuri = base64_decode($_GET['backuri']);
		    }

		    redirect($backuri);
		}
	}

	public function breadcrumbs()
	{
		$bc = array();
		$link = '';
		$index = 0;

		foreach ($this->path as $system)
		{
			$name = '';
			$link .= DIRECTORY_SEPARATOR.$system;

			if ($index == 0)
			{
				$name = '<i class="icon icon-view-dashboard"></i>';
			}

			if ($index == 1 && isset($this->parts[$system]['name']))
			{
				$name = $this->parts[$system]['name'];
			}

			if ($index == 2 && isset($this->submenu[$system]['name']))
			{
				$name = $this->submenu[$system]['name'];
			}

			if ($name !== '')
			{
				$bc[] = array(
					'name' => $name,
					'link' => $link
				);
			}

			$index++;
		}

		if ($this->module == 'meta' && $this->element)
		{
			$mdd = new Mdd();
			$module = $mdd->getModuleItem($this->element);

			$bc[] = array(
				'name' => $module['name'],
				'link' => $this->base_path.DIRECTORY_SEPARATOR.$this->action.DIRECTORY_SEPARATOR.'list'.DIRECTORY_SEPARATOR.$this->element
			);
		}

		if (in_array('edit', $this->path))
		{
			$bc[] = array(
				'name' => 'Редактирование',
				'link' => ''
			);
		}

		if (in_array('add', $this->path))
		{
			$bc[] = array(
				'name' => 'Добавление',
				'link' => ''
			);
		}

		// __Debug($this);
		// __Debug($this->path);
		//exit(__Debug($bc));
		
		//$info['breadcrumbs'] 	= $this->stc->getBC($this->element);
		// __debug($this->submenu, "parts");
		// exit(__debug($bc));

		return $bc;
	}

	public function run()
	{
        $this->headers(false);
		$this->configure();

		$user = new Person();
		
		$this->clearCache($_REQUEST);
		
		if ($user->getAdminAccess() && !isset($this->path[1]))
		{
			redirect(DIRECTORY_SEPARATOR.ADMIN_DIR.DIRECTORY_SEPARATOR.'dashboard');
		}

		$this->localization();
		$menu = $this->navigation();

		if ($this->module !== '' && !empty($this->parts[$this->module]['id']))
		{
			$this->submenu = $this->navigation($this->parts[$this->module]['id']);
		}

		$site_temp = explode('.', $_SERVER['HTTP_HOST']);
		$site_name = array();
		$site_name[] = array_pop($site_temp);
		$site_name[] = array_pop($site_temp);
		
		$site_name = array_reverse($site_name);

		$breadcrumbs = $this->breadcrumbs();

		$this->config['redactor_list'] = array();

		if (isset($this->config['redactor']))
		{
			foreach($this->config['redactor'] as $item)
			{
				$rd = array();

				$rd['default']	= isset($item['default']) ? true : false;
				$rd['value']	= $item['system'];
				$rd['text']		= $item['name'];

				$this->config['redactor_list'][] = $rd;
			}
		}

		$this->viewer->assign('_path', $this->path);
		$this->viewer->assign('request_path', $this->request_path, false);
		$this->viewer->assign('base_path', $this->base_path, false);
		$this->viewer->assign('_config', $this->config);
		$this->viewer->assign('TPL_PATH', $this->tpl_path);
		$this->viewer->assign('PATH_HASH', @md5('|'.implode('|', $this->path).'|'));
		$this->viewer->assign('PATH_PUBLIC', DIRECTORY_SEPARATOR.'apps');
		$this->viewer->assign('PATH_PROTECTED', PATH_PROTECTED);
		$this->viewer->assign('PATH_ROOT', PATH_ROOT);
		$this->viewer->assign('ADMIN_DIR', ADMIN_DIR);
		$this->viewer->assign('navigation', $menu);
		$this->viewer->assign('submenu', $this->submenu);
		$this->viewer->assign('breadcrumbs', $breadcrumbs, true);
		$this->viewer->assign('_backuri', base64_encode($_SERVER['REQUEST_URI']), true);
		$this->viewer->assign('_site_name', $site_name, false);
		$this->viewer->assign('locale', $this->localize);

		$this->viewer->assign('_module', $this->module);
		$this->viewer->assign('_action', $this->action);
		$this->viewer->assign('_method', $this->method);

		$this->loadController();

		$tpl = $this->tpl['auth'];

		if ($user->getAdminAccess())
		{
			$tpl = $this->tpl['new'];
		}
		
		$this->viewer->display($tpl);
	}
}
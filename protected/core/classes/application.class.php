<?php //declare(strict_types = 1);

final class Application extends Initialize
{
    use Singleton, Tools;
    
    protected $template_vars    = array();
    protected $search_var       = 'q';
    protected $_server          = array();
    protected $arguments        = array();
    private $pattern            = 'base';
    private $router             = array();
    public $cachetree           = array();
    public $sitemap             = array();
    public $sitemenu            = array();
    public $submenu             = array();
    public $dynamic_page        = false;
    public $breadcrumbsTree     = array();
    
    private $error = array(
        'id'            => 0,
        'pid'           => 0,
        'tid'           => 0,
        'dynamic'       => 0,
        'lang'          => 'ru',
        'name'          => 'Страница не найдена',
        'title'         => 'Страница не найдена (404)',
        'robots'        => '',
        'keywords'      => '',
        'referer'       => '',
        'description'   => '',
        'content'       => '',
        'system'        => ''
    );

    public function __construct()
    {
        $this->template_driver = TEMPLATING;
        $this->template_dir = 'themes/base/#/';
    
        parent::__construct();

        $this->declaration();
    }

    protected function recursionBCrumbs(&$tree = array(), &$path = array())
    {
        $sys_name = array_shift($path);
        
        foreach($tree as $key => $arr)
        {
            if ($arr['sys_name'] == $sys_name)
            {
                $this->breadcrumbsTree[] = array(
                    'id'        => $arr['id'],
                    'pid'       => $arr['pid'],
                    'name'      => (isset($arr['menuname']) && $arr['menuname'] !== '') ? $arr['menuname'] : $arr['name'],
                    'sys_name'  => $arr['sys_name'],
                    'link'      => $arr['link']
                );

                if (empty($arr['tree']) || empty($path))
                {
                    unset($arr['tree']);
                    return $arr;
                }
                else
                {
                    return $this->recursionBCrumbs($arr['tree'], $path);
                }
            }
        }

        return array();
    }

    protected function breadcrumbs()
    {
        if (!$this->mcache_enable || !($this->breadcrumbsTree = $this->getCache('_page_breadcrumbs_')))
        {
            $breadcrumbs = array();
            
            if (!empty($this->template_vars))
            {
                foreach($this->template_vars as $vars)
                {
                    if (!empty($vars['breadcrumbs']))
                    {
                        $breadcrumbs = $vars['breadcrumbs'];

                        if (!isset($breadcrumbs[0]))
                        {
                            $breadcrumbs = array($breadcrumbs);
                        }
                    }
                }
            }

            $tree = $this->sitemap;
            $path = $this->path;

            array_unshift($path, 'main');
            
            $this->recursionBCrumbs($tree, $path);

            if (!empty($breadcrumbs) && isset($breadcrumbs[0]['name']) && $breadcrumbs[0]['name'] !== '')
            {
                $this->breadcrumbsTree = array_merge($this->breadcrumbsTree, $breadcrumbs);

                $this->setCache('_page_breadcrumbs_', $this->breadcrumbsTree);
            }

            unset($tree, $path, $breadcrumbs);          
        }

        return $this->breadcrumbsTree;
    }

    protected function recursionPage(&$tree = array(), &$path = array(), $cache = array())
    {
        $sys_name = array_shift($path);
           
        $this->arguments = $path;

        foreach ($tree as $branch)
        {
            if ($branch['sys_name'] === $sys_name)
            {
                if (empty($path))
                {
                    unset($branch['tree']);
                    return $branch;
                }

                if (!empty($path) && $branch['dynamic'] == 1)
                {
                    $cache = $branch;
                    unset($cache['tree']);
                }

                if (!empty($branch['tree']) && !empty($path))
                {
                    return $this->recursionPage($branch['tree'], $path, $cache);
                }
            }
        }

        if (!empty($cache))
        {
            return $cache;
        }

        return array();
    }

    protected function siteStructure()
    {
        if (!$this->mcache_enable || !($this->structure = $this->getCache('_structure_')))
        {
            $this->structure = Q("SELECT `id`, `pid`, `tid`, `gid`, `name`, `menuname`, `sys_name`, `title`, `keywords`, `description`, `robots`, `redirect`, `visible`, `in_menu`, `in_sitemap`, `dynamic`, `access`, '' as `link`, '' as `tree` FROM `#__str_structure` WHERE `visible`=1 AND `in_sitemap`=1 ORDER BY `ord`, `name`")->all('id');
            $this->setCache('_sitemap_', $this->structure);
        }
    }

    protected function siteMapClear()
    {
        if (!empty($this->sitemap))
        {
            $this->siteMapClearRecursion($this->sitemap);
        }
    }

    protected function siteMapClearRecursion(&$tree = array())
    {
        if (!empty($tree))
        {
            foreach($tree as $key => $item)
            {
                if (intval($item['in_sitemap']) == 0)
                {
                    unset($tree[$key]);
                }
                
                if (!empty($item['tree']))
                {
                    $tree[$key]['tree'] = $this->siteMapClearRecursion($item['tree']);
                }
            }
        }
        
        return $tree;
    }

    protected function recursionTree(&$tree = array(), $link = '')
    {
        foreach ($tree as $key => &$node)
        {
            $lnk = $link . '/' . $node['sys_name'];

            if ($node['sys_name'] == 'main')
            {
                $lnk = '';
            }

            $node['link'] = ($lnk == '') ? '/' : $lnk;

            if (!empty($node['tree']))
            {
                $node['tree'] = $this->recursionTree($node['tree'], $lnk);
            }

            $this->structure[$node['id']] = $node;
        }

        return $tree;
    }

    protected function siteMap()
    {
        if (!$this->mcache_enable || !($this->sitemap = $this->getCache('_sitemap_')))
        {
            $temp = array();

            $this->siteStructure();

            $temp = $this->makeTree($this->structure, 0, 'pid', 'id', 'tree');

            $this->sitemap = $this->recursionTree($temp);

            $this->setCache('_sitemap_', $this->sitemap);
        }
    }

    protected function siteMenu()
    {
        if (!$this->mcache_enable || !($this->sitemenu = $this->getCache('_sitemenu_')))
        {
            $menu = Q("SELECT `id`, `system`, `tree` FROM `#__str_menu` ORDER BY `name`")->all('system');

            if (!empty($menu))
            {
                $sitemap = $this->sitemap;
                
                foreach($menu as $key => $item)
                {
                    if (!empty($this->structure))
                    {
                        $this->sitemenu[$key] = array();

                        foreach($this->structure as $tree)
                        {
                            $in_menu = preg_split('/\,+/', $tree['in_menu'], -1, PREG_SPLIT_NO_EMPTY);
                            
                            $branch = $tree;

                            $branch = array(
                                'id'        =>  $tree['id'],
                                'pid'       =>  $tree['pid'],
                                'name'      =>  $tree['menuname'] != '' ? $tree['menuname'] : $tree['name'],
                                'sys_name'  =>  $tree['sys_name'],
                                'link'      =>  $tree['link'],
                                'tree'      =>  $tree['tree']
                            );

                            if (in_array($item['id'], $in_menu))
                            {
                                if ($item['tree'] && $tree['sys_name'] !== 'main' && isset($this->cachetree[$tree['id']]))
                                {
                                    $branch['tree'] = $this->cachetree[$tree['id']];
                                }
                                
                                $this->sitemenu[$key][$branch['id']] = $branch;
                            }
                        }
                    }
                }
            }

            $this->setCache('_sitemenu_', $this->sitemenu);
        }
    }

    protected function subMenu()
    {
        $sitemenu = array();

        if (!empty($this->sitemenu))
        {
            foreach ($this->sitemenu as $node)
            {
                if (!empty($node))
                {
                    foreach ($node as $node_item)
                    {
                        $sitemenu[$node_item['id']] = $node_item;
                    }
                }
            }
        }

        if (isset($sitemenu[$this->page['id']]['tree']))
        {
            $this->submenu = $sitemenu[$this->page['id']]['tree'];
        }

        if (isset($sitemenu[$this->page['pid']]['tree']))
        {
            $this->submenu = $sitemenu[$this->page['pid']]['tree'];
        }
    }

    protected function getTemplate()
    {
        if (!$this->mcache_enable || !($template = $this->getCache('_template_')))
        {
            $template = Q("SELECT `id`, `sys_name` FROM `#__str_templates`")->all('id');

            $this->setCache('_template_', $template);
        }

        if (isset($template[$this->page['tid']]['sys_name']))
        {
            $this->pattern = $template[$this->page['tid']]['sys_name'];
        }
    }

    protected function getPage(&$sitemap = array(), &$path = array())
    {
        $this->page = $this->recursionPage($sitemap, $path);
    }

    protected function getCanonicalPage()
    {
        $path = $this->path;

        if ($this->locale == DEFAULT_LANGUAGE)
        {
            array_unshift($path, 'en');
        }

        array_unshift($path, 'main');
        
        $sitemap = $this->sitemap;
        $this->treeCanonicalPage($sitemap, $path);
    }

    protected function treeCanonicalPage(&$sitemap = array(), &$path = array())
    {
        $this->canonical = $this->recursionPage($sitemap, $path);
    }

    protected function pageData()
    {
        if (!$this->mcache_enable || !($this->page = $this->getCache('_path_')))
        {
            // Текущая страница
            $sitemap    = $this->sitemap;
            $path       = $this->mpath;
            
            array_unshift($path, 'main');

            $this->getPage($sitemap, $path);
            
            $page = $this->page;

            if ($this->mcache_enable && !empty($this->arguments))
            {
                $this->setCache('_arguments_path_', $this->arguments);
            }
            
            if (!empty($page) && !empty($this->_server['HTTP_REFERER']))
            {
                $page['referer'] = $this->_server['HTTP_REFERER'];
            }

            if (!empty($page['redirect']))
            {
                if (isset($page['referer']))
                {
                    redirect($page['redirect'], $page['referer']);
                }
                else
                {
                    redirect($page['redirect']);
                }
            }

            if (empty($page))
            {
                $this->page = $this->error;
                $this->page['lang'] = $this->locale;
            }
            else
            {
                $this->page = array(
                    'lang'          => $this->locale,
                    'id'            => $page['id'],
                    'pid'           => $page['pid'],
                    'tid'           => $page['tid'],
                    'name'          => $page['name'],
                    'system'        => $page['sys_name'],
                    'title'         => $page['title'],
                    'keywords'      => $page['keywords'],
                    'description'   => $page['description'],
                    'robots'        => $page['robots'] != '' ? $page['robots'] : 'all',
                    'dynamic'       => $page['dynamic'],
                    'referer'       => '',
                    'content'       => ''
                );
            }

            unset($sitemap, $path, $page);

            $this->setCache('_path_', $this->page);
        }

        if ($this->mcache_enable)
        {
            $this->arguments = $this->getCache('_arguments_path_');
        }
    
        if ($this->page['dynamic'] == 1 && $this->page['system'] != end($this->path))
        {
            $this->dynamic_page = true;
        }
    }

    protected function getContent()
    {
        if (!empty($this->page))
        {
            $cache = $this->mcache_path . '_' . $this->page['id'];

            $content = $this->getCache('_stc_content_' . $cache);

            if (!$this->mcache_enable || !($content = $this->getCache('_stc_content_' . $cache)))
            {
                $content = Q(   "SELECT `c`.`id`, `c`.`system`, `c`.`type`, `c`.`item`, `c`.`mode`, `c`.`indexer`, `c`.`arguments`, `c`.`indynamic`, `c`.`caching`, `c`.`system`, `f`.`content` " .
                                "FROM `#__str_content` AS `c` " .
                                "LEFT JOIN `#__str_filling` AS `f` ON `f`.`pid` = `c`.`id` " .
                                "WHERE `c`.`pid`=?i AND `c`.`visible`=1 " .
                                "ORDER BY `ord` ASC",
                            array(
                                $this->page['id']
                            ))->all('id');

                $this->setCache('_stc_content_' . $cache, $content);
            }
            
            if (!empty($content))
            {
                $this->viewer->assign('_page', $this->page, true);

                $content_list = array();

                foreach ($content as $id => $unit)
                {
                    $cache_hash = $this->mcache_path . '_content_' . $id;

                    if ($unit['caching'] == 0 || !$this->mcache_enable || !($content_list[$id] = $this->getCache($cache_hash)))
                    {
                        $item = $this->getUnit($unit);

                        if (!isset($item['removed']))
                        {
                            $content_list[$id] = $item;
                        
                            $this->setCache($cache_hash, $content_list[$id]);
                        }
                    }
                }

                $this->page['content_list'] = $content_list;

                if (!empty($this->page['content_list']))
                {
                    $result = '';
                    
                    foreach($this->page['content_list'] as $item)
                    {
                        if ($item['system'])
                        {
                            $result .= '<a name="'. $item['system'] .'"></a>';
                        }

                        if ($item['indexer'] == 1 || $item['indexer'] == 2 && $this->dynamic_page)
                        {
                            $result .= '<!-- content -->';
                        }

                        $result .= $item['content'];

                        if ($item['indexer'] == 1 || $item['indexer'] == 2 && $this->dynamic_page)
                        {
                            $result .= '<!-- /content -->';
                        }
                    }

                    $result = str_replace('<!-- /content --><!-- content -->', '', $result);

                    $this->page['content'] = stripslashes($result);
                }

                $this->setCache('_path_', $this->page);
            }
        }
    }

    protected function logout()
    {
        if (isset($_GET['logout']))
        {
            if (isset($_SESSION['auth_user']))
            {
                unset($_SESSION['auth_user']);
            }

            if (isset($_GET['_backuri']))
            {
                redirect(base64_decode($_GET['_backuri']));
            }
            else
            {
                redirect('/');  
            }
        }
    }
    
    public function assign_row($vars = array())
    {
        if (!empty($vars['page']))
        {
            foreach ($vars['page'] as $key => $value)
            {
                $this->page[$key]   = $value;
            }
        }

        if (!empty($vars['submenu']))
        {
            foreach ($vars['submenu'] as $key => $value)
            {
                $this->submenu[$key] = $value;
            }
        }

        if (!empty($vars['meta']))
        {
            foreach ($vars['meta'] as $key => $value)
            {
                $this->page[$key]   = $value;
            }
        }

        foreach($vars as $key => $val)
        {
            if (!in_array($key, array('breadcrumbs')))
            {
                $this->viewer->assign($key, $val, false);
            }
        }
    }

    public function assign_vars($vars = array())
    {
        $this->viewer->assign('PATH_ROOT',  PATH_ROOT, false);
        $this->viewer->assign('PATH_THEMES',    PATH_TPL . '/themes', false);
        $this->viewer->assign('uri',            $this->path, true);
        $this->viewer->assign('_backuri',       base64_encode($this->request), true);
        
        if (!is_null($this->csrf_token))
        {
            $this->viewer->assign('_csrf_token',    $this->csrf_token, true);
            $this->viewer->assign('_csrf_param',    $this->csrf_param, true);
        }
 
        if (!empty($vars))
        {
            $this->assign_row($vars);
        }
        elseif (!empty($this->template_vars))
        {
            foreach ($this->template_vars as $key => $arr)
            {
                if (!empty($arr))
                {
                    $this->assign_row($arr);
                }
            }
        }
    }

    public function setUri()
    {
        foreach ($this->path as $k => $v)
        {
            $this->viewer->assign('uri'.$k, $v, true);
        }
        
        $this->viewer->assign('uri', $this->path, true);
    }

    public function helpers()
    {
        $hooks = new hooksHelper();
        $hooks_data = $hooks->init();
        
        if (!empty($hooks_data))
        {
            $this->assign_vars($hooks_data);
        }
    }

    final public function run($server = array())
    {
        $this->_server = $server;

        $this->headers();
        $this->logout();

        // Структура сайта
        $this->siteMap();

        // Информация о странице
        $this->pageData();

        // Меню сайта
        $this->siteMenu();
        
        // Подменю страницы
        $this->subMenu();

        // Содержимое страницы
        $this->getContent();

        // Хлебные крошки
        $this->breadcrumbs();

        // Очищаем карту сайта
        $this->siteMapClear();
        
        $this->helpers();
        
        // $this->getCanonicalPage();

        $this->setUri();

        $this->viewer->assign('PATH_ROOT',          PATH_ROOT, false);
        $this->viewer->assign('PATH_MODULE',        PATH_MODULE, false);
        $this->viewer->assign('PATH_THEMES',        PATH_TPL . '/themes', false);

        $this->viewer->assign('_page',              $this->page, true);
        $this->viewer->assign('_locale',            $this->locale, true);
        $this->viewer->assign('_backuri',           base64_encode($this->request), true);
        $this->viewer->assign('_sitemap',           $this->sitemap, false);
        $this->viewer->assign('_sitemenu',          $this->sitemenu, true);
        $this->viewer->assign('_submenu',           $this->submenu, true);
        $this->viewer->assign('_breadcrumbs',       $this->breadcrumbsTree, true);

        if (!is_null($this->csrf_token))
        {
            $this->viewer->assign('_csrf_token',    $this->csrf_token, true);
            $this->viewer->assign('_csrf_param',    $this->csrf_param, true);
        }

        if ($this->page['id'] == 0)
        {
            header('HTTP/1.1 404 Not Found');

            $this->viewer->assign('_page', $this->error, true);
            $this->viewer->display(PATH_TPL . '/themes/system/error-404');
        }
        else
        {
            $this->getTemplate();
            $this->viewer->display($this->pattern);
        }

        unset($this->template_vars, $this->sitemap, $this->sitemenu, $this->structure);
    }
}

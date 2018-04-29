<?php

class Data
{
    use Singleton, Tools;
    
    public function __construct()
    {
        // parent::__construct();
    }

    public function getUnit($item = array())
    {
        if (!empty($item))
        {
            $indynamic = $item['indynamic']; // 0 Везде, 1 Только на странице, 2 Только на подстраницах
        
            if ( ($indynamic == 0) ||
                 (!$this->dynamic_page && $indynamic == 1) || // Только на странице
                 ($this->dynamic_page && $indynamic == 2) ) { // Только на подстраницах 

                if ($item['type'] == 'module')
                {
                    $item['content'] = $this->getModule($item['item'], $item['mode']);
                }
                elseif ($item['type'] == 'search')
                {   $this->assign_vars();
                    $item['content'] = $this->getSearch($item['item']);
                }
                elseif ($item['type'] == 'block')
                {
                    $item['content'] = $this->getBlock($item['item']);
                }
                elseif ($item['type'] == 'zone')
                {
                    $item['content'] = $this->getZone($item['item']);
                }
                elseif ($item['type'] == 'banner')
                {
                    $item['content'] = $this->getBanner($item['item']);
                }
            }
            else
            {
                $item['removed'] = true;
            }
            
            return $item;
        }
    }

    public function getTranslate($text = '', $lang = 'ru-en')
    {
        $translate_url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=' . TRANSLATE_API . '&lang=' . $lang . '&text=' . $text;
        $translate = json_decode(file_get_contents($translate_url), true);

        if (isset($translate['text'][0]))
        {
            return $translate['text'][0];
        }

        return $text;
    }

    protected function getZone($item = '')
    {
        $zone = Q( "SELECT `b`.`id`, `b`.`block_cont`, `b`.`module` FROM `#__blc_zone` as `z` LEFT JOIN `#__blc_blocks` as `b` ON `b`.`pid`=`z`.`id` WHERE `b`.`visible`=1 AND `z`.`visible`=1 AND `z`.`sys_name` LIKE ?s ORDER BY `b`.`ord` ASC", array( $item ))->all();

        if (!empty($zone))
        {
            $result = '';

            foreach($zone as $block)
            {
                $result .= $this->getBlockItem($block);
            }

            return $result;
        }
    }

    protected function getBlock($item = '')
    {
        $block = Q("SELECT `id`, `block_cont`, `module` FROM `#__blc_blocks` WHERE `visible`=1 AND `id`=?i LIMIT 1", array((int)$item))->row();
        
        return $this->getBlockItem($block);
    }

    protected function getBanner($item = '')
    {
        return '';
        return Q("SELECT `name`, `sys_name`, `file`, `link` FROM `#__blc_banners` WHERE `sys_name`=?i AND `visible`=1 ORDER BY `ord`", array($item))->all();
    }

    protected function getSearch($item = '')
    {
        $error = 0;
        
        if (isset($_GET[$this->search_var]) && strlen($_GET[$this->search_var]) < 3)
        {
            $error = 1;
        }
        elseif (isset($_GET[$this->search_var]) && !preg_match("/^[".chr(0x7F)."-".chr(0xff)."a-zA-Z0-9\- \s]+$/", $_GET[$this->search_var]))
        {
            $error = 2;
        }
        
        if (isset($_GET[$this->search_var])) 
        {
            $this->viewer->assign("search_word", urldecode($_GET[$this->search_var]));
        }

        $this->viewer->assign("search_error", $error);
        
        if (!$error && isset($_GET[$this->search_var]))
        {
            $rs = new Request_search();
            $rs->search_query = urldecode($_GET[$this->search_var]);
            $rs->find();

            $this->viewer->assign("search_result", $rs->result);
            $this->viewer->assign("search_result_count", $rs->count);
            $this->viewer->assign("pager_info", $rs->pager);
        }
        
        return $this->viewer->fetch(PATH_TPL . "/themes/system/search");
    }

    protected function getModule($bind = '', $mehod = '')
    {
        $module =
        Q("SELECT
                `id`,
                `func_name`,
                `cache` " .
            "FROM `#__mdd_binds` " .
            "WHERE `func_name` LIKE ?s " .
            "LIMIT 1",
        array( $bind ))->row();

        if (!$mehod)
        {
            $mehod = 'index';
        }

        return $this->loadModule($module, $mehod);
    }

    private function prepareMethod($method = '')
    {
        $method = preg_replace('/\-/', '', $method);
        return $method;
    }

    private function loadModule($module = array(), $method = 'index')
    {
        $class = PATH_MODULE . '/' . $module['func_name'] . '/' . $module['func_name'] . 'Module.class.php';
        
        if (file_exists($class))
        {
            require_once $class;
        }

        $controller = $module['func_name'] . 'Module';

        if (class_exists($controller))
        {
            $controller = new $controller;

            $module_root    = $this->getModuleRoot();
            $arguments      = $this->arguments;

            if (empty($arguments))
            {
                $arguments  = array_values(array_diff($this->path, preg_split('/\/+/', $module_root, -1, PREG_SPLIT_NO_EMPTY))); 
            }

            if (defined('CSRF_PROTECTION') && CSRF_PROTECTION)
            {
                $controller->setCSRF($this->csrf_token, $this->csrf_param);
            }
            
            $controller->setModuleRoot($module_root);
            $controller->setArguments($arguments);
            $controller->setModule($module);
            $controller->setLocale($this->locale);
            $controller->setPage($this->page);
            $controller->setCaching();

            $is_post_method  = false;
            $is_index_method = false;
            $is_class_method = false;
            $is_files_method = false;
            
            $action = 'index';

            if (isset($controller->arguments[0]))
            {
                $action = $this->prepareMethod($controller->arguments[0]) . 'Method';
                
                $is_class_method = method_exists($controller, $action);
                $is_files_method = file_exists(PATH_MODULE . '/' . $module['func_name'] . '/' . $action . '.class.php');
            }

            $is_index_method = method_exists($controller, $method);

            if ($_SERVER['REQUEST_METHOD'] == 'POST')
            {
                $is_post_method = true;
            }

            if (!$is_class_method && !$is_files_method || $is_post_method)
            {
                if ($is_post_method)
                {
                    $method = 'post';
                }

                $action = $method . 'Method';

                $is_class_method = method_exists($controller, $action);
                $is_files_method = file_exists(PATH_MODULE . '/' . $module['func_name'] . '/' . $action . '.class.php');

                if (!$is_class_method && !$is_files_method)
                {
                    if ($is_post_method)
                    {
                        $action = 'post';

                        $is_class_method = method_exists($controller, $action);
                        $is_files_method = file_exists(PATH_MODULE . '/' . $module['func_name'] . '/' . $action . '.class.php');
                    }
                    
                    if (!$is_class_method && !$is_files_method && $is_index_method || $action == 'indexMethod')
                    {
                        $action = 'index';
                    }
                }
            }

            if ($is_files_method || $is_class_method || $is_index_method)
            {
                $controller->module_root = str_replace('main/', '', $controller->module_root);

                if ($is_files_method)
                {
                    $class_name = $action == 'index' ? $action . 'Method' : $action;

                    require_once PATH_MODULE . '/' . $module['func_name'] . '/' . $class_name . '.class.php';

                    $_action = new $class_name;
                    
                    $_action->setPage($this->page);
                    $_action->setLocale($this->locale);
                    $_action->setModule($controller->module);
                    $_action->setArguments($controller->arguments);
                    $_action->setModuleRoot($controller->module_root);
                    $_action->setCaching();

                    $data = $_action->index();
                }
                else
                {
                    $data = $controller->{$action}();
                }

                if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
                {
                    echo json_encode($data, 64 | 256); die;
                }

                $data['module_root'] = $controller->module_root;
                
                $this->template_vars[] = $data;
                
                $this->assign_vars($data);
                
                if (isset($data['page']['id']) && $data['page']['id'] == 0)
                {
                    return;
                }
                
                $template = PATH_MODULE . '/' . $module['func_name'] . '/tpl/' . (isset($data['template']) ? $data['template'] : 'index');
            
                unset($data, $_action, $controller, $is_post_method, $is_files_method, $is_class_method, $is_index_method);

                return $this->viewer->fetch($template);
            }
        }
    }

    protected function getBlockItem($block)
    {
        if ($block['module'] == '' || $block['module'] == '0' || $block['module'] == 0)
        {
            return $this->viewer->fetch('eval:' . stripslashes($block['block_cont']));
        }
        else
        {
            $module = Q("SELECT `func_name` FROM `#__mdd_binds` WHERE `id`=?i LIMIT 1", array($block['module']))->row();
            
            return $this->loadModule($module, 'block');
        }
    }

    protected function getModuleRoot()
    {
        $root = array();

        foreach($this->path as $page)
        {
            $root[] = $page;

            if ($page == $this->page['system'])
            {
                break;
            }
        }
        
        return implode('/', $root);
    }
}
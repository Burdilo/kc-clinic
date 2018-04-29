<?php

final class importController extends cpLoader
{
    use Singleton;

	public function __construct()
	{
        parent::__construct();
	}
	
	public function index()
    {
        $exchange = scandir(PATH_ROOT . '/exchange/');
        $formats = array('csv', 'xls', 'xlsx', 'xlsm', 'xlsb', 'xltm', 'xlam', 'xml', 'yaml');

        $filename   = __get('filename');
        $setimport  = intval(__get('setimport'));
        $module_id  = __get('module_id');
        
        if ($filename && $module_id)
        {
            $settings = Q("SELECT `name`, `value` FROM `#__import__settings`")->all('name');

            if (!empty($settings))
            {
                foreach($settings as $k => $v)
                {
                    $settings[$k] = $v['value'];
                }
            }

            $fields = Q("SELECT `module_field`, `col_index` FROM `#__import__profiles` WHERE `module_id`=?i", array( $module_id ))->all('col_index');
            
            if (!empty($fields))
            {
                foreach($fields as $k => $v)
                {
                    $fields[$k] = $v['module_field'];
                }
            }
     
            if (file_exists(PATH_ROOT . '/exchange/' . $filename))
            {
                importFile($filename, $fields, $module_id, $setimport, isset($settings['line_limit']) ? $settings['line_limit'] : 10);
            }

            redirect( $info['base_path']);
        }

        foreach($exchange as $key => $item)
        {
            $extention = @end(explode('.', $item));
            
            if (!is_file(PATH_ROOT . '/exchange/' . $item) || !in_array($extention, $formats))
            {
                unset($exchange[$key]);
            }
            else
            {
                $exchange[$key] = array(
                    'file'  =>  $item,
                    'time'  =>  date("d.m.Y H:i:s.", filectime(PATH_ROOT . '/exchange/' . $item)),
                    'size'  =>  humanFileSize(filesize(PATH_ROOT . '/exchange/' . $item))
               );
            }
        }

        $info['exchange_files'] = $exchange;
        $info['profile_list'] = $this->getProfilesList();
        
        return $info;
    }

    public function settings()
    {
        $settings = Q("SELECT `name`, `value` FROM `#__import__settings`")->all('name');
        
        if (!empty($settings))
        {
            foreach($settings as $k => $v)
            {
                $settings[$k] = $v['value'];
            }
        }

        $info['settings'] = $settings;

        return $info;
    }
    
    public function getModules()
    {
        return Q("SELECT `id`, `name`, `sys_name` FROM `#__mdd_modules` WHERE `active`=1 ORDER BY `order`")->all();
    }

    public function getFields($module_id)
    {
        return Q("SELECT `id`, `f_name`, `f_sys_name` FROM `#__mdd_fields` WHERE `module_id`=?i ORDER BY `ord`", array( $module_id ))->all();
    }

    public function getProfilesList()
    {
        return Q("SELECT `p`.`module_id`, `m`.`name` FROM `#__import__profiles` AS `p` LEFT JOIN `#__mdd_modules` AS `m` ON `m`.`id`=`p`.`module_id` GROUP BY `p`.`module_id`")->all();
    }

    public function getProfiles($module_id)
    {
        return Q("SELECT `id`, `name`, `module_id`, `module_field`, `col_index` FROM `#__import__profiles` WHERE `module_id`=?i", array( $module_id ))->all();
    }

    public function profiles()
    {
        if ($this->method == 'item')
        {
            if (!$this->element)
            {
                $info['modules'] = $this->getModules();
            }
            else
            {
                $info['profiles']   = $this->getProfiles($this->element);
                $info['fields']     = $this->getFields($this->element);
            }

            $info['module_id'] = $this->element;
        }
        elseif ($this->method == 'del')
        {
            if ($this->element)
            {
                Q("DELETE FROM `#__import__profiles` WHERE `module_id`=?i", array( $this->element ));
                redirect($this->base_path . '/profiles/');
            }

            $delete_mode = isset($path[5] ) ? $path[5] : '';
            $delete_id = isset($path[6] ) ? $path[6] : '';

            if ($delete_mode && $delete_id)
            {
                Q("DELETE FROM `#__import__profiles` WHERE `id`=?i LIMIT 1", array( $delete_id ));
                redirect($this->base_path . '/profiles/edit/' . $this->element . '/');
            }
        }
        else
        {
            $info['profile_list'] = $this->getProfilesList();
        }

        return $info;
    }

    public function post()
    {
        $action = __post("action");

        if ($action == "settings")
        {
            Q("TRUNCATE `#__import__settings`");

            unset($_POST['action']);

            foreach($_POST as $k => $v)
            {
                Q("INSERT INTO `#__import__settings` SET `name`=?s, `value`=?i", array( $k, $v ));
            }

            redirect($this->base_path . '/settings/');
        }
        elseif ($action == "add_fields")
        {
            Q("INSERT INTO `#__import__profiles` SET `name`=?s, `module_id`=?i, `module_field`=?s, `col_index`=?i ON DUPLICATE KEY UPDATE `module_id`=?i", array( $_POST['name'], $_POST['module_id'], $_POST['field_name'], $_POST['index'], $_POST['module_id'] ));
            redirect($this->base_path . '/profiles/edit/' . $_POST['module_id'] . '/');
        }
        elseif ($action == "add_module")
        {
            redirect($this->base_path . '/profiles/edit/' . $_POST['module_id'] . '/');
        }
    }
}
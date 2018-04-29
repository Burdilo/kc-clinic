<?php

final class metaController extends cpLoader
{
    use Singleton;
    // private $dispatch   = null;
    private $user   = null;
    private $meta   = null;
    private $mdd    = null;

    public function __construct()
    {
        parent::__construct();

        $this->user = new Person();
        
        if (is_numeric($this->element))
        {
            $this->meta = new Meta($this->element);
        }

        $this->mdd = new Mdd();
        // $this->dispatch = new Dispatch();
    }

    public function index()
    {
        if ($this->user->getAdminAccess() && !isset($this->path[2]))
        {
            redirect($this->base_path . '/module');
        }
    }

    public function lists()
    {
        if ($this->method == "add")
        {
            $info['mdd_list'] = $this->mdd->getLists();
        }
        elseif ($this->method == "edit")
        {
            $info['mdd_list'] = $this->mdd->getLists($this->element);
        }
        elseif ($this->method == "del")
        {
            $this->mdd->delLists($this->element);
            redirect($this->base_path. "/index/");
        }
        else
        {
            $info['mdd_list'] = $this->mdd->getLists();
        }

        return $info;
    }

    public function module()
    {
        if (!$this->element)
        {
            //redirect($this->base_path);
        }

        if ($this->method !== 'del' && $this->element)
        {
            $back_to_page = isset($_GET['back_to_page'] ) ? $_GET['back_to_page'] : (isset($_GET['page']) ? $_GET['page'] : 0);

            $info['module_id']      = $this->element;
            $info['types']          = getfl('type');
            $info['is_recursive']   = $this->mdd->is_recursive;
            $info['meta_enable']    = $this->meta->metaEnable($this->element, $this->argument);
            $info['meta_module']    = $this->meta->loadModule();
            
            $info['time']           = md5(uniqid() . rand(1110, 10000));
            $info['back_to_page']   = $back_to_page;
            $info['meta_fields']    = $this->meta->getFields($this->element, true);
            
            if ($this->mdd->is_recursive)
            {
                $info['meta_list_tree'] = $this->meta->treeModule($info['meta_fields']);
            }
        }

        if ($this->method == 'add')
        {
            $info['rec_field']          = $this->mdd->rec_field;
            $info['meta_item']          = $this->meta->itemModule($this->argument, $info['meta_fields']);
            $info['meta_next_ord']      = $this->meta->getNextOrd($info['meta_module']['name'], $this->meta->is_recursive);
        }
        elseif ($this->method == 'edit')
        {
            $info['meta_item']          = $this->meta->itemExtend($this->meta->itemModule($this->argument, $info['meta_fields']) );
        }
        elseif ($this->method == 'del')
        {
            $this->meta->deleteData($this->argument);

            if ( isset($_GET['backuri']) )
            {
                redirect($_GET['backuri']);
            }
            elseif ( $back_to_page )
            {
                redirect($this->base_path . '/module/list/' . $this->element . "/?page=" . $back_to_page);
            }
            else
            {
                redirect($this->base_path . '/module/list/' . $this->element);
            }
        }
        elseif ($this->method == "visible")
        {
            if ($this->element && $this->argument)
            {
                $sys_name = Q("SELECT `sys_name` FROM `#__mdd_modules` WHERE `id`=?i LIMIT 1", array( $this->element ))->row('sys_name');
                
                Q("UPDATE `#_mdd_".$sys_name."` SET `visible`=IF(`visible`!=1, 1, 0) WHERE `id`=?i LIMIT 1", array( $this->argument ));

                return array(
                    'status' => true
                );
            }
        }
        elseif ($this->element)
        {
            // $info['check_dispatch'] = $this->dispatch->checkModule($this->element);
            $module_list            = $this->meta->listModule($info['meta_fields']);
            $info['meta_list']      = $module_list['result'];
            $info['pager_info']     = $module_list['pager'];
            $info['meta_sort']      = $this->meta->sortModule( $this->element, $info['meta_fields']);
            $info['meta_filter']    = $this->meta->filterModule( $this->element, $info['meta_fields']);
            $info['meta_cookie']    = array();

            if (isset($_COOKIE['moduleSort']))
            {
                $meta_cookie = unserialize(from_base($_COOKIE['moduleSort']));

                if (isset($meta_cookie[$this->element]))
                {
                    $info['meta_cookie'] = $meta_cookie[$this->element];
                }
            }
        }
        else 
        {
            $result = $this->mdd->getGroupModules($this->mdd->getModules( 0, true ), $this->mdd->getGroup());
            
            $info['groups']  = $result['groups'];
            $info['modules'] = $result['modules']; 
        }

        return $info;
    }

    public function fileUpload()
    {
        $group_id = $_POST['groupid'];
        $settings = array();

        if (isset($_POST['settings']))
        {
            $settings = json_decode($_POST['settings'], true);
        }

        if (!empty($_FILES['file']))
        {
            F($_FILES['file'])
                ->upload($group_id)
                ->resize($settings);
        }
    }
    
    public function filename()
    {
        $id     = __post('id');
        $name   = __post('name');

        $status = false;

        if ($id && $name)
        {
            Q("UPDATE `#__sys_files` SET `alt`=?s, `title`=?s WHERE `id`=?i OR `fid`=?i", array( $name, $name, $id, $id ));

            $status = true;
        }

        return array( 'status' => $status );
    }

    public function filevisible()
    {
        $id         = __post('id');
        $visible    = __post('visible');

        $status = false;

        if ($id)
        {
            Q("UPDATE `#__sys_files` SET `visible`=?i WHERE `id`=?i OR `fid`=?i", array( $visible, $id, $id ));

            $status = true;
        }

        return array( 'status' => $status );
    }

    public function filedelete()
    {
        $id = __post('id');

        $f = new Files;

        $status = $f->deleteFile($id);

        return array( 'status' => $status );
    }
    
    public function post()
    {
        $action = __post("form_action");
        $back_page = isset($_GET['back_to_page']) ? intval($_GET['back_to_page']) : '';
        
        $apply_url = '';
        $redirect_url = '';

        if ($back_page)
        {
            $redirect_url = '?page=' . $back_page;
            $apply_url = '&back_to_page=' . $back_page;
        }

        if ($action == "add")
        {
            $last_id = $this->meta->insertData($this->element);

            if ( isset($_POST['apply']) )
            {
                redirect($this->base_path . '/module/edit/' . $this->element . '/' . $last_id . '/?msg=apply' . $apply_url);
            }
            elseif ( isset($_GET['backuri']) )
            {
                redirect($_GET['backuri']);
            }
            else
            {
                redirect($this->base_path . '/module/list/' . $this->element . '/' . $redirect_url);
            }
        }
        elseif ($action == "edit")
        {
            $this->meta->updateData($this->element, $this->argument);

            if (isset($_POST['apply']))
            {
                redirect($this->base_path . '/module/edit/' . $this->element . '/' . $this->argument . '/?msg=apply' . $apply_url);
            }
            elseif ( __get("backuri") )
            {
                redirect($_GET['backuri']);
            }
            else
            {
                redirect($this->base_path . '/module/list/' . $this->element . '/' . $redirect_url);
            }
        }
        elseif ($action == "add_list")
        {
            $name       = __post("name");
            $list_name  = __post("list_name");
        
            if (!$name) return false;
            if (!$list_name) return false;

            $this->mdd->addList();
            
            if (isset($_POST['apply']))
            {
                redirect($this->base_path. "/lists/edit/" . $list_name . "/?msg=apply");
            }
            else
            {
                redirect($this->base_path. "/lists/");
            }       
        }
        elseif ($action == "edit_list")
        {
            $name       = __post("name");
            $list_name  = __post("list_name");
            $old_list_name  = __get("list_name");
            
            if (!$name) return false;
            if (!$list_name) return false;

            $this->mdd->editList();
            
            if (isset($_POST['apply']))
            {
                redirect($this->base_path. "/lists/edit/" . $list_name . "/?msg=apply");
            }
            else
            {
                redirect($this->base_path. "/lists/");
            }
        }
    }
}
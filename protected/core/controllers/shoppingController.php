<?php

final class shoppingController extends cpLoader
{
    use Singleton, Tools;

    private $shopping = null;

    private $db = array(
                'users'     => '#__shop_buyers',
                'orders'    => '#__shop_orders',
                'catalog'   => '#__shop_catalog',
                'category'  => '#__shop_category',
                'settings'  => '#__shop_settings'
            );

    public function __construct()
    {
        parent::__construct();

        $this->shopping = new Shopping();
    }

    private function getSettings($key = '')
    {
        if (!$this->mcache_enable || !($settings = $this->getCache('_shop_settings_')))
        {
            $settings = array();

            $temp = $this->shopping->getSettings();

            if (!empty($temp))
            {
                foreach ($temp as $item)
                {
                    $settings[$item['class']][$item['value']] = $item;
                }
            }

            $this->setCache('_sitemap_', $settings);
        }

        if (isset($key) && isset($settings[$key]))
        {
            return $settings[$key];
        }

        return $settings;
    }

    public function updateStructure()
    {
        $oid = isset($_POST['oid']) ? intval($_POST['oid']) : '';
        $pid = isset($_POST['pid']) ? intval($_POST['pid']) : '';
        $nid = isset($_POST['nid']) ? intval($_POST['nid']) : '';

        $min = Q("SELECT MIN(`ord`) as `ord` FROM `" . $this->db['category'] . "` WHERE `pid`=?i LIMIT 1", array( $pid ))->row('ord');

        Q("UPDATE `" . $this->db['category'] . "` SET `ord`=(`ord` - ?i + 10) WHERE `pid`=?i", array( $min, $pid ));

        if ($nid == 0)
        {
            $ord = Q("SELECT (MAX(`ord`) + 5) as `ord` FROM `" . $this->db['category'] . "` WHERE `pid`=?i LIMIT 1", array( $pid ))->row('ord');
        }
        else {
            $ord = Q("SELECT (`ord` - 5) as `ord` FROM `" . $this->db['category'] . "` WHERE `id`=?i LIMIT 1", array( $nid ))->row('ord');  
        }
        
        Q("UPDATE `" . $this->db['category'] . "` SET `pid`=?i, `ord`=?i WHERE `id`=?i LIMIT 1", array(
            $pid, $ord, $oid
        ));

        exit(
            json_encode(
                array(
                    'status' => true
                ), 64 | 256
            )
        );
    }

    public function getStructure()
    {
        $category = $this->shopping->structureCategory();

        exit(
            json_encode(
                $category, 64 | 256
            )
        );
    }

    private function getUser($id = 0)
    {
        return $this->shopping->getUser($id);
    }

    public function index()
    {
        if ($this->method == 'list')
        {
            redirect($this->base_path . '/orders');
        }
    }

    public function catalog()
    {
        $info = array();

        switch ($this->method)
        {

            case 'list':
                
                $info['products'] = $this->shopping->productList(0);

            break;

            case 'add':

                $products = array();
                $products['ord']   = $this->shopping->getProductsOrd();
                $info['products'] = $products;

                $info['fields'] = $this->shopping->catalogFields();

            break;

            case 'edit':

                $info['product'] = $this->shopping->productItem($this->element);
                $info['fields'] = $this->shopping->catalogFields($this->element);

            break;

            case 'del':

                $this->shopping->deleteProduct($this->element, true);
                
                if ( isset($_GET['backuri']) )
                {
                    redirect(base64_decode($_GET['backuri']));
                }
                else
                {
                    redirect($this->base_path . '/catalog');
                }
                
            break;
        }

        if (in_array($this->method, array('add', 'edit')))
        {
            $info['category_list'] = $this->shopping->categoryTree();
        }

        return $info;
    }

    public function category()
    {
        $info = array();

        if (in_array($this->method, array('add', 'edit')))
        {
            $info['category_list'] = $this->shopping->categoryTree();
        }

        switch ($this->method)
        {
            case 'list':

                $info['category'] = $this->shopping->categoryTree();
                
            break;

            case 'add':

                $category = array();
                $category['photo'] = 'file_' . substr(str_replace('.', '_', uniqid()), 0, 5) . '_' . str_replace('.', '_', uniqid());
                $category['ord']   = $this->shopping->getCategoryOrd();

                $info['category'] = $category;

            break;

            case 'edit':

                $info['item'] = $this->shopping->categoryItem($this->element);

            break;

            case 'del':

                $this->shopping->deleteCategory($this->element, true);
                
                if ( isset($_GET['backuri']) )
                {
                    redirect(base64_decode($_GET['backuri']));
                }
                else
                {
                    redirect($this->base_path . '/category');
                }
                
            break;
        }
        
        return $info;
    }
    
    public function discounts()
    {
        
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

    public function cart()
    {
        $info = array();
        $info['fields_type'] = Q("SELECT * FROM `#__mdd_fields_type` WHERE `special`=?i", array( 1 ))->all();

        return $info;
    }

    public function tags()
    {
        $info = array();
        $info['fields_type'] = Q("SELECT * FROM `#__shop_tags`")->all();

        return $info;
    }

    public function manufacturer()
    {
        $info = array();
        $info['fields_type'] = Q("SELECT * FROM `#__shop_manufacturer`")->all();

        return $info;
    }

    public function orders()
    {
        $info = array();
        
        $orders = $this->shopping->getOrders(0, 12);
        $settings = $this->getSettings();

        if (!empty($orders))
        {
            foreach ($orders as &$rec)
            {
                $rec['user']        = $this->getUser($rec['user']);
                $rec['payment']     = $settings['payment'][$rec['payment']]['variable'];
                $rec['delivery']    = $settings['delivery'][$rec['delivery']]['variable'];

                $rec['status_delivery'] = $settings['status_delivery'][$rec['status_delivery']]['variable'];
                $rec['status_payment'] = $settings['status_payment'][$rec['status_payment']]['variable'];
            }
        }

        $info['orders']     = $orders;
        $info['settings']   = $settings;

        return $info;
    }

    public function buyers()
    {
        $info = array();

        if (in_array($this->method, array('add', 'edit')))
        {
            
        }

        switch ($this->method)
        {
            case 'list':

                $info['users'] = $this->shopping->getUsers(0, 10);
                
            break;

            case 'add':

                $buyers = array();
                $buyers['photo'] = 'file_' . substr(str_replace('.', '_', uniqid()), 0, 5) . '_' . str_replace('.', '_', uniqid());
                
                $info['buyers'] = $buyers;

            break;

            case 'edit':

                $info['item'] = $this->shopping->getUser($this->element, true);

            break;

            case 'del':

                $this->shopping->deleteUser($this->element, true);

                if ( isset($_GET['backuri']) )
                {
                    redirect(base64_decode($_GET['backuri']));
                }
                else
                {
                    redirect($this->base_path . '/buyers');
                }
                
            break;
        }
        
        // exit( __debug( $info, $this->method . ' - ' . $this->element ) );

        return $info;
    }

    public function settings()
    {
        $info = array();
        
        return $info;
    }

    public function post()
    {
        $action = isset($_POST['form_action']) ? $_POST['form_action'] : '';
        
        $data = array();
    
        if (in_array($action, array('add_category', 'edit_category')))
        {
            # meta

            $data['s:meta_title']           = $_POST['meta_title'];
            $data['ls:meta_robots']         = $_POST['meta_robots'];
            $data['s:meta_keywords']        = $_POST['meta_keywords'];
            $data['s:meta_description']     = $_POST['meta_description'];

            # data

            $data['i:pid']                  = $_POST['pid'];
            $data['s:name']                 = $_POST['name'];
            $data['s:system']               = $_POST['system'];
            $data['s:description']          = $_POST['description'];

            # system

            $data['i:ord']                  = $_POST['ord'];
            $data['i:visible']              = $_POST['visible'];
        }

        if (in_array($action, array('add_buyers', 'edit_buyers')))
        {
            # data

            $data['s:name']                 = $_POST['name'];
            $data['s:photo']                = $_POST['photo'];
            $data['s:email']                = $_POST['email'];
            $data['s:password']             = md5($_POST['password']);
            $data['i:phone']                = $this->phone($_POST['phone']);
            $data['i:birthday']             = $this->timestamp($_POST['birthday']);
            $data['i:balance']              = $_POST['balance'];
            $data['i:bonus']                = $_POST['bonus'];
            $data['i:status']               = $_POST['status'];
            $data['i:active']               = $_POST['active'];
            
            $data['address']                = $_POST['address'];
        }

        if (in_array($action, array('add', 'edit')))
        {
            # meta

            $data['s:meta_title']           = $_POST['meta_title'];
            $data['ls:meta_robots']         = $_POST['meta_robots'];
            $data['s:meta_keywords']        = $_POST['meta_keywords'];
            $data['s:meta_description']     = $_POST['meta_description'];

            # data
            
            $data['s:mod_name']             = $_POST['mod_name'];
            $data['i:price']                = $_POST['price'];
            
            $data['s:name']                 = $_POST['name'];
            $data['s:system']               = $_POST['system'];
            $data['i:category']             = $_POST['category'];
            $data['s:article']              = $_POST['article'];
            $data['s:photo']                = $_POST['photo'];
            $data['s:description']          = $_POST['description'];
            
            $data['properties']             = __post('properties');
            $data['modification']           = __post('modification');

            # system
            
            $data['i:ord']                  = $_POST['ord'];
            $data['i:visible']              = $_POST['visible'];
        }

        // exit(__Debug($_POST));
        // exit(__Debug($data));

        switch ($action) {
            /**
             * Каталог
             */

            case 'add':
                
                $last_id = $this->shopping->addProduct($data);

                if (isset($_POST['apply']) && $last_id)
                {
                    redirect($this->base_path . '/catalog/edit/' . $last_id . '/?msg=apply');
                }
                elseif (isset($_GET['backuri']))
                {
                    redirect(base64_decode($_GET['backuri']));
                }
                else
                {
                    redirect($this->base_path . '/catalog');
                }

            break;

            case 'edit':

                $this->shopping->editProduct($data, $this->element);

                if (isset($_POST['apply']))
                {
                    redirect($this->base_path . '/catalog/edit/' . $this->element . '/?msg=apply');
                }
                elseif (isset($_GET['backuri']))
                {
                    redirect(base64_decode($_GET['backuri']));
                }
                else
                {
                    redirect($this->base_path . '/catalog');
                }

            break;

            /**
             * Покупатели
             */
            case 'add_buyers':

                $last_id = $this->shopping->addBuyers($data);

                if (isset($_POST['apply']) && $last_id)
                {
                    redirect($this->base_path . '/buyers/edit/' . $last_id . '/?msg=apply');
                }
                elseif (isset($_GET['backuri']))
                {
                    redirect(base64_decode($_GET['backuri']));
                }
                else
                {
                    redirect($this->base_path . '/buyers');
                }

            break;

            case 'edit_buyers':

                $last_id = $this->shopping->editBuyers($data, $this->element);

                if (isset($_POST['apply']))
                {
                    redirect($this->base_path . '/buyers/edit/' . $this->element . '/?msg=apply');
                }
                elseif (isset($_GET['backuri']))
                {
                    redirect(base64_decode($_GET['backuri']));
                }
                else
                {
                    redirect($this->base_path . '/buyers');
                }

            break;

            /**
             * Категории
             */ 
            case 'add_category':

                $last_id = $this->shopping->addCategory($data);

                if (isset($_POST['apply']) && $last_id)
                {
                    redirect($this->base_path . '/category/edit/' . $last_id . '/?msg=apply');
                }
                elseif (isset($_GET['backuri']))
                {
                    redirect(base64_decode($_GET['backuri']));
                }
                else
                {
                    redirect($this->base_path . '/category');
                }

            break;

            case 'edit_category':

                $this->shopping->editCategory($data, $this->element);

                if (isset($_POST['apply']))
                {
                    redirect($this->base_path . '/category/edit/' . $this->element . '/?msg=apply');
                }
                elseif (isset($_GET['backuri']))
                {
                    redirect(base64_decode($_GET['backuri']));
                }
                else
                {
                    redirect($this->base_path . '/category');
                }
            break;
        }

        exit(__Debug($data, $this->action));
    }
}
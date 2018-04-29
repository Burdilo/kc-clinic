<?php

class pageservicesModule extends Module
{
    public function index()
    {
        if (isset($this->arguments[1]))
        {
            return $this->errorPage;
        }

        if (isset($this->arguments[0]))
        {
            //exit(__debug($arguments));
            return $this->itemMethod($this->arguments[0]);
        }

        return $this->listMethod();
    }

    public function listMethod()
    {
        /*
        # Пагинация
        #
        $pager = $this->pager($this->countItem(), $this->limit);

        # Получение списка
        #
        if (!$this->mcache_enable || ($this->caching == 1 && !($pageservices = $this->getCache('_module_pageservices'))))
        {
            $pageservices = Q("SELECT * FROM `#_mdd_pageservices` WHERE `visible`=1 ORDER BY STR_TO_DATE(`date`, '%d.%m.%Y') DESC, `ord` DESC")->all();

            if (!empty($pageservices))
            {
                foreach ($pageservices as &$pageservices_item)
                {
                    $pageservices_item['date'] = Dates($pageservices_item['date'], $this->locale);
                }
            }

            $this->setCache('_module_pageservices', $pageservices);
        }

        # Мета теги
        #
        $meta = $this->metaData($pageservices);
        */
       
       $services = Q("SELECT * FROM `#_mdd_pageservices` WHERE `visible` = ?i ORDER BY `ord` DESC", array(1))->all();
       if (!empty($services)){
        $sif = new Files();
        foreach ($services as $key => $value) {
            $services[$key]['image_file'] = $sif->getFilesByGroup($value['cover'], array('original', 'md'), array('file'), true);
        }
       }
       //exit(__debug($services));

        return array(
            //'meta'              =>  $meta,
            //'pager'             =>  $pager,
            'services'     =>  $services,
            'template'          =>  'list'
        );
    }
    
    public function itemMethod($item)
    {
        $service = Q("SELECT * FROM `#_mdd_pageservices` WHERE `visible` = ?i AND `system` = ?s", array(1, $item))->row();
        //exit(__debug($service));

        # Мета теги
        #
        $meta = $this->metaData($service);

        # Хлебные крошки
        # 
        $breadcrumbs = array(
                'id'        => $service['id'],
                'pid'       => '',
                'name'      => stripslashes($service['title']),
                'sys_name'  => $service['system'],
                'link'      => '/' . $this->module_root . '/' . $service['id'] . '-' . $service['system']
        );

        return array(
            'meta'              =>  $meta,
            'page'              =>  array( 'name' => '' ),
            'service'     =>  $service,
            'breadcrumbs'       =>  $breadcrumbs,
            'template'          =>  'item'
        );
    }

    public function blockMethod()
    {
        return array(
            'template' => 'block'
        );
    }
}
<?php

class servicesModule extends Module
{
    public function index()
    {
        if (isset($this->arguments[1]))
        {
            return $this->errorPage;
        }

        if (isset($this->arguments[0]))
        {
            return $this->itemMethod(intval($this->arguments[0]));
        }

        return $this->blockMethod();
    }

    public function listMethod()
    {
        # Пагинация
        #
        $pager = $this->pager($this->countItem(), $this->limit);

        # Получение списка
        #
        if (!$this->mcache_enable || ($this->caching == 1 && !($services = $this->getCache('_module_services'))))
        {
            $services = Q("SELECT * FROM `#_mdd_services` WHERE `visible`=1 ORDER BY STR_TO_DATE(`date`, '%d.%m.%Y') DESC, `ord` DESC")->all();

            if (!empty($services))
            {
                foreach ($services as &$services_item)
                {
                    $services_item['date'] = Dates($services_item['date'], $this->locale);
                }
            }

            $this->setCache('_module_services', $services);
        }

        # Мета теги
        #
        $meta = $this->metaData($services);

        return array(
            'meta'              =>  $meta,
            'pager'             =>  $pager,
            'services'     =>  $services,
            'template'          =>  'list'
        );
    }
    
    public function itemMethod($item = 0)
    {
        if (!$this->mcache_enable || ($this->caching == 1 && !($services = $this->getCache('_module_services_item'))))
        {
            $services = Q("SELECT * FROM `#_mdd_services` WHERE `visible`='1' AND `id`=?i", array( $item ))->row();
            $services['date'] = Dates($services['date'], $this->locale);

            $this->setCache('_module_services_item', $services);
        }

        # Мета теги
        #
        $meta = $this->metaData($services);

        # Хлебные крошки
        # 
        $breadcrumbs = array(
                'id'        => $services['id'],
                'pid'       => '',
                'name'      => stripslashes($services['name']),
                'sys_name'  => $services['system'],
                'link'      => '/' . $this->module_root . '/' . $services['id'] . '-' . $services['system']
        );

        return array(
            'meta'              =>  $meta,
            'page'              =>  array( 'name' => '' ),
            'services'     =>  $services,
            'breadcrumbs'       =>  $breadcrumbs,
            'template'          =>  'item'
        );
    }

    public function blockMethod()
    {
        $services = Q("SELECT * FROM `#_mdd_services` WHERE `visible` = ?i", array(1))->all();
        if (!empty($services)){
            $sif = new Files();
            foreach ($services as $key => $value) {
                $services[$key]['image_file'] = $sif->getFilesByGroup($value['image'], array('original', 'sm'), array('file'), true);
            }
        }
        return array(
            'template' => 'block',
            'services' => $services
        );
    }
}
<?php

class mainsliderModule extends Module
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
        if (!$this->mcache_enable || ($this->caching == 1 && !($mainslider = $this->getCache('_module_mainslider'))))
        {
            $mainslider = Q("SELECT * FROM `#_mdd_mainslider` WHERE `visible`=1 ORDER BY STR_TO_DATE(`date`, '%d.%m.%Y') DESC, `ord` DESC")->all();

            if (!empty($mainslider))
            {
                foreach ($mainslider as &$mainslider_item)
                {
                    $mainslider_item['date'] = Dates($mainslider_item['date'], $this->locale);
                }
            }

            $this->setCache('_module_mainslider', $mainslider);
        }

        # Мета теги
        #
        $meta = $this->metaData($mainslider);

        return array(
            'meta'              =>  $meta,
            'pager'             =>  $pager,
            'mainslider'     =>  $mainslider,
            'template'          =>  'list'
        );
    }
    
    public function itemMethod($item = 0)
    {
        if (!$this->mcache_enable || ($this->caching == 1 && !($mainslider = $this->getCache('_module_mainslider_item'))))
        {
            $mainslider = Q("SELECT * FROM `#_mdd_mainslider` WHERE `visible`='1' AND `id`=?i", array( $item ))->row();
            $mainslider['date'] = Dates($mainslider['date'], $this->locale);

            $this->setCache('_module_mainslider_item', $mainslider);
        }

        # Мета теги
        #
        $meta = $this->metaData($mainslider);

        # Хлебные крошки
        # 
        $breadcrumbs = array(
                'id'        => $mainslider['id'],
                'pid'       => '',
                'name'      => stripslashes($mainslider['name']),
                'sys_name'  => $mainslider['system'],
                'link'      => '/' . $this->module_root . '/' . $mainslider['id'] . '-' . $mainslider['system']
        );

        return array(
            'meta'              =>  $meta,
            'page'              =>  array( 'name' => '' ),
            'mainslider'     =>  $mainslider,
            'breadcrumbs'       =>  $breadcrumbs,
            'template'          =>  'item'
        );
    }

    public function blockMethod()
    {
        $mainslider = Q("SELECT * FROM `#_mdd_mainslider` WHERE `visible` = 1 ORDER BY `ord` DESC")->all();
        if (!empty($mainslider)){
            $rif = new Files();
            foreach ($mainslider as $key => $value) {
                $mainslider[$key]['image_file'] = $rif->getFilesByGroup($value['image'], array('original'), array('file', 'title'), true);
            }
        }
        return array(
            'template' => 'block',
            'mainslider' => $mainslider
        );
    }
}
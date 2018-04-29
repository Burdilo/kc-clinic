<?php

class fotoresultModule extends Module
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
        if (!$this->mcache_enable || ($this->caching == 1 && !($fotoresult = $this->getCache('_module_fotoresult'))))
        {
            $fotoresult = Q("SELECT * FROM `#_mdd_fotoresult` WHERE `visible`=1 ORDER BY STR_TO_DATE(`date`, '%d.%m.%Y') DESC, `ord` DESC")->all();

            if (!empty($fotoresult))
            {
                foreach ($fotoresult as &$fotoresult_item)
                {
                    $fotoresult_item['date'] = Dates($fotoresult_item['date'], $this->locale);
                }
            }

            $this->setCache('_module_fotoresult', $fotoresult);
        }

        # Мета теги
        #
        $meta = $this->metaData($fotoresult);

        return array(
            'meta'              =>  $meta,
            'pager'             =>  $pager,
            'fotoresult'     =>  $fotoresult,
            'template'          =>  'list'
        );
    }
    
    public function itemMethod($item = 0)
    {
        if (!$this->mcache_enable || ($this->caching == 1 && !($fotoresult = $this->getCache('_module_fotoresult_item'))))
        {
            $fotoresult = Q("SELECT * FROM `#_mdd_fotoresult` WHERE `visible`='1' AND `id`=?i", array( $item ))->row();
            $fotoresult['date'] = Dates($fotoresult['date'], $this->locale);

            $this->setCache('_module_fotoresult_item', $fotoresult);
        }

        # Мета теги
        #
        $meta = $this->metaData($fotoresult);

        # Хлебные крошки
        # 
        $breadcrumbs = array(
                'id'        => $fotoresult['id'],
                'pid'       => '',
                'name'      => stripslashes($fotoresult['name']),
                'sys_name'  => $fotoresult['system'],
                'link'      => '/' . $this->module_root . '/' . $fotoresult['id'] . '-' . $fotoresult['system']
        );

        return array(
            'meta'              =>  $meta,
            'page'              =>  array( 'name' => '' ),
            'fotoresult'     =>  $fotoresult,
            'breadcrumbs'       =>  $breadcrumbs,
            'template'          =>  'item'
        );
    }

    public function blockMethod()
    {
        $fotoresult = Q("SELECT * FROM `#_mdd_fotoresalt` WHERE `visible` = 1 ORDER BY `ord` DESC")->all();
        if (!empty($fotoresult)){
            $rif = new Files();
            foreach ($fotoresult as $key => $value) {
                $fotoresult[$key]['image_file'] = $rif->getFilesByGroup($value['image'], array('original', 'sm'), array('file', 'title'), true);
            }
        }
        //exit(__debug($fotoresult));
        return array(
            'template' => 'block',
            'fotoresult' => $fotoresult
        );
    }
}
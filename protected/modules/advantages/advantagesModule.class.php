<?php

class advantagesModule extends Module
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
        if (!$this->mcache_enable || ($this->caching == 1 && !($advantages = $this->getCache('_module_advantages'))))
        {
            $advantages = Q("SELECT * FROM `#_mdd_advantages` WHERE `visible`=1 ORDER BY STR_TO_DATE(`date`, '%d.%m.%Y') DESC, `ord` DESC")->all();

            if (!empty($advantages))
            {
                foreach ($advantages as &$advantages_item)
                {
                    $advantages_item['date'] = Dates($advantages_item['date'], $this->locale);
                }
            }

            $this->setCache('_module_advantages', $advantages);
        }

        # Мета теги
        #
        $meta = $this->metaData($advantages);

        return array(
            'meta'              =>  $meta,
            'pager'             =>  $pager,
            'advantages'     =>  $advantages,
            'template'          =>  'list'
        );
    }
    
    public function itemMethod($item = 0)
    {
        if (!$this->mcache_enable || ($this->caching == 1 && !($advantages = $this->getCache('_module_advantages_item'))))
        {
            $advantages = Q("SELECT * FROM `#_mdd_advantages` WHERE `visible`='1' AND `id`=?i", array( $item ))->row();
            $advantages['date'] = Dates($advantages['date'], $this->locale);

            $this->setCache('_module_advantages_item', $advantages);
        }

        # Мета теги
        #
        $meta = $this->metaData($advantages);

        # Хлебные крошки
        # 
        $breadcrumbs = array(
                'id'        => $advantages['id'],
                'pid'       => '',
                'name'      => stripslashes($advantages['name']),
                'sys_name'  => $advantages['system'],
                'link'      => '/' . $this->module_root . '/' . $advantages['id'] . '-' . $advantages['system']
        );

        return array(
            'meta'              =>  $meta,
            'page'              =>  array( 'name' => '' ),
            'advantages'     =>  $advantages,
            'breadcrumbs'       =>  $breadcrumbs,
            'template'          =>  'item'
        );
    }

    public function blockMethod()
    {
        $advantages = Q("SELECT * FROM `#_mdd_advantages` WHERE `visible` = ?i", array(1))->all();
        if (!empty($advantages)){
            $aif = new Files();
            foreach ($advantages as $key => $value) {
                $advantages[$key]['image_file'] = $aif->getFilesByGroup($value['image'], array('original', 'sm'), array('file'), true);
            }
        }
        return array(
            'template' => 'block',
            'advantages' => $advantages
        );
    }
}
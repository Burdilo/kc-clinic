<?php

class directorModule extends Module
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
        if (!$this->mcache_enable || ($this->caching == 1 && !($director = $this->getCache('_module_director'))))
        {
            $director = Q("SELECT * FROM `#_mdd_director` WHERE `visible`=1 ORDER BY STR_TO_DATE(`date`, '%d.%m.%Y') DESC, `ord` DESC")->all();

            if (!empty($director))
            {
                foreach ($director as &$director_item)
                {
                    $director_item['date'] = Dates($director_item['date'], $this->locale);
                }
            }

            $this->setCache('_module_director', $director);
        }

        # Мета теги
        #
        $meta = $this->metaData($director);

        return array(
            'meta'              =>  $meta,
            'pager'             =>  $pager,
            'director'     =>  $director,
            'template'          =>  'list'
        );
    }
    
    public function itemMethod($item = 0)
    {
        if (!$this->mcache_enable || ($this->caching == 1 && !($director = $this->getCache('_module_director_item'))))
        {
            $director = Q("SELECT * FROM `#_mdd_director` WHERE `visible`='1' AND `id`=?i", array( $item ))->row();
            $director['date'] = Dates($director['date'], $this->locale);

            $this->setCache('_module_director_item', $director);
        }

        # Мета теги
        #
        $meta = $this->metaData($director);

        # Хлебные крошки
        # 
        $breadcrumbs = array(
                'id'        => $director['id'],
                'pid'       => '',
                'name'      => stripslashes($director['name']),
                'sys_name'  => $director['system'],
                'link'      => '/' . $this->module_root . '/' . $director['id'] . '-' . $director['system']
        );

        return array(
            'meta'              =>  $meta,
            'page'              =>  array( 'name' => '' ),
            'director'     =>  $director,
            'breadcrumbs'       =>  $breadcrumbs,
            'template'          =>  'item'
        );
    }

    public function blockMethod()
    {
        /*
        $certificate = Q("SELECT * FROM `#_mdd_sertificate` WHERE `visible` = ?i", array(1))->all();
        if (!empty($certificate)){
            $cif = new Files();
            foreach ($certificate as $key => $value) {
                $certificate[$key]['image_file'] = $cif->getFilesByGroup($value['image'], array('original', 'sm'), array('file'), true);
            }
        } */
        return array(
            'template' => 'block'
            
        );
    }
}
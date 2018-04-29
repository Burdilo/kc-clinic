<?php

class docModule extends Module
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
        if (!$this->mcache_enable || ($this->caching == 1 && !($doc = $this->getCache('_module_doc'))))
        {
            $doc = Q("SELECT * FROM `#_mdd_doc` WHERE `visible`=1 ORDER BY STR_TO_DATE(`date`, '%d.%m.%Y') DESC, `ord` DESC")->all();

            if (!empty($doc))
            {
                foreach ($doc as &$doc_item)
                {
                    $doc_item['date'] = Dates($doc_item['date'], $this->locale);
                }
            }

            $this->setCache('_module_doc', $doc);
        }

        # Мета теги
        #
        $meta = $this->metaData($doc);

        return array(
            'meta'              =>  $meta,
            'pager'             =>  $pager,
            'doc'     =>  $doc,
            'template'          =>  'list'
        );
    }
    
    public function itemMethod($item = 0)
    {
        if (!$this->mcache_enable || ($this->caching == 1 && !($doc = $this->getCache('_module_doc_item'))))
        {
            $doc = Q("SELECT * FROM `#_mdd_doc` WHERE `visible`='1' AND `id`=?i", array( $item ))->row();
            $doc['date'] = Dates($doc['date'], $this->locale);

            $this->setCache('_module_doc_item', $doc);
        }

        # Мета теги
        #
        $meta = $this->metaData($doc);

        # Хлебные крошки
        # 
        $breadcrumbs = array(
                'id'        => $doc['id'],
                'pid'       => '',
                'name'      => stripslashes($doc['name']),
                'sys_name'  => $doc['system'],
                'link'      => '/' . $this->module_root . '/' . $doc['id'] . '-' . $doc['system']
        );

        return array(
            'meta'              =>  $meta,
            'page'              =>  array( 'name' => '' ),
            'doc'     =>  $doc,
            'breadcrumbs'       =>  $breadcrumbs,
            'template'          =>  'item'
        );
    }

    public function blockMethod()
    {
        $docs = Q("SELECT * FROM `#_mdd_doc` WHERE `visible` = ?i ORDER BY `ord` DESC", array(1))->all();
        if (!empty($docs)){
            $dif = new Files();
            foreach ($docs as $key => $value) {
                $docs[$key]['image_file'] = $dif->getFilesByGroup($value['image'], array('original', 'sm', 'md'), array('file'), true);
            }
        }
        //exit(__debug($docs));
        return array(
            'template' => 'block',
            'docs' => $docs
        );
    }
}
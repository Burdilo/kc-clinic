<?php

class galleryModule extends Module
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
        if (!$this->mcache_enable || ($this->caching == 1 && !($gallery = $this->getCache('_module_gallery'))))
        {
            $gallery = Q("SELECT * FROM `#_mdd_gallery` WHERE `visible`=1 ORDER BY STR_TO_DATE(`date`, '%d.%m.%Y') DESC, `ord` DESC")->all();

            if (!empty($gallery))
            {
                foreach ($gallery as &$gallery_item)
                {
                    $gallery_item['date'] = Dates($gallery_item['date'], $this->locale);
                }
            }

            $this->setCache('_module_gallery', $gallery);
        }

        # Мета теги
        #
        $meta = $this->metaData($gallery);

        return array(
            'meta'              =>  $meta,
            'pager'             =>  $pager,
            'gallery'     =>  $gallery,
            'template'          =>  'list'
        );
    }
    
    public function itemMethod($item = 0)
    {
        if (!$this->mcache_enable || ($this->caching == 1 && !($gallery = $this->getCache('_module_gallery_item'))))
        {
            $gallery = Q("SELECT * FROM `#_mdd_gallery` WHERE `visible`='1' AND `id`=?i", array( $item ))->row();
            $gallery['date'] = Dates($gallery['date'], $this->locale);

            $this->setCache('_module_gallery_item', $gallery);
        }

        # Мета теги
        #
        $meta = $this->metaData($gallery);

        # Хлебные крошки
        # 
        $breadcrumbs = array(
                'id'        => $gallery['id'],
                'pid'       => '',
                'name'      => stripslashes($gallery['name']),
                'sys_name'  => $gallery['system'],
                'link'      => '/' . $this->module_root . '/' . $gallery['id'] . '-' . $gallery['system']
        );

        return array(
            'meta'              =>  $meta,
            'page'              =>  array( 'name' => '' ),
            'gallery'     =>  $gallery,
            'breadcrumbs'       =>  $breadcrumbs,
            'template'          =>  'item'
        );
    }

    public function blockMethod()
    {
        $gallery = Q("SELECT * FROM `#_mdd_gallery` WHERE `visible` = ?i ORDER BY `ord` ASC", array(1))->all();
        if (!empty($gallery)){
            $gif = new Files();
            foreach ($gallery as $key => $value) {
                $gallery[$key]['images_file'] = $gif->getFilesByGroup($value['images'], array('original', 'sm', 'md'), array('file'), true);
            }
        }

        //exit(__debug($gallery));
        return array(
            'template' => 'block',
            'gallery' => $gallery
        );
    }
}
<?php

class newsModule extends Module
{
    public function index()
    {
        if (isset($this->arguments[1]))
        {
            return $this->errorPage;
        }

        if (isset($this->arguments[0]))
        {
            return $this->itemMethod($this->arguments[0]);
        }

        return $this->listMethod();
    }

    public function listMethod()
    {
        # Пагинация
        #
        $pager = $this->pager($this->countItem(), $this->limit);

        # Получение списка
        #
        if (!$this->mcache_enable || ($this->caching == 1 && !($news = $this->getCache('_module_news'))))
        {
            $news = Q("SELECT * FROM `#_mdd_news` WHERE `visible`=1 ORDER BY STR_TO_DATE(`date`, '%d/%m/%Y') DESC, `ord` DESC")->all();

            if (!empty($news))
            {
                foreach ($news as &$news_item)
                {
                    //$news_item['date'] = Dates($news_item['date'], $this->locale);
                }

                $nif = new Files();
                foreach ($news as $key => $value) {
                    $news[$key]['cover_file'] = $nif->getFilesByGroup($value['cover'], array('sm', 'original'), array('file'), true);
                }
            }

            //exit(__debug($news));

            $this->setCache('_module_news', $news);
        }

        # Мета теги
        #
        $meta = $this->metaData($news);

        return array(
            'meta'              =>  $meta,
            'pager'             =>  $pager,
            'news'     =>  $news,
            'template'          =>  'list'
        );
    }
    
    public function itemMethod($item = 0)
    {
        if (!$this->mcache_enable || ($this->caching == 1 && !($news = $this->getCache('_module_news_item'))))
        {
            $news = Q("SELECT * FROM `#_mdd_news` WHERE `visible`='1' AND `system`=?s", array( $item ))->row();
            //$news['date'] = Dates($news['date'], $this->locale);
            $nif = new Files();
            $news['cover_file'] = $nif->getFilesByGroup($news['cover'], array('sm', 'original'), array('file'), true);

            $this->setCache('_module_news_item', $news);


        }

        //exit(__debug($news));
        # Мета теги
        #
        $meta = $this->metaData($news);

        # Хлебные крошки
        # 
        $breadcrumbs = array(
                'id'        => $news['id'],
                'pid'       => '',
                'name'      => stripslashes($news['title']),
                'sys_name'  => $news['system'],
                'link'      => '/' . $this->module_root . '/' . $news['id'] . '-' . $news['system']
        );

        return array(
            'meta'              =>  $meta,
            'page'              =>  array( 'name' => '' ),
            'news'     =>  $news,
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
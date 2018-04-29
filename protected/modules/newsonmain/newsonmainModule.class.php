<?php

class newsonmainModule extends Module
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

    public function blockMethod()
    {
        $news = Q("SELECT * FROM `#_mdd_news` WHERE `visible`=1 ORDER BY STR_TO_DATE(`date`, '%d/%m/%Y') DESC, `ord` DESC LIMIT 2")->all();

            if (!empty($news))
            {
                
                $nif = new Files();
                foreach ($news as $key => $value) {
                    $news[$key]['cover_file'] = $nif->getFilesByGroup($value['cover'], array('sm', 'original'), array('file'), true);
                }
            }
        //exit(__debug($news));

        return array(
            'template' => 'block',
            'news' => $news
        );
    }
}
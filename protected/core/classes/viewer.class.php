<?php

class Viewer extends Data
{
    protected $template = null;

    public function __construct($driver = 'smarty', $dir = '', $caching = null)
    {
        if (is_null($caching))
        {
            $caching = $this->enabled_caching;
        }
        
        if (file_exists(PATH_EXTENSIONS . DIRECTORY_SEPARATOR . $driver . 'ViewRenderer.php'))
        {
            if (!class_exists('templateRender'))
            {
                include PATH_EXTENSIONS . DIRECTORY_SEPARATOR . $driver . 'ViewRenderer.php';

                $this->template = new templateRender($dir, $caching);
            }
        }
    }

    protected function assign($key = '', $value = '', $caching = false)
    {
        $this->template->assign($key, $value, $caching);
    }

    protected function fetch($template = '', $cache_id = '', $compile_id = '')
    {
        return $this->template->fetch($template);
    }

    protected function display($pattern = '')
    {
        if (DEV_MODE)
        {
            $cache = new Cache;
            $cache->clearMemory();
        }

        $this->template->display($pattern);
    }
}
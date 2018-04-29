<?php

class Initialize extends Viewer
{
    use Tools, Singleton;

    protected $request  = null;
    protected $url      = null;
    protected $locale   = null;
    
    protected $viewer = null;
    protected $template_dir = null;
    protected $template_driver = null;

    protected $enabled_caching = true;
    protected $csrf_token = null;
    protected $csrf_param = 'authenticity_token';

    protected $mcache = null;
    protected $mcache_enable = false;
    protected $mcache_driver = null;
    protected $mcache_compress = MEMCACHE_COMPRESSED;
    protected $mcache_expire = 3600;
    protected $mcache_path = '';

    public $query   = null;
    public $path    = array();
    public $mpath   = array();
    public $domain  = null;
    public $server  = 'localhost';
    public $page    = array('id' => 0);
    public $canonical    = array('id' => 0);
    
    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->domain   =   $_SERVER['HTTP_HOST'];
        $this->request  =   urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
        $this->query    =   $_SERVER['QUERY_STRING'];
        $this->url      =   current(explode('?', $this->request));
        $this->locale   =   $this->getLocale($this->request);
        $this->path     =   preg_split('/\/+/', $this->url, -1, PREG_SPLIT_NO_EMPTY);
        $this->mcache_path = md5(implode(':', $this->path) . 'q:' . $this->query);
        $this->mpath    = $this->path;

        if (isset($this->path[0]) && $this->path[0] == $this->locale)
        {
            array_shift($this->path);
        }

        if ($this->locale == DEFAULT_LANGUAGE && isset($this->mpath[0]) && $this->mpath[0] == DEFAULT_LANGUAGE)
        {
            $mpath = $this->mpath;
            array_shift($mpath);
            redirect('/' . implode('/', $mpath), 301);
        }

        $this->memory();

        $this->template_driver = strtolower($this->template_driver);

        if (strstr($this->template_dir, '#'))
        {
            $this->template_dir = str_replace('#', $this->template_driver, $this->template_dir);
        }

        # CSRF
        #
        if (defined('CSRF_PROTECTION') && CSRF_PROTECTION)
        {
            unset($_SESSION[$this->csrf_param]);
            
            if (empty($_SESSION[$this->csrf_param]))
            {
                if (function_exists('mcrypt_create_iv'))
                {
                    $token = bin2hex(mcrypt_create_iv(32, MCRYPT_DEV_URANDOM));
                }
                else
                {
                    $token = bin2hex(openssl_random_pseudo_bytes(32));
                }

                $_SESSION[$this->csrf_param] = base64_encode($token);
            }

            $this->csrf_token = $_SESSION[$this->csrf_param];
        }

        $this->viewer = new Viewer($this->template_driver, $this->template_dir, 0);
    }

    protected function memory()
    {
        if ($this->enabled_caching === true)
        {
            if (!empty($_REQUEST['server']))
            {
                $this->server = $_REQUEST['server'];
            }

            if (class_exists('Memcached'))
            {
                $this->mcache = new Memcached;
                $this->mcache_driver = 'memcached';

                if ($this->mcache->addServer($this->server, 11211))
                {
                    $this->mcache_enable = true;
                }
            }
        }
    }

    protected function getCache($key = '', $global = false)
    {
        // return isset($_SESSION[$key]) ? $_SESSION[$key] : false;

        if (!$this->mcache_enable) return false;
        
        if (!$global)
        {
            $key .= $this->mcache_path;
        }

        if (!($this->mcache->get($this->domain . $key) === false))
        {
            return $this->mcache->get($this->domain . $key);
        }

        return false;
    }

    protected function setCache($key = '', $value = '', $global = false)
    {
        // $_SESSION[$key] = $value;

        if ($this->mcache_enable)
        {
            if (!$global)
            {
                $key .= $this->mcache_path;
            }

            if ($this->mcache_driver == 'memcached')
            {
                $this->mcache->set($this->domain . $key, $value, time() + $this->mcache_expire);
            }
            else
            {
                $this->mcache->set($this->domain . $key, $value, $this->mcache_compress, time() + $this->mcache_expire);
            }
        }
    }

    public function rememberMe($userid = null)
    {
        /*
        XSRF Secure
        $this->secureXSRF(12);
        $this->autoLogin();
        */

        $token = $this->generateToken(24);
        
        do {
            $selector = $this->generateToken(9);
        }
        while(Q("SELECT count(id) as `count` FROM `#__auth_tokens` WHERE `selector`=?s", array( $selector ))->row('count') > 0);
        
        $expires = new \DateTime('now');
        $expires->add(new \DateInterval('P14D'));
        
        Q("INSERT INTO `#__auth_tokens` SET `expires` = ?s, `selector` = ?s, `userid` = ?i, `token` = ?s", array(
            $expires->format('Y-m-d H:i:s'),
            $selector,
            $userid,
            hash('sha256', $token)
        ));
        
        setcookie(
            'auth',
            base64_encode($selector).':'.base64_encode($token),
            time() + 1209600,
            '/',
            '.' . $this->domain,
            false,
            true
        );
    }

    public function autoLogin()
    {
        if (!empty($_COOKIE['auth']))
        {
            $split = explode(':', $_COOKIE['auth']);
            
            if (count($split) !== 2)
            {
                $this->logger->warn("Badly formed auth cookie!");
                return false;
            }

            list($selector, $token) = $split;
            
            $dbresult = Q("
                    SELECT
                        `id`, `token`, `userid` 
                    FROM `#__auth_tokens`
                    WHERE 
                        `selector` = ?s AND `expires` <= CURDATE()
                ", array(
                    $selector
                )
            )->row();
            
            if ($dbresult)
            {
                if (hash_equals(
                    $dbresult['token'],
                    hash('sha256', base64_decode($token))
                )) {
                    // Privilege escalation - get a new random session ID
                    session_regenerate_id(true);
                    
                    // Let's remove our old token.
                    Q("DELETE FROM `#__auth_tokens` WHERE `id`=?i LIMIT 1", array(
                        $dbresult['id']
                    ));
                    
                    // Let's set the session variable appropriately...
                    $_SESSION['auth_user'] = $dbresult['userid'];
                    
                    // Generate a new token for future convenience...
                    $this->rememberMe($dbresult['userid']);
                    
                    // We return true here.
                    return true;
                }
            }
        }
        
        return false;
    }

    public static function generateToken($length = 20)
    {
        $buf = '';
        for ($i = 0; $i < $length; ++$i)
        {
            $buf .= chr(mt_rand(0, 255));
        }

        return bin2hex($buf);
    }

    public function log($t1 = 0, $save = true)
    {
        // Проверит на размер лог файла
        $t2 = microtime(true);
        
        if (defined('SYSTEM_DEBUG') && SYSTEM_DEBUG == 1)
        {
            echo  '<style>.cmsDebug-wrap{ position: fixed; left: 10px; bottom: 10px; z-index: 1000000; display: block; font-size: 0; } .cmsDebug { float: left; height: 18px; margin-right: 2px; font-size: 11px; line-height: 18px; font-style: normal; padding: 0 7px; color: #fff; } .cmsDebug span { padding: 0 5px; color: #ffffff; display: inline-block; } </style>'
                , '<span class="cmsDebug-wrap">'
                , '<span class="cmsDebug" style="background: #d666af;">' . $_SESSION['sql'] . ' sql.</span>'
                , '<span class="cmsDebug" style="background: #cbc457;">' . count(get_included_files()) . ' Inc. files</span>'
                , '<span class="cmsDebug" style="background: #6379b7;">' . number_format(memory_get_peak_usage()/1048576, 3) . ' Mb.</span>'
                , '<span class="cmsDebug" style="background: #e5752b;">' . number_format(memory_get_usage()/1048576, 3) . ' Mb' . PHP_EOL . '</span>'
                , '<span class="cmsDebug" style="background: #6ab755;">' . number_format($t2-$t1, 3) . ' S.</span>'
                , '</span>';
        }

        if ($save)
        {
            $json = json_encode(
                        array(
                            'url'       =>  $_SERVER['REQUEST_URI'],
                            'files'     =>  count(get_included_files()),
                            'time'      =>  number_format($t2-$t1, 3),
                            'memory'    =>  number_format(memory_get_usage()/1048576, 3),
                            'memory_peak'   =>  number_format(memory_get_peak_usage()/1048576, 3)
                        )
                    );

            $log_file = PATH_ROOT . '/log-time.txt';

            if (file_exists($log_file))
            {
                clearstatcache(true, $log_file);

                if (filesize($log_file) > 1024 * 3)
                {
                    unlink($log_file);
                }
            }

            file_put_contents($log_file, $json . "\n", FILE_APPEND);

            /*
            $included_files = get_included_files();
            
            if (count($included_files))
            {
                echo '<style>';
                echo '.debugger { position: fixed;z-index: 9999;height: 250px;width: 100%;bottom: 35px;background-color: #2f27c1; color: #fff; border: 1px solid #443f9b; padding: 10px 30px;overflow: auto; }';
                echo '.debugger ul { list-style-type: none; }';
                echo '.debugger li { margin-bottom: 5px; font-size: 15px; }';
                echo '</style>';

                echo '<div class="debugger"><ul>';
                foreach ($included_files as $key => $value) {
                    echo '<li>', $key, ': ', str_replace(str_replace('/public_html', '', PATH_ROOT), '', $value), '</li>';
                }
                echo '</ul></div>'; 
            }
            */
        }
    }

    public static function headers($cache = false)
    {
        header("Last-Modified: " . gmdate('D, d M Y H:i:s', (time() - 3600)) . " GMT");
        header("Cache-control: public");
        
        if ($cache)
        {
            header("Cache-control: max-age=31536000");
        }
        else
        {
            header("Strict-Transport-Security: max-age=31536000");
            header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0');
            header("Pragma: no-cache");
        }

        header("Expires: " . date("r", time() + 2592000));

        if (extension_loaded('zlib') && (!defined('GZIP_COMPRESS') || defined('GZIP_COMPRESS') && GZIP_COMPRESS))
        {
            ini_set("zlib.output_compression", "On");
            ini_set('zlib.output_compression_level', 7);
        }
    }

    protected function arguments()
    {
        $args = array();
        
        if (strstr($this->router, ':'))
        {
            $last = preg_split('/\/+/', $this->router, -1, PREG_SPLIT_NO_EMPTY);
            
            if (!empty($last))
            {
                foreach($this->path as $key => $value)
                {
                    if (!isset($last[ $key ]) || strstr($last[ $key ], ':'))
                    {
                        $args[] = $value;
                    }
                }
            }
        }
        
        return $args;
    }

    protected function declaration()
    {
        if (!$this->mcache_enable || ($this->mcache_enable && !$constants = $this->getCache('constants')))
        {
            $constants = Q("SELECT `var`, `value` FROM `#__sys_settings`")->all();
        
            if ($this->mcache_enable)
            {
                $this->setCache('constants', $constants, $this->mcache_compress, time() + $this->mcache_expire); 
            }
        }

        if (!empty($constants))
        {
            foreach($constants as $arr)
            {
                if (!defined($arr['var']))
                {
                    define($arr['var'], $arr['value']);
                }
            }
        }

        $this->enabled_caching = defined('ENABLECACHE') ? ENABLECACHE : false;
    }
}

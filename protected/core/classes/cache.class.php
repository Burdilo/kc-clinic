<?php

class Cache extends Initialize
{
	protected $ignoreArray = array('.', '..', '.gitkeep', '.gitignore');

	public function __construct()
	{
		parent::__construct();
		
		array_unshift($this->path, 'main');
	}

	public function initCache()
	{
		// create Scrapbook cache object
		$cache = new \MatthiasMullie\Scrapbook\Adapters\MemoryStore();


		// create \Memcached object pointing to your Memcached server
		$client = new \Memcached();
		$client->addServer('localhost', 11211);
		// create Scrapbook cache object
		$cache = new \MatthiasMullie\Scrapbook\Adapters\Memcached($client);


		// create \Redis object pointing to your Redis server
		$client = new \Redis();
		$client->connect('127.0.0.1');
		// create Scrapbook cache object
		$cache = new \MatthiasMullie\Scrapbook\Adapters\Redis($client);


		// create \CouchbaseBucket object pointing to your Couchbase server
		$cluster = new \CouchbaseCluster('couchbase://localhost');
		$bucket = $cluster->openBucket('default');
		// create Scrapbook cache object
		$cache = new \MatthiasMullie\Scrapbook\Adapters\Couchbase($bucket);


		// create Scrapbook cache object
		$cache = new \MatthiasMullie\Scrapbook\Adapters\Apc();



		// create \PDO object pointing to your MySQL server
		$client = new \PDO('mysql:dbname=cache;host=127.0.0.1', 'root', '');
		// create Scrapbook cache object
		$cache = new \MatthiasMullie\Scrapbook\Adapters\MySQL($client);


		// create Flysystem object
		$adapter = new \League\Flysystem\Adapter\Local('/path/to/cache', LOCK_EX);
		$filesystem = new \League\Flysystem\Filesystem($adapter);
		// create Scrapbook cache object
		$cache = new \MatthiasMullie\Scrapbook\Adapters\Flysystem($filesystem);


		// create Scrapbook cache object
		$cache = new \MatthiasMullie\Scrapbook\Adapters\MemoryStore();
		//____________________________________

		// set a value
		$cache->set('key', 'value'); // returns true

		// get a value
		$cache->get('key'); // returns 'value'
	}

	public function clearFiles($formats = array())
	{
		if (!empty($formats))
		{
			$cache_dir = PATH_RUNTIME . '/cache/';
			
		    $cache = array();

		    foreach ($formats as $ext)
		    {
		    	$cache = array_merge($cache, glob($cache_dir . '*.' . $ext));
		    }

			if (!empty($cache))
		    {
		        foreach($cache as $file)
		        {
		            if (file_exists($file) && !in_array($file, $this->ignoreArray))
		            {
		                unlink($file);
		            }
		        }
		    }

		    $dirs = array_diff(scandir($cache_dir), $this->ignoreArray);

		    if (!empty($dirs))
		    {
		    	foreach ($dirs as $dir)
		    	{
		    		if (is_dir($cache_dir . $dir))
		    		{
		    			rrmdir($cache_dir . $dir);
		    		}
		    	}
		    }
	   }
	}

	public function clearStyles()
	{
		$this->clearFiles(array('css'));
	}

	public function clearScripts()
	{
		$this->clearFiles(array('js'));
	}

	public function clearSmarty()
	{
		$this->clearFiles(array('php'));
	}
	
	public function clearMemory()
	{
		if ($this->mcache_enable)
		{
			//$this->mcache->flush();
			
			$keys = $this->getKeys();
			
			if (count($keys))
			{
				foreach ($keys as $key)
				{
					$this->mcache->delete($key);
				}
			}
			
			//exit(__Debug($keys));
		}
	}

	public function clearSession($keys = array())
	{
		if (!empty($keys))
		{
			foreach ($keys as $key)
			{
				if (!empty($_SESSION[$key]))
					unset($_SESSION[$key]);
			}
		}
	}

	protected function getKeys()
	{
	    $s = @fsockopen('127.0.0.1',11211);

	    fwrite($s, 'stats slabs'."\r\n");
	         
	    $slabs = array();
	    
	    while(!feof($s))
	    {
	        $temp = fgets($s, 256);
	        
	        preg_match('/^STAT\s([0-9]*)(.*)/', $temp, $slab_temp);
	        
	        if (isset($slab_temp['1']) && strlen($slab_temp['1'])>0)
	        {
	            $slabs[] = $slab_temp['1'];
	        }
	        
	        unset($slab_temp);
	 
	        if (trim($temp)=='END')
	        {
	            break;
	        }
	    }
	 
	    unset($temp);
	 
	    // ITEMS //////////////////////////////////////////////////////////////
	    
	    fwrite($s, 'stats items'."\r\n");
	         
	    $items = array();
	    
	    while(!feof($s))
	    {
	        $temp = fgets($s, 256);
	        
	        preg_match('/^STAT\sitems\:([0-9]*)(.*)/', $temp, $item_temp);
	        
	        if (isset($item_temp['1']) && strlen($item_temp['1'])>0)
	        {
	            $items[] = $item_temp['1'];
	        }
	        
	        unset($item_temp);
	 
	        if (trim($temp)=='END')
	        {
	            break;
	        }
	    }
	 
	    unset($temp);
	    
	    $slabs = array_unique($slabs);
	    $items = array_unique($items);
	 
	    // CACHEDUMP //////////////////////////////////////////////////////////
	 
	    $keys = array();
	        
	    foreach($slabs as &$slab)
	    {
	        foreach($items as &$item)
	        {
	            fwrite($s, 'stats cachedump '.$slab.' '.$item."\r\n"); 
	            
	            while(!feof($s))
	            {
	                $temp = fgets($s, 256);
	 
	                // ITEM cd3aec8b1dd7ef828267408e68b6d961:user_1_status [1 b; 1247043297 s]
	                // or
	                // ITEM sql_custom_photos_showphoto_11 [1379 b; 1247064083 s]
	 
	                preg_match('/^ITEM\s([a-f0-9]{32}\:)?([A-Za-z0-9\_\-\.]*)\s\[[0-9]*\sb\;\s([0-9]*)\s.*/', $temp, $key_temp);
	 
	                if (isset($key_temp['2']) && strlen($key_temp['2'])>0)
	                {         
	                  $keys[] = $key_temp['2'];
	                }
	                
	                unset($key_temp);
	            
	                if (trim($temp)=='END')
	                {
	                    break;
	                }
	            }
	        }
	    }
	    
	    unset($temp,$slabs,$items);
	    
	    fclose($s);
	    
	    ///////////////////////////////////////////////////////////////////////        

	    $keys_temp = array_unique($keys);
	    unset($keys);        
	    asort($keys_temp);
	    
	    $keys = array();
	    foreach($keys_temp as &$k)
	    {
	        $keys[] = $k;
	    }
	    
	    return $keys;
	}
}
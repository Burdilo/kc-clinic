<?php

class Shopping
{
	use Tools;
	
	private $user = array();

	private $db = array(
				'users'		=> '#__shop_buyers',
				'orders'	=> '#__shop_orders',
				'storage'	=> '#__shop_storage',
				'address'	=> '#__shop_address',
				'catalog'	=> '#__shop_catalog',
				'category'	=> '#__shop_category',
				'settings'	=> '#__shop_settings'
			);
	
	public function __construct()
	{
		if (!empty($_SESSION['userinf']))
		{
        	$this->user = $_SESSION['userinf'];
        }
	}

	public function getSettings()
	{
		return Q("SELECT * FROM `" . $this->db['settings'] . "` ORDER BY `ord`")->all();
	}

	public function getOrders($page = 0, $limit = 12)
	{
		$orders = Q("SELECT * FROM `" . $this->db['orders'] . "` ORDER BY `date` DESC LIMIT ?i, ?i", array( $page, $limit ))->all();

		if (!empty($orders))
		{
			foreach ($orders as &$order)
			{
				$order['date'] = $this->dateFormat($order['date'], 'd.m.Y H:i');
			}
		}
		
		return $orders;
	}

	public function productList($page = 0, $limit = 12)
	{
		$products = Q("SELECT * FROM `" . $this->db['catalog'] . "` WHERE `mod_pid`=0 ORDER BY `ord`, `id`", array(  ))->all();

		if (!empty($products))
		{
			$file = new Files();

			$category = $this->categoryList(array('id', 'name'));

			foreach ($products as &$product)
			{
				if ($product['category'] && !empty($category[$product['category']]))
				{
					$product['category'] = $category[$product['category']];
				}

				if ($product['photo'])
				{
					$photo = $file->getFilesByGroupCount($product['photo'], array( 'cp' ), 1);
					$product['photo'] = isset($photo[0]) ? $photo[0] : array();
				}

				$product['modification'] = $this->_getModification($product['id']);
			}
		}
		
		// exit(__debug($products));

		return $products;
	}

	public function productItem($id = 0)
	{
		$item = array();

		if ($id !== 0)
		{
			$item = Q("SELECT * FROM `" . $this->db['catalog'] . "` WHERE `id`=?i LIMIT 1", array( $id ))->row();
			$item['meta_robots'] = preg_split('/\,+/', $item['meta_robots'], -1, PREG_SPLIT_NO_EMPTY);

			$item['storage'] = $this->_getStorage($id);
			$item['modification'] = $this->_getModification($id);
		}

		// exit(__Debug($item));
		
		return $item;
	}
	
	public function addProduct($data = array())
	{
		if (!empty($data))
		{
			$sql = "";
			$slice = array();
			
			$properties = $data['properties'];
			$modification = $data['modification'];

			unset($data['properties'], $data['modification']);

			$index = 0;
			$length = count($data);

			foreach ($data as $key => $value)
			{
				$index ++;

				$type = 's';

				if (strstr($key, ':'))
				{
					$_t = explode(':', $key);

					$sql .= "`" . $_t[1] . "`=";

					if ($_t[0] == 's')
					{
						$sql .= "'" . $value . "'";
					}
					elseif ($_t[0] == 'i')
					{
						$sql .= $value;
					}
					elseif (in_array($_t[0], array('ls', 'li')))
					{
						$sql .= "'" . implode(',', $value) . "'";
					}
				}

				if ($length > $index)
				{
					$sql .= ", ";
				}
			}

			$sql .= ", `created`=" . time() . ", `uid`=" . $this->user['id'] . ", `gid`=" . $this->user['gid'];

			$last_id = Q("INSERT INTO `" . $this->db['catalog'] . "` SET " . $sql . " ON DUPLICATE KEY UPDATE `updated`=" . time());
			
			if ($last_id)
			{
				$this->_updateProperties($this->_prepareArray($properties), $last_id);
				$this->_updatModifications($this->_prepareArray($modification), $last_id);
			}

			return $last_id;
		}

		return false;
	}

	public function editProduct($data = array(), $id = 0)
	{
		// exit(__debug($data));

		if (!empty($data) && $id !== 0)
		{
			$sql = "";
			$slice = array();
			
			$this->_updateProperties($this->_prepareArray($data['properties']), $id);
			$this->_updatModifications($this->_prepareArray($data['modification']), $id);

			unset($data['properties'], $data['modification']);

			$index = 0;
			$length = count($data);

			foreach ($data as $key => $value)
			{
				$index ++;

				$type = 's';

				if (strstr($key, ':'))
				{
					$_t = explode(':', $key);

					$sql .= "`" . $_t[1] . "`=";

					if ($_t[0] == 's')
					{
						$sql .= "'" . $value . "'";
					}
					elseif ($_t[0] == 'i')
					{
						$sql .= $value;
					}
					elseif (in_array($_t[0], array('ls', 'li')))
					{
						$sql .= "'" . implode(',', $value) . "'";
					}
				}

				if ($length > $index)
				{
					$sql .= ", ";
				}
			}

			$sql .= ", `updated`=" . time() . ", `uid`=" . $this->user['id'] . ", `gid`=" . $this->user['gid'];

			Q("UPDATE `" . $this->db['catalog'] . "` SET " . $sql . " WHERE `id`=?i LIMIT 1", array( $id ));
		}
	}
	
	public function getProductsOrd()
	{
		return Q("SELECT (MAX(`ord`) + 10) AS `ord` FROM `" . $this->db['catalog'] . "` LIMIT 1")->row('ord');
	}
	
	public function getCategoryOrd()
	{
		return Q("SELECT (MAX(`ord`) + 10) AS `ord` FROM `" . $this->db['category'] . "` LIMIT 1")->row('ord');
	}

	public function structureCategory()
	{
		return Q("SELECT `id`, `name`, `system`, `pid`, `visible` FROM `" . $this->db['category'] . "` ORDER BY `pid`, `ord`, `id`")->all();
	}

	public function catalogFields($id = 0)
	{
		$list 		= array();
		$fields 	= array();
		$settings 	= array();
		$group_id	= '';

		if ($id !== 0)
		{
			$catalog_item = Q("SELECT * FROM `" . $this->db['catalog'] . "` WHERE `id`=?i", array( $id ))->row();

			if (isset($catalog_item['photo']))
			{
				$group_id = $catalog_item['photo'];
				
				$file = new Files();
				$list = $file->getFilesByGroup($group_id, array( 'cp' ));
			}
		}

		if ($id == 0 || $group_id == '')
		{
			$group_id = 'file_' . substr(str_replace('.', '_', uniqid()), 0, 5) . '_' . str_replace('.', '_', uniqid());
		}

		$fields['name'] = 'photo';
		$fields['value'] = $group_id;
		$fields['action'] = 'shopping/fileUpload';
		$fields['list']  = $list;

		$settings = array(
			'f_file_count' => 1,
			'f_image_prefix' =>	array(
				'cp'		=>	'cp',
				'market'	=>	'market',
				'preview'	=> 	'preview'
			),
			'f_image_width' => array(
				'cp' 		=>	56,
				'market' 	=>	100,
				'preview' 	=> 	280
			),
			'f_image_height' => array(
				'cp' 		=>	56,
				'market' 	=>	100,
				'preview' 	=> 	280
			),
			'f_image_photo_method' => array(
				'cp'		=>	'resize',
				'market'	=>	'resize',
				'preview'	=> 	'resize'
			)
		);

		$json = array();

		foreach ($settings['f_image_prefix'] as $prefix => $arr)
		{
			$json[$prefix] = array(
				'prefix' => $settings['f_image_prefix'][$prefix],
				'width'  => $settings['f_image_width'][$prefix],
				'height' => $settings['f_image_height'][$prefix],
				'method' => $settings['f_image_photo_method'][$prefix],
			);
		}

		$settings['json'] = json_encode($json);
		
		$fields['settings'] = $settings;
		
		return $fields;
	}

	public function categoryItem($id = 0)
	{
		$item = array();

		if ($id !== 0)
		{
			$item = Q("SELECT * FROM `" . $this->db['category'] . "` WHERE `id`=?i LIMIT 1", array( $id ))->row();

			$item['meta_robots'] = preg_split('/\,+/', $item['meta_robots'], -1, PREG_SPLIT_NO_EMPTY);
		}

		return $item;
	}

	public function categoryTree($pid = 0)
	{
		$tree = Q("SELECT `id`, `name`, `system`, `pid`, `visible` FROM `" . $this->db['category'] . "` ORDER BY `pid`, `ord`, `id`", array( $pid ))->all();

		return $this->makeTree($tree, $pid);
	}
	
	public function categoryList($list = array('id', 'pid', 'name', 'system'), $pid = null)
	{
		$where = "";

		if (!is_null($pid))
		{
			$where = " WHERE `pid`=?i ";
		}

		return Q("SELECT `" . implode("`, `", $list) . "` FROM `" . $this->db['category'] . "` " . $where . " ORDER BY `ord` DESC, `name`", array( $pid ))->all('id');
	}

	public function deleteUser($id = 0)
	{
		if ($id)
		{
			Q("DELETE FROM `" . $this->db['users'] . "` WHERE `id`=?i LIMIT 1", array( $id ))->row();
		}
	}

	public function getUser($id = 0, $format = false)
	{
	 	$user = array();

		if ($id)
		{
			$user = Q("SELECT * FROM `" . $this->db['users'] . "` WHERE `id`=?i LIMIT 1", array( $id ))->row();

			if ($format)
			{
				$user['birthday'] = date('d.m.Y', $user['birthday']);
			}

			$user['address'] = $this->getAddress($id);
		}

		return $user;
	}

	public function getUsers($page = 0, $limit = 10)
	{
		$start = $page * $limit;

		$users = Q("SELECT * FROM `" . $this->db['users'] . "` LIMIT ?i, ?i", array( $start, $limit ))->all();

		foreach ($users as &$user)
		{
			if ($user['phone'])
			{
				$user['phone'] = $this->formatPhone($user['phone']);
			}

			if ($user['birthday'])
			{
				$user['birthday'] = $this->dateFormat($user['birthday']);
			}
		}

		return $users;
	}

	public function getAddress($id = 0)
	{
		$address = array();

		if ($id)
		{
			$address = Q("SELECT * FROM `" . $this->db['address'] . "` WHERE `uid`=?i", array( $id ))->all('id');
		}

		return $address;
	}

	public function addBuyers($data = array())
	{
		if (!empty($data))
		{
			$sql = "";
			$slice = array();
			
			$index = 0;
			$address = $data['address'];
			unset($data['address']);
		
			$length = count($data);

			foreach ($data as $key => $value)
			{
				$index ++;

				$type = 's';

				if (strstr($key, ':'))
				{
					$_t = explode(':', $key);

					$sql .= "`" . $_t[1] . "`=";

					if ($_t[0] == 's')
					{
						if (!$value) $value = '';

						$sql .= "'" . $value . "'";
					}
					elseif ($_t[0] == 'i')
					{
						if (!$value) $value = 0;

						$sql .= $value;
					}
					elseif (in_array($_t[0], array('ls', 'li')))
					{
						$sql .= "'" . implode(',', $value) . "'";
					}
				}

				if ($length > $index)
				{
					$sql .= ", ";
				}
			}
			
			$sql .= ", `created`=" . time();

			$id = Q("INSERT INTO `" . $this->db['users'] . "` SET " . $sql);

			$this->updateAddress($address, $id);

			return $id;
		}
	}

	public function editBuyers($data = array(), $id = 0)
	{
		if (!empty($data) && $id !== 0)
		{
			$sql = "";
			$slice = array();
			
			$index = 0;
			$address = $data['address'];
			unset($data['address']);
			
			$length = count($data);

			foreach ($data as $key => $value)
			{
				$index ++;
				$type = 's';

				if (strstr($key, ':'))
				{
					$_t = explode(':', $key);

					$sql .= "`" . $_t[1] . "`=";

					if ($_t[0] == 's')
					{
						$sql .= "'" . $value . "'";
					}
					elseif ($_t[0] == 'i')
					{
						$sql .= $value;
					}
					elseif (in_array($_t[0], array('ls', 'li')))
					{
						$sql .= "'" . implode(',', $value) . "'";
					}
				}

				if ($length > $index)
				{
					$sql .= ", ";
				}
			}

			$sql .= ", `updated`=" . time();

			Q("UPDATE `" . $this->db['users'] . "` SET " . $sql . " WHERE `id`=?i LIMIT 1", array( $id ));

			$this->updateAddress($address, $id);
		}
	}

	public function updateAddress($address = array(), $id = 0)
	{
		if (!empty($address))
		{
			$address = $this->_prepareArray($address);
			
			if ($id !== 0)
			{
				$keys = array_keys($address);
				$keys = array_filter($keys, function($k) use ($keys) { return $keys[$k] > 0; }, ARRAY_FILTER_USE_KEY);

				$inner = Q("SELECT `id` FROM `" . $this->db['address'] . "` WHERE `uid`=?i", array( $id ))->all('id');

				if (!empty($inner))
				{
					$remove = array_diff(array_keys($inner), $keys);

					if (!empty($remove))
					{
						Q("DELETE FROM `" . $this->db['address'] . "` WHERE `id` IN (?li)", array( $remove ));
					}
				}
			}

			foreach ($address as $key => $addr)
			{
				if ($this->validate($addr, 'address'))
				{
					$addr['uid'] = $id;

					ksort($addr);

					if ($key > 0)
					{
						$addr['id'] = $key;

						Q("UPDATE `" . $this->db['address'] . "` SET " .
							"`area`=?s, " .
							"`city`=?s, " .
							"`country`=?s, " .
							"`flat`=?s, " .
							"`house`=?s, " .
							"`postal_code`=?i, " .
							"`region`=?s, " .
							"`settlement`=?s, " .
							"`street`=?s, `uid`=?i WHERE `id`=?i LIMIT 1", $addr
						);
					}
					else {
						Q("INSERT INTO `" . $this->db['address'] . "` SET " .
							"`area`=?s, " .
							"`city`=?s, " .
							"`country`=?s, " .
							"`flat`=?s, " .
							"`house`=?s, " .
							"`postal_code`=?i, " .
							"`region`=?s, " .
							"`settlement`=?s, " .
							"`street`=?s, `uid`=?i", $addr
						);
					}
				}
			}
		}
	}

	public function addCategory($data = array())
	{
		if (!empty($data))
		{
			$sql = "";
			$slice = array();
			
			$index = 0;
			$length = count($data);

			foreach ($data as $key => $value)
			{
				$index ++;

				$type = 's';

				if (strstr($key, ':'))
				{
					$_t = explode(':', $key);

					$sql .= "`" . $_t[1] . "`=";

					if ($_t[0] == 's')
					{
						if (!$value) $value = '';

						$sql .= "'" . $value . "'";
					}
					elseif ($_t[0] == 'i')
					{
						if (!$value) $value = 0;

						$sql .= $value;
					}
					elseif (in_array($_t[0], array('ls', 'li')))
					{
						$sql .= "'" . implode(',', $value) . "'";
					}
				}

				if ($length > $index)
				{
					$sql .= ", ";
				}
			}

			$sql .= ", `created`=" . time() . ", `uid`=" . $this->user['id'] . ", `gid`=" . $this->user['gid'];
			
			return Q("INSERT INTO `" . $this->db['category'] . "` SET " . $sql);
		}
	}
	
	public function editCategory($data = array(), $id = 0)
	{
		if (!empty($data) && $id !== 0)
		{
			$sql = "";
			$slice = array();
			
			$index = 0;
			$length = count($data);

			foreach ($data as $key => $value)
			{
				$index ++;

				$type = 's';

				if (strstr($key, ':'))
				{
					$_t = explode(':', $key);

					$sql .= "`" . $_t[1] . "`=";

					if ($_t[0] == 's')
					{
						$sql .= "'" . $value . "'";
					}
					elseif ($_t[0] == 'i')
					{
						$sql .= $value;
					}
					elseif (in_array($_t[0], array('ls', 'li')))
					{
						$sql .= "'" . implode(',', $value) . "'";
					}
				}

				if ($length > $index)
				{
					$sql .= ", ";
				}
			}

			$sql .= ", `updated`=" . time() . ", `uid`=" . $this->user['id'] . ", `gid`=" . $this->user['gid'];

			Q("UPDATE `" . $this->db['category'] . "` SET " . $sql . " WHERE `id`=?i LIMIT 1", array( $id ));
		}
	}

	public function deleteProduct($id = 0, $recursive = false)
	{
		if ($id !== 0)
		{
			if ($recursive)
			{
				$mod = Q("SELECT `id` FROM `" . $this->db['catalog'] . "` WHERE `mod_pid`=?i", array( $id ))->all();

				if (!empty($mod))
				{
					Q("DELETE FROM `" . $this->db['catalog'] . "` WHERE `mod_pid`=?i", array( $id ));
				}
			}

			Q("DELETE FROM `" . $this->db['storage'] . "` WHERE `pid`=?i AND `list`=?s", array( $id, 'properties' ));
			Q("DELETE FROM `" . $this->db['catalog'] . "` WHERE `id`=?i LIMIT 1", array( $id ));
		}
	}

	public function deleteCategory($id = 0, $recursive = false)
	{
		if ($id !== 0)
		{
			if ($recursive)
			{
				$this->_removeTree($id);
			}
			else
			{
				Q("DELETE FROM `" . $this->db['category'] . "` WHERE `id`=?i LIMIT 1", array( $id ));
			}
		}
	}

	protected function _prepareArray($array = array())
	{
		$result = array();

		if (is_array($array))
		{
			foreach ($array as $key => $arr)
			{
				if (is_array($arr))
				{ 
					foreach ($arr as $k => $v)
					{
						$result[$k][$key] = $v;
					}
				}
			}
  		}

	    return $result;
	}

	protected function _updateProperties($data = array(), $id = 0)
	{
		if (!empty($data) && $id !== 0)
		{
			Q("DELETE FROM `" . $this->db['storage'] . "` WHERE `list`=?s AND `pid`=?i", array( 'properties', $id ));

			if (!empty($data))
			{
				$ord = 0;

				foreach ($data as $key => $arr)
				{
					$ord += 10;
					Q("INSERT INTO `" . $this->db['storage'] . "` SET `pid`=?i, `list`=?s, `name`=?s, `value`=?s, `ord`=?i", array( $id, 'properties', $arr['name'], $arr['value'], $ord ));
				}
			}
		}
	}
	
	protected function _updatModifications($data = array(), $id = 0)
	{
		if (!empty($data) && $id !== 0)
		{
			$product = Q("SELECT `id`, `name`, `system` FROM `" . $this->db['catalog'] . "` WHERE `id`=?i LIMIT 1", array( $id ))->row();
			
			$modifications = Q("SELECT `id`, `mod_name`, `article`, `price`, `old_price`, `balance`, `infinity`, `visible` FROM `" . $this->db['catalog'] . "` WHERE `mod_pid`=?i", array( $id ))->all('id');

			array_walk($modifications, function(&$item, $key){
				unset($item['id']);
			});

			foreach ($data as $key => $item)
			{
				$system = $product['system'] . '-' . transliterate($item['mod_name']);

				if (isset($modifications[$key]))
				{
					$difference = array_diff_assoc($item, $modifications[$key]);
					
					if (!empty($difference))
					{
						$update = '';
						
						foreach ($difference as $uk => $uv)
						{
							$update .= "`". $uk . "`='" . $uv . "', ";
						}

						$update .= "`system`=?s";

						Q("UPDATE `" . $this->db['catalog'] . "` SET " . $update . " WHERE `id`=?i LIMIT 1", array( $system, $key ));
					}
				}
				else
				{
					$insert = '';
					
					foreach ($item as $ik => $iv)
					{
						$insert .= "`". $ik . "`='" . $iv . "', ";
					}

					$insert .= "`system`=?s, `mod_pid`=?i";

					Q("INSERT INTO `" . $this->db['catalog'] . "` SET " . $insert . "", array( $system, $id ));
				}
			}
		}
	}

	protected function _getModification($pid = 0)
	{
		$result = array();

		if ($pid !== 0)
		{
			$result = Q("SELECT `id`, `name`, `mod_name`, `system`, `article`, `balance`, `price`, `old_price`, `photo`, `visible`, `infinity`, `ord` FROM `" . $this->db['catalog'] . "` WHERE `mod_pid`=?i ORDER BY `ord`", array( $pid ))->all();
		}

		return $result;
	}

	protected function _getStorage($pid = 0)
	{
		$result = array();

		if ($pid !== 0)
		{
			$list = Q("SELECT `id`, `list`, `name`, `value`, `ord` FROM `" . $this->db['storage'] . "` WHERE `pid`=?i ORDER BY `ord`", array( $pid ))->all();

			if (!empty($list))
			{
				foreach ($list as $_item)
				{
					$result[$_item['list']][$_item['id']] = array(
																'name'	=>	$_item['name'],
																'value'	=>	$_item['value'],
																'ord'	=>	$_item['ord']
															);
				}
			}
		}

		return $result;
	}

	protected function _removeTree($pid = 0)
	{
		$tree = Q("SELECT * FROM `" . $this->db['category'] . "` WHERE `pid`=?i", array( $pid ))->all();

		if (!empty($tree))
		{
			foreach ($tree as $item)
			{
				$this->_removeTree($item['id']);
			}
		}
		
		Q("DELETE FROM `" . $this->db['category'] . "` WHERE `id`=?i LIMIT 1", array( $pid ));
	}

}
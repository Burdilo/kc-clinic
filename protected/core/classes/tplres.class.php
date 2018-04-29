<?php

class TPLres
{
	private $table = "#__sys_templates";
	private $mysql = NULL;

	public function __construct()
	{
		$this->mysql = new Mysql();
	}
	
	public function insertTPL($name, $sys_name, $group, $source, $send_to_group, $send_to_emails){
		if ($send_to_group !== false)
			$send_to_group = implode(",",$send_to_group);
		
		$sql = "INSERT INTO `".$this->table."` SET 
			`group_id`='".to_base($group)."', 
			`name`='".to_base($name)."', 
			`tpl_name`='".to_base($sys_name)."', 
			`tpl_source`='".to_base($source)."', 
			`send_to_group`='".to_base($send_to_group)."', 
			`send_to_emails`='".to_base($send_to_emails)."', 
			`tpl_timestamp`=UNIX_TIMESTAMP()";
			
		$this->mysql->query($sql);
		if ($this->mysql->Error)
			return false;
		else
			return $this->mysql->last_id();
	}
	
	public function updateTPL($id, $name, $sys_name, $group, $source, $send_to_group, $send_to_emails){
		if ($send_to_group !== false)
			$send_to_group = implode(",",$send_to_group);
		
		$sql = "UPDATE `".$this->table."` SET 
			`name`='".to_base($name)."', 
			`group_id`='".to_base($group)."', 
			`tpl_name`='".to_base($sys_name)."', 
			`tpl_source`='".to_base($source)."', 
			`send_to_group`='".to_base($send_to_group)."', 
			`send_to_emails`='".to_base($send_to_emails)."', 
			`tpl_timestamp`=UNIX_TIMESTAMP()
			WHERE `id`='".intval($id)."'";
		$this->mysql->query($sql);
		if ($this->mysql->Error)
			return false;
		else
			return $id;
	}
	
	public function getList($group=''){
		if ($group) $sql = "SELECT * FROM `".$this->table."` WHERE `group_id`='".to_base($group)."'";
		else $sql = "SELECT `id`,`group_id`,`name`,`tpl_name`,`tpl_timestamp`  FROM `".$this->table."`";
		$this->mysql->query($sql);
		return $this->mysql->getAll();
	}
	
	public function getItemById($id){
		$sql = "SELECT * FROM `".$this->table."` WHERE `id`='".intval($id)."'";
		$this->mysql->query($sql);
		$res = array();
		while($this->mysql->next_record()){
			$res = array(
				"id" 				=> $this->mysql->f("id"),
				"group_id" 			=> $this->mysql->f("group_id"),
				"name" 				=> from_base($this->mysql->f("name")),
				"tpl_name" 			=> from_base($this->mysql->f("tpl_name")),
				"tpl_timestamp" 	=> from_base($this->mysql->f("tpl_timestamp")),
				"tpl_source" 		=> from_base($this->mysql->f("tpl_source")),
				"send_to_group" 	=> explode(",",$this->mysql->f("send_to_group")),
				"send_to_emails" 	=> $this->mysql->f("send_to_emails"),
			);
		}
		return $res;
	}
	
	public function getItemByBind($bind){
		$sql = "SELECT * FROM `".$this->table."` WHERE `tpl_name`='".$bind."'";
		$this->mysql->query($sql);
		$res = array();
		while($this->mysql->next_record()){
			$res = array(
				"id" 				=> $this->mysql->f("id"),
				"group_id" 			=> $this->mysql->f("group_id"),
				"name" 				=> from_base($this->mysql->f("name")),
				"tpl_name" 			=> from_base($this->mysql->f("tpl_name")),
				"tpl_timestamp" 	=> from_base($this->mysql->f("tpl_timestamp")),
				"tpl_source" 		=> from_base($this->mysql->f("tpl_source")),
				"send_to_group" 	=> explode(",",$this->mysql->f("send_to_group")),
				"send_to_emails" 	=> $this->mysql->f("send_to_emails"),
			);
		}
		return $res;
	}
	
	public function getEmailsFromGroups($arr){
		if (is_array($arr)) {
			$sql = "SELECT `email` FROM `#__usr_users` WHERE `gid` IN ('0'";
			foreach($arr as $v) $sql .= ",'".$v."'";
			$sql .= ") GROUP BY `email`";
			$this->mysql->query($sql);
			$res = array();
			while($this->mysql->next_record()){
				$res[] = $this->mysql->f('email');
			}
			return $res;
		}
	}
	
	public function getEmailsToSend($bind){
		$tpl_in = $this->getItemByBind($bind);
		
		//    Prepare email's
		//    Get emails by group
		$emails = $this->getEmailsFromGroups($tpl_in['send_to_group']);

		//    Get emails other
		$tmp = array();
		if ($tpl_in['send_to_emails']){
			foreach( explode(";",$tpl_in['send_to_emails']) as $v)
				$tmp[] = trim($v);
		}
		$emails = array_merge($emails, $tmp);
		$emails = array_unique($emails);
		return $emails;
	}
}
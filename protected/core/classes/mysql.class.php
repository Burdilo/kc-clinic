<?php

class Mysql
{
	var $Auto_Free     = 0;     ## Установить в 1 для автоматического mysqli_free_result()
	var $Debug         = 0;     ## Установить в 1 для получения сообщений дебага
	var $Halt_On_Error = "no";	## "yes" (показать ошибку), "no" (проигнорировать), "report" (игнорировать ошибку, но показать предупреждение)
	var $Seq_Table     = "db_sequence";
	var $Record   = array();
	var $Row;
	var $Errno    = 0;
	var $Error    = "";
	var $type     = "mysql";
	var $revision = "1.2";
	var $Link_ID  = 0;
	var $Query_ID = 0;
	var $pager 	  = array();
	
	public function __construct($query = "")
	{
		$this->query($query);
	}
	
	function connect()
	{
		if ($this->Link_ID == 0)
		{
			$this->Link_ID = mysqli_connect( DB_HOST , DB_USER , DB_PASS, DB_BASE );
		
			if ( !$this->Link_ID ) {
				$this->halt( "connect(Host, User, Password) failed." );
				return 0;
			}
		}
		//@mysqli_query( "SET NAMES cp1251" , $this->Link_ID );
		@mysqli_query( "SET NAMES utf8" , $this->Link_ID );
		return $this->Link_ID;
	}
	
	function free() {
		@mysqli_free_result($this->Query_ID);
		$this->Query_ID = 0;
	}
	
	function query($Query_String) {
		if ($Query_String == "") return 0;
		if (!$this->connect()) $this->connect();
		if ($this->Query_ID) $this->free();
		if ($this->Debug) printf("Debug: query = %s<br>\n", $Query_String);
		
		$Query_String = str_replace( "`#_" , "`".DB_PREF."_" , $Query_String );
		$this->Query_ID = @mysqli_query($Query_String,$this->Link_ID);
		$this->Row   = 0;
		$this->Errno = mysqli_connect_errno();
		$this->Error = mysqli_connect_error();
		if (!$this->Query_ID) $this->halt("Invalid SQL: ".$Query_String);
		return $this->Query_ID;
	}
	
	function next_record() {
		if (!$this->Query_ID) {
			$this->halt("next_record called with no query pending.");
			return 0;
		}
		if ( isset($this->pager['limit']) ) {
			#	first offset
			while($this->Row < $this->pager['start_item']) {
				$this->Record = @mysqli_fetch_array($this->Query_ID);
				$this->Row++;
			}
			#	fast
			if ($this->Row >= $this->pager['start_item']+$this->pager['limit']) {
				$this->free();
				return NULL;
			}
		}
		$this->Record = @mysqli_fetch_array($this->Query_ID);
		$this->Row   += 1;
		$this->Errno  = mysqli_connect_errno();
		$this->Error  = mysqli_connect_error();
		
		$stat = is_array($this->Record);
		if (!$stat && $this->Auto_Free) $this->free();
		return $stat;
	}
	
	function nr() {
		if (!$this->Query_ID) {
			$this->halt("next_record called with no query pending.");
			return 0;
		}

		$this->Record = @mysqli_fetch_array($this->Query_ID);
		$this->Row   += 1;
		$this->Errno  = mysqli_connect_errno();
		$this->Error  = mysqli_connect_error();

		$stat = is_array($this->Record);
		if (!$stat && $this->Auto_Free) {
			$this->free();
		}
		return $stat;
	}
	
	function getAll() {
		$arAll = array();
		if ( $this->Query_ID ) {
			while( $arr = @mysqli_fetch_row($this->Query_ID) ) {
			$thisRecord = array();
				foreach( $arr as $k => $v ) {
					$name_field = mysqli_field_name( $this->Query_ID , $k );
					$thisRecord[ $name_field ] = from_base( $v );
				}
				$arAll[] = $thisRecord;
			}
		}
		return $arAll;
	}
	
	function getLimited($limit=10) {
		$this->preparePager($limit);
		$i = 0;
		$arAll = array();
		if ( $this->Query_ID ) {
			while( $arr = @mysqli_fetch_row($this->Query_ID) ) {
				if ($i > $this->pager['start_item'] + $this->pager['limit']) break;
				if ($i >= $this->pager['start_item']) {
					$thisRecord = array();
					foreach( $arr as $k => $v ) {
						$name_field = mysqli_field_name( $this->Query_ID , $k );
						$thisRecord[ $name_field ] = from_base( $v );
					}
					$arAll[] = $thisRecord;
				}
				$i++;
			}
		}
		return $arAll;
	}
	
	function preparePager($limit) {
		$pager = array();
		#	Get page number
		$page = 0;
		if ( isset($_GET['page']) ) $page = intval($_GET['page']);
		#	Calculate paga count
		$count = $this->nf();
		if ($count % $limit == 0) $page_count = $count / $limit;
		else $page_count = intval($count / $limit) + 1;

		$this->pager['limit'] = $limit;
		$this->pager['curr_page'] = $page;
		$this->pager['page_count'] = $page_count;
		$this->pager['all_items'] = $count;
		$this->pager['start_item'] = $limit*$page;
	}

	function getRecord() {
		$arr = @mysqli_fetch_row( $this->Query_ID );
		$arAll = array();
		$thisRecord = array();
		if ( !empty( $arr ) ) {
			foreach( $arr as $k => $v ) {
				$name_field = mysqli_field_name( $this->Query_ID , $k );
				$thisRecord[ $name_field ] = from_base( $v );
			}
			$arAll = $thisRecord;
			return $arAll;
		} else return array();
	}
	
	function from_base($s) {
		return stripslashes($s);
	}
	
	function to_base($s) {
		$s = trim($s);
		return addslashes($s);
	}
	
	function affected_rows() {
		return @mysqli_affected_rows($this->Link_ID);
	}
	
	function debug() {
		$this->Debug = 1;
	}
	
	function num_rows() {
		return @mysqli_num_rows($this->Query_ID);
	}
	
	function last_id() {
		return @mysqli_insert_id($this->Link_ID);
	}
	
	function num_fields() {
		return @mysqli_num_fields($this->Query_ID);
	}
	
	function nf() {
		return $this->num_rows();
	}
	
	function f($Name) {
		//return isset($this->Record[$Name])?$this->Record[$Name]:0;
		return @$this->Record[$Name];
	}
	
	function halt($msg) {
		$this->Error = @mysqli_connect_error($this->Link_ID);
		$this->Errno = @mysqli_connect_errno($this->Link_ID);
		if ($this->Halt_On_Error == "no") return;
		$this->haltmsg($msg);
		if ($this->Halt_On_Error != "report")
			die('Errors');
	}
	
	function haltmsg($msg) {
		printf("</td></tr></table><b>Database error:</b> %s<br>\n", $msg);
		printf("<b>MySQL Error</b>: %s (%s)<br>\n", $this->Errno, $this->Error );
	}
	
	function table_names() {
		$this->query("SHOW TABLES");
		$i=0;
		while ($info=mysqli_fetch_row($this->Query_ID)) {
			$return[$i]['table_name']= $info[0];
			$return[$i]['tablespace_name']=$this->Database;
			$return[$i]['database']=$this->Database;
			$i++;
		}
		return $return;
	}
	
	function name_fields() {
		$res = array();
		$count_for = $this->num_fields();
		for( $i = 0; $i < $count_for; $i++ ) $res[$i] = @mysqli_field_name( $this->Query_ID , $i );
		unset( $count_for );
		return $res;
	}

	function quote_smart($value) {
		if (get_magic_quotes_gpc()) $value = stripslashes($value);
		if (!is_numeric($value)) $value = "'" . mysqli_real_escape_string($value) . "'";
		return $value;
	}
}
?>
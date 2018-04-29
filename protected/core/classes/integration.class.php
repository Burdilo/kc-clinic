<?php

final class Integration extends Crawler
{
	use Singleton;
	private $args 				= array();

	public function __construct()
	{
		parent::__construct();
		
	}
}
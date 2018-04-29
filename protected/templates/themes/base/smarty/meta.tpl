<!DOCTYPE html>
<!-- (c) lnk. CELEBRO Studio | http://celebro.ru -->
{strip}
<!--[if lt IE 7]><html class="ie6" lang="{$_page.lang}"><![endif]-->
<!--[if IE 7]>   <html class="ie7" lang="{$_page.lang}"><![endif]-->
<!--[if IE 8]>   <html class="ie8" lang="{$_page.lang}"><![endif]-->
<!--[if IE 9]>   <html class="ie9" lang="{$_page.lang}"><![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" itemscope="itemscope" itemtype="http://schema.org/{if !isset($uri[1])}WebPage{else}ItemPage{/if}" lang="{$_page.lang}">
<!--<![endif]-->
<head>
	<title itemprop="name">{$_page.title}</title>
	
	<meta charset="utf-8">
	<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
	<meta content="on" http-equiv="cleartype">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimal-ui">

	<meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE">
	<meta name="format-detection" content="telephone=no">
	<meta name="format-detection" content="address=no">
	<meta name="HandheldFriendly" content="True">
	<meta name="MobileOptimized" content="320">
	
	{if $_csrf_token nocache}
	<meta content="{$_csrf_param}" name="csrf-param">
	<meta content="{$_csrf_token}" name="csrf-token">
	{/if}

	<link href="/colorbox/colorbox.css" rel="stylesheet" type="text/css" />
	<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">

	{compress
		mode   = 'css'
		type   = 'inline'
		media  = 'all'
		source = [
			[ file => '/css/main.css' ],
			[ file => '/css/main320.css' ],
			[ file => '/css/main480.css' ],
			[ file => '/css/main640.css' ],
			[ file => '/css/main768.css' ],
			[ file => '/css/main1024.css' ],
			[ file => '/css/feature-carousel.css'],
			[ file => '/css/slick-theme.css' ],
			[ file => '/css/slick.css' ]
		]
	}

	<meta name="yandex-verification" content="e906bf8dd76a409a" />
    <meta content="{$_page.robots}" name="robots">
    <meta content="{$_page.keywords}" name="keywords">
    <meta content="{$_page.description}" name="description" itemprop="description">
	
	<meta content="{$_page.lang}" itemprop="inLanguage">
	
	<!--
	<meta content="no" http-equiv="imagetoolbar">
	<meta content="public" http-equiv="Cache-Control">
	<meta content="max-age=3600, must-revalidate" http-equiv="Cache-Control">
 	-->	
	
	{if isset($pagination.prev) && $pagination.prev !== ''}
		<link rel="prev" href="?page={$pagination.prev}">
	{/if}

	{if isset($pagination.next) && $pagination.next !== ''}
		<link rel="next" href="?page={$pagination.next}">
	{/if}

	<meta name="application-name" content="{$smarty.const.COMPANY_NAME}">
	
	<meta property="og:site_name" content="{$smarty.const.COMPANY_NAME}">
	<meta property="og:type" content="article">
	<meta property="og:title" content="{$_page.title}">
	<meta property="og:description" content="{$_page.description}">
	<meta property="og:url" content="http://{$smarty.server.HTTP_HOST nocache}{$smarty.server.REQUEST_URI nocache}">

	<link rel="home" href="/">
	<link rel="search" href="/search" title="{$smarty.const.COMPANY_NAME}" type="application/opensearchdescription+xml">
	<link rel="canonical" href="http://{$smarty.server.HTTP_HOST nocache}{$smarty.server.REQUEST_URI nocache}">
	
	<script>(function(d) { d.className = d.className.replace(/\bno-js/, ''); })(document.documentElement);</script>

	<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
	<script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
	<![endif]-->
</head>
<body class="page-{$_page.system}">

{/strip}
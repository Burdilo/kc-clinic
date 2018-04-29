<!DOCTYPE html>
<!-- (c) lnk. celebro | celebro.ru -->
{strip}
<html lang="ru" class="no-js">
<head>
    <meta charset="UTF-8">
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <meta content="on" http-equiv="cleartype">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    
    <meta content="CELEBRO.CMS" name="CMS">
    <meta content="http://cms.celebro.ru/" name="author">
    <meta content="celebro.ru" name="copyright">
    
    <meta content="CBNRasX2tWj1T87XCj/+/5Naf0PFXyQTSgg30bShqzQ" name="csrf-token">
	<meta content="authenticity_token" name="csrf-param">
	
    <link rel="preload" href="/{$ADMIN_DIR}/fonts/open_sans/bold.woff">
    <link rel="preload" href="/{$ADMIN_DIR}/fonts/open_sans/light.woff">
    <link rel="preload" href="/{$ADMIN_DIR}/fonts/open_sans/regular.woff">

    <link rel="stylesheet" href="/{$ADMIN_DIR}/css/main.min.css">
    <link rel="icon" type="image/png" href="/{$ADMIN_DIR}/images/favicon.png">

    {if isset($_config.redactor )}
	    {foreach from=$_config.redactor item=item}
	        {if isset($item.path )}
	            {if isset($item.lib.style ) && !empty( $item.lib.style )}
	                {foreach from=$item.lib.style item=style}
	                <link rel="stylesheet" href="{$PATH_PUBLIC}{$item.path}{$style}">
	                {/foreach}
	            {/if}
	        {/if}
	    {/foreach}
	{/if}

	{if isset($_config.editor )}
	    {foreach from=$_config.editor item=item}
	        {if isset($item.path )}
	            {if isset($item.lib.style ) && !empty( $item.lib.style )}
	                {foreach from=$item.lib.style item=style}
	                <link rel="stylesheet" href="{$PATH_PUBLIC}{$item.path}{$style}">
	                {/foreach}
	            {/if}
	        {/if}
	    {/foreach}
	{/if}

	<script data-no-instant>
	    var ADMIN_DIR = '{$ADMIN_DIR}',
	        PATH_HASH = '{$PATH_HASH}',
	        CONFIGURE = {$_config|json_encode},
	        URL_TRANSLATE = "{if $smarty.const.SYSTEM_TRANSLATE}{$smarty.const.SYSTEM_TRANSLATE}{else}latin{/if}",
	        TRANSLATE_API = "{if $smarty.const.TRANSLATE_API}{$smarty.const.TRANSLATE_API}{/if}";

        {if isset($modules_json)}
        var MODULE_LIST = {$modules_json};
        {/if}
	</script>

    <title>{$smarty.const.COMPANY_NAME}</title>
</head>
<body>

<noscript>
    <div class="js_disabled">В вашем браузере отключена поддержка JavaScript! Для нормальной работоспособности сайта необходимо разрешить использование JavaScript.</div>
</noscript>

<div class="loader" id="loader"><img src="/{$ADMIN_DIR}/images/preloader.gif" width="32" height="32" alt="Идет загрузка"> <span>Подождите...</span></div>

{include file="system/include.code.tpl"}

<div class="page" id="page">
	<aside class="sidebar">
		<div class="sidebar__logo">
			<a href="#" class="sandwich menu-trigger">
				<span class="sandwich__layer">Menu</span>
			</a>
			<div class="sidebar__logo__celebro-cms secondary-items">CELEBRO<span>.CMS</span></div>
		</div>

		<div class="sidebar__inner">
			{if isset($navigation )}
			<ul class="navigation">
			{foreach from=$navigation item=item name=nav}
				<li class="navigation__item">
					<a href="/{$ADMIN_DIR}{$item.dir}" rel="{$item.name}" class="navigation__link{if isset($_path[1]) && $_path[1] == $item.root} navigation__link_current{/if} trigger-navigation" id="navi-{$smarty.foreach.nav.iteration}" data-instant>
						<span class="navigation__link__middle">
							<span class="navigation__link__icon">
								{*
								<img src="/{$ADMIN_DIR}/images/ico/{$item.icon}.svg" width="24" class="navigation__link__icon__image" alt="">
								*}
								<i class="navigation__link__icon__item icon icon-{$item.icon}"></i>
							</span>
							<span class="navigation__link__text secondary-items">{$item.name}</span>
							{if isset($item.count)}
								<span class="navigation__link__badge badge bg-{if $item.count > 0}danger{else}success{/if}">{$item.count}</span>
							{/if}
						</span>
					</a>
				</li>
			{/foreach}
			</ul>
			{/if}
		</div>
	</aside>

	<section class="wrapper clearfix" id="page-wrapper">
		<div class="overlay" id="overlay"></div>
		
		<header class="header">
			<div class="header__right-side">
			    <div class="header__recycle">
					<a href="./?cleancache=all&backuri={$_backuri}" class="header__recycle__button trigger-tooltip trigger-cache" title="Очистить кеш" data-no-instant></a>
					<span class="header__recycle__dropdown trigger-popover" data-popover="dropdown_menu">
						<span class="icon icon-chevron-down"></span>
					</span>
				</div>

				<a href="/" target="_blank" class="header__site-link" data-no-instant><i class="icon icon-link"></i>{$locale.view_website|capi}</a>
				<a href="./?logout=1" class="header__logout" title="{$locale.logout|capi}" title="Выйти" data-no-instant>Выйти</a>
			</div>

			<div class="header__title">{$header}</div>
		</header>
		
		{if $breadcrumbs}
		<ul class="bread-crumbs">
			{foreach from=$breadcrumbs item=bc name=bc}
                <li class="bread-crumbs__item">{if !$smarty.foreach.bc.last}<a href="{$bc.link}" class="bread-crumbs__item__link" data-instant>{/if}{$bc.name}{if !$smarty.foreach.bc.last}</a>{/if}</li>
            {/foreach}
		</ul>
		{/if}

		{if $submenu}
		<nav class="tabs">
			<ul class="tabs__list">
	            {foreach from=$submenu item=sub name=sub}
	            	<li class="tabs__list__item"><a href="/{$ADMIN_DIR}{$sub.dir}" class="tabs__list__link{if isset($_path[2]) && $_path[2] == $sub.root || isset($_path[2]) && $_path[2] == 'index' && $sub.root == 'list' || !isset($_path[2]) && $smarty.foreach.sub.first} tabs__list__link_current{/if}" data-instant>{$sub.name}</a></li>
	            {/foreach}
	        </ul>
		</nav>
		{/if}
		
		<article class="content clearfix">
			{$content}
		</article>

	</section>
</div>

<script src="/{$ADMIN_DIR}/js/jquery.js" data-no-instant></script>

{if isset($_config.scripts)}
    {foreach from=$_config.scripts item=item}
        {if isset($item.path)}
            {if isset($item.lib.script) && !empty($item.lib.script)}
                {foreach from=$item.lib.script item=script}
                <script src="{$PATH_PUBLIC}{$item.path}{$script}" data-no-instant></script>
                {/foreach}
            {/if}
        {/if}
    {/foreach}
{/if}

{if isset($_config.redactor)}
    {foreach from=$_config.redactor item=item}
        {if isset($item.path)}
            {if isset($item.lib.script) && !empty($item.lib.script)}
                {foreach from=$item.lib.script item=script}
                <script src="{$PATH_PUBLIC}{$item.path}{$script}" data-no-instant></script>
                {/foreach}
            {/if}
        {/if}
    {/foreach}
{/if}

{if isset($_config.editor)}
    {foreach from=$_config.editor item=item}
        {if isset($item.path)}
            {if isset($item.lib.script) && !empty($item.lib.script)}
                {foreach from=$item.lib.script item=script}
                <script src="{$PATH_PUBLIC}{$item.path}{$script}" data-no-instant></script>
                {/foreach}
            {/if}
        {/if}
    {/foreach}
{/if}

<script src="/{$ADMIN_DIR}/js/main.min.js" data-no-instant></script>

</body>
</html>
{/strip}
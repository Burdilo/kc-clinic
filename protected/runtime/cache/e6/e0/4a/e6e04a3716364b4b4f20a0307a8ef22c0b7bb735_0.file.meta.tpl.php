<?php
/* Smarty version 3.1.30, created on 2018-04-24 17:21:07
  from "/home/b/burdilo/kc-clinic.ru/public_html/protected/templates/themes/base/smarty/meta.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5adf3d53968ad2_12132858',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'e6e04a3716364b4b4f20a0307a8ef22c0b7bb735' => 
    array (
      0 => '/home/b/burdilo/kc-clinic.ru/public_html/protected/templates/themes/base/smarty/meta.tpl',
      1 => 1512648474,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5adf3d53968ad2_12132858 (Smarty_Internal_Template $_smarty_tpl) {
if (!is_callable('smarty_function_compress')) require_once '/home/b/burdilo/kc-clinic.ru/public_html/protected/core/lib/templaters/smarty/plugins_cms/function.compress.php';
?>
<!DOCTYPE html>
<!-- (c) lnk. CELEBRO Studio | http://celebro.ru -->
<!--[if lt IE 7]><html class="ie6" lang="<?php echo $_smarty_tpl->tpl_vars['_page']->value['lang'];?>
"><![endif]--><!--[if IE 7]> <html class="ie7" lang="<?php echo $_smarty_tpl->tpl_vars['_page']->value['lang'];?>
"><![endif]--><!--[if IE 8]> <html class="ie8" lang="<?php echo $_smarty_tpl->tpl_vars['_page']->value['lang'];?>
"><![endif]--><!--[if IE 9]> <html class="ie9" lang="<?php echo $_smarty_tpl->tpl_vars['_page']->value['lang'];?>
"><![endif]--><!--[if gt IE 8]><!--><html class="no-js" itemscope="itemscope" itemtype="http://schema.org/<?php if (!isset($_smarty_tpl->tpl_vars['uri']->value[1])) {?>WebPage<?php } else { ?>ItemPage<?php }?>" lang="<?php echo $_smarty_tpl->tpl_vars['_page']->value['lang'];?>
"><!--<![endif]--><head><title itemprop="name"><?php echo $_smarty_tpl->tpl_vars['_page']->value['title'];?>
</title><meta charset="utf-8"><meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible"><meta content="on" http-equiv="cleartype"><meta name="viewport" content="width=device-width, initial-scale=1.0, minimal-ui"><meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE"><meta name="format-detection" content="telephone=no"><meta name="format-detection" content="address=no"><meta name="HandheldFriendly" content="True"><meta name="MobileOptimized" content="320"><?php if ($_smarty_tpl->tpl_vars['_csrf_token']->value) {?><meta content="<?php echo $_smarty_tpl->tpl_vars['_csrf_param']->value;?>
" name="csrf-param"><meta content="<?php echo $_smarty_tpl->tpl_vars['_csrf_token']->value;?>
" name="csrf-token"><?php }?><link href="/colorbox/colorbox.css" rel="stylesheet" type="text/css" /><link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"><?php echo smarty_function_compress(array('mode'=>'css','type'=>'inline','media'=>'all','source'=>array(array('file'=>'/css/main.css'),array('file'=>'/css/main320.css'),array('file'=>'/css/main480.css'),array('file'=>'/css/main640.css'),array('file'=>'/css/main768.css'),array('file'=>'/css/main1024.css'),array('file'=>'/css/feature-carousel.css'),array('file'=>'/css/slick-theme.css'),array('file'=>'/css/slick.css'))),$_smarty_tpl);?>
<meta name="yandex-verification" content="e906bf8dd76a409a" /><meta content="<?php echo $_smarty_tpl->tpl_vars['_page']->value['robots'];?>
" name="robots"><meta content="<?php echo $_smarty_tpl->tpl_vars['_page']->value['keywords'];?>
" name="keywords"><meta content="<?php echo $_smarty_tpl->tpl_vars['_page']->value['description'];?>
" name="description" itemprop="description"><meta content="<?php echo $_smarty_tpl->tpl_vars['_page']->value['lang'];?>
" itemprop="inLanguage"><!--<meta content="no" http-equiv="imagetoolbar"><meta content="public" http-equiv="Cache-Control"><meta content="max-age=3600, must-revalidate" http-equiv="Cache-Control">--><?php if (isset($_smarty_tpl->tpl_vars['pagination']->value['prev']) && $_smarty_tpl->tpl_vars['pagination']->value['prev'] !== '') {?><link rel="prev" href="?page=<?php echo $_smarty_tpl->tpl_vars['pagination']->value['prev'];?>
"><?php }
if (isset($_smarty_tpl->tpl_vars['pagination']->value['next']) && $_smarty_tpl->tpl_vars['pagination']->value['next'] !== '') {?><link rel="next" href="?page=<?php echo $_smarty_tpl->tpl_vars['pagination']->value['next'];?>
"><?php }?><meta name="application-name" content="<?php echo @constant('COMPANY_NAME');?>
"><meta property="og:site_name" content="<?php echo @constant('COMPANY_NAME');?>
"><meta property="og:type" content="article"><meta property="og:title" content="<?php echo $_smarty_tpl->tpl_vars['_page']->value['title'];?>
"><meta property="og:description" content="<?php echo $_smarty_tpl->tpl_vars['_page']->value['description'];?>
"><meta property="og:url" content="http://<?php echo $_SERVER['HTTP_HOST'];
echo $_SERVER['REQUEST_URI'];?>
"><link rel="home" href="/"><link rel="search" href="/search" title="<?php echo @constant('COMPANY_NAME');?>
" type="application/opensearchdescription+xml"><link rel="canonical" href="http://<?php echo $_SERVER['HTTP_HOST'];
echo $_SERVER['REQUEST_URI'];?>
"><?php echo '<script'; ?>
>(function(d) { d.className = d.className.replace(/\bno-js/, ''); })(document.documentElement);<?php echo '</script'; ?>
><!--[if lt IE 9]><?php echo '<script'; ?>
 src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"><?php echo '</script'; ?>
><?php echo '<script'; ?>
 src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"><?php echo '</script'; ?>
><![endif]--></head><body class="page-<?php echo $_smarty_tpl->tpl_vars['_page']->value['system'];?>
"><?php }
}

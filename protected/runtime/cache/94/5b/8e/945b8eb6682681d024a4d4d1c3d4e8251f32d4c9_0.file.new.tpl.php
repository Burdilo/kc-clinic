<?php
/* Smarty version 3.1.30, created on 2018-04-24 17:21:04
  from "/home/b/burdilo/kc-clinic.ru/public_html/protected/templates/admin/new.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5adf3d50dd80d0_21906888',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '945b8eb6682681d024a4d4d1c3d4e8251f32d4c9' => 
    array (
      0 => '/home/b/burdilo/kc-clinic.ru/public_html/protected/templates/admin/new.tpl',
      1 => 1505290483,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:system/include.code.tpl' => 1,
  ),
),false)) {
function content_5adf3d50dd80d0_21906888 (Smarty_Internal_Template $_smarty_tpl) {
if (!is_callable('smarty_modifier_capi')) require_once '/home/b/burdilo/kc-clinic.ru/public_html/protected/core/lib/templaters/smarty/plugins_cms/modifier.capi.php';
?>
<!DOCTYPE html>
<!-- (c) lnk. celebro | celebro.ru -->
<html lang="ru" class="no-js"><head><meta charset="UTF-8"><meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible"><meta content="on" http-equiv="cleartype"><meta content="width=device-width, initial-scale=1" name="viewport"><meta content="CELEBRO.CMS" name="CMS"><meta content="http://cms.celebro.ru/" name="author"><meta content="celebro.ru" name="copyright"><meta content="CBNRasX2tWj1T87XCj/+/5Naf0PFXyQTSgg30bShqzQ" name="csrf-token"><meta content="authenticity_token" name="csrf-param"><link rel="preload" href="/<?php echo $_smarty_tpl->tpl_vars['ADMIN_DIR']->value;?>
/fonts/open_sans/bold.woff"><link rel="preload" href="/<?php echo $_smarty_tpl->tpl_vars['ADMIN_DIR']->value;?>
/fonts/open_sans/light.woff"><link rel="preload" href="/<?php echo $_smarty_tpl->tpl_vars['ADMIN_DIR']->value;?>
/fonts/open_sans/regular.woff"><link rel="stylesheet" href="/<?php echo $_smarty_tpl->tpl_vars['ADMIN_DIR']->value;?>
/css/main.min.css"><link rel="icon" type="image/png" href="/<?php echo $_smarty_tpl->tpl_vars['ADMIN_DIR']->value;?>
/images/favicon.png"><?php if (isset($_smarty_tpl->tpl_vars['_config']->value['redactor'])) {
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['_config']->value['redactor'], 'item');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['item']->value) {
if (isset($_smarty_tpl->tpl_vars['item']->value['path'])) {
if (isset($_smarty_tpl->tpl_vars['item']->value['lib']['style']) && !empty($_smarty_tpl->tpl_vars['item']->value['lib']['style'])) {
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['item']->value['lib']['style'], 'style');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['style']->value) {
?><link rel="stylesheet" href="<?php echo $_smarty_tpl->tpl_vars['PATH_PUBLIC']->value;
echo $_smarty_tpl->tpl_vars['item']->value['path'];
echo $_smarty_tpl->tpl_vars['style']->value;?>
"><?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
}
}
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
}
if (isset($_smarty_tpl->tpl_vars['_config']->value['editor'])) {
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['_config']->value['editor'], 'item');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['item']->value) {
if (isset($_smarty_tpl->tpl_vars['item']->value['path'])) {
if (isset($_smarty_tpl->tpl_vars['item']->value['lib']['style']) && !empty($_smarty_tpl->tpl_vars['item']->value['lib']['style'])) {
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['item']->value['lib']['style'], 'style');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['style']->value) {
?><link rel="stylesheet" href="<?php echo $_smarty_tpl->tpl_vars['PATH_PUBLIC']->value;
echo $_smarty_tpl->tpl_vars['item']->value['path'];
echo $_smarty_tpl->tpl_vars['style']->value;?>
"><?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
}
}
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
}
echo '<script'; ?>
 data-no-instant>var ADMIN_DIR = '<?php echo $_smarty_tpl->tpl_vars['ADMIN_DIR']->value;?>
',PATH_HASH = '<?php echo $_smarty_tpl->tpl_vars['PATH_HASH']->value;?>
',CONFIGURE = <?php echo json_encode($_smarty_tpl->tpl_vars['_config']->value);?>
,URL_TRANSLATE = "<?php if (@constant('SYSTEM_TRANSLATE')) {
echo @constant('SYSTEM_TRANSLATE');
} else { ?>latin<?php }?>",TRANSLATE_API = "<?php if (@constant('TRANSLATE_API')) {
echo @constant('TRANSLATE_API');
}?>";<?php if (isset($_smarty_tpl->tpl_vars['modules_json']->value)) {?>var MODULE_LIST = <?php echo $_smarty_tpl->tpl_vars['modules_json']->value;?>
;<?php }
echo '</script'; ?>
><title><?php echo @constant('COMPANY_NAME');?>
</title></head><body><noscript><div class="js_disabled">В вашем браузере отключена поддержка JavaScript! Для нормальной работоспособности сайта необходимо разрешить использование JavaScript.</div></noscript><div class="loader" id="loader"><img src="/<?php echo $_smarty_tpl->tpl_vars['ADMIN_DIR']->value;?>
/images/preloader.gif" width="32" height="32" alt="Идет загрузка"> <span>Подождите...</span></div><?php $_smarty_tpl->_subTemplateRender("file:system/include.code.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
<div class="page" id="page"><aside class="sidebar"><div class="sidebar__logo"><a href="#" class="sandwich menu-trigger"><span class="sandwich__layer">Menu</span></a><div class="sidebar__logo__celebro-cms secondary-items">CELEBRO<span>.CMS</span></div></div><div class="sidebar__inner"><?php if (isset($_smarty_tpl->tpl_vars['navigation']->value)) {?><ul class="navigation"><?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['navigation']->value, 'item', false, NULL, 'nav', array (
  'iteration' => true,
));
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['item']->value) {
$_smarty_tpl->tpl_vars['__smarty_foreach_nav']->value['iteration']++;
?><li class="navigation__item"><a href="/<?php echo $_smarty_tpl->tpl_vars['ADMIN_DIR']->value;
echo $_smarty_tpl->tpl_vars['item']->value['dir'];?>
" rel="<?php echo $_smarty_tpl->tpl_vars['item']->value['name'];?>
" class="navigation__link<?php if (isset($_smarty_tpl->tpl_vars['_path']->value[1]) && $_smarty_tpl->tpl_vars['_path']->value[1] == $_smarty_tpl->tpl_vars['item']->value['root']) {?> navigation__link_current<?php }?> trigger-navigation" id="navi-<?php echo (isset($_smarty_tpl->tpl_vars['__smarty_foreach_nav']->value['iteration']) ? $_smarty_tpl->tpl_vars['__smarty_foreach_nav']->value['iteration'] : null);?>
" data-instant><span class="navigation__link__middle"><span class="navigation__link__icon"><i class="navigation__link__icon__item icon icon-<?php echo $_smarty_tpl->tpl_vars['item']->value['icon'];?>
"></i></span><span class="navigation__link__text secondary-items"><?php echo $_smarty_tpl->tpl_vars['item']->value['name'];?>
</span><?php if (isset($_smarty_tpl->tpl_vars['item']->value['count'])) {?><span class="navigation__link__badge badge bg-<?php if ($_smarty_tpl->tpl_vars['item']->value['count'] > 0) {?>danger<?php } else { ?>success<?php }?>"><?php echo $_smarty_tpl->tpl_vars['item']->value['count'];?>
</span><?php }?></span></a></li><?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>
</ul><?php }?></div></aside><section class="wrapper clearfix" id="page-wrapper"><div class="overlay" id="overlay"></div><header class="header"><div class="header__right-side"><div class="header__recycle"><a href="./?cleancache=all&backuri=<?php echo $_smarty_tpl->tpl_vars['_backuri']->value;?>
" class="header__recycle__button trigger-tooltip trigger-cache" title="Очистить кеш" data-no-instant></a><span class="header__recycle__dropdown trigger-popover" data-popover="dropdown_menu"><span class="icon icon-chevron-down"></span></span></div><a href="/" target="_blank" class="header__site-link" data-no-instant><i class="icon icon-link"></i><?php echo smarty_modifier_capi($_smarty_tpl->tpl_vars['locale']->value['view_website']);?>
</a><a href="./?logout=1" class="header__logout" title="<?php echo smarty_modifier_capi($_smarty_tpl->tpl_vars['locale']->value['logout']);?>
" title="Выйти" data-no-instant>Выйти</a></div><div class="header__title"><?php echo $_smarty_tpl->tpl_vars['header']->value;?>
</div></header><?php if ($_smarty_tpl->tpl_vars['breadcrumbs']->value) {?><ul class="bread-crumbs"><?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['breadcrumbs']->value, 'bc', false, NULL, 'bc', array (
  'last' => true,
  'iteration' => true,
  'total' => true,
));
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['bc']->value) {
$_smarty_tpl->tpl_vars['__smarty_foreach_bc']->value['iteration']++;
$_smarty_tpl->tpl_vars['__smarty_foreach_bc']->value['last'] = $_smarty_tpl->tpl_vars['__smarty_foreach_bc']->value['iteration'] == $_smarty_tpl->tpl_vars['__smarty_foreach_bc']->value['total'];
?><li class="bread-crumbs__item"><?php if (!(isset($_smarty_tpl->tpl_vars['__smarty_foreach_bc']->value['last']) ? $_smarty_tpl->tpl_vars['__smarty_foreach_bc']->value['last'] : null)) {?><a href="<?php echo $_smarty_tpl->tpl_vars['bc']->value['link'];?>
" class="bread-crumbs__item__link" data-instant><?php }
echo $_smarty_tpl->tpl_vars['bc']->value['name'];
if (!(isset($_smarty_tpl->tpl_vars['__smarty_foreach_bc']->value['last']) ? $_smarty_tpl->tpl_vars['__smarty_foreach_bc']->value['last'] : null)) {?></a><?php }?></li><?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>
</ul><?php }
if ($_smarty_tpl->tpl_vars['submenu']->value) {?><nav class="tabs"><ul class="tabs__list"><?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['submenu']->value, 'sub', false, NULL, 'sub', array (
  'first' => true,
  'index' => true,
));
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['sub']->value) {
$_smarty_tpl->tpl_vars['__smarty_foreach_sub']->value['index']++;
$_smarty_tpl->tpl_vars['__smarty_foreach_sub']->value['first'] = !$_smarty_tpl->tpl_vars['__smarty_foreach_sub']->value['index'];
?><li class="tabs__list__item"><a href="/<?php echo $_smarty_tpl->tpl_vars['ADMIN_DIR']->value;
echo $_smarty_tpl->tpl_vars['sub']->value['dir'];?>
" class="tabs__list__link<?php if (isset($_smarty_tpl->tpl_vars['_path']->value[2]) && $_smarty_tpl->tpl_vars['_path']->value[2] == $_smarty_tpl->tpl_vars['sub']->value['root'] || isset($_smarty_tpl->tpl_vars['_path']->value[2]) && $_smarty_tpl->tpl_vars['_path']->value[2] == 'index' && $_smarty_tpl->tpl_vars['sub']->value['root'] == 'list' || !isset($_smarty_tpl->tpl_vars['_path']->value[2]) && (isset($_smarty_tpl->tpl_vars['__smarty_foreach_sub']->value['first']) ? $_smarty_tpl->tpl_vars['__smarty_foreach_sub']->value['first'] : null)) {?> tabs__list__link_current<?php }?>" data-instant><?php echo $_smarty_tpl->tpl_vars['sub']->value['name'];?>
</a></li><?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>
</ul></nav><?php }?><article class="content clearfix"><?php echo $_smarty_tpl->tpl_vars['content']->value;?>
</article></section></div><?php echo '<script'; ?>
 src="/<?php echo $_smarty_tpl->tpl_vars['ADMIN_DIR']->value;?>
/js/jquery.js" data-no-instant><?php echo '</script'; ?>
><?php if (isset($_smarty_tpl->tpl_vars['_config']->value['scripts'])) {
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['_config']->value['scripts'], 'item');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['item']->value) {
if (isset($_smarty_tpl->tpl_vars['item']->value['path'])) {
if (isset($_smarty_tpl->tpl_vars['item']->value['lib']['script']) && !empty($_smarty_tpl->tpl_vars['item']->value['lib']['script'])) {
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['item']->value['lib']['script'], 'script');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['script']->value) {
echo '<script'; ?>
 src="<?php echo $_smarty_tpl->tpl_vars['PATH_PUBLIC']->value;
echo $_smarty_tpl->tpl_vars['item']->value['path'];
echo $_smarty_tpl->tpl_vars['script']->value;?>
" data-no-instant><?php echo '</script'; ?>
><?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
}
}
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
}
if (isset($_smarty_tpl->tpl_vars['_config']->value['redactor'])) {
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['_config']->value['redactor'], 'item');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['item']->value) {
if (isset($_smarty_tpl->tpl_vars['item']->value['path'])) {
if (isset($_smarty_tpl->tpl_vars['item']->value['lib']['script']) && !empty($_smarty_tpl->tpl_vars['item']->value['lib']['script'])) {
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['item']->value['lib']['script'], 'script');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['script']->value) {
echo '<script'; ?>
 src="<?php echo $_smarty_tpl->tpl_vars['PATH_PUBLIC']->value;
echo $_smarty_tpl->tpl_vars['item']->value['path'];
echo $_smarty_tpl->tpl_vars['script']->value;?>
" data-no-instant><?php echo '</script'; ?>
><?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
}
}
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
}
if (isset($_smarty_tpl->tpl_vars['_config']->value['editor'])) {
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['_config']->value['editor'], 'item');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['item']->value) {
if (isset($_smarty_tpl->tpl_vars['item']->value['path'])) {
if (isset($_smarty_tpl->tpl_vars['item']->value['lib']['script']) && !empty($_smarty_tpl->tpl_vars['item']->value['lib']['script'])) {
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['item']->value['lib']['script'], 'script');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['script']->value) {
echo '<script'; ?>
 src="<?php echo $_smarty_tpl->tpl_vars['PATH_PUBLIC']->value;
echo $_smarty_tpl->tpl_vars['item']->value['path'];
echo $_smarty_tpl->tpl_vars['script']->value;?>
" data-no-instant><?php echo '</script'; ?>
><?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
}
}
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
}
echo '<script'; ?>
 src="/<?php echo $_smarty_tpl->tpl_vars['ADMIN_DIR']->value;?>
/js/main.min.js" data-no-instant><?php echo '</script'; ?>
></body></html><?php }
}

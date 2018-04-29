<?php
/* Smarty version 3.1.30, created on 2018-04-24 17:21:08
  from "/home/b/burdilo/kc-clinic.ru/public_html/protected/templates/themes/system/sitemap.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5adf3d547e0932_34633737',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '8f84a511a2b7fe392812a0955a4fe05962ad0ca5' => 
    array (
      0 => '/home/b/burdilo/kc-clinic.ru/public_html/protected/templates/themes/system/sitemap.tpl',
      1 => 1505290550,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:../system/sitemap.tpl' => 2,
  ),
),false)) {
function content_5adf3d547e0932_34633737 (Smarty_Internal_Template $_smarty_tpl) {
if (isset($_smarty_tpl->tpl_vars['tree']->value) && !empty($_smarty_tpl->tpl_vars['tree']->value)) {
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['tree']->value, 'item');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['item']->value) {
if ($_smarty_tpl->tpl_vars['item']->value['sys_name'] == 'main') {
$_smarty_tpl->_assignInScope('tmp', '');
} else {
$_smarty_tpl->_assignInScope('tmp', $_smarty_tpl->tpl_vars['item']->value['sys_name']);
$_smarty_tpl->_assignInScope('tmp', ((string)$_smarty_tpl->tpl_vars['tmp']->value)."/");
}?><li><a href="<?php echo $_smarty_tpl->tpl_vars['link']->value;
echo $_smarty_tpl->tpl_vars['tmp']->value;?>
"><?php echo $_smarty_tpl->tpl_vars['item']->value['name'];?>
</a><?php if ($_smarty_tpl->tpl_vars['item']->value['tree']) {?><ul><?php $_smarty_tpl->_subTemplateRender("file:../system/sitemap.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('tree'=>$_smarty_tpl->tpl_vars['item']->value['tree'],'link'=>((string)$_smarty_tpl->tpl_vars['link']->value).((string)$_smarty_tpl->tpl_vars['tmp']->value)), 0, true);
?>
</ul><?php }?></li><?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>

<?php }
}
}

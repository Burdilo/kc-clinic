<?php
/* Smarty version 3.1.30, created on 2018-04-24 17:37:16
  from "/home/b/burdilo/kc-clinic.ru/public_html/protected/modules/news/tpl/item.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5adf411c359d72_06657307',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '98479fd310a23cdd0d95f02bf03a14828d66f5c2' => 
    array (
      0 => '/home/b/burdilo/kc-clinic.ru/public_html/protected/modules/news/tpl/item.tpl',
      1 => 1509108423,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5adf411c359d72_06657307 (Smarty_Internal_Template $_smarty_tpl) {
if ($_smarty_tpl->tpl_vars['news']->value) {?>
<div class="newsItem__wrap">
	<div class="newsItem__title">
		<h1><?php echo $_smarty_tpl->tpl_vars['news']->value['title'];?>
</h1>
	</div>
	<div class="newsItem__image">
		<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['news']->value['cover_file'], 'image');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['image']->value) {
?>
		<img src="<?php echo $_smarty_tpl->tpl_vars['image']->value['original']['file'];?>
" >
		<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>

	</div>
	<div class="newsItem__text">
		<?php echo $_smarty_tpl->tpl_vars['news']->value['text'];?>

	</div>
	<div class="newsItem__date">
		<?php echo $_smarty_tpl->tpl_vars['news']->value['date'];?>

	</div>
	<div class="cb"></div>
	<div class="goTo__newsList">
		<a href="/novosti">Вернуться к странице новостей</a>
	</div>
</div>
<?php }
}
}

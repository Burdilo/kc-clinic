<?php
/* Smarty version 3.1.30, created on 2018-04-27 06:22:12
  from "/home/b/burdilo/kc-clinic.ru/public_html/protected/modules/news/tpl/list.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5ae297644d5903_21956477',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '6a4338f0868f91c4fcdacc1f942741fc0f95ba49' => 
    array (
      0 => '/home/b/burdilo/kc-clinic.ru/public_html/protected/modules/news/tpl/list.tpl',
      1 => 1505290450,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5ae297644d5903_21956477 (Smarty_Internal_Template $_smarty_tpl) {
if ($_smarty_tpl->tpl_vars['news']->value) {?>

<div class="news__wrap">
	<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['news']->value, 'a');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['a']->value) {
?>
	<div class="news__item">
		<h2 class="news__title"><a class="news__link" href="<?php echo $_smarty_tpl->tpl_vars['module_root']->value;?>
/<?php echo $_smarty_tpl->tpl_vars['a']->value['system'];?>
"><?php echo $_smarty_tpl->tpl_vars['a']->value['title'];?>
</a></h2>
		<div class="news__anons">
			<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['a']->value['cover_file'], 'cover');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['cover']->value) {
?>
			<div class="news__cover">
				<img src="<?php echo $_smarty_tpl->tpl_vars['cover']->value['sm']['file'];?>
">
			</div>
			<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>

			<div class="news__anons_text">
				<?php echo $_smarty_tpl->tpl_vars['a']->value['anons'];?>

			</div>
		</div>
		<div class="news__date">
			<p><?php echo $_smarty_tpl->tpl_vars['a']->value['date'];?>
</p>
		</div>
	</div>
	<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>

</div>

<?php }
}
}

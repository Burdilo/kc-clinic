<?php
/* Smarty version 3.1.30, created on 2018-04-29 18:22:30
  from "/home/b/burdilo/kc-clinic.ru/public_html/protected/modules/pageservices/tpl/list.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5ae5e336f152a9_01091540',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '74ee71ff44ff408b2f140560783a3cb7a1f57310' => 
    array (
      0 => '/home/b/burdilo/kc-clinic.ru/public_html/protected/modules/pageservices/tpl/list.tpl',
      1 => 1505290452,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5ae5e336f152a9_01091540 (Smarty_Internal_Template $_smarty_tpl) {
if ($_smarty_tpl->tpl_vars['services']->value) {?>
<div class="page__uslugi">
	<div class="uslugi__list">
		<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['services']->value, 'a');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['a']->value) {
?>
		<div class="uslugi__item">
			<div class="uslugiItem__title">
				<h2><a href="<?php echo $_smarty_tpl->tpl_vars['module_root']->value;?>
/<?php echo $_smarty_tpl->tpl_vars['a']->value['system'];?>
"><?php echo $_smarty_tpl->tpl_vars['a']->value['title'];?>
</a></h2>
			</div>
			<div class="uslugiItem__cover">
				<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['a']->value['image_file'], 'image');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['image']->value) {
?>
				<img src="<?php echo $_smarty_tpl->tpl_vars['image']->value['md']['file'];?>
">
				<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>

			</div>
		</div>
		<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>

	</div>
</div>
<?php }
}
}

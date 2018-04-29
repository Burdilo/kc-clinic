<?php
/* Smarty version 3.1.30, created on 2018-04-24 17:21:07
  from "/home/b/burdilo/kc-clinic.ru/public_html/protected/modules/mainslider/tpl/block.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5adf3d536bae82_66851509',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'f3060a90fe62b0a9e87fe048085d01046a2db61f' => 
    array (
      0 => '/home/b/burdilo/kc-clinic.ru/public_html/protected/modules/mainslider/tpl/block.tpl',
      1 => 1518687588,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5adf3d536bae82_66851509 (Smarty_Internal_Template $_smarty_tpl) {
if ($_smarty_tpl->tpl_vars['mainslider']->value) {?>
<h1>Косметологическая клиника - КС-Клиник.</h1>
<div class="mainSlider">
	<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['mainslider']->value, 'slider');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['slider']->value) {
?>
	<div class="slider__item">
		<?php if ($_smarty_tpl->tpl_vars['slider']->value['link'] != '') {?><a href="<?php echo $_smarty_tpl->tpl_vars['slider']->value['link'];?>
"><?php }?>
			<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['slider']->value['image_file'], 'image');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['image']->value) {
?>
			<img data-lazy="<?php echo $_smarty_tpl->tpl_vars['image']->value['original']['file'];?>
">
			<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>

		<?php if ($_smarty_tpl->tpl_vars['slider']->value['link'] != '') {?></a><?php }?>
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

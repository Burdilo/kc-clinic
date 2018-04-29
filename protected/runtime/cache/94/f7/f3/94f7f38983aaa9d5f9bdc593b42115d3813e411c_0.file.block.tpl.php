<?php
/* Smarty version 3.1.30, created on 2018-04-24 17:21:07
  from "/home/b/burdilo/kc-clinic.ru/public_html/protected/modules/services/tpl/block.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5adf3d53710312_08131571',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '94f7f38983aaa9d5f9bdc593b42115d3813e411c' => 
    array (
      0 => '/home/b/burdilo/kc-clinic.ru/public_html/protected/modules/services/tpl/block.tpl',
      1 => 1506427713,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5adf3d53710312_08131571 (Smarty_Internal_Template $_smarty_tpl) {
if ($_smarty_tpl->tpl_vars['services']->value) {?>
<div class="services__block">
	<p class="services__info">«КС Клиник» одна из передовых медицинских клиник Краснодара в области эстетической медицины и косметологии.</p>
	<h2 class="services__title">Услуги Клиники</h2>
	<div class="services">
		<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['services']->value, 'service');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['service']->value) {
?>
		<div class="service">
			<div class="service__image">
				<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['service']->value['image_file'], 'image');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['image']->value) {
?>
				<img src="<?php echo $_smarty_tpl->tpl_vars['image']->value['original']['file'];?>
">
				<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>

			</div>
			<h3 class="service__title"><?php echo $_smarty_tpl->tpl_vars['service']->value['title'];?>
</h3>
			<div class="srvice__shortDesc"><?php echo $_smarty_tpl->tpl_vars['service']->value['short_desc'];?>
</div>
		</div>
		<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>

	</div>
	<div class="clear"></div>
	<div class="services__all">
		<a id="all_uslugi" data-toggle=".layout-wrapper">Полный список услуг Клиники</a>
		<p>Консультация и составление плана процедур бесплатно</p>
	</div>

</div>
<?php }
}
}

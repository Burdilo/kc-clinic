<?php
/* Smarty version 3.1.30, created on 2018-04-24 17:21:07
  from "/home/b/burdilo/kc-clinic.ru/public_html/protected/modules/fotoresult/tpl/block.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5adf3d53800797_86171730',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '55e98fd376b44e05d9ccfde0e7657d8d0bd6de41' => 
    array (
      0 => '/home/b/burdilo/kc-clinic.ru/public_html/protected/modules/fotoresult/tpl/block.tpl',
      1 => 1507274039,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5adf3d53800797_86171730 (Smarty_Internal_Template $_smarty_tpl) {
if ($_smarty_tpl->tpl_vars['fotoresult']->value) {?>
<div class="fotoresult__block">
	<h2 class="services__title">Фотографии результатов</h2>
	<div class="carousel-container">
		<div id="carousel">
			<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['fotoresult']->value, 'foto');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['foto']->value) {
?>
			<div class="carousel-feature">
          		<a>
          		<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['foto']->value['image_file'], 'image');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['image']->value) {
?>
          		<img class="carousel-image" alt="Image Caption" src="<?php echo $_smarty_tpl->tpl_vars['image']->value['sm']['file'];?>
">
          		<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>

          		</a>
          	</div>
          	<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>

		</div>

		<div id="carousel-left"><img src="/images/arrow-left.png" /></div>
      	<div id="carousel-right"><img src="/images/arrow-right.png" /></div>
	</div>
</div>
<?php }
}
}

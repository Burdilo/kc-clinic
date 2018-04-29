<?php
/* Smarty version 3.1.30, created on 2018-04-24 17:21:07
  from "/home/b/burdilo/kc-clinic.ru/public_html/protected/modules/newsonmain/tpl/block.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5adf3d538b3466_73734716',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'dc06c377ebb940b29e45cf8b3ede7a48e81413e0' => 
    array (
      0 => '/home/b/burdilo/kc-clinic.ru/public_html/protected/modules/newsonmain/tpl/block.tpl',
      1 => 1509644248,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5adf3d538b3466_73734716 (Smarty_Internal_Template $_smarty_tpl) {
if ($_smarty_tpl->tpl_vars['news']->value) {?>

<div class="news__wrap">
	<div class="separator_title">
		<div></div>
	</div>
	<h3 class="newsOnMaon__title"><a href="/novosti">Новости</a></h3>
	<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['news']->value, 'a');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['a']->value) {
?>
	<div class="news__item">
		<h3 class="news__title"><a class="news__link" href="/novosti/<?php echo $_smarty_tpl->tpl_vars['a']->value['system'];?>
"><?php echo $_smarty_tpl->tpl_vars['a']->value['title'];?>
</a></h3>
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

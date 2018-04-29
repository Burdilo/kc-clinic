<?php
/* Smarty version 3.1.30, created on 2018-04-24 17:21:07
  from "/home/b/burdilo/kc-clinic.ru/public_html/protected/modules/advantages/tpl/block.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5adf3d53869934_75339436',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'aa11a899eb5e626144278586601e3584fdcec9c5' => 
    array (
      0 => '/home/b/burdilo/kc-clinic.ru/public_html/protected/modules/advantages/tpl/block.tpl',
      1 => 1509422640,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5adf3d53869934_75339436 (Smarty_Internal_Template $_smarty_tpl) {
if ($_smarty_tpl->tpl_vars['advantages']->value) {?>
<div class="advantages">
	<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['advantages']->value, 'adv');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['adv']->value) {
?>
	<div class="advantage">
		<div class="advantage__ico">
			<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['adv']->value['image_file'], 'image');
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
		<div class="advantage__info">
			<div class="advantage__title"><?php echo $_smarty_tpl->tpl_vars['adv']->value['title'];?>
</div>
			<div class="advantage__desc"><?php echo $_smarty_tpl->tpl_vars['adv']->value['desc'];?>
</div>
		</div>
	</div>
	<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>

</div>
<!--<div class="bottom__banner">
	<a class="bottomBanner_mainLink">
		<img src="/images/bottom-banner.jpg">
		<p class="bottomBanner__title">Для любой проблемы есть решение</p>
		<a class="bottomBanner__link">Узнайте свою формулу красоты</a>
		<a class="bottomBanner__more">Подробнее <span>>></span></a>
	</a>
</div>-->
<?php }
}
}

<?php
/* Smarty version 3.1.30, created on 2018-04-24 19:20:57
  from "/home/b/burdilo/kc-clinic.ru/public_html/protected/modules/contacts/tpl/block.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5adf5969ad8d93_71549749',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '52e4846ce5dfdcb543cecc9c9e3f2b94cbbb1ca2' => 
    array (
      0 => '/home/b/burdilo/kc-clinic.ru/public_html/protected/modules/contacts/tpl/block.tpl',
      1 => 1510560299,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5adf5969ad8d93_71549749 (Smarty_Internal_Template $_smarty_tpl) {
if ($_smarty_tpl->tpl_vars['contacts']->value) {?>
<div class="contacts__block">
	<div class="contacts__address">
		<p><strong>Адрес: </strong><?php echo $_smarty_tpl->tpl_vars['contacts']->value['address'];?>
</p>
	</div>
	<div class="contacts__phone">
		<p><strong>Телефон: </strong><a href="tel:<?php echo $_smarty_tpl->tpl_vars['contacts']->value['phone'];?>
"><?php echo $_smarty_tpl->tpl_vars['contacts']->value['phone'];?>
</a></p>
	</div>
	<div class="contacts__regim">
		<p><strong>Время работы: </strong><?php echo $_smarty_tpl->tpl_vars['contacts']->value['regim'];?>
</p>
	</div>
	<div class="contacts__map">
		
		<?php echo '<script'; ?>
 type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A7bb047f605a4358ed5ded7357dae17d0ca817def4d8e7bf90557165724f785d4&amp;width=100%25&amp;height=400&amp;lang=ru_RU&amp;scroll=true"><?php echo '</script'; ?>
>
		
	</div>
</div>
<?php }
}
}

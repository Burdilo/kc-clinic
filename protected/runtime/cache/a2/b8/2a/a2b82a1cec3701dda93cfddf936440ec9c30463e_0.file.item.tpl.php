<?php
/* Smarty version 3.1.30, created on 2018-04-24 18:50:20
  from "/home/b/burdilo/kc-clinic.ru/public_html/protected/modules/pageservices/tpl/item.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5adf523c8cae25_24337779',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'a2b82a1cec3701dda93cfddf936440ec9c30463e' => 
    array (
      0 => '/home/b/burdilo/kc-clinic.ru/public_html/protected/modules/pageservices/tpl/item.tpl',
      1 => 1505290452,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5adf523c8cae25_24337779 (Smarty_Internal_Template $_smarty_tpl) {
if ($_smarty_tpl->tpl_vars['service']->value) {?>
<h1><?php echo $_smarty_tpl->tpl_vars['service']->value['title'];?>
</h1>
<div class="serviceItem__desc">
	<?php echo $_smarty_tpl->tpl_vars['service']->value['desc'];?>

</div>
<?php }
}
}

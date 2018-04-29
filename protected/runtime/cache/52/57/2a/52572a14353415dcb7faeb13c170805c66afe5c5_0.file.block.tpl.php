<?php
/* Smarty version 3.1.30, created on 2018-04-24 23:48:54
  from "/home/b/burdilo/kc-clinic.ru/public_html/protected/modules/discount/tpl/block.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5adf9836d25c39_85236168',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '52572a14353415dcb7faeb13c170805c66afe5c5' => 
    array (
      0 => '/home/b/burdilo/kc-clinic.ru/public_html/protected/modules/discount/tpl/block.tpl',
      1 => 1510561214,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5adf9836d25c39_85236168 (Smarty_Internal_Template $_smarty_tpl) {
if ($_smarty_tpl->tpl_vars['discount']->value) {?><div class="discount_wrap"><?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['discount']->value, 'a');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['a']->value) {
?><div class="discount_item"><div class="discount_text <?php if ($_smarty_tpl->tpl_vars['a']->value['image_position'] == 'left') {?> fr<?php } else { ?> fl<?php }?>"><h2><?php echo $_smarty_tpl->tpl_vars['a']->value['title'];?>
</h2><?php echo $_smarty_tpl->tpl_vars['a']->value['text'];?>
</div><div class="discount_image <?php if ($_smarty_tpl->tpl_vars['a']->value['image_position'] == 'left') {?> fr<?php } else { ?> fl<?php }?>"><?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['a']->value['image_file'], 'image');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['image']->value) {
?><img src="<?php echo $_smarty_tpl->tpl_vars['image']->value['original']['file'];?>
"><?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>
</div><div class="cb"></div></div><?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>
</div><?php }
}
}

<?php
/* Smarty version 3.1.30, created on 2018-04-24 23:50:49
  from "/home/b/burdilo/kc-clinic.ru/public_html/protected/modules/doc/tpl/block.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5adf98a9a05090_21985109',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '7d27e2b7cb032eea5d59b19e351097ed18ee9f5e' => 
    array (
      0 => '/home/b/burdilo/kc-clinic.ru/public_html/protected/modules/doc/tpl/block.tpl',
      1 => 1509642468,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5adf98a9a05090_21985109 (Smarty_Internal_Template $_smarty_tpl) {
if ($_smarty_tpl->tpl_vars['docs']->value) {?><div class="docs"><?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['docs']->value, 'doc');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['doc']->value) {
?><div class="docs_item"><?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['doc']->value['image_file'], 'image');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['image']->value) {
?><a href="<?php echo $_smarty_tpl->tpl_vars['image']->value['md']['file'];?>
" class="cboxElement" rel="cbox"><img src="<?php echo $_smarty_tpl->tpl_vars['image']->value['sm']['file'];?>
"></a><?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>
</div><?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>
</div><?php }
}
}

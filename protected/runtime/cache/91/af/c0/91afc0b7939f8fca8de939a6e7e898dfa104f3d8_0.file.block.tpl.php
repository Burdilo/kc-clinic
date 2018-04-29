<?php
/* Smarty version 3.1.30, created on 2018-04-24 23:51:08
  from "/home/b/burdilo/kc-clinic.ru/public_html/protected/modules/gallery/tpl/block.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5adf98bcb69ae3_25717481',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '91afc0b7939f8fca8de939a6e7e898dfa104f3d8' => 
    array (
      0 => '/home/b/burdilo/kc-clinic.ru/public_html/protected/modules/gallery/tpl/block.tpl',
      1 => 1509650494,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5adf98bcb69ae3_25717481 (Smarty_Internal_Template $_smarty_tpl) {
if ($_smarty_tpl->tpl_vars['gallery']->value) {?><div class="gallery_wrap"><?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['gallery']->value, 'album', false, NULL, 'alb', array (
  'last' => true,
  'iteration' => true,
  'total' => true,
));
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['album']->value) {
$_smarty_tpl->tpl_vars['__smarty_foreach_alb']->value['iteration']++;
$_smarty_tpl->tpl_vars['__smarty_foreach_alb']->value['last'] = $_smarty_tpl->tpl_vars['__smarty_foreach_alb']->value['iteration'] == $_smarty_tpl->tpl_vars['__smarty_foreach_alb']->value['total'];
?><div class="album_item"><div class="album_title"><h2><?php echo $_smarty_tpl->tpl_vars['album']->value['album'];?>
</h2></div><div class="album_images"><?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['album']->value['images_file'], 'image');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['image']->value) {
?><div class="album_imageItem"><a href="<?php echo $_smarty_tpl->tpl_vars['image']->value['original']['file'];?>
" class="cboxElement" rel="cbox"><img src="<?php echo $_smarty_tpl->tpl_vars['image']->value['sm']['file'];?>
"></a></div><?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>
</div></div><?php if (!(isset($_smarty_tpl->tpl_vars['__smarty_foreach_alb']->value['last']) ? $_smarty_tpl->tpl_vars['__smarty_foreach_alb']->value['last'] : null)) {?><div class="separator_title"><div style="widht: 400px; border-bottom-width: 2px;"></div></div><?php }
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>
</div><?php }
}
}

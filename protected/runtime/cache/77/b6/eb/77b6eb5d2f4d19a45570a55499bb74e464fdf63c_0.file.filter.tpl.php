<?php
/* Smarty version 3.1.30, created on 2018-04-24 17:21:04
  from "/home/b/burdilo/kc-clinic.ru/public_html/protected/templates/admin/view/meta/module/filter.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5adf3d50b6b230_67116033',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '77b6eb5d2f4d19a45570a55499bb74e464fdf63c' => 
    array (
      0 => '/home/b/burdilo/kc-clinic.ru/public_html/protected/templates/admin/view/meta/module/filter.tpl',
      1 => 1505290501,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5adf3d50b6b230_67116033 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_assignInScope('pagerCookie', "modulePager_".((string)$_smarty_tpl->tpl_vars['module_id']->value));
?><div class="button-container clearfix"><div class="button-container--right"><?php if ($_smarty_tpl->tpl_vars['meta_filter']->value) {
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['meta_filter']->value, 'filter', false, 'name');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['name']->value => $_smarty_tpl->tpl_vars['filter']->value) {
if (!empty($_smarty_tpl->tpl_vars['filter']->value['list'])) {?><div class="button-container-select button-container-select--<?php echo $_smarty_tpl->tpl_vars['filter']->value['type'];?>
"><select name="$name"<?php if ($_smarty_tpl->tpl_vars['filter']->value['type'] == 'multiselect') {?> multiple<?php }?> onchange="setModuleSort(this, '<?php echo $_smarty_tpl->tpl_vars['module_id']->value;?>
', '<?php echo $_smarty_tpl->tpl_vars['name']->value;?>
')" placeholder="<?php echo htmlspecialchars($_smarty_tpl->tpl_vars['filter']->value['name'], ENT_QUOTES, 'UTF-8', true);?>
"><?php if ($_smarty_tpl->tpl_vars['filter']->value['type'] != 'multiselect') {?><option value="">- <?php echo htmlspecialchars($_smarty_tpl->tpl_vars['filter']->value['name'], ENT_QUOTES, 'UTF-8', true);?>
 -</option><?php }
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['filter']->value['list'], 'n', false, 'v');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['v']->value => $_smarty_tpl->tpl_vars['n']->value) {
?><option value="<?php echo $_smarty_tpl->tpl_vars['v']->value;?>
"<?php if (isset($_smarty_tpl->tpl_vars['meta_cookie']->value[$_smarty_tpl->tpl_vars['name']->value]) && (is_array($_smarty_tpl->tpl_vars['meta_cookie']->value[$_smarty_tpl->tpl_vars['name']->value]) && in_array($_smarty_tpl->tpl_vars['v']->value,$_smarty_tpl->tpl_vars['meta_cookie']->value[$_smarty_tpl->tpl_vars['name']->value]) || is_string($_smarty_tpl->tpl_vars['meta_cookie']->value[$_smarty_tpl->tpl_vars['name']->value]) && $_smarty_tpl->tpl_vars['v']->value == $_smarty_tpl->tpl_vars['meta_cookie']->value[$_smarty_tpl->tpl_vars['name']->value])) {?> selected<?php }?>><?php echo $_smarty_tpl->tpl_vars['n']->value;?>
</option><?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>
</select></div><?php }
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
}?><div class="button-container-limit"><select name="limit" onchange="setModuleLimit(this, '<?php echo $_smarty_tpl->tpl_vars['module_id']->value;?>
')"><option value="">На странице</option><?php
$__section_pager_0_saved = isset($_smarty_tpl->tpl_vars['__smarty_section_pager']) ? $_smarty_tpl->tpl_vars['__smarty_section_pager'] : false;
$_smarty_tpl->tpl_vars['__smarty_section_pager'] = new Smarty_Variable(array());
if (true) {
for ($__section_pager_0_iteration = 1, $_smarty_tpl->tpl_vars['__smarty_section_pager']->value['index'] = 5; $__section_pager_0_iteration <= 7; $__section_pager_0_iteration++, $_smarty_tpl->tpl_vars['__smarty_section_pager']->value['index'] += 5){
?><option value="<?php echo (isset($_smarty_tpl->tpl_vars['__smarty_section_pager']->value['index']) ? $_smarty_tpl->tpl_vars['__smarty_section_pager']->value['index'] : null);?>
"<?php if (isset($_COOKIE[$_smarty_tpl->tpl_vars['pagerCookie']->value]) && $_COOKIE[$_smarty_tpl->tpl_vars['pagerCookie']->value] == (isset($_smarty_tpl->tpl_vars['__smarty_section_pager']->value['index']) ? $_smarty_tpl->tpl_vars['__smarty_section_pager']->value['index'] : null)) {?> selected<?php }?>><?php echo (isset($_smarty_tpl->tpl_vars['__smarty_section_pager']->value['index']) ? $_smarty_tpl->tpl_vars['__smarty_section_pager']->value['index'] : null);?>
</option><?php
}
}
if ($__section_pager_0_saved) {
$_smarty_tpl->tpl_vars['__smarty_section_pager'] = $__section_pager_0_saved;
}
?></select></div></div><a href="<?php echo $_smarty_tpl->tpl_vars['base_path']->value;?>
/module/add/<?php echo $_smarty_tpl->tpl_vars['module_id']->value;
if (isset($_smarty_tpl->tpl_vars['back_to_page']->value) && $_smarty_tpl->tpl_vars['back_to_page']->value !== '' && $_smarty_tpl->tpl_vars['back_to_page']->value > 0) {?>?back_to_page=<?php echo $_smarty_tpl->tpl_vars['back_to_page']->value;
}?>" class="button button-blue"><i class="icon icon-plus-square"></i>Добавить поле</a><?php if ($_SESSION['userinf']['gid'] == 10) {?><a href="/<?php echo $_smarty_tpl->tpl_vars['ADMIN_DIR']->value;?>
/modules/index/edit/<?php echo $_smarty_tpl->tpl_vars['module_id']->value;?>
" class="button button-gray"><i class="icon icon-settings"></i>Настройки модуля</a><?php }?></div><?php }
}

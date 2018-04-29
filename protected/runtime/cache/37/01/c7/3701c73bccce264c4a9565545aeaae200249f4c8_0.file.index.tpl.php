<?php
/* Smarty version 3.1.30, created on 2018-04-24 17:21:04
  from "/home/b/burdilo/kc-clinic.ru/public_html/protected/templates/admin/view/meta/module/index.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5adf3d50af4282_51562606',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '3701c73bccce264c4a9565545aeaae200249f4c8' => 
    array (
      0 => '/home/b/burdilo/kc-clinic.ru/public_html/protected/templates/admin/view/meta/module/index.tpl',
      1 => 1505290501,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:system/pager.tpl' => 1,
  ),
),false)) {
function content_5adf3d50af4282_51562606 (Smarty_Internal_Template $_smarty_tpl) {
if (!is_callable('smarty_function_cycle')) require_once '/home/b/burdilo/kc-clinic.ru/public_html/protected/core/lib/templaters/smarty/plugins/function.cycle.php';
if (!is_callable('smarty_modifier_add2query')) require_once '/home/b/burdilo/kc-clinic.ru/public_html/protected/core/lib/templaters/smarty/plugins_cms/modifier.add2query.php';
if ((isset($_smarty_tpl->tpl_vars['modules']->value) && !empty($_smarty_tpl->tpl_vars['modules']->value)) || (isset($_smarty_tpl->tpl_vars['groups']->value) && !empty($_smarty_tpl->tpl_vars['groups']->value))) {?><div class="button-container clearfix"><?php if (isset($_smarty_tpl->tpl_vars['groups']->value) && !empty($_smarty_tpl->tpl_vars['groups']->value)) {?><div class="mb40"></div><?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['groups']->value, 'item', false, NULL, 'item', array (
  'last' => true,
  'iteration' => true,
  'total' => true,
));
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['item']->value) {
$_smarty_tpl->tpl_vars['__smarty_foreach_item']->value['iteration']++;
$_smarty_tpl->tpl_vars['__smarty_foreach_item']->value['last'] = $_smarty_tpl->tpl_vars['__smarty_foreach_item']->value['iteration'] == $_smarty_tpl->tpl_vars['__smarty_foreach_item']->value['total'];
?><div class="fieldset<?php if ((isset($_smarty_tpl->tpl_vars['__smarty_foreach_item']->value['last']) ? $_smarty_tpl->tpl_vars['__smarty_foreach_item']->value['last'] : null)) {?> mb10<?php }?> fieldset-<?php echo smarty_function_cycle(array('values'=>'red,blue,green,purple,orange,pink','name'=>'fieldset'),$_smarty_tpl);?>
 clearfix"><span class="fieldset-caption"><?php echo $_smarty_tpl->tpl_vars['item']->value['name'];?>
</span><div class="fieldset-content"><?php if (isset($_smarty_tpl->tpl_vars['item']->value['modules']) && !empty($_smarty_tpl->tpl_vars['item']->value['modules'])) {
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['item']->value['modules'], 'i', false, 'id');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['id']->value => $_smarty_tpl->tpl_vars['i']->value) {
if (is_array($_smarty_tpl->tpl_vars['i']->value)) {?><a href="<?php echo $_smarty_tpl->tpl_vars['base_path']->value;?>
/module/list/<?php echo $_smarty_tpl->tpl_vars['id']->value;?>
" class="button button-<?php echo smarty_function_cycle(array('values'=>'red,blue,green,purple,orange,pink','name'=>'color'),$_smarty_tpl);?>
"><i class="icon icon-link"></i><?php echo $_smarty_tpl->tpl_vars['i']->value['name'];?>
 <span class="baloon"><?php echo $_smarty_tpl->tpl_vars['i']->value['count'];?>
</span></a><?php }
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
}?></div></div><?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
}
if (isset($_smarty_tpl->tpl_vars['modules']->value) && !empty($_smarty_tpl->tpl_vars['modules']->value)) {?><div class="clearfix"></div><?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['modules']->value, 'item', false, NULL, 'i', array (
));
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['item']->value) {
?><a href="<?php echo $_smarty_tpl->tpl_vars['base_path']->value;?>
/module/list/<?php echo $_smarty_tpl->tpl_vars['item']->value['id'];?>
" class="button button-<?php echo smarty_function_cycle(array('values'=>'red,blue,green,purple,orange,pink','name'=>'color'),$_smarty_tpl);?>
"><i class="icon icon-link"></i><?php echo $_smarty_tpl->tpl_vars['item']->value['name'];?>
 <span class="baloon"><?php echo $_smarty_tpl->tpl_vars['item']->value['count'];?>
</span></a><?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
}?></div><?php } else {
$_smarty_tpl->_subTemplateRender(((string)$_smarty_tpl->tpl_vars['TPL_PATH']->value)."/module/filter.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, true);
if ($_smarty_tpl->tpl_vars['meta_sort']->value) {
if (isset($_COOKIE['moduleSort'])) {
$_smarty_tpl->_assignInScope('mSort', unserialize($_COOKIE['moduleSort']));
}
$_smarty_tpl->_assignInScope('module_id', $_smarty_tpl->tpl_vars['module_id']->value);
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['meta_sort']->value, 'item');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['item']->value) {
$_smarty_tpl->_assignInScope('mSysName', $_smarty_tpl->tpl_vars['item']->value['sys_name']);
?><div>"<?php echo $_smarty_tpl->tpl_vars['item']->value['name'];?>
"<br /><select name="<?php echo $_smarty_tpl->tpl_vars['item']->value['sys_name'];?>
" onchange="setModuleSort(this, '<?php echo $_smarty_tpl->tpl_vars['module_id']->value;?>
', '<?php echo $_smarty_tpl->tpl_vars['item']->value['sys_name'];?>
')"><option value="">..выбрать</option><?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['item']->value['list'], 'it', false, 'k');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['k']->value => $_smarty_tpl->tpl_vars['it']->value) {
?><option value="<?php echo $_smarty_tpl->tpl_vars['k']->value;?>
"<?php if (isset($_smarty_tpl->tpl_vars['mSort']->value[$_smarty_tpl->tpl_vars['module_id']->value][$_smarty_tpl->tpl_vars['mSysName']->value]) && $_smarty_tpl->tpl_vars['mSort']->value[$_smarty_tpl->tpl_vars['module_id']->value][$_smarty_tpl->tpl_vars['mSysName']->value] == $_smarty_tpl->tpl_vars['k']->value) {?> selected="selected"<?php }?>><?php echo $_smarty_tpl->tpl_vars['it']->value;?>
 </option><?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>
</select></div><?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>
<div><b>Отобрать по</b></div><?php }
if ($_smarty_tpl->tpl_vars['is_recursive']->value) {?><p><b>Показывать:</b><?php if (isset($_COOKIE['show_as']) && $_COOKIE['show_as'] == 'table') {?><span class="show_as_table">таблицей</span><a href="<?php echo smarty_modifier_add2query($_SERVER['QUERY_STRING'],'show_as=tree');?>
" class="show_as_tree" onclick="setCookie('show_as','tree');redirect();return false;">деревом</a><?php } elseif (isset($_COOKIE['show_as']) && $_COOKIE['show_as'] == 'tree') {?><a href="<?php echo smarty_modifier_add2query($_SERVER['QUERY_STRING'],'show_as=table');?>
" class="show_as_table" onclick="setCookie('show_as','table');redirect();return false;">таблицей</a><span class="show_as_tree">деревом</span><?php } else { ?><span class="show_as_table">таблицей</span><a href="<?php echo smarty_modifier_add2query($_SERVER['QUERY_STRING'],'show_as=tree');?>
" class="show_as_tree" onclick="setCookie('show_as','tree');redirect();return false;">деревом</a><?php }?></p><?php }
if (isset($_COOKIE['show_as']) && $_COOKIE['show_as'] == "tree" && $_smarty_tpl->tpl_vars['is_recursive']->value) {?><table class="table" id="meta_data"><tr class="th"><th><?php echo $_smarty_tpl->tpl_vars['meta_module']->value['name'];?>
</th></tr></table><ul class="structure"><?php $_smarty_tpl->_subTemplateRender(((string)$_smarty_tpl->tpl_vars['TPL_PATH']->value)."/module/tree.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('a_tree'=>$_smarty_tpl->tpl_vars['meta_list_tree']->value), 0, true);
?>
</ul><?php } else {
$_smarty_tpl->_subTemplateRender(((string)$_smarty_tpl->tpl_vars['TPL_PATH']->value)."/module/table.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, true);
}
$_smarty_tpl->_subTemplateRender("file:system/pager.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
}
}
}

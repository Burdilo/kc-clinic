<?php
/* Smarty version 3.1.30, created on 2018-04-24 17:21:04
  from "/home/b/burdilo/kc-clinic.ru/public_html/protected/templates/admin/view/meta/module/table.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5adf3d50c27264_73922382',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '4b46ac22d1f748472c9c206ae669a104baf190b4' => 
    array (
      0 => '/home/b/burdilo/kc-clinic.ru/public_html/protected/templates/admin/view/meta/module/table.tpl',
      1 => 1505290502,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:system/controll.tpl' => 2,
  ),
),false)) {
function content_5adf3d50c27264_73922382 (Smarty_Internal_Template $_smarty_tpl) {
if (!is_callable('smarty_modifier_count_array')) require_once '/home/b/burdilo/kc-clinic.ru/public_html/protected/core/lib/templaters/smarty/plugins_cms/modifier.count_array.php';
if (!is_callable('smarty_function_math')) require_once '/home/b/burdilo/kc-clinic.ru/public_html/protected/core/lib/templaters/smarty/plugins/function.math.php';
?>
<table class="table" id="meta_data"><col width="30"><col width="30"><?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['meta_fields']->value, 'item');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['item']->value) {
if ($_smarty_tpl->tpl_vars['item']->value['in_list']) {
if ($_smarty_tpl->tpl_vars['item']->value['f_sys_name'] == 'ord') {?><col width="100"><?php } elseif ($_smarty_tpl->tpl_vars['item']->value['f_sys_name'] == 'visible') {?><col width="35"><?php } else { ?><col><?php }
}
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>
<col width="65"><thead><tr class="th"><?php $_smarty_tpl->_assignInScope('colspan', smarty_modifier_count_array($_smarty_tpl->tpl_vars['meta_fields']->value,"in_list","1","1"));
smarty_function_math(array('equation'=>"x+2",'x'=>$_smarty_tpl->tpl_vars['colspan']->value,'assign'=>"colspan"),$_smarty_tpl);?>
<th colspan="<?php echo $_smarty_tpl->tpl_vars['colspan']->value;?>
"><?php echo $_smarty_tpl->tpl_vars['meta_module']->value['name'];?>
</th></tr></thead><tbody><?php if (!empty($_smarty_tpl->tpl_vars['meta_list']->value)) {?><tr><td class="h"></td><td class="h checkbox-col"><?php $_smarty_tpl->_subTemplateRender("file:system/controll.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('type'=>"checkbox",'addclass'=>"controll_single",'name'=>"checkall",'onchange'=>"checkAll(this)"), 0, false);
?>
</td><?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['meta_fields']->value, 'item');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['item']->value) {
if ($_smarty_tpl->tpl_vars['item']->value['in_list']) {
if ($_smarty_tpl->tpl_vars['item']->value['f_sys_name'] == 'visible') {?><td class="h checkbox-col"><span class="icon icon-eye"></span></td><?php } else { ?><td class="h"><?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['item']->value['f_name']), ENT_QUOTES, 'UTF-8', true);?>
</td><?php }
}
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>
<td class="h"></td></tr><?php if (isset($_smarty_tpl->tpl_vars['meta_list']->value['result'])) {
$_smarty_tpl->_assignInScope('result', $_smarty_tpl->tpl_vars['meta_list']->value['result']);
} else {
$_smarty_tpl->_assignInScope('result', $_smarty_tpl->tpl_vars['meta_list']->value);
}
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['result']->value, 'item', false, NULL, 'i', array (
));
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['item']->value) {
$_smarty_tpl->_assignInScope('index', '0');
?><tr><td><i class="table__drag js-trigger-drag icon icon-menu"></i></td><td class="checkbox-col"><?php $_smarty_tpl->_subTemplateRender("file:system/controll.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('type'=>"checkbox",'addclass'=>"controll_single",'ctrlclass'=>"check-all-spy",'name'=>(("checked[").($_smarty_tpl->tpl_vars['item']->value['id'])).("]"),'value'=>$_smarty_tpl->tpl_vars['item']->value['id']), 0, true);
?>
</td><?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['item']->value, 'it', false, 'k');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['k']->value => $_smarty_tpl->tpl_vars['it']->value) {
if ($_smarty_tpl->tpl_vars['k']->value == "visible") {?><td class="tac va_m"><a href="/<?php echo $_smarty_tpl->tpl_vars['ADMIN_DIR']->value;?>
/meta/module/visible/<?php echo $_smarty_tpl->tpl_vars['meta_module']->value['id'];?>
/<?php echo $_smarty_tpl->tpl_vars['item']->value['id'];?>
" class="icon icon-eye<?php if ($_smarty_tpl->tpl_vars['it']->value == 0) {?>-off<?php }?> visible-link" onclick="return cp.toggleModule(this, event);" data-no-instant></a></td><?php } elseif ($_smarty_tpl->tpl_vars['k']->value == "ord") {?><td><?php echo $_smarty_tpl->tpl_vars['it']->value;?>
</td><?php } elseif ($_smarty_tpl->tpl_vars['k']->value != "id") {?><td><?php if ($_smarty_tpl->tpl_vars['index']->value == '0') {?><a href="<?php echo $_smarty_tpl->tpl_vars['base_path']->value;?>
/module/edit/<?php echo $_smarty_tpl->tpl_vars['meta_module']->value['id'];?>
/<?php echo $_smarty_tpl->tpl_vars['item']->value['id'];
if (isset($_smarty_tpl->tpl_vars['back_to_page']->value) && $_smarty_tpl->tpl_vars['back_to_page']->value !== '' && $_smarty_tpl->tpl_vars['back_to_page']->value > 0) {?>?back_to_page=<?php echo $_smarty_tpl->tpl_vars['back_to_page']->value;
}?>" class="module-item-link" title="Редактировать"><i class="icon icon-edit"></i> <?php echo stripslashes($_smarty_tpl->tpl_vars['it']->value);?>
</a><?php $_smarty_tpl->_assignInScope('index', '1');
} else {
echo stripslashes($_smarty_tpl->tpl_vars['it']->value);
}?></td><?php } elseif (is_array($_smarty_tpl->tpl_vars['it']->value)) {?><td><?php echo $_smarty_tpl->tpl_vars['it']->value['value_res'];?>
</td><?php }
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>
<td class="tac"><?php if ($_smarty_tpl->tpl_vars['check_dispatch']->value == "1") {?><a href="icon icon-envelope"><a href="<?php echo $_smarty_tpl->tpl_vars['base_path']->value;?>
/module/dispatch/<?php echo $_smarty_tpl->tpl_vars['meta_module']->value['id'];?>
/<?php echo $_smarty_tpl->tpl_vars['item']->value['id'];?>
" title="Разослать"></a><?php }?><a href="<?php echo $_smarty_tpl->tpl_vars['base_path']->value;?>
/module/edit/<?php echo $_smarty_tpl->tpl_vars['meta_module']->value['id'];?>
/<?php echo $_smarty_tpl->tpl_vars['item']->value['id'];
if (isset($_smarty_tpl->tpl_vars['back_to_page']->value) && $_smarty_tpl->tpl_vars['back_to_page']->value !== '' && $_smarty_tpl->tpl_vars['back_to_page']->value > 0) {?>?back_to_page=<?php echo $_smarty_tpl->tpl_vars['back_to_page']->value;
}?>" class="icon icon-edit" title="Редактировать"></a><a href="<?php echo $_smarty_tpl->tpl_vars['base_path']->value;?>
/module/del/<?php echo $_smarty_tpl->tpl_vars['meta_module']->value['id'];?>
/<?php echo $_smarty_tpl->tpl_vars['item']->value['id'];
if (isset($_smarty_tpl->tpl_vars['back_to_page']->value) && $_smarty_tpl->tpl_vars['back_to_page']->value !== '' && $_smarty_tpl->tpl_vars['back_to_page']->value > 0) {?>?back_to_page=<?php echo $_smarty_tpl->tpl_vars['back_to_page']->value;
}?>" class="icon icon-delete remove-trigger" title="Удалить" onclick="return cp.dialog('Вы действительно хотите удалить?')" data-no-instant></a></td></tr><?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
} else { ?><tr><td colspan="<?php echo smarty_modifier_count_array($_smarty_tpl->tpl_vars['meta_fields']->value,'in_list','1','1');?>
" class="center-middle">Данные отсутствуют</td></tr><?php }?></tbody></table><?php }
}

<?php
/* Smarty version 3.1.30, created on 2018-04-24 17:21:04
  from "/home/b/burdilo/kc-clinic.ru/public_html/protected/templates/admin/system/include.code.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5adf3d50dffef0_80459388',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'e6a37f364f575e34536c93f6f7785fbbe9790fc4' => 
    array (
      0 => '/home/b/burdilo/kc-clinic.ru/public_html/protected/templates/admin/system/include.code.tpl',
      1 => 1505290485,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5adf3d50dffef0_80459388 (Smarty_Internal_Template $_smarty_tpl) {
?>
<div id="clipsmodal" style="display: none;">
    <section>
        <ul class="redactor_clips_box">
            <li>
                <a href="#" class="redactor_clip_link">Lorem ipsum …</a>
                <div class="redactor_clip" style="display: none;">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
            </li>
            <li>
                <a href="#" class="redactor_clip_link">Red label</a>
                <div class="redactor_clip" style="display: none;">
                    <span class="label-red">Label</span>
                </div>
            </li>
            <li>
                <a href="#" class="redactor_clip_link">Green label</a>
                <div class="redactor_clip" style="display: none;">
                    <span class="label-green">Label</span>
                </div>
            </li>
            <li>
                <a href="#" class="redactor_clip_link">PHP Code</a>
                <div class="redactor_clip" style="display: none;">
                    <pre class="code"><code class="lang-php"></code></pre>
                </div>
            </li>
            <li>
                <a href="#" class="redactor_clip_link">Javascript Code</a>
                <div class="redactor_clip" style="display: none;">
                    <pre class="code"><code class="lang-js"></code></pre>
                </div>
            </li>
            <li>
                <a href="#" class="redactor_clip_link">Sql Code</a>
                <div class="redactor_clip" style="display: none;">
                    <pre class="code"><code class="lang-sql"></code></pre>
                </div>
            </li>
            <li>
                <a href="#" class="redactor_clip_link">Html Code</a>
                <div class="redactor_clip" style="display: none;">
                    <pre class="code"><code class="lang-html"></code></pre>
                </div>
            </li>
            <li>
                <a href="#" class="redactor_clip_link">Css Code</a>
                <div class="redactor_clip" style="display: none;">
                    <pre class="code"><code class="lang-css"></code></pre>
                </div>
            </li>
        </ul>
    </section>
    <footer>
        <a href="#" class="redactor_modal_btn redactor_btn_modal_close">Close</a>
    </footer>
</div>

<div id="alert" class="alert">
    <div id="alert-message" class="alert-message"></div> <a class="alert-close" id="alert-close"></a>
</div>

<?php echo '<script'; ?>
 type="text/html" id="tpl_dropdown_menu">
    <div class="popover popover_menu" id="popover-dropdown_menu">
        <span class="popover__triangle"></span>
        <ul class="dropdown-menu">
            <li><a href="./?cleancache=smarty&backuri=<?php echo $_smarty_tpl->tpl_vars['_backuri']->value;?>
"><?php echo t('template.cache');?>
</a></li>
            <li><a href="./?cleancache=memory&backuri=<?php echo $_smarty_tpl->tpl_vars['_backuri']->value;?>
"><?php echo t('data.cache');?>
</a></li>
            <li class="divider"></li>
            <li><a href="./?cleancache=styles&backuri=<?php echo $_smarty_tpl->tpl_vars['_backuri']->value;?>
"><?php echo t('cash.styles');?>
</a></li>
            <li><a href="./?cleancache=scripts&backuri=<?php echo $_smarty_tpl->tpl_vars['_backuri']->value;?>
"><?php echo t('script.cache');?>
</a></li>
            <li class="divider"></li>
            <li><a href="./?cleancache=config&backuri=<?php echo $_smarty_tpl->tpl_vars['_backuri']->value;?>
"><?php echo t('configuration.cache');?>
</a></li>
            <li><a href="./?cleancache=task&backuri=<?php echo $_smarty_tpl->tpl_vars['_backuri']->value;?>
"><?php echo t('task.list');?>
</a></li>
        </ul>
    </div>
<?php echo '</script'; ?>
>


<?php echo '<script'; ?>
 type="text/html" id="tpl_image_row">
<tr data-index="{{index}}">
    <td class="va_m"><input name="f_image_prefix[{{iteration}}][{{index}}]" class="latin ness tac" value="" maxlength="7"></td>
    <td class="va_t"><input name="f_image_width[{{iteration}}][{{index}}]" class="integer" value="0"></td>
    <td class="va_t"><input name="f_image_height[{{iteration}}][{{index}}]" class="integer" value="0"></td>
    <td class="va_t">
        <div class="option-group option-combo option-simple simple">
            <label title="Crop image"><input type="radio" name="f_image_photo_method[{{iteration}}][{{index}}]" value="crop"><span class="option"><i class="icon icon-crop-free"></i></span></label>
            <label title="Resize image"><input type="radio" name="f_image_photo_method[{{iteration}}][{{index}}]" value="resize" checked><span class="option"><i class="icon icon-photo-size-select-large"></i></span></label>
        </div>
    </td>
    <td class="va_m">
        {{#button}}
        <a href="#" class="js-size-delete"><i class="icon icon-delete"></i></a>
        {{/button}}
    </td>
</tr>
<?php echo '</script'; ?>
>
<?php }
}

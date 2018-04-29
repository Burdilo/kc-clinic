<?php
/* Smarty version 3.1.30, created on 2018-04-24 17:21:07
  from "/home/b/burdilo/kc-clinic.ru/public_html/protected/templates/themes/base/smarty/base.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5adf3d538f0eb5_17133340',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '2de3715bb15a2445e7be65db9492d145d4c14872' => 
    array (
      0 => '/home/b/burdilo/kc-clinic.ru/public_html/protected/templates/themes/base/smarty/base.tpl',
      1 => 1510579472,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:./meta.tpl' => 1,
    'file:./header.tpl' => 1,
    'file:./sidebar.tpl' => 1,
    'file:./footer.tpl' => 1,
    'file:./scripts.tpl' => 1,
  ),
),false)) {
function content_5adf3d538f0eb5_17133340 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_subTemplateRender("file:./meta.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
$_smarty_tpl->_subTemplateRender("file:./header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
<div class="layout-wrapper"><div class="overview"></div><div id="overlay"></div><div class="feedback__wrap"><form id="feedback"><a class="feedback_close">&times;</a><p class="feedback__title">Форма связи</p><p class="feedback__desc">Здравствуйте, через эту форму вы можете задать вопрос или оставить заявку на звонок от администрации КС-Клиник.</p><div class="feedback__item"><input type="text" name="name" placeholder="Ваше имя*" requared /></div><div class="feedback__item"><input type="text" name="phone" placeholder="Номер телефона*" requared /></div><div class="feedback__item"><textarea name="text" placeholder="Здесь вы можете написать свой вопрос или обращение" requared></textarea></div><div class="feedback__item"></div><div class="feedback__item"><a class="clear_all"></a><input type="submit" /></div></form></div><div class="feedback_success"><img src="/images/feedback_success.png"><p>Ваше сообщение успешно отправлено!<br>Мы свяжемся с Вами в ближайшее время.</p><a class="close_success">Закрыть</a></div><?php $_smarty_tpl->_subTemplateRender("file:./sidebar.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
<div class="layout-wrapper__container"><?php $_smarty_tpl->_subTemplateRender(((string)$_smarty_tpl->tpl_vars['PATH_THEMES']->value)."/system/breadcrumbs.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, true);
?>
<section class="content clearfix" itemprop="mainContentOfPage" role="main"><a name="content"></a><?php if ($_smarty_tpl->tpl_vars['_page']->value['name']) {
if ($_smarty_tpl->tpl_vars['uri']->value[0] != '') {?><h1><?php echo $_smarty_tpl->tpl_vars['_page']->value['name'];?>
</h1><?php }
}
echo $_smarty_tpl->tpl_vars['_page']->value['content'];?>
</section><div class="cb"></div></div><?php $_smarty_tpl->_subTemplateRender("file:./footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
</div><?php $_smarty_tpl->_subTemplateRender("file:./scripts.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
}
}

{strip}
<table class="table">
    <col>
    <col width="200">
    <col width="150">
    <col width="150">
    <col width="120">
    <col width="65">
    <thead>
        <tr>
            <th colspan="6">Список зон блоков</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="h">{t('titles.name')}</td>
            <td class="h">Код вывода</td>
            <td class="h">Системное имя <span class="ness_color">*</span></td>
            <td class="h">Шаблон страницы</td>
            <td class="h">Блок активен</td>
            <td class="h"></td>
        </tr>
        {foreach item=item from=$list_form name=i}
        <tr>
            <td><a href="{$base_path}/index/edit/{$item.id}/" title="Редактировать" class="module-item-link"><i class="icon icon-edit"></i> {$item.name}</a></td>
            <td><span class="inner-copy j-clipboard" data-clipboard="{literal}{{/literal}zone item='{$item.sys_name}'{literal}}{/literal}">&#123;zone item='{$item.sys_name}'&#125;</span></td>
            <td>{$item.sys_name}</td>
            <td>{$item.tid}</td>
            <td>{if $item.visible}Да{else}Нет{/if}</td>
            <td class="tac">
                <a href="{$base_path}/index/edit/{$item.id}/" class="icon icon-edit" title="Редактировать"></a>
                <a href="{$base_path}/index/del/{$item.id}/" class="icon icon-delete remove-trigger" title="Удалить" onclick="return cp.dialog('Вы действительно хотите удалить зону?');" data-no-instant></a>
            </td>
        </tr>
        {foreachelse}
        <tr>
            <td colspan="5" class="center-middle">Зон нет</td>
        </tr>
        {/foreach}
    </tbody>
</table>

<a href="{$base_path}/index/add/" class="button button-blue"><i class="icon icon-plus-square"></i>Добавить зону</a>
{/strip}
{strip}
<table class="table" id="meta_data">
    <col>
    <col width="180">
    <col width="200">
    <col width="65">
    <thead>
        <tr>
            <th colspan="4">{t('titles.lists')}</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="h">{t('titles.list.name')}</td>
            <td class="h">Системное имя (bind)</td>
            <td class="h">Кол-во элементов в списке</td>
            <td class="h"></td>
        </tr>
        {foreach item=item from=$mdd_list name=i}
        <tr>
            <td><a href="{$base_path}/lists/edit/{$item.list_name}/" title="Редактировать" class="module-item-link"><i class="icon icon-edit"></i> {$item.name}</a></td>
            <td>{$item.list_name}</td>
            <td>{$item.count}</td>
            <td class="tac">
                <a href="{$base_path}/lists/edit/{$item.list_name}/" class="icon icon-edit" title="Редактировать"></a>
                <a href="{$base_path}/lists/del/{$item.list_name}/" class="icon icon-delete remove-trigger" title="Удалить" onclick="return cp.dialog('Вы действительно хотите удалить модуль и все что связанно с ним?');" data-no-instant></a>
            </td>
        </tr>
        {/foreach}
    </tbody>
</table>

<div class="button-container clearfix">
    <a href="{$base_path}/lists/add/" class="button button-blue"><i class="icon icon-plus-square"></i>Добавить новый список</a>    
</div>
{/strip}
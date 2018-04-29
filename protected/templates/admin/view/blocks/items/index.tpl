{strip}
<table class="table">
    <col>
    <col width="200">
    <col width="180">
    <col width="150">
    <col width="140">
    <col width="100">
    <col width="90">
    <col width="65">
    <thead>
        <tr>
            <th colspan="8">Список блоков</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="h">Название блока</td>
            <td class="h">Код вывода</td>
            <td class="h">Зона блока</td>
            <td class="h">Локализация</td>
            <td class="h">Модуль</td>
            <td class="h">Сортировка</td>
            <td class="h">Активен</td>
            <td class="h"></td>
        </tr>
        {foreach item=item from=$blocks_list name=i}
        <tr>
            <td><a href="{$base_path}/items/edit/{$item.id}/" title="Редактировать" class="module-item-link"><i class="icon icon-edit"></i> {$item.name}</a></td>
            <td><span class="inner-copy j-clipboard" data-clipboard="{literal}{{/literal}unit item='{$item.id}'{literal}}{/literal}">&#123;unit item='{$item.id}'&#125;</span></td>
            <td>
                {if isset($list_form[$item.pid].name)}
                    {$list_form[$item.pid].name}
                {/if}
            </td>
            <td>{$item.locale}</td>
            <td>{$item.module}</td>

            <td>{$item.ord}</td>
            <td>{if $item.visible}Да{else}Нет{/if}</td>
            <td class="tac">
                <a href="{$base_path}/items/edit/{$item.id}/" class="icon icon-edit" title="Редактировать"></a>
                <a href="{$base_path}/items/del/{$item.id}/" class="icon icon-delete remove-trigger" title="Удалить" onclick="return cp.dialog('Вы действительно хотите удалить блок?');"></a>
            </td>
        </tr>
        {foreachelse}
        <tr>
            <td colspan="6" class="center-middle">Элементов нет</td>
        </tr>
        {/foreach}
    </tbody>
</table>

<a href="{$base_path}/items/add/" class="button button-blue"><i class="icon icon-plus-square"></i>Добавить блок</a>
{/strip}
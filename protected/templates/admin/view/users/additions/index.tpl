{strip}
<table class="table">
    <col>
    <col>
    <col width="280">
    <col width="100">
    <col width="60">
    <thead>
        <tr>
            <th>{t('titles.name')}</th>
            <th>Сист. имя</th>
            <th>Обяз-но для заполнения</th>
            <th>Сортировка</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
    {if isset($userAdditions ) && !empty( $userAdditions )}
        {foreach item=item from=$userAdditions name=i}
        <tr>
            <td><a href="{$base_path}/additions/edit/{$item.id}/" title="Редактировать" class="module-item-link"><i class="icon icon-edit"></i> {$item.name}</a></td>
            <td>{$item.sys_name}</td>
            <td class="va_m">
                {if $item.necess}
                    <span class="color-red">да</span>
                {else}
                    <span class="color-green">нет</span>
                {/if}
            </td>
            <td>{$item.ord}</td>
            <td class="tac">
                <a href="{$base_path}/additions/edit/{$item.id}/" class="icon icon-edit" title="Редактировать"></a>
                <a href="{$base_path}/additions/del/{$item.id}/" class="icon icon-delete remove-trigger" title="Удалить" onclick="return cp.dialog('Вы действительно хотите удалить поле?');" data-no-instant></a>
            </td>
        </tr>
        {/foreach}
    {else}
        <tr>
            <td colspan="5" class="center-middle"><b>Нет данных</b></td>
        </tr>
    {/if}
    </tbody>
</table>

<a href="{$base_path}/additions/add/" class="button button-blue"><i class="icon icon-plus-square"></i>Добавить дополнительные поля</a>
{/strip}
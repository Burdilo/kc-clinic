{strip}
<table class="table" id="meta_data">
    <col width="30">
    <col width="30">
    {foreach item=item from=$meta_fields}
        {if $item.in_list}
            {if $item.f_sys_name == 'ord'}
                <col width="100">
            {elseif $item.f_sys_name == 'visible'}
                <col width="35">
            {else}
                <col>
            {/if}
        {/if}
    {/foreach}
    <col width="65">
    <thead>
        <tr class="th">
            {assign var="colspan" value=$meta_fields|count_array:"in_list":"1":"1"}
            {math equation="x+2" x=$colspan assign="colspan"}
            <th colspan="{$colspan}">{$meta_module.name}</th>
        </tr>
    </thead>
    <tbody>
    {if !empty( $meta_list )}
        <tr>
            <td class="h"></td>
            <td class="h checkbox-col">
                {include file="system/controll.tpl"
                    type        =   "checkbox"
                    addclass    =   "controll_single"
                    name        =   "checkall"
                    onchange    =   "checkAll(this)"
                }
            </td>
            {foreach item=item from=$meta_fields}
                {if $item.in_list}
                    {if $item.f_sys_name == 'visible'}
                        <td class="h checkbox-col">
                            <span class="icon icon-eye"></span>
                        </td>
                    {else}
                        <td class="h">{$item.f_name|strip_tags|escape}</td>
                    {/if}
                {/if}
            {/foreach}
            <td class="h"></td>
        </tr>
        
        {if isset($meta_list.result )}
            {assign var='result' value=$meta_list.result}
        {else}
            {assign var='result' value=$meta_list}
        {/if}
        
        {foreach item=item from=$result name=i}
            {assign var="index" value='0'}
            <tr>
                <td><i class="table__drag js-trigger-drag icon icon-menu"></i></td>
                <td class="checkbox-col">
                    {include file="system/controll.tpl"
                        type        =   "checkbox"
                        addclass    =   "controll_single"
                        ctrlclass   =   "check-all-spy"
                        name        =   "checked["|cat:$item.id|cat:"]"
                        value       =   $item.id
                    }
                </td>
                {foreach item=it from=$item key=k}
                    {if $k == "visible"}
                        <td class="tac va_m">
                            <a href="/{$ADMIN_DIR}/meta/module/visible/{$meta_module.id}/{$item.id}" class="icon icon-eye{if $it == 0}-off{/if} visible-link" onclick="return cp.toggleModule(this, event);" data-no-instant></a>
                        </td>
                    {elseif $k == "ord"}
                        <td>{$it}</td>
                    {elseif $k != "id"}
                        <td>
                            {if $index == '0'}
                                <a href="{$base_path}/module/edit/{$meta_module.id}/{$item.id}{if isset($back_to_page) && $back_to_page !== '' && $back_to_page > 0}?back_to_page={$back_to_page}{/if}" class="module-item-link" title="Редактировать"><i class="icon icon-edit"></i> {$it|stripslashes}</a>
                                {assign var="index" value='1'}
                            {else}
                                {$it|stripslashes}
                            {/if}
                        </td>
                    {elseif is_array($it)}
                        <td>{$it.value_res}</td>
                    {/if}
                {/foreach}
                <td class="tac">
                    {if $check_dispatch=="1"}
                        <a href="icon icon-envelope"><a href="{$base_path}/module/dispatch/{$meta_module.id}/{$item.id}" title="Разослать"></a>
                    {/if}
                    <a href="{$base_path}/module/edit/{$meta_module.id}/{$item.id}{if isset($back_to_page ) && $back_to_page !== '' && $back_to_page > 0}?back_to_page={$back_to_page}{/if}" class="icon icon-edit" title="Редактировать"></a>
                    <a href="{$base_path}/module/del/{$meta_module.id}/{$item.id}{if isset($back_to_page ) && $back_to_page !== '' && $back_to_page > 0}?back_to_page={$back_to_page}{/if}" class="icon icon-delete remove-trigger" title="Удалить" onclick="return cp.dialog('Вы действительно хотите удалить?')" data-no-instant></a>
                </td>
            </tr>
        {/foreach}
    {else}
        <tr>
            <td colspan="{$meta_fields|@count_array:'in_list':'1':'1'}" class="center-middle">Данные отсутствуют</td>
        </tr>
    {/if}    
    </tbody>
</table>
{/strip}
{strip}
<div class="button-container clearfix">
	<div class="button-container-limit">
		<select name="limit" onchange="setModuleLimit(this, '33')">
			<option value="">На странице</option>
			<option value="5">5</option>
			<option value="10">10</option>
			<option value="15">15</option>
			<option value="20">20</option>
			<option value="25">25</option>
			<option value="30">30</option>
			<option value="35">35</option>
		</select>
	</div>
	<a href="{$base_path}/tags/add" class="button button-blue"><i class="icon icon-plus-square"></i>Добавить тег</a>
</div>

<table class="table orders-table">
<colgroup>
	<col width="30">
	<col>
	<col width="40">
</colgroup>
<thead>
	<tr>
		<th class="checkbox-col">
			{include file="system/controll.tpl"
				type        =   "checkbox"
				addclass    =   "controll_single"
				name        =   "order"
				onchange    =   "checkAll(this)"
			}
		</th>
		<th>Наименование</th>
		<th>Действия</th>
	</tr>
</thead>
<tbody>
{if $tags}
	{foreach $tags as $key => $tag}
	<tr data-id="{$tag.id}" class="tags-row">
		<td class="checkbox-col">
		    {include file="system/controll.tpl"
		        type        =   "checkbox"
		        addclass    =   "controll_single"
		        ctrlclass   =   "check-all-spy"
		        name        =   "order["|cat:$tag.id|cat:"]"
		        value       =   $tag.id
		    }
		</td>
		<td><a href="{$base_path}/tags/edit/{$tag.id}?backuri={$_backuri}" class="p-link1">{$tag.name}</a></td>
		<td class="tac">
	        <a href="{$base_path}/tags/edit/{$tag.id}?backuri={$_backuri}" class="icon icon-edit" title="Редактировать"></a>
	        <a href="{$base_path}/tags/del/{$tag.id}?backuri={$_backuri}" class="icon icon-delete remove-trigger" title="Удалить" onclick="return cp.dialog('Вы действительно хотите удалить?')" data-no-instant></a>
	    </td>
	</tr>
	{/foreach}
{else}
	<tr>
		<td colspan="7" class="empty-row">
			Тегов нет
		</td>
	</tr>
{/if}
</tbody>
</table>
{/strip}
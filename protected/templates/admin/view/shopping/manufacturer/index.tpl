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
	<a href="{$base_path}/manufacturer/add" class="button button-blue"><i class="icon icon-plus-square"></i>Добавить тег</a>
</div>

<table class="table orders-table">
<colgroup>
	<col width="30">
	<col>
	<col width="250">
	<col width="80">
	<col width="70">
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
		<th>Системное имя</th>
		<th>Публикация</th>
		<th>Порядок</th>
		<th>Действия</th>
	</tr>
</thead>
<tbody>
{if $manufacturer}
	{foreach $manufacturer as $key => $man}
	<tr data-id="{$man.id}" class="manufacturer-row">
		<td class="checkbox-col">
		    {include file="system/controll.tpl"
		        type        =   "checkbox"
		        addclass    =   "controll_single"
		        ctrlclass   =   "check-all-spy"
		        name        =   "order["|cat:$man.id|cat:"]"
		        value       =   $man.id
		    }
		</td>
		<td><a href="{$base_path}/manufacturer/edit/{$man.id}?backuri={$_backuri}" class="p-link1">{$man.name}</a></td>
		<td>{$man.system}</td>
		<td>
			{if $user.active == 1}
			<span class="label green">Опубликован</span>
			{else}
			<span class="label amber">Не опубликован</span>
			{/if}
		</td>
		<td>{$man.ord}</td>
		<td class="tac">
	        <a href="{$base_path}/manufacturer/edit/{$man.id}?backuri={$_backuri}" class="icon icon-edit" title="Редактировать"></a>
	        <a href="{$base_path}/manufacturer/del/{$man.id}?backuri={$_backuri}" class="icon icon-delete remove-trigger" title="Удалить" onclick="return cp.dialog('Вы действительно хотите удалить?')" data-no-instant></a>
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
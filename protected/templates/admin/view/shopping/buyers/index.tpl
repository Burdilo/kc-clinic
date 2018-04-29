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
	<a href="{$base_path}/buyers/add" class="button button-blue"><i class="icon icon-plus-square"></i>Добавить покупателя</a>
	
	{*
	<a href="" class="button button-gray"><i class="icon icon-settings"></i>Настройки модуля</a>
	*}
</div>

<table class="table orders-table">
<colgroup>
	<col width="30">
	<col width="250">
	<col>
	<col>
	<col>
	<col>
	<col>
	<col>
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
		<th>Имя</th>
		<th>E-mail</th>
		<th>Дата рождения</th>
		<th>Телефон</th>
		<th>Статус</th>
		<th>Доступ к <span class="is-tooltip" title="личному кабинету">ЛК</span></th>
		<th>Баланс / Бонусы</th>
		<th>Действия</th>
	</tr>
</thead>
<tbody>
{if $users}
	{foreach $users as $key => $user}
	<tr data-id="{$product.id}" class="product-row">
		<td class="checkbox-col">
		    {include file="system/controll.tpl"
		        type        =   "checkbox"
		        addclass    =   "controll_single"
		        ctrlclass   =   "check-all-spy"
		        name        =   "order["|cat:$item.id|cat:"]"
		        value       =   $item.id
		    }
		</td>

		<td><a href="{$base_path}/buyers/edit/{$user.id}?backuri={$_backuri}" class="p-link1">{$user.name}</a></td>
		<td>{$user.email}</td>
		<td>{$user.birthday}</td>
		<td>{$user.phone}</td>
		<td>
			{if $user.status == 1}
			<span class="label green">Подтвердил регистрацию</span>
			{else}
			<span class="label amber">Не подтвердил регистрацию</span>
			{/if}
		</td>
		<td>
			{if $user.active == 1}
			<span class="label green">Разрешен</span>
			{else}
			<span class="label amber">Заблокирован</span>
			{/if}
		</td>
		<td>{$user.bonus} / {$user.balance}</td>

		<td class="tac">
	        <a href="{$base_path}/buyers/edit/{$user.id}?backuri={$_backuri}" class="icon icon-edit" title="Редактировать"></a>
	        <a href="{$base_path}/buyers/del/{$user.id}?backuri={$_backuri}" class="icon icon-delete remove-trigger" title="Удалить" onclick="return cp.dialog('Вы действительно хотите удалить?')" data-no-instant></a>
	    </td>
	</tr>
	{/foreach}
{else}
	<tr>
		<td colspan="7" class="empty-row">
			Зарегистрированных покупателей нет
		</td>
	</tr>
{/if}
</tbody>
</table>
{/strip}
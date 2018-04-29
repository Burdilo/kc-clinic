{*
https://my.ecwid.com/cp/CP.html#product:mode=edit&id=49913700&return=products
*}

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
	<a href="{$base_path}/catalog/add" class="button button-blue"><i class="icon icon-plus-square"></i>Добавить товар</a>
	<a href="" class="button button-gray"><i class="icon icon-settings"></i>Настройки модуля</a>
</div>

<table class="table orders-table">
<colgroup>
	<col width="30">
	<col width="30">
	<col width="170">
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
		<th>№</th>
		<th>Категория</th>
		<th>Товар</th>
		<th>Модификации и цены</th>
		<th>Остаток, ед.</th>
		<th>Действия</th>
	</tr>
</thead>
<tbody>
{if $products}
	{foreach from=$products item=product}
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
		
		<td>{$product.id}</td>
		
		<td>
			{if isset($product.category.name)}
				{$product.category.name}
			{else}
				<span class="label bg-light">Не указана</span>
			{/if}
		</td>
		
		<td>
			<img class="uploads" src="{$product.photo.file}">
			
			<a href="{$base_path}/catalog/edit/{$product.id}?backuri={$_backuri}" title="Редактировать">{$product.name}</a>
			
			{$product.article}
		</td>

		<td>
			<table class="variant-row-table">
				<tbody>
					<tr>
						<td>XL</td>
						<td><input style="width: 45px;" type="text" value="{$product.price}" class="fastsave"></td>
						<td><input style="width: 45px;" type="text" value="{$product.old_price}" class="fastsave"></td>
						<td>руб.</td>
					</tr>
				</tbody>
			</table>
		</td>

		<td>
			<input style="width: 25px;" type="text" value="{$product.balance}∞" class="fastsave"> шт.
		</td>

	    <td class="tac">
	    	{$product.gid}
	    	{$product.uid}
	    	{$product.ord}
	    	{$product.visible}
	        <a href="{$base_path}/catalog/edit/{$product.id}?backuri={$_backuri}" class="icon icon-edit" title="Редактировать"></a>
	        <a href="{$base_path}/catalog/del/{$product.id}?backuri={$_backuri}" class="icon icon-delete remove-trigger" title="Удалить" onclick="return cp.dialog('Вы действительно хотите удалить?')" data-no-instant></a>
	    </td>

	</tr>
	{/foreach}
{else}
	<tr>
		<td colspan="7" class="empty-row">
			В каталоге нет товаров
		</td>
	</tr>
{/if}
</tbody>
</table>

{*
<select name="operation" class="product-operation">       
	<option value="activity_0">Сделать отмеченные товары неактивными</option> 
	<option value="activity_1">Сделать отмеченные товары активными</option> 
	<option value="recommend_1">Добавить отмеченные товары в рекомендуемые</option> 
	<option value="recommend_0">Исключить отмеченные товары из рекомендуемых</option> 
	<option value="new_1">Добавить отмеченные товары в новинки</option> 
	<option value="new_0">Исключить отмеченные товары из новинок</option> 
	<option value="clone">Клонировать отмеченные товары</option> 
	<option value="getcsv">Выгрузить отмеченные продукты в CSV</option> 
	<option value="getyml">Выгрузить отмеченные продукты в YML</option> 
	<option value="changecur_RUR">Пересчитать валюту в RUR</option>
	<option value="changecur_UAH">Пересчитать валюту в UAH</option>
	<option value="changecur_USD">Пересчитать валюту в USD</option>
	<option value="changecur_EUR">Пересчитать валюту в EUR</option>
	<option value="delete">Удалить выделенные товары</option> 
</select>

<a href="javascript:void(0);" class="run-operation custom-btn"><span>Выполнить</span></a>
*}
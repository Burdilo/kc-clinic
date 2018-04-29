<script type="text/html" id="tpl_status_payment">
	<div class="popover" id="popover-status_payment">
		<span class="popover__triangle"></span>
		<ul>
		{foreach from=$settings.status_payment item=item}
			<li>
				{include file="system/controll.tpl"
                    type        =   "radio"
                    needle		= 	"0"
                    addclass    =   "controll_fill"
                    name        =   "payment[]"
                    value       =   $item.value
                    text       	=   $item.variable
                }
			</li>
		{/foreach}
		</ul>
	</div>
</script>

<script type="text/html" id="tpl_status_delivery">
	<div class="popover" id="popover-status_delivery">
		<span class="popover__triangle"></span>
		<ul>
		{foreach from=$settings.status_delivery item=item}
			<li>
				{include file="system/controll.tpl"
                    type        =   "radio"
                    needle		= 	"0"
                    addclass    =   "controll_fill"
                    name        =   "delivery[]"
                    value       =   $item.value
                    text       	=   $item.variable
                }
			</li>
		{/foreach}
		</ul>
	</div>
</script>

<div class="section-order">
	{*
	<div class="widget-table-title">
		<h4 class="product-order-icon">Заказы магазина</h4>
		<p class="produc-count">Всего заказов: <strong>8</strong> шт.</p>
	</div>
	*}

	<table class="table orders-table">
	<colgroup>
		<col width="30">
		<col>
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
            <th class="order-number">№ заказа</th>
			<th>Ф.И.О. покупателя</th>
			<th>Электронный адрес</th>
			<th>Состав заказа</th>
			<th>Способ доставки</th>
			<th>Способ оплаты</th>
			<th>Стоимость</th>
			<th>Статус</th>
			<th>Дата и время добавления</th>
			<th class="actions">Действия</th>
		</tr>
	</thead>
	<tbody class="order-tbody">
	{if isset($orders)}
	{foreach from=$orders item=item}
		<tr>
			<td class="checkbox-col">
                {include file="system/controll.tpl"
                    type        =   "checkbox"
                    addclass    =   "controll_single"
                    ctrlclass   =   "check-all-spy"
                    name        =   "order["|cat:$item.id|cat:"]"
                    value       =   $item.id
                }
            </td>
			<td>{$item.number}</td>
			<td>{$item.user.name}</td>
			<td>{$item.user.email}</td>
			<td>[ <a href="">Просмотр</a> ]</td>
			<td>{$item.delivery}</td>
			<td>{$item.payment}</td>
			<td>{$item.cost} руб.</td>
			<td class="order-col">
				<span class="orders-status trigger-popover" data-popover="status_payment"><span class="orders-status__text">{$item.status_payment}</span> <i class="icon icon-caret-down-circle"></i></span>
				<span class="orders-status trigger-popover" data-popover="status_delivery"><span class="orders-status__text">{$item.status_delivery}</span> <i class="icon icon-caret-down-circle"></i></span>
			</td>
			<td class="add_date">{$item.date}</td>
			<td class="actions">
			
				<ul class="action-list">
					<li class="see-order" id="8" data-number="M-0108"><a class="tool-tip-bottom" href="javascript:void(0);"></a></li>
					<li class="order-to-csv"><a data-id="8 " class="tool-tip-bottom" href="javascript:void(0);"></a></li>
					<li class="order-to-pdf"><a data-id="8" class="tool-tip-bottom" href="javascript:void(0);"></a></li>
					<li class="order-to-print"><a data-id="8" class="tool-tip-bottom" href="javascript:void(0);"></a></li>
					<li class="clone-row" id="8"><a class="tool-tip-bottom" href="javascript:void(0);"></a></li>
					<li class="delete-order " id="8"><a class="tool-tip-bottom" href="javascript:void(0);"></a></li>
				</ul>

			</td>
		</tr>
	{/foreach}
	{/if}
	</tbody>
	</table>
	
	{*
	Присвоить заказам статус:
	<select name="operation" class="order-operation">
		<option value="status_id_5">Выполнен</option>
		<option value="status_id_4">Отменен</option>
		<option value="status_id_3">В доставке</option>
		<option value="status_id_2">Оплачен</option>
		<option value="status_id_1">Ожидает оплаты</option>
		<option value="status_id_0">Не подтвержден</option>
	</select>

	<a href="">Удалить отмеченные заказы</a>
	
	<button class="button">Выполнить</button>
	*}
</div>

{*
<br>
<br>
<br>

<table>
<tbody><tr>
<td>Всего продано на сумму:</td>
<td>31,015.00 p.</td>
</tr>
<tr>
<td>Всего продано в этом году на сумму:</td>
<td>15,005.00 p.</td>
</tr>
<tr>
<td>Всего заказов:</td>
<td>3</td>
</tr>
<tr>
<td>Всего покупателей:</td>
<td>0</td>
</tr>
<tr>
<td>Покупателей, ожидающих подтверждения:</td>
<td>0</td>
</tr>
<tr>
<td>Отзывов, ожидающих подтверждения:</td>
<td>0</td>
</tr>
<tr>
<td>Количество партнёров:</td>
<td>0</td>
</tr>
<tr>
<td>Партнёров, ожидающих подтверждения:</td>
<td>0</td>
</tr>
</tbody></table>
*}
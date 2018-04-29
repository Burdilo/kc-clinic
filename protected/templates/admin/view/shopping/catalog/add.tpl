{strip}

{include file="./template.tpl"}

<form action="" method="post" enctype="multipart/form-data" name="meta_form">
    <input type="hidden" name="form_action" value="add">
    
    {include file="fields/meta.tpl"
        title           =   ""
        keywords        =   ""
        description     =   ""
        robots          =   ""
    }

    <table class="table">
        <col width="200">
        <col>
        <thead>
            <tr>
                <th colspan="2">{t('contents.title')}</th>
            </tr>
        </thead>
        <tbody>

           	<tr>
                <td class="h">Наименование:</td>
                <td>
                    <input name="name">
                </td>
            </tr>

            <tr>
                <td class="h">Системное имя:</td>
                <td>
                    <input name="system" class="js-binding" data-binding-name="name" data-binding-element="system">
                </td>
            </tr>

			<tr>
                <td class="h">Категория:</td>
                <td>
                  	<select name="category">
					    <option value="0">Родительская категория</option>
					    {include file="fields/select_tree.tpl"
					        name            =   'category'
					        tree            =   $category_list
					        children        =   'tree'
					        value_key       =   'id'
					        value_name      =   'name'
					    }
					</select>
                </td>
            </tr>

            <tr>
                <td class="h">Артикул:</td>
                <td>
                    <input name="article" class="width-25">
                </td>
            </tr>

            <tr>
                <td class="h">Название модификации:</td>
                <td>
                    <input name="mod_name" value="{$product.mod_name}" class="width-25">
                </td>
            </tr>

            <tr>
                <td class="h">Стоимость:</td>
                <td>
                    <input name="price" value="{$product.price}" class="width-25 float">
                </td>
            </tr>

            <tr>
                <td class="h va_t">Модификации:</td>
                <td>
                	
                	<table class="variant-row-table js-template-wrapper">
                		<thead>
                			<td class="h">Наименование</td>
                			<td class="h">Артикул</td>
                			<td class="h">Стоимость</td>
                			<td class="h">Старая цена</td>
                            <td class="h">Остаток:</td>
                			<td class="h">Отображать:</td>
                			<td class="h"></td>
                		</thead>
						<tbody>
							<tr class="variant-row-table__empty">
								<td colspan="7">
									Модификации не добавлены
								</td>
							</tr>
						</tbody>
						<tfoot>
							<tr>
								<td colspan="7">
									<a class="button button-gray fr js-add-template" href="#" data-template="tmpl-modification" data-iteration="-1"><i class="icon icon-plus-square"></i>Добавить модификацию</a>
								</td>
							</tr>
						</tfoot>
					</table>

                </td>
            </tr>

            <tr>
                <td class="h">Фотографии:</td>
                <td>
                    {include file="fields/image.tpl"
                        action      =   $fields.action
                        name        =   $fields.name
                        list        =   $fields.list
                        value       =   $fields.value
                        settings    =   $fields.settings
                    }
                </td>
            </tr>
			
			<tr>
                <td class="h va_t">Параметры:</td>
                <td>
                	<table class="variant-row-table js-template-wrapper">
                		<thead>
                			<td class="h">Наименование</td>
                			<td class="h">Значение</td>
                			<td class="h"></td>
                		</thead>
						<tbody>
						<tr class="variant-row-table__empty">
							<td colspan="3">
								Свойства не указаны
							</td>
						</tr>
						</tbody>
						<tfoot>
							<tr>
								<td colspan="3">
									<a class="button button-gray fr js-add-template" href="#" data-template="tmpl-properties" data-iteration="-1"><i class="icon icon-plus-square"></i>Добавить свойство</a>
								</td>
							</tr>
						</tfoot>
					</table>
                </td>
            </tr>
			
			<tr>
                <td class="h">Описание:</td>
                <td>
	                {include file="fields/redactor.tpl"
	                    type        =   'imperavi'
	                    name        =   'description'
	                    value       =   ""
	                }
                </td>
            </tr>
			
            <tr>
                <td class="h">Отображать:</td>
                <td>
                    {include file="system/group.tpl"
                        name    = "visible"
                        list    = [
                            [ value => 1, text => "Да", checked => true ],
                            [ value => 0, text => "Нет" ]
                        ]
                    }
                </td>
            </tr>

            <tr>
                <td class="h">Порядок:</td>
                <td>
                    <input name="ord" class="ord integer reducing-trigger" value="{$products.ord}">
                </td>
            </tr>

       	</tbody>
   </table>

    {include file="system/buttons.tpl"}
</form>
{/strip}
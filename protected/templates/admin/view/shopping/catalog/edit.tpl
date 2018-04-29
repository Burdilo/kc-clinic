{if $product nocache}
{strip}

{include file="./template.tpl"}

{if isset($smarty.get.msg ) && $smarty.get.msg == "apply"}
<div class="apply">Данные были успешно сохранены!</div>
{/if}

<form action="" method="post" enctype="multipart/form-data" name="meta_form">
    <input type="hidden" name="form_action" value="edit">
    <input type="hidden" name="id" value="{$product.id}">
    
    {include file="fields/meta.tpl"
        title           =   $product.meta_title
        keywords        =   $product.meta_keywords
        description     =   $product.meta_description
        robots          =   $product.meta_robots
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
                    <input name="name" value="{$product.name}">
                </td>
            </tr>

            <tr>
                <td class="h">Системное имя:</td>
                <td>
                    <input name="system" value="{$product.system}" class="js-binding" data-binding-name="name" data-binding-element="system">
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
					        selected        =   $product.category
					    }
					</select>
                </td>
            </tr>

            <tr>
                <td class="h">Артикул:</td>
                <td>
                    <input name="article" value="{$product.article}" class="width-25">
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
							<tr class="variant-row-table__empty{if $product.modification} disable{/if}">
								<td colspan="7">
									Модификации не добавлены
								</td>
							</tr>

							{if $product.modification}
								{foreach from=$product.modification item=mod}
									<tr>
										<td><input name="modification[mod_name][{$mod.id}]" value="{$mod.mod_name}" class="ness"></td>
										<td><input name="modification[article][{$mod.id}]" value="{$mod.article}"></td>
										<td><input name="modification[price][{$mod.id}]" value="{$mod.price}" class="float"></td>
										<td><input name="modification[old_price][{$mod.id}]" value="{$mod.old_price}" class="float"></td>
										<td>
											<table class="no-border no-padding">
												<tr>
													<td class="vam"><input name="modification[balance][{$mod.id}]" value="{$mod.balance}" class="integer"></td>
													<td>&nbsp;</td>
													<td class="vam">
														{include file="system/controll.tpl"
												            type        =   "checkbox"
												            name        =   "modification"|cat:"[infinity]"|cat:"["|cat:$mod.id|cat:"]"
												            value       =   1
                                                            needle      =   $mod.infinity
												            text		=	"∞"
												        }
													</td>
												</tr>
											</table>
										</td>
                                        <td>
                                            {include file="system/group.tpl"
                                                name    =   "modification"|cat:"[visible]"|cat:"["|cat:$mod.id|cat:"]"
                                                check   =   $mod.visible
                                                list    =   [
                                                    [ value => 1, text => "Да", checked => true ],
                                                    [ value => 0, text => "Нет" ]
                                                ]
                                            }
                                        </td>
										<td><a href="" class="icon icon-delete remove-trigger" title="Удалить" onclick="return cp.dialog('Вы действительно хотите удалить модификацию?')" data-no-instant></a></td>
									</tr>
								{/foreach}
		                	{/if}
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
						<tr class="variant-row-table__empty{if $product.storage.properties} disable{/if}">
							<td colspan="3">
								Свойства не указаны
							</td>
						</tr>
						{if $product.storage.properties}
							{foreach from=$product.storage.properties item=property}
								<tr>
									<td><input name="properties[name][{$property.id}]" value="{$property.name|escape}"></td>
									<td><input name="properties[value][{$property.id}]" value="{$property.value|escape}"></td>
									<td><a href="#" class="icon icon-delete remove-trigger" title="Удалить" data-no-instant></a></td>
								</tr>
							{/foreach}
	                	{/if}
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
	                    value       =   $product.description
	                }
                </td>
            </tr>
			
            <tr>
                <td class="h">Отображать:</td>
                <td>
                    {include file="system/group.tpl"
                        name    = "visible"
                        check   = $product.visible
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
                    <input name="ord" value="{$product.ord}" class="ord integer reducing-trigger">
                </td>
            </tr>

       	</tbody>
   </table>

    {include file="system/buttons.tpl"}
</form>
{/strip}
{/if}
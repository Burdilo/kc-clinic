{strip}
<div class="button-container clearfix">
    <div class="locale__sort">
        <div class="locale__sort__title">
            <div class="locale__sort__title__label">{t('label.sort')}</div>
        </div>

        <div class="locale__sort__list">
            <select name="sort">
                <option value="">По новизне</option>
                <option value="">По алфавиту</option>
                <option value="">Только системные</option>
                <option value="">Только пользовательские</option>
            </select>
        </div>
    </div>
    
    <form action="" class="locale__search-form">
        <input name="word" placeholder="{t('a.word.or.translation')}" class="locale__search-form__input">
        <button type="submit" class="locale__search-form__button"><i class="icon icon-search"></i></button>
    </form>
 
    <a href="/{$ADMIN_DIR}/locale/add" class="button button-blue locale__add-button"><i class="icon icon-plus"></i>{t('add.something', [string => t('simple.word')])}</a>
</div>

<table class="table">
    <colgroup>
        <col width="250">
        <col>
        <col width="140">
        <col width="85">
        <col width="60">
    </colgroup>
    <thead>
        <tr>
            <th>Ключ</th>
            <th>{t('translations')}</th>
            <th>Примеры</th>
            <th colspan="2">Группа</th>
        </tr>
    </thead>
    <tbody>
    {if $dictionary_list}
        {foreach $dictionary_list as $key => $row}
        <tr>
            <td>
                <a href="/{$ADMIN_DIR}/locale/edit/{$key}" title="Редактировать"><span class="icon icon-edit"></span> {$key}</a>
            </td>
            <td>
                {foreach $row.list as $lang => $value}
                <span class="locale__item"><i class="flag flag_{$lang}"></i> <span class="locale__item__value">{$value}</span></span>
                {/foreach}
            </td>
            <td>
                <span class="inner-copy j-clipboard" data-clipboard="{$key}">key</span>
                <span class="inner-copy j-clipboard" data-clipboard="t('{$key}')">php</span>
                <span class="inner-copy j-clipboard" data-clipboard="{literal}{{/literal}t('{$key}'){literal}}{/literal}">smarty</span>
                <span class="inner-copy j-clipboard" data-clipboard="{literal}{{/literal}t('{$key}'){literal}}{/literal}">text</span>
            </td>
            <td>
            {if $row.system}
                <span class="label orange">{t('systematic')}</span>
            {/if}
            </td>
            <td class="tac">
                <a href="/{$ADMIN_DIR}/locale/edit/{$key}" class="icon icon-edit" title="Редактировать"></a>
                <a href="/{$ADMIN_DIR}/locale/del/{$row.id}" class="icon icon-delete remove-trigger" title="Удалить" onclick="return cp.dialog('Вы действительно хотите удалить поле?')" data-no-instant></a>
            </td>
        </tr>
        {/foreach}
    {else}
        <tr>
            <td colspan="5">--</td>
        </tr>
    {/if}
    </tbody>
</table>

{include file="system/pager.tpl"}
{/strip}
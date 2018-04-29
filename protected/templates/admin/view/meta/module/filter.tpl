{strip}
{assign var="pagerCookie" value="modulePager_$module_id"}

<div class="button-container clearfix">
    <div class="button-container--right">
        {if $meta_filter}
            {foreach $meta_filter as $name => $filter}
                {if !empty($filter.list)}
                <div class="button-container-select button-container-select--{$filter.type}">
                    <select name="$name"{if $filter.type == 'multiselect'} multiple{/if} onchange="setModuleSort(this, '{$module_id}', '{$name}')" placeholder="{$filter.name|escape}">
                        {if $filter.type != 'multiselect'}
                        <option value="">- {$filter.name|escape} -</option>
                        {/if}
                        {foreach $filter.list as $v => $n}
                            <option value="{$v}"{if isset($meta_cookie[$name]) && (is_array($meta_cookie[$name]) && in_array($v, $meta_cookie[$name]) || is_string($meta_cookie[$name]) && $v == $meta_cookie[$name])} selected{/if}>{$n}</option>
                        {/foreach}
                    </select>
                </div>
                {/if}
            {/foreach}
        {/if}

        <div class="button-container-limit">
            <select name="limit" onchange="setModuleLimit(this, '{$module_id}')">
                <option value="">На странице</option>
                {section name=pager start=5 loop=40 step=5}
                    <option value="{$smarty.section.pager.index}"{if isset($smarty.cookies[$pagerCookie]) && $smarty.cookies[$pagerCookie] == $smarty.section.pager.index} selected{/if}>{$smarty.section.pager.index}</option>
                {/section}
            </select>
        </div>
    </div>

    <a href="{$base_path}/module/add/{$module_id}{if isset($back_to_page ) && $back_to_page !== '' && $back_to_page > 0}?back_to_page={$back_to_page}{/if}" class="button button-blue"><i class="icon icon-plus-square"></i>Добавить поле</a>
    {if $smarty.session.userinf.gid == 10}
    <a href="/{$ADMIN_DIR}/modules/index/edit/{$module_id}" class="button button-gray"><i class="icon icon-settings"></i>Настройки модуля</a>
    {/if}
</div>
{/strip}
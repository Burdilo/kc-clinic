{strip}
<div class="calendar">
    <input name="{$name}" value="{$value|escape}"{if isset($onchange)} onchange="{$onchange}"{/if}{if isset($class_name)} class="{$class_name}"{/if} {if isset($settings.f_date_format)} data-format="{$settings.f_date_format}"{/if} tabindex="{$index}">
    <a href="#" onclick="return false" class="icon icon-calendar selector"></a>
</div>
{/strip}
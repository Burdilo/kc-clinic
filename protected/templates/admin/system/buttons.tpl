{strip}
<div class="button-container">
    <button class="button button-green" name="save" type="submit" onclick="return CheckAndSubmit('form_mdd')"><i class="icon icon-save"></i>{t('buttons.save.and.close')}</button>
    <button class="button button-blue" name="apply" type="submit" onclick="return CheckAndSubmit('form_mdd')"><i class="icon icon-check-square"></i>{t('buttons.save')}</button>
    <a class="button button-red" href="{$base_path}/"><i class="icon icon-arrow-left"></i>{t('buttons.cancel')}</a>
</div>
{/strip}
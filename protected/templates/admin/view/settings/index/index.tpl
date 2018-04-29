{strip}
<form action="/{$ADMIN_DIR}/settings" method="POST">
    <input type="hidden" name="action" value="save_setting">
    <table class="table">
        <col width="200">
        <col>
        <thead>
            <tr>
                <th colspan="2">{$locale.site_settings|capi}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="h hl">{$locale.site_name|capi}</td>
                <td id="COMPANY_NAME">
                    <input type="text" name="COMPANY_NAME" value="{$settings['COMPANY_NAME']|escape}">
                </td>
            </tr>
            <tr>
                <td class="h hl">{$locale.timezone|capi}</td>
                <td>
                    <div class="select-up">
                    {if !empty($timezone)}
                    <select name="SYSTEM_TIMEZONE">
                        {foreach from=$timezone item=zone}
                            <option value="{$zone.value}"{if isset($settings['SYSTEM_TIMEZONE']) && $zone.value == $settings['SYSTEM_TIMEZONE']} selected{/if}>{$zone.name}</option>
                        {/foreach}
                    </select>
                    {/if}
                    </div>
                </td>
            </tr>
            <tr>
                <td class="h hl">{$locale.locale|capi}</td>
                <td>
                    <select name="SYSTEM_LOCALE">
                        <option value="ru"{if isset($settings['SYSTEM_LOCALE']) && $settings['SYSTEM_LOCALE'] == 'ru'} selected{/if}>Русский</option>
                        <option value="en"{if isset($settings['SYSTEM_LOCALE']) && $settings['SYSTEM_LOCALE'] == 'en'} selected{/if}>English</option>
                    </select>
                    
                    {*
                    <select name="Locale" class="dropdown has-chzn chzn-done" id="Form_EditForm_Locale" style="display: none;">
                        <option value="af_ZA">Afrikaans (South Africa)</option>
                        <option value="ar_EG">Arabic (Egypt)</option>
                        <option value="hy_AM">Armenian (Armenia)</option>
                        <option value="ast_ES">Asturian (Spain)</option>
                        <option value="az_AZ">Azerbaijani (Azerbaijan)</option>
                        <option value="bs_BA">Bosnian (Bosnia and Herzegovina)</option>
                        <option value="bg_BG">Bulgarian (Bulgaria)</option>
                        <option value="my_MM">Burmese (Myanmar)</option>
                        <option value="ca_ES">Catalan (Spain)</option>
                        <option value="zh_CN">Chinese (China)</option>
                        <option value="zh_TW">Chinese (Taiwan)</option>
                        <option value="hr_HR">Croatian (Croatia)</option>
                        <option value="cs_CZ">Czech (Czech Republic)</option>
                        <option value="da_DK">Danish (Denmark)</option>
                        <option value="nl_NL">Dutch (Netherlands)</option>
                        <option value="en_GB">English (United Kingdom)</option>
                        <option value="en_US">English (United States)</option>
                        <option value="eo_XX">Esperanto</option>
                        <option value="et_EE">Estonian (Estonia)</option>
                        <option value="fo_FO">Faroese (Faroe Islands)</option>
                        <option value="fi_FI">Finnish (Finland)</option>
                        <option value="fr_FR">French (France)</option>
                        <option value="gl_ES">Galician (Spain)</option>
                        <option value="de_DE">German (Germany)</option>
                        <option value="el_GR">Greek (Greece)</option>
                        <option value="he_IL">Hebrew (Israel)</option>
                        <option value="hi_IN">Hindi (India)</option>
                        <option value="hu_HU">Hungarian (Hungary)</option>
                        <option value="is_IS">Icelandic (Iceland)</option>
                        <option value="id_ID">Indonesian (Indonesia)</option>
                        <option value="it_IT">Italian (Italy)</option>
                        <option value="ja_JP">Japanese (Japan)</option>
                        <option value="km_KH">Khmer (Cambodia)</option>
                        <option value="ko_KR">Korean (Korea)</option>
                        <option value="lv_LV">Latvian (Latvia)</option>
                        <option value="lt_LT">Lithuanian (Lithuania)</option>
                        <option value="ms_MY">Malay (Malaysia)</option>
                        <option value="ne_NP">Nepali (Nepal)</option>
                        <option value="nb_NO">Norwegian</option>
                        <option value="fa_IR">Persian (Iran)</option>
                        <option value="pl_PL">Polish (Poland)</option>
                        <option value="pt_BR">Portuguese (Brazil)</option>
                        <option value="pa_IN">Punjabi (India)</option>
                        <option value="ro_RO">Romanian (Romania)</option>
                        <option value="ru_RU" selected="selected">Russian (Russia)</option>
                        <option value="sr_RS">Serbian (Serbia)</option>
                        <option value="si_LK">Sinhalese (Sri Lanka)</option>
                        <option value="sk_SK">Slovak (Slovakia)</option>
                        <option value="sl_SI">Slovenian (Slovenia)</option>
                        <option value="es_AR">Spanish (Argentina)</option>
                        <option value="es_MX">Spanish (Mexico)</option>
                        <option value="es_ES">Spanish (Spain)</option>
                        <option value="sv_SE">Swedish (Sweden)</option>
                        <option value="tl_PH">Tagalog (Philippines)</option>
                        <option value="th_TH">Thai (Thailand)</option>
                        <option value="tr_TR">Turkish (Turkey)</option>
                        <option value="uk_UA">Ukrainian (Ukraine)</option>
                        <option value="uz_UZ">Uzbek (Uzbekistan)</option>
                        <option value="vi_VN">Vietnamese (Vietnam)</option>
                        <option value="mi_NZ">te reo Māori (New Zealand)</option>
                    </select>
                    *}
                </td>
            </tr>
            <tr>
                <td class="h hl">Главная страница</td>
                <td>
                    <select name="SYSTEM_MAINPAGE">
                        <option value="">Рабочий стол</option>
                        <option value="">Страницы</option>
                        <option value="">Контент</option>
                        <option value="">Редактор модулей</option>
                        <option value="">Зоны и блоки</option>
                        <option value="">Интернет магазин</option>
                        <option value="">Пользователи</option>
                        <option value="">Настройки сайта</option>
                        <option value="">Интеграция</option>
                        <option value="">SEO оптимизация</option>
                        <option value="">Поиск по сайту</option>
                        <option value="">Задачи</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td class="h hl">{$locale.debug|capi}</td>
                <td>
                    {include file="system/group.tpl"
                        name    = "SYSTEM_DEBUG"
                        check   = $settings['SYSTEM_DEBUG']
                        list    = [
                            [ value => '1', text => $locale.yes|capi ],
                            [ value => '0', text => $locale.no|capi, default => true ]
                        ]
                    }
                </td>
            </tr>
            <tr>
                <td class="h hl">{$locale.enablecache|capi}</td>
                <td>
                    {include file="system/group.tpl"
                        name    = "ENABLECACHE"
                        check   = $settings['ENABLECACHE']
                        list    = [
                            [ value => '1', text => $locale.yes|capi ],
                            [ value => '0', text => $locale.no|capi, default => true ]
                        ]
                    }
                </td>
            </tr>
            <tr>
                <td class="h hl">{$locale.iis|upper}</td>
                <td>
                    {include file="system/group.tpl"
                        name    = "SYSTEM_TRANSLATE"
                        check   = $settings['SYSTEM_TRANSLATE']
                        list    = [
                            [ value => 'latin', text => $locale.latin|capi, hint => "/stati/metki/leto", default => true ],
                            [ value => 'cyrillic', text => $locale.cyrillic|capi, hint => "/статьи/метки/лето" ],
                            [ value => 'translate', text => $locale.translate|capi, hint => "/articles/tags/summer" ]
                        ]
                    }
                </td>
            </tr>
        </tbody>
    </table>

    <div class="button-container clearfix">
        <button class="button button-blue" type="submit"><i class="icon icon-save"></i>{$locale.save|capi}</button>
    </div>
</form>
{/strip}
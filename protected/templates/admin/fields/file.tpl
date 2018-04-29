{strip}
<table class="table bg-white b-a" id="uploaded_files_list_{$name}">
     <colgroup>
        <col>
        <col width="10%">
        <col width="10%">
        <col width="10%">
    </colgroup>
    <thead>
        <tr>
            <th width="50%">Файл</th>
            <th>Размер</th>
            {*
            <th>Прогресс</th>
            <th>Статус</th>
            *}
            <th>Порядок</th>
            <th>Действия</th>
        </tr>
    </thead>
    <tbody>
    {if isset($list) && !empty($list)}
        {foreach from=$list item=e}
        <tr id="file_photo_{$e.id}">
            <td><a class="upload-gallery-edit" title="Редактировать наименование" onclick="return editTitle({$e.id}, '{$e.title|escape}')" href="#"><i class="icon icon-edit"></i></a> <a href="{$e.file}" target="_blank" id="ftitle_{$e.id}">{$e.title}</a></td>
            <td>{$e.size}</td>
            {*
            <td>
                <div class="progress progress-sm no-margin m-t-xs">
                    <div class="progress-bar bg-info" role="progressbar" ng-style="{ 'width': item.progress + '%' }" style="width: 100%;"></div>
                </div>
            </td>
            <td class="text-center">
                <span lass="text-success" style=""><i class="glyphicon glyphicon-ok"></i></span>
                <span class="text-warning ng-hide" aria-hidden="true"><i class="glyphicon glyphicon-ban-circle"></i></span>
                <span class="text-danger ng-hide" aria-hidden="true"><i class="glyphicon glyphicon-remove"></i></span>
            </td>
            *}
            <td>
                <a style="float:left;margin: 0 5px 0 0;" title="Редактировать порядок" onclick="return editOrd({$e.id}, '{$e.ord}')" href="#"><i class="icon icon-edit"></i></a> <span id="ordfile_{$e.id}">{$e.ord}</span>
            </td>
            <td>
                <button type="button" class="btn btn-default btn-xs" onclick="return cp.ajaxFileDelete({$e.id}, 'file_photo_{$e.id}');" href="#" data-no-instant>Удалить</button>
            </td>
        </tr>
        {/foreach}
    {else}
        <tr>
            <td colspan="4" class="center-middle">Файлы не загружены</td>
        </tr>
    {/if}
    </tbody>
</table>

<input type="hidden" name="{$name}" value="{$value|escape}">

<label class="file--upload">
    <div class="file--upload-placehoder">Прикрепить файл{if isset($settings.f_file_count) && $settings.f_file_count == 1}ы{/if}</div>
    <div class="file--upload-button">Обзор</div>
    <input type="file" accept="*" onchange="cp.fileChange(this)" {if isset($settings.f_file_count) && $settings.f_file_count == 1}name="{$name}[]" multiple{else}name="{$name}"{/if} data-url="/{$ADMIN_DIR}/templates/js/upload/upload.php" id="fileupload_input_{$name}">
</label>
{/strip}
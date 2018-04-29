var cp = (function($) {
    var data = [];
    var css = function(element, style) {
        for (var prop in style) {
            element.style[prop] = style[prop];
        }
    }

    var animate = function(opts, callback) {
        var start = new Date;
        var timer = setInterval(function() {
            var progress = (new Date - start) / opts.duration;
            if (progress > 1) progress = 1;
            opts.step(progress);
            if (progress == 1) {
                if (callback) {
                    callback.apply();
                }
                clearInterval(timer);
            }
        }, opts.delay || 20);
        
        return {
            stop: function() {
                clearInterval(timer);
            }
        };
    }
    
    var addClass = function(element, classname) {
        var cn = element.className;
        if(cn.indexOf(classname) != -1) {
            return;
        }
        if(cn != '') {
            classname = ' '+classname;
        }
        element.className = cn+classname;
    }

    var removeClass = function(element, classname) {
        var cn = element.className;
        var rxp = new RegExp("\\s?\\b"+classname+"\\b", "g");
        cn = cn.replace(rxp, '');
        element.className = cn;
    }

    var notify_timeout, notify;

    return {

        ajaxFileDelete: function(id, obj)
        {
            if (cp.dialog("Вы дейсвительно хотите удалить файл?"))
            {
                $.ajax({
                    url: '/' + ADMIN_DIR + '/meta/filedelete',
                    type: "post",
                    data: {
                        id: id
                    },
                    dataType: 'JSON',
                    success: function(response)
                    {
                        console.log(response);

                        if (response.status === true)
                        {
                            $('#'+obj).remove();
                        }
                    }
                });
            }
            
            return false;
        },

        dropdown: function ()
        {
            $('.trigger-dropdown').on('click', function(){
                var dd = $(this).data('toggle');
                $('#dropdown-' + dd).toggle();
            });
        },

        cleditor: function ()
        {
            if (typeof(jQuery.cleditor) !== 'undefined')
            {
                $(".redactor_cleditor").cleditor();
            }
        },

        notify: function (text, status)
        {
            clearTimeout(notify_timeout);
            
            if (!$('body').find('.notify-message').length)
            {
                notify = $('<div class="notify notify-message">' + text + '</div>');

                $('body').append(notify);

                setTimeout(function(){
                    notify.addClass('animate');
                }, 10);
            }

            notify_timeout = setTimeout(function(){
                
                notify.removeClass('animate');

                setTimeout(function(){

                    notify.remove();
                    
                }, 300);

            }, 2500);

            // var close = document.getElementById("alert-close"), note = document.getElementById("alert"),
            //     message = document.getElementById("alert-message");

            //     note.animate && note.animate.stop && note.animate.stop();

            // clearTimeout(closeAlertTimeout);

            // css(note, {
            //     display: 'none',
            //     opacity: 0
            // });

            // if(status)
            // {
            //     addClass(note, 'alert-' + status);
            // }

            // message.innerHTML = text;

            // css(note, {
            //     display: 'block',
            //     opacity: 0
            // });

            // $(note).stop().animate({ opacity: 1 }, 200);

            // function closeAlert(note)
            // {
            //     note.animate && note.animate.stop && note.animate.stop();

            //     $(note).stop().animate({ opacity: 0 }, 200, function(){
            //         css(note, {
            //             display: 'none',
            //             opacity: 0
            //         });
            //     });
            // }

            // close.addEventListener('click', function() {
            //     closeAlert(note);
            // }, false);

            // var closeAlertTimeout = setTimeout(function(){
            //     closeAlert(note);
            // }, 2000);
        },

        fileChange: function(element)
        {
            var filename = element.value;

            if (filename.lastIndexOf('\\')){
                var i = filename.lastIndexOf('\\')+1;
            }
            else{
                var i = filename.lastIndexOf('/')+1;
            }                       
            filename = filename.slice(i);
            
            $(element).closest('.file--upload').find('.file--upload-placehoder').html(filename);
        },
        
        binding: function(name, element)
        {
            $('input[name="' + name + '"]').on('keyup', function(){
		        if (this.value != '')
		        {
		        	$('input[name="' + element + '"]').val(transliterate(this.value, URL_TRANSLATE));
		        }
		    });
        },

        saveSettings: function(id, e)
        {
            if(typeof e !== 'undefined')
            {
                e.preventDefault ? e.preventDefault() : e.returnValue = !1;
            }

            var arr = {}, block = '#settings-container-toggle-' + id;

            $(block).find('input, select').each(function(){
                var type = $(this).attr('type'), name = $(this).attr('name'), value = $(this).val();

                if (typeof(name) !== 'undefined')
                {
                    if(type !== 'radio' && type !== 'checkbox' || $(this).is(':checked') === true)
                    {
                        name = name.replace('SETTINGS_', '');
                        arr[name] = value;
                    }
                }
            });

            $.post('/' + ADMIN_DIR + '/structure/saveSettings/', { 'arr': arr }, function(data){
                
                if(data.result == 1)
                {
                    cp.notify('Сохранено', 'success');
                }

            }, 'JSON');

            return !1;
        },

        removeSettings: function(id, e)
        {
            if(typeof e !== 'undefined')
            {
                e.preventDefault ? e.preventDefault() : e.returnValue = !1;
            }

            if (cp.dialog("Вы дейсвительно хотите удалить блок?"))
            {
                $.post('/' + ADMIN_DIR + '/structure/removeSettings/', { 'id': id }, function(data) {
                    if(data.result == 1)
                    {
                        $('#settings-'+id).remove();
                        $('#breadcrumbs-'+id).remove();
                        $('#container-'+id).remove();
                        $('#emptysplash-'+id).remove();
                    }
                }, 'JSON');
            }

            return !1;
        },

        arrLength: function(obj)
        {
            var i=0;
            for (var x in obj) if (obj.hasOwnProperty(x)) i++;
            return i;
        },

        loadSettings: function(val, id, item)
        {
            var arr = { 1: 'type', 2: 'item', 3: 'mode' }, prev = '', action = '', mode = '', lvl = 1, next, block = 'cnt_' + item + '-' + id;

            if(item == 'type')
            {
                lvl = 1;
                action = val;
            }
            else if(item == 'item')
            {
                lvl = 2;
                action = $('#cnt_' + arr[1] + '-' + id).find('option:selected').val();
                mode = val;
            }
            else if(item == 'mode')
            {
                lvl = 3;
                action = $('#cnt_' + arr[2] + '-' + id).find('option:selected').val();
                mode = val;
            }

            next = lvl + 1;

            for(var xx = next; xx <= 4; xx ++)
            {
                if($('#block-lvl' + xx + '-' + id).length > 0)
                {
                    $('#block-lvl' + xx + '-' + id).remove();
                }
            }

            $.post('/' + ADMIN_DIR + '/structure/loadSettings/', { 'action': action, 'mode': mode }, function(data) {
                if(typeof(data) !== 'undefined' && cp.arrLength(data) > 0)
                {
                    var select = [], hash = 'cnt_' + arr[next] + '-' + id, block = 'cnt_item-' + id + '-type';
                    
                    select.push('<div class="block-settings-select-block lvl' + next + '" id="block-lvl' + next + '-' + id + '">');
                    select.push('<select name="SETTINGS_' + arr[next] + '_' + id + '" id="' + hash + '" onchange="cp.loadSettings(this.value, ' + id + ', \'' + arr[next] + '\');">');
                    
                    select.push(' <option value="" selected>Выбрать</option>');

                    for (system in data)
                    {
                        select.push('<option value="' + system + '">' + data[system] + '</option>');
                    }

                    select.push('</select>');
                    select.push('</div>');
                    
                    $('#block-settings-select-block-' + id).append(select.join(''));

                    selectize('#'+hash);
                }

            }, 'JSON');
           
        },

        toggleModule: function(element, e)
        {
            if(typeof e !== 'undefined')
            {
                e.preventDefault ? e.preventDefault() : e.returnValue = !1;
            }

            var path = $(element).attr('href');
            
            $(element).append('<i class="loading"></i>');

            $.post(path, function(data) {
                if (data.status === true)
                {
                    if ($(element).hasClass('icon-eye-off'))
                    {
                        $(element).removeClass('icon-eye-off').addClass('icon-eye').html('');
                    }
                    else {
                        $(element).removeClass('icon-eye').addClass('icon-eye-off').html('');
                    }
                }
            }, 'JSON');

            return !1;
        },

        toggleSettings: function(element, e)
        {
            if(typeof e !== 'undefined')
            {
                e.preventDefault ? e.preventDefault() : e.returnValue = !1;
            }

            var href = $(element).attr('href').substr(1);

            $(element).toggleClass('block-settings-open');
            $("#"+href).toggle();

            return !1;
        },

        tableToggle: function(id, e)
        {
            if(typeof e !== 'undefined')
            {
                e.preventDefault ? e.preventDefault() : e.returnValue = !1;
            }

            var hash = window.location.pathname.replace(/\//g, "|"), PATH_HASH = md5(hash);
            var cookie_toggle = id + '_toogle_' + PATH_HASH;
            
            if(typeof(e) == 'undefined')
            {
                if (typeof($.cookie(cookie_toggle)) == 'undefined')
                {
                    $("#"+id+" th .table_hdr").removeClass('table_u').addClass('table_d');
                    $("#"+id+" tr:not(.th)").hide();
                }
            }
            else
            {
                $("#"+id+" th .table_hdr").toggleClass('table_u').toggleClass('table_d');
                $("#"+id+" tr:not(.th)").toggle();   
               
                if($("#"+id+" tr:not(.th)").is(':visible'))
                {
                    $.cookie(cookie_toggle, 'show', { expires: 30, path: '/' });
                }
                else
                {
                    $.removeCookie(cookie_toggle, { path: '/' });
                }
            }

            return !1;
        },

        tableToggleList: function()
        {
            var hash = window.location.pathname.replace(/\//g, "|"), PATH_HASH = md5(hash);

            if($('.table-toggle-trigger').length > 0)
            {
                $('.table-toggle-trigger').each(function(){
                    var id = this.id, cookie_toggle = id + '_toogle_' + PATH_HASH;
                    
                    if(typeof($.cookie(cookie_toggle)) !== 'undefined')
                    {
                        $("#"+id+" th .table_hdr").addClass('table_u').removeClass('table_d');
                        $("#"+id+" tr:not(.th)").show();
                    }
                    else
                    {
                        $("#"+id+" th .table_hdr").removeClass('table_u').addClass('table_d');
                        $("#"+id+" tr:not(.th)").hide();
                    }
                });
            }
        },

        addBlock: function (parent, e)
        {
            if(typeof e !== 'undefined')
            {
                e.preventDefault ? e.preventDefault() : e.returnValue = !1;
            }

            var order = 10;

            if($('#cont_data').find('.block-settings-order-input').length)
            {
                var temp = [];
                $('#cont_data').find('.block-settings-order-input').each(function(){
                    temp.push($(this).find('input').val());
                })

                if(temp.length)
                {
                    order = temp.max() + 10;
                }
            }

            $.post('/' + ADMIN_DIR + '/structure/getNewId/', { 'parent': parent, 'order': order }, function(newitem) {
           
                var row = [
                    '<tr id="settings-' + newitem + '">',
                        '<td class="settings-row">',
                            '<div class="settings-container clearfix">',
                                '<a href="#" onclick="return cp.removeSettings(' + newitem + ', event);" class="block-settings-link block-settings-remove"><i class="icon icon-delete"></i>Удалить блок</a>',
                                '<a href="#settings-container-toggle-' + newitem + '" onclick="return cp.toggleSettings(this, event);" class="block-settings-link block-settings-title block-settings-open">',
                                    '<span class="block-settings-title-drop"><i class="icon icon-cog"></i></span>',
                                    '<span class="block-settings-title-text">Настройки блока</span>',
                                '</a>',
                                
                                '<div class="settings-container-toggle opened" id="settings-container-toggle-' + newitem + '">',
                                    '<div class="block-settings-ln block-settings-visible clearfix">',
                                        '<div class="option-group option-combo option-simple">',
                                            '<label><input type="radio" name="SETTINGS_visible_' + newitem + '" value="1" checked="checked"><span class="option">Активен</span></label>',
                                            '<label class="disallow"><input type="radio" name="SETTINGS_visible_' + newitem + '" value="0"><span class="option">Не активен</span></label>',
                                        '</div>',
                                    '</div>',

                                    '<div class="block-settings-ln block-settings-order clearfix">',
                                        '<div class="block-settings-order-input">',
                                            '<input name="SETTINGS_ord_' + newitem + '" value="' + order + '" placeholder="Порядок">',
                                        '</div>',
                                    '</div>',

                                    '<div class="block-settings-ln block-settings-select clearfix" id="block-settings-select-block-' + newitem + '">',
                                        '<div class="block-settings-select-block lvl1" id="block-lvl1-' + newitem + '">',
                                            '<select name="SETTINGS_type_' + newitem + '" id="cnt_type-' + newitem + '" onchange="cp.loadSettings(this.value, ' + newitem + ', \'type\');"><option value="" selected>Выбрать</option><option value="redactor">Визуальный редактор</option><option value="editor">Редактор кода</option><option value="module">Модуль</option><option value="zone">Зона</option><option value="block">Блок</option><option value="banner">Баннер</option><option value="search">Поиск</option></select>',
                                        '</div>',
                                    '</div>',

                                    '<div class="block-settings-ln block-settings-system clearfix">',
                                        '<div class="block-settings-system-input">',
                                            '<input name="SETTINGS_system_' + newitem + '" value="" placeholder="Системное имя">',
                                        '</div>',
                                    '</div>',

                                    '<div class="block-settings-buttons clearfix">',
                                        '<a href="#" onclick="return cp.saveSettings(' + newitem + ', event);" class="button button-purple block-settings-save"><i class="icon icon-check-square"></i>Сохранить</a>',
                                    '</div>',
                                '</div>',
                            '</div>',
                        '</td>',
                    '</tr>'
                ];

                $('#cont_data').find('tbody').append(row.join(''));
                
                selectize();
            });

            return !1;
        },

        dialog: function (text)
        {
            return confirm(text);
        },

        indexation: function (e)
        {
            if(typeof e !== 'undefined')
            {
                e.preventDefault ? e.preventDefault() : e.returnValue = !1;
            }
           
            if (cp.dialog('Начать индексацию?'))
            {
                $('#indexation-good').hide();
                $('#loader').fadeIn();

                var iurl = '/' + ADMIN_DIR + '/search/indexer/';

                $.ajax({
                    url: iurl,
                    type: 'get',
                    data: {
                        start: 0
                    },
                    success: function(data)
                    {
                        if (data != "good")
                        {
                            $.get( iurl, {
                                start: data
                            });
                        }
                        else {
                            $("#loader").fadeOut();
                            $("#indexation-good").show();
                        }
                    },
                    error: function(response)
                    {}
                });
            }
        },

        push: function (item)
        {
            data.push(item);
        },
        
        pop: function()
        {
            return data.pop();
        },

        length: function() {
            return data.length;
        }
    };
}(jQuery));

Array.prototype.max = function() { return Math.max.apply(null, this); };
Array.prototype.min = function() { return Math.min.apply(null, this); };

function is_null(x)
{
	return x == null;
}

function is_undefined(x)
{
	return typeof(x) == 'undefined';
}
          
var mapConteiner = function( type, mapid )
{
    if ( type === 'google' )
    {
        googleMaps( mapid );
    }
    else if ( type === 'yandex' )
    {
        yandexMaps( mapid );
    }
}

function checkAll(element)
{
    var checked = $(element).prop('checked');
    $('.check-all-spy').prop( 'checked', checked );
}

function addTemplate(e)
{
    e.preventDefault();

    $('#addtemplate').find('input').attr('disabled', false);
    $('#addtemplate').toggle();
    
    return false;
}

function addTemplateFile( tid )
{
    var name = $('#template_name').val(),
        file = $('#template_file').val();
    
    $.post('/' + ADMIN_DIR + '/ajax/structure/', { act: "ajaxAddTemplate", name: name, file: file }, function(data)
    {
        if ( data.length > 0 )
        {
            var str = '', selected = '';
            str += '<select name="stc_tid" id="templates_list">';
            for( var x in data )
            {
                if ( tid !== '' )
                {
                    selected = ( tid == data[x].id ) ? 'selected="selected"' : '' ;
                }
                str += '<option value="' + data[x].id + '" ' + selected + '>' + data[x].name + '</option>';
            }
            str += '</select>';
            
            $('#select_field').html( str );
            selectize('#templates_list');
        }
        
        $('#addtemplate').find('input').attr('disabled', true);
        $('#addtemplate').hide();
    }, "json");
    
    return false;
}

function yandexMaps( mapid )
{
    var map = {
        link: null,
        mapid: 'map-conteiner-' + mapid,
        place: 'krasnodar',
        type: 'yandex#map', // 'yandex#map' 'yandex#satellite' 'yandex#hybrid' 'yandex#publicMap' 'yandex#publicMapHybrid'
        city: {
            'krasnodar': [45.09471716593029, 39.01589900000001],
            'moscow': [55.76, 37.64],
        },
        getBaloon: function( coord )
        {
            return new ymaps.Placemark( coord, {}, {
                draggable: true
                //,
                //iconImageHref: '/images/myIcon.gif',
                //iconImageSize: [30, 42],
                //iconImageOffset: [-3, -42]
            });
        },
        draw: function( ymaps )
        {
            map.link = new ymaps.Map(this.mapid, {
                center: map.city[ this.place ],
                zoom: 12,
                type: map.type
            });

            map.link.controls
                .add('smallZoomControl', { right: 10, top: 15 })
                .add(new ymaps.control.ScaleLine())
                .add('searchControl', { left: 20, top: 20 });

            var dragBalloon = this.getBaloon( map.city[ this.place ] );
            
            map.link.events.add('click', function (e) {
                map.link.geoObjects.remove( dragBalloon ); 
                
                dragBalloon = map.getBaloon( e.get('coordPosition') );
                map.link.geoObjects.add( dragBalloon );
                
                map.setCoord( e.get('coordPosition') );
            });
            
            map.link.geoObjects.add( dragBalloon ).events.add('dragend', function(e) {
                var object = e.get('target');
                var coords = object.geometry.getCoordinates();
                object.properties.set('balloonContent', coords);
                
                map.setCoord( coords );
            });
        },
        add: function() {
            if ( arguments.length == 1 ) {
                map.link.geoObjects.add(
                    new ymaps.GeoObject({
                        geometry: {
                            type: "Point",
                            coordinates: arguments[0]
                        }
                    })
                );
            }
            else {
                var collection = new ymaps.GeoObjectCollection();
                for (var i = 0; i<arguments.length; i++) {
                    collection.add(new ymaps.Placemark(arguments[i]));
                }
                map.link.geoObjects.add(collection);
            }
        }
    };
    
    ymaps.ready(function(){
        map.draw( ymaps );
    });
}

function googleMaps( mapid )
{
    var map = new google.maps.Map(d.getElementById( 'map-conteiner-' + mapid ), {
        zoom: 14,
        zoomControl: !1,
        panControl: !1,
        scrollwheel: !1,
        navigationControl: !1,
        mapTypeControl: !1,
        scaleControl: !1,
        draggable: !0,
        disableDoubleClickZoom: !0,
        center: new google.maps.LatLng(45.053548,39.016056)
    });
}

var datepicker = function()
{
    $('.calendar .selector').each(function(){
        var $element = $(this).closest('.calendar').find('input'),
            disabled = $element.is(':disabled'),
            timestamp = $element.data('timestamp') || false,
            d_format = $element.data('format') || 'dd.mm.yyyy';
        
            if ( timestamp !== false )
            {
                d_format = 'mm/dd/yyyy';
            }
        
        if ( !disabled )
        {
            $(this).data({
                'date-format': d_format.toLowerCase(),
                'date': ""
            });

            $(this).BootDatepicker().on('changeDate', function(ev)
            {
                var result = $(this).data('date');
                
                if ( timestamp !== false )
                {
                    result = ( new Date( result ) ).getTime() / 1000 ;
                }
                
                $element.val( result );
                //$(this).BootDatepicker('hide');
            });
        }
    });
};

function selectize( selector )
{
    selector = selector || 'select';
    
    $(selector).chosen({
        width: "100%",
        allow_single_deselect: true,
        no_results_text: 'Не найдено!',
        disable_search_threshold: 10
    });
}

function changeRow(element)
{
    var checked = $(element).prop('checked');

    if(checked)
    {
        $(element).closest('tr').find('td').addClass('ch');
    }
    else
    {
        $(element).closest('tr').find('td').removeClass('ch');
    }
}

function toggle_small_photo(id)
{
    $("#"+id).toggle();
}

function removeSection(element, e, id, _self_)
{
    e.preventDefault();
    if (confirm('Вы действительно хотите удалить?'))
    {
        id = parseInt(id);
        
        var x, section = [], tmp = $(element).val().split(',');
        for(x in tmp)
        {
            if (tmp[x] !== '' && parseInt(tmp[x]) !== id)
            {
                section.push(parseInt(tmp[x]));
            }
        }
        
        $(_self_).remove();
        $(element).val( (section.length > 1 ? section.join(',') : section) );
    }
    return false;
}

function slider(id, type, value, min, max, orientation)
{
    var element = '#' + id;

    orientation = !orientation ? 'horizontal' : orientation;

    min = min || 0;
    max = max || 100;

    var values = value, connect = 'lower', behaviour = 'tap-drag';

    if (type == 'range')
    {
        behaviour = 'tap-drag';
        connect = true;
        values = [ value[0] , value[1] ];
    }

    $(element).noUiSlider({
        animate: false,
        orientation: orientation,
        start: values,
        connect: connect,
        behaviour: behaviour,
        range: {
            'min': min,
            'max': max
        }
    });

    if (type == 'range')
    {
        $(element).Link('lower').to( $(element + '-min'), null, wNumb({
            decimals: 0
        }));

        $(element).Link('upper').to( $(element + '-max'), null, wNumb({
            decimals: 0
        }));
    }
    else
    {
        $(element).Link('lower').to( $(element + '-value'), null, wNumb({
            decimals: 0
        }));
    }
}

function metaCounter()
{
    $('.count-number').on('keyup', function(){
        var $block = $(this).closest('.count-number-block'),
            $counter = $block.find('.count-number-block-count'),
            recomend = parseInt($counter.data('recomend')) || '';

        $counter.html($(this).val().length + (recomend !== '' ? '/' + recomend : ''));

        if (recomend !== '' && $(this).val().length > recomend)
        {
           $counter.addClass('unlim');
        }
        else if ($counter.hasClass('unlim'))
        {
            $counter.removeClass('unlim');
        }
    });
}

function seoCrowl()
{
    $("input[name='changefreq']").on('change', function () {
        if ($.trim($(this).val()) == 'fixed')
        {
            $('#changefreq_fixed').removeClass('hidden');
        }
        else
        {
            $('#changefreq_fixed').addClass('hidden');
        }
    });
    
    $("input[name='priority']").on('change', function () {
        if ($.trim($(this).val()) == 'fixed')
        {
            $('#priority_fixed').removeClass('hidden');
        }
        else
        {
            $('#priority_fixed').addClass('hidden');
        }
    });
}

function toggle_item(e, element, id, elclass)
{
    e.preventDefault();
    $("#"+id).toggle();
    var $icon = $(element).find('.icon');
    
    if ($icon.hasClass(elclass[0]))
    {
        $icon.removeClass(elclass[0]);
        $icon.addClass(elclass[1]);
    }
    else
    {
        $icon.removeClass(elclass[1]);
        $icon.addClass(elclass[0]);
    }
}

function switch_type_fields(obj)
{
    if ( obj.checked === true )
    {
        $("#case2").hide();
        $("#case2 input").attr({"disabled": true});
        $("#case1").show();
        $("#case1 input").attr({"disabled": false});
    }
    else
    {
        $("#case1").hide();
        $("#case1 input").attr({"disabled": true});
        $("#case2").show();
        $("#case2 input").attr({"disabled": false});
    }
}

function show_tr(obj)
{
    var val = $(obj).val();
    
    if (val == 10 || val == 11 || val == 12)
        $("#to_list").show();
    else
        $("#to_list").hide();
}

function secret( element )
{
    $(element).val(PassGenJS.getPassword({
        symbols: 0,
        letters: random(2, 4),
        numbers: random(2, 4),
        lettersUpper: random(3, 7)
    }));
}

function random(min, max)
{
    min = min || 0 ;
    max = max || 100 ;
    return Math.floor(Math.random() * ( max - min + 1 )) + min ;
}


function token( length )
{
    length = length || 8 ;
    
    var secret = '', chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    
    for( i=1; i<length; i++ )
    {
        var c = Math.floor(Math.random()*chars.length + 1);
        secret += chars.charAt(c)
    }
    
    return secret;
}

function del_list_fields(id)
{
    if (cp.dialog("Вы дейсвительно хотите удалить поле?")){
       $("#tr"+id).remove();
       /*
       $.post( "/" + ADMIN_DIR + "/ajax/lists/",
            {
                action: "remove",
                id: id
            },
            function(data)
            {
                $("#tr"+id).remove();
            } ,
            "json"
        )
        */
    }
    return false;
}

function add_list_fields()
{
    field_counter++;
    str = '<tr id="tr'+field_counter+'">';
    str += '<td><input type="hidden" name="field_id['+field_counter+']" value="0" \/>';
    str += '<input type="text" name="field_name['+field_counter+']" class="bord padd ness" \/><\/td>';
    str += '<td><input type="text" name="field_sys_name['+field_counter+']" class="bord padd ness" \/><\/td>';
    str += '<td><select name="field_type['+field_counter+']" class="field_type ness" id="'+field_counter+'" onchange="select_type(this);">';
    $.each(arr_field_type,function(k,v){
        if (k*1) str += '<option value="'+k+'">'+v+'<\/option>'
    });     
    str += '<\/select><\/td>';
    str += '<td class="addition"><\/td>';
    str += '<td><input type="text" name="f_ord['+field_counter+']" value="'+field_counter+'0" class="bord padd w60px r" \/><\/td>';
    str += '<td style="text-align:center"><input type="checkbox" name="in_list['+field_counter+']" \/><\/td>';
    str += '<td class="actions c"><a href="#" class="ctr_a ctr_del margin" title="Удалить" onclick="del_list_fields('+field_counter+');return false;"><\/a><\/td>';
    str += '<\/tr>';
    
    $("#add_btn").before(str);
}

function add_list_fields_list()
{
    field_counter++;
    
    var str = [
        '<tr id="tr'+field_counter+'">',
        '<td>',
        '<input type="hidden" name="field_id[' + field_counter + ']" value="0">',
        '<input name="var[' + field_counter + ']" placeholder="Например: Краснодарский край">',
        '</td>',
        '<td><input name="value[' + field_counter + ']" placeholder="Например: 23"></td>',
        '<td><label class="controll"><input type="checkbox" class="controll__input" value="' + field_counter + '" name="default[' + field_counter + ']"><span class="controll__visible controll__visible_checkbox"></span></label></td>',
        '<td><input name="ord[' + field_counter + ']" value="' + field_counter + '0" class="ord integer reducing-trigger"></td>',
        '<td class="tac"><a href="#" class="icon icon-delete remove-trigger" title="Удалить" onclick="del_list_fields(' + field_counter + ');return false;"></a></td>',
        '</tr>'
    ].join( '' );
    
    $("#add_btn").before(str);
}

function del_fields(numb)
{
    field_counter--;
    $("#tr"+numb).remove();
}

function add_fields()
{
    field_counter++;
    var select = '', k = '';
    
    for( k in arr_field_type )
    {
        select += '<option value="' + k + '">' + arr_field_type[k] + '</option>' ;
    }

    var str = [
        '<tr id="tr'+field_counter+'">',
        '<td class="va_t"><input name="f_name['+field_counter+']" class="ness"></td>',
        '<td class="va_t"><input name="f_sys_name['+field_counter+']" class="ness"></td>',
        '<td class="va_t"><select name="f_type['+field_counter+']" class="f_type ness" data-placeholder="Тип поля" id="fieldtype_'+field_counter+'" onchange="select_type(this)">',
        select,
        '</select></td>',
        '<td class="addition va_t">' + get_addition('input', field_counter) + '</td>',
        '<td class="va_t"><input name="f_ord['+field_counter+']" value="'+field_counter+'0"></td>',
        '<td class="va_m tac"><label class="controll controll_single"><input type="checkbox" class="controll__input" value="1" name="f_in_list['+field_counter+']"><span class="controll__visible controll__visible_checkbox"></span></label></td>',
        '<td class="va_m tac"><label class="controll controll_single"><input type="checkbox" class="controll__input" value="1" name="f_index['+field_counter+']"><span class="controll__visible controll__visible_checkbox"></span></label></td>',
        '<td class="va_m tac"><label class="controll controll_single"><input type="checkbox" class="controll__input" value="1" name="f_unique['+field_counter+']"><span class="controll__visible controll__visible_checkbox"></span></label></td>',
        '<td class="tac"><a href="#" class="icon icon-delete remove-trigger" title="Удалить" onclick="del_fields('+field_counter+');return false;"></a></td>',
        '</tr>'
    ].join('');
    
    $("#add_btn").before(str);
    
    selectize( '#fieldtype_' + field_counter );
}

function add_fields_list()
{
    field_counter++;
    
    str = [
        '<tr id="tr'+field_counter+'">',
        '<td><input name="var['+field_counter+']"></td>',
        '<td><input name="value['+field_counter+']"></td>',
        '<td><input type="checkbox" name="default['+field_counter+']"></td>',
        '<td><input name="ord['+field_counter+']" value="'+field_counter+'0"></td>',
        '<td class="tac"><a href="#" class="icon icon-delete remove-trigger" title="Удалить" onclick="del_fields('+field_counter+');return false;"></a></td>',
        '</tr>'
    ].join('\n');
    
    $("#add_btn").before(str);
}

function select_type( obj )
{
    var row_numd = 1 * ( $(obj).attr("id").split('_')[1] ),
        append_obj = $("#tr"+row_numd+" .addition"),
        str = get_addition( obj.value.split(':')[0], row_numd );
    
    $( append_obj ).empty().append( str || '' );
}

function get_addition( type, index )
{
    var tmp = [], str = [];

    if ( [ 'input', 'cost', 'int', 'hidden', 'document', 'timestamp', 'email', 'list', 'autocomplete', 'select', 'float', 'system', 'multiselect', 'datetime' ].indexOf( type ) >= 0 )
    {
        str = [
            '<div class="group">',
                '<label class="group__item"><input type="radio" class="group__item__rb" name="f_width[' + index + ']" value="25"><span class="group__item__style"></span><span class="group__item__text">25%</span></label>',
                '<label class="group__item"><input type="radio" class="group__item__rb" name="f_width[' + index + ']" value="50"><span class="group__item__style"></span><span class="group__item__text">50%</span></label>',
                '<label class="group__item"><input type="radio" class="group__item__rb" name="f_width[' + index + ']" value="75"><span class="group__item__style"></span><span class="group__item__text">75%</span></label>',
                '<label class="group__item"><input type="radio" class="group__item__rb" name="f_width[' + index + ']" value="100" checked><span class="group__item__style"></span><span class="group__item__text">100%</span></label>',
            '</div>'
        ];
        
        if ( [ 'list', 'autocomplete', 'select', 'radio', 'multiselect', 'checkbox', 'system' ].indexOf( type ) >= 0 )
        {
           str.push( '<div class="cb mb10"></div>' ); 
        }
    }
    
    if ( type == 'hidden' )
    {
        str.push( '<input value="" name="f_hidden_default[' + index + ']" placeholder="Значение по умолчанию">' );
    }
    
    if ( type == 'system' )
    {
        str.push( '<input value="" name="f_binding[' + index + ']" placeholder="Например поле (title)">' );
    }
    
    if ( type == 'date' )
    {
        tmp = [
            '<div class="help-cover">',
                '<input name="f_date_format[' + index + ']" value="DD.MM.YYYY" placeholder="Формат даты">',
                '<div class="tooltip tooltip-down">',
                    'D — день,<br>',
                    'M — месяц (без нуля впереди)<br>',
                    'DD, MM — день и месяц с нулём впереди для значений от 1 до 9<br>',
                    'YY — 2-символьное обозначение года<br>',
                    'YYYY — 4-символьное обозначение года (год пишется полностью)',
                '</div>',
            '</div>'
        ];
        
        str.push( tmp.join('\n') );
    }
    
    if ( [ 'file', 'image' ].indexOf( type ) >= 0 )
    {
        tmp = [
            '<div class="option-group option-combo">',
                '<label><input type="radio" name="f_file_count[' + index + ']" value="0"><span class="option">Один файл</span></label>',
                '<label><input type="radio" name="f_file_count[' + index + ']" value="1" checked><span class="option">Много файлов</span></label>',
            '</div>'
        ];
        
        if ( type == 'image' )
        {
            tmp.push( '<div class="cb mb10"></div>' );
        }
        
        str.push( tmp.join('\n') );
    }
    
    if ( [ 'gallery', 'image' ].indexOf( type ) >= 0 && typeof CONFIGURE !== 'undefined' && typeof CONFIGURE.image !== 'undefined' )
    {
        var tmp0 = [], tmp1 = [], tmp2 = [], x, checked = '' ;
        tmp0 = [
            '<div class="js-size-list">',
            '<table class="table-simple">',
                '<col><col><col><col width="57"><col width="20">',
                '<thead>',
                    '<tr>',
                        '<td class="h">Префикс</td>',
                        '<td class="h">Ширина</td>',
                        '<td class="h">Высота</td>',
                        '<td class="h">Метод</td>',
                        '<td class="h"></td>',
                    '</tr>',
                '</thead>',
                '<tbody>'
        ];

        tmp1 = template('tpl_image_row', {
            index: 0,
            button: true,
            iteration: index
        });
        
        tmp2 = [
            '</tbody>',
            '</table>',
            '<a href="#" class="add-size js-add-size" data-iteration="{$smarty.foreach.i.iteration}"><i class="icon icon-plus-square"></i> Добавить размер</a>',
            '</div>'
        ];

        str.push( tmp0.join('\n') );
        str.push( tmp1 );
        str.push( tmp2.join('\n') );
    }
    
    if ( [ 'list', 'section', 'autocomplete', 'select', 'radio', 'checkbox', 'multiselect' ].indexOf( type ) >= 0 )
    {
        tmp = [
            '<div class="cb clearfix">',
                '<label class="controll"><input type="checkbox" class="controll__input" value="1" onchange="switch_types(this)" name="f_use_table_list[' + index + ']"><span class="controll__visible controll__visible_checkbox"></span><span class="controll__text">привязать к `#__mdd_lists`</span></label>',

                '<div class="case case0">',
                    '<input name="f_table_name[' + index + ']" value="" class="mb5" placeholder="Название таблицы (#_news)">',
                    '<input name="f_table_field[' + index + ']" value="" placeholder="Поле (title)">',
                '</div>',
                
                '<div class="case case1 hidden">',
                    '<input name="f_table_list[' + index + ']" disabled placeholder="BIND списка" value="">',
                '</div>',
            '</div>'
        ];

        str.push( tmp.join('\n') );
    }
    
    if ( [ 'range', 'slider' ].indexOf( type ) >= 0 )
    {
        tmp = [
            '<div class="-col">',
                '<div class="-left">',
                    '<input name="f_range[' + index + '][min]" value="" placeholder="Min" class="integer">',
                '</div>',
                '<div class="-right">',
                    '<input name="f_range[' + index + '][max]" value="" placeholder="Max" class="integer">',
                '</div>',
            '</div>'
        ];

        str.push( tmp.join('\n') );
    }
    
    if ( type == 'editor' && typeof CONFIGURE !== 'undefined' && typeof CONFIGURE.editor !== 'undefined' )
    {
        tmp = [];
        tmp.push( '<div class="option-group option-combo">' );
        
        var x, checked = '';
        
        for( x in CONFIGURE.editor )
        {
            checked = '';
            
            if ( typeof CONFIGURE.editor[x]['default'] !== 'undefined' && CONFIGURE.editor[x]['default'] == 1 )
            {
                checked = ' checked';
            }
            
            tmp.push( '<label><input type="radio" name="f_editor[' + index + ']" value="'+ CONFIGURE.editor[x]['system'] + '" ' + checked + '><span class="option">' + CONFIGURE.editor[x]['name'] + '</span></label>' );
        }
        
        tmp.push( '</div>' );
        
        
        if ( typeof CONFIGURE !== 'undefined' && typeof CONFIGURE.editor_mode !== 'undefined' )
        {
            tmp.push( '<div class="cb mb10"></div>' );
            
            tmp.push( '<div class="option-group">' );
                for( x in CONFIGURE.editor_mode )
                {
                    tmp.push( '<label><input type="radio" name="f_editor_mode[' + index + ']" value="' + CONFIGURE.editor_mode[ x ] + '"><span class="option">' + CONFIGURE.editor_mode[ x ] + '</span></label>' );
                }
                             
            tmp.push( '</div>' );
        }
        
        str.push( tmp.join('\n') );
    }
    
    if ( type == 'redactor' && typeof CONFIGURE !== 'undefined' && typeof CONFIGURE.redactor !== 'undefined' )
    {
        tmp = [];
        tmp.push( '<div class="group">' );
        
        var x, checked = '';

        for( x in CONFIGURE.redactor )
        {
            if (typeof(CONFIGURE.redactor[x]['name']) !== 'undefined' && typeof(CONFIGURE.redactor[x]['system']) !== 'undefined')
            {
                checked = '';
                
                if ( typeof CONFIGURE.redactor[x]['default'] !== 'undefined' && CONFIGURE.redactor[x]['default'] == 1 )
                {
                    checked = ' checked';
                }
            
                tmp.push( '<label class="group__item"><input type="radio" class="group__item__rb" name="f_redactor[' + index + ']" value="'+ CONFIGURE.redactor[x]['system'] + '"' + checked + '><span class="group__item__style"></span><span class="group__item__text">' + CONFIGURE.redactor[x]['name'] + '</span></label>' );
            }
        }
        
        tmp.push( '</div>' );
        
        str.push( tmp.join('\n') );
    }

    return str.join('\n');
}

function switch_types(obj)
{
    p_obj = $(obj).closest('td');
    if ( obj.checked )
    {
        $(".case1",p_obj).show();
        $(".case1 input",p_obj).attr({"disabled": false});
        $(".case0",p_obj).hide();
        $(".case0 input",p_obj).attr({"disabled": true});
    }
    else {
        $(".case0",p_obj).show();
        $(".case0 input",p_obj).attr({"disabled": false});
        $(".case1",p_obj).hide();
        $(".case1 input",p_obj).attr({"disabled": true});
    }
}

function humanSize(bytes) {
    if (typeof bytes !== 'number') {
        return '';
    }
    
    if (bytes >= 1000000000) {
        return (bytes / 1000000000).toFixed(2) + ' Гб';
    }

    if (bytes >= 1000000) {
        return (bytes / 1000000).toFixed(2) + ' Мб';
    }

    if (bytes >= 1024)
    {
        return (bytes / 1000).toFixed(2) + ' Кб';
    }

    return bytes + ' б';
}

function addExtendet() {
    $.post(
        "/" + ADMIN_DIR + "/ajax/vote/",
        { 
            action: $("#action").attr("value")  ,
            id: $("#id").attr("value") ,
            title: $("#title").attr("value") ,
            ord: $("#ord").attr("value") ,
            visible: $("#VoteAddQuestions input:radio[name=visible]:checked").val()
        },
        onAjaxSuccessAdd
    );
    function onAjaxSuccessAdd(data) { //
        var vis;
        if ( $("#VoteAddQuestions input:radio[name=visible]:checked").val() == 1 ) vis = "Да";
        else  vis = "Нет";

        var inner = '<tr id="tr_'+data+'">';
        inner += '<td>';
        inner += '<input name="parent_id_'+data+'" id="parent_id_'+data+'" value="2" type="hidden">';
        inner += '<input name="id_'+data+'" id="id_'+data+'" value="'+data+'" type="hidden">';
        inner += '<div id="title_'+data+'"><b>'+$("#title").attr("value")+'</b></div>';
        inner += '<div id="title_i_'+data+'" style="display: none;">';
        inner += '<input name="title_'+data+'" value="'+$("#title").attr("value")+'" class="bord padd w100" id="title_input_'+data+'" type="text">';
        inner += '<p align="right">';
        inner += '<a href="javascript:;" onclick="saveExtendet(\''+data+'\');">Сохранить</a> | ';
        inner += '<a href="javascript:;" onclick="cancelExtendet(\''+data+'\');">Отмена</a> ';
        inner += '</p>';
        inner += '</div>';
        inner += '</td>';
        inner += '<td>';
        inner += '<div id="ord_'+data+'"><b>'+$("#ord").attr("value")+'</b></div>';
        inner += '<div id="ord_i_'+data+'" style="display: none;">';
        inner += '<input name="ord_'+data+'" value="'+$("#ord").attr("value")+'" style="width: 100%;" class="bord padd w100" id="ord_input_'+data+'" type="text">';             
        inner += '</div>';
        inner += '</td>';

        inner += '<td align="center">';
        inner += '<div id="visible_'+data+'"><b>'+vis+'</b></div>';
        inner += '<div id="visible_i_'+data+'" style="display: none;">';
        inner += '<input name="visible_'+data+'" value="1" checked="checked" onclick="$(\'#vis_'+data+'\').val(\'1\');" id="visible_input_'+data+'_1" type="radio">Да &nbsp;&nbsp;';
        inner += '<input name="visible_'+data+'" value="0" onclick="$(\'#vis_'+data+'\').val(\'0\');" id="visible_input_'+data+'_0" type="radio">Нет';
        inner += '<input name="vis_'+data+'" id="vis_'+data+'" value="" type="hidden">';
        inner += '</div>';
        inner += '</td>';
        inner += '<td>';
        inner += '<a href="#" class="icon icon-edit" onclick="editExtendet(\''+data+'\')"></a>';
        inner += '<a href="#" class="icon icon-delete remove-trigger" onClick="delExtendet(\''+data+'\')"></a>';
        inner += '</td>';
        inner += '</tr>';

        //  INSERT NEW FIELD
        $(inner).insertBefore("#ajax_add_form");
        
        //  RESET FORMS ELEMENTS
        $("#title").attr({value:""});
        $("#ord").attr({value:""});
        
        //  HIDE FORM
        $("#ajax_add_form").hide();
    }
}
    function saveExtendet(id) {
    $.post(
        "/" + ADMIN_DIR + "/ajax/vote/",
        {
            action: "update" ,
            id: $("#id_"+id).attr("value") ,
            parent_id: $("#parent_id_"+id).attr("value") ,
            title: $("#title_input_"+id).attr("value") ,
            ord: $("#ord_input_"+id).attr("value") ,
            visible: $("#VoteAddQuestions input:radio[name=visible_"+id+"]:checked").val()
        }, 
        onAjaxSuccessSave
    );
    function onAjaxSuccessSave(data) {
        var vis;
        if ( $("#vis_"+id).val() == 1 ) vis = "Да" ;
        else  vis = "Нет";
        $("#title_"+id).html( "<b>"+$("#title_input_"+id).attr("value")+"</b>" );
        $("#ord_"+id).html( $("#ord_input_"+id).attr("value") );
        $("#visible_"+id).html( vis );
        
        $("#title_"+id).show();
        $("#ord_"+id).show();
        $("#visible_"+id).show();
        $("#title_i_"+id).hide();
        $("#ord_i_"+id).hide();
        $("#visible_i_"+id).hide();
    }
    
}
//
function editExtendet(id) {
    $("#title_"+id).hide();
    $("#ord_"+id).hide();
    $("#visible_"+id).hide();
    $("#title_i_"+id).show();
    $("#ord_i_"+id).show();
    $("#visible_i_"+id).show();
}
//
function delExtendet(id) {
    if (cp.dialog("Вы действительно хотите удалить запись?")) {
        $.post(
            "/" + ADMIN_DIR + "/ajax/vote/",
            { 
                action: "del" ,
                id: $("#id_"+id).val()
            }, 
            onAjaxSuccessDel
        );
    }
}
function onAjaxSuccessDel(data){
    $("#tr_"+data).remove();
}
//
function cancelExtendet(id) {       
    $("#title_"+id).show();
    $("#ord_"+id).show();
    $("#visible_"+id).show();
    $("#title_i_"+id).hide();
    $("#ord_i_"+id).hide();
    $("#visible_i_"+id).hide();
}

function onAjaxSuccess(data) {
    alert(data);
}

function editTitle( id, title )
{
    if (typeof(title) == 'undefined')
    {
        var title = $('#ftitle_'+id).text();
    }

    var name = prompt('Введите новое имя', title);
    
    if (name != '' && name != title && name !== null)
    {
        $.ajax({
            url: '/' + ADMIN_DIR + '/meta/filename',
            type: "post",
            data: {
                id: id,
                name: name
            },
            dataType: 'JSON',
            success: function(response)
            {
                if (response.status === true)
                {
                    $('#ftitle_' + id).html( name );
                }
            }
        });
    }

    return false;
}

function editVisible(id, visible)
{
    visible = (visible == 1 ? 0 : 1);

    $.ajax({
        url: '/' + ADMIN_DIR + '/meta/filevisible',
        type: "post",
        data: {
            id: id,
            visible: visible
        },
        dataType: 'JSON',
        success: function(response)
        {
            if (response.status === true)
            {
                $('#fvisible_' + id).removeClass('icon-eye icon-eye-off');

                if (visible == 1)
                {
                    $('#fvisible_' + id).addClass('icon-eye');
                }
                else {
                    $('#fvisible_' + id).addClass('icon-eye-off');
                }
            }
        }
    });

	return false;
}

function editOrd( id, ord )
{
	neword = prompt('Порядок', ord);
	if (!neword) return false;
	if ( neword != '' && neword != ord ) {
		$.post('/' + ADMIN_DIR + '/ajax/meta/', { action: "newfileord", neword: neword, id: id }, function(data) {
			if ( data == 1 ) {
				$('#ordfile_' + id).html( neword );
			}
		});
	}
	return false;
}

function ajax_vis_toggle( obj, id, mod_id )
{
    $(obj).append('<i class="loading"></i>');
    
	$.post( '/' + ADMIN_DIR + '/ajax/structure/', { act: "toggle_visible", mod_id: mod_id, id: id }, function(data) {
        if ( data == 1 )
        {
            $(obj).toggleClass("icon-eye").toggleClass("icon-eye-off").html('');
        }
    });
    
	return !1;
}

function show_tooltips(id)
{
	$("#"+id).toggle();
}

function my_uncheck(){
	$(".access").each(function(){
		$(this).attr({checked:''});
	});
}

function setModuleLimit(obj, module_id)
{
    value = parseInt($(obj).val());
    if (value > 0)
    {
        setCookie('modulePager_' + module_id, value);
        location.href = location.href;
    }
}

function setModuleSort(obj, module_id, field)
{
	cn = "moduleSort";
	value = $(obj).val();
    alert(value);
	var cv = getCookie(cn);
	if (cv)
	{
		var arr = new Array();
		tmp = unserialize(cv);
		
		if (tmp[module_id] == undefined){
			var arr = new Array();
			arr[field] = value;
			tmp[module_id] = arr;
		}
		else{
			if (tmp[module_id][field] == undefined){
				tmp[module_id][field] = value;
			}
			else{
				tmp[module_id][field] = value;
			}
		}
		
		setCookie(cn,serialize(tmp));
	}
	else
	{
		var arr = new Array();
		var tmp = new Array();
		tmp[field] = value;
		arr[module_id] = tmp;
		setCookie(cn,serialize(arr));
	}
	location.href = location.href;
}

function CheckAndSubmit(id){
    var flag = true;
	$("#"+id+" .ness").each(function(){
		if ( $(this).val() == "" ) {
			$(this).focus().addClass("error");
			flag = false;
			return false;
		} else {
			$(this).removeClass("error");
		}
	});
	if (flag)
		$("#"+id).submit();
	else return false;
}

function setSort(obj,cookie_name){
	value = $(obj).val();
	setCookie(cookie_name,value);
	location.href = location.href;
}

function form_submit(id,param)
{
	if (param == "save")
		$("#"+id).submit();
	if (param == "apply")
		$("#"+id).submit();
	else
		$("#"+id).submit();
}

function openwin( img , w , h , title )
{
	if ( hwnd != null )
	hwnd.close();
	hwnd = window.open( img , "" , "toolbar=no , location=no , directories=no , resizable=no , width=" + w + " , height=" + h );
	hwnd.document.open();
	hwnd.document.write("<html>");
	hwnd.document.write("<head>");
	hwnd.document.write("<title>" + title + "</title>");
	hwnd.document.write("</head>");
	hwnd.document.write("<body bgcolor=#ffffff bottommargin=0 leftmargin=0 marginheight=0 marginwidth=0 rightmargin=0 topmargin=0 style='border:0px;'>");
	hwnd.document.write("<table align=center width=100% height=100% cellspacing=0 cellpadding=0 border=0>");
	hwnd.document.write("<tr><td><img src='" + img + "' border=0></td></tr>");
	hwnd.document.write("</table></body></html>");
	hwnd.document.close();
}

function openwin_text( url , w , h )
{
	window.open( url , "" , "toolbar=no , location=no , directories=no , resizable=no , scrollbars=no , width=" + w + " , height=" + h );
}

function ltrim(str)
{ 
	for(var k = 0; k < str.length && isWhitespace(str.charAt(k)); k++);
	return str.substring(k, str.length);
}

function rtrim(str)
{
	for(var j=str.length-1; j>=0 && isWhitespace(str.charAt(j)) ; j--) ;
	return str.substring(0,j+1);
}

function trim(str)
{
	str = str.replace(/\s{2,}/g,' ');
	return ltrim(rtrim(str));
}

function isWhitespace(charToCheck)
{
	var whitespaceChars = " \t\n\r\f";
	return (whitespaceChars.indexOf(charToCheck) != -1);
}

function binding( name, element )
{
	$('input[name="' + name + '"]').on('keyup', function(){
        if ( this.value !== '' )
        {
        	$('input[name="' + element + '"]').val( transliterate( this.value, URL_TRANSLATE ) );
        }
    });
}

function transliterate( string, TRANSLATE )
{
	string = trim(string.toLowerCase());

	if ( string != '' ) {
		var strto = '', symbol = '',
			ar = {
				'”':'','“':'', '%':'', '&':'', '#':'', '$':'', '№':'',
				'@':'', '\/':'', '\\':'', '(': '', ')': '',
				'}': '', '{': '', '^': '',
				'[':'', ']':'', '|':'', '+':'', '<':'',
				'>':'', '«':'', '»':'', '`':'', '\'':'',
				' ': '-', '"': '', "'": '', ',': '',
				'.':'', '!':'', '?':'', ':':'', ';': '', '*': '',
				'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g',
				'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'j',
				'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k',
				'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
				'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
				'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c',
				'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ы': 'y',
				'э': 'e', 'ю': 'yu', 'я': 'ya', 'ъ': '', 'ь': '', '®': '', '©': '', '™': '', '℗': '', '§': '', '℠': ''
			};
			
		for( var i=0; i < string.length; i++ )
		{
			symbol = string.charAt( i );
			new_symbol = ar[symbol];
			
			if ( new_symbol != null ) {
				strto = strto + new_symbol;
				continue;
			}
			
			HexSym = symbol.charCodeAt(i).toString(16);
			
			if ( HexSym >="41" || HexSym <="5A" )
			{
				strto = strto + symbol;
				continue;
			}
			
			if ( HexSym >="61" || HexSym <="7A" )
			{
				strto = strto + symbol;
				continue;
			}
		}
		
		return redouble( strto );
	}
}

function Perekodir( string )
{
	string = trim( string.toLowerCase() );
	if ( string != '' )
	{
		var ar = {
			'±':'','~':'','%':'','”':'','“':'','&':'','#':'','$':'','№':'','@':'','\/':'','\\':'','(':'',')':'','[':'',']':'','|':'','+':'','<':'','>':'','«':'','»':'','`':'','\'':'','а':"a",'А':"A",'б':"b",'Б':"B",'в':"v",'В':"V",'г':"g",'Г':"G",'д':"d",'Д':"D",'е':"e",'Е':"E",'ё':"io",'Ё':"Io",'ж':"zh",'Ж':"Zh",'з':"z",'З':"Z",'и':"i",'И':"I",'й':"iy",'Й':"Iy",'к':"k",'К':"K",'л':"l",'Л':"L",'м':"m",'М':"M",'н':"n",'Н':"N",'о':"o",'О':"O",'п':"p",'П':"P",'р':"r",'Р':"R",'с':"s",'С':"S",'т':"t",'Т':"T",'у':"u",'У':"U",'ф':"f",'Ф':"F",'х':"h",'Х':"H",'ц':"c",'Ц':"C",'ч':"ch",'Ч':"CH",'ш':"sh",'Ш':"Sh",'щ':"sh",'Щ':"Sh",'ъ':"",'ы':"i",'Ы':"I",'ь':"",'э':"e",'Э':"E",'ю':"iu",'Ю':"Iu",'я':"ia",'Я':"Ia",' ':"_",'-':"_",'"':"","'":"",',':"",'.':"",'!':"",'?':"",':':"",';':""
		};
		
		var strto = "";
		var symbol = "";
		var sysname = document.getElementById( 'stc_sys_name' );
		for( var i=0; i<string.length; i++ )
		{
			symbol = string.charAt( i );
			new_symbol = ar[symbol];
			if ( new_symbol != null )
			{
				strto = strto + new_symbol;
				continue;
			}
			HexSym = symbol.charCodeAt(i).toString(16);
			if ( HexSym >="41" || HexSym <="5A" )
			{
				strto = strto + symbol;
				continue;
			}
			if ( HexSym >="61" || HexSym <="7A" )
			{
				strto = strto + symbol;
				continue;
			}
		}
		
		if (sysname.value == "")
			sysname.value = strto;
	}
}

function redouble( string )
{
	string = string.replace( '__', '_' );
    string = string.replace( '_-_', '_' );
	string = string.replace( '--', '-' );
	
	if ( string.indexOf('__') > -1 )
	{
		return redouble( string );
	}
	
	if ( string.substr(0,1) == '_' && string.length > 1 )
	{
		string = string.substr(1, string.length )
	}
	
	return string ;
}

function ajax_toggle_group(obj,id)
{
    var visible = 0;
    
    if ( $(obj).hasClass('icon-eye-off') )
    {
        visible = 1;
    }
    else
    {
        visible = 0;
    }
    
    $(obj).append('<i class="loading"></i>');
    
    $.post('/' + ADMIN_DIR + '/ajax/modules/', { action: "devisible", id: id, visible: visible }, function(data){
        if ( data == 1 )
        {
            if ( $(obj).hasClass('icon-eye-off') )
            {
                $(obj).removeClass('icon-eye-off').addClass('icon-eye').html('');
            }
            else {
                $(obj).removeClass('icon-eye').addClass('icon-eye-off').html('');
            }
        }
    });

    return false;
}

function toggle_menu(obj,id)
{
	$(obj).toggleClass("minus").toggleClass("plus").parent();
	$("#item"+id).toggle();
}

function toggle_small_photo(id){
    $("#"+id).toggle();
}

function hideField(id){
    title = $("#docs_"+id+" .title_in").val();      
    ord = $("#docs_"+id+" .ord_in").val();
    
    $("#docs_"+id+" .title_f").empty().append(title);
    $("#docs_"+id+" .ord_f").empty().append(ord);
    $("#docs_"+id+" .but_save").hide();
    $("#docs_"+id+" .ctr_edit").show();
}

function EditDocs(id){
    $("#docs_"+id+" .but_save").show();
    $("#docs_"+id+" .ctr_edit").hide();
    
    curr_value = $("#docs_"+id+" .title_f").text();
    $("#docs_"+id+" .title_f").empty().append("<input type='text' value='"+curr_value+"' name='title' class='bord padd w100 title_in' />");
    curr_value = $("#docs_"+id+" .ord_f").text();
    $("#docs_"+id+" .ord_f").empty().append("<input type='text' value='"+curr_value+"' name='ord' class='bord padd w20 ord_in' />");
    
    $("#docs_"+id+" .title_in").focus();
    return false;
}   

function SaveDocs(id){
    title = $("#docs_"+id+" .title_in").val();
    ord = $("#docs_"+id+" .ord_in").val();
    
    if (!title) {
        alert("Пустое имя документа");
        hideField(id);
    }
    
    $.post(
        '/' + ADMIN_DIR + '/ajax/document/',
        {
            id:"document_edit",             
            docsid:id,
            title:title,
            ord:ord
        },
        function(data){
            alert('Данные обновлены');
            hideField(id);
        }
    );      
    return false;
}

function DelDocs(id){
    if (cp.dialog('Вы действительно хотите удалить?')){
        $.post(
            '/' + ADMIN_DIR + '/ajax/document/',
            {
                id:"document_del",              
                docsid:id
            },
            function(data){
                if (data>0) {
                    $("#docs_"+id).hide();
                }
                else alert('ошибка обновления');
            }
        );
    }
    return false;
}

function page_update( item_id )
{
    $.post('/' + ADMIN_DIR + '/ajax/document/',
        {
            id:"update", post_id:item_id
        },
        function(data){
            var json = eval( "(" + data + ")" ) ;
            parseMsg( json , "file_docs" ) ;
        }
    );
    return false ;
}

function parseMsg(msg,obj){
    $("#"+obj+" .uploadfiles").empty();
    $("#"+obj+" input:file").attr({"value":""});
    
    str = '<table style="margin-bottom:10px;width:80%"><tr>\n<td class="h w100">Документ</td>\n<td class="h">Размер</td>\n<td class="h">Удалить</td></tr>\n';
    var i = 0;
    $.each( msg, function(k,v) {
        if ( i % 2 != 0 ) odd = "odd ";
        else odd = "";
        str += '<tr>\n<td class="'+odd+'"><a href="'+v.sys_name+'" title="" target="_blank">'+v.title+'</a></td>\n';
        str += '<td class="'+odd+'r"> '+v.size+'</td>\n';
        str += '<td class="actions"><a href="#" onclick="return cp.ajaxFileDelete('+v.id+',\''+obj+'\');" class="ctr_a ctr_del margin" title="Удалить" onclick="return confirm(\'Вы действительно хотите удалить?\')"></a></td>\n</tr>\n';
        i++;
    });
    str += '</table>'
    $("#"+obj+" .uploadfiles").append(str);
}

function ajaxFileDocsUpload(docs_group_id){
    
}

function screening( str ) {
    var reg=/"/g ;
    var result=str.replace(reg, "&quot;" ) ;
    
    return result ;
}

function _addslashes( str ){return str.replace('/(["\'\])/g', "\\$1").replace('/\0/g', "\\0");}
function _stripslashes( str ){return str.replace('/\0/g', '0').replace('/\(.)/g', '$1');}
function clearCookie(){var now = new Date();var yesterday = new Date(now.getTime() - 1000 * 60 * 60 * 24);this.setCookie('co'+this.obj, 'cookieValue', yesterday);this.setCookie('cs'+this.obj, 'cookieValue', yesterday);};
function setCookie(cookieName, cookieValue, expires, path, domain, secure){document.cookie=escape(cookieName) + '=' + escape(cookieValue)+(expires ? '; expires=' + expires.toGMTString() : '')+(path ? '; path=' + path : '')+(domain ? '; domain=' + domain : '')+(secure ? '; secure' : '');};
function getCookie (cookieName){var cookieValue = '';var posName = document.cookie.indexOf(escape(cookieName) + '=');if (posName != -1) {var posValue = posName + (escape(cookieName) + '=').length;var endPos = document.cookie.indexOf(';', posValue);if (endPos != -1) cookieValue = unescape(document.cookie.substring(posValue, endPos));else cookieValue = unescape(document.cookie.substring(posValue));}return (cookieValue);};
function serialize (mixed_value) {var _getType = function (inp) {var type = typeof inp, match;var key;if (type == 'object' && !inp) {return 'null';}if (type == "object") {	if (!inp.constructor) {	return 'object';}var cons = inp.constructor.toString();match = cons.match(/(\w+)\(/);if (match) {	cons = match[1].toLowerCase();}var types = ["boolean", "number", "string", "array"];for (key in types) {if (cons == types[key]) {type = types[key];	break;}}}return type;};var type = _getType(mixed_value);var val, ktype = '';switch (type) {case "function": val = ""; break;case "boolean":val = "b:" + (mixed_value ? "1" : "0");break;case "number":val = (Math.round(mixed_value) == mixed_value ? "i" : "d") + ":" + mixed_value;break;case"string":val = "s:" + encodeURIComponent(mixed_value).replace(/%../g, 'x').length + ":\"" + mixed_value + "\"";break;case "array":case "object":val = "a";/*if (type == "object") {var objname = mixed_value.constructor.toString().match(/(\w+)\(\)/);if (objname == undefined) {return;}objname[1] = this.serialize(objname[1]);val = "O" + objname[1].substring(1, objname[1].length - 1);}*/var count = 0;var vals = "";var okey;var key;for (key in mixed_value) {ktype = _getType(mixed_value[key]);if (ktype == "function") { continue; }okey = (key.match(/^[0-9]+$/) ? parseInt(key, 10) : key);vals += this.serialize(okey) +this.serialize(mixed_value[key]);count++;}val += ":" + count + ":{" + vals + "}";break;case "undefined": default: val="N";break;}if (type != "object" && type != "array") {val += ";";}return val;}
function unserialize (data) {var error = function (type, msg, filename, line){throw new this.window[type](msg, filename, line);};var read_until = function (data, offset, stopchr){var buf = [];var chr = data.slice(offset, offset + 1);var i = 2;while (chr != stopchr) {if ((i+offset) > data.length) {error('Error', 'Invalid');}buf.push(chr);chr = data.slice(offset + (i - 1),offset + i);i += 1;}return [buf.length, buf.join('')];};var read_chrs = function (data, offset, length){var buf;buf = [];for (var i = 0;i < length;i++){var chr = data.slice(offset + (i - 1),offset + i);buf.push(chr);}return [buf.length, buf.join('')];};var _unserialize = function (data, offset){var readdata;var readData;var chrs = 0;var ccount;var stringlength;var keyandchrs;var keys;if (!offset) {offset = 0;}var dtype = (data.slice(offset, offset + 1)).toLowerCase();var dataoffset = offset + 2;var typeconvert = new Function('x', 'return x');switch (dtype){case 'i':typeconvert = function (x) {return parseInt(x, 10);};readData = read_until(data, dataoffset, ';');chrs = readData[0];readdata = readData[1];dataoffset += chrs + 1;break;case 'b':typeconvert = function (x) {return parseInt(x, 10) !== 0;};readData = read_until(data, dataoffset, ';');chrs = readData[0];readdata = readData[1];dataoffset += chrs + 1;break;case 'd':typeconvert = function (x) {return parseFloat(x);};readData = read_until(data, dataoffset, ';');chrs = readData[0];readdata = readData[1];dataoffset += chrs + 1;break;case 'n':readdata = null;break;case 's':ccount = read_until(data, dataoffset, ':');chrs = ccount[0];stringlength = ccount[1];dataoffset += chrs + 2;readData = read_chrs(data, dataoffset+1, parseInt(stringlength, 10));chrs = readData[0];readdata = readData[1];dataoffset += chrs + 2;if (chrs != parseInt(stringlength, 10) && chrs != readdata.length){error('SyntaxError', 'String length mismatch');}break;case 'a':readdata = {};keyandchrs = read_until(data, dataoffset, ':');chrs = keyandchrs[0];keys = keyandchrs[1];dataoffset += chrs + 2;for (var i = 0; i < parseInt(keys, 10); i++){var kprops = _unserialize(data, dataoffset);var kchrs = kprops[1];var key = kprops[2];dataoffset += kchrs;var vprops = _unserialize(data, dataoffset);var vchrs = vprops[1];var value = vprops[2];dataoffset += vchrs;readdata[key] = value;}dataoffset += 1;break;default:error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype);break;}return [dtype, dataoffset - offset, typeconvert(readdata)];};return _unserialize((data+''), 0)[2];}
function __debug(arr,level) {var dumped_text = "";if (!level) level = 0;var level_padding = "";for(var j=0;j<level+1;j++) level_padding += "    ";if (typeof(arr) == 'object') { for(var item in arr) {var value = arr[item];if (typeof(value) == 'object') { dumped_text += level_padding + "'" + item + "' ...\n";dumped_text += dump(value,level+1);} else {dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";}}} else { dumped_text = "===>"+arr+"<===("+typeof(arr)+")";}return dumped_text;}

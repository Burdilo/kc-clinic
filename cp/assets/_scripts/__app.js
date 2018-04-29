var d = document;

;( function( $ ){
	"use strict";

	$.cp = {
		
		initSandwich: function()
		{
			$('.menu-trigger').sandwich({
				wrapper: '.layout-wrapper',
				overlay: '#menu-overlay'
			});
		},

		initSelect: function()
		{
			selectize();
		},

		initPopover: function()
		{
			$('.trigger-popover').popover();
		},

		initFileManager: function()
		{
			
		},

		initControls: function()
		{

			function keyControls()
			{
			    $(".remove-trigger").on('click', function (e){
			        e.preventDefault();

			        var _self_ = this, href = $(_self_).attr('href');

			        $.post(href, function(){
			            cp.notify('Удалено', 'info');

			            if (typeof($(_self_).attr('rel')) !== 'undefined' && $($(_self_).attr('rel')).length > 0)
			            {
			                $($(_self_).attr('rel')).remove();
			            }
			            else {
			                $(_self_).closest('tr').remove();
			            }
			        });

			        return !1;
			    });

			    $('.reducing-trigger').on('keydown', function (e) {
			        if (e.which == 38 || e.which == 40) {
			            e.preventDefault();
			            
			            var reducing = $(this).data('reducing') || 10,
			                format = $(this).data('format'),
			                value = parseInt($(this).val()) || 0, result = 0;
			            
			            if (e.which == 38)
			            {
			                result = value + reducing;
			            }
			            else if (e.which == 40)
			            {
			                result = value - reducing;
			            }

			            if (result < 0)
			            {
			                result = 0;
			            }

			            if (typeof(format) !== 'undefined')
			            {
			                result = '?i%'.replace('?i', result);
			            }

			            $(this).val(result);
			        }
			    });
			    
			    $('.latin').on('keypress', function(e) {
			        var regex = /[^A-Za-z]/g;
			        if (regex.test(String.fromCharCode(e.keyCode))) {
			            return !1;
			        }
			    });
			    
			    $(".integer").on('keypress', function (e) {
			        if ([0, 8, 13, 38, 40].indexOf( e.which ) < 0 && (e.which < 48 || e.which > 57))
			        {
			            return !1;
			        }
			    });

			    $(".float").on('keypress', function (e) {
			        if ( [0, 8, 13, 38, 40, 44, 46].indexOf( e.which ) < 0 && ( e.which < 48 || e.which > 57 ) )
			        {
			            return !1;
			        }
			    });
			}

		},

		init: function()
		{

			this.initControls();
			this.initFileManager();
			this.initPopover();
			this.initSelect();
			
			this.tree.init();

		}
	};

})( jQuery );



// function on_load()
// {
    
//     $('body').on('click', '.js-size-delete', function(e){
//         e.preventDefault ? e.preventDefault() : e.returnValue = !1;
//         $(this).closest('tr').remove();
//     });

//     $('body').on('click', '.js-add-size', function(e){
//         e.preventDefault ? e.preventDefault() : e.returnValue = !1;

//         var $table = $(this).closest('.js-size-list').find('table').find('tbody'),
//             iteration = parseInt($(this).data('iteration')),
//             index = 0;

//         $table.find('tr').each(function(){
//             if (parseInt($(this).data('index')) > index)
//             {
//                 index = parseInt($(this).data('index'));
//             }
//         });

//         index ++;

//         $table.append(
//             template('tpl_image_row', {
//                 index: index,
//                 button: true,
//                 iteration: iteration
//             })
//         );
//     });

//     if ($('.js-table-toggle').length)
//     {
//         $('.js-table-toggle').on('click', function(e, flag){
//             e.preventDefault ? e.preventDefault() : e.returnValue = !1;
            
//             if (flag) {
//                 cp.tableToggle($(this).data('toggle'));
//             }
//             else {
//                 cp.tableToggle($(this).data('toggle'), e);
//             }
//         });

//         if ($('.js-table-toggle[data-toggle-init="true"]').length)
//         {
//             $('.js-table-toggle[data-toggle-init="true"]').trigger('click', true);
//         }
//     }

//     if ($('.js-slider').length)
//     {
//         $('.js-slider').each(function(){
//             var id = $(this).attr('id');
//             var type = $(this).data('type');
//             var value = $(this).data('value');
//             var min = $(this).data('min');
//             var max = $(this).data('max');
            
//             slider(id, type, value, min, max);
//         });
//     }

//     if ($('.js-map').length)
//     {
//         $('.js-map').each(function(){
//             var element = $(this).data('element');
//             var provider = $(this).data('provider');
            
//             mapConteiner(provider, element);
//         });
//     }

//     if ($('.js-redactor').length)
//     {
//         $('.js-redactor').each(function(){
//             var id = $(this).attr('id');
//             var type = $(this).data('redactor');
            
//             _redactor.init(id, type);
//         });
//     }

//     if ($('.js-editor').length)
//     {
//         $('.js-editor').each(function(){
//             var id = $(this).attr('id');
//             var type = $(this).data('editor');
//             var hightlight = $(this).data('hightlight');

//             _editor.init(id, type, hightlight);
//         });
//     }

//     if ($('.js-binding').length)
//     {
//         $('.js-binding').each(function(){
//             if (!$(this).hasClass('js-binding-init'))
//             {
//                 binding($(this).data('binding-name'), $(this).data('binding-element'));
//             }
//         });
//     }

//     if ($('.js-fileupload').length)
//     {
//         $.upload.init();
//     }

//     $('body').on('mouseenter', '.js-structure-controll', function(e){
//         $(this).find('.structure__control.animate').removeClass('animate');
//     });

//     $('body').on('mouseleave', '.js-structure-controll', function(e){
//         $(this).find('.structure__control').addClass('animate');
//     });

//     $('body').on('click', '.menu-trigger', function(e){
//         e.preventDefault();
//         $('#page').toggleClass('page-open');
        
//         var visibility = 'visible';

//         if (!$('#page').hasClass('page-open'))
//         {
//             visibility = 'hidden'
//         }

//         $('#overlay').css({
//             'visibility': visibility
//         });

//         return !1;
//     });

//     $('#meta_data').sortable({
//         handle: '.js-trigger-drag',
//         pullPlaceholder: false,
//         bodyClass: 'dragging',
//         draggedClass: 'dragged',
//         containerSelector: 'table',
//         itemPath: '> tbody',
//         itemSelector: 'tr',
//         placeholder: '<tr class="placeholder"/>',
//         onDrop: function ($item, container, _super, event) {
//             $item.removeClass('dragged').removeAttr("style");
//             $("body").removeClass('dragging')
//         }
//     });

//     $('body').on('mouseenter', '.trigger-navigation', function(e){
//         var $item = $(this), $page = $('#page'), title = $item.attr('rel'), tooltip, id = 'tooltip-' + $item.attr('id');

//         if (title && !$('#'+id).length && !$page.hasClass('page-open'))
//         {
//             var pos_top = $item.offset().top + 10;

//             tooltip = document.createElement('span');
//             tooltip.id = id;
//             tooltip.innerHTML = title;
//             tooltip.className = 'navigation__tooltip navigation__tooltip_animate';
//             tooltip.style.top = pos_top + 'px';

//             $page.append(tooltip);

//             setTimeout(function(){
//                 $(tooltip).removeClass('navigation__tooltip_animate');
//             }, 30);
//         }
//     });
    
//     $('body').on('mouseleave', '.trigger-navigation', function(e){
//         var id = 'tooltip-' + $(this).attr('id');

//         if ($('#'+id).length)
//         {
//             var $tooltip = $('#'+id);

//             $tooltip.addClass('navigation__tooltip_animate');

//             setTimeout(function(){
//                 $tooltip.remove();
//             }, 200);
//         }
//     });

//     $('body').on('click', '.wrapper', function(e){
//         $('#page').removeClass('page-open');
//         $('#overlay').css({
//             'visibility': 'hidden'
//         });
//     });

//     $('body').on('mouseenter', '.trigger-tooltip', function(e){
//         $(this).data('xtitle', $(this).prop('title'));
//         $(this).prop('title', '');
//     });

//     $('body').on('mouseleave', '.trigger-tooltip', function(e){
//         $(this).prop('title', $(this).data('xtitle'));
//         $(this).data('xtitle', '');
//     });



// $(document).ready(function(){
//     // InstantClick.on('change', function(){
//         
//         datepicker();
//         metaCounter();
//         seoCrowl();
//         keyControls();
//         on_load();
//         cp.dropdown();
//         cp.tableToggleList();
//         cp.cleditor();
//     // });

//     // InstantClick.init();
// });
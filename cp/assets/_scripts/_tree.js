;( function( $ ){
	"use strict";

	$.cp.tree = {

		init: function()
		{
		    if ($('.nestable-tree').length)
		    {
		        var structure_tree = $('.nestable-tree').eq(0);

		        if (typeof(structure_tree.data('path')) !== 'undefined' && typeof(structure_tree.data('group')) !== 'undefined')
		        {
		            var path = structure_tree.data('path'),
		                group = parseInt(structure_tree.data('group'));

		            structure_tree.nestable({
		                group:  group,
		                maxDepth: 20,
		                dragStop: function(el)
		                {
		                    var target, parent, next;

		                    next = 0;
		                    target = parseInt(el[0].id.split('-')[1]);
		                    parent = parseInt(el[0].offsetParent.offsetParent.id.split('-')[1]);

		                    if (el[0].nextElementSibling !== null)
		                    {
		                        next = parseInt(el[0].nextElementSibling.id.split('-')[1]);
		                    }

		                    if (!isNaN(target) && !isNaN(parent))
		                    {
		                        $.ajax({
		                            url: '/' + ADMIN_DIR + '/' + path + '/updateStructure',
		                            type: "post",
		                            data: {
		                                oid: target,
		                                pid: parent,
		                                nid: next
		                            }
		                        });
		                    }
		                },
		                afterExpand: function(el)
		                {
		                    var id = el[0].id.split('-')[1];
		                    $.removeCookie(path + '_collapse_' + id, { path: '/' });
		                },
		                afterCollapse: function(el)
		                {
		                    var id = el[0].id.split('-')[1];
		                    $.cookie(path + '_collapse_' + id, '1', { expires: 30, path: '/' });
		                }
		            });
		        }
		    }
		}
	};

})( jQuery );

/*
doOnLoad('structure');
buildTree('structure', 'index');

$('#nestable-menu').on('click', function(e)
{
    var target = $(e.target),
        action = target.data('action');
    if (action === 'expand-all') {
        $('.dd').nestable('expandAll');
    }
    if (action === 'collapse-all') {
        $('.dd').nestable('collapseAll');
    }
});

var list = this;
list.el.find(list.options.itemNodeName).each(function() {
    list.collapseItem($(this));
});


expandItem: function(li)
{
    li.removeClass(this.options.collapsedClass);
    li.children('[data-action="expand"]').hide();
    li.children('[data-action="collapse"]').show();
    li.children(this.options.listNodeName).show();
},

collapseItem: function(li)
{
    var lists = li.children(this.options.listNodeName);
    if (lists.length) {
        li.addClass(this.options.collapsedClass);
        li.children('[data-action="collapse"]').hide();
        li.children('[data-action="expand"]').show();
        li.children(this.options.listNodeName).hide();
    }
},

var updateOutput = function(e)
{
    var list   = e.length ? e : $(e.target),
        output = list.data('output');
    if (window.JSON) {
        output.val(window.JSON.stringify(list.nestable('serialize')));//, null, 2));
    } else {
        output.val('JSON browser support required for this demo.');
    }
};

// activate Nestable for list 1
$('#nestable').nestable({
    group: 1
})
.on('change', updateOutput);

// activate Nestable for list 2
$('#nestable2').nestable({
    group: 1
})
.on('change', updateOutput);

// output initial serialised data
updateOutput($('#nestable').data('output', $('#nestable-output')));
updateOutput($('#nestable2').data('output', $('#nestable2-output')));

$('#nestable-menu').on('click', function(e)
{
    var target = $(e.target),
        action = target.data('action');
    if (action === 'expand-all') {
        $('.dd').nestable('expandAll');
    }
    if (action === 'collapse-all') {
        $('.dd').nestable('collapseAll');
    }
});

$('#nestable3').nestable();
*/
var _redactor = {

    imperavi: function(id)
	{
       $('#' + id).redactor({
            lang: 'ru',
            minHeight: 10,
            maxHeight: 650,
            buttonSource: true,
            placeholder: 'Содержимое блока...',
            tabAsSpaces: 4,
            codemirror: true,
            formatting: ['p', 'div', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],

            visual: true,
            fixed: true,
            toolbarFixed: true,
            toolbarOverflow: true,
            
            fullpage: false,
            autoresize: true,

            linebreaks: false,
            cleanSpaces: true,
            
            cleanOnPaste: true,
            pastePlainText: false,
            
            convertDivs: false,
            
            removeComments: true,

            cleanStyleOnEnter: false,
            removeDataAttr: true,
            observeLinks: true,

            autoformat: false,

            removeClasses: true,
            removeStyles: true,

            convertLinks: true,

            convertUrlLinks: false,
            removeEmptyTags: false,

            convertImageLinks: true,
            convertVideoLinks: true,

            imageFloatMargin: '15px',

            buttonsHideOnMobile: ['image', 'video'],

            replaceStyles: [
                ['font-weight:\s?bold', "strong"],
                ['font-weight:\s?700', "strong"],
                ['font-style:\s?italic', "em"],
                ['text-decoration:\s?underline', "u"]
            ],

            removeEmpty: ['strong', 'em', 'span'],

            plugins: [
                'table',
                'video',
                'filemanager',
                'limiter',
                'fontcolor',
                'fontsize',
                'fontfamily',
                'textdirection',
                'imagemanager',
                'definedlinks',
                'counter',
                'clips',
                'fullscreen'
            ],
            
            formattingAdd: [
                {
                    tag: 'h6',
                    title: 'Заголовок 6'
                }
            ],

            replaceTags: [
                ['strike', 'del'],
                ['i', 'em'],
                ['b', 'strong'],
                ['big', 'strong'],
                ['strike', 'del']
            ],

            deniedTags: ['html', 'head', 'link', 'body', 'meta', 'applet', 'style', 'script', 'meta', 'link'],
            
            buttonsAdd: ['pre', '|'],
            activeButtonsAdd: {
                pre: 'pre'
            },

            buttonsCustom: {
                pre: {
                    title: 'Code',
                    callback: function()
                    {
                        this.formatBlocks('pre');
                    }
                }
            },

            fileManagerJson: '/tests/files.json',

            fileUpload: '/apps/upload/file_upload.php',
            imageUpload: '/apps/upload/image_upload.php',
            clipboardUploadUrl: '/apps/upload/clipboard.php',

            css: '/css/main.min.css'
            //css: '/apps/wysiwyg/imperavi/redactor-iframe.css'
        });

        CodeMirror.fromTextArea($('#' + id)[0], {
            mode: 'htmlmixed',
            tabMode: "indent",
            tabSize: 4,
            indentUnit: 4,
            lineWrapping: true,
            lineNumbers: true
        });
	},

	tinymce: function(id)
	{
        tinymce.init({
            selector: '#' + id,
            // height: 500,
            theme: 'modern',
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons template paste textcolor colorpicker textpattern imagetools'
            ],
            menubar: true,
            image_advtab: true,
            fullpage: true,
            
            // toolbar1: 'code fullpage | ',
            // toolbar2: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            // toolbar3: 'print preview media | forecolor backcolor emoticons',

            // toolbar1: "code fullpage | bold italic underline strikethrough | forecolor backcolor | insertfile link image | unlink anchor media | alignleft aligncenter alignright alignjustify",
            // toolbar2: "bullist numlist | outdent indent blockquote | inserttime preview | table | hr removeformat | subscript superscript | charmap | ltr rtl | spellchecker | visualchars visualblocks nonbreaking restoredraft",
            // toolbar3: "tyleselect formatselect fontselect fontsizeselect",

            toolbar1: 'code | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | insertfile link image',
            toolbar2: "styleselect | undo redo | hr removeformat | subscript superscript | forecolor backcolor",

            toolbar_items_size: 'small',
            style_formats: [
                {title: 'Bold text', inline: 'b'},
                {title: 'Red text', inline: 'span', styles: {color: '#f00'}},
                {title: 'Red header', block: 'h1', styles: {color: '#f00'}},
                {title: 'Example 1', inline: 'span', classes: 'example1'},
                {title: 'Example 2', inline: 'span', classes: 'example2'},
                {title: 'Table styles'},
                {title: 'Table row 1', selector: 'tr', classes: 'tablerow1'}
            ],
            visualblocks_default_state: false,
            end_container_on_empty_block: true,
            content_css: [
                '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
                '//www.tinymce.com/css/codepen.min.css'
            ]
        });
	},

    cleditor: function(id)
    {
        $('#' + id).cleditor();
    },
	
    ckeditor: function(id)
	{
        CKEDITOR.replace(id, {
            customConfig: '/apps/wysiwyg/ckeditor/config.js'
        });
	},
	
    wysiwyg: function(id)
	{
		$('#' + id).wysiwyg({
			toolbar: 'top', // 'selection'|'top'|'top-selection'|'bottom'|'bottom-selection'
            hotKeys: {
                'ctrl+b meta+b': 'bold',
                'ctrl+i meta+i': 'italic',
                'ctrl+u meta+u': 'underline',
                'ctrl+z meta+z': 'undo',
                'ctrl+y meta+y meta+shift+z': 'redo'
            }
		});
	},

	init: function(id, type)
	{
		if (typeof(this[type]) !== 'undefined')
		{
			this[type](id);
		}
	}
};
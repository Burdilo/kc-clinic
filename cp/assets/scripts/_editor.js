function saving(id, content)
{
    $.ajax({
        url: '/' + ADMIN_DIR + '/save/',
        type: 'post',
        data: {
            id: id,
            cont: content,
            pathname: location.pathname
        },
        dataType: 'JSON',
        success: function(response)
        {
            if (response == 1) {
                alert("Данные удачно сохранены.");
            } else {
                alert("Ошибка, данные небыли сохранены.");
            }
        }
    });
}

function isFullScreen(cm) {
    return /\bCodeMirror-fullscreen\b/.test(cm.getWrapperElement().className);
}

function winHeight() {
    return window.innerHeight || (document.documentElement || document.body).clientHeight;
}

function setFullScreen(cm, full) {
    var wrap = cm.getWrapperElement(), scroll = cm.getScrollerElement();
    if (full)
    {
        wrap.className += " CodeMirror-fullscreen";
        scroll.style.height = winHeight() + "px";
        document.documentElement.style.overflow = "hidden";
    }
    else
    {
        wrap.className = wrap.className.replace(" CodeMirror-fullscreen", "");
        scroll.style.height = "";
        document.documentElement.style.overflow = "";
    }
    cm.refresh();
}

var _editor = {
    codemirror: function(id, mode)
    {
        var object = document.getElementById(id);

        if (mode == 'xml')
        {
            mode = {
                name: "xml",
                alignCDATA: true
            };
        }

        if (mode == 'sql')
        {
            mode = 'text/x-mariadb';
            if (window.location.href.indexOf('mime=') > -1)
            {
                mode = window.location.href.substr(window.location.href.indexOf('mime=') + 5);
            }
        }

        var editor = CodeMirror.fromTextArea(object, {
            mode: mode,
            gutters: ["note-gutter", "CodeMirror-linenumbers"],
            tabSize: 4,
            indentUnit: 4,
            lineNumbers: true,
            lineWrapping: true,
            tabMode: "indent",
            autofocus: false,
            enterMode: "keep",
            smartyVersion  : 3,
            continueComments: "Enter",
            extraKeys: {
                "Ctrl-S": function(cm) {
                    saving();
                    return false;
                },
                "Cmd-S": function(cm) {
                    saving();
                    return false;
                },
                "Ctrl-Q": "toggleComment",
                "Cmd-Q": "toggleComment"
            }
        });

        emmetCodeMirror(editor);
    },
    init: function(id, type, mode)
    {
        if (typeof(this[type]) !== 'undefined')
        {
            this[type](id, mode);
        }
    }
};
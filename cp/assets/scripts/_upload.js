$(document).ready(function(){
   $.upload = {
        open: function(selector, isClearErr, isResetForm, isOverlay)
        {
            clearInterval(uploadOpenTimeout);
            uploadOpenTimeout = setTimeout(function() {
                upload._open(selector, isClearErr, isResetForm, isOverlay);
            }, 200);
        },
        clearErrors: function($upload) {
            $upload.find('.error').removeClass('error');
            $upload.find('.upload__errorList').addClass('hide').empty();
            $upload.find('.hide-on-open').hide();
            $upload.find('.tooltip').remove();
        }
    };

    $.upload.init = function() {
        var dropzoneTemplate = $('.js-dropzone-template').html();
        var action = '/' + ADMIN_DIR + '/meta/fileUpload';
        var token = $('meta[name="csrf-token"]').attr('content');
        var myDropzone, count = 0, maxFiles, dzid, groupid, settings, input_name;

        Dropzone.autoDiscover = false;

        $('.js-fileupload').each(function(i){
            
            var element = this;
            var element = '.js-fileupload';

            return (function(element) {

                $myDropzone = $(element);

                if ($myDropzone.data('action'))
                {
                    action = $myDropzone.data('action');
                }

                dzid = $myDropzone.attr('id');
                maxFiles = null;

                count = parseInt($myDropzone.find('.js-fileupload-count').val());
                
                if (count == 0)
                {
                    maxFiles = 1;
                }
                
                var dropzone = new Dropzone('#' + dzid, {
                    url: action,
                    paramName: 'file',
                    previewTemplate: dropzoneTemplate,
                    acceptedFiles: 'image/*',
                    maxFiles: maxFiles,
                    clickable: '#' + dzid + '-target',
                    previewsContainer: '#' + dzid + '-preview',
                    headers: { 'X-CSRF-TOKEN': token },
                    parallelUploads: 2,

                    init: function()
                    {
                        this.on("success", function(file, response) {
                            console.log("success");
                        });
                    },
                    
                    maxfilesexceeded: function(file)
                    {
                        //this.removeAllFiles();
                        //this.addFile(file);
                        cp.notify("Можно загрузить только 1 файл");
                    },

                    sending: function(file, xhr, formData)
                    {
                        console.log(this.element);

                        groupid = $(this.element).find('.js-fileupload-group').val();
                        settings = $(this.element).find('.js-fileupload-settings').val();
                        input_name = $(this.element).find('.js-fileupload-group').attr('name');
                        
                        formData.append("name", input_name);
                        formData.append("groupid", groupid);
                        formData.append("settings", settings);

                        //console.log("item", count, dzid, groupid, settings, input_name);
                    },

                    thumbnail: function(file, dataUrl)
                    {
                        if (file.previewElement)
                        {
                            file.previewElement.classList.remove("dz-file-preview");
                            var images = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
                            var extension = '';

                            for (var i = 0; i < images.length; i++)
                            {
                                extension = file.name.split('.');
                                extension = extension[extension.length-1];

                                console.log(file.name, extension);
                                dataUrl = '/' + ADMIN_DIR + '/images/ff/' + extension + '.svg';

                                var thumbnailElement = images[i];
                                thumbnailElement.alt = file.name;
                                thumbnailElement.src = dataUrl;
                            }
                            
                            setTimeout(function() { file.previewElement.classList.add("dz-image-preview"); }, 1);
                        }
                    },

                    uploadprogress: function(file, progress, bytesSent)
                    {
                        if (progress == 100)
                        {
                            $(file.previewElement).find('.dz-progress').fadeOut(300, function(){
                                $(this).remove();
                            });
                        }
                    }
                });

            })(this);

        });
    };
});
<?php
/* Smarty version 3.1.30, created on 2018-04-24 17:21:07
  from "/home/b/burdilo/kc-clinic.ru/public_html/protected/templates/themes/base/smarty/scripts.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5adf3d539dfc41_72007455',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '5448cc629e50bc1e4d38e3cc508bcb0540393882' => 
    array (
      0 => '/home/b/burdilo/kc-clinic.ru/public_html/protected/templates/themes/base/smarty/scripts.tpl',
      1 => 1518687264,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5adf3d539dfc41_72007455 (Smarty_Internal_Template $_smarty_tpl) {
if (!is_callable('smarty_function_compress')) require_once '/home/b/burdilo/kc-clinic.ru/public_html/protected/core/lib/templaters/smarty/plugins_cms/function.compress.php';
?>
<!-- <?php echo '<script'; ?>
 src="//api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"><?php echo '</script'; ?>
> --><?php echo smarty_function_compress(array('attr'=>'data-no-instant','mode'=>'js','type'=>'inline','source'=>array(array('file'=>'/js/vendor.min.js'),array('file'=>'/js/app.min.js'),array('file'=>'/js/main.js'))),$_smarty_tpl);
if (isset($_smarty_tpl->tpl_vars['suggestions']->value)) {?><!--[if lt IE 10]><?php echo '<script'; ?>
 type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/jquery-ajaxtransport-xdomainrequest/1.0.1/jquery.xdomainrequest.min.js"><?php echo '</script'; ?>
><![endif]--><?php echo '<script'; ?>
 type="text/javascript" src="https://dadata.ru/static/js/lib/jquery.suggestions-15.12.min.js"><?php echo '</script'; ?>
><?php }
echo '<script'; ?>
 type="text/javascript" src="/js/jquery.touchSwipe.min.js"><?php echo '</script'; ?>
><?php echo '<script'; ?>
 src="/js/jquery.featureCarousel.js" type="text/javascript"><?php echo '</script'; ?>
><?php echo '<script'; ?>
 src="/colorbox/jquery.colorbox.js" type="text/javascript"><?php echo '</script'; ?>
><?php echo '<script'; ?>
 type="text/javascript">
    $(document).ready(function() {
        var carousel = $("#carousel").featureCarousel({
          // include options like this:
          // (use quotes only for string values, and no trailing comma after last option)
          // option: value,
          // option: value
          smallFeatureWidth: 0.7,
          smallFeatureHeight: 0.7,
          trackerSummation: true
        });
    });
    
    jQuery(document).ready(function(){
        jQuery("a[rel='cbox']").colorbox();
    });
<?php echo '</script'; ?>
><?php echo '<script'; ?>
 type="text/javascript" src="//code.jquery.com/jquery-migrate-1.2.1.min.js"><?php echo '</script'; ?>
><?php echo '<script'; ?>
 type="text/javascript" src="/js/slick.min.js"><?php echo '</script'; ?>
><?php echo '<script'; ?>
 type="text/javascript">
    $(document).ready(function(){
        $('.mainSlider').slick({
          dots: true,
          infinite: true,
          speed: 2500,
          fade: true,
          cssEase: 'linear',
          autoplay: true,
          arrows: false,
          lazyLoad: 'ondemand'
        });
    });
<?php echo '</script'; ?>
><!-- Yandex.Metrika counter --><?php echo '<script'; ?>
 type="text/javascript" >
    (function (d, w, c) {
        (w[c] = w[c] || []).push(function() {
            try {
                w.yaCounter46184997 = new Ya.Metrika({
                    id:46184997,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
                });
            } catch(e) { }
        });

        var n = d.getElementsByTagName("script")[0],
            s = d.createElement("script"),
            f = function () { n.parentNode.insertBefore(s, n); };
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://mc.yandex.ru/metrika/watch.js";

        if (w.opera == "[object Opera]") {
            d.addEventListener("DOMContentLoaded", f, false);
        } else { f(); }
    })(document, window, "yandex_metrika_callbacks");
<?php echo '</script'; ?>
><noscript><div><img src="https://mc.yandex.ru/watch/46184997" style="position:absolute; left:-9999px;" alt="" /></div></noscript><!-- /Yandex.Metrika counter --></body></html><?php }
}

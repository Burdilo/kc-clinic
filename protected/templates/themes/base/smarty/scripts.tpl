{strip}

<!-- <script src="//api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script> -->

{* file   = '/js/compress.js' *}

{compress
    attr   = 'data-no-instant'
    mode   = 'js'
    type   = 'inline'
    source = [
        [ 'file' => '/js/vendor.min.js' ],
        [ 'file' => '/js/app.min.js' ],
        [ 'file' => '/js/main.js' ]
    ]
}

{if isset($suggestions)}
    <!--[if lt IE 10]><script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/jquery-ajaxtransport-xdomainrequest/1.0.1/jquery.xdomainrequest.min.js"></script><![endif]-->
    <script type="text/javascript" src="https://dadata.ru/static/js/lib/jquery.suggestions-15.12.min.js"></script>
{/if}

<script type="text/javascript" src="/js/jquery.touchSwipe.min.js"></script>
<script src="/js/jquery.featureCarousel.js" type="text/javascript"></script>
<script src="/colorbox/jquery.colorbox.js" type="text/javascript"></script>

<script type="text/javascript">
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
</script>

<script type="text/javascript" src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script type="text/javascript" src="/js/slick.min.js"></script>
<script type="text/javascript">
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
</script>

<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
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
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/46184997" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->

</body>
</html>
{/strip}
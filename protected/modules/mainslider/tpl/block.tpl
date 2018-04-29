{if $mainslider}
<h1>Косметологическая клиника - КС-Клиник.</h1>
<div class="mainSlider">
	{foreach from=$mainslider item=slider}
	<div class="slider__item">
		{if $slider.link !=""}<a href="{$slider.link}">{/if}
			{foreach from=$slider.image_file item=image}
			<img data-lazy="{$image.original.file}">
			{/foreach}
		{if $slider.link !=""}</a>{/if}
	</div>
	{/foreach}
</div>
{/if}
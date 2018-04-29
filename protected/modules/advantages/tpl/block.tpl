{if $advantages}
<div class="advantages">
	{foreach from=$advantages item=adv}
	<div class="advantage">
		<div class="advantage__ico">
			{foreach from=$adv.image_file item=image}
			<img src="{$image.original.file}">
			{/foreach}
		</div>
		<div class="advantage__info">
			<div class="advantage__title">{$adv.title}</div>
			<div class="advantage__desc">{$adv.desc}</div>
		</div>
	</div>
	{/foreach}
</div>
<!--<div class="bottom__banner">
	<a class="bottomBanner_mainLink">
		<img src="/images/bottom-banner.jpg">
		<p class="bottomBanner__title">Для любой проблемы есть решение</p>
		<a class="bottomBanner__link">Узнайте свою формулу красоты</a>
		<a class="bottomBanner__more">Подробнее <span>>></span></a>
	</a>
</div>-->
{/if}
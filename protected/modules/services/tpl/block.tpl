{if $services}
<div class="services__block">
	<p class="services__info">«КС Клиник» одна из передовых медицинских клиник Краснодара в области эстетической медицины и косметологии.</p>
	<h2 class="services__title">Услуги Клиники</h2>
	<div class="services">
		{foreach from=$services item=service}
		<div class="service">
			<div class="service__image">
				{foreach from=$service.image_file item=image}
				<img src="{$image.original.file}">
				{/foreach}
			</div>
			<h3 class="service__title">{$service.title}</h3>
			<div class="srvice__shortDesc">{$service.short_desc}</div>
		</div>
		{/foreach}
	</div>
	<div class="clear"></div>
	<div class="services__all">
		<a id="all_uslugi" data-toggle=".layout-wrapper">Полный список услуг Клиники</a>
		<p>Консультация и составление плана процедур бесплатно</p>
	</div>

</div>
{/if}
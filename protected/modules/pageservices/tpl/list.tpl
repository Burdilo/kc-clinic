{if $services}
<div class="page__uslugi">
	<div class="uslugi__list">
		{foreach from=$services item=a}
		<div class="uslugi__item">
			<div class="uslugiItem__title">
				<h2><a href="{$module_root}/{$a.system}">{$a.title}</a></h2>
			</div>
			<div class="uslugiItem__cover">
				{foreach from=$a.image_file item=image}
				<img src="{$image.md.file}">
				{/foreach}
			</div>
		</div>
		{/foreach}
	</div>
</div>
{/if}
{if $news}

<div class="news__wrap">
	{foreach from=$news item=a}
	<div class="news__item">
		<h2 class="news__title"><a class="news__link" href="{$module_root}/{$a.system}">{$a.title}</a></h2>
		<div class="news__anons">
			{foreach from=$a.cover_file item=cover}
			<div class="news__cover">
				<img src="{$cover.sm.file}">
			</div>
			{/foreach}
			<div class="news__anons_text">
				{$a.anons}
			</div>
		</div>
		<div class="news__date">
			<p>{$a.date}</p>
		</div>
	</div>
	{/foreach}
</div>

{/if}
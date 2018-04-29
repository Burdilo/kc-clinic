{if $news}

<div class="news__wrap">
	<div class="separator_title">
		<div></div>
	</div>
	<h3 class="newsOnMaon__title"><a href="/novosti">Новости</a></h3>
	{foreach from=$news item=a}
	<div class="news__item">
		<h3 class="news__title"><a class="news__link" href="/novosti/{$a.system}">{$a.title}</a></h3>
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
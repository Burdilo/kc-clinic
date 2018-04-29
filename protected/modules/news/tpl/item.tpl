{if $news}
<div class="newsItem__wrap">
	<div class="newsItem__title">
		<h1>{$news.title}</h1>
	</div>
	<div class="newsItem__image">
		{foreach from=$news.cover_file item=image}
		<img src="{$image.original.file}" >
		{/foreach}
	</div>
	<div class="newsItem__text">
		{$news.text}
	</div>
	<div class="newsItem__date">
		{$news.date}
	</div>
	<div class="cb"></div>
	<div class="goTo__newsList">
		<a href="/novosti">Вернуться к странице новостей</a>
	</div>
</div>
{/if}
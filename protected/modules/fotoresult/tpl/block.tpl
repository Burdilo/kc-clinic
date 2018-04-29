{if $fotoresult}
<div class="fotoresult__block">
	<h2 class="services__title">Фотографии результатов</h2>
	<div class="carousel-container">
		<div id="carousel">
			{foreach from=$fotoresult item=foto}
			<div class="carousel-feature">
          		<a>
          		{foreach from=$foto.image_file item=image}
          		<img class="carousel-image" alt="Image Caption" src="{$image.sm.file}">
          		{/foreach}
          		</a>
          	</div>
          	{/foreach}
		</div>

		<div id="carousel-left"><img src="/images/arrow-left.png" /></div>
      	<div id="carousel-right"><img src="/images/arrow-right.png" /></div>
	</div>
</div>
{/if}
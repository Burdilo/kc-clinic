{strip}
{if $gallery}
<div class="gallery_wrap">
	{foreach from=$gallery item=album name=alb}
	<div class="album_item">
		<div class="album_title">
			<h2>{$album.album}</h2>
		</div>
		<div class="album_images">
			{foreach from=$album.images_file item=image}
			<div class="album_imageItem">
				<a href="{$image.original.file}" class="cboxElement" rel="cbox"><img src="{$image.sm.file}"></a>
			</div>
			{/foreach}
		</div>
	</div>
	{if !$smarty.foreach.alb.last}
	<div class="separator_title">
		<div style="widht: 400px; border-bottom-width: 2px;"></div>
	</div>
	{/if}
	{/foreach}
</div>
{/if}
{/strip}
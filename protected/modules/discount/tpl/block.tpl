{strip}
{if $discount}
<div class="discount_wrap">
	{foreach from=$discount item=a}
	<div class="discount_item">
		
		<div class="discount_text {if $a.image_position == 'left'} fr{else} fl{/if}">
			<h2>{$a.title}</h2>
			{$a.text}
		</div>

		<div class="discount_image {if $a.image_position == 'left'} fr{else} fl{/if}">
			{foreach from=$a.image_file item=image}
			<img src="{$image.original.file}">
			{/foreach}
		</div>

		<div class="cb"></div>
	</div>
	{/foreach}
</div>
{/if}
{/strip}
{strip}
{if $docs}
<div class="docs">
	{foreach from=$docs item=doc}
	<div class="docs_item">
		{foreach from=$doc.image_file item=image}
		<a href="{$image.md.file}" class="cboxElement" rel="cbox"><img src="{$image.sm.file}"></a>
		{/foreach}
	</div>
	{/foreach}
</div>
{/if}
{/strip}
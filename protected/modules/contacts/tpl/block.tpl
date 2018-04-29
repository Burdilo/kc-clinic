{if $contacts}
<div class="contacts__block">
	<div class="contacts__address">
		<p><strong>Адрес: </strong>{$contacts.address}</p>
	</div>
	<div class="contacts__phone">
		<p><strong>Телефон: </strong><a href="tel:{$contacts.phone}">{$contacts.phone}</a></p>
	</div>
	<div class="contacts__regim">
		<p><strong>Время работы: </strong>{$contacts.regim}</p>
	</div>
	<div class="contacts__map">
		{literal}
		<script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A7bb047f605a4358ed5ded7357dae17d0ca817def4d8e7bf90557165724f785d4&amp;width=100%25&amp;height=400&amp;lang=ru_RU&amp;scroll=true"></script>
		{/literal}
	</div>
</div>
{/if}
{strip}
{include file="./meta.tpl"}
{include file="./header.tpl"}
<div class="layout-wrapper">
	<div class="overview"></div>
	<div id="overlay"></div>
	<div class="feedback__wrap">
		<form id="feedback">
			<a class="feedback_close">&times;</a>
			<p class="feedback__title">Форма связи</p>
			<p class="feedback__desc">Здравствуйте, через эту форму вы можете задать вопрос или оставить заявку на звонок от администрации КС-Клиник.</p>
			<div class="feedback__item">
				<input type="text" name="name" placeholder="Ваше имя*" requared />
			</div>
			<div class="feedback__item">
				<input type="text" name="phone" placeholder="Номер телефона*" requared />
			</div>
			<div class="feedback__item">
				<textarea name="text" placeholder="Здесь вы можете написать свой вопрос или обращение" requared></textarea>
			</div>
			<div class="feedback__item"></div>
			<div class="feedback__item"><a class="clear_all"></a><input type="submit" /></div>
		</form>
	</div>
	<div class="feedback_success">
		<img src="/images/feedback_success.png">
		<p>Ваше сообщение успешно отправлено!<br>
		Мы свяжемся с Вами в ближайшее время.</p>
		<a class="close_success">Закрыть</a>
	</div>
	{include file="./sidebar.tpl"}

	<div class="layout-wrapper__container">

		{include file="$PATH_THEMES/system/breadcrumbs.tpl"}
		<section class="content clearfix" itemprop="mainContentOfPage" role="main">
			<a name="content"></a>
			{if $_page.name}
				{if $uri[0] != ""}
				<h1>{$_page.name}</h1>
				{/if}
			{/if}
			{$_page.content}
		</section>
		<div class="cb"></div>
	</div>	
	{include file="./footer.tpl"}
</div>

{include file="./scripts.tpl"}
{/strip}
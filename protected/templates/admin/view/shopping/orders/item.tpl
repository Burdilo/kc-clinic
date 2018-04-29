    <!--Модальное окно заказов-->
    <div class="b-modal hidden-form ui-draggable" id="add-order-wrapper" style="position: absolute; left: 349px; top: 284px;">
      <div class="orders-table-wrapper">
        <div class="widget-table-title">
          <h4 class="add-order-table-icon"></h4>
          <div class="b-modal_close tool-tip-bottom"></div>
        </div>
        <div class="widget-table-body">
          <div class="order-preview">
            <div class="category-filter">
              <button class="editor-order tool-tip-bottom custom-btn order-edit-visible" data-id=""><span>Редактировать</span></button>
              <button class="print-button tool-tip-bottom custom-btn order-edit-visible" data-id=""><span>Печать</span></button>
              <button class="csv-button tool-tip-bottom custom-btn order-edit-visible" data-id=""><span>Сохранить в CSV</span></button>
              <button class="get-pdf-button tool-tip-bottom custom-btn order-edit-visible" data-id=""><span>Сохранить в PDF</span></button>
              <span class="custom-text">Статус заказа:</span>
              <select id="orderStatus" class="last-items-dropdown custom-dropdown tool-tip-right" name="status_id">
                <option value="0"> не подтвержден </option>
                <option value="1"> ожидает оплаты </option>
                <option value="2"> оплачен </option>
                <option value="3"> в доставке </option>
                <option value="4"> отменен </option>
                <option value="5"> выполнен </option>
                <option value="6"> в обработке </option>
              </select>
              <div class="user-inform"><label><input type="checkbox" name="inform-user" value="false">Информировать покупателя о смене статуса.</label></div>
            </div>
            <div class="loading-block"></div>
            <div class="clear"></div>
            <div id="order-data">
              <div class="search-block order-edit-display">
                <div class="add-product-field">
                  <span>Добавить товар!: </span>
                  <input type="text" autocomplete="off" name="searchcat" class="search-field" placeholder="Наименование или артикул товара.">
                  <div class="errorField" style="display: none;">Необходимо добавить товар к заказу!</div>
                </div>
                <div class="example-line">Введите, например: <a href="javascript:void(0)" class="example-find">Ноутбук Dell Inspiron N411Z</a></div>
                <div class="fastResult" style="display: none;"></div>
              </div>
              <div class="product-block">
                <!-- Здесь будет отображена карточка товара -->
              </div>
              <form name="orderContent">
                <div class="order-history">
                </div>
              </form>
            </div>
            <button class="save-button tool-tip-bottom"><span>Применить</span></button>
            <div class="clear"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- Тут начинается  Верстка таблицы заказов -->
    <div class="widget-table-body">
      <div class="widget-table-action">
        <a href="javascript:void(0);" class="add-new-button tool-tip-top"><span>Добавить заказ</span></a>
        <a href="javascript:void(0);" class="show-filters tool-tip-top"><span>Фильтры</span></a>
        <a href="javascript:void(0);" class="show-property-order tool-tip-top"><span>Настройки заказов</span></a>
        <div class="filter">
          <span class="last-items">Заказов на странице</span>
          <select class="last-items-dropdown countPrintRowsOrder">
            <option value="10">10</option><option value="20" selected="selected">20</option><option value="30">30</option><option value="50">50</option><option value="100">100</option>                    </select>
          </div>
          <div class="clear"></div>
        </div>
        <div class="filter-container">
          <form name="filter" class="filter-form" data-print-res="true"><div class="mg-filter-head"><div class="filter-preview"><div class="loader-search"></div><span></span></div><div class="wrapper-field"><span class="label-field">id заказа:</span> <input type="text" name="id" value="" class="price-input"></div><div class="wrapper-field"><span class="label-field">Номер заказа:</span> <input type="text" name="number" value="" class="price-input"></div><div class="wrapper-field"><span class="label-field">email:</span> <input type="text" name="user_email" value="" class="price-input"></div><div class="wrapper-field"><span class="label-field">Ф.И.О. покупателя:</span> <input type="text" name="name_buyer[]" value="" class="price-input"></div><input type="hidden" name="name_buyer[]" value="like"><div class="wrapper-field"><div class="filter-select"><div class="select"><span class="label-field">Статус:</span><select name="status_id" class="last-items-dropdown"><option value="null" selected="selected">Не выбрано</option><option value="0">не подтвержден</option><option value="1">ожидает оплаты</option><option value="2">оплачен</option><option value="3">в доставке</option><option value="4">отменен</option><option value="5">выполнен</option><option value="6">в обработке</option></select></div></div></div><div class="wrapper-field">
          <div class="price-slider-wrapper">
            <ul class="price-slider-list">
              <li><span class="label-field">Сумма заказа от</span><input type="text" id="minCost" class="price-input start-price numericProtection  price-input" data-fact-min="690" name="summ[]" value="690"></li>
              <li><span class="label-field">до</span><input type="text" id="maxCost" class="price-input end-price numericProtection  price-input" data-fact-max="35450" name="summ[]" value="35450"><span>руб.</span></li>
            </ul>
            <div class="clear"></div>
            <div id="price-slider" class="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false"><div class="ui-slider-range ui-widget-header ui-corner-all" style="left: 0%; width: 100%;"></div><a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 0%;"></a><a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 100%;"></a></div>
          </div>
        </div>
        <div class="wrapper-field">
          <ul class="period-date">
            <li><span class="label-field">с</span> <input class="from-date hasDatepicker" type="text" name="add_date[]" value="31.10.2014" id="dp1441227951315"></li>
            <li><span class="label-field">по</span> <input class="to-date hasDatepicker" type="text" name="add_date[]" value="31.10.2014" id="dp1441227951314"></li>
          </ul>
        </div>
        <input type="hidden" name="add_date[]" value="date"> <input type="hidden" name="sorter" value="" class="price-input"></div><div class="wrapper-field filter-buttons"><a class="filter-now"><span>Фильтровать</span></a><a href="javascript:void(0);" class="refreshFilter"><span>Сбросить</span></a></div></form>                <div class="block-stat-info-order">
        <span>Найдено заказов: <strong>8 шт.</strong></span>
        <span>Общая сумма заказов: <strong>131 440 руб.</strong></span>
      </div>
      <div class="clear"></div>
    </div>
    <div class="property-order-container">
      <h2>Реквизиты:</h2>
      <form name="requisites" method="POST">
        <ul class="requisites-list">
          <li><span>Юр. лицо:</span><input type="text" name="nameyur" value=""></li>
          <li><span>Юр. адрес:</span><input type="text" name="adress" value=""></li>
          <li><span>ИНН:</span><input type="text" name="inn" value=""></li>
          <li><span>КПП:</span><input type="text" name="kpp" value=""></li>
          <li><span>ОГРН:</span><input type="text" name="ogrn" value=""></li>
          <li><span>Банк:</span><input type="text" name="bank" value=""></li>
          <li><span>БИК:</span><input type="text" name="bik" value=""></li>
          <li><span>К/Сч:</span><input type="text" name="ks" value=""></li>
          <li><span>Р/Сч:</span><input type="text" name="rs" value=""></li>
          <li><span>Руководитель:</span><input type="text" name="general" value=""></li>
        </ul>
        <ul class="order-form-img-list">
          <li><span>Подпись (180x80 в формате jpg): </span><input type="hidden" name="sing" value="">
          <img class="singPreview" src="http://demo.moguta.ru/uploads/sing.jpg"><br>
          <a href="javascript:void(0);" class="upload-sign custom-btn"><span>Загрузить</span></a>
        </li>
        <li><span>Печать (180x180 в формате jpg):</span><input type="hidden" name="stamp" value="">
        <img class="stampPreview" src="http://demo.moguta.ru/uploads/stamp.jpg"><br>
        <a href="javascript:void(0);" class="upload-stamp custom-btn"><span>Загрузить</span></a>
      </li>
    </ul>
    <ul class="nds-list">
      <li>В ценах заложен НДС: <input type="text" name="nds" size="2" value=""> %</li>
      <li>Использовать печать с подписью в документах: <input type="checkbox" name="usedsing" value=""></li>
      <li>Префикс перед номером: <input type="text" name="prefix" value=""></li>
      <li>Валюта прописью: <input type="text" name="currency" placeholder="рубль,рубля,рублей" value=""></li>
      <li>
        Статус заказа по умолчанию:
        <select name="order_status">
          <option value="0" selected="selected">не подтвержден</option>
          <option value="1">ожидает оплаты</option>
          <option value="2">оплачен</option>
          <option value="3">в доставке</option>
          <option value="4">отменен</option>
          <option value="5">выполнен</option>
          <option value="6">в обработке</option>
        </select>
      </li>
      <li>
        По умолчанию показывать заказы:
        <select name="default_date_filter">
          <option value="default">с начала продаж</option>
          <option value="month">с начала месяца</option>
          <option value="year">с начала года</option>
        </select>
      </li>
    </ul>
    <div class="clear"></div>
  </form>
  <div class="clear"></div>
  <a href="javascript:void(0);" class="save-property-order custom-btn"><span>Сохранить</span></a>
  <div class="clear"></div>
</div>
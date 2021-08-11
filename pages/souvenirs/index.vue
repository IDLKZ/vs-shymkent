<template>
  <section class="souvenirs-page">
    <div class="container">
      <ul class="crumbs">
        <li class="crumbs__item">
          <a href="/">Главная</a>
        </li>
        <li class="crumbs__item current">
          <a href="#">Сувениры</a>
        </li>
      </ul>
      <div class="top-content">
        <div class="top-content__wrapper top-content__wrapper-5">
          <h2 class="top-content__title">
            Сувениры
          </h2>
          <p class="top-content__text">
            Оставьте себе на память кусочек Шымкента
          </p>
        </div>
        <div class="top-content__line"></div>
      </div>
      <div class="souvenirs-page__tabs">
        <ul class="souvenirs-page__tabs-caption">
          <li class="active">Cувениры</li>
          <li>Ремесленники</li>
          <li>Сувенирные магазины</li>
        </ul>
        <div class="souvenirs-page__tabs-content active">
          <div class="souvenirs-page__wrapper">
            <div class="souvenirs-page__categories-inner">
              <button class="open-filter">
                <span>Фильтр</span>
              </button>
              <div class="souvenirs-page__list-categories">
                <div class="souvenirs-page__list-categories-container">
                  <h4 class="souvenirs-page__list-categories-title">
                    Продавец
                  </h4>
                  <div class="souvenirs-page__list-categories-item">
                    <input type="checkbox" id="route-tab2-1"> <label for="route-tab2-1">Все</label>
                  </div>
                  <div class="souvenirs-page__list-categories-item">
                    <input type="checkbox" id="route-tab2-2"> <label for="route-tab2-2">Ремесленники</label>
                  </div>
                  <div class="souvenirs-page__list-categories-item">
                    <input type="checkbox" id="route-tab2-3"> <label for="route-tab2-3">Сувенирные магазины</label>
                  </div>
                </div>
                <div class="souvenirs-page__list-categories-container">
                  <h4 class="routes-page__list-categories-title">
                    Стоимость
                  </h4>
                  <div class="souvenirs-page__list-categories-item">
                    <input type="checkbox" id="route-tab2-4"> <label for="route-tab2-4">Все</label>
                  </div>
                  <div class="souvenirs-page__list-categories-item">
                    <input type="checkbox" id="route-tab2-5"> <label for="route-tab2-5">До 5 тыс</label>
                  </div>
                  <div class="souvenirs-page__list-categories-item">
                    <input type="checkbox" id="route-tab2-6"> <label for="route-tab2-6">От 5 до 50 тыс</label>
                  </div>
                  <div class="souvenirs-page__list-categories-item">
                    <input type="checkbox" id="route-tab2-7"> <label for="route-tab2-7">От 50 тыс и выше</label>
                  </div>
                </div>
              </div>
              <button class="do-filter">
                Применить фильтр
              </button>
            </div>
            <div class="souvenirs-page__items-wrapper">
              <div class="souvenirs__items-inner">
                <div class="souvenirs__item">
                  <div class="souvenirs__item-img" style="background-image: url('/images/souvenirs-1.jpg');"></div>
                  <div class="souvenirs__item-content">
                    <h4 class="souvenirs__item-title">
                      Книга “Абай Кунанбаев”
                    </h4>
                    <p class="souvenirs__item-text">
                      Декоративная тарелка с изображением Абая Кунанбаева. Отличный выбор в качестве сувенира. Материалы: металл, позолота, дерево. Размеры: 21х16 см.
                    </p>
                    <div class="souvenirs__item-price-wrapper">
                      <button class="souvenirs__item-btn popup-modal" href="#modal"><span>Купить</span></button>
                      <div class="souvenirs__item-price">
                        47 500 ТГ
                      </div>
                    </div>
                  </div>
                </div>
                <div class="souvenirs__item">
                  <div class="souvenirs__item-img" style="background-image: url('/images/souvenirs-1.jpg');"></div>
                  <div class="souvenirs__item-content">
                    <h4 class="souvenirs__item-title">
                      Книга “Абай Кунанбаев”
                    </h4>
                    <p class="souvenirs__item-text">
                      Декоративная тарелка с изображением Абая Кунанбаева. Отличный выбор в качестве сувенира. Материалы: металл, позолота, дерево. Размеры: 21х16 см.
                    </p>
                    <div class="souvenirs__item-price-wrapper">
                      <button class="souvenirs__item-btn popup-modal" href="#modal"><span>Купить</span></button>
                      <div class="souvenirs__item-price">
                        47 500 ТГ
                      </div>
                    </div>
                  </div>
                </div>
                <div class="souvenirs__item">
                  <div class="souvenirs__item-img" style="background-image: url('/images/souvenirs-1.jpg');"></div>
                  <div class="souvenirs__item-content">
                    <h4 class="souvenirs__item-title">
                      Книга “Абай Кунанбаев”
                    </h4>
                    <p class="souvenirs__item-text">
                      Декоративная тарелка с изображением Абая Кунанбаева. Отличный выбор в качестве сувенира. Материалы: металл, позолота, дерево. Размеры: 21х16 см.
                    </p>
                    <div class="souvenirs__item-price-wrapper">
                      <button class="souvenirs__item-btn popup-modal" href="#modal"><span>Купить</span></button>
                      <div class="souvenirs__item-price">
                        47 500 ТГ
                      </div>
                    </div>
                  </div>
                </div>
                <div class="souvenirs__item">
                  <div class="souvenirs__item-img" style="background-image: url('/images/souvenirs-2.jpg');"></div>
                  <div class="souvenirs__item-content">
                    <h4 class="souvenirs__item-title">
                      Тарелка “Абай Кунанбаев”
                    </h4>
                    <p class="souvenirs__item-text">
                      Декоративная тарелка в шкатулке с изображением Абая Кунанбаева. Отличный выбор в качестве сувенира. Материалы: металл, позолота, дерево. Размеры: 16х16 см. Диаметр- 12,5 см
                    </p>
                    <div class="souvenirs__item-price-wrapper">
                      <button class="souvenirs__item-btn popup-modal" href="#modal"><span>Купить</span></button>
                      <div class="souvenirs__item-price">
                        22 500 ТГ
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="load-more">
                <a href="#">Загрузить еще</a>
              </div>
            </div>
          </div>
        </div>
        <div class="souvenirs-page__tabs-content">
          <div class="souvenirs-page__craft-inner">
            <a href="#" class="souvenirs-page__craft-item">
              <div class="souvenirs-page__craft-img" style="background-image: url('/images/craftman.png');"></div>
              <div class="souvenirs-page__craft-content">
                <h5 class="souvenirs-page__craft-name">
                  Абдураимова Санобар
                </h5>
                <div class="souvenirs-page__craft-count">
                  Товаров: <span>5</span>
                </div>
              </div>
            </a>
            <a href="#" class="souvenirs-page__craft-item">
              <div class="souvenirs-page__craft-img" style="background-image: url('/images/craftman.png');"></div>
              <div class="souvenirs-page__craft-content">
                <h5 class="souvenirs-page__craft-name">
                  Абдураимова Санобар
                </h5>
                <div class="souvenirs-page__craft-count">
                  Товаров: <span>5</span>
                </div>
              </div>
            </a>
            <a href="#" class="souvenirs-page__craft-item">
              <div class="souvenirs-page__craft-img" style="background-image: url('/images/craftman.png');"></div>
              <div class="souvenirs-page__craft-content">
                <h5 class="souvenirs-page__craft-name">
                  Абдураимова Санобар
                </h5>
                <div class="souvenirs-page__craft-count">
                  Товаров: <span>5</span>
                </div>
              </div>
            </a>
            <a href="#" class="souvenirs-page__craft-item">
              <div class="souvenirs-page__craft-img" style="background-image: url('/images/craftman.png');"></div>
              <div class="souvenirs-page__craft-content">
                <h5 class="souvenirs-page__craft-name">
                  Абдураимова Санобар
                </h5>
                <div class="souvenirs-page__craft-count">
                  Товаров: <span>5</span>
                </div>
              </div>
            </a>
            <a href="#" class="souvenirs-page__craft-item">
              <div class="souvenirs-page__craft-img" style="background-image: url('/images/craftman.png');"></div>
              <div class="souvenirs-page__craft-content">
                <h5 class="souvenirs-page__craft-name">
                  Абдураимова Санобар
                </h5>
                <div class="souvenirs-page__craft-count">
                  Товаров: <span>5</span>
                </div>
              </div>
            </a>
            <a href="#" class="souvenirs-page__craft-item">
              <div class="souvenirs-page__craft-img" style="background-image: url('/images/craftman.png');"></div>
              <div class="souvenirs-page__craft-content">
                <h5 class="souvenirs-page__craft-name">
                  Абдураимова Санобар
                </h5>
                <div class="souvenirs-page__craft-count">
                  Товаров: <span>5</span>
                </div>
              </div>
            </a>
          </div>
          <div class="load-more">
            <a href="#">Загрузить еще</a>
          </div>
        </div>
        <div class="souvenirs-page__tabs-content">
          <div class="souvenirs-page__craft-inner">
            <a href="#" class="souvenirs-page__craft-item">
              <div class="souvenirs-page__craft-img" style="background-image: url('/images/craft.png');"></div>
              <div class="souvenirs-page__craft-content">
                <h5 class="souvenirs-page__craft-name">
                  Лавка чудес «Librarius»
                </h5>
                <div class="souvenirs-page__craft-loc">
                  ул.Иляева, 25
                </div>
                <div class="souvenirs-page__craft-count">
                  Товаров: <span>5</span>
                </div>
              </div>
            </a>
            <a href="#" class="souvenirs-page__craft-item">
              <div class="souvenirs-page__craft-img" style="background-image: url('/images/craft.png');"></div>
              <div class="souvenirs-page__craft-content">
                <h5 class="souvenirs-page__craft-name">
                  Лавка чудес «Librarius»
                </h5>
                <div class="souvenirs-page__craft-loc">
                  ул.Иляева, 25
                </div>
                <div class="souvenirs-page__craft-count">
                  Товаров: <span>5</span>
                </div>
              </div>
            </a>
            <a href="#" class="souvenirs-page__craft-item">
              <div class="souvenirs-page__craft-img" style="background-image: url('/images/craft.png');"></div>
              <div class="souvenirs-page__craft-content">
                <h5 class="souvenirs-page__craft-name">
                  Лавка чудес «Librarius»
                </h5>
                <div class="souvenirs-page__craft-loc">
                  ул.Иляева, 25
                </div>
                <div class="souvenirs-page__craft-count">
                  Товаров: <span>5</span>
                </div>
              </div>
            </a>
            <a href="#" class="souvenirs-page__craft-item">
              <div class="souvenirs-page__craft-img" style="background-image: url('/images/craft.png');"></div>
              <div class="souvenirs-page__craft-content">
                <h5 class="souvenirs-page__craft-name">
                  Лавка чудес «Librarius»
                </h5>
                <div class="souvenirs-page__craft-loc">
                  ул.Иляева, 25
                </div>
                <div class="souvenirs-page__craft-count">
                  Товаров: <span>5</span>
                </div>
              </div>
            </a>
            <a href="#" class="souvenirs-page__craft-item">
              <div class="souvenirs-page__craft-img" style="background-image: url('/images/craft.png');"></div>
              <div class="souvenirs-page__craft-content">
                <h5 class="souvenirs-page__craft-name">
                  Лавка чудес «Librarius»
                </h5>
                <div class="souvenirs-page__craft-loc">
                  ул.Иляева, 25
                </div>
                <div class="souvenirs-page__craft-count">
                  Товаров: <span>5</span>
                </div>
              </div>
            </a>
            <a href="#" class="souvenirs-page__craft-item">
              <div class="souvenirs-page__craft-img" style="background-image: url('/images/craft.png');"></div>
              <div class="souvenirs-page__craft-content">
                <h5 class="souvenirs-page__craft-name">
                  Лавка чудес «Librarius»
                </h5>
                <div class="souvenirs-page__craft-loc">
                  ул.Иляева, 25
                </div>
                <div class="souvenirs-page__craft-count">
                  Товаров: <span>5</span>
                </div>
              </div>
            </a>
          </div>
          <div class="load-more">
            <a href="#">Загрузить еще</a>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>

</style>

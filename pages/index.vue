<template>
  <div>
    <!--    Слайдер -->
    <v-container fluid class="pa-0">
      <v-carousel
        cycle
        height="100vh"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item v-if="sliders.length > 0"
                         v-for="(slide, i) in sliders"
                         :key="i"
                         :src=getImages(slide.image)
        >
          <v-container style="height:100%; width:100vw"  class="pl-md-10 pl-3  d-flex align-center">
            <div>
              <p class="text-md-h2 text-h5 font-weight-bold white--text mb-md-4 mb-4">
                {{slide["title_"+$i18n.locale]}}
              </p>

              <p class="text-md-h5 text-subtitle-1 font-weight-bold white--text mb-md-10 mb-4">
                {{slide["description_"+$i18n.locale]}}
              </p>
              <v-btn color="red darken-1" class="white--text font-weight-bold"
                     :href="slide.link"
                     large
              >
                {{slide["button_"+$i18n.locale]}}
              </v-btn>
            </div>

          </v-container>

        </v-carousel-item>

      </v-carousel>

    </v-container>
    <!-- Конец слайдера -->

    <section class="guide">
      <div class="container">
        <div class="top-content">
          <div class="top-content__wrapper top-content__wrapper-1">
            <h2 class="top-content__title">
              Путеводитель
            </h2>
            <p class="top-content__text">
              Откройте для себя красивейшие места любимого Шымкента
            </p>
          </div>
          <div class="guide__top-content-text">
            Более 100 увлекательных статей
          </div>
        </div>
        <ul class="guide__content">

          <li v-for="(item,i) in this.categoryplace" :key="i" class="guide__content-item" :style="'background-image: url('+getImages(item.image)+');'">
            <div class="guide__item-wrapper">
              <NuxtLink class="guide__link-wrapper popup-modal" to="#">
                <h5>
                  {{ item['title_'+$i18n.locale] }}
                </h5>
              </NuxtLink>
            </div>
          </li>

        </ul>
      </div>
    </section>

    <section class="calendar">
      <div class="container">
        <div class="top-content calendar__top-content">
          <div class="top-content__wrapper top-content__wrapper-2">
            <h2 class="top-content__title">
              Календарь событий
            </h2>
            <p class="top-content__text">
              Следите за событиями любимого города
            </p>
          </div>
          <div class="top-content__line"></div>
        </div>
        <div class="calendar__date-wrapper">
          <ul class="calendar__date">
            <li class="calendar__date-item">
              <button class="calendar__date-btn active" onclick="calendarDateBtn()">Ближайшие</button>
            </li>
            <li class="calendar__date-item">
              <button class="calendar__date-btn" onclick="calendarDateBtn()">Сегодня</button>
            </li>
            <li class="calendar__date-item">
              <button class="calendar__date-btn" onclick="calendarDateBtn()">Завтра</button>
            </li>
          </ul>
          <div class="calendar__change-date">
            <input type="text" id="calendar__timing" placeholder="Выбрать дату" readonly>
            <svg class="calendar__timing-svg" xmlns="http://www.w3.org/2000/svg" width="9.318" height="4.985" viewBox="0 0 9.318 4.985"><g transform="translate(-6.4 -33.4)"><path d="M15.623,33.5a.329.329,0,0,0-.466,0l-4.094,4.1-4.1-4.1a.329.329,0,0,0-.466.466l4.326,4.326a.321.321,0,0,0,.233.1.335.335,0,0,0,.233-.1l4.326-4.326A.323.323,0,0,0,15.623,33.5Z" transform="translate(0)"/></g></svg>
          </div>
        </div>
        <div class="calendar__inner">
          <div class="calendar__item" v-for="(item,i) in this.events" :key="i">
            <div class="calendar__item-img" :style="'background-image: url('+getImages(item.image)+');'">
              <div class="calendar__item-day" v-if="item.workdays.length>0">
                <div v-for="(day,index) in item.workdays" :key="index">
                  <span>Дата </span>{{day.date_start}} - {{day.date_end}}
                </div>

              </div>
              <div class="calendar__item-time">
                <div v-for="(day,index) in item.workdays" :key="index">
                  <span>Время </span>{{day.time_start}} - {{day.time_end}}
                </div>
              </div>
            </div>
            <div class="calendar__item-inner">
              <h4 class="calendar__item-title">
                {{ item['title_'+$i18n.locale] }}
              </h4>
              <div class="calendar__item-location">
                {{ item.address }}
              </div>
              <p class="calendar__item-text" v-html="truncate(item['description_'+$i18n.locale], 50)"></p>
              <div class="calendar-page__btn-wrapper">
                <v-dialog
                  v-if="item.eventum"
                  v-model="dialog"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn class="calendar-page__item-btn"
                           color="red"
                       v-bind="attrs"
                       v-on="on">
                      <span>Купить билеты</span>
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-text>
                        <div id="modal-eventumCloseBtn" @click="dialog = false"
                             style="float: right;height: 10px;width: 15px;cursor: pointer;position: absolute;right: 10px;top: 8px;">
                          <svg version="1.1" x="0px" y="0px" viewBox="0 0 15 15" width="100%" height="100%">
                            <rect fill="#000000" x="-1.8" y="6.2"
                                  transform="matrix(0.7071 0.7071 -0.7071 0.7071 7.5178 -3.1079)" width="18.6"
                                  height="2.7"></rect>
                            <rect fill="#000000" x="-1.8" y="6.2"
                                  transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 18.1391 7.5282)" width="18.6"
                                  height="2.7"></rect>
                          </svg>
                        </div>
                        <iframe :src="getEventum(item.eventum)" style="height:573px;width:100%;"
                                frameborder="0"></iframe>
                    </v-card-text>

                    <v-divider></v-divider>

                  </v-card>
                </v-dialog>
                <NuxtLink class="calendar-page__item-link popup-modal" :to="'/events/' + item.alias">
                  <span>Подробнее</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <div class="load-more">
          <NuxtLink to="#">Загрузить еще</NuxtLink>
        </div>
      </div>
    </section>

    <section class="trip">
      <div class="container">
        <div class="top-content">
          <div class="top-content__wrapper top-content__wrapper-3">
            <h2 class="top-content__title">
              Запланировать поездку
            </h2>
            <p class="top-content__text">
              Билеты и проживание
            </p>
          </div>
        </div>
        <div class="trip__tabs">
          <div class="trip__tabs-nav tabs-nav">
            <div v-for="tab in tabs" :key="tab.id" :class="'trip__tabs-item tabs-item-1 '+tab.active" @click="activeTab(tab.id)" v-html="tab.svg+tab.title"></div>
          </div>
          <div class="trip__tabs-content">
            <div :class="'trip__tab tab-1 '+this.tabs[0].active">
              <form>
                <div class="form__inner">
                  <div class="trip__input-name grid-1">
                    <input type="text" placeholder="Откуда" autocomplete="off">
                  </div>
                  <div class="trip__input-name grid-2">
                    <input type="text" placeholder="Куда" autocomplete="off">
                  </div>
                  <div class="trip__input-date grid-3">
                    <input id="start-date-1" type="text" placeholder="Дата вылета">
                  </div>
                  <div class="trip__input-date grid-4">
                    <input id="end-date-1" class='trip__calendar' type="text" placeholder="Обратно">
                  </div>
                  <div class="trip__form-control grid-5">
                    <div class="trip__form-control-wrapper">
                      <div class="trip__form-count">
                        <span class="summ" data-count="1">1</span> пассажир, <span class="trip-class">любой</span> класс
                      </div>
                      <div class="trip__dropdown">
                        <div class="trip__custom-radio">
                          <div class="trip__radio-item" data-class="любой">Любой</div>
                          <div class="trip__radio-item" data-class="бизнес">Бизнес</div>
                          <div class="trip__radio-item" data-class="эконом">Эконом</div>
                        </div>
                        <ul class="trip__form-dropdown">
                          <li class="trip__form-item">
                            Взрослые (от 13 лет)
                            <div class="quantity">
                              <input class="adults" type="number" min="0" max="9" step="1" value="1">
                            </div>
                          </li>
                          <li class="trip__form-item">
                            Дети (от 2 до 12 лет)
                            <div class="quantity">
                              <input class="children" type="number" min="0" max="9" step="1" value="0">
                            </div>
                          </li>
                          <li class="trip__form-item">
                            Младенцы (до 2 лет)
                            <div class="quantity">
                              <input class="babies" type="number" min="0" max="9" step="1" value="0">
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <button class="trip__form-btn grid-6 popup-modal" href="#modal" type="submit">Найти</button>
                </div>
              </form>
            </div>
            <div :class="'trip__tab tab-2 '+this.tabs[1].active">
              <form>
                <div class="form__inner">
                  <div class="trip__input-name">
                    <input type="text" placeholder="Откуда" autocomplete="off">
                  </div>
                  <div class="trip__input-name">
                    <input type="text" placeholder="Куда" autocomplete="off">
                  </div>
                  <div class="trip__input-date">
                    <input id="start-date-2" type="text" placeholder="Дата выезда">
                  </div>
                  <div class="trip__input-date">
                    <input id="end-date-2" class='trip__calendar' type="text" placeholder="Обратно">
                  </div>
                  <button class="trip__form-btn popup-modal" href="#modal" type="submit">Найти</button>
                </div>
              </form>
            </div>
            <div :class="'trip__tab tab-3 '+this.tabs[2].active">
              <form>
                <div class="form__inner">
                  <div class="trip__input-name">
                    <input type="text" placeholder="Город" autocomplete="off">
                  </div>
                  <div class="trip__input-date">
                    <input id="start-date-3" type="text" placeholder="Прибытие">
                  </div>
                  <div class="trip__input-date">
                    <input id="end-date-3" class='trip__calendar' type="text" placeholder="Выезд">
                  </div>
                  <div class="trip__form-control">
                    <div class="trip__form-control-wrapper">
                      <div class="trip__form-count">
                        <span class="adults-count">1</span> взрослый, <span class="children-count">без</span> детей, <span class="babies-count">1</span> номер
                      </div>
                      <div class="trip__dropdown">
                        <ul class="trip__form-dropdown">
                          <li class="trip__form-item">
                            Взрослые
                            <div class="quantity">
                              <input class="adults__tab-3" type="number" min="0" max="9" step="1" value="1">
                            </div>
                          </li>
                          <li class="trip__form-item">
                            Дети
                            <div class="quantity">
                              <input class="children__tab-3" type="number" min="0" max="9" step="1" value="0">
                            </div>
                          </li>
                          <li class="trip__form-item">
                            Младенцы
                            <div class="quantity">
                              <input class="babies__tab-3" type="number" min="0" max="9" step="1" value="1">
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <button class="trip__form-btn popup-modal" href="#modal" type="submit">Найти</button>
                </div>
              </form>
            </div>
            <div :class="'trip__tab tab-4 '+this.tabs[3].active">
              <form>
                <div class="form__inner">
                  <div class="trip__input-name">
                    <input type="text" placeholder="Город" autocomplete="off">
                  </div>
                  <div class="trip__input-date">
                    <input id="start-date-4" type="text" placeholder="Прибытие">
                  </div>
                  <div class="trip__input-date">
                    <input id="end-date-4" class='trip__calendar' type="text" placeholder="Выезд">
                  </div>
                  <div class="trip__form-control">
                    <div class="trip__form-control-wrapper">
                      <div class="trip__form-count">
                        <span class="guests" data-count="1">1</span> гость
                      </div>
                      <div class="trip__dropdown">
                        <ul class="trip__form-dropdown">
                          <li class="trip__form-item">
                            Взрослые (от 13 лет)
                            <div class="quantity">
                              <input class="adults__tab-4" type="number" min="0" max="9" step="1" value="1">
                            </div>
                          </li>
                          <li class="trip__form-item">
                            Дети (от 2 до 12 лет)
                            <div class="quantity">
                              <input class="children__tab-4" type="number" min="0" max="9" step="1" value="0">
                            </div>
                          </li>
                          <li class="trip__form-item">
                            Младенцы (до 2 лет)
                            <div class="quantity">
                              <input class="babies__tab-4" type="number" min="0" max="9" step="1" value="0">
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <button class="trip__form-btn popup-modal" href="#modal" type="submit">Найти</button>
                </div>
              </form>
            </div>
          </div>
        </div>
<!--        <div class="trip__link-to-board">-->
<!--          <a href="#">Табло прилетов</a>-->
<!--        </div>-->
      </div>
    </section>

    <section class="routes">
      <div class="container">
        <div class="top-content">
          <div class="top-content__wrapper top-content__wrapper-4">
            <h2 class="top-content__title">
              Маршруты
            </h2>
            <p class="top-content__text">
              Не знаете, что посетить?
            </p>
          </div>
          <div class="top-content__line"></div>
        </div>
        <div class="routes__items-inner">
          <div class="routes__item" v-for="(item,i) in this.routes" :key="i">
            <div class="routes__item-img" :style="'background-image: url('+getImages(item.image)+');'"></div>
            <div class="routes__item-content">
              <h4 class="routes__item-title">
                {{ item['title_'+$i18n.locale] }}
              </h4>
              <div class="routes__item-text" v-html="truncate(item['description_' + $i18n.locale], 100)">
<!--                <p>08:00 - Сбор 08:00-13:00</p>-->
<!--                <p>1) Посещение памятника «Байдибек би»</p>-->
<!--                <p>2) Посещение «Историко-краеведческого музея»</p>-->
<!--                <p>3) Посещение</p>-->
              </div>
              <NuxtLink class="routes__item-btn popup-modal" :to="'/routes/'+item.alias">
                <span>Подробнее</span>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="load-more">
          <NuxtLink to="/routes">Смотреть все маршруты</NuxtLink>
        </div>
      </div>
    </section>

    <section class="souvenirs">
      <div class="container">
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
        <div class="souvenirs__items-inner">
          <div class="souvenirs__item" v-for="(item,i) in this.souvenirs.data" :key="i">
            <div class="souvenirs__item-img" :style="'background-image: url('+getImages(item.image)+');'"></div>
            <div class="souvenirs__item-content">
              <h4 class="souvenirs__item-title">
                {{ item['title_'+$i18n.locale] }}
              </h4>
              <p class="souvenirs__item-text" v-html="truncate(item['description_'+$i18n.locale], 75)"></p>
              <div class="souvenirs__item-price-wrapper">
                <v-dialog
                  v-if="item.eventum"
                  v-model="dialog2"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="red lighten-2"
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      Купить
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-text>
                          <div id="modal-eventumCloseBtn" @click="dialog2 = false"
                               style="float: right;height: 10px;width: 15px;cursor: pointer;position: absolute;right: 10px;top: 8px;">
                            <svg version="1.1" x="0px" y="0px" viewBox="0 0 15 15" width="100%" height="100%">
                              <rect fill="#000000" x="-1.8" y="6.2"
                                    transform="matrix(0.7071 0.7071 -0.7071 0.7071 7.5178 -3.1079)" width="18.6"
                                    height="2.7"></rect>
                              <rect fill="#000000" x="-1.8" y="6.2"
                                    transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 18.1391 7.5282)" width="18.6"
                                    height="2.7"></rect>
                            </svg>
                          </div>
                          <iframe :src="getEventum(item.eventum)" style="height:573px;width:100%;"
                                  frameborder="0"></iframe>
                    </v-card-text>

                    <v-divider></v-divider>

                  </v-card>
                </v-dialog>
                <div class="souvenirs__item-price">
                  {{item.price}} ТГ
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="load-more">
          <NuxtLink to="/souvenirs">Перейти в магазин</NuxtLink>
        </div>
      </div>
    </section>

    <section class="news">
      <div class="container">
        <div class="top-content">
          <div class="top-content__wrapper top-content__wrapper-6">
            <h2 class="top-content__title">
              Новости
            </h2>
            <p class="top-content__text">
              Что происходит
            </p>
          </div>
          <div class="top-content__line"></div>
        </div>
        <div class="news__items-inner">
          <div class="news__item" v-for="(item,i) in this.blogs" :key="i">
            <NuxtLink class="popup-modal" :to="'/news/'+item.alias">
              <img class="news__item-img" :src="getImages(item.image)" :alt="item['title_'+$i18n.locale]">
              <div class="news__item-date">
                Опубликовано: <span>{{ item.created_at }}</span>
              </div>
              <p class="news__item-text" v-html="truncate(item['description_'+$i18n.locale], 50)"></p>
            </NuxtLink>
          </div>
        </div>
        <div class="load-more">
          <NuxtLink to="/news">Все новости</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      dialog2: false,
      tabs: [
        {
          id: 0,
          title: 'Авиабилеты',
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="18.999" height="19" viewBox="0 0 18.999 19"><defs><style>.a{fill:#fff;}</style></defs><g transform="translate(-0.025 0)"><path class="a" d="M18.322.046,16.312.961a1.209,1.209,0,0,0-.349.242L12.687,4.481,1.4,3.128A.67.67,0,0,0,.85,3.32l-.628.628a.671.671,0,0,0,.2,1.087L8.508,8.66,6.186,10.982H2.131a.678.678,0,0,0-.475.2l-.339.341a.671.671,0,0,0,.21,1.091l3.421,1.466L6.414,17.5a.671.671,0,0,0,1.091.21l.341-.341a.67.67,0,0,0,.2-.475V12.836l2.321-2.321L13.988,18.6a.671.671,0,0,0,1.087.2l.628-.628a.673.673,0,0,0,.192-.555L14.541,6.337l3.278-3.278a1.183,1.183,0,0,0,.242-.349L18.976.7A.493.493,0,0,0,18.322.046Z" transform="translate(0 0)"/></g></svg>',
          active: 'active'
        },
        {
          id: 1,
          title: 'Ж/Д билеты',
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="17.331" height="21.955" viewBox="0 0 17.331 21.955"><defs><style>.a{fill:#fff;}</style></defs><g transform="translate(-61.359)"><g transform="translate(61.359)"><path class="a" d="M78.576,20.562,75.357,14.7a1.906,1.906,0,0,0,1.585-1.874V4.18A4.183,4.183,0,0,0,72.763,0H67.286a4.234,4.234,0,0,0-4.228,4.228v8.6A1.87,1.87,0,0,0,64.643,14.7l-3.171,5.861a.946.946,0,0,0,.384,1.3.714.714,0,0,0,.432.1.93.93,0,0,0,.817-.48l.288-.48h13.26l.288.48a.892.892,0,0,0,.817.48,1.4,1.4,0,0,0,.432-.1A.946.946,0,0,0,78.576,20.562ZM74.06,16.238H65.989l.817-1.489h6.438Zm-.144-3.219a1.393,1.393,0,1,1,1.393-1.393A1.426,1.426,0,0,1,73.916,13.019ZM64.74,4.756a2.676,2.676,0,0,1,2.642-2.69h5.237a2.717,2.717,0,0,1,2.69,2.69V7.062a.924.924,0,0,1-.961.913H65.7a.912.912,0,0,1-.913-.913L64.74,4.756Zm1.393,5.429a1.393,1.393,0,1,1-1.393,1.393A1.394,1.394,0,0,1,66.133,10.185Zm-1.97,9.368,1.057-1.874h9.608l1.057,1.874Z" transform="translate(-61.359)"/></g></g></svg>',
          active: ''
        },
        {
          id: 2,
          title: 'Отели',
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="12.792" height="21.545" viewBox="0 0 12.792 21.545"><defs><style>.a{fill:#fff;}</style></defs><g transform="translate(-104.017 0)"><path class="a" d="M114.789,21.545h-8.752a2.022,2.022,0,0,1-2.02-2.02V6.4a6.4,6.4,0,0,1,12.791-.048,2.02,2.02,0,1,1-4.039.048A2.356,2.356,0,0,0,110.4,4.04a2.455,2.455,0,0,0-1.875,3.926,2.681,2.681,0,0,0,1.253.988l5.3,2.039a2.709,2.709,0,0,1,1.726,2.513v6.018A2.022,2.022,0,0,1,114.789,21.545Zm-4.376-20.2A5.046,5.046,0,0,0,105.363,6.4V19.525a.674.674,0,0,0,.673.673h8.752a.674.674,0,0,0,.673-.673V13.507a1.354,1.354,0,0,0-.863-1.257l-5.3-2.039a4.038,4.038,0,0,1-2.588-3.828,3.7,3.7,0,0,1,7.405.014.673.673,0,0,0,.679.673.7.7,0,0,0,.667-.711A5.047,5.047,0,0,0,110.413,1.348Z" transform="translate(0 0)"/><path class="a" d="M174.707,353.38H168.69a.673.673,0,1,1,0-1.346h6.017a.673.673,0,0,1,0,1.346Z" transform="translate(-61.307 -337.222)"/><path class="a" d="M174.707,417.38H168.69a.673.673,0,1,1,0-1.346h6.017a.673.673,0,1,1,0,1.346Z" transform="translate(-61.307 -398.529)"/></g></svg>',
          active: ''
        },
        {
          id: 3,
          title: 'Квартиры',
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="21.4" height="21.526" viewBox="0 0 21.4 21.526"><defs><style>.a{fill:#fff;stroke:#fff;stroke-width:0.4px;}</style></defs><g transform="translate(0.2 0.326)"><g transform="translate(0 8.582)"><path class="a" d="M9.883,214.15a.476.476,0,0,0-.675,0L7.439,215.92H6.2a.477.477,0,0,0-.477.478v.955H4.773a.477.477,0,0,0-.477.478v.955H3.341a.478.478,0,0,0-.477.478V220.5l-.2.2H.955v-1.712L8.928,211a.478.478,0,0,0,0-.675l-.14-.14a.667.667,0,0,1-.2-.476v0a.477.477,0,1,0-.955,0,1.616,1.616,0,0,0,.3.937l-7.793,7.8a.477.477,0,0,0-.14.338v2.388a.477.477,0,0,0,.477.477H2.864a.478.478,0,0,0,.337-.14l.477-.478a.477.477,0,0,0,.14-.337v-.955h.955a.477.477,0,0,0,.477-.478v-.955H6.2a.477.477,0,0,0,.477-.478v-.955h.955a.477.477,0,0,0,.337-.14l1.909-1.911A.477.477,0,0,0,9.883,214.15Z" transform="translate(0 -209.233)"/></g><g transform="translate(12.829 3.284)"><path class="a" d="M317.241,82.405l-1.909-1.911a1.524,1.524,0,0,0-2.107,0,1.493,1.493,0,0,0,0,2.108l1.909,1.911a1.49,1.49,0,0,0,2.107-2.108Zm-.675,1.432a.548.548,0,0,1-.757,0L313.9,81.927a.538.538,0,0,1,0-.757.535.535,0,0,1,.757,0l1.909,1.911A.537.537,0,0,1,316.566,83.837Z" transform="translate(-312.789 -80.072)"/></g><g transform="translate(6.682 0)"><path class="a" d="M176.746,6,171.216.462a1.668,1.668,0,0,0-2.3,0l-4.575,4.578a1.632,1.632,0,0,0,0,2.306l4.575,4.578-.281.281a.668.668,0,0,1-.475.2h0a.67.67,0,0,1-.477-.2l-1.334-1.335a.477.477,0,0,0-.675,0L163.044,13.5a.477.477,0,1,0,.675.675l2.288-2.289,1,1a1.618,1.618,0,0,0,1.152.477h0a1.616,1.616,0,0,0,1.149-.477l.618-.619a.477.477,0,0,0,0-.675l-4.913-4.916a.676.676,0,0,1,0-.955l4.575-4.578a.69.69,0,0,1,.955,0l5.53,5.534a.676.676,0,0,1,0,.955L171.5,12.205a.67.67,0,0,1-.477.2.478.478,0,0,0,0,.955,1.618,1.618,0,0,0,1.152-.478L176.746,8.3a1.632,1.632,0,0,0,0-2.306Z" transform="translate(-162.904 0)"/></g></g></svg>',
          active: ''
        }
      ]
    }
  },
  methods:{
    getImages(data){
      console.log(this.$store.state.image.image);
      return this.$store.state.image.image + data ;
    },
    getEventum(id){
      return this.$store.state.eventum.code + id
    },
    truncate(string = '', value) {
      return string.substring(0, value) + '...';
    },
    activeTab(i){
      this.tabs.forEach((item,i) => {
        item.active = ''
        this.active = false
      })
      this.tabs[i].active = 'active'
    },
  },
  async asyncData({$axios}) {
    let sliders,categoryplace,events,routes,souvenirs,blogs = [];
    try{
      await $axios.$get("/sliders").then((e)=>{e.length > 0 ? sliders = e : null});
      await $axios.$get("/categoriesofthe-places").then((e)=>{e.length > 0 ? categoryplace = e : null});
      await $axios.$get("/events").then((e)=>{e.length > 0 ? events = e : null});
      await $axios.$get("/routes").then((e)=>{e.length > 0 ? routes = e : null});
      await $axios.$get("/souvenirs").then((e)=>{souvenirs = e});
      await $axios.$get("/news").then((e)=>{e.length > 0 ? blogs = e : null});
    }
    catch (e) {
      console.log(e);
    }
    return {sliders,categoryplace,events,routes,souvenirs,blogs}
  },
  mounted() {
    console.log(this.souvenirs)
  }
}
</script>

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
                         class="carousel-slider-usual"
                         :style="{'background':'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('+getImages(slide.image)+')'}"
        >
          <v-container style="height:100%; width:100vw"  class="pl-md-10 pl-3  d-flex align-center">
            <div>
              <p class="text-md-h2 text-h5 font-weight-bold white--text mb-md-4 mb-4">
                {{slide["title_"+$i18n.locale]}}
              </p>

              <p class="text-md-h5 text-subtitle-1 font-weight-bold white--text mb-md-10 mb-4">
                {{slide["description_"+$i18n.locale]}}
              </p>
              <v-btn color="trip__form-btn" class="white--text font-weight-bold"
                     style="background-color: #C42313;color: white"
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

<!--    Путеводитель категории-->
    <section class="guide">
      <div class="container">
        <div class="top-content">
          <div class="top-content__wrapper top-content__wrapper-1">
            <h2 class="top-content__title">
              {{ $t("place_title") }}
            </h2>
            <p class="top-content__text">
              {{ $t("place_subtitle") }}
            </p>
          </div>
          <div class="guide__top-content-text">
            {{ $t("place_subtitle_2") }}
          </div>
        </div>
        <ul class="guide__content pl-0">

          <li v-for="(item,i) in this.categoryplace" :key="i" class="guide__content-item" :style="'background-image: url('+getImages(item.image)+');'">
            <div class="guide__item-wrapper">
              <NuxtLink class="guide__link-wrapper popup-modal" :to="'/places?place='+item.alias">
                <h5>
                  {{ item['title_'+$i18n.locale] }}
                </h5>
              </NuxtLink>
            </div>
          </li>

        </ul>
      </div>
    </section>
<!--    Категория путеводителя-->

<!--    События-->
    <section class="calendar">
      <div class="container">
        <div class="top-content calendar__top-content">
          <div class="top-content__wrapper top-content__wrapper-2">
            <h2 class="top-content__title">
              {{ $t('events_title') }}
            </h2>
            <p class="top-content__text">
              {{ $t('events_subtitle') }}
            </p>
          </div>
          <div class="top-content__line"></div>
        </div>
        <div class="calendar__date-wrapper">
          <ul class="calendar__date">
            <li class="calendar__date-item">
              <button class="calendar__date-btn active"
                      @click="date = ''"
              >{{ $t('events_time_1') }}</button>
            </li>
            <li class="calendar__date-item">
              <button class="calendar__date-btn"
                      @click="date=$moment(new Date()).format('DD/MM/YYYY')"
              >{{ $t('events_time_2') }}</button>
            </li>
            <li class="calendar__date-item">
              <button class="calendar__date-btn"
                      @click="date=$moment(new Date()).add(1,'days').format('DD/MM/YYYY')"
              >{{ $t('events_time_3') }}</button>
            </li>
          </ul>
          <div class="calendar__change-date ">
            <div class="calendar__change-date">
              <v-menu
                ref="menu1"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field

                    dense
                    hide-details="auto"
                    v-model="formatDate"
                    :label="$t('events_time_4')"
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                    color="white"
                    outlined
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dateForm"
                  :locale="LANG"
                  no-title
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </div>
          </div>
        </div>
        <div class="calendar__inner">
          <div class="calendar__item" v-for="(item,i) in this.events" :key="i">
            <div class="calendar__item-img"
                 :style="{'background':'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('+getImages(item.image)+')'}"
            >
              <div class="calendar__item-day" v-if="item.workdays.length>0">
                <div v-for="(day,index) in item.workdays" :key="index">
                  <span>{{ $t('date') }} </span>{{day.date_start}} - {{day.date_end}}
                </div>

              </div>
              <div class="calendar__item-time">
                <div v-for="(day,index) in item.workdays" :key="index">
                  <span>{{ $t('time') }} </span>{{day.time_start}} - {{day.time_end}}
                </div>
              </div>
            </div>
            <div class="calendar__item-inner">
              <h4 class="calendar__item-title">
                {{ truncateTitle(item['title_'+$i18n.locale],35) }}
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
                    <button class="calendar-page__item-btn"
                       v-bind="attrs"
                       v-on="on"
                    style="color: white!important;"
                    >
                      <span>{{ $t('buy') }}</span>
                    </button>
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
                  <span>{{ $t('more_info') }}</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <div class="load-more">
          <NuxtLink to="events">{{ $t('load_more') }}</NuxtLink>
        </div>
      </div>
    </section>
<!-- Конец Событий-->

<!--    Начало путешествия-->
    <section id="trip" class="trip">
      <div class="container">
        <div class="top-content">
          <div class="top-content__wrapper top-content__wrapper-3">
            <h2 class="top-content__title">
              {{ $t('trip_title') }}
            </h2>
            <p class="top-content__text">
              {{ $t('trip_subtitle') }}
            </p>
          </div>
        </div>
        <div class="trip__tabs">
          <div class="trip__tabs-nav tabs-nav">
            <div v-for="tab in tabs" :key="tab.id" :class="'trip__tabs-item tabs-item-1 '+tab.active" @click="activeTab(tab.id)" v-html="tab.svg+tab.title"></div>
          </div>
          <div class="trip__tabs-content">
<!--            Полеты откуда куда-->
            <div :class="'trip__tab tab-1 '+this.tabs[0].active">
                <div class="form__inner d-md-flex align-center">
                  <div class="trip__input-name grid-1 my-sm-2">
                    <v-autocomplete
                      hide-details
                      filled
                      :items="data"
                      item-text="name_ru"
                      background-color="white"
                      color="black"
                      outlined
                      dense
                      item-value="code"
                      v-model="fromAvia"
                      autocomplete="off"
                      :placeholder="$t('trip_from')"
                    ></v-autocomplete>
                  </div>
                  <div class="trip__input-name grid-2 my-sm-2">
                    <v-autocomplete
                      hide-details
                      filled
                      :items="data"
                      background-color="white"
                      color="black"
                      item-value="code"
                      v-model="toAvia"
                      item-text="name_ru"
                      dense
                      outlined
                      autocomplete="off"
                      :placeholder="$t('trip_to')"
                    ></v-autocomplete>
                  </div>
                  <div class="trip__input-date grid-3 my-sm-2">
                    <v-menu
                      ref="menu1"
                      v-model="fromMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          hide-details="auto"
                          v-model="fromDataComputed"
                          :label="$t('trip_date_from')"
                          v-bind="attrs"
                          v-on="on"
                          outlined
                          background-color="white"
                          color="black"
                          dense
                          autocomplete="off"
                          filled

                        ></v-text-field>
                      </template>
                      <v-date-picker
                        :lang="LANG"
                        v-model="fD"
                        no-title
                        @input="fromMenu = false"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                  <div class="trip__input-date grid-4 my-sm-2">
                    <v-menu
                      ref="menu1"
                      v-model="toMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          hide-details="auto"
                          v-model="toDataComputed"
                          :label="$t('trip_date_to')"
                          v-bind="attrs"
                          background-color="white"
                          color="black"
                          v-on="on"
                          dense
                          outlined
                          autocomplete="off"
                          filled
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        :lang="LANG"
                        v-model="tD"
                        no-title
                        @input="toMenu = false"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                  <div class="trip__form-control grid-5 my-sm-2">
                    <div class="trip__form-control-wrapper" style="height: 40px">
                      <v-menu
                        v-model="menuTraveler"
                        :close-on-content-click="false"
                        :nudge-width="200"
                        offset-x
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="white"
                            class="my-sm-2"
                            filled
                            v-bind="attrs"
                            v-on="on"
                            elevation="0"
                          >
                            Пассажиры
                          </v-btn>
                        </template>

                        <v-card>
                          <v-list>
                            <v-list-item>
                              <v-text-field v-model="adult" type="number" label="Взрослые(старше 12 лет)" append-outer-icon="fas fa-plus" @click:append-outer="increment(0)" prepend-icon="fas fa-minus" @click:prepend="decrement(0)"></v-text-field>
                            </v-list-item>
                            <v-list-item>
                              <v-text-field v-model="adolcent" type="number" label="Дети(2–12 лет)" append-outer-icon="fas fa-plus" @click:append-outer="increment(1)" prepend-icon="fas fa-minus" @click:prepend="decrement(1)"></v-text-field>
                            </v-list-item>
                            <v-list-item>
                              <v-text-field v-model="child" type="number" label="Младенцы (до 2х лет)" append-outer-icon="fas fa-plus" @click:append-outer="increment(2)" prepend-icon="fas fa-minus" @click:prepend="decrement(2)"></v-text-field>
                            </v-list-item>
                            <v-list-item>
                              <v-select
                                :items="
                                  [
                                    {'title':'Любой','code':'A'},
                                    {'title':'Эконом класс','code':'E'},
                                    {'title':'Бизнес класс','code':'B'},
                                  ]"
                                item-text="title"
                                item-value="code"
                                v-model="flyType"
                                label="Тип класса"
                              ></v-select>
                            </v-list-item>
                          </v-list>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              @click="menuTraveler = false"
                            >
                              Закрыть
                            </v-btn>
                            <v-btn
                              color="primary"
                              text
                              @click="menuTraveler = false"
                            >
                              Сохранить
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-menu>
                    </div>
                  </div>
                  <button class="trip__form-btn grid-6 popup-modal align-self-md-center" @click="sendToFly">{{ $t('btn_search') }}</button>
                </div>
            </div>
<!--            Жд-->
            <div :class="'trip__tab tab-2 '+this.tabs[1].active">
                <div class="form__inner">
                  <div class="trip__input-name my-sm-2">
                    <v-autocomplete
                      hide-details
                      hide-no-data
                      item-text="name"
                      item-value="code"
                      outlined
                      filled
                      dense
                      background-color="white"
                      color="black"
                      no-filter
                      :items="stationsFrom"
                      v-model="railFrom"
                      :search-input.sync="search"
                      type="text" placeholder="Откуда" />
                  </div>
                  <div class="trip__input-name my-sm-2">
                    <v-autocomplete
                      hide-details
                      hide-no-data
                      item-text="name"
                      item-value="code"
                      outlined
                      filled
                      dense
                      background-color="white"
                      color="black"
                      no-filter
                      :items="stationsTo"
                      v-model="railTo"
                      :search-input.sync="searchTo"
                      type="text" placeholder="Куда" />
                  </div>
                  <div class="trip__input-date my-sm-2">
                    <v-menu
                      ref="menu1"
                      v-model="stfromMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      max-width="290px"
                      min-width="auto"
                      :lang="LANG"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          hide-details="auto"
                          v-model="fromDataComputed"
                          :label="$t('trip_date_from')"
                          background-color="white"
                          color="black"
                          v-bind="attrs"
                          v-on="on"
                          outlined
                          dense
                          autocomplete="off"
                          filled
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="fD"
                        no-title
                        @input="stfromMenu = false"
                        :lang="LANG"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                  <div class="trip__input-date my-sm-2">
                    <v-menu
                      ref="menu1"
                      v-model="sttoMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          hide-details="auto"
                          v-model="toDataComputed"
                          :label="$t('trip_date_to')"
                          v-bind="attrs"
                          background-color="white"
                          color="black"
                          v-on="on"
                          dense
                          outlined
                          autocomplete="off"
                          filled
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="tD"
                        no-title
                        @input="sttoMenu = false"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                  <button class="trip__form-btn popup-modal text--white align-self-md-center mt-2" @click="sendToTrain" style="color: white" type="submit">Найти</button>
                </div>
            </div>
<!--          Отели  -->
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
                  <button class="trip__form-btn popup-modal text--white align-self-md-center"  type="submit">Найти</button>
                </div>
              </form>
            </div>
<!--            Квартиры-->
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
                  <button class="trip__form-btn popup-modal"  >Найти</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="trip__link-to-board">
          <a style="color:white!important;" href="http://www.airserver.kz/flights/online-flights/" target="_blank">{{$t('trip_link')}}</a>
        </div>
      </div>
    </section>
    <!--   Начало путешествия-->

<!--    Маршруты-->
    <section class="routes">
      <div class="container">
        <div class="top-content">
          <div class="top-content__wrapper top-content__wrapper-4">
            <h2 class="top-content__title">
              {{ $t('routes_title') }}
            </h2>
            <p class="top-content__text">
              {{ $t('routes_subtitle') }}
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
              </div>
              <NuxtLink class="routes__item-btn popup-modal" :to="'/routes/'+item.alias">
                <span class="white--text">{{ $t('more_info') }}</span>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="load-more">
          <NuxtLink to="/routes">{{ $t('load_routes') }}</NuxtLink>
        </div>
      </div>
    </section>
<!--    Маршруты-->
<!--    Сувениры-->
    <section class="souvenirs">
      <div class="container">
        <div class="top-content">
          <div class="top-content__wrapper top-content__wrapper-5">
            <h2 class="top-content__title">
              {{ $t('souvenirs') }}
            </h2>
            <p class="top-content__text">
              {{ $t('souvenirs_subtitle') }}
            </p>
          </div>
          <div class="top-content__line"></div>
        </div>
        <div class="souvenirs__items-inner">
          <div class="souvenirs__item" v-for="(item,i) in souvenirs.data" :key="i">
            <div class="souvenirs__item-img" :style="'background-image: url('+getImages(item.image)+');'"></div>
            <div class="souvenirs__item-content">
              <h4 class="souvenirs__item-title">
                {{ item['title_'+$i18n.locale] }}
              </h4>
              <p class="souvenirs__item-text" v-html="truncate(item['description_'+$i18n.locale], 75)"></p>
              <div class="souvenirs__item-price-wrapper">
                <v-dialog
                  v-if="item.eventum"
                  v-model="dialog2" outlined
                  autocomplete="off"
                  filled
                  solo-inverted
                >
                  <template v-slot:activator="{ on, attrs }">
                    <button class="souvenirs__item-btn popup-modal"
                            v-bind="attrs"
                            v-on="on"
                            style="color: white!important;"
                    >
                      <span>{{ $t('buy') }}</span>
                    </button>
                  </template>

                  <v-card>
                    <v-card-text>
                          <div @click="dialog2 = false"
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
          <NuxtLink to="/souvenirs">{{ $t('load_souvenirs') }}</NuxtLink>
        </div>
      </div>
    </section>
<!--Сувениры-->

<!--    Новости-->
    <section class="news">
      <div class="container">
        <div class="top-content">
          <div class="top-content__wrapper top-content__wrapper-6">
            <h2 class="top-content__title">
              {{ $t('news') }}
            </h2>
            <p class="top-content__text">
              {{ $t('news_subtitle') }}
            </p>
          </div>
          <div class="top-content__line"></div>
        </div>
        <div class="news__items-inner">
          <div class="news__item" v-for="(item,i) in this.blogs" :key="i">
            <NuxtLink class="popup-modal" :to="'/news/'+item.alias">
              <img class="news__item-img" :src="getImages(item.image)" :alt="item['title_'+$i18n.locale]">
              <div class="news__item-date">
                {{ $t('published') }}: <span>{{ item.created_at }}</span>
              </div>
              <p class="news__item-text" v-html="truncate(item['description_'+$i18n.locale], 50)"></p>
            </NuxtLink>
          </div>
        </div>
        <div class="load-more">
          <NuxtLink to="/news">{{ $t('load_news') }}</NuxtLink>
        </div>
      </div>
    </section>
<!--    Новости-->
  </div>
</template>

<script>
import data from "~/static/countries.json";

export default {
  data() {
    return {
      tabs: [
        {
          id: 0,
          title: this.$t('trip_type_1'),
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="18.999" height="19" viewBox="0 0 18.999 19"><defs><style>.a{fill:#fff;}</style></defs><g transform="translate(-0.025 0)"><path class="a" d="M18.322.046,16.312.961a1.209,1.209,0,0,0-.349.242L12.687,4.481,1.4,3.128A.67.67,0,0,0,.85,3.32l-.628.628a.671.671,0,0,0,.2,1.087L8.508,8.66,6.186,10.982H2.131a.678.678,0,0,0-.475.2l-.339.341a.671.671,0,0,0,.21,1.091l3.421,1.466L6.414,17.5a.671.671,0,0,0,1.091.21l.341-.341a.67.67,0,0,0,.2-.475V12.836l2.321-2.321L13.988,18.6a.671.671,0,0,0,1.087.2l.628-.628a.673.673,0,0,0,.192-.555L14.541,6.337l3.278-3.278a1.183,1.183,0,0,0,.242-.349L18.976.7A.493.493,0,0,0,18.322.046Z" transform="translate(0 0)"/></g></svg>',
          active: 'active'
        },
        {
          id: 1,
          title: this.$t('trip_type_2'),
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="17.331" height="21.955" viewBox="0 0 17.331 21.955"><defs><style>.a{fill:#fff;}</style></defs><g transform="translate(-61.359)"><g transform="translate(61.359)"><path class="a" d="M78.576,20.562,75.357,14.7a1.906,1.906,0,0,0,1.585-1.874V4.18A4.183,4.183,0,0,0,72.763,0H67.286a4.234,4.234,0,0,0-4.228,4.228v8.6A1.87,1.87,0,0,0,64.643,14.7l-3.171,5.861a.946.946,0,0,0,.384,1.3.714.714,0,0,0,.432.1.93.93,0,0,0,.817-.48l.288-.48h13.26l.288.48a.892.892,0,0,0,.817.48,1.4,1.4,0,0,0,.432-.1A.946.946,0,0,0,78.576,20.562ZM74.06,16.238H65.989l.817-1.489h6.438Zm-.144-3.219a1.393,1.393,0,1,1,1.393-1.393A1.426,1.426,0,0,1,73.916,13.019ZM64.74,4.756a2.676,2.676,0,0,1,2.642-2.69h5.237a2.717,2.717,0,0,1,2.69,2.69V7.062a.924.924,0,0,1-.961.913H65.7a.912.912,0,0,1-.913-.913L64.74,4.756Zm1.393,5.429a1.393,1.393,0,1,1-1.393,1.393A1.394,1.394,0,0,1,66.133,10.185Zm-1.97,9.368,1.057-1.874h9.608l1.057,1.874Z" transform="translate(-61.359)"/></g></g></svg>',
          active: ''
        },
        {
          id: 2,
          title: this.$t('trip_type_3'),
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="12.792" height="21.545" viewBox="0 0 12.792 21.545"><defs><style>.a{fill:#fff;}</style></defs><g transform="translate(-104.017 0)"><path class="a" d="M114.789,21.545h-8.752a2.022,2.022,0,0,1-2.02-2.02V6.4a6.4,6.4,0,0,1,12.791-.048,2.02,2.02,0,1,1-4.039.048A2.356,2.356,0,0,0,110.4,4.04a2.455,2.455,0,0,0-1.875,3.926,2.681,2.681,0,0,0,1.253.988l5.3,2.039a2.709,2.709,0,0,1,1.726,2.513v6.018A2.022,2.022,0,0,1,114.789,21.545Zm-4.376-20.2A5.046,5.046,0,0,0,105.363,6.4V19.525a.674.674,0,0,0,.673.673h8.752a.674.674,0,0,0,.673-.673V13.507a1.354,1.354,0,0,0-.863-1.257l-5.3-2.039a4.038,4.038,0,0,1-2.588-3.828,3.7,3.7,0,0,1,7.405.014.673.673,0,0,0,.679.673.7.7,0,0,0,.667-.711A5.047,5.047,0,0,0,110.413,1.348Z" transform="translate(0 0)"/><path class="a" d="M174.707,353.38H168.69a.673.673,0,1,1,0-1.346h6.017a.673.673,0,0,1,0,1.346Z" transform="translate(-61.307 -337.222)"/><path class="a" d="M174.707,417.38H168.69a.673.673,0,1,1,0-1.346h6.017a.673.673,0,1,1,0,1.346Z" transform="translate(-61.307 -398.529)"/></g></svg>',
          active: ''
        },
        {
          id: 3,
          title: this.$t('trip_type_4'),
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="21.4" height="21.526" viewBox="0 0 21.4 21.526"><defs><style>.a{fill:#fff;stroke:#fff;stroke-width:0.4px;}</style></defs><g transform="translate(0.2 0.326)"><g transform="translate(0 8.582)"><path class="a" d="M9.883,214.15a.476.476,0,0,0-.675,0L7.439,215.92H6.2a.477.477,0,0,0-.477.478v.955H4.773a.477.477,0,0,0-.477.478v.955H3.341a.478.478,0,0,0-.477.478V220.5l-.2.2H.955v-1.712L8.928,211a.478.478,0,0,0,0-.675l-.14-.14a.667.667,0,0,1-.2-.476v0a.477.477,0,1,0-.955,0,1.616,1.616,0,0,0,.3.937l-7.793,7.8a.477.477,0,0,0-.14.338v2.388a.477.477,0,0,0,.477.477H2.864a.478.478,0,0,0,.337-.14l.477-.478a.477.477,0,0,0,.14-.337v-.955h.955a.477.477,0,0,0,.477-.478v-.955H6.2a.477.477,0,0,0,.477-.478v-.955h.955a.477.477,0,0,0,.337-.14l1.909-1.911A.477.477,0,0,0,9.883,214.15Z" transform="translate(0 -209.233)"/></g><g transform="translate(12.829 3.284)"><path class="a" d="M317.241,82.405l-1.909-1.911a1.524,1.524,0,0,0-2.107,0,1.493,1.493,0,0,0,0,2.108l1.909,1.911a1.49,1.49,0,0,0,2.107-2.108Zm-.675,1.432a.548.548,0,0,1-.757,0L313.9,81.927a.538.538,0,0,1,0-.757.535.535,0,0,1,.757,0l1.909,1.911A.537.537,0,0,1,316.566,83.837Z" transform="translate(-312.789 -80.072)"/></g><g transform="translate(6.682 0)"><path class="a" d="M176.746,6,171.216.462a1.668,1.668,0,0,0-2.3,0l-4.575,4.578a1.632,1.632,0,0,0,0,2.306l4.575,4.578-.281.281a.668.668,0,0,1-.475.2h0a.67.67,0,0,1-.477-.2l-1.334-1.335a.477.477,0,0,0-.675,0L163.044,13.5a.477.477,0,1,0,.675.675l2.288-2.289,1,1a1.618,1.618,0,0,0,1.152.477h0a1.616,1.616,0,0,0,1.149-.477l.618-.619a.477.477,0,0,0,0-.675l-4.913-4.916a.676.676,0,0,1,0-.955l4.575-4.578a.69.69,0,0,1,.955,0l5.53,5.534a.676.676,0,0,1,0,.955L171.5,12.205a.67.67,0,0,1-.477.2.478.478,0,0,0,0,.955,1.618,1.618,0,0,0,1.152-.478L176.746,8.3a1.632,1.632,0,0,0,0-2.306Z" transform="translate(-162.904 0)"/></g></g></svg>',
          active: ''
        }
      ],
      dialog: false,
      dialog2: false,
      dialogMenu:false,
      dateForm:"",
      date: "",
      menu: false,
      modal: false,
      lang: "",
      //Коды городов
      fromAvia:"",
      toAvia:"",
      //От и куда по дате
      fD:"",
      fromData:"",
      tD:"",
      toData:"",
      //К
      fromMenu:false,
      toMenu:false,
      //
      menuTraveler:false,
      adult:1,
      adolcent:0,
      child:0,
      flyType:"A",
      //Railway from and to
      stationsFrom:[],
      stationsTo:[],
      railFrom:"",
      railTo:"",
      search:"",
      searchTo:"",
      stfromMenu:false,
      sttoMenu:false,

    }
  },
  watch: {
    dateForm (val) {
      this.date = this.$moment(val).format("DD/MM/YYYY");
    },
    date(val){
      if(this.date){
        this.$router.push({path: 'events' , query: {date_start: this.date}});
      }
      else{
        this.$router.push({path: 'events'});
      }
    },
    fD(val){
      this.fromData = this.$moment(val).format("DD.MM.YYYY");
    },
    tD(val){
      this.toData = this.$moment(val).format("DD.MM.YYYY");
    },
    search (val) {
      this.getRailStation(val)
    },
    searchTo (val) {
      this.getRailStationTo(val)
    }

  },
  computed:{
    formatDate() {
      return this.date
    },
    fromDataComputed(){
      return this.fromData;
    },
    toDataComputed(){
      return this.toData;
    },

  },
  methods:{
    getImages(data){
      return this.$store.state.image.image + data ;
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

    increment(type){
      if(type == 0){
        this.adult +=1
      }
      else if(type == 1){
        this.adolcent +=1
      }
      else if(type == 2){
        if(this.adult >= this.child){
          this.child +=1
        }
        else{
          this.$toast.info("Количество младенцев равно количеству взрослых")
        }

      }

    },
    decrement(type){
      if(type == 0){
        this.adult > 1 ? this.adult -=1 : null;
      }
      else if(type == 1){
        this.adolcent > 0 ? this.adolcent -=1 : null;
      }
      else if(type == 2){
        this.child > 0 ? this.child -=1 : null;
      }
    },

    sendToFly(){
      if(this.toAvia && this.fromAvia && this.fromData && this.toData && this.adult){
        let url = "https://tickets.kz/avia/m/preloader/";
        url += this.fromAvia + this.toAvia + this.fromData + '0' + "|" + this.toData + '0' + "/" + this.adult +"|" + this.adolcent + "|" + this.child + "/" + this.flyType;
        window.open(url, '_blank');
        this.toData = "";
        this.fromData = "";
      }
      else{
        this.$toast.info("Пожалуйста заполните все поля!");
      }

    },
    sendToTrain(){
      if(this.railFrom && this.railTo && this.fromData && this.toData) {
        let url = "https://tickets.kz/gd/preloader/~" +this.railFrom+"~"+this.railTo +"~" + this.fromData + "~2~kz~0~" + this.toData+ "~~~"
        window.open(url, '_blank');
        this.toData = "";
        this.fromData = "";
      }
      else{
        this.$toast.info("Пожалуйста, заполните все поля!");
      }
      },

     async getRailStation(val = null){
      if(val){
        let readystations = [];
        let stations2 = [];

        let parseString = require('xml2js').parseString;
        if (val.length > 1){
          try{
            const xmlData = await fetch(
              'https://gdv2api.tickets.ua/rail/station?key=f713450e-d974-46f3-9b62-f55f8549ec67&name='+val + "&lang=ru"
            ).then(res => res.text())
            parseString(xmlData, function (err, result) {
              stations2 = result.response.stations[0].station;
            });
          }
          catch (e) {
          }
          if (stations2.length){
            for (let i = 0 ; i < stations2.length; i++){
              if(stations2[i]["$"] !== undefined){
                readystations.push(stations2[i]["$"])
                if (stations2[i].substation !== undefined){
                  for (let j = 0 ; j < stations2[i].substation.length; j++){
                    if(stations2[i].substation[j]["$"] !== undefined){
                      readystations.push(stations2[i].substation[j]["$"])
                    }
                  }
                }
              }
            }
          }
          this.stationsFrom = readystations;


        }
      }




    },
    async getRailStationTo(val = null){
      if(val){
        let readystations = [];
        let stations2 = [];

        let parseString = require('xml2js').parseString;
        if (val.length > 1){
          try{
            const xmlData = await fetch(
              'https://gdv2api.tickets.ua/rail/station?key=f713450e-d974-46f3-9b62-f55f8549ec67&name='+val + "&lang=ru"
            ).then(res => res.text())
            parseString(xmlData, function (err, result) {
              stations2 = result.response.stations[0].station;
            });
          }
          catch (e) {

          }
          if (stations2.length){
            for (let i = 0 ; i < stations2.length; i++){
              if(stations2[i]["$"] !== undefined){
                readystations.push(stations2[i]["$"])
                if (stations2[i].substation !== undefined){
                  for (let j = 0 ; j < stations2[i].substation.length; j++){
                    if(stations2[i].substation[j]["$"] !== undefined){
                      readystations.push(stations2[i].substation[j]["$"])
                    }
                  }
                }
              }
            }
          }
          this.stationsTo = readystations;


        }
      }




    }


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
    return {sliders,categoryplace,events,routes,souvenirs,blogs,data}
  },
   mounted() {
      // console.log(this.$router)
  }
  }
</script>
<style lang="scss">

.calendar__item-img{
  background-repeat: no-repeat!important;
  background-size: cover!important;
  background-position: center!important;
}
.v-select__slot{
  cursor: pointer;
  input{
      border: none !important;
  }
}
.v-text-field__slot{
  input{
    border: none !important;
  }
}
.routes__item-btn{
  color: white!important;
}
.carousel-slider-usual{
  background-repeat: no-repeat!important;
  background-size: cover!important;
  background-position: center!important;
}
.calendar__change-date{
  .v-icon{
    color: white!important;
  }
  fieldset {
    border-color: white!important;
  }
  input{
    color: white!important;
  }
  label{
    color: white!important;
  }
}
</style>

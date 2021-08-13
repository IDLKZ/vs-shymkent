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
              <div class="calendar__btn-wrapper">
                <NuxtLink class="calendar__item-btn popup-modal" :to="'/events/' + item.alias">
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
        <v-row class="mt-5">
          <v-tabs background-color="#C42313"  v-model="tab">
            <v-tab   class="schedule" active-class="schedule-active" href="#tab1">
              <v-icon class="schedule-icon mr-2">fas fa-plane</v-icon>Авиабилеты
            </v-tab>
            <v-tab  class="schedule" active-class="schedule-active" href="#tab2">
              <v-icon class="schedule-icon mr-2">fas fa-train</v-icon>Ж/Д
            </v-tab>
            <v-tab  class="schedule" active-class="schedule-active" href="#tab3">
              <v-icon class="schedule-icon mr-2">fas fa-hotel</v-icon>Отели
            </v-tab>
            <v-tab  class="schedule" active-class="schedule-active" href="#tab4">
              <v-icon class="schedule-icon mr-2">fas fa-key</v-icon>Квартиры
            </v-tab>
          </v-tabs>

          <v-tabs-items class="py-5 px-5" style="width: 100%" v-model="tab">
            <v-tab-item value="tab1">
              <v-form  class="d-flex align-center">
                <v-row>
                  <v-col  lg="2" md="3" sm="6" cols="12" >
                    <v-text-field
                      outlined
                      label="Откуда"
                      hide-details="false"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col  lg="2" md="3" sm="6" cols="12" >
                    <v-text-field
                      outlined
                      label="Куда"
                      hide-details="false"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col  lg="2" md="3" sm="6" cols="12" >
                    <v-text-field
                      outlined
                      label="Дата вылета"
                      hide-details="false"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col  lg="2" md="3" sm="6" cols="12" >
                    <v-text-field
                      outlined
                      label="Обратно"
                      hide-details="false"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col  lg="2" md="3" sm="6" cols="12" >
                    <v-text-field
                      outlined
                      label="Пассажиры"
                      hide-details="false"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col  lg="2" md="3" sm="6" cols="12" >
                    <v-btn class="my-btn">
                      Найти
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>

            </v-tab-item>
            <v-tab-item value="tab2">
              <v-form  class="d-flex align-center">
                <v-row>
                  <v-col  lg="3" md="3" sm="6" cols="12" >
                    <v-text-field
                      outlined
                      label="Откуда"
                      hide-details="false"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col  lg="3" md="3" sm="6" cols="12" >
                    <v-text-field
                      outlined
                      label="Куда"
                      hide-details="false"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col  lg="2" md="2" sm="6" cols="12" >
                    <v-text-field
                      outlined
                      label="Дата вылета"
                      hide-details="false"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col  lg="2" md="2" sm="6" cols="12" >
                    <v-text-field
                      outlined
                      label="Обратно"
                      hide-details="false"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col  lg="2" md="2" sm="6" cols="12" >
                    <v-btn class="my-btn">
                      Найти
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-tab-item>
            <v-tab-item value="tab3">
              <v-form  class="d-flex align-center">
                <v-row>
                  <v-col  lg="2" md="2" sm="6" cols="12" >
                    <v-text-field
                      outlined
                      label="Откуда"
                      hide-details="false"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col  lg="2" md="2" sm="6" cols="12" >
                    <v-text-field
                      outlined
                      label="Куда"
                      hide-details="false"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col  lg="2" md="2" sm="6" cols="12" >
                    <v-text-field
                      outlined
                      label="Дата вылета"
                      hide-details="false"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col  lg="4" md="4" sm="6" cols="12" >
                    <v-text-field
                      outlined
                      label="Обратно"
                      hide-details="false"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col  lg="2" md="2" sm="6" cols="12" >
                    <v-btn class="my-btn">
                      Найти
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-tab-item>
            <v-tab-item value="tab4">
              <v-form  class="d-flex align-center">
                <v-row>
                  <v-col  lg="3" md="3" sm="6" cols="12" >
                    <v-text-field
                      outlined
                      label="Откуда"
                      hide-details="false"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col  lg="2" md="2" sm="6" cols="12" >
                    <v-text-field
                      outlined
                      label="Куда"
                      hide-details="false"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col  lg="2" md="2" sm="6" cols="12" >
                    <v-text-field
                      outlined
                      label="Дата вылета"
                      hide-details="false"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col  lg="3" md="3" sm="6" cols="12" >
                    <v-text-field
                      outlined
                      label="Обратно"
                      hide-details="false"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col  lg="2" md="2" sm="6" cols="12" >
                    <v-btn class="my-btn">
                      Найти
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-tab-item>
          </v-tabs-items>

        </v-row>
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
              <NuxtLink class="routes__item-btn popup-modal" to="#">
                <span>Подробнее</span>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="load-more">
          <NuxtLink to="#">Смотреть все маршруты</NuxtLink>
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
          <div class="souvenirs__item" v-for="(item,i) in this.souvenirs" :key="i">
            <div class="souvenirs__item-img" :style="'background-image: url('+getImages(item.image)+');'"></div>
            <div class="souvenirs__item-content">
              <h4 class="souvenirs__item-title">
                {{ item['title_'+$i18n.locale] }}
              </h4>
              <p class="souvenirs__item-text" v-html="truncate(item['description_'+$i18n.locale], 75)"></p>
              <div class="souvenirs__item-price-wrapper">
                <button class="souvenirs__item-btn popup-modal" href="#"><span>Купить</span></button>
                <div class="souvenirs__item-price">
                  {{item.price}} ТГ
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="load-more">
          <NuxtLink to="#">Перейти в магазин</NuxtLink>
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
            <NuxtLink class="popup-modal" to="#">
              <img class="news__item-img" :src="getImages(item.image)" :alt="item['title_'+$i18n.locale]">
              <div class="news__item-date">
                Опубликовано: <span>{{ item.created_at }}</span>
              </div>
              <p class="news__item-text" v-html="truncate(item['description_'+$i18n.locale], 50)"></p>
            </NuxtLink>
          </div>
        </div>
        <div class="load-more">
          <NuxtLink to="#">Все новости</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: null
    }
  },
  methods:{
    getImages(data){
      console.log(this.$store.state.image.image);
      return this.$store.state.image.image + data ;
    },
    truncate(string = '', value) {
      return string.substring(0, value) + '...';
    }

  },
  async asyncData({$axios}) {
    let sliders,categoryplace,events,routes,souvenirs,blogs = [];
    try{
      await $axios.$get("/sliders").then((e)=>{e.length > 0 ? sliders = e : null});
      await $axios.$get("/categoriesofthe-places").then((e)=>{e.length > 0 ? categoryplace = e : null});
      await $axios.$get("/events").then((e)=>{e.length > 0 ? events = e : null});
      await $axios.$get("/routes").then((e)=>{
        e.length > 0 ? routes = e[0] : null
      });
      await $axios.$get("/souvenirs").then((e)=>{e.length > 0 ? souvenirs = e : null});
      await $axios.$get("/news").then((e)=>{e.length > 0 ? blogs = e : null});
    }
    catch (e) {
      console.log(e);
    }
    return {sliders,categoryplace,events,routes,souvenirs,blogs}
  }
}
</script>

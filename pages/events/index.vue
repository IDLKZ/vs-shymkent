<template>
  <section class="calendar-page">
    <div class="container">
      <ul class="crumbs">
        <li class="crumbs__item">
          <NuxtLink to="/">Главная</NuxtLink>
        </li>
        <li class="crumbs__item current">
          <NuxtLink to="#">Aфиша</NuxtLink>
        </li>
      </ul>
      <div class="top-content calendar__top-content">
        <div class="top-content__wrapper top-content__wrapper-2">
          <h2 class="top-content__title">
            Календарь событий
          </h2>
          <p class="top-content__text">
            События в Шымкенте
          </p>
        </div>
        <div class="top-content__line"></div>
      </div>
      <div class="calendar-page__article-menu">
        <ul class="calendar-page__categories">
          <li :class="getActiveClass(0)" @click="toggleActiveClass(0)">Ближайшиие</li>
          <li :class="getActiveClass(1)" @click="toggleActiveClass(1)">Сегодня</li>
          <li :class="getActiveClass(2)" @click="toggleActiveClass(2)">Завтра</li>
        </ul>
        <div class="calendar-page__select-inner">
          <div class="calendar-page__select-wrapper select__wrapper">
            <div class="calendar-page__select-label select__label">Категория:</div>
            <div class="calendar-page__select select">
              <div class="calendar-page__select-header select__header">
                                <span class="calendar-page__select-current select__current">
                                    Все
                                </span>
                <div class="calendar-page__select-icon select__icon"></div>
              </div>
              <div class="calendar-page__select-body select__body">
                <div class="calendar-page__select-item select__item active">Все</div>
                <div class="calendar-page__select-item select__item">Концерты</div>
                <div class="calendar-page__select-item select__item">Фильмы</div>
                <div class="calendar-page__select-item select__item">Спектакли</div>
              </div>
            </div>
          </div>
          <div class="calendar__change-date">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="day"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="day"
                  label="Picker in menu"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                no-title
                scrollable

              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="menu = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </div>
        </div>
      </div>
      <div class="calendar__inner">
        <div class="calendar__item" v-for="(item,i) in events" :key="i">
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
        <a href="#">Загрузить еще...</a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      activeClass:0,
      day:"",
      events:[],
      current_page:1,
      last_page:1,
      date: "",
      menu: false,
      modal: false,
    }
  },
  watch:{
    day: function (val) {
      console.log(val);
      this.day = this.$moment(val).format("DD/MM/YYYY")
    },
  },
  methods:{
    getImages(data){
      console.log(this.$store.state.image.image);
      return this.$store.state.image.image + data ;
    },
    truncate(string, value) {
      return string.substring(0, value) + '…';
    },
    //Активные табы
    getActiveClass(index){
      if(index == this.activeClass){
        return "active"
      }
      else{
        return ""
      }
    },
    //Переключение между табами
    toggleActiveClass(index){
      console.log(this.$moment(new Date()).format("DD/MM/YYYY"));
      console.log(this.$moment(new Date()).add(1,'days').format("DD/MM/YYYY"));
      this.activeClass = index;
      this.current_page =1;
      // this.loadData();
    },

  },
  async asyncData({$axios}) {
    let events = [];
    try{
      await $axios.$get("/events").then((e)=>{e.length > 0 ? events = e : null});
    }
    catch (e) {
      console.log(e);
    }
    return {events}
  }
}
</script>

<style scoped>

</style>

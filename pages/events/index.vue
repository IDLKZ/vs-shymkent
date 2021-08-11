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
          <li class="active">Ближайшиие</li>
          <li>Сегодня</li>
          <li>Завтра</li>
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
            <input class="calendar-page__date-item" type="text" id="calendar__timing" placeholder="Выбрать дату" readonly>
            <svg class="calendar__timing-svg calendar-page__timing-svg" xmlns="http://www.w3.org/2000/svg" width="9.318" height="4.985" viewBox="0 0 9.318 4.985"><g transform="translate(-6.4 -33.4)"><path d="M15.623,33.5a.329.329,0,0,0-.466,0l-4.094,4.1-4.1-4.1a.329.329,0,0,0-.466.466l4.326,4.326a.321.321,0,0,0,.233.1.335.335,0,0,0,.233-.1l4.326-4.326A.323.323,0,0,0,15.623,33.5Z" transform="translate(0)"/></g></svg>
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
  methods:{
    getImages(data){
      console.log(this.$store.state.image.image);
      return this.$store.state.image.image + data ;
    },
    truncate(string, value) {
      return string.substring(0, value) + '…';
    }

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

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
          <li :class="getActiveClass(1)" @click="toggleActiveClass(1,$moment(new Date()).format('DD/MM/YYYY'))">Сегодня</li>
          <li :class="getActiveClass(2)" @click="toggleActiveClass(2,$moment(new Date()).add(1,'days').format('DD/MM/YYYY'))">Завтра</li>
        </ul>
        <div class="calendar-page__select-inner">
          <div class="calendar-page__select-wrapper select__wrapper d-block">
            <div class="calendar-page__select-label select__label">Категория:</div>
            <div class="calendar-page__select select">
              <v-select
                :items="categories"
                v-model="category"
                :item-text="'title_' + $i18n.locale"
                :item-value="'id'"
                @change="changeCategory"
                dense
              ></v-select>
            </div>
          </div>
          <div class="calendar__change-date">
            <v-menu
              ref="menu1"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formatDate"
                  label="Дата"
                  persistent-hint
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  v-on="on"

                ></v-text-field>
              </template>
              <v-date-picker
                v-model="dateForm"
                no-title
                @input="menu = false"
              ></v-date-picker>
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
              {{ truncateTitle(item['title_'+$i18n.locale],20) }}
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
      <div class="load-more" v-if="current_page < last_page">
        <a @click="paginate">Загрузить еще...</a>
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
      dateForm:"",
      categories:[],
      category:0,
      events:[],
      current_page:1,
      last_page:1,
      date: "",
      menu: false,
      modal: false,
    }
  },


  watch: {
    dateForm (val) {
      this.date = this.$moment(val).format("DD/MM/YYYY");
      this.current_page = 1;
      this.loadData();
    },
  },
  computed: {
    formatDate() {
      return this.date
    },
    dateQuery(){
      return this.date ? "&date_start=" + this.date : "";
    },
    categoryQuery(){
      return this.category > 0 ? "&category_id="+this.category : ""
    }
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
    toggleActiveClass(index,day = null){
      this.date =  day !== null ? day : null;
      this.activeClass = index;
      this.current_page =1;
      this.loadData();
    },

    paginate(){
      this.current_page +=1
      this.loadData();
    },
    changeCategory(){
      this.current_page = 1
      this.loadData();
    },

    //Загружаем новые страницы
    async loadData(){
      try{
        this.$axios.$get("/all-events?page=" + this.current_page + this.categoryQuery + this.dateQuery).then(e=>{
          this.current_page == 1 ? (this.events = e.data) : (this.events.push(...e.data));
          this.current_page = e.current_page;
          this.last_page = e.last_page;
        }).catch(e=>{console.log(e)});
      }
      catch (e) {
        this.$toast.error("Произошла ошибка попробуйте позже");
      }

    },



  },
  async asyncData({$axios}) {
    let events = [];
    let categories = [{id:0,"title_ru":"Все","title_en":"All","title_kz":"Барлық"}];
    let current_page,last_page = 1;
    try{
      await $axios.$get("/all-events").then((e)=>{events = e.data;current_page = e.current_page; last_page = e.last_page });
      await $axios.$get("/event-category").then((e)=>{e.length > 0 ? categories.push(...e) : null});
    }
    catch (e) {
      console.log(e);
    }
    return {events,categories,current_page,last_page}
  }
}
</script>

<style scoped>

</style>

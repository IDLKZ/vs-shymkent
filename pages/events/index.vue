<template>
  <section class="calendar-page">
    <div class="container">
      <ul class="crumbs">
        <li class="crumbs__item">
          <NuxtLink to="/">{{ $t('main') }}</NuxtLink>
        </li>
        <li class="crumbs__item current">
          <NuxtLink to="#">{{ $t('events') }}</NuxtLink>
        </li>
      </ul>
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
      <div class="calendar-page__article-menu">
        <ul class="calendar-page__categories">
          <li :class="getActiveClass(0)" @click="toggleActiveClass(0)">{{ $t('events_time_1') }}</li>
          <li :class="getActiveClass(1)" @click="toggleActiveClass(1,$moment(new Date()).format('DD/MM/YYYY'))">{{ $t('events_time_2') }}</li>
          <li :class="getActiveClass(2)" @click="toggleActiveClass(2,$moment(new Date()).add(1,'days').format('DD/MM/YYYY'))">{{ $t('events_time_3') }}</li>
        </ul>
        <div class="calendar-page__select-inner">
          <div class="calendar-page__select-wrapper select__wrapper d-block">
            <div class="calendar-page__select-label select__label">{{ $t('categories') }}:</div>
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
                  :label="$t('date')"
                  persistent-hint
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  v-on="on"
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
        <div class="calendar__item" v-for="(item,i) in events" :key="i">
          <NuxtLink :to="'/events/' + item.alias">
            <div class="calendar__item-img"
                 :style="{'background':'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('+getImage(item.image)+')'}">


            <div class="calendar__item-day" v-if="item.workdays.length>0">
              <div v-for="(day,index) in item.workdays" :key="index">
                <small v-if="day.weekday.id == 1">{{day.weekday["title_" + $i18n.locale]}}</small>
                <span>{{ $t('date') }} </span>{{day.date_start}} - {{day.date_end}}
              </div>

            </div>
            <div class="calendar__item-time">
              <div v-for="(day,index) in item.workdays" :key="index">
                <span>{{ $t('time') }} </span>{{day.time_start}} - {{day.time_end}}
              </div>
            </div>
          </div>
          </NuxtLink>
          <div class="calendar__item-inner">
            <h4 class="calendar__item-title">
              {{ truncateTitle(item['title_'+$i18n.locale],20) }}
            </h4>
            <div class="d-flex justify-space-around my-2">
              <div>
                <small>{{$t('service_ratings')}}</small>
                <div class="guide-item__rating-inner">
                  <div class="guide-list__item-rating">
                    <div v-for="i in 5" :class="getStarClass(i,item.ratings_avg_rating)">
                      <svg height="511pt" viewBox="0 -10 511.98685 511" width="511pt" xmlns="http://www.w3.org/2000/svg"><path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"/></svg>
                    </div>
                  </div>
                  <div class="guide-item__contact-count">
                    ({{item.ratings_avg_rating !== null ?item.ratings_avg_rating : 0}})
                  </div>
                </div>
              </div>
              <div>
                <small>{{$t('user_ratings')}}</small>
                <div class="guide-item__rating-inner">
                  <div class="guide-list__item-rating">
                    <div v-for="i in 5" :class="getStarClass(i,item.reviews_avg_rating)">
                      <svg height="511pt" viewBox="0 -10 511.98685 511" width="511pt" xmlns="http://www.w3.org/2000/svg"><path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"/></svg>
                    </div>
                  </div>
                  <div class="guide-item__contact-count">
                    ({{item.reviews_avg_rating !== null ?item.reviews_avg_rating : 0 }})
                  </div>
                </div>
              </div>
            </div>
            <div class="calendar__item-location">
              {{ item.address }}
            </div>

            <p class="calendar__item-text" v-html="truncateTitle(item['description_'+$i18n.locale], 50)"></p>
            <div class="calendar-page__btn-wrapper mt-3">
              <v-dialog
                v-if="item.eventum"
                v-model="dialog"
              >
                <template v-slot:activator="{ on, attrs }">
                  <button class="calendar-page__item-btn"
                          v-bind="attrs"
                          v-on="on"
                          style="color: white!important;"
                          @click="eventum = item.eventum"
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
                    <iframe :src="getEventum(eventum)" style="height:573px;width:100%;"
                            frameborder="0"></iframe>
                  </v-card-text>

                  <v-divider></v-divider>

                </v-card>
              </v-dialog>
              <NuxtLink class="calendar-page__item-link" :to="'/events/' + item.alias">
                <span>{{ $t('more_info') }}</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div class="load-more" v-if="current_page < last_page">
        <a @click="paginate">{{ $t('load_more') }}...</a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      dialog: false,
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
      eventum:null
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
  async asyncData({$axios,query}) {
    let events = [];
    let date,dateQuery = "";
    let categories = [{id:0,"title_ru":"Все","title_en":"All","title_kz":"Барлық"}];
    let current_page,last_page = 1;
    if(query.date_start){
      date = query.date_start;
      dateQuery = "&date_start=" + date;
    }


    try{
      await $axios.$get("/all-events?page=1" + dateQuery).then((e)=>{events = e.data;current_page = e.current_page; last_page = e.last_page });
      await $axios.$get("/event-category").then((e)=>{e.length > 0 ? categories.push(...e) : null});
    }
    catch (e) {
      console.log(e);
    }
    return {events,categories,date,current_page,last_page}
  }
}
</script>

<style scoped lang="scss">
.calendar__item-img{
  background-repeat: no-repeat!important;
  background-size: cover!important;
  background-position: center!important;
}


  .v-icon{
    color: #646464!important;
  }
  fieldset {
    border-color: #646464!important;
  }
  input{
    color: #646464!important;
  }
  label{
    color: #646464!important;
  }
@media screen and (min-width: 320px) and (max-width: 700px){

  .calendar-page__article-menu{
    align-items: center;
  }
}

</style>

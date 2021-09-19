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

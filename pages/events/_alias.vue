<template>
  <section class="calendar-item">
    <div class="container">
      <ul class="crumbs">
        <li class="crumbs__item">
          <NuxtLink to="/">{{ $t('main') }}</NuxtLink>
        </li>
        <li class="crumbs__item">
          <NuxtLink to="/events">{{ $t('events') }}</NuxtLink>
        </li>
        <li class="crumbs__item current">
          <NuxtLink to="#">{{ event['title_'+$i18n.locale] }}</NuxtLink>
        </li>
      </ul>
      <div class="top-content calendar__top-content">
        <div class="top-content__wrapper top-content__wrapper-2">
          <h2 class="top-content__title">
            {{ event['title_'+$i18n.locale] }}
          </h2>
        </div>
        <div class="top-content__line"></div>
      </div>
      <div class="calendar-item__inner">
        <div class="calendar-item__left-content">
          <lingallery :iid.sync="currentId" :width="400" :height="'auto'" :items=galleries class="mr-md-6"/>
          <v-dialog
            v-if="event.eventum"
            v-model="dialog2" outlined
            autocomplete="off"
            filled
            solo-inverted
          >
            <template v-slot:activator="{ on, attrs }">
              <button class="calendar-item__btn"
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
                <iframe :src="getEventum(event.eventum)" style="height:573px;width:100%;"
                        frameborder="0"></iframe>
              </v-card-text>

              <v-divider></v-divider>

            </v-card>
          </v-dialog>
        </div>
        <div class="calendar-item__content">
          <div class="d-flex  my-2">
            <div>
              <small>{{$t('service_ratings')}}</small>
              <div class="guide-item__rating-inner">
                <div class="guide-list__item-rating">
                  <star-rating :rating="event.ratings_avg_rating" star-size="16" :read-only="true" :round-start-rating="false" :show-rating="false"></star-rating>
                </div>
                <div class="guide-item__contact-count">
                  ({{event.ratings_avg_rating !== null ?event.ratings_avg_rating.toFixed(1) : 0}})
                </div>
              </div>
            </div>
            <div>
              <small>{{$t('user_ratings')}}</small>
              <div class="guide-item__rating-inner">
                <div class="guide-list__item-rating">
                  <star-rating :rating="event.reviews_avg_rating" star-size="16" :read-only="true" :round-start-rating="false" :show-rating="false"></star-rating>
                </div>
                <div class="guide-item__contact-count">
                  ({{event.reviews_avg_rating !== null ?event.reviews_avg_rating.toFixed(1) : 0 }})
                </div>
              </div>
            </div>
          </div>
          <div class="calendar-item__content-item">
            <h4 class="calendar-item__content-title">
              {{ $t('about_events') }}
            </h4>
            <div class="calendar-item__content-text" v-html="event['description_' + $i18n.locale]"></div>
          </div>
          <div class="calendar-item__content-item">
            <h4 class="calendar-item__content-title">
              {{ $t('info_events') }}
            </h4>
            <ul class="calendar-item__contact">
              <li>
                <div class="calendar-item__contact-title">
                  {{ $t('address') }}
                </div>
                <div class="calendar-item__contact-text">
                  {{ event.address }}
                </div>
              </li>
              <li>
                <div class="calendar-item__contact-title">
                  {{ $t('date') }} / {{ $t('time') }}:
                </div>
                <div class="calendar-item__contact-text">
                  <div v-if="event.workdays.length>0">
                    <div v-for="(item,i) in event.workdays" :key="i">
                      {{ item.date_start }} - {{ item.date_end }} / {{ item.time_start }} - {{ item.time_end }}
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="calendar-item__contact-title">
                  {{ $t('phones_for_contact') }}:
                </div>
                <div class="calendar-item__contact-text">
                  <span v-for="(item,i) in event.phone" :key="i">
                    <a :href="'tel:'+item" class="info--text">{{item}}</a>
                  </span>
                </div>
              </li>
              <li>
                <div class="calendar-item__contact-title">
                  {{ $t('rating') }}:
                </div>
                <div class="calendar-item__contact-text">
                  <div class="guide-item__rating-items" v-if="event.ratings.length>0">
                    <div class="guide-item__rating-item" v-for="(rating,i) in event.ratings" :key="i">
                      <h5 class="guide-item__rating-item-title">
                        В {{rating.title}}
                      </h5>
                      <star-rating :rating="rating.rating" star-size="16" :read-only="true" :round-start-rating="false" :show-rating="true"></star-rating>
                    </div>
                  </div>
                </div>

              </li>
            </ul>
          </div>
          <div class="calendar-item__content-item">
            <div class="calendar-item__content-map my-5">
              <yandex-map :coords="coords"
                          zoom="10"
                          style="width: 100%;height: 227px;"
                          map-type="map"
              >
                <div v-for="(item,i) in placemarks">
                  <ymap-marker
                    :key="i"
                    :marker-id="i"
                    marker-type="placemark"
                    :coords="item"
                    :hint-content="event['title_'+$i18n.locale]"
                    :balloon="{header: event['title_'+$i18n.locale]}"
                    :icon="{color: 'green', glyph: 'circle'}"
                    cluster-name="1"
                  ></ymap-marker>
                </div>

              </yandex-map>
            </div>
          </div>
          <div class="calendar-item__content-item">
            <div class="post__btns">
              <form @submit.prevent="addSave(form,saveColor)">
                <input v-model="form.event_id" type="hidden" name="event_id">
                <button type="submit" class="post__btn" :class="this.saveColor">
                  <svg data-name="Livello 1" id="Livello_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title/><path d="M98.78,0H29.22A7.21,7.21,0,0,0,22,7.19V120.8a7.08,7.08,0,0,0,4.42,6.63,7.22,7.22,0,0,0,7.87-1.5L63.14,97.59a1.23,1.23,0,0,1,1.72,0l28.86,28.33a7.21,7.21,0,0,0,7.87,1.5A7.08,7.08,0,0,0,106,120.8V7.19A7.21,7.21,0,0,0,98.78,0ZM100,120.8a1.14,1.14,0,0,1-.74,1.09,1.17,1.17,0,0,1-1.34-.25h0L69.06,93.31a7.26,7.26,0,0,0-10.13,0L30.08,121.64a1.18,1.18,0,0,1-1.34.25A1.14,1.14,0,0,1,28,120.8V7.19A1.21,1.21,0,0,1,29.22,6H98.78A1.21,1.21,0,0,1,100,7.19Z"/></svg>
                  {{ $t(btn_save) }}
                </button>
              </form>
              <yandex-share :services="['vkontakte','facebook','twitter','whatsapp','telegram']" counter />
            </div>
          </div>
          <!--    Review Start-->
          <Disqus />
          <!--Review End-->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import StarRating from "vue-star-rating";

import Lingallery from 'lingallery';
export default {
  components:{
    StarRating,
    Lingallery
  },
  data(){
    return {
      dialog2: false,
      event:null,
      galleries: [],
      currentId:null,
      coords: [42.340782,69.596329],
      placemarks: [],
      reviews:[],
      current_page:1,
      last_page:1,
      place:{},
      forms:{
        rating:null,
        review:null,
        user_id:null,
        event_id:null
      },
    }
  },
  methods:{
    activeTab(i){
      this.tabs.forEach((item,i) => {
        item.active = ''
      })
      this.tabs[i].active = 'active'
    },
    //Установка рейтинга
    setRating(e){
      this.forms.rating = e;
    },
    //Существующий рейтинг
    getStarClass(item,max){
      let className =  'guide-list__item-rating-star';
      for (let i = 1; i <= max; i++){
        if(item <= max){
          className = 'guide-list__item-rating-star active';
        }
      }
      return className;
    },

    //Отправка формы
    async sendForm(){
      this.forms.user_id = this.$auth.user.user.id;
      this.forms.event_id = this.event.id;
      this.$toast.info("Отправляем запрос")
      await this.$axios.$post("/cabinet/reviews", this.forms).then((e)=>{
        this.$toast.success("Успешно отправлено на модерацию")
      }).catch((e)=>{
        if(e.response.status == 429){
          this.$toast.error("Убедитесь что ваши запросы потверждены, и попробуйте позже");
        }
      })
      this.forms.review = "";
      this.forms.rating = 0;
    },
    //Пагинация отзывов
    async loadMore(){
      this.current_page++
      try{
        await this.$axios.$get('/event/'+this.event.alias +"?page=" + this.current_page).then((e)=>{
          this.reviews.push(...e[1].data);
          this.current_page = e[1].current_page;
          this.last_page = e[1].last_page;
        }).catch((e)=>{
          console.log(e);
        })
      }
      catch (e) {
        this.$toast.error("Упс произошла ошибка! Попробуйте позже");
      }



    },
  },
  async asyncData({$axios,route,redirect,store}) {
    let event;
    let galleries = [];
    let placemarks = [];
    let reviews = [];
    let current_page,last_page = 1;
    let saveColor = ''
    let btn_save= 'save'
    let form = {}
    function  getImage(image) {
      let reg = new RegExp("https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)");
      if(image == null || image == "null"){
        return  "https://www.freeiconspng.com/uploads/no-image-icon-4.png";
      }
      else if(reg.test(image)){
        return image;
      }
      else{
        return store.state.image.image + image;
      }
    }
    await $axios.$get("/event/"+route.params.alias)
      .then(e => {
        if (Object.keys(e).length === 0) throw({ statusCode: 404, message: 'Event not found' })
        else {
          event = e[0];
          reviews = e[1].data;
          current_page = e[1].current_page;
          last_page = e[1].last_page;
          form.event_id = event.id
          if (store.$auth.$state.loggedIn){
            form.user_id = store.$auth.$state.user.user.id
            if (event.savings.length>0){
              event.savings.forEach((item,i) => {
                if (item.user_id == store.$auth.$state.user.user.id){
                  saveColor = 'color--red'
                  btn_save = 'saved'
                } else {
                  saveColor = ''
                  btn_save = 'save'
                }
              })
            }
          }
          let TIMA = JSON.parse(event.address_link)
          TIMA.forEach((item, i) => {
            placemarks[i] = [item.lat, item.lng];
          })
          // console.log(placemarks)
        }
      }).catch((e) => {
        console.log(e)
      })
    galleries.push({
      id:100, src:getImage(event.image), thumbnail:getImage(event.image)
    })
    if(event.galleries.length > 0){

      for(let i = 0; i < event.galleries.length; i++){

        galleries.push(
          {id:event.galleries[i].id,src:getImage(event.galleries[i].image) , thumbnail:getImage(event.galleries[i].image)}
        )
      }
    }

    return {event,galleries,placemarks, form, saveColor, btn_save,reviews,current_page,last_page};
  },
  mounted() {
    // console.log(this.galleries)
  }
}
</script>

<style scoped>

</style>

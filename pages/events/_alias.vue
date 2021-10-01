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
          <div class="tour-agency__content-feedback-item">
            <div class="touragencye__feedback-reviews">
              <div class="tour-agency__reviews-inner" style="min-height: auto" v-if="reviews.length">
                <h1>{{ $t('review') }}</h1>
                <div class="tour-agency__reviews-item" v-for="(review,index) in reviews">
                  <div class="tour-agency__reviews-item-top">
                    <div class="tour-agency__reviews-item-img" v-bind:style="{ backgroundImage: 'url(' + getImage(review.user.image) + ')' }"></div>
                    <div class="tour-agency__reviews-item-inner">
                      <div class="tour-agency__reviews-inner-name">
                        {{review.user.name}} | {{review.created_at}}
                      </div>
                      <div class="guide-list__item-rating">
                        <div v-for="i in 5" :class="getStarClass(i,review.rating)">
                          <svg height="511pt" viewBox="0 -10 511.98685 511" width="511pt" xmlns="http://www.w3.org/2000/svg"><path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tour-agency__reviews-item-text">
                    {{review.review}}
                  </div>
                </div>
                <div class="load-more" v-if="current_page < last_page">
                  <a  @click.prevent="loadMore"  href="#">{{ $t('load_more') }}...</a>
                </div>
              </div>
            </div>
          </div>
          <div class="blog-item__disqus" style="background-color: white" v-if="this.$auth.loggedIn">
            <h3 class="blog-item__disqus-title">
              {{ $t('leave_a_review') }}
            </h3>
            <div class="blog-item__disqus-inner">
              <div class="blog-item__disqus-inner">
                <div class="d-flex">
                  <v-avatar >
                    <img
                      :src="getImage(this.$auth.user.user.image)"
                      :alt="this.$auth.user.user.name"
                    >
                  </v-avatar>
                  <p>
                    {{this.$auth.user.user.name}}
                  </p>
                </div>
                <StarRating
                  @rating-selected="setRating"
                  :rating="rating ? Math.round(rating.avgStar) : 0"
                  :star-size="30"
                  text-class="customTextRating"
                >
                </StarRating>
                <v-textarea
                  v-model="forms.review"
                  :rules="[v => (v || '' ).length <= 1000 || 'Description must be 1000 characters or less']"
                  label="Текст отзыва"
                  color="teal"
                  max="1000"
                  counter
                >
                </v-textarea>
                <div class="text-right">
                  <v-btn @click="sendForm" v-if="forms.review && forms.review.length && forms.review.length < 1000" class="my-btn " style="height: 50px!important; width: 150px!important;">
                    {{ $t('send') }}
                  </v-btn>
                </div>



              </div>
            </div>
          </div>
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

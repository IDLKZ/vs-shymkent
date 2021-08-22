<template>
  <section class="calendar-item">
    <div class="container">
      <ul class="crumbs">
        <li class="crumbs__item">
          <NuxtLink to="/">Главная</NuxtLink>
        </li>
        <li class="crumbs__item">
          <NuxtLink to="/events">Aфиша</NuxtLink>
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
          <button class="calendar-item__btn" v-if="event.eventum">
            Купить билеты
          </button>
        </div>
        <div class="calendar-item__content">
          <div class="calendar-item__content-item">
            <h4 class="calendar-item__content-title">
              О мероприятии
            </h4>
            <div class="calendar-item__content-text" v-html="event['description_' + $i18n.locale]"></div>
          </div>
          <div class="calendar-item__content-item">
            <h4 class="calendar-item__content-title">
              Информация о мероприятии
            </h4>
            <ul class="calendar-item__contact">
              <li>
                <div class="calendar-item__contact-title">
                  Место проведения:
                </div>
                <div class="calendar-item__contact-text">
                  {{ event.address }}
                </div>
              </li>
              <li>
                <div class="calendar-item__contact-title">
                  Дата и время:
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
                  Телефон:
                </div>
                <div class="calendar-item__contact-text" v-for="(item,i) in event.phone" :key="i">
                  <span>{{item}} .,</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="calendar-item__content-item">
            <div class="calendar-item__content-map">
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
              <form @submit.prevent="addSave">
                <input v-model="form.event_id" type="hidden" name="event_id">
                <button type="submit" class="post__btn">
                  <svg :class="this.saveColor" data-name="Livello 1" id="Livello_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title/><path d="M98.78,0H29.22A7.21,7.21,0,0,0,22,7.19V120.8a7.08,7.08,0,0,0,4.42,6.63,7.22,7.22,0,0,0,7.87-1.5L63.14,97.59a1.23,1.23,0,0,1,1.72,0l28.86,28.33a7.21,7.21,0,0,0,7.87,1.5A7.08,7.08,0,0,0,106,120.8V7.19A7.21,7.21,0,0,0,98.78,0ZM100,120.8a1.14,1.14,0,0,1-.74,1.09,1.17,1.17,0,0,1-1.34-.25h0L69.06,93.31a7.26,7.26,0,0,0-10.13,0L30.08,121.64a1.18,1.18,0,0,1-1.34.25A1.14,1.14,0,0,1,28,120.8V7.19A1.21,1.21,0,0,1,29.22,6H98.78A1.21,1.21,0,0,1,100,7.19Z"/></svg>
                  Сохранить
                </button>
              </form>
              <button class="post__btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="11.052" height="11.056" viewBox="0 0 11.052 11.056"><path d="M11.052,5.525,6.014,0V3.31H5.428A5.428,5.428,0,0,0,0,8.738v2.318L.967,10A6.939,6.939,0,0,1,6.014,7.741V11.05ZM.648,9.39V8.738a4.78,4.78,0,0,1,4.78-4.781H6.661V1.672l3.514,3.853L6.661,9.378V7.093H6.08A7.588,7.588,0,0,0,.648,9.39Zm0,0"/></svg>
                Поделиться
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Lingallery from 'lingallery';
export default {
  components:{
    Lingallery
  },
  data(){
    return {
      event:null,
      galleries: [],
      currentId:null,
      coords: [42.340782,69.596329],
      placemarks: []
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
    activeTab(i){
      this.tabs.forEach((item,i) => {
        item.active = ''
      })
      this.tabs[i].active = 'active'
    },
    async addSave(){
      // console.log(this.form)
      try {
        this.$toast.show('Updating in...')
        await this.$axios.$post("/cabinet/add-save", this.form).then((response) => {
          this.$toast.success('Успешно добавлен')
          this.saveColor = response
          // window.location.reload()
        }).catch(({response}) => {
          if (response.status === 401){
            window.location.assign('/login')
          }
          // this.errors = response.data.errors
        })
      } catch (e) {
        this.$toast.error('Error')
        console.log(e)
      }
    }
  },
  async asyncData({$axios,route,redirect,store}) {
    let event;
    let galleries = [];
    let placemarks = [];
    let saveColor = '';
    let form = {}
    await $axios.$get("/event/"+route.params.alias)
      .then(e => {
        if (Object.keys(e).length === 0) throw({ statusCode: 404, message: 'Event not found' })
        else {
          event = e;
          form.event_id = event.id
          if (store.$auth.$state.loggedIn){
            form.user_id = store.$auth.$state.user.user.id
            if (event.savings.length>0){
              event.savings.forEach((item,i) => {
                if (item.user_id == store.$auth.$state.user.user.id){
                  saveColor = 'color--red'
                } else {
                  saveColor = ''
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
      }).catch(e => {
        console.log(e)
      })

    if(event.galleries.length > 0){
      for(let i = 0; i < event.galleries.length; i++){
        galleries.push(
          {id:event.galleries[i].id,src:store.state.image.image +event.galleries[i].image , thumbnail:store.state.image.image + event.galleries[i].image}
        )
      }
    }
    galleries.push({
      id:100, src:store.state.image.image +event.image, thumbnail:store.state.image.image +event.image
    })
    return {event,galleries,placemarks, form, saveColor};
  },
  mounted() {
    // console.log(this.galleries)
  }
}
</script>

<style scoped>

</style>

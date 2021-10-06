<template>
  <section class="routes-item">
    <div class="container">
      <ul class="crumbs">
        <li class="crumbs__item">
          <NuxtLink to="/">{{ $t('main') }}</NuxtLink>
        </li>
        <li class="crumbs__item">
          <NuxtLink to="/routes">{{ $t('routes_title') }}</NuxtLink>
        </li>
        <li class="crumbs__item current">
          <NuxtLink to="#">{{ Route['title_'+$i18n.locale] }}</NuxtLink>
        </li>
      </ul>
      <h3 class="routes-item__title">
        {{ Route['title_'+$i18n.locale] }}
      </h3>
      <div class="routes-item__about">
        <div class="routes-item__time">
          {{ $t('duration') }}: <span>{{ Route.time }}</span>
        </div>
        <div class="routes-item__distance">
          {{ $t('distance') }}: <span>{{ Route.distance }}</span>
        </div>
        <div class="routes-item__points" v-if="Route.places.length>0">
          {{ $t('count_of_points') }}: <span>{{Route.places.length}}</span>
        </div>
      </div>
      <div class="routes-item__wrapper">
        <div class="routes-item__info-content">
          <div class="routes-item__img" :style="'background-image: url('+getImage(Route.image)+');'"></div>
          <div class="routes-item__guide" v-if="Route.organizators.length>0">
            {{ $t('guides') }}:
            <NuxtLink class="white--text" :to="'/guides/'+organizator.alias" v-for="(organizator,i) in Route.organizators" :key="i">{{organizator['title_'+$i18n.locale]}}</NuxtLink>
          </div>
          <p class="routes-item__text" v-html="Route['description_'+$i18n.locale]"></p>
          <div class="routes-points" v-if="Route.places.length>0" id="pointNav">
            <div class="routes-points__item" v-for="(item,i) in Route.places" :key="i" :id="'pointId' + item.id">
              <div class="routes-points__item-content my-10">
                <h4 class="routes-points__item-name">
                  {{ item['title_'+$i18n.locale] }}
                </h4>
                <lingallery :iid.sync="currentId" class="gallery-image" :items=galleries[item.id] />
                <div class="routes-points__item-text pa-4" v-html="item['description_'+$i18n.locale]"></div>
                <div class="routes-points__item-info">
                  <p><span>{{ $t('address') }}: </span>{{item.address}}</p>
                  <p><span>{{ $t('operating_mode') }}: </span>с понедельника по суботу с 9:00 до 18:00.</p>
                  <p>
                    <span>{{ $t('phones_for_contact') }}: </span>
                    <span>
                      <a class="text--info" v-for="phone in item.phone" :href="'tel:'+phone">{{phone}}
                      </a>
                    </span>

                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="post__btns mt-3">
            <form @submit.prevent="addSave(form,saveColor)">
              <input v-model="form.route_id" type="hidden">
              <button type="submit" class="post__btn" :class="this.saveColor">
                <svg data-name="Livello 1" id="Livello_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title/><path d="M98.78,0H29.22A7.21,7.21,0,0,0,22,7.19V120.8a7.08,7.08,0,0,0,4.42,6.63,7.22,7.22,0,0,0,7.87-1.5L63.14,97.59a1.23,1.23,0,0,1,1.72,0l28.86,28.33a7.21,7.21,0,0,0,7.87,1.5A7.08,7.08,0,0,0,106,120.8V7.19A7.21,7.21,0,0,0,98.78,0ZM100,120.8a1.14,1.14,0,0,1-.74,1.09,1.17,1.17,0,0,1-1.34-.25h0L69.06,93.31a7.26,7.26,0,0,0-10.13,0L30.08,121.64a1.18,1.18,0,0,1-1.34.25A1.14,1.14,0,0,1,28,120.8V7.19A1.21,1.21,0,0,1,29.22,6H98.78A1.21,1.21,0,0,1,100,7.19Z"/></svg>
                {{ $t(btn_save) }}
              </button>
            </form>
            <yandex-share :services="['vkontakte','facebook','twitter','whatsapp','telegram']" counter />

          </div>
          <div class="load-more">
            <NuxtLink to="/routes">{{ $t('load_routes') }}</NuxtLink>
          </div>
        </div>
        <div class="routes-item__map-inner">
          <div class="routes-item__map">
            <yandex-map :coords="coords"
                        zoom="12"
                        style="width: 100%;height: 400px;"
                        map-type="map"
            >
              <div v-for="(point,i) in points">
                <div v-for="(item,i) in point.placemarks">
                  <ymap-marker
                    :key="i"
                    :marker-id="i"
                    marker-type="placemark"
                    :coords="item"
                    :hint-content="point.val['title_'+$i18n.locale]"
                    :balloon="{header: point.val['title_'+$i18n.locale]}"
                    :icon="{color: 'green', glyph: 'circle'}"
                    :properties="{iconContent: point.num}"
                    cluster-name="1"
                  ></ymap-marker>
                </div>
              </div>
            </yandex-map>
          </div>
          <ul class="routes-item__map-points" v-if="points">
            <li :class="'text-center routes-item__map-point '+point.active" v-for="(point,i) in points" :key="i" @click="activeTab(i)">
              <a :href="'#pointId' + point['val'].id"><span>{{point.val['title_'+$i18n.locale]}}</span></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Lingallery from "lingallery";

export default {
  components:{
    Lingallery
  },
  data(){
    return {
      route:null,
      galleries: [],
      currentId:null,
      coords: [42.340782,69.596329],
      placemarks: []
    }
  },
  methods:{
    activeTab(i){
      // console.log(this.points[i].active)
      for (var key in this.points){
        this.points[key].active = ''
      }
      this.points[i].active = 'active'
      // console.log(this.points[i].active)
    }
  },
  async asyncData({$axios,route,redirect,store}) {
    let Route;
    let galleries = {};
    let placemarks = [];
    const points = {};
    let form = {};
    let saveColor = ''
    let btn_save = 'save'
    await $axios.$get("/route/"+route.params.alias)
      .then(e => {
        if (Object.keys(e).length === 0) throw({ statusCode: 404, message: 'Event not found' })
        else {
          Route = e;
          form.route_id = Route.id
          if (store.$auth.$state.loggedIn){
            form.user_id = store.$auth.$state.user.user.id
            if (Route.savings.length>0){
              Route.savings.forEach((item,i) => {
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

          if (Route.route_place.length > 0){
            Route.route_place.forEach((value,i) => {
              points[value.id] = {id:value.id, placemarks: JSON.parse(value.place.address_link), num: value.number, val: value.place, active: ''};
              points[value.id].placemarks.forEach((item, i) => {
                points[value.id].placemarks[i] = [item.lat, item.lng];
              })
            })
          } else {
            if (Route.address_link){
              // console.log(Route.address_link);
              let TIMA = JSON.parse(Route.address_link);
              points[0] = {id:0, placemarks: TIMA, num: 1, val: Route, active: ''};
              TIMA.forEach((item, i) => {
                points[0].placemarks[i] = [item.lat, item.lng];
              })
              // console.log(TIMA);
            }
          }


        }
      }).catch(e => {
        console.log(e)
      })

    if(Route.places.length > 0){
      Route.places.forEach((item,i) => {
        galleries[item.id] = [];
        for(let i = 0; i < item.galleries.length; i++){
          galleries[item.id].push(
            {id:item.galleries[i].id,src:store.state.image.image +item.galleries[i].image , thumbnail:store.state.image.image + item.galleries[i].image}
          )
        }
        galleries[item.id].push({
          id:100, src:store.state.image.image +item.image, thumbnail:store.state.image.image +item.image
        })
      })

    }
    // console.log(placemarks)
    return {Route,galleries,placemarks,points,form,saveColor,btn_save};
  },
  mounted() {
    // console.log(this.$route)
  }

}
</script>

<style scoped lang="scss">
html {
  scroll-behavior: smooth;
}
.gallery-image{
  margin-top: 20px;
  margin-bottom: 20px;
  @media screen and (max-width: 1000px){
    width: 400px;
  }

  @media screen and (max-width: 400px) {
    width: 100vw;
    height: auto;
  }
}
.routes-item__map-point span::before{
  top: 10%!important;
}
</style>

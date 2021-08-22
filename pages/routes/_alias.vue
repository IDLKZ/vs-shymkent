<template>
  <section class="routes-item">
    <div class="container">
      <ul class="crumbs">
        <li class="crumbs__item">
          <NuxtLink to="/">Главная</NuxtLink>
        </li>
        <li class="crumbs__item">
          <NuxtLink to="/routes">Маршруты</NuxtLink>
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
          Длительность: <span>{{ Route.time }}</span>
        </div>
        <div class="routes-item__distance">
          Протяженность: <span>{{ Route.distance }}</span>
        </div>
        <div class="routes-item__points" v-if="Route.route_points.length>0">
          Количество точек: <span>{{Route.route_points.length}}</span>
        </div>
      </div>
      <div class="routes-item__wrapper">
        <div class="routes-item__info-content">
          <div class="routes-item__img" :style="'background-image: url('+getImages(Route.image)+');'"></div>
          <div class="routes-item__guide" v-if="Route.organizators.length>0">
            Гиды:
            <NuxtLink :to="'/guides/'+organizator.alias" v-for="(organizator,i) in Route.organizators" :key="i">{{organizator['title_'+$i18n.locale]}}</NuxtLink>
          </div>
          <p class="routes-item__text" v-html="Route['description_'+$i18n.locale]"></p>
          <div class="routes-points" v-if="Route.route_points.length>0" id="pointNav">
            <div class="routes-points__item" v-for="(item,i) in Route.route_points" :key="i" :id="'point'+item.id">
              <div class="routes-points__item-content">
                <h4 class="routes-points__item-name">
                  {{ item['title_'+$i18n.locale] }}
                </h4>
<!--                <a href="#" class="routes-points__item-link">-->
<!--                  Обзорное место-->
<!--                </a>-->
                <lingallery :iid.sync="currentId" :width="400" :height="300" :items=galleries[item.id] />
                <div class="routes-points__item-text" v-html="item['description_'+$i18n.locale]"></div>
                <div class="routes-points__item-info">
                  <p><span>Адрес: </span>{{item.address}}</p>
                  <p><span>Режим работы: </span>с понедельника по суботу с 9:00 до 18:00.</p>
                  <p>
                    <span>Телефоны для связи: </span>
                    <span>
                      <a :href="'tel:'+phone" v-for="(phone,i) in item.phone" :key="i">{{phone}} .,  </a>
                    </span>

                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="post__btns">
            <form @submit.prevent="addSave">
              <input v-model="form.route_id" type="hidden">
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
          <div class="load-more">
            <NuxtLink to="/routes">Перейти ко всем маршрутам</NuxtLink>
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
                    :properties="{iconContent: point.val.number}"
                    cluster-name="1"
                  ></ymap-marker>
                </div>
              </div>
            </yandex-map>
          </div>
          <ul class="routes-item__map-points">
            <li :class="'routes-item__map-point '+point.active" v-for="(point,i) in points" :key="i" @click="activeTab(i)">
              <NuxtLink :to="{path: '/', hash: 'point'+point.id}"><span>{{point.val['title_'+$i18n.locale]}}</span></NuxtLink>
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
    getImages(data){
      return this.$store.state.image.image + data ;
    },
    truncate(string = '', value) {
      return string.substring(0, value) + '…';
    },
    activeTab(i){
      // console.log(this.points[i].active)
      for (var key in this.points){
        this.points[key].active = ''
      }
      this.points[i].active = 'active'
      // console.log(this.points[i].active)
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
    let Route;
    let galleries = {};
    let placemarks = [];
    const points = {};
    let form = {};
    let saveColor = '';
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
                } else {
                  saveColor = ''
                }
              })
            }
          }

          if (Route.route_points.length > 0){
            Route.route_points.forEach((value,i) => {
              points[value.id] = {id:value.id, placemarks: JSON.parse(value.address_link), val: value, active: ''};
              points[value.id].placemarks.forEach((item, i) => {
                points[value.id].placemarks[i] = [item.lat, item.lng];
              })
            })
          } else {
            let TIMA = JSON.parse(Route.address_link)
            points[0] = {id:0, placemarks: TIMA, val: {number: 1}, active: ''};
            TIMA.forEach((item, i) => {
              points[0].placemarks[i] = [item.lat, item.lng];
            })
          }

          // console.log(placemarks)
        }
      }).catch(e => {
        console.log(e)
      })

    if(Route.route_points.length > 0){
      Route.route_points.forEach((item,i) => {
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
    return {Route,galleries,placemarks,points,form,saveColor};
  },
  mounted() {
    // console.log(this.$route)
  }

}
</script>

<style scoped>

</style>

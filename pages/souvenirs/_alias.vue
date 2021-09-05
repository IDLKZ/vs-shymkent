<template>
  <div>
    <section class="souvenirs-item">
      <div class="container">
        <ul class="crumbs">
          <li class="crumbs__item">
            <NuxtLink to="/">{{$t('main')}}</NuxtLink>
          </li>
          <li class="crumbs__item">
            <NuxtLink to="/souvenirs">{{$t('souvenirs')}}</NuxtLink>
          </li>
          <li class="crumbs__item current">
            <NuxtLink to="#">{{souvenir['title_'+$i18n.locale]}}</NuxtLink>
          </li>
        </ul>
        <h2 class="souvenirs-item__name">
          {{souvenir['title_'+$i18n.locale]}}
        </h2>
        <div class="souvenirs-item__wrapper">
          <div class="souvenirs-item__img" :style="'background-image: url('+getImage(souvenir.image)+');'"></div>
          <div class="souvenirs-item__content">
            <div class="souvenirs-item__content-info">
              <div class="souvenirs-item__content-info-item">
                <h4 class="souvenirs-item__content-info-title">
                  «{{ souvenir['title_'+$i18n.locale] }}»
                </h4>
                <div class="souvenirs-item__content-info-text" v-html="souvenir['description_'+$i18n.locale]"></div>
              </div>
              <div class="souvenirs-item__content-info-item">
                <div class="souvenirs-item__content-info-price">
                  {{ souvenir.price }} тг.
                </div>
                <v-dialog
                  v-if="souvenir.eventum"
                  v-model="dialog"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <button class="souvenirs__item-btn"
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
                      <iframe :src="getEventum(souvenir.eventum)" style="height:573px;width:100%;"
                              frameborder="0"></iframe>
                    </v-card-text>

                    <v-divider></v-divider>

                  </v-card>
                </v-dialog>
              </div>
              <div class="post__btns">
                <form @submit.prevent="addSave(form,saveColor)">
                  <input v-model="form.souvenir_id" type="hidden">
                  <button type="submit" class="post__btn" :class="this.saveColor">
                    <svg data-name="Livello 1" id="Livello_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title/><path d="M98.78,0H29.22A7.21,7.21,0,0,0,22,7.19V120.8a7.08,7.08,0,0,0,4.42,6.63,7.22,7.22,0,0,0,7.87-1.5L63.14,97.59a1.23,1.23,0,0,1,1.72,0l28.86,28.33a7.21,7.21,0,0,0,7.87,1.5A7.08,7.08,0,0,0,106,120.8V7.19A7.21,7.21,0,0,0,98.78,0ZM100,120.8a1.14,1.14,0,0,1-.74,1.09,1.17,1.17,0,0,1-1.34-.25h0L69.06,93.31a7.26,7.26,0,0,0-10.13,0L30.08,121.64a1.18,1.18,0,0,1-1.34.25A1.14,1.14,0,0,1,28,120.8V7.19A1.21,1.21,0,0,1,29.22,6H98.78A1.21,1.21,0,0,1,100,7.19Z"/></svg>
                    {{$t(btn_save)}}
                  </button>
                </form>
                <yandex-share :services="['vkontakte','facebook','twitter','whatsapp','telegram']" counter />
                <!--                <button class="post__btn">-->
                <!--                  <svg xmlns="http://www.w3.org/2000/svg" width="11.052" height="11.056" viewBox="0 0 11.052 11.056"><path d="M11.052,5.525,6.014,0V3.31H5.428A5.428,5.428,0,0,0,0,8.738v2.318L.967,10A6.939,6.939,0,0,1,6.014,7.741V11.05ZM.648,9.39V8.738a4.78,4.78,0,0,1,4.78-4.781H6.661V1.672l3.514,3.853L6.661,9.378V7.093H6.08A7.588,7.588,0,0,0,.648,9.39Zm0,0"/></svg>-->
                <!--                  Поделиться-->
                <!--                </button>-->
              </div>
            </div>
            <div class="souvenirs-item__content-aside">
              <h5 class="souvenirs-item__aside-title">
                {{ $t('author') }}
              </h5>
              <div class="souvenirs-item__aside-text">
                <v-avatar>
                  <v-img :src="getImage(souvenir.shop.user.image)"></v-img>
                </v-avatar>
                <NuxtLink v-if="souvenir.shop.role_id == 6" :to="'/craft/' + souvenir.shop.alias">{{ souvenir.shop.user.name }}</NuxtLink>
                <NuxtLink v-if="souvenir.shop.role_id == 7" :to="'/craftman/' + souvenir.shop.alias">{{ souvenir.shop.user.name }}</NuxtLink>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="souvenirs">
      <div class="container">
        <div class="top-content">
          <div class="top-content__wrapper top-content__wrapper-5">
            <h2 class="top-content__title">
              {{$t('souvenirs')}}
            </h2>
            <p class="top-content__text">
              {{$t('craft_subtitle')}}
            </p>
          </div>
          <div class="top-content__line"></div>
        </div>
        <div class="souvenirs__items-inner">
          <div class="souvenirs__item" v-for="(item,i) in souvenirs" :key="i">
            <NuxtLink :to="'/souvenirs/'+item.alias">
              <div class="souvenirs__item-img" :style="'background-image: url('+getImage(item.image)+');'"></div>
            </NuxtLink>
            <div class="souvenirs__item-content">
              <h4 class="souvenirs__item-title">
                <NuxtLink :to="'/souvenirs/'+item.alias">{{ item['title_'+$i18n.locale] }}</NuxtLink>
              </h4>
              <p class="souvenirs__item-text" v-html="truncateTitle(item['description_'+$i18n.locale],50)"></p>
              <div class="souvenirs__item-price-wrapper">
                <NuxtLink class="souvenirs__item-btn" style="color: white!important;" :to="'/souvenirs/'+item.alias"><span>{{ $t('more_info') }}</span></NuxtLink>
                <div class="souvenirs__item-price">
                  {{ item.price }} ТГ
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="load-more">
          <NuxtLink to="/souvenirs">{{$t('load_souvenirs')}}</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data(){
    return {
      souvenir:null,
      dialog: false
    }
  },
  async asyncData({$axios,route,redirect,store}) {
    let souvenir;
    let souvenirs = [];
    let form = {};
    let saveColor = ''
    let btn_save = ''
    await $axios.$get("/souvenir/"+route.params.alias)
      .then(e => {
        if (Object.keys(e).length === 0) throw({ statusCode: 404, message: 'Event not found' })
        else {
          souvenir = e[0];
          souvenirs = e[1];
          form.souvenir_id = souvenir.id
          if (store.$auth.$state.loggedIn){
            form.user_id = store.$auth.$state.user.user.id
            if (souvenir.savings.length>0){
              souvenir.savings.forEach((item,i) => {
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
        }
      }).catch(e => {
        console.log(e)
      })
    return {souvenir,souvenirs,form,saveColor,btn_save};
  }
}
</script>

<style scoped>

</style>

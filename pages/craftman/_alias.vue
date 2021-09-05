<template>
  <div>
    <section class="souvenirs-item">
      <div class="container">
        <ul class="crumbs">
          <li class="crumbs__item">
            <NuxtLink to="/">{{ $t('main') }}</NuxtLink>
          </li>
          <li class="crumbs__item">
            <NuxtLink to="/souvenirs">{{ $t('souvenirs') }}</NuxtLink>
          </li>
          <li class="crumbs__item">
            <NuxtLink to="/craftman">{{ $t('craftman') }}</NuxtLink>
          </li>
          <li class="crumbs__item current">
            <NuxtLink to="#">{{ craftman.user.name }}</NuxtLink>
          </li>
        </ul>
        <h2 class="souvenirs-item__name">
          {{ craftman.user.name }}
        </h2>
        <div class="souvenirs-item__wrapper">
          <div class="souvenirs-item__img" :style="'background-image: url('+getImage(craftman.image)+');'"></div>
          <div class="souvenirs-item__content">
            <div class="souvenirs-item__content-info souvenirs-item__content-info--move">
              <div class="souvenirs-item__content-info-item">
                <h4 class="souvenirs-item__content-info-title">
                  {{ $t('personal_info') }}
                </h4>
                <div class="souvenirs-item__content-info-text" v-html="craftman['description_'+$i18n.locale]"></div>
              </div>
              <div class="tour-agency__content-info-item">
                <h4 class="tour-agency__content-info-title">
                  {{ $t('phones_for_contact') }}
                </h4>
                <ul class="tour-agency__contact">
                  <li>
                    <div class="tour-agency__contact-title">
                      {{ $t('address') }}:
                    </div>
                    <div class="tour-agency__contact-text">
                      {{ craftman.address }}
                    </div>
                  </li>
                  <li>
                    <div class="tour-agency__contact-title">
                      {{ $t('operating_mode') }}:
                    </div>
                    <div class="calendar-item__contact-text">
                      <div v-if="craftman.workdays.length>0">
                        <div v-for="(item,i) in craftman.workdays" :key="i">
                          {{ item.date_start }} - {{ item.date_end }} / {{ item.time_start }} - {{ item.time_end }}
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="tour-agency__contact-title">
                      {{ $t('emails') }}:
                    </div>
                    <div class="tour-agency__contact-text">
                                        <span>
                                            <a :href="'mailto:' +  craftman.user.email ">{{ craftman.user.email }}</a>
                                        </span>
                    </div>
                  </li>
                  <li>
                    <div class="tour-agency__contact-title">
                      {{ $t('phone') }}:
                    </div>
                    <div class="tour-agency__contact-text" v-for="(phone,i) in craftman.phone" :key="i">
                      {{phone}} .,
                    </div>
                  </li>
                </ul>
              </div>
              <div class="post__btns">
                <form @submit.prevent="addSave(form,saveColor)">
                  <input v-model="form.shop_id" type="hidden">
                  <button type="submit" class="post__btn" :class="this.saveColor">
                    <svg data-name="Livello 1" id="Livello_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title/><path d="M98.78,0H29.22A7.21,7.21,0,0,0,22,7.19V120.8a7.08,7.08,0,0,0,4.42,6.63,7.22,7.22,0,0,0,7.87-1.5L63.14,97.59a1.23,1.23,0,0,1,1.72,0l28.86,28.33a7.21,7.21,0,0,0,7.87,1.5A7.08,7.08,0,0,0,106,120.8V7.19A7.21,7.21,0,0,0,98.78,0ZM100,120.8a1.14,1.14,0,0,1-.74,1.09,1.17,1.17,0,0,1-1.34-.25h0L69.06,93.31a7.26,7.26,0,0,0-10.13,0L30.08,121.64a1.18,1.18,0,0,1-1.34.25A1.14,1.14,0,0,1,28,120.8V7.19A1.21,1.21,0,0,1,29.22,6H98.78A1.21,1.21,0,0,1,100,7.19Z"/></svg>
                    {{ $t(btn_save) }}
                  </button>
                </form>
                <yandex-share :services="['vkontakte','facebook','twitter','whatsapp','telegram']" counter />
<!--                <button class="post__btn">-->
<!--                  <svg xmlns="http://www.w3.org/2000/svg" width="11.052" height="11.056" viewBox="0 0 11.052 11.056"><path d="M11.052,5.525,6.014,0V3.31H5.428A5.428,5.428,0,0,0,0,8.738v2.318L.967,10A6.939,6.939,0,0,1,6.014,7.741V11.05ZM.648,9.39V8.738a4.78,4.78,0,0,1,4.78-4.781H6.661V1.672l3.514,3.853L6.661,9.378V7.093H6.08A7.588,7.588,0,0,0,.648,9.39Zm0,0"/></svg>-->
<!--                  Поделиться-->
<!--                </button>-->
              </div>
            </div>
            <div class="souvenirs-item__content-aside souvenirs-item__content-aside--move">
              <div class="souvenirs-item__aside-item souvenirs-item__aside-item--move" v-for="rating in craftman.ratings">
                <h4 class="souvenirs-item__content-feedback-title" >
                  Оценка в {{rating.title}}
                </h4>
                <div class="guide-item__rating-inner">
                  <div class="guide-list__item-rating">
                    <div v-for="i in 5" :class="getStarClass(i,rating['rating'])">
                      <svg height="511pt" viewBox="0 -10 511.98685 511" width="511pt" xmlns="http://www.w3.org/2000/svg"><path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"/></svg>
                    </div>
                  </div>
                  <div class="guide-item__contact-count">
                    {{rating.rating}}
                  </div>
                </div>
              </div>

              <h5 class="souvenirs-item__aside-title">
                {{ $t('see_also') }}
              </h5>
              <div class="souvenirs-item__aside-items">
                <div class="souvenirs-item__aside-item" v-for="craftman in craftmans" :key="craftman.id">
                  <div class="souvenirs-item__aside-img"
                       :style="'background-image: url('+getImage(craftman.image)+');'"
                  ></div>
                  <NuxtLink v-if="craftman.role_id == 7"  :to="'/craftman/' + craftman.alias" class="souvenirs-item__aside-item-title">
                    {{ craftman["title_" + $i18n.locale] }}
                  </NuxtLink>
                  <NuxtLink v-else :to="'/craft/' + craftman.alias" class="souvenirs-item__aside-item-title">
                    {{ craftman["title_" + $i18n.locale] }}
                  </NuxtLink>
                  <div class="souvenirs-item__aside-count">
                    {{ $t('products') }}: <span>
                    {{craftman.souvenirs_count}}
                  </span>
                  </div>
                </div>

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
              {{ $t('craftman_title') }}
            </h2>
            <p class="top-content__text">
              {{$t('craftman_subtitle')}}
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
                <button class="souvenirs__item-btn popup-modal" v-if="item.eventum">
                  <span>{{ $t('buy') }}</span>
                </button>
                <div class="souvenirs__item-price">
                  {{ item.price }} ТГ
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="load-more">
          <NuxtLink to="/craftman">{{ $t('load_craftman') }}</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data(){
    return {
      craftman:null,
    }
  },
  async asyncData({$axios,route,redirect,store}) {
    let craftman;
    let craftmans = [];
    let souvenirs = [];
    let form = {};
    let saveColor = ''
    let btn_save = ''
    await $axios.$get("/shop/"+route.params.alias)
      .then(e => {
        if (Object.keys(e).length === 0) throw({ statusCode: 404, message: 'Event not found' })
        else {
          craftman = e
          souvenirs = e.souvenirs
          form.shop_id = craftman.id
          if (store.$auth.$state.loggedIn){
            form.user_id = store.$auth.$state.user.user.id
            if (craftman.savings.length>0){
              craftman.savings.forEach((item,i) => {
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
    await $axios.$get("/getRandomCraftmans?count=2").then(e=>{craftmans = e})
    return {craftman,souvenirs,form,saveColor,btn_save,craftmans};
  }
}
</script>

<style scoped>

</style>

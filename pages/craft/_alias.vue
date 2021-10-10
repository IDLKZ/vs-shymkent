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
            <NuxtLink to="/craft">{{ $t('craft') }}</NuxtLink>
          </li>
          <li class="crumbs__item current">
            <NuxtLink to="#">{{ craft['title_'+$i18n.locale] }}</NuxtLink>
          </li>
        </ul>
        <h2 class="souvenirs-item__name">
          {{ craft['title_'+$i18n.locale] }}
        </h2>
        <div class="souvenirs-item__wrapper">
          <div class="souvenirs-item__img" :style="'background-image: url('+getImage(craft.image)+');'"></div>
          <div class="souvenirs-item__content">
            <div class="souvenirs-item__content-info souvenirs-item__content-info--move">
              <div class="souvenirs-item__content-info-item">
                <h4 class="souvenirs-item__content-info-title">
                  {{ $t('about_company') }}
                </h4>
                <div class="souvenirs-item__content-info-text" v-html="craft['description_'+$i18n.locale]"></div>
              </div>
              <div class="tour-agency__content-info-item">
                <h4 class="tour-agency__content-info-title">
                  {{ $t('phones_for_contact') }}
                </h4>
                <ul class="tour-agency__contact">
                  <li>
                    <div class="tour-agency__contact-title">
                      {{ $t('website') }}:
                    </div>
                    <div class="tour-agency__contact-text">
                      <a target="_blank" :href="site" v-for="(site,i) in craft.sites" :key="i">{{ site }}</a>
                    </div>
                  </li>
                  <li>
                    <div class="tour-agency__contact-title">
                      {{ $t('operating_mode') }}:
                    </div>
                    <div class="calendar-item__contact-text">
                      <div v-if="craft.workdays.length>0">
                        <div v-for="(item,i) in craft.workdays" :key="i">
                          {{ item.date_start }} - {{ item.date_end }} / {{ item.time_start }} - {{ item.time_end }}
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="tour-agency__contact-title">
                      {{ $t('phone') }}:
                    </div>
                    <div class="tour-agency__contact-text" v-for="(phone,i) in craft.phone" :key="i">
                      {{ phone }}
                    </div>
                  </li>
                  <li>
                    <div class="tour-agency__contact-title">
                      {{ $t('address') }}:
                    </div>
                    <div class="tour-agency__contact-text">
                      {{ craft.address }}
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

              </div>
            </div>
            <div class="souvenirs-item__content-aside souvenirs-item__content-aside--move">
              <div class="souvenirs-item__aside-item souvenirs-item__aside-item--move" v-for="rating in craft.ratings">
                <h4 class="souvenirs-item__content-feedback-title" >
                  Оценка в {{rating.title}}
                </h4>
                <div class="guide-item__rating-inner">
                  <div class="guide-list__item-rating">
                    <star-rating :rating="rating.rating" star-size="16" :read-only="true" :round-start-rating="false" :show-rating="true"></star-rating>
                  </div>
                </div>
              </div>
              <h5 class="souvenirs-item__aside-title" v-if="craftmans.length >0">
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
              {{$t('craft_title')}}
            </h2>
            <p class="top-content__text">
              {{$t('craft_subtitle') }}
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
          <NuxtLink to="/craftman">{{ $t('load_craft') }}</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data(){
    return {
      craft:null,
    }
  },
  methods:{
    getStarClass(item,max){
      let className =  'guide-list__item-rating-star';
      for (let i = 1; i <= max; i++){
        if(item <= max){
          className = 'guide-list__item-rating-star active';
        }
      }
      return className;
    }
  },
  async asyncData({$axios,route,redirect,store}) {
    let craft;
    let souvenirs = [];
    let craftmans = [];
    let form = {};
    let saveColor = ''
    let btn_save = 'save'
    await $axios.$get("/shop/"+route.params.alias)
      .then(e => {
        if (Object.keys(e).length === 0) throw({ statusCode: 404, message: 'Event not found' })
        else {
          craft = e
          souvenirs = e.souvenirs
          form.shop_id = craft.id
          if (store.$auth.$state.loggedIn){
            form.user_id = store.$auth.$state.user.user.id
            if (craft.savings.length>0){
              craft.savings.forEach((item,i) => {
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
          // console.log(placemarks)
        }
      }).catch(e => {
        console.log(e)
      })
    await $axios.$get("/getRandomCraftmans?count=2&craft_id="+craft.id).then(e=>{craftmans = e})

    return {craft,souvenirs,form,saveColor,btn_save,craftmans};
  }
}
</script>

<style scoped>

</style>

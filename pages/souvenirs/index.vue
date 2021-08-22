<template>
  <section class="souvenirs-page">
    <div class="container">
      <ul class="crumbs">
        <li class="crumbs__item">
          <NuxtLink to="/">Главная</NuxtLink>
        </li>
        <li class="crumbs__item current">
          <NuxtLink to="#">Сувениры</NuxtLink>
        </li>
      </ul>
      <div class="top-content">
        <div class="top-content__wrapper top-content__wrapper-5">
          <h2 class="top-content__title">
            Сувениры
          </h2>
          <p class="top-content__text">
            Оставьте себе на память кусочек Шымкента
          </p>
        </div>
        <div class="top-content__line"></div>
      </div>
      <div class="souvenirs-page__tabs">
        <ul class="souvenirs-page__tabs-caption">
          <li v-for="tab in tabs" :key="tab.id" :class="tab.active">
            <NuxtLink :style="'color:'+tab.color" :to="tab.link">{{tab.title}}</NuxtLink>
          </li>
        </ul>
        <div class="souvenirs-page__tabs-content active">
          <div class="souvenirs-page__wrapper">
            <div class="souvenirs-page__categories-inner">
              <button class="open-filter">
                <span>Фильтр</span>
              </button>
              <div class="souvenirs-page__list-categories">
                <div class="souvenirs-page__list-categories-container">
                  <h4 class="souvenirs-page__list-categories-title">
                    Продавец
                  </h4>
                  <div class="souvenirs-page__list-categories-item">
                    <input type="checkbox" id="route-tab2-1"> <label for="route-tab2-1">Все</label>
                  </div>
                  <div class="souvenirs-page__list-categories-item">
                    <input type="checkbox" id="route-tab2-2"> <label for="route-tab2-2">Ремесленники</label>
                  </div>
                  <div class="souvenirs-page__list-categories-item">
                    <input type="checkbox" id="route-tab2-3"> <label for="route-tab2-3">Сувенирные магазины</label>
                  </div>
                </div>
                <div class="souvenirs-page__list-categories-container">
                  <h4 class="routes-page__list-categories-title">
                    Стоимость
                  </h4>
                  <div class="souvenirs-page__list-categories-item">
                    <input type="checkbox" id="route-tab2-4"> <label for="route-tab2-4">Все</label>
                  </div>
                  <div class="souvenirs-page__list-categories-item">
                    <input type="checkbox" id="route-tab2-5"> <label for="route-tab2-5">До 5 тыс</label>
                  </div>
                  <div class="souvenirs-page__list-categories-item">
                    <input type="checkbox" id="route-tab2-6"> <label for="route-tab2-6">От 5 до 50 тыс</label>
                  </div>
                  <div class="souvenirs-page__list-categories-item">
                    <input type="checkbox" id="route-tab2-7"> <label for="route-tab2-7">От 50 тыс и выше</label>
                  </div>
                </div>
              </div>
              <button class="do-filter">
                Применить фильтр
              </button>
            </div>
            <div class="souvenirs-page__items-wrapper">
              <div class="souvenirs__items-inner">
                <div class="souvenirs__item" v-for="(item,i) in souvenirs.data" :key="i">
                  <NuxtLink :to="'/souvenirs/'+item.alias">
                    <div class="souvenirs__item-img" :style="'background-image: url('+getImages(item.image)+');'"></div>
                  </NuxtLink>
                    <div class="souvenirs__item-content">
                      <h4 class="souvenirs__item-title">
                        <NuxtLink :to="'/souvenirs/'+item.alias">{{ item['title_'+$i18n.locale] }}</NuxtLink>
                      </h4>
                      <p class="souvenirs__item-text" v-html="truncate(item['description_'+$i18n.locale],50)"></p>
                      <div class="souvenirs__item-price-wrapper">
                        <button class="souvenirs__item-btn popup-modal" v-if="item.eventum">
                          <span>Купить</span>
                        </button>
                        <div class="souvenirs__item-price">
                          {{ item.price }} ТГ
                        </div>
                      </div>
                    </div>
                </div>
              </div>
              <div class="load-more">
                <a href="#">Загрузить еще</a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: "index",
  data(){
    return {
      tabs: [
        {
          id: 0,
          title: 'Сувениры',
          link: '/souvenirs',
          active: 'active',
          color: 'white!important'
        },
        {
          id: 1,
          title: 'Ремесленники',
          link: '/craftman',
          active: '',
          color: 'black'
        },
        {
          id: 2,
          title: 'Сувенирные магазины',
          link: '/craft',
          active: '',
          color: 'black'
        },
      ]
    }
  },
  methods:{
    getImages(data){
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
    }
  },
  async asyncData({$axios}) {
    let souvenirs = [];
    try{
      await $axios.$get("/souvenirs").then((e)=>{
        souvenirs = e
      });
    }
    catch (e) {
      console.log(e);
    }
    return {souvenirs}
  },
}
</script>

<style scoped>

</style>

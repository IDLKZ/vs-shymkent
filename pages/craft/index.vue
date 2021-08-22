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
          <div class="souvenirs-page__craft-inner">
            <NuxtLink :to="'/craft/'+item.alias" class="souvenirs-page__craft-item" v-for="(item,i) in shops.data" :key="i">
              <div class="souvenirs-page__craft-img" :style="'background-image: url('+getImages(item.image)+');'"></div>
              <div class="souvenirs-page__craft-content">
                <h5 class="souvenirs-page__craft-name">
                  {{ item['title_'+$i18n.locale] }}
                </h5>
                <div class="souvenirs-page__craft-loc">
                  {{ item.address }}
                </div>
                <div class="souvenirs-page__craft-count" v-if="item.souvenirs.length>0">
                  Товаров: <span>{{item.souvenirs.length}}</span>
                </div>
                <div class="souvenirs-page__craft-count" v-else>
                  Товаров: <span>0</span>
                </div>
              </div>
            </NuxtLink>
          </div>
          <div class="load-more">
            <a href="#">Загрузить еще</a>
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
          active: '',
          color: 'black'
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
          active: 'active',
          color: 'white!important'
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
    let shops = [];
    try{
      await $axios.$get("/shops").then((e)=>{
        shops = e
      });
    }
    catch (e) {
      console.log(e);
    }
    return {shops}
  },
}
</script>

<style scoped>

</style>

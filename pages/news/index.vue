<template>
  <section class="news-list">
    <div class="container">
      <ul class="crumbs">
        <li class="crumbs__item">
          <NuxtLink to="/">Главная</NuxtLink>
        </li>
        <li class="crumbs__item current">
          <NuxtLink to="#">Новости</NuxtLink>
        </li>
      </ul>
      <div class="top-content">
        <div class="top-content__wrapper top-content__wrapper-6">
          <h2 class="top-content__title">
            Новости
          </h2>
          <p class="top-content__text">
            Что происходит в Шымкенте?
          </p>
        </div>
        <div class="top-content__line"></div>
      </div>
      <ul class="news-list__categories">
        <li class="news-list__categories-item active">
          Все
        </li>
        <template v-if="categories">
          <li class="news-list__categories-item" v-for="category in categories" :key="category.id">
            {{category['title_'+$i18n.locale]}}
          </li>
        </template>

      </ul>
      <div class="news-list__inner">
        <div class="news-list__main-news" :style="'background-image: url('+getImages(lastNew.image)+');'">
          <div class="news-list__main-news-wrapper">
            <h5 class="news-list__main-news-title">
              <NuxtLink style="color: white!important;" :to="'/news/'+lastNew.alias">{{lastNew['title_'+$i18n.locale]}}</NuxtLink>
            </h5>
            <div class="news-list__info">
              <div class="news-list__date">
                {{ lastNew.created_at }}
              </div>
              <div class="news-list__author">
                <NuxtLink style="color: white!important" to="#">{{lastNew.user.name}}</NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <div class="news-list__last-news">
          <h5 class="news-list__last-news-title">
            Последние новости
          </h5>
          <ul class="news-list__last-news-inner" v-if="hotNews.length">
            <li class="news-list__last-news-item" v-for="(hot,index) in hotNews" :key="hot.created_at">
              <h6 class="news-list__last-news-item-title">
                <NuxtLink v-text="truncateTitle(hot['title_'+$i18n.locale],50)"
                  :to="'/news/' + hot.alias"
                ></NuxtLink>
              </h6>
              <div class="news-list__last-news-item-date">
                Опубликовано: {{hot.created_at}}
              </div>
            </li>
            <a  class="news-list__last-news-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="9.318" height="4.985" viewBox="0 0 9.318 4.985"><g transform="translate(-6.4 -33.4)"><path d="M15.623,33.5a.329.329,0,0,0-.466,0l-4.094,4.1-4.1-4.1a.329.329,0,0,0-.466.466l4.326,4.326a.321.321,0,0,0,.233.1.335.335,0,0,0,.233-.1l4.326-4.326A.323.323,0,0,0,15.623,33.5Z" transform="translate(0)"/></g></svg>
            </a>
          </ul>
        </div>
      </div>
      <template v-if="news.length">
        <div class="news-list__items">
          <div class="news-list__item" v-for="(New,i) in news" :key="i">
            <NuxtLink class="popup-modal" :to="'/news/'+New.alias">
              <img class="news-list__item-img" :src="getImages(New.image)" alt="">
              <div class="news-list__item-date">
                Опубликовано: <span>{{ New.created_at }}</span>
              </div>
              <p class="news-list__item-text" v-html="truncate(New['description_'+$i18n.locale],50)"></p>
            </NuxtLink>
          </div>
        </div>
      </template>

      <div class="load-more" v-if="current_page < last_page">
        <a @click.prevent="loadMore"  href="#">Загрузить еще...</a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      categories:[],
      news:[],
      lastNew:null,
      current_page:1,
      last_page:1,
      hotNews:[],
    }
  },
  methods:{
    getImages(data){
      return this.$store.state.image.image + data ;
    },
    truncate(string, value) {
      return string.substring(0, value) + '…';
    },
    async loadMore(){
      this.current_page++
      try{
        await this.$axios.$get("/all-news?page=" + this.current_page).then((e)=>{
           this.news.push(...e[0].data);
           this.current_page = e[0].current_page;
           this.last_page = e[0].last_page;
        }).catch((e)=>{
          console.log(e);
        })
      }
      catch (e) {
        this.$toast.error("Упс произошла ошибка! Попробуйте позже");
      }



    }
  },
  async asyncData({$axios}) {
    let news,categories,hotNews = [];
    let current_page,last_page = 1;
    let lastNew = null;
    try{
      await $axios.$get("/all-news").then((e)=>{
        news = e[0].data;
        hotNews = news.slice(0,4);
        console.log(hotNews);
        lastNew = news[0];
        current_page = e[0].current_page;
        last_page = e[0].last_page;
        categories = e[1];
      }).catch((e)=>{
        console.log(e);
      });
    }
    catch (e) {
      console.log(e);
    }
    return {news,categories,lastNew,last_page,current_page,hotNews}
  },
  mounted() {
    // console.log(this.lastNew)
  }
}
</script>

<style scoped>

</style>

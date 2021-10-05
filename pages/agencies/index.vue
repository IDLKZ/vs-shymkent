<template>
  <section class="routes-page">
    <div class="container">
      <ul class="crumbs">
        <li class="crumbs__item">
          <a href="/">{{ $t('main') }}</a>
        </li>
        <li class="crumbs__item">
          <a href="#">{{ $t('routes_title') }}</a>
        </li>
        <li class="crumbs__item current">
          <a href="#">{{ $t('agencies') }}</a>
        </li>
      </ul>
      <div class="top-content">
        <div class="top-content__wrapper top-content__wrapper-4">
          <h2 class="top-content__title">
            {{ $t('routes_title') }}
          </h2>
          <p class="top-content__text">
            {{ $t('routes_subtitle') }}
          </p>
        </div>
        <div class="top-content__line"></div>
      </div>
      <div class="routes-page__tabs">
        <ul class="routes-page__tabs-caption">
          <ul class="routes-page__tabs-caption">
            <li>
              <NuxtLink to="/routes">{{$t('ready_routes')}}</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/guides">{{$t('guides')}}</NuxtLink>
            </li>
            <li class="active">
              <NuxtLink style="color:white!important;" to="/agencies">{{$t('agencies')}}</NuxtLink>
            </li>
          </ul>
        </ul>
        <div class="routes-page__tabs-content active">
          <div class="routes-page__travel-agency">
            <NuxtLink :to="'/agencies/'+agent.alias" class="routes-page__travel-agency-item" v-for="agent in agents" :key="agent.id">
              <div class="routes-page__travel-agency-img" :style="'background-image: url('+getImages(agent.image)+');'"></div>
              <div class="routes-page__travel-agency-content">
                <h5 class="routes-page__travel-agency-title">
                  {{ agent['title_'+$i18n.locale] }}
                </h5>
                <small>Оценка сервисов</small>
                <div class="guide-item__rating-inner">
                  <div class="guide-list__item-rating mb-0">
                    <div v-for="i in 5" :class="getStarClass(i,agent.ratings_avg_rating)">
                      <svg height="511pt" viewBox="0 -10 511.98685 511" width="511pt" xmlns="http://www.w3.org/2000/svg"><path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"/></svg>
                    </div>
                  </div>
                  <div class="guide-item__contact-count">
                    ({{agent.ratings_avg_rating}})
                  </div>
                </div>
                <small>Оценка Пользователей</small>
                <div class="guide-item__rating-inner mb-0">
                  <div class="guide-list__item-rating">
                    <div v-for="i in 5" :class="getStarClass(i,agent.reviews_avg_rating)">
                      <svg height="511pt" viewBox="0 -10 511.98685 511" width="511pt" xmlns="http://www.w3.org/2000/svg"><path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"/></svg>
                    </div>
                  </div>
                  <div class="guide-item__contact-count">
                    ({{agent.reviews_avg_rating}})
                  </div>
                </div>
                <div class="routes-page__employees-info">
                  <div class="routes-page__employees-info-item" v-if="agent.routes.length>0">
                    {{ $t('count_of_points') }}: <span>{{ agent.routes.length }}</span>
                  </div>
                  <div class="routes-page__employees-info-item" v-else>
                    {{ $t('count_of_points') }}: <span>{{agent.routes_count}}</span>
                  </div>
                  <div class="routes-page__employees-info-item">
                    {{ $t('reviews') }}: <span>{{agent.reviews_count}}</span>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
          <div class="load-more" v-if="current_page<last_page">
            <a @click="paginate">{{ $t('load_more') }}</a>
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
      agents:[],
      current_page:1,
      last_page:1
    }
  },
  methods:{
    getImages(data){
      return this.$store.state.image.image + data ;
    },
    truncate(string, value) {
      return string.length > value ? string.substring(0, value) + '…' : string;

    },
    activeTab(i){
      this.tabs.forEach((item,i) => {
        item.active = ''
      })
      this.tabs[i].active = 'active'
    },
    getStarClass(item,max){
      let className =  'guide-list__item-rating-star';
      for (let i = 1; i <= max; i++){
        if(item <= max){
          className = 'guide-list__item-rating-star active';
        }
      }
      return className;
    },

    async loadData(){
      try{
        await this.$axios.$get("/agencies?page=" + this.current_page).then((e)=>{
          this.current_page == 1 ? (this.agents = e.data) : (this.agents.push(...e.data));
          this.current_page = e.current_page;
          this.last_page = e.last_page;
        }).catch((e)=>{
          console.log(e);
        })
      }
      catch (e) {
        this.$toast.error("Упс произошла ошибка! Попробуйте позже");
      }
    },
    async paginate(){
      this.current_page +=1;
      await this.loadData();
    }

  },
  async asyncData({$axios}) {
    let current_page,last_page = 1;
    let agents = []
    try{
      await $axios.$get("/agencies").then((e)=>{
        agents = e.data;
        current_page = e.current_page;
        last_page = e.last_page;
      });
    }
    catch (e) {
      console.log(e);
    }
    return {agents,current_page,last_page}
  }
}
</script>

<style scoped>

</style>

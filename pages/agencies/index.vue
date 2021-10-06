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
                <small>{{$t("service_ratings")}}</small>
                <div class="guide-item__rating-inner">
                  <div class="guide-list__item-rating mb-0">
                    <star-rating :rating="agent.ratings_avg_rating" star-size="16" :read-only="true" :round-start-rating="false" :show-rating="false"></star-rating>
                  </div>
                  <div class="guide-item__contact-count">
                    ({{agent.ratings_avg_rating !== null ?agent.ratings_avg_rating.toFixed(1) : 0}})
                  </div>
                </div>
                <small>{{$t("user_ratings")}}</small>
                <div class="guide-item__rating-inner mb-0">
                  <div class="guide-list__item-rating">
                    <star-rating :rating="agent.reviews_avg_rating" star-size="16" :read-only="true" :round-start-rating="false" :show-rating="false"></star-rating>
                  </div>
                  <div class="guide-item__contact-count">
                    ({{agent.reviews_avg_rating !== null ? agent.reviews_avg_rating.toFixed(1) : 0}})
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

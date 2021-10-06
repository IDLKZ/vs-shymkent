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
          <a href="#">{{ $t('guides') }}</a>
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
            <li class="active">
              <NuxtLink style="color:white!important;" to="/guides">{{$t('guides')}}</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/agencies">{{$t('agencies')}}</NuxtLink>
            </li>
          </ul>
        </ul>
        <div class="routes-page__tabs-content active">
          <div class="routes-page__tabs-content-inner row">
            <div class="routes-page__employees-list-wrapper">
              <div class="routes-page__employees-list ">
                <NuxtLink :to="'/guides/'+guide.alias" class="routes-page__employees-list-item" v-for="guide in guides" :key="guide.id">
                  <div class="routes-page__employees-img" :style="'background-image: url('+getImage(guide.user.image)+');'"></div>
                  <div class="routes-page__employees-content">
                    <h5 class="routes-page__employees-title">
                      {{ guide.user.name }}
                    </h5>
                    <small>{{$t("service_ratings")}}</small>
                    <div class="guide-item__rating-inner">
                      <div class="guide-list__item-rating">
                        <star-rating :rating="guide.ratings_avg_rating" star-size="16" :read-only="true" :round-start-rating="false" :show-rating="false"></star-rating>
                      </div>
                      <div class="guide-item__contact-count">
                        ({{guide.ratings_avg_rating !== null ? guide.ratings_avg_rating.toFixed(1) : 0}})
                      </div>
                    </div>
                    <small>{{$t("user_ratings")}}</small>
                    <div class="guide-item__rating-inner">
                      <div class="guide-list__item-rating">
                        <star-rating :rating="guide.reviews_avg_rating" star-size="16" :read-only="true" :round-start-rating="false" :show-rating="false"></star-rating>
                      </div>
                      <div class="guide-item__contact-count">
                        ({{guide.reviews_avg_rating !== null ? guide.reviews_avg_rating.toFixed(1) : 0}})
                      </div>
                    </div>
                    <div class="routes-page__employees-lang">
                      <div class="routes-page__employees-lang-item">
                        {{ $t('languages') }}:
                      </div>
                      <div class="routes-page__employees-lang-item">
                        <span v-for="(lang,i) in guide.languages" :key="i">{{lang}}
                          {{i < guide.languages.length-1 ? "," : ""}}
                        </span>
                      </div>
                    </div>
                    <div class="routes-page__employees-info">
                      <div class="routes-page__employees-info-item">
                        {{ $t('excursions') }}: <span>{{guide.routes_count}}</span>
                      </div>
                      <div class="routes-page__employees-info-item">
                        {{ $t('reviews') }}: <span>{{guide.reviews_count}}</span>
                      </div>
                    </div>
                  </div>
                </NuxtLink>
              </div>
              <div class="load-more" v-if="current_page < last_page">
                <a @click="paginate">{{ $t('load_more') }}</a>
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
      guides:[],
      current_page:1,
      last_page:1
    }
  },
  methods:{
    truncate(string, value) {
      return string.length > value ? string.substring(0, value) + '…' : string;
    },
    activeTab(i){
      this.tabs.forEach((item,i) => {
        item.active = ''
      })
      this.tabs[i].active = 'active'
    },
    async loadData(){
      try{
        await this.$axios.$get("/guides?page=" + this.current_page).then((e)=>{
          this.current_page == 1 ? (this.guides = e.data) : (this.guides.push(...e.data));
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
    let guides = []
    try{
      await $axios.$get("/guides").then((e)=>{
        guides = e.data
        current_page = e.current_page;
        last_page =  e.last_page;
      });
    }
    catch (e) {
      console.log(e);
    }
    return {guides,current_page,last_page}
  },
  mounted() {
    // console.log(this.guides.data)
  }
}
</script>

<style scoped lang="scss">
@media screen and (min-width: 1000px){
  .routes-page{
    &__employees-list{
      grid-template-columns: 1fr 1fr 1fr!important;
    }
  }
  .routes-page__tabs-content-inner{
    grid-template-columns: 1fr!important;
  }
  .routes-page__employees-list-wrapper{
    width: 100%!important;
  }
}

</style>

<template>
  <section class="souvenirs-page">
    <div class="container">
      <ul class="crumbs">
        <li class="crumbs__item">
          <NuxtLink to="/">{{ $t('main') }}</NuxtLink>
        </li>
        <li class="crumbs__item current">
          <NuxtLink to="#">{{ $t('craftman') }}</NuxtLink>
        </li>
      </ul>
      <div class="top-content">
        <div class="top-content__wrapper top-content__wrapper-5">
          <h2 class="top-content__title">
            {{ $t('craftman') }}
          </h2>
          <p class="top-content__text">
            {{ $t('souvenirs_subtitle') }}
          </p>
        </div>
        <div class="top-content__line"></div>
      </div>
      <div class="souvenirs-page__tabs">
        <ul class="souvenirs-page__tabs-caption">
          <li>
            <NuxtLink to="/souvenirs">{{$t('souvenirs')}}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/craft">{{$t('craft')}}</NuxtLink>
          </li>
          <li class="active">
            <NuxtLink style="color:white!important;" to="/craftman">{{$t('craftman')}}</NuxtLink>
          </li>
        </ul>
        <div class="souvenirs-page__tabs-content active">
          <div class="souvenirs-page__craft-inner">
            <NuxtLink :to="'/craftman/'+item.alias" class="souvenirs-page__craft-item" v-for="(item,i) in artisans" :key="i">
              <div class="souvenirs-page__craft-img" :style="'background-image: url('+getImages(item.image)+');'"></div>
              <div class="souvenirs-page__craft-content">
                <h5 class="souvenirs-page__craft-name">
                  {{ item['title_'+$i18n.locale] }}
                </h5>
                <div class="souvenirs-page__craft-count" v-if="item.souvenirs.length>0">
                  {{ $t('products') }}: <span>{{item.souvenirs.length}}</span>
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
      artisans:[],
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
    paginate(){
      this.current_page +=1
      this.loadData();
    },
    //Загружаем новые страницы
    async loadData(){
      try{
        this.$axios.$get("/craftmans?page=" + this.current_page ).then(e=>{
          this.current_page == 1 ? (this.artisans = e.data) : (this.artisans.push(...e.data));
          this.current_page = e.current_page;
          this.last_page = e.last_page;
        }).catch(e=>{console.log(e)});
      }
      catch (e) {
        this.$toast.error("Произошла ошибка попробуйте позже");
      }

    },
  },
  async asyncData({$axios}) {
    let current_page,last_page = 1;
    let artisans = [];
    try{
      await $axios.$get("/craftmans").then((e)=>{
        artisans = e.data
        current_page = e.current_page;
        last_page = e.last_page;
      });
    }
    catch (e) {
      console.log(e);
    }
    return {artisans,current_page,last_page}
  },
}
</script>

<style lang="scss" scoped>

</style>

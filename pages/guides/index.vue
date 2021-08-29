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
          <a href="#">Готовые маршруты</a>
        </li>
      </ul>
      <div class="top-content">
        <div class="top-content__wrapper top-content__wrapper-4">
          <h2 class="top-content__title">
            Маршруты
          </h2>
          <p class="top-content__text">
            Что посетить?
          </p>
        </div>
        <div class="top-content__line"></div>
      </div>
      <div class="routes-page__tabs">
        <ul class="routes-page__tabs-caption">
          <li v-for="tab in tabs" :key="tab.id" :class="tab.active">
            <NuxtLink :style="'color:'+tab.color" :to="tab.link">{{tab.title}}</NuxtLink>
          </li>
        </ul>
        <div class="routes-page__tabs-content active">
          <div class="routes-page__tabs-content-inner row">
            <div class="routes-page__employees-list-wrapper">
              <div class="routes-page__employees-list ">
                <NuxtLink :to="'/guides/'+guide.alias" class="routes-page__employees-list-item" v-for="guide in guides" :key="guide.id">
                  <div class="routes-page__employees-img" :style="'background-image: url('+getImages(guide.user.image)+');'"></div>
                  <div class="routes-page__employees-content">
                    <h5 class="routes-page__employees-title">
                      {{ guide.user.name }}
                    </h5>
                    <div class="routes-page__employees-lang">
                      <div class="routes-page__employees-lang-item">
                        Языки:
                      </div>
                      <div class="routes-page__employees-lang-item">
                        <span v-for="(lang,i) in guide.languages" :key="i">{{lang}} , </span>
                      </div>
                    </div>
                    <div class="routes-page__employees-info">
                      <div class="routes-page__employees-info-item">
                        Экскурсий: <span>{{guide.routes_count}}</span>
                      </div>
                      <div class="routes-page__employees-info-item">
                        Отзывов: <span>{{guide.reviews_count}}</span>
                      </div>
                    </div>
                  </div>
                </NuxtLink>
              </div>
              <div class="load-more" v-if="current_page < last_page">
                <a @click="paginate">Загрузить еще</a>
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
          title: 'Готовые маршруты',
          link: '/routes',
          active: '',
          color: ''
        },
        {
          id: 1,
          title: 'Гиды',
          link: '/guides',
          active: 'active',
          color: 'white!important'
        },
        {
          id: 2,
          title: 'Тур. агентства',
          link: '/agencies',
          active: '',
          color: ''
        },
      ],
      guides:[],
      current_page:1,
      last_page:1


    }
  },
  methods:{
    getImages(data){
      console.log(this.$store.state.image.image);
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
    console.log(guides);
    return {guides,current_page,last_page}
  },
  mounted() {
    // console.log(this.guides.data)
  }
}
</script>

<style scoped>

</style>

<template>
  <section class="routes-page">
    <div class="container">
      <ul class="crumbs">
        <li class="crumbs__item">
          <a href="/">Главная</a>
        </li>
        <li class="crumbs__item">
          <a href="#">Маршруты</a>
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
            <NuxtLink :to="tab.link">{{tab.title}}</NuxtLink>
          </li>
        </ul>
        <div class="routes-page__tabs-content active">
          <div class="routes-page__tabs-content-inner">
            <div class="routes-page__list-categories-wrapper">
              <button class="open-filter">
                <span>Фильтр</span>
              </button>
              <div class="routes-page__list-categories">
                <div class="routes-page__list-categories-container">
                  <h4 class="routes-page__list-categories-title">
                    Тип маршрута
                  </h4>
                  <div class="routes-page__list-categories-item">
                    <input type="checkbox" id="cb1"> <label for="cb1">Все</label>
                  </div>
                  <div class="routes-page__list-categories-item">
                    <input type="checkbox" id="cb2"> <label for="cb2">На машине</label>
                  </div>
                  <div class="routes-page__list-categories-item">
                    <input type="checkbox" id="cb3"> <label for="cb3">Пешком</label>
                  </div>
                  <div class="routes-page__list-categories-item">
                    <input type="checkbox" id="cb4"> <label for="cb4">На велосипеде</label>
                  </div>
                </div>

                <div class="routes-page__list-categories-container">
                  <h4 class="routes-page__list-categories-title">
                    Категория маршрута
                  </h4>
                  <div class="routes-page__list-categories-item">
                    <input type="checkbox" id="cb5"> <label for="cb5">Все</label>
                  </div>
                  <div class="routes-page__list-categories-item">
                    <input type="checkbox" id="cb6"> <label for="cb6">Обзорное место</label>
                  </div>
                  <div class="routes-page__list-categories-item">
                    <input type="checkbox" id="cb7"> <label for="cb7">Отдых</label>
                  </div>
                  <div class="routes-page__list-categories-item">
                    <input type="checkbox" id="cb8"> <label for="cb8">Место питания</label>
                  </div>
                </div>

                <div class="routes-page__list-categories-container">
                  <h4 class="routes-page__list-categories-title">
                    Продолжительность маршрута
                  </h4>
                  <div class="routes-page__list-categories-item">
                    <input type="checkbox" id="cb9"> <label for="cb9">Все</label>
                  </div>
                  <div class="routes-page__list-categories-item">
                    <input type="checkbox" id="cb10"> <label for="cb10">До 3 часов</label>
                  </div>
                  <div class="routes-page__list-categories-item">
                    <input type="checkbox" id="cb11"> <label for="cb11">От 3 до 8 часов</label>
                  </div>
                  <div class="routes-page__list-categories-item">
                    <input type="checkbox" id="cb12"> <label for="cb12">От 8 часов до 1 дня</label>
                  </div>
                  <div class="routes-page__list-categories-item">
                    <input type="checkbox" id="cb13"> <label for="cb13">Больше дня</label>
                  </div>
                </div>
              </div>
              <button class="do-filter">
                Применить фильтр
              </button>
            </div>
            <div class="routes-page__list">
              <NuxtLink class="routes-page__link" :to="'/routes/'+item.alias" v-for="(item,i) in routes" :key="i">
                <div class="routes-page__item">
                  <div class="routes-page__item-img" :style="'background-image: url('+getImages(item.image)+');'"></div>
                  <div class="routes-page__item-content">
                    <h4 class="routes-page__item-title">
                      {{ item['title_'+$i18n.locale] }}
                    </h4>
<!--                    <ul class="routes-page__item-categories item-categories">-->
<!--                      <li class="routes-page__item-category item-category">-->
<!--                        Природа-->
<!--                      </li>-->
<!--                      <li class="routes-page__item-category item-category">-->
<!--                        На велосипеде-->
<!--                      </li>-->
<!--                    </ul>-->
                    <div class="routes-page__item-text" v-html="truncate(item['description_'+$i18n.locale], 120)"></div>
                    <div class="routes-page__item-about">
                      <div class="routes-page__item-time">
                        Длительность: <span>{{ item.time }}</span>
                      </div>
                      <div class="routes-page__item-distance">
                        Протяженность: <span>{{ item.distance }}</span>
                      </div>
                      <div class="routes-page__item-points">
                        Количество точек: <span>5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </NuxtLink>
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
          title: 'Готовые маршруты',
          link: '/routes',
          active: 'active'
        },
        {
          id: 1,
          title: 'Гиды',
          link: '/guides',
          active: ''
        },
        {
          id: 2,
          title: 'Тур. агентства',
          link: '/agencies',
          active: ''
        },
      ]
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
    }

  },
  async asyncData({$axios}) {
    let routes = []
    try{
      await $axios.$get("/routes").then((e)=>{
        routes = e
      });
    }
    catch (e) {
      console.log(e);
    }
    return {routes}
  }
}
</script>

<style scoped>

</style>

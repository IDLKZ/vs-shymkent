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
          <div class="routes-page__tabs-content-inner">
            <div class="routes-page__list-categories-wrapper">
              <button class="open-filter">
                <span>Фильтр</span>
              </button>
              <div class="routes-page__list-categories">
                <div class="routes-page__list-categories-container">
                  <h4 class="routes-page__list-categories-title">
                    Рейтинг
                  </h4>
                  <div class="routes-page__list-categories-item">
                    <input type="checkbox" id="route-tab2-1"> <label for="route-tab2-1">Все</label>
                  </div>
                  <div class="routes-page__list-categories-item">
                    <input type="checkbox" id="route-tab2-2"> <label for="route-tab2-2">До 3 звезд</label>
                  </div>
                  <div class="routes-page__list-categories-item">
                    <input type="checkbox" id="route-tab2-3"> <label for="route-tab2-3">До 4 звезд</label>
                  </div>
                </div>

                <div class="routes-page__list-categories-container">
                  <h4 class="routes-page__list-categories-title">
                    Знание языков
                  </h4>
                  <div class="routes-page__list-categories-item">
                    <input type="checkbox" id="route-tab2-4"> <label for="route-tab2-4">Все</label>
                  </div>
                  <div class="routes-page__list-categories-item">
                    <input type="checkbox" id="route-tab2-5"> <label for="route-tab2-5">Казахский</label>
                  </div>
                  <div class="routes-page__list-categories-item">
                    <input type="checkbox" id="route-tab2-6"> <label for="route-tab2-6">Русский</label>
                  </div>
                  <div class="routes-page__list-categories-item">
                    <input type="checkbox" id="route-tab2-7"> <label for="route-tab2-7">Английский</label>
                  </div>
                </div>
              </div>
              <button class="do-filter">
                Применить фильтр
              </button>
            </div>
            <div class="routes-page__employees-list-wrapper">
              <div class="routes-page__employees-list">
                <NuxtLink :to="'/guides/'+guide.alias" class="routes-page__employees-list-item" v-for="guide in guides.data" :key="guide.id">
                  <div class="routes-page__employees-img" :style="'background-image: url('+getImages(guide.user.image)+');'"></div>
                  <div class="routes-page__employees-content">
                    <h5 class="routes-page__employees-title">
                      {{ guide.user.name }}
                    </h5>
                    <div class="guide-item__rating-inner">
                      <div class="guide-list__item-rating">
                        <div class="guide-list__item-rating-star active">
                          <svg height="511pt" viewBox="0 -10 511.98685 511" width="511pt" xmlns="http://www.w3.org/2000/svg"><path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"/></svg>
                        </div>
                        <div class="guide-list__item-rating-star active">
                          <svg height="511pt" viewBox="0 -10 511.98685 511" width="511pt" xmlns="http://www.w3.org/2000/svg"><path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"/></svg>
                        </div>
                        <div class="guide-list__item-rating-star active">
                          <svg height="511pt" viewBox="0 -10 511.98685 511" width="511pt" xmlns="http://www.w3.org/2000/svg"><path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"/></svg>
                        </div>
                        <div class="guide-list__item-rating-star active">
                          <svg height="511pt" viewBox="0 -10 511.98685 511" width="511pt" xmlns="http://www.w3.org/2000/svg"><path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"/></svg>
                        </div>
                        <div class="guide-list__item-rating-star">
                          <svg height="511pt" viewBox="0 -10 511.98685 511" width="511pt" xmlns="http://www.w3.org/2000/svg"><path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"/></svg>
                        </div>
                      </div>
                      <div class="guide-item__contact-count">
                        (4)
                      </div>
                    </div>
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
                        Экскурсий: <span>5</span>
                      </div>
                      <div class="routes-page__employees-info-item">
                        Отзывов: <span>20</span>
                      </div>
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
    let guides = []
    try{
      await $axios.$get("/guides").then((e)=>{
        guides = e
      });
    }
    catch (e) {
      console.log(e);
    }
    return {guides}
  },
  mounted() {
    // console.log(this.guides.data)
  }
}
</script>

<style scoped>

</style>

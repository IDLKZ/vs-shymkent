<template>
  <section class="guide-list">
    <div class="container">
      <ul class="crumbs">
        <li class="crumbs__item">
          <a href="/">Главная</a>
        </li>
        <li class="crumbs__item current">
          <a href="#">Путеводитель</a>
        </li>
      </ul>
      <div class="top-content">
        <div class="top-content__wrapper top-content__wrapper-1">
          <h2 class="top-content__title">
            Путеводитель
          </h2>
          <p class="top-content__text">
            Откройте для себя красивейшие места любимого Шымкента
          </p>
        </div>
        <a href="#" class="guide-list__top-link">Показать на карте</a>
        <div class="top-content__line"></div>
      </div>
      <div class="guide-list__content">
        <div class="guide-list__header-wrapper">
          <button class="open-filter">
            <span>Фильтр</span>
          </button>
          <div class="guide-list__header">
            <h4 class="guide-list__header-title">
              Категории
            </h4>
            <div class="guide-list__accordion">
              <div class="guide-list__accordion-item">
                <div class="guide-list__accordion-trigger">
                  <input class="check-all" type="checkbox" id="cb0"> <label for="cb0">Все</label>
                </div>
              </div>
              <div class="guide-list__accordion-item" v-for="(item,i) in this.categories" :key="i">
                <div class="guide-list__accordion-trigger">
                  <input class="check-all" type="checkbox" id="cb1"> <label for="cb1">{{item['title_'+$i18n.locale]}}</label>
                  <svg onclick="guideListAccordion()" v-if="item.children" class="guide-list__accordion-trigger-svg" xmlns="http://www.w3.org/2000/svg" width="9.318" height="4.985" viewBox="0 0 9.318 4.985"><g transform="translate(-6.4 -33.4)"><path d="M15.623,33.5a.329.329,0,0,0-.466,0l-4.094,4.1-4.1-4.1a.329.329,0,0,0-.466.466l4.326,4.326a.321.321,0,0,0,.233.1.335.335,0,0,0,.233-.1l4.326-4.326A.323.323,0,0,0,15.623,33.5Z" transform="translate(0)"/></g></svg>
                </div>
                <div class="guide-list__accordion-content" v-if="item.children">
                  <div class="guide-list__accordion-content-item" v-for="(value, i) in item.children" :key="i">
                    <input type="checkbox" id="cb2"> <label for="cb2">{{value['title_'+$i18n.locale]}}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button class="do-filter">
            Применить фильтр
          </button>
        </div>
        <div class="guide-list__wrapper">
          <div class="guide-list__sort-wrapper">
            <div class="guide-list__search-wrapper">
              <input type="search" class="guide-list__header-search" placeholder="Введите название места">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" height="136pt" version="1.1" viewBox="-1 0 136 136.21852" width="136pt">
                  <g id="surface1">
                    <path d="M 93.148438 80.832031 C 109.5 57.742188 104.03125 25.769531 80.941406 9.421875 C 57.851562 -6.925781 25.878906 -1.460938 9.53125 21.632812 C -6.816406 44.722656 -1.351562 76.691406 21.742188 93.039062 C 38.222656 104.707031 60.011719 105.605469 77.394531 95.339844 L 115.164062 132.882812 C 119.242188 137.175781 126.027344 137.347656 130.320312 133.269531 C 134.613281 129.195312 134.785156 122.410156 130.710938 118.117188 C 130.582031 117.980469 130.457031 117.855469 130.320312 117.726562 Z M 51.308594 84.332031 C 33.0625 84.335938 18.269531 69.554688 18.257812 51.308594 C 18.253906 33.0625 33.035156 18.269531 51.285156 18.261719 C 69.507812 18.253906 84.292969 33.011719 84.328125 51.234375 C 84.359375 69.484375 69.585938 84.300781 51.332031 84.332031 C 51.324219 84.332031 51.320312 84.332031 51.308594 84.332031 Z M 51.308594 84.332031 " style=" stroke:none;fill-rule:nonzero;fill:#C42313;fill-opacity:1;" />
                  </g>
                </svg>
              </button>
            </div>
            <div class="guide-list__select-wrapper select__wrapper">
              <div class="guide-list__select-label select__label">Показывать по:</div>
              <div class="guide-list__select select">
                <div class="guide-list__select-header select__header">
                                    <span class="guide-list__select-current select__current">
                                        популряности
                                    </span>
                  <div class="guide-list__select-icon select__icon"></div>
                </div>
                <div class="guide-list__select-body select__body">
                  <div class="guide-list__select-item select__item active">популряности</div>
                  <div class="guide-list__select-item select__item">Концерты</div>
                  <div class="guide-list__select-item select__item">Фильмы</div>
                  <div class="guide-list__select-item select__item">Спектакли</div>
                </div>
              </div>
            </div>
          </div>
          <div class="guide-list__items">
            <div class="guide-list__item" v-for="(item,i) in this.places" :key="i">
              <div class="guide-list__item-img" :style="'background-image: url('+getImages(item.image)+');'">
                <NuxtLink :to="'/places/'+item.alias"></NuxtLink>
              </div>
              <div class="guide-list__item-info">
                <div class="guide-list__item-category" v-for="(item,i) in item.category" :key="i">
                  {{item['title_'+$i18n.locale]}} /
                </div>
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
              </div>
              <div class="guide-list__item-content">
                <NuxtLink :to="'/places/'+item.alias" class="guide-list__item-title">
                  {{item['title_'+$i18n.locale]}}
                </NuxtLink>
                <p class="guide-list__item-text" v-html="truncate(item['description_'+$i18n.locale],100)"></p>
                <div class="guide-list__item-about">
                  <NuxtLink :to="'/places/'+item.alias" class="guide-list__about-link">Подробнее</NuxtLink>
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
  </section>
</template>

<script>
export default {
  name: "index",
  methods:{
    getImages(data){
      return this.$store.state.image.image + data ;
    },
    truncate(string, value) {
      return string.substring(0, value) + '…';
    }

  },
  async asyncData({$axios}) {
    let categories, places = [];
    try{
      await $axios.$get("/categoriesofthe-places-all").then((e)=>{categories = e});
      await $axios.$get("/places").then((e)=>{places = e.data});
    }
    catch (e) {
      console.log(e);
    }
    return {categories, places}
  },
}
</script>

<style scoped>

</style>

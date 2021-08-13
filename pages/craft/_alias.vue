<template>
  <div>
    <section class="souvenirs-item">
      <div class="container">
        <ul class="crumbs">
          <li class="crumbs__item">
            <NuxtLink to="/">Главная</NuxtLink>
          </li>
          <li class="crumbs__item">
            <NuxtLink to="/souvenirs">Сувениры</NuxtLink>
          </li>
          <li class="crumbs__item">
            <NuxtLink to="/craft">Сувенирные магазины</NuxtLink>
          </li>
          <li class="crumbs__item current">
            <NuxtLink to="#">{{ craft['title_'+$i18n.locale] }}</NuxtLink>
          </li>
        </ul>
        <h2 class="souvenirs-item__name">
          {{ craft['title_'+$i18n.locale] }}
        </h2>
        <div class="souvenirs-item__wrapper">
          <div class="souvenirs-item__img" :style="'background-image: url('+getImages(craft.image)+');'"></div>
          <div class="souvenirs-item__content">
            <div class="souvenirs-item__content-info souvenirs-item__content-info--move">
              <div class="souvenirs-item__content-info-item">
                <h4 class="souvenirs-item__content-info-title">
                  О магазине
                </h4>
                <div class="souvenirs-item__content-info-text" v-html="craft['description_'+$i18n.locale]"></div>
              </div>
              <div class="tour-agency__content-info-item">
                <h4 class="tour-agency__content-info-title">
                  Контакты
                </h4>
                <ul class="tour-agency__contact">
                  <li>
                    <div class="tour-agency__contact-title">
                      Веб-сайт:
                    </div>
                    <div class="tour-agency__contact-text">
                      <a target="_blank" :href="site" v-for="(site,i) in craft.sites" :key="i">{{ site }}</a>
                    </div>
                  </li>
                  <li>
                    <div class="tour-agency__contact-title">
                      Время работы:
                    </div>
                    <div class="tour-agency__contact-text">
                      10:00 - 19:00
                    </div>
                  </li>
                  <li>
                    <div class="tour-agency__contact-title">
                      Телефон:
                    </div>
                    <div class="tour-agency__contact-text" v-for="(phone,i) in craft.phone" :key="i">
                      {{ phone }}
                    </div>
                  </li>
                  <li>
                    <div class="tour-agency__contact-title">
                      Адрес:
                    </div>
                    <div class="tour-agency__contact-text">
                      {{ craft.address }}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="souvenirs-item__content-aside souvenirs-item__content-aside--move">
              <div class="souvenirs-item__aside-item souvenirs-item__aside-item--move">
                <h4 class="souvenirs-item__content-feedback-title">
                  Оценка в 2gis
                </h4>
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
              </div>
              <h5 class="souvenirs-item__aside-title">
                Также смотрите
              </h5>
              <div class="souvenirs-item__aside-items">
                <div class="souvenirs-item__aside-item">
                  <div class="souvenirs-item__aside-img" style="background-image: url('/images/blog-item-1.jpg');"></div>
                  <a href="#" class="souvenirs-item__aside-item-title">
                    Лавка чудес «Librarius»
                  </a>
                  <div class="souvenirs-item__aside-item-info">
                    <div class="souvenirs-item__aside-item-loc">
                      ул.Иляева, 25
                    </div>
                    <div class="souvenirs-item__aside-count">
                      Товаров: <span>5</span>
                    </div>
                  </div>
                </div>
                <div class="souvenirs-item__aside-item">
                  <div class="souvenirs-item__aside-img" style="background-image: url('/images/blog-item-2.jpg');"></div>
                  <a href="#" class="souvenirs-item__aside-item-title">
                    Лавка чудес «Librarius»
                  </a>
                  <div class="souvenirs-item__aside-item-info">
                    <div class="souvenirs-item__aside-item-loc">
                      ул.Иляева, 25
                    </div>
                    <div class="souvenirs-item__aside-count">
                      Товаров: <span>5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="souvenirs">
      <div class="container">
        <div class="top-content">
          <div class="top-content__wrapper top-content__wrapper-5">
            <h2 class="top-content__title">
              Товары магазина
            </h2>
            <p class="top-content__text">
              Вазможно вам понравится
            </p>
          </div>
          <div class="top-content__line"></div>
        </div>
        <div class="souvenirs__items-inner">
          <div class="souvenirs__item" v-for="(item,i) in souvenirs" :key="i">
            <NuxtLink :to="'/souvenirs/'+item.alias">
              <div class="souvenirs__item-img" :style="'background-image: url('+getImages(item.image)+');'"></div>
            </NuxtLink>
            <div class="souvenirs__item-content">
              <h4 class="souvenirs__item-title">
                <NuxtLink :to="'/souvenirs/'+item.alias">{{ item['title_'+$i18n.locale] }}</NuxtLink>
              </h4>
              <p class="souvenirs__item-text" v-html="truncate(item['description_'+$i18n.locale],50)"></p>
              <div class="souvenirs__item-price-wrapper">
                <button class="souvenirs__item-btn popup-modal" v-if="item.eventum">
                  <span>Купить</span>
                </button>
                <div class="souvenirs__item-price">
                  {{ item.price }} ТГ
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="load-more">
          <a href="#">Загрузить еще</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data(){
    return {
      craft:null,
    }
  },
  methods:{
    getImages(data){
      return this.$store.state.image.image + data ;
    },
    truncate(string, value) {
      return string.substring(0, value) + '…';
    },
  },
  async asyncData({$axios,route,redirect,store}) {
    let craft;
    let souvenirs = [];

    await $axios.$get("/shop/"+route.params.alias)
      .then(e => {
        if (Object.keys(e).length === 0) throw({ statusCode: 404, message: 'Event not found' })
        else {
          craft = e
          souvenirs = e.souvenirs
          // console.log(placemarks)
        }
      }).catch(e => {
        error(e)
      })

    return {craft,souvenirs};
  }
}
</script>

<style scoped>

</style>

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
          <li v-for="tab in tabs" :key="tab.id" :class="tab.active" @click="activeTab(tab.id)">
            {{tab.title}}
          </li>
        </ul>
        <div :class="'routes-page__tabs-content'+this.tabs[0].active">
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
        <div :class="'routes-page__tabs-content'+this.tabs[1].active">
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
                <a href="#" class="routes-page__employees-list-item" v-for="guide in guides.data" :key="guide.id">
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
                </a>
              </div>
              <div class="load-more">
                <a href="#">Загрузить еще</a>
              </div>
            </div>
          </div>
        </div>
        <div :class="'routes-page__tabs-content'+this.tabs[2].active">
          <div class="routes-page__travel-agency">
            <a href="#" class="routes-page__travel-agency-item" v-for="agent in agents.data" :key="agent.id">
              <div class="routes-page__travel-agency-img" :style="'background-image: url('+getImages(agent.image)+');'"></div>
              <div class="routes-page__travel-agency-content">
                <h5 class="routes-page__travel-agency-title">
                  {{ agent['title_'+$i18n.locale] }}
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
                <div class="routes-page__employees-info">
                  <div class="routes-page__employees-info-item">
                    Маршрутов: <span>5</span>
                  </div>
                  <div class="routes-page__employees-info-item">
                    Отзывов: <span>20</span>
                  </div>
                </div>
              </div>
            </a>
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
  data(){
    return {
      tabs: [
        {
          id: 0,
          title: 'Готовые маршруты',
          active: 'active'
        },
        {
          id: 1,
          title: 'Гиды',
          active: ''
        },
        {
          id: 2,
          title: 'Тур. агентства',
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
    let routes = [],
        guides = [],
        agents = []
    try{
      await $axios.$get("/routes").then((e)=>{
        routes = e[0]
        guides = e[1]
        agents = e[2]
      });
    }
    catch (e) {
      console.log(e);
    }
    return {routes, guides, agents}
  }
}
</script>

<style scoped>

</style>

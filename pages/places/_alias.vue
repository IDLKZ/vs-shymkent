<template>
  <div>
    <section class="guide-item">
      <div class="container">
        <ul class="crumbs">
          <li class="crumbs__item">
            <NuxtLink to="/">{{ $t('main') }}</NuxtLink>
          </li>
          <li class="crumbs__item">
            <NuxtLink to="/places">{{ $t('place_title') }}</NuxtLink>
          </li>
          <li class="crumbs__item current">
            <NuxtLink to="#">{{ place['title_'+$i18n.locale] }}</NuxtLink>
          </li>
        </ul>
        <div class="top-content guide-item__top-content">
          <div class="top-content__wrapper top-content__wrapper-8">
            <h2 class="top-content__title">
              {{ place['title_'+$i18n.locale] }}
            </h2>
            <span class="top-content__text" v-for="(item,i) in this.place.category" :key="i">

              {{item['title_'+$i18n.locale]}} <span v-if="place.category.length>1">/</span>
            </span>
          </div>
        </div>
        <div class="guide-item__inner">
          <div class="guide-item__images justify-md-space-around">
            <div class="row">
              <div class="col-md-8">
                <lingallery :iid.sync="currentId" :squareModeDektop="true" :responsive="true" :mobileHeight="250" :width="700" :items=galleries />

              </div>
              <div class="col-md-4">
                <div class="guide-item__map">
                  <yandex-map :coords="coords"
                              zoom="10"
                              ymap-class="ymap-style"
                              map-type="map"
                  >
                    <div v-for="(item,i) in placemarks" class="my-4">
                      <ymap-marker
                        :key="i"
                        :marker-id="i"
                        marker-type="placemark"
                        :coords="item"
                        :hint-content="place['title_'+$i18n.locale]"
                        :icon="{color: 'green', glyph: 'cinema'}"
                        cluster-name="1"
                      ></ymap-marker>
                    </div>

                  </yandex-map>
                </div>
              </div>
            </div>

          </div>
          <div class="guide-item__content">
            <ul class="guide-item__contact">
              <li class="guide-item__contact-item" v-if="place.address">
                            <span class="guide-item__contact-span">
                                {{ $t('address') }}: ​
                            </span>
                <div class="guide-item__contact-text">
                  {{place.address}}
                </div>
              </li>
              <li class="guide-item__contact-item" v-if="place.workdays">
                            <span class="guide-item__contact-span">
                                {{ $t('operating_mode') }}:
                            </span>
                <div class="guide-item__contact-text">
                  <div v-if="place.workdays">
                    <div v-for="(item,i) in place.workdays" :key="i">
                      {{item.weekday['title_'+$i18n.locale]}}
                      <span v-if="item.time_start"> / {{item.time_start}} --</span>
                      <span v-if="item.time_end"> -- {{item.time_end}}</span>
                    </div>
                  </div>
                </div>
              </li>
              <li class="guide-item__contact-item" v-if="place.phone">
                            <span class="guide-item__contact-span">
                                {{ $t('phones_for_contact') }}:
                            </span>
                <div class="guide-item__contact-text">
                  <div v-if="place.phone">
                      <p v-for="phone in place.phone"><a  class="info--text" :href="'tel:'+phone">{{phone}}</a></p><br>
                  </div>
                </div>
              </li>
              <li class="guide-item__contact-item" v-if="place.price">
                            <span class="guide-item__contact-span">
                                {{ $t('price') }}:
                            </span>
                <div class="guide-item__contact-text">
                  <div v-if="place.price">
                    {{place.price}}
                  </div>
                </div>
              </li>
              <li class="guide-item__contact-item">
                            <span class="guide-item__contact-span">
                                {{ $t('description') }}:
                            </span>
                <div class="guide-item__contact-text" v-html="place['description_'+$i18n.locale]"></div>
              </li>
              <li class="guide-item__contact-item" v-if="place.sites">
                            <span class="guide-item__contact-span">
                                {{ $t('website') }}:
                            </span>
                <div class="guide-item__contact-text">
                  <div v-if="place.sites">
                    <div v-for="(item,i) in place.sites" :key="i">
                      <a class="info--text" :href="item" target="_blank">{{item}}</a>
                    </div>
                  </div>

                </div>
              </li>
              <li class="guide-item__contact-item" v-if="place.social_networks">
                            <span class="guide-item__contact-span">
                                {{ $t('social') }}:
                            </span>
                <div class="guide-item__contact-text">
                  <div v-if="place.social_networks">
                    <div v-for="(item,i) in place.social_networks" :key="i">
                      <a class="info--text" :href="item" target="_blank">{{item}}</a>
                    </div>
                  </div>

                </div>
              </li>
              <li class="guide-item__contact-item" v-if="place.email">
                            <span class="guide-item__contact-span">
                                {{ $t('emails') }}:
                            </span>
                <div class="guide-item__contact-text">
                  <div>
                    <a :href="'mailto:'+place.email">{{place.email}}</a>
                  </div>
                </div>
              </li>
              <li class="guide-item__contact-item">
                            <span class="guide-item__contact-span">
                                {{ $t('rating') }}:
                            </span>
                <div class="guide-item__contact-text">
                  <div class="guide-item__rating-items" v-if="place.ratings.length>0">
                    <div class="guide-item__rating-item" v-for="(rating,i) in place.ratings" :key="i">
                      <h5 class="guide-item__rating-item-title">
                        В {{rating.title}}
                      </h5>
                      <div class="guide-item__rating-inner">
                        <star-rating :rating="rating.rating"
                                     star-size="15"
                                     read-only='true'
                        ></star-rating>
                      </div>
                    </div>
                  </div>
                  <div v-else>--</div>
                </div>
              </li>
              <div class="post__btns">
                <button class="post__btn" v-if="place['video_'+$i18n.locale]">
                  <div v-if="place['video_'+$i18n.locale] != '-'">
                    <a class="vr-tour__btn" target="_blank" :href="place['video_'+$i18n.locale]">
                      <svg height="512" viewBox="0 0 60 60" width="512" xmlns="http://www.w3.org/2000/svg"><g id="Page-1" fill="none" fill-rule="evenodd"><g id="027---AR-360-Degree-View" fill="rgb(0,0,0)" fill-rule="nonzero"><path id="Shape" d="m33.526 11.969-3.526 1.896-3.526-1.9c-.4865629-.261783-1.093217-.0795629-1.355.407s-.0795629 1.093217.407 1.355l3.474 1.873v2.4c0 .5522847.4477153 1 1 1s1-.4477153 1-1v-2.4l3.474-1.867c.4865629-.261783.668783-.8684371.407-1.355s-.8684371-.668783-1.355-.407z"/><path id="Shape" d="m44 22v-14c-.0001367-.35174583-.1850653-.6775544-.487-.858-.013-.008-.028-.011-.042-.018l-13-7c-.2959236-.15930021-.6520764-.15930021-.948 0l-13 7c-.014.007-.029.01-.042.018-.2996323.18192763-.4821296.50746337-.481.858v14c.000193.3677348.2022003.7056937.526.88l13 7c.2959236.1593002.6520764.1593002.948 0l13-7c.3237997-.1743063.525807-.5122652.526-.88zm-2-.6-11 5.926v-3.326c0-.5522847-.4477153-1-1-1s-1 .4477153-1 1v3.326l-11-5.926v-11.727l2.526 1.358c.4865629.261783 1.093217.0795629 1.355-.407s.0795629-1.09321703-.407-1.355l-2.363-1.269 10.889-5.864 10.889 5.864-2.363 1.27c-.4865629.26178297-.668783.8684371-.407 1.355s.8684371.668783 1.355.407l2.526-1.359z"/><path id="Shape" d="m49.7 26.24 4.3-1.282c.3492253-.0963269.6190452-.3739933.7053244-.7258357.0862791-.3518424-.0244762-.722834-.2895206-.9697927s-.6429261-.3312613-.9878038-.2203716l-6.708 2c-.5290058.1580554-.8298227.7149247-.672 1.244l2 6.708c.1264245.4235794.5159563.7138985.958.714.0967968-.0000135.1930979-.0138189.286-.041.2542719-.0758916.4679546-.2497335.5939946-.4832451s.1541016-.5075441.0780054-.7617549l-1.339-4.491c5.969 3.279 9.375 7.909 9.375 12.831 0 9.505-12.561 17.238-28 17.238s-28-7.733-28-17.238c0-4.912 3.41-9.547 9.38-12.827l-1.338 4.487c-.07609616.2542108-.04803463.5282433.0780054.7617549.12604.2335116.3397227.4073535.5939946.4832451.0929021.0271811.1892032.0409865.286.041.4420437-.0001015.8315755-.2904206.958-.714l2-6.708c.1578227-.5290753-.1429942-1.0859446-.672-1.244l-6.708-2c-.52452244-.1446791-1.06846149.1565654-1.22411123.6779376s.13411867 1.0715105.65211123 1.2380624l4.3 1.283c-6.56 3.64-10.306 8.884-10.306 14.521 0 10.608 13.458 19.238 30 19.238s30-8.63 30-19.238c0-5.646-3.739-10.882-10.3-14.522z"/><path id="Shape" d="m21 33c-1.7245035-.0040102-3.2568321 1.0992663-3.8 2.736-.1742458.5246705.1098295 1.0912541.6345 1.2655.5246705.1742458 1.0912541-.1098295 1.2655-.6345.323233-.9687689 1.3244352-1.5383919 2.3223611-1.3212817.9979258.2171101 1.6719774 1.1512036 1.5635114 2.1666976s-.9646033 1.7861463-1.9858725 1.7875841c-.5522847 0-1 .4477153-1 1s.4477153 1 1 1c1.0212692.0014378 1.8774065.7720901 1.9858725 1.7875841s-.5655856 1.9495875-1.5635114 2.1666976c-.9979259.2171102-1.9991281-.3525128-2.3223611-1.3212817-.1742459-.5246705-.7408295-.8087458-1.2655-.6345-.5246705.1742459-.8087458.7408295-.6345 1.2655.5327293 1.5955853 2.0068113 2.6873749 3.6883928 2.7318351 1.6815815.0444601 3.2112964-.9679105 3.8275955-2.5331162.616299-1.5652056.1874747-3.3487502-1.0729883-4.4627189 1.2473074-1.1000209 1.6838444-2.8570601 1.0963934-4.4129274-.5874511-1.5558674-2.0763178-2.5859291-3.7393934-2.5870726z"/><path id="Shape" d="m30 47c2.342115-.1485494 4.1270679-2.1566214 4-4.5.1270679-2.3433786-1.657885-4.3514506-4-4.5-.4557637.0058316-.9061997.098838-1.327.274.4133256-1.4479467 1.4022293-2.6631128 2.736-3.362.3372795-.1387771.5722579-.4501702.6131772-.8125818s-.1187107-.7183593-.4165553-.9288472-.6866625-.2421303-1.0146219-.082571c-4.539 2.037-4.591 8.632-4.591 8.912.006183.0520822.0165499.103582.031.154-.008.116-.031.228-.031.346-.1270679 2.3433786 1.657885 4.3514506 4 4.5zm0-7c1.2324358.1564335 2.1179166 1.2632846 2 2.5.1179166 1.2367154-.7675642 2.3435665-2 2.5-1.2324358-.1564335-2.1179166-1.2632846-2-2.5-.1179166-1.2367154.7675642-2.3435665 2-2.5z"/><path id="Shape" d="m35 37v6c0 2.209139 1.790861 4 4 4s4-1.790861 4-4v-6c0-2.209139-1.790861-4-4-4s-4 1.790861-4 4zm6 0v6c0 1.1045695-.8954305 2-2 2s-2-.8954305-2-2v-6c0-1.1045695.8954305-2 2-2s2 .8954305 2 2z"/></g></g></svg>
                      VR-тур
                    </a>
                  </div>
                </button>
                <button class="post__btn" v-if="place['audio_'+$i18n.locale]">
                  <div v-if="place['audio_'+$i18n.locale] != '-'">
                    <a target="_blank" :href="place['audio_'+$i18n.locale]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18.3" height="18.3" viewBox="0 0 18.3 18.3">
                        <g id="headphones" transform="translate(0.15 0.15)">
                          <g id="Сгруппировать_86" data-name="Сгруппировать 86">
                            <path id="Контур_101" data-name="Контур 101" d="M9,0A9.01,9.01,0,0,0,0,9v7.071A1.929,1.929,0,0,0,1.929,18H4.5a.643.643,0,0,0,.643-.643V10.929a.643.643,0,0,0-.643-.643H1.929a1.908,1.908,0,0,0-.643.118V9A7.714,7.714,0,0,1,16.714,9v1.4a1.906,1.906,0,0,0-.643-.118H13.5a.643.643,0,0,0-.643.643v6.429A.643.643,0,0,0,13.5,18h2.571A1.929,1.929,0,0,0,18,16.071V9A9.01,9.01,0,0,0,9,0ZM1.929,11.571H3.857v5.143H1.929a.643.643,0,0,1-.643-.643V12.214A.643.643,0,0,1,1.929,11.571Zm14.786,4.5a.643.643,0,0,1-.643.643H14.143V11.571h1.929a.643.643,0,0,1,.643.643Z" stroke="#fff" stroke-width="0.3"/>
                          </g>
                        </g>
                      </svg>
                      Аудиогид
                    </a>
                  </div>
                </button>
                <form class="my-4" @submit.prevent="addSave(form,saveColor)">
                  <input v-model="form.place_id" type="hidden" name="place_id">
                  <button type="submit" class="post__btn" :class="this.saveColor">
                    <svg data-name="Livello 1" id="Livello_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title/><path d="M98.78,0H29.22A7.21,7.21,0,0,0,22,7.19V120.8a7.08,7.08,0,0,0,4.42,6.63,7.22,7.22,0,0,0,7.87-1.5L63.14,97.59a1.23,1.23,0,0,1,1.72,0l28.86,28.33a7.21,7.21,0,0,0,7.87,1.5A7.08,7.08,0,0,0,106,120.8V7.19A7.21,7.21,0,0,0,98.78,0ZM100,120.8a1.14,1.14,0,0,1-.74,1.09,1.17,1.17,0,0,1-1.34-.25h0L69.06,93.31a7.26,7.26,0,0,0-10.13,0L30.08,121.64a1.18,1.18,0,0,1-1.34.25A1.14,1.14,0,0,1,28,120.8V7.19A1.21,1.21,0,0,1,29.22,6H98.78A1.21,1.21,0,0,1,100,7.19Z"/></svg>
                    {{ $t(btn_save) }}
                  </button>
                </form>
                <yandex-share class="my-4" :services="['vkontakte','facebook','twitter','whatsapp','telegram']" counter />
              </div>
              <!--    Review Start-->
              <div class="tour-agency__content-feedback-item">
                <div class="touragencye__feedback-reviews">
                  <div class="tour-agency__reviews-inner" style="min-height: auto" v-if="reviews.length">
                    <h1>{{ $t('review') }}</h1>
                    <div class="tour-agency__reviews-item" v-for="(review,index) in reviews">
                      <div class="tour-agency__reviews-item-top">
                        <div class="tour-agency__reviews-item-img" v-bind:style="{ backgroundImage: 'url(' + getImage(review.user.image) + ')' }"></div>
                        <div class="tour-agency__reviews-item-inner">
                          <div class="tour-agency__reviews-inner-name">
                            {{review.user.name}} | {{review.created_at}}
                          </div>
                          <div class="guide-list__item-rating">
                            <div v-for="i in 5" :class="getStarClass(i,review.rating)">
                              <svg height="511pt" viewBox="0 -10 511.98685 511" width="511pt" xmlns="http://www.w3.org/2000/svg"><path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"/></svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="tour-agency__reviews-item-text">
                        {{review.review}}
                      </div>
                    </div>
                    <div class="load-more" v-if="current_page < last_page">
                      <a  @click.prevent="loadMore"  href="#">{{ $t('load_more') }}...</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="blog-item__disqus" style="background-color: white" v-if="this.$auth.loggedIn">
                <h3 class="blog-item__disqus-title">
                  {{ $t('leave_a_review') }}
                </h3>
                <div class="blog-item__disqus-inner">
                  <div class="blog-item__disqus-inner">
                    <div class="d-flex">
                      <v-avatar >
                        <img
                          :src="getImage(this.$auth.user.user.image)"
                          :alt="this.$auth.user.user.name"
                        >
                      </v-avatar>
                      <p>
                        {{this.$auth.user.user.name}}
                      </p>
                    </div>
                    <StarRating
                      @rating-selected="setRating"
                      :rating="rating ? Math.round(rating.avgStar) : 0"
                      :star-size="30"
                      text-class="customTextRating"
                    >
                    </StarRating>
                    <v-textarea
                      v-model="forms.review"
                      :rules="[v => (v || '' ).length <= 1000 || 'Description must be 1000 characters or less']"
                      label="Текст отзыва"
                      color="teal"
                      max="1000"
                      counter
                    >
                    </v-textarea>
                    <div class="text-right">
                      <v-btn @click="sendForm" v-if="forms.rating" class="my-btn " style="height: 50px!important; width: 150px!important;">
                        {{ $t('send') }}
                      </v-btn>
                    </div>



                  </div>
                </div>
              </div>
              <!--Review End-->
            </ul>
            <div class="guide-item__sameplace">
              <h4 class="guide-item__sameplace-title">
                {{ $t('place__p') }}
              </h4>
              <div class="guide-item__sameplace-slider">
                <div class="guide-item__sameplace-slider-item">
                  <div class="guide-list__item" v-for="(item,i) in places" :key="i">
                    <div class="guide-list__item-img" :style="'background-image: url('+getImage(item.image)+');'">
                      <NuxtLink :to="'/places/'+item.alias"></NuxtLink>
                    </div>
                    <div class="guide-list__item-info">
                      <div class="guide-list__item-category" v-for="(item,i) in item.category" :key="i">
                        {{item['title_'+$i18n.locale]}} /
                      </div>
                    </div>
                    <div class="guide-list__item-content">
                      <NuxtLink :to="'/places/'+item.alias" class="guide-list__item-title">
                        {{item['title_'+$i18n.locale]}}
                      </NuxtLink>
                      <p class="guide-list__item-text" v-html="truncateTitle(item['description_'+$i18n.locale],100)"></p>
                      <div class="guide-list__item-about mt-3">
                        <NuxtLink :to="'/places/'+item.alias" class="guide-list__about-link white--text my-4">{{ $t('more_info') }}</NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>



          </div>
        </div>
      </div>
    </section>

    <section class="calendar-page">
      <div class="container">
        <div class="top-content">
          <div class="top-content__wrapper top-content__wrapper-2">
            <h2 class="top-content__title">
              {{ $t('events_title_place') }}
            </h2>
            <p class="top-content__text">
              {{ $t('buy') }}
            </p>
          </div>
          <div class="top-content__line"></div>
        </div>
        <div class="calendar__date-wrapper">
          <ul class="calendar__date">
            <li class="calendar__date-item">
              <button class="calendar__date-btn active"
                      @click="date = ''"
              >{{ $t('events_time_1') }}</button>
            </li>
            <li class="calendar__date-item">
              <button class="calendar__date-btn"
                      @click="date=$moment(new Date()).format('DD/MM/YYYY')"
              >{{ $t('events_time_2') }}</button>
            </li>
            <li class="calendar__date-item">
              <button class="calendar__date-btn"
                      @click="date=$moment(new Date()).add(1,'days').format('DD/MM/YYYY')"
              >{{ $t('events_time_3') }}</button>
            </li>
          </ul>
          <div class="calendar__change-date ">
            <div class="calendar__change-date">
              <v-menu
                ref="menu1"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    hide-details="auto"
                    v-model="formatDate"
                    :label="$t('events_time_4')"
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                    color="white"
                    outlined
                    dark

                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dateForm"
                  no-title
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </div>
          </div>
        </div>
        <div class="calendar__inner" v-if="place.events.length>0">
          <div class="calendar__item" v-for="(item,i) in place.events" :key="i">
            <NuxtLink :to="'/events/' + item.alias">
              <div class="calendar__item-img"
                   :style="{'background':'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('+getImage(item.image)+')'}">


                <div class="calendar__item-day" v-if="item.workdays.length>0">
                  <div v-for="(day,index) in item.workdays" :key="index">
                    <small v-if="day.weekday.id == 1">{{day.weekday["title_" + $i18n.locale]}}</small>
                    <span>{{ $t('date') }} </span>{{day.date_start}} - {{day.date_end}}
                  </div>

                </div>
                <div class="calendar__item-time">
                  <div v-for="(day,index) in item.workdays" :key="index">
                    <span>{{ $t('time') }} </span>{{day.time_start}} - {{day.time_end}}
                  </div>
                </div>
              </div>
            </NuxtLink>
            <div class="calendar__item-inner">
              <h4 class="calendar__item-title">
                {{ truncateTitle(item['title_'+$i18n.locale],20) }}
              </h4>
              <div class="calendar__item-location">
                {{ item.address }}
              </div>
              <p class="calendar__item-text" v-html="truncateTitle(item['description_'+$i18n.locale], 50)"></p>
              <div class="calendar-page__btn-wrapper mt-3">
                <v-dialog
                  v-if="item.eventum"
                  v-model="dialog"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <button class="calendar-page__item-btn"
                            v-bind="attrs"
                            v-on="on"
                            style="color: white!important;"
                            @click="eventum = item.eventum"
                    >
                      <span>{{ $t('buy') }}</span>
                    </button>
                  </template>

                  <v-card>
                    <v-card-text>
                      <div id="modal-eventumCloseBtn" @click="dialog = false"
                           style="float: right;height: 10px;width: 15px;cursor: pointer;position: absolute;right: 10px;top: 8px;">
                        <svg version="1.1" x="0px" y="0px" viewBox="0 0 15 15" width="100%" height="100%">
                          <rect fill="#000000" x="-1.8" y="6.2"
                                transform="matrix(0.7071 0.7071 -0.7071 0.7071 7.5178 -3.1079)" width="18.6"
                                height="2.7"></rect>
                          <rect fill="#000000" x="-1.8" y="6.2"
                                transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 18.1391 7.5282)" width="18.6"
                                height="2.7"></rect>
                        </svg>
                      </div>
                      <iframe :src="getEventum(eventum)" style="height:573px;width:100%;"
                              frameborder="0"></iframe>
                    </v-card-text>

                    <v-divider></v-divider>

                  </v-card>
                </v-dialog>
                <NuxtLink class="calendar-page__item-link" :to="'/events/' + item.alias">
                  <span>{{ $t('more_info') }}</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <div class="calendar-page__item-not-found" v-else>
          <h4 class="calendar-page__not-found-title">
            {{ $t('null_message_1') }}
            <b>{{ $t('null_message_2') }}</b>
          </h4>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";

import Lingallery from 'lingallery';

export default {
  components:{
    StarRating,
    Lingallery
  },
  data(){
    return {
      galleries: [],
      currentId:null,
      coords: [42.340782,69.596329],
      placemarks: [],
      dateForm:"",
      date: "",
      menu: false,
      modal: false,
      reviews:[],
      current_page:1,
      last_page:1,
      place:{},
      forms:{
        rating:null,
        review:null,
        user_id:null,
        place_id:null
      },
      eventum:null
    }
  },
  watch: {
    dateForm (val) {
      this.date = this.$moment(val).format("DD/MM/YYYY");
    },
    date(val){
      if(this.date){
        this.$router.push({path: '/events' , query: {date_start: this.date}});
      }
      else{
        this.$router.push({path: '/events'});
      }
    }
  },
  computed:{
    formatDate() {
      return this.date
    },
  },
  async asyncData({params, $axios, store}) {
    let galleries = [];
    let reviews = [];
    let current_page,last_page = 1;
    let form = {}
    let saveColor = ''
    let btn_save = 'save'
    const alias = params.alias
    let place = await $axios.$get('/single-place/'+alias);
    reviews = place[1].data;
    current_page = place[1].current_page;
    last_page = place[1].last_page;
    place = place[0];
    const places = await $axios.$get('/getPlace?count=2');
    form.place_id = place.id
    if (store.$auth.$state.loggedIn){
      form.user_id = store.$auth.$state.user.user.id
      if (place.savings.length>0){
        place.savings.forEach((item,i) => {
          if (item.user_id == store.$auth.$state.user.user.id){
            saveColor = 'color--red'
            btn_save = 'saved'
          } else {
            saveColor = ''
            btn_save = 'save'
          }
        })
      }
    }
    let placemarks = []
    if(place.address_link){
      let TIMA = JSON.parse(place.address_link)
      TIMA.forEach((item, i) => {
        placemarks[i] = [item.lat, item.lng];
      })
    }

    galleries.push({
      id:100, src:store.state.image.image +place.image, thumbnail:store.state.image.image +place.image
    })
    if(place.galleries.length > 0){
      for(let i = 0; i < place.galleries.length; i++){
        galleries.push(
          {id:place.galleries[i].id,src:store.state.image.image +place.galleries[i].image , thumbnail:store.state.image.image + place.galleries[i].image}
        )
      }
    }

    return {place,galleries,placemarks, form, saveColor, places, btn_save,reviews,current_page,last_page}
  },
  methods:{
//Установка рейтинга
    setRating(e){
      this.forms.rating = e;
    },
    //Существующий рейтинг
    getStarClass(item,max){
      let className =  'guide-list__item-rating-star';
      for (let i = 1; i <= max; i++){
        if(item <= max){
          className = 'guide-list__item-rating-star active';
        }
      }
      return className;
    },

    //Отправка формы
    async sendForm(){
      this.forms.user_id = this.$auth.user.user.id;
      this.forms.place_id = this.place.id;
      this.$toast.info("Отправляем запрос")
      await this.$axios.$post("/cabinet/reviews", this.forms).then((e)=>{
        this.$toast.success("Успешно отправлено на модерацию")
      }).catch((e)=>{
        if(e.response.status == 429){
          this.$toast.error("Убедитесь что ваши запросы потверждены, и попробуйте позже");
        }
      })
      this.forms.review = "";
      this.forms.rating = null;
    },
    //Пагинация отзывов
    async loadMore(){
      this.current_page++
      try{
        await this.$axios.$get('/single-place/'+this.place.alias +"?page=" + this.current_page).then((e)=>{
          this.reviews.push(...e[1].data);
          this.current_page = e[1].current_page;
          this.last_page = e[1].last_page;
        }).catch((e)=>{
          console.log(e);
        })
      }
      catch (e) {
        this.$toast.error("Упс произошла ошибка! Попробуйте позже");
      }



    },
  },
  mounted() {
      // console.log(this.placemarks)
  }
}
</script>

<style scoped lang="scss">

</style>

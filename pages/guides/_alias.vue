<template>
  <section>
    <section class="tour-guide">
      <div class="container">
        <ul class="crumbs">
          <li class="crumbs__item">
            <NuxtLink to="/">{{ $t('main') }}</NuxtLink>
          </li>
          <li class="crumbs__item">
            <NuxtLink to="/routes">{{ $t('routes_title') }}</NuxtLink>
          </li>
          <li class="crumbs__item">
            <NuxtLink to="/guides">{{ $t('guides') }}</NuxtLink>
          </li>
          <li class="crumbs__item current">
            <NuxtLink to="#">{{ guide['title_'+$i18n.locale] }}</NuxtLink>
          </li>
        </ul>
        <h2 class="tour-guide__name">
          {{ guide['title_'+$i18n.locale] }}
        </h2>
        <div class="tour-guide__wrapper">
          <div class="tour-guide__img" :style="'background-image: url('+getImage(guide.image)+');'"></div>
          <div class="tour-guide__content">
            <div class="tour-guide__content-info">
              <div class="tour-guide__content-info-item" v-html="guide['description_'+$i18n.locale]"></div>
              <div class="tour-guide__content-info-item">
                <h4 class="tour-guide__content-info-title">
                  {{ $t('personal_info') }}
                </h4>
                <div class="tour-guide__content-info-text" v-html="guide['education_'+$i18n.locale]"></div>
              </div>
              <div class="tour-guide__content-info-item">
                <h4 class="tour-guide__content-info-title">
                  {{ $t('languages') }}
                </h4>
                <ul class="tour-guide__content-info-langs">
                  <li class="tour-guide__langs-item" v-for="(language,i) in guide.languages" :key="i">
                    <div class="tour-guide__langs-item-title">
                      {{ language }}
                    </div>
<!--                    <div class="tour-guide__langs-item-scale">-->
<!--                      <div class="tour-guide__langs-scale">-->
<!--                        <span style="width: 100%;"></span>-->
<!--                      </div>-->
<!--                      100%-->
<!--                    </div>-->
                  </li>
                </ul>
              </div>
              <div class="post__btns">
                <form @submit.prevent="addSave(form, saveColor)">
                  <input v-model="form.organizator_id" type="hidden">
                  <button type="submit" class="post__btn" :class="this.saveColor">
                    <svg data-name="Livello 1" id="Livello_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title/><path d="M98.78,0H29.22A7.21,7.21,0,0,0,22,7.19V120.8a7.08,7.08,0,0,0,4.42,6.63,7.22,7.22,0,0,0,7.87-1.5L63.14,97.59a1.23,1.23,0,0,1,1.72,0l28.86,28.33a7.21,7.21,0,0,0,7.87,1.5A7.08,7.08,0,0,0,106,120.8V7.19A7.21,7.21,0,0,0,98.78,0ZM100,120.8a1.14,1.14,0,0,1-.74,1.09,1.17,1.17,0,0,1-1.34-.25h0L69.06,93.31a7.26,7.26,0,0,0-10.13,0L30.08,121.64a1.18,1.18,0,0,1-1.34.25A1.14,1.14,0,0,1,28,120.8V7.19A1.21,1.21,0,0,1,29.22,6H98.78A1.21,1.21,0,0,1,100,7.19Z"/></svg>
                    {{ $t(btn_save) }}
                  </button>
                </form>
                <yandex-share :services="['vkontakte','facebook','twitter','whatsapp','telegram']" counter />
<!--                <button class="post__btn">-->
<!--                  <svg xmlns="http://www.w3.org/2000/svg" width="11.052" height="11.056" viewBox="0 0 11.052 11.056"><path d="M11.052,5.525,6.014,0V3.31H5.428A5.428,5.428,0,0,0,0,8.738v2.318L.967,10A6.939,6.939,0,0,1,6.014,7.741V11.05ZM.648,9.39V8.738a4.78,4.78,0,0,1,4.78-4.781H6.661V1.672l3.514,3.853L6.661,9.378V7.093H6.08A7.588,7.588,0,0,0,.648,9.39Zm0,0"/></svg>-->
<!--                  Поделиться-->
<!--                </button>-->
              </div>
            </div>
            <div class="tour-guide__content-feedback">
              <div class="souvenirs-item__aside-item souvenirs-item__aside-item--move" v-for="rating in guide.ratings">
                <h4 class="souvenirs-item__content-feedback-title" >
                  Оценка в {{rating.title}}
                </h4>
                <div class="guide-item__rating-inner">
                  <star-rating :rating="rating.rating" star-size="16" :read-only="true" :round-start-rating="false" :show-rating="true"></star-rating>
                </div>
              </div>
              <div class="tour-guide__content-feedback-item">
                <h4 class="tour-guide__content-feedback-title">
                  {{ $t('reviews') }}
                </h4>
                <div class="tour-guide__feedback-reviews">
                  <div class="tour-guide__reviews-inner">
                    <div class="tour-agency__reviews-item" v-for="review in guide.reviews">
                      <div class="tour-agency__reviews-item-top">
                        <div class="tour-agency__reviews-item-img"
                             :style="'background-image: url('+getImage(review.user.image)+');'"></div>
                        <div class="tour-agency__reviews-item-inner">
                          <div class="tour-agency__reviews-inner-name">
                            {{review.user.name}}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="blog-item__disqus" v-if="this.$auth.loggedIn">
          <h3 class="blog-item__disqus-title">
            {{$t('leave_a_review')}}
          </h3>
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
            <star-rating
              @rating-selected="setRating"
              :rating="rating ? Math.round(rating.avgStar) : 0"
              :star-size="30"
              text-class="customTextRating"
            >
            </star-rating>
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
              <v-btn @click="sendForm" v-if="forms.review && forms.review.length && forms.review.length < 1000" class="my-btn " style="height: 50px!important; width: 150px!important;">
                {{ $t('send') }}
              </v-btn>
            </div>



          </div>
        </div>
      </div>
    </section>

    <section class="routes-page">
      <div class="container">
        <div class="top-content">
          <div class="top-content__wrapper top-content__wrapper-1">
            <h2 class="top-content__title">
              {{ $t('guides_title') }}
            </h2>
            <p class="top-content__text">
              {{ $t('guides_subtitle') }}
            </p>
          </div>
          <div class="top-content__line"></div>
        </div>
        <div class="tour-guide__routes-list-wrapper" v-if="guide.routes.length>0">
          <div class="tour-guide__routes-list" v-for="(item,i) in guide.routes" :key="i">
            <NuxtLink :to="'/places/'+item.alias" class="routes-page__item">
              <div class="routes-page__item-img" :style="'background-image: url('+getImage(item.image)+');'"></div>
              <div class="routes-page__item-content">
                <h4 class="routes-page__item-title">
                  {{ item.category['title_'+$i18n.locale] }}
                </h4>
                <ul class="routes-page__item-categories item-categories">
                  <li class="routes-page__item-category item-category" v-for="(type,i) in item.types_route" :key="i">
                    {{ type['title_'+$i18n.locale] }}
                  </li>
                </ul>
                <div class="routes-page__item-text" v-html="truncateTitle(item['description_'+$i18n.locale], 50)"></div>
                <div class="routes-page__item-about">
                  <div class="routes-page__item-time">
                    {{ $t('duration') }}: <span>{{ item.time }}.</span>
                  </div>
                  <div class="routes-page__item-distance">
                    {{ $t('distance') }}: <span>{{ item.distance }}.</span>
                  </div>
                  <div class="routes-page__item-points" v-if="item.places.length>0">
                    {{ $t('count_of_points') }}: <span>{{item.places.length}}</span>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
        <div class="load-more">
          <a href="#">{{ $t('load_guides') }}</a>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  data(){
    return{
      forms:{
        rating:null,
        review:null,
        user_id:null,
        organizator_id:null
      }
    }
  },
  methods: {
    setRating(e){
      this.forms.rating = e;
    },
    async sendForm(){
      this.forms.user_id = this.$auth.user.user.id;
      this.forms.organizator_id = this.guide.id;
      this.$toast.info("Отправляем запрос")
      await this.$axios.$post("/cabinet/reviews", this.forms).then((e)=>{
        this.$toast.success("Успешно отправлено на модерацию")
      }).catch((e)=>{
        if(e.response.status == 429){
          this.$toast.error("Убедитесь что ваши запросы потверждены, и попробуйте позже");
        }
      })
      this.forms.review = "";

    },
  },
  async asyncData({$axios,params,redirect,store}) {
    let guide;
    let form = {};
    let saveColor = ''
    let btn_save = 'save'
    await $axios.$get("/guide/"+params.alias)
      .then(e => {
        if (Object.keys(e).length === 0) throw({ statusCode: 404, message: 'Event not found' })
        else {
          guide = e;
          form.organizator_id = guide.id
          if (store.$auth.$state.loggedIn){
            form.user_id = store.$auth.$state.user.user.id
            if (guide.savings.length>0){
              guide.savings.forEach((item,i) => {
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
        }
      }).catch(e => {
        console.log(e)
      })

    return {guide,form,saveColor,btn_save};
  },
  mounted() {
    // console.log(this.guide)
  }
}
</script>

<style scoped>

</style>

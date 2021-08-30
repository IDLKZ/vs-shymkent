<template>
  <section>
    <section class="tour-agency">
      <div class="container">
        <ul class="crumbs">
          <li class="crumbs__item">
            <NuxtLink to="/">{{ $t('main') }}</NuxtLink>
          </li>
          <li class="crumbs__item">
            <NuxtLink to="/routes">{{ $t('routes_title') }}</NuxtLink>
          </li>
          <li class="crumbs__item">
            <NuxtLink to="/agencies">{{ $t('agencies') }}</NuxtLink>
          </li>
          <li class="crumbs__item current">
            <NuxtLink to="#">{{ agent['title_'+$i18n.locale] }}</NuxtLink>
          </li>
        </ul>
        <h2 class="tour-agency__name">
          {{ agent['title_'+$i18n.locale] }}
        </h2>
        <div class="tour-agency__wrapper">
          <div class="tour-agency__img" :style="'background-image: url('+getImages(agent.image)+');'"></div>
          <div class="tour-agency__content">
            <div class="tour-agency__content-info">
              <div class="tour-agency__content-info-item">
                <h4 class="tour-agency__content-info-title">
                  {{ $t('about_company') }}
                </h4>
                <div class="tour-agency__content-info-text" v-html="agent['description_'+$i18n.locale]"></div>
              </div>
              <div class="tour-agency__content-info-item">
                <h4 class="tour-agency__content-info-title">
                  {{ $t('about_company_subtitle') }}
                </h4>
                <ul class="tour-agency__contact">
                  <li>
                    <div class="tour-agency__contact-title">
                      {{ $t('website') }}:
                    </div>
                    <div class="tour-agency__contact-text">
                      <a :href="site" target="_blank" v-for="(site,i) in agent.sites" :key="i">{{site}} .,</a>
                    </div>
                  </li>
                  <li>
                    <div class="tour-agency__contact-title">
                      {{ $t('emails') }}:
                    </div>
                    <div class="tour-agency__contact-text">
                      <a :href="'mailto:'+agent.user.email">{{agent.user.email}}</a>
                    </div>
                  </li>
                  <li>
                    <div class="tour-agency__contact-title">
                      {{ $t('phones_for_contact') }}:
                    </div>
                    <div class="tour-agency__contact-text">
                      <span v-for="(phone,i) in agent.phone" :key="i">{{ phone }}</span>
                    </div>
                  </li>
                  <li>
                    <div class="tour-agency__contact-title">
                      {{ $t('address') }}:
                    </div>
                    <div class="tour-agency__contact-text">
                      {{ agent.address }}
                    </div>
                  </li>
                </ul>
              </div>
              <div class="post__btns">
                <form @submit.prevent="addSave">
                  <input v-model="form.organizator_id" type="hidden">
                  <button type="submit" class="post__btn">
                    <svg :class="this.saveColor" data-name="Livello 1" id="Livello_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title/><path d="M98.78,0H29.22A7.21,7.21,0,0,0,22,7.19V120.8a7.08,7.08,0,0,0,4.42,6.63,7.22,7.22,0,0,0,7.87-1.5L63.14,97.59a1.23,1.23,0,0,1,1.72,0l28.86,28.33a7.21,7.21,0,0,0,7.87,1.5A7.08,7.08,0,0,0,106,120.8V7.19A7.21,7.21,0,0,0,98.78,0ZM100,120.8a1.14,1.14,0,0,1-.74,1.09,1.17,1.17,0,0,1-1.34-.25h0L69.06,93.31a7.26,7.26,0,0,0-10.13,0L30.08,121.64a1.18,1.18,0,0,1-1.34.25A1.14,1.14,0,0,1,28,120.8V7.19A1.21,1.21,0,0,1,29.22,6H98.78A1.21,1.21,0,0,1,100,7.19Z"/></svg>
                    {{ $t('save') }}
                  </button>
                </form>
                <yandex-share :services="['vkontakte','facebook','twitter','whatsapp','telegram']" counter />

              </div>
            </div>
            <div class="tour-agency__content-feedback">
              <div class="souvenirs-item__aside-item souvenirs-item__aside-item--move" v-for="rating in agent.ratings">
                <h4 class="souvenirs-item__content-feedback-title" >
                  Оценка в {{rating.title}}
                </h4>
                <div class="guide-item__rating-inner">
                  <div class="guide-list__item-rating">
                    <div v-for="i in 5" :class="getStarClass(i,rating['rating'])">
                      <svg height="511pt" viewBox="0 -10 511.98685 511" width="511pt" xmlns="http://www.w3.org/2000/svg"><path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"/></svg>
                    </div>
                  </div>
                  <div class="guide-item__contact-count">
                    {{rating.rating}}
                  </div>
                </div>
              </div>
              <div class="tour-agency__content-feedback-item">
                <h4 class="tour-agency__content-feedback-title">
                  {{ $t('reviews') }}
                </h4>
                <div class="touragencye__feedback-reviews">
                  <div class="tour-agency__reviews-inner">
                    <div class="tour-agency__reviews-item" v-for="review in agent.reviews">
                      <div class="tour-agency__reviews-item-top">
                        <div class="tour-agency__reviews-item-img"
                             :style="'background-image: url('+getImages(review.user.image)+');'"></div>
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
            {{ $t('leave_a_review') }}
          </h3>
          <div class="blog-item__disqus-inner">
            <div class="d-flex">
              <v-avatar >
                <img
                  :src="getImages(this.$auth.user.user.image)"
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
              {{ $t('agencies_title') }}
            </h2>
            <p class="top-content__text">
              {{ $t('agencies_subtitle') }}
            </p>
          </div>
          <div class="top-content__line"></div>
        </div>
        <div class="tour-guide__routes-list-wrapper" v-if="agent.routes.length>0">
          <div class="tour-guide__routes-list" v-for="(item,i) in agent.routes" :key="i">
            <NuxtLink :to="'/routes/'+item.alias" class="routes-page__item">
              <div class="routes-page__item-img" :style="'background-image: url('+getImages(item.image)+');'"></div>
              <div class="routes-page__item-content">
                <h4 class="routes-page__item-title">
                  {{ item.category['title_'+$i18n.locale] }}
                </h4>
                <ul class="routes-page__item-categories item-categories">
                  <li class="routes-page__item-category item-category" v-for="(type,i) in item.types_route" :key="i">
                    {{ type['title_'+$i18n.locale] }}
                  </li>
                </ul>
                <div class="routes-page__item-text" v-html="truncate(item['description_'+$i18n.locale], 50)"></div>
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
          <NuxtLink to="/agencies">{{ $t('load_agencies') }}</NuxtLink>
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
      this.forms.organizator_id = this.agent.id;
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

    getImages(data){
      return this.$store.state.image.image + data ;
    },
    truncate(string = '', value) {
      return string.substring(0, value) + '...';
    },
    async addSave(){
      // console.log(this.form)
      try {
        this.$toast.show('Updating in...')
        await this.$axios.$post("/cabinet/add-save", this.form).then((response) => {
          this.$toast.success('Успешно добавлен')
          this.saveColor = response
          // window.location.reload()
        }).catch(({response}) => {
          if (response.status === 401){
            window.location.assign('/login')
          }
          // this.errors = response.data.errors
        })
      } catch (e) {
        this.$toast.error('Error')
        console.log(e)
      }
    }
  },
  async asyncData({$axios,params,redirect,store}) {
    let agent;
    let form = {};
    let saveColor = '';
    await $axios.$get("/agency/"+params.alias)
      .then(e => {
        if (Object.keys(e).length === 0) throw({ statusCode: 404, message: 'Event not found' })
        else {
          agent = e;
          form.organizator_id = agent.id
          if (store.$auth.$state.loggedIn){
            form.user_id = store.$auth.$state.user.user.id
            if (agent.savings.length>0){
              agent.savings.forEach((item,i) => {
                if (item.user_id == store.$auth.$state.user.user.id){
                  saveColor = 'color--red'
                } else {
                  saveColor = ''
                }
              })
            }
          }
        }
      }).catch(e => {
        console.log(e)
      })

    return {agent,form,saveColor};
  },
  mounted() {
    // console.log(this.$route)
  }
}
</script>

<style scoped>

</style>

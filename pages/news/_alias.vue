<template>
  <section class="news-item">
    <div class="container">
      <ul class="crumbs">
        <li class="crumbs__item">
          <NuxtLink to="/">{{ $t('main') }}</NuxtLink>
        </li>
        <li class="crumbs__item">
          <NuxtLink to="/news">{{ $t('news') }}</NuxtLink>
        </li>
        <li class="crumbs__item current">
          <NuxtLink to="#">{{ New['title_'+$i18n.locale] }}</NuxtLink>
        </li>
      </ul>
      <h3 class="news-item__title">
        {{ New['title_'+$i18n.locale] }}
      </h3>
      <div class="news-item__info">
        <div class="news-item__date">
          {{ $t('published') }}: {{ New.created_at }}
        </div>
        <div class="news-item__author">
          <NuxtLink to="#">{{New.user.name}}</NuxtLink>
        </div>
      </div>
      <div class="news-item__wrapper">
        <div class="news-item__content-inner">
          <div class="news-item__img" :style="'background-image: url('+getImages(New.image)+');'"></div>
          <div class="news-item__text" v-html="New['description_'+$i18n.locale]"></div>
          <div class="post__btns">
            <form @submit.prevent="addSave">
              <input v-model="form.news_id" type="hidden">
              <button type="submit" class="post__btn">
                <svg :class="this.saveColor" data-name="Livello 1" id="Livello_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title/><path d="M98.78,0H29.22A7.21,7.21,0,0,0,22,7.19V120.8a7.08,7.08,0,0,0,4.42,6.63,7.22,7.22,0,0,0,7.87-1.5L63.14,97.59a1.23,1.23,0,0,1,1.72,0l28.86,28.33a7.21,7.21,0,0,0,7.87,1.5A7.08,7.08,0,0,0,106,120.8V7.19A7.21,7.21,0,0,0,98.78,0ZM100,120.8a1.14,1.14,0,0,1-.74,1.09,1.17,1.17,0,0,1-1.34-.25h0L69.06,93.31a7.26,7.26,0,0,0-10.13,0L30.08,121.64a1.18,1.18,0,0,1-1.34.25A1.14,1.14,0,0,1,28,120.8V7.19A1.21,1.21,0,0,1,29.22,6H98.78A1.21,1.21,0,0,1,100,7.19Z"/></svg>
                {{ $t('save') }}
              </button>
            </form>
            <yandex-share :services="['vkontakte','facebook','twitter','whatsapp','telegram']" counter />
<!--            <button class="post__btn">-->
<!--              <svg xmlns="http://www.w3.org/2000/svg" width="11.052" height="11.056" viewBox="0 0 11.052 11.056"><path d="M11.052,5.525,6.014,0V3.31H5.428A5.428,5.428,0,0,0,0,8.738v2.318L.967,10A6.939,6.939,0,0,1,6.014,7.741V11.05ZM.648,9.39V8.738a4.78,4.78,0,0,1,4.78-4.781H6.661V1.672l3.514,3.853L6.661,9.378V7.093H6.08A7.588,7.588,0,0,0,.648,9.39Zm0,0"/></svg>-->
<!--              Поделиться-->
<!--            </button>-->
          </div>
          <NuxtLink to="/news" class="news-item__link">
            {{ $t('load_news') }}
          </NuxtLink>
          <div class="tour-agency__content-feedback-item">
            <div class="touragencye__feedback-reviews">
              <div class="tour-agency__reviews-inner" v-if="reviews.length">
                <h1>{{ $t('reviews') }}</h1>
                <div class="tour-agency__reviews-item" v-for="(review,index) in reviews">
                  <div class="tour-agency__reviews-item-top">
                    <div class="tour-agency__reviews-item-img" v-bind:style="{ backgroundImage: 'url(' + getImages(review.user.image) + ')' }"></div>
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
        <aside class="news-item__aside">
          <h5 class="news-item__aside-title">
            {{ $t('see_also') }}
          </h5>
          <div class="news-item__aside-items" v-if="addNews.length">
            <div class="news-list__item" v-for="(item,index) in addNews">
              <a class="popup-modal" href="#modal">
                <img class="news-list__item-img" :src="getImages(item.image)" alt="">
                <div class="news-list__item-date">
                  {{ $t('published') }}: <span>{{item.created_at}}</span>
                </div>
                <NuxtLink :to="'/news/' + item.alias" class="news-list__item-text" v-text="truncateTitle(item['title_' + $i18n.locale],50)">
                </NuxtLink>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  data(){
    return {
      New:null,
      galleries: [],
      currentId:null,
      coords: [42.340782,69.596329],
      current_page:1,
      last_page:1,
      placemarks: [],
      reviews:[],
      addNews:[],
      forms:{
        rating:null,
        review:null,
        user_id:null,
        news_id:null
      }
    }
  },

  async asyncData({params, $axios, store,error}) {
    let addNews,reviews = [];
    let New;
    let current_page,last_page = 1;
    let form = {}
    let saveColor = '';
    const alias = params.alias
    await $axios.$get('/new/'+alias).then((e)=>{
      New = e[0]
      reviews = e[1].data;
      last_page = e[1].last_page;

    }).catch((e)=>{
        error({ statusCode: 404, message: 'News not found' })
    });
    form.news_id = New.id
    if (store.$auth.$state.loggedIn){
      form.user_id = store.$auth.$state.user.user.id
      if (New.savings.length>0){
        New.savings.forEach((item,i) => {
          if (item.user_id == store.$auth.$state.user.user.id){
            saveColor = 'color--red'
          } else {
            saveColor = ''
          }
        })
      }
    }
    try {
      await $axios.$get('/moreNews').then((e)=>{
        addNews = e;
      })
        .catch((e)=>{
        console.log(e);
      });
    }
    catch (e){
      console.log(e);
    }
    return {New, form, saveColor,addNews,last_page,reviews}
  },
  methods:{
    getImages(data){
      // console.log(this.$store.state.image.image);
      return this.$store.state.image.image + data ;
    },
    truncate(string, value) {
      return string.substring(0, value) + '…';
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
    },

    getStarClass(item,max){
         let className =  'guide-list__item-rating-star';
      for (let i = 1; i <= max; i++){
          if(item <= max){
            className = 'guide-list__item-rating-star active';
          }
        }
      return className;
    },
    async loadMore(){
      this.current_page++
      try{
        await this.$axios.$get('/new/'+this.New.alias +"?page=" + this.current_page).then((e)=>{
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



    setRating(e){
      this.forms.rating = e;
    },
    async sendForm(){
      this.forms.user_id = this.$auth.user.user.id;
      this.forms.news_id = this.New.id;
      this.$toast.info("Отправляем запрос")
      await this.$axios.$post("/cabinet/reviews", this.forms).then((e)=>{
        console.log(e);
        this.$toast.success("Упсешно отправлено на модерацию")
      }).catch((e)=>{
        if(e.response.status == 429){
          this.$toast.error("Убедитесь что ваши запросы потверждены, и попробуйте позже");
        }
      })
      this.forms.review = "";
    }

  },
}
</script>

<style scoped>

</style>

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
          <v-carousel v-model="model" hide-delimiters height="auto">
            <v-carousel-item
              v-for="(galleryImage, i) in galleries"
              :key="i"
            >
              <div class="news-item__img" :style="'background-image: url('+getImage(galleryImage)+');'"></div>

            </v-carousel-item>
          </v-carousel>
          <div class="news-item__text" v-html="New['description_'+$i18n.locale]"></div>
          <div class="post__btns">
            <form @submit.prevent="addSave(form,saveColor)">
              <input v-model="form.news_id" type="hidden">
              <button type="submit" class="post__btn" :class="this.saveColor">
                <svg data-name="Livello 1" id="Livello_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title/><path d="M98.78,0H29.22A7.21,7.21,0,0,0,22,7.19V120.8a7.08,7.08,0,0,0,4.42,6.63,7.22,7.22,0,0,0,7.87-1.5L63.14,97.59a1.23,1.23,0,0,1,1.72,0l28.86,28.33a7.21,7.21,0,0,0,7.87,1.5A7.08,7.08,0,0,0,106,120.8V7.19A7.21,7.21,0,0,0,98.78,0ZM100,120.8a1.14,1.14,0,0,1-.74,1.09,1.17,1.17,0,0,1-1.34-.25h0L69.06,93.31a7.26,7.26,0,0,0-10.13,0L30.08,121.64a1.18,1.18,0,0,1-1.34.25A1.14,1.14,0,0,1,28,120.8V7.19A1.21,1.21,0,0,1,29.22,6H98.78A1.21,1.21,0,0,1,100,7.19Z"/></svg>
                {{ $t(btn_save) }}
              </button>
            </form>
            <yandex-share :services="['vkontakte','facebook','twitter','whatsapp','telegram']" counter />

          </div>
          <Disqus />

          <NuxtLink to="/news" class="news-item__link my-5">
            {{ $t('load_news') }}
          </NuxtLink>
        </div>
        <aside class="news-item__aside">
          <h5 class="news-item__aside-title">
            {{ $t('see_also') }}
          </h5>
          <div class="news-item__aside-items" v-if="addNews.length">
            <div class="news-list__item" v-for="(item,index) in addNews">
              <a class="popup-modal" href="#modal">
                <img class="news-list__item-img" :src="getImage(item.image)" alt="">
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
    let saveColor = ''
    let btn_save = 'save'
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
            btn_save = 'saved'
          } else {
            btn_save = 'save'
            saveColor = ''
          }
        })
      }
    }
    let galleries=[];
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
    galleries.push(New.image);
    if(New.galleries){
      if(New.galleries.length > 0){
        for (let item of New.galleries){
          galleries.push(item.image);
        }
      }
    }

    return {New,form,saveColor,btn_save,addNews,last_page,reviews,galleries}
  },
  methods:{
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
.carousel {
  height: auto !important;
}
</style>

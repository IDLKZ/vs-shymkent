<template>
  <section class="news-item">
    <div class="container">
      <ul class="crumbs">
        <li class="crumbs__item">
          <a href="/">{{ $t('main') }}</a>
        </li>
        <li class="crumbs__item">
          <NuxtLink to="/blogs">{{ $t('blog') }}</NuxtLink>
        </li>
        <li class="crumbs__item current">
          <a href="#">{{blog["title_" + $i18n.locale]}}</a>
        </li>
      </ul>
      <h3 class="blog-item__title">
        {{blog["title_" + $i18n.locale]}}
      </h3>
      <div class="blog-item__info">
        <div class="blog-item__date">
          {{ $t('published') }}: {{blog.created_at}}
        </div>
        <div class="blog-item__author">
          <a href="#">
            {{blog.user.name}}
          </a>
        </div>
        <div class="blog-item__tag">
          #{{blog.tag["title_" + $i18n.locale]}}
        </div>
      </div>
      <div class="blog-item__wrapper">
        <div class="blog-item__content-inner">
          <v-carousel v-model="model" hide-delimiters height="auto">
            <v-carousel-item
              v-for="(galleryImage, i) in galleries"
              :key="i"
            >
              <div class="news-item__img" :style="'background-image: url('+getImage(galleryImage)+');'"></div>

            </v-carousel-item>
          </v-carousel>
          <div class="blog-item__text blog_desc">
            <div v-html="blog['description_' + $i18n.locale]">

            </div>

          </div>
          <div class="post__btns">
            <form @submit.prevent="addSave(form,saveColor)">
              <input v-model="form.blog_id" type="hidden">
              <button type="submit" class="post__btn" :class="this.saveColor">
                <svg data-name="Livello 1" id="Livello_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title/><path d="M98.78,0H29.22A7.21,7.21,0,0,0,22,7.19V120.8a7.08,7.08,0,0,0,4.42,6.63,7.22,7.22,0,0,0,7.87-1.5L63.14,97.59a1.23,1.23,0,0,1,1.72,0l28.86,28.33a7.21,7.21,0,0,0,7.87,1.5A7.08,7.08,0,0,0,106,120.8V7.19A7.21,7.21,0,0,0,98.78,0ZM100,120.8a1.14,1.14,0,0,1-.74,1.09,1.17,1.17,0,0,1-1.34-.25h0L69.06,93.31a7.26,7.26,0,0,0-10.13,0L30.08,121.64a1.18,1.18,0,0,1-1.34.25A1.14,1.14,0,0,1,28,120.8V7.19A1.21,1.21,0,0,1,29.22,6H98.78A1.21,1.21,0,0,1,100,7.19Z"/></svg>
                {{ $t(btn_save) }}
              </button>
            </form>
            <yandex-share :services="['vkontakte','facebook','twitter','whatsapp','telegram']" counter />
          </div>
          <NuxtLink to="/blogs" class="blog-item__link">
            {{ $t('load_news') }}
          </NuxtLink>

        </div>
        <aside class="blog-item__aside">
          <h5 class="blog-item__aside-title">
            {{ $t('see_also') }}
          </h5>
          <div class="blog-item__aside-items">
            <div class="blog-list__item" v-for="item in blogs" :key="blog.created_at">
              <div class="blog-list__item-img" :style="{backgroundImage: 'url(' + getImage(item.image) + ')'}"></div>
              <div class="blog-list__item-content">
                <div class="blog-list__info">
                  <div class="blog-list__date">
                    {{ $t('published') }}: <span>
                    {{item.created_at}}
                  </span>
                  </div>
                  <div class="blog-list__tag">
                    #{{item.tag["title_" + $i18n.locale]}}
                  </div>
                </div>
                <NuxtLink :to="'/blogs/' + item.alias" class="blog-list__text">
                  {{truncateTitle(item["title_" + $i18n.locale],100)}}
                </NuxtLink>
                <div class="blog-list__author">
                  {{item.user.name}}
                </div>
              </div>
            </div>
          </div>
        </aside>
        <Disqus />

      </div>
    </div>
  </section>
</template>

<script>
import StarRating from "vue-star-rating";

export default {
  components: {
    StarRating
  },
  data(){
    return{
      blog:null,
      blogs:[],
      reviews:[],
      current_page:1,
      last_page:1,
      forms:{
        rating:null,
        review:null,
        user_id:null,
        blog_id:null
      },
      galleries:[]

    }

  },

  methods:{
    //Отправка формы
    async sendForm(){
      this.forms.user_id = this.$auth.user.user.id;
      this.forms.blog_id = this.blog.id;
      this.$toast.info("Отправляем запрос")
      await this.$axios.$post("/cabinet/reviews", this.forms).then((e)=>{
        this.$toast.success("Упсешно отправлено на модерацию")
      }).catch((e)=>{
        if(e.response.status == 429){
          this.$toast.error("Убедитесь что ваши запросы потверждены, и попробуйте позже");
        }
      })
      this.forms.review = "";
      this.forms.rating = 0;
    },
    //Пагинация отзывов
    async loadMore(){
      this.current_page++
      try{
        await this.$axios.$get('/singleBlog/'+this.blog.alias +"?page=" + this.current_page).then((e)=>{
          this.reviews.push(...e[2].data);
          this.current_page = e[2].current_page;
          this.last_page = e[2].last_page;
        }).catch((e)=>{
          console.log(e);
        })
      }
      catch (e) {
        this.$toast.error("Упс произошла ошибка! Попробуйте позже");
      }



    },

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
  },
  //Первоначальная нагрузка
  async asyncData({$axios,params,store}){
    let current_page,last_page = 1;
    let alias = params.alias
    let blog = null;
    let form = {}
    let saveColor = ''
    let btn_save = 'save'
    let blogs,reviews = [];
    await $axios.$get("/singleBlog/" + alias).then((e)=>{
      blog = e[0];
      blogs = e[1];
      reviews = e[2].data;
      current_page = e[2].current_page;
      last_page = e[2].last_page;
    }).catch(e=>{
      console.log(e)
    })
    form.blog_id = blog.id
    if (store.$auth.$state.loggedIn){
      form.user_id = store.$auth.$state.user.user.id
      if (blog.savings.length>0){
        blog.savings.forEach((item,i) => {
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
    let galleries = [];
    galleries.push(blog.image);
    if(blog.galleries){
      if(blog.galleries.length > 0){
        for (let item of blog.galleries){
          galleries.push(item.image);
        }
      }

    }

    return {blog,blogs,reviews,current_page,last_page,form,saveColor,btn_save,galleries}
  }









}
</script>

<style scoped lang="scss">
.carousel {
  height: auto !important;
}
.blog_desc{
  div{
    ul{
      padding-left: 20px!important;
    }
  }

}
</style>

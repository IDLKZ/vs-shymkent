<template>
  <section class="news-item">
    <div class="container">
      <ul class="crumbs">
        <li class="crumbs__item">
          <NuxtLink to="/">Главная</NuxtLink>
        </li>
        <li class="crumbs__item">
          <NuxtLink to="/news">Новости</NuxtLink>
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
          Опубликовано: {{ New.created_at }}
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
                Сохранить
              </button>
            </form>
            <button class="post__btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="11.052" height="11.056" viewBox="0 0 11.052 11.056"><path d="M11.052,5.525,6.014,0V3.31H5.428A5.428,5.428,0,0,0,0,8.738v2.318L.967,10A6.939,6.939,0,0,1,6.014,7.741V11.05ZM.648,9.39V8.738a4.78,4.78,0,0,1,4.78-4.781H6.661V1.672l3.514,3.853L6.661,9.378V7.093H6.08A7.588,7.588,0,0,0,.648,9.39Zm0,0"/></svg>
              Поделиться
            </button>
          </div>
          <NuxtLink to="/news" class="news-item__link">
            Перейти ко всем новостям
          </NuxtLink>
          <div class="blog-item__disqus">
            <h3 class="blog-item__disqus-title">
              Комментарии Disqus
            </h3>
            <div class="blog-item__disqus-inner">

            </div>
          </div>
        </div>
        <aside class="news-item__aside">
          <h5 class="news-item__aside-title">
            Читайте также
          </h5>
          <div class="news-item__aside-items">
            <div class="news-list__item">
              <a class="popup-modal" href="#modal">
                <img class="news-list__item-img" src="/images/news-1.jpg" alt="">
                <div class="news-list__item-date">
                  Опубликовано: <span>26.10.2020</span>
                </div>
                <p class="news-list__item-text">
                  В Шымкенте полным ходом идет подготовка к предстоящему отопительному сезону.
                </p>
              </a>
            </div>
            <div class="news-list__item">
              <a class="popup-modal" href="#modal">
                <img class="news-list__item-img" src="/images/news-2.jpg" alt="">
                <div class="news-list__item-date">
                  Опубликовано: <span>26.10.2020</span>
                </div>
                <p class="news-list__item-text">
                  Где в Шымкенте бесплатно пройти анализ на коронавирус?
                </p>
              </a>
            </div>
            <div class="news-list__item">
              <a class="popup-modal" href="#modal">
                <img class="news-list__item-img" src="/images/news-4.jpg" alt="">
                <div class="news-list__item-date">
                  Опубликовано: <span>26.10.2020</span>
                </div>
                <p class="news-list__item-text">
                  Когда в Шымкенте откроются объекты общественного питания?
                </p>
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
      galleries: [],
      currentId:null,
      coords: [42.340782,69.596329],
      placemarks: [],
    }
  },
  async asyncData({params, $axios, store}) {
    let form = {}
    let saveColor = '';
    const alias = params.alias
    const New = await $axios.$get('/new/'+alias);
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

    return {New, form, saveColor}
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
    }

  },
  mounted() {
    // console.log(this.$store.$auth.$state.loggedIn)
  }
}
</script>

<style scoped>

</style>

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
          <li class="crumbs__item current">
            <NuxtLink to="#">{{souvenir['title_'+$i18n.locale]}}</NuxtLink>
          </li>
        </ul>
        <h2 class="souvenirs-item__name">
          {{souvenir['title_'+$i18n.locale]}}
        </h2>
        <div class="souvenirs-item__wrapper">
          <div class="souvenirs-item__img" :style="'background-image: url('+getImages(souvenir.image)+');'"></div>
          <div class="souvenirs-item__content">
            <div class="souvenirs-item__content-info">
              <div class="souvenirs-item__content-info-item">
                <h4 class="souvenirs-item__content-info-title">
                  «{{ souvenir['title_'+$i18n.locale] }}»
                </h4>
                <div class="souvenirs-item__content-info-text" v-html="souvenir['description_'+$i18n.locale]"></div>
              </div>
              <div class="souvenirs-item__content-info-item">
                <div class="souvenirs-item__content-info-price">
                  {{ souvenir.price }} тг.
                </div>
              </div>
              <div class="souvenirs-item__content-info-item souvenirs-item__content-info-item--move">
                <h4 class="souvenirs-item__content-info-title">
                  Оформление заказа
                </h4>
                <form action="" class="souvenirs-item__content-info-form">
                  <div class="souvenirs-item__form-inner">
                    <input type="text" class="souvenirs-item__form-input" placeholder="Имя">
                    <input type="text" class="souvenirs-item__form-input" placeholder="Фамилия">
                    <input type="email" class="souvenirs-item__form-input" placeholder="Электронный адрес">
                    <input type="number" class="souvenirs-item__form-input" placeholder="Телефон">
                    <textarea class="souvenirs-item__form-textarea" placeholder="Адрес доставки"></textarea>
                  </div>
                  <div class="souvenirs-item__form-payment">
                    <h5 class="souvenirs-item__form-payment-title">
                      Способ оплаты:
                    </h5>
                    <div class="souvenirs-item__form-radio">
                      <input type="radio" id="r1" name="souvenirs-item__form-radio"><label for="r1">Visa/Mastercard</label>
                      <input type="radio" id="r2" name="souvenirs-item__form-radio"><label for="r2">Visa/Mastercard</label>
                    </div>
                  </div>
                  <button class="souvenirs-item__form-btn" type="submit">
                    Заказать
                  </button>
                </form>
              </div>
            </div>
            <div class="souvenirs-item__content-aside">
              <h5 class="souvenirs-item__aside-title">
                Автор
              </h5>
              <div class="souvenirs-item__aside-text">
                {{ souvenir.shop.user.name }}
              </div>
              <div class="post__btns">
                <button class="post__btn">
                  <svg data-name="Livello 1" id="Livello_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title/><path d="M98.78,0H29.22A7.21,7.21,0,0,0,22,7.19V120.8a7.08,7.08,0,0,0,4.42,6.63,7.22,7.22,0,0,0,7.87-1.5L63.14,97.59a1.23,1.23,0,0,1,1.72,0l28.86,28.33a7.21,7.21,0,0,0,7.87,1.5A7.08,7.08,0,0,0,106,120.8V7.19A7.21,7.21,0,0,0,98.78,0ZM100,120.8a1.14,1.14,0,0,1-.74,1.09,1.17,1.17,0,0,1-1.34-.25h0L69.06,93.31a7.26,7.26,0,0,0-10.13,0L30.08,121.64a1.18,1.18,0,0,1-1.34.25A1.14,1.14,0,0,1,28,120.8V7.19A1.21,1.21,0,0,1,29.22,6H98.78A1.21,1.21,0,0,1,100,7.19Z"/></svg>
                  Сохранить
                </button>
                <button class="post__btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="11.052" height="11.056" viewBox="0 0 11.052 11.056"><path d="M11.052,5.525,6.014,0V3.31H5.428A5.428,5.428,0,0,0,0,8.738v2.318L.967,10A6.939,6.939,0,0,1,6.014,7.741V11.05ZM.648,9.39V8.738a4.78,4.78,0,0,1,4.78-4.781H6.661V1.672l3.514,3.853L6.661,9.378V7.093H6.08A7.588,7.588,0,0,0,.648,9.39Zm0,0"/></svg>
                  Поделиться
                </button>
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
              Сувениры
            </h2>
            <p class="top-content__text">
              Вазможно вам понравится
            </p>
          </div>
          <div class="top-content__line"></div>
        </div>
        <div class="souvenirs__items-inner">
          <div class="souvenirs__item" v-for="(item,i) in souvenirs.data" :key="i">
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
        <div class="load-more">
          <a href="#">Перейти ко всем товарам</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data(){
    return {
      souvenir:null,
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
    let souvenir;
    let galleries, souvenirs = [];

    await $axios.$get("/souvenir/"+route.params.alias)
      .then(e => {
        if (Object.keys(e).length === 0) throw({ statusCode: 404, message: 'Event not found' })
        else {
          souvenir = e;
          // console.log(placemarks)
        }
      }).catch(e => {
        error(e)
      })
    try{
      await $axios.$get("/souvenirs").then((e)=>{
        souvenirs = e[0]
      });
    }
    catch (e) {
      console.log(e);
    }
    return {souvenir,galleries,souvenirs};
  }
}
</script>

<style scoped>

</style>

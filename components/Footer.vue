<template>
  <section>
    <footer class="footer">
      <div class="container">
        <div class="footer__slider-wrapper">
          {{ $t('partners') }}
          <div class="footer__slider-prev"></div>
          <div class="footer__slider">
            <a class="footer__slider-item" href="#">
              <img src="/images/kazakhtourism.png" alt="" class="footer__slider-item-img">
            </a>
            <a class="footer__slider-item" href="#">
              <img src="/images/KTA.png" alt="" class="footer__slider-item-img">
            </a>
            <a class="footer__slider-item" href="#">
              <img src="/images/MSK.png" alt="" class="footer__slider-item-img">
            </a>
            <a class="footer__slider-item" href="#">
              <img src="/images/FlyArystan.png" alt="" class="footer__slider-item-img">
            </a>
            <a class="footer__slider-item" href="#">
              <img src="/images/ShymkentJSC.png" alt="" class="footer__slider-item-img">
            </a>
            <a class="footer__slider-item" href="#">
              <img src="/images/Atameken.png" alt="" class="footer__slider-item-img">
            </a>
            <a class="footer__slider-item" href="#">
              <img src="/images/ShymkentJSC.png" alt="" class="footer__slider-item-img">
            </a>
            <a class="footer__slider-item" href="#">
              <img src="/images/AirBnB.png" alt="" class="footer__slider-item-img">
            </a>
            <a class="footer__slider-item" href="#">
              <img src="/images/CanvasHotel.png" alt="" class="footer__slider-item-img">
            </a>
          </div>
          <div class="footer__slider-next"></div>
        </div>
        <div class="footer__bottom">
          <div class="footer__inner">
            <a class="footer__logo" href="/"><img src="/images/logo.png" alt=""></a>
            <a id="ms-informer-link-aac4dfb64d116283aa27639d673023e7" class="ms-informer-link" href="https://www.meteoservice.ru/weather/overview/shyimkent-kazahstan">Погода в Шымкенте, Казахстан</a>
            <a class="footer__app-link" href="https://apps.apple.com/tj/app/visit-shymkent/id1536047607"><img src="/images/AppStoreBadge.svg" alt=""></a>
            <a class="footer__app-link" href="https://apps.apple.com/tj/app/visit-shymkent/id1536047607"><img src="/images/GooglePlayBadge.svg" alt=""></a>
            <NuxtLink class="footer__app-link" to="/privacystatement">{{$t('privacy_statement')}}</NuxtLink>
          </div>
          <nav class="footer__nav">
            <ul class="footer__nav-list">
              <h5 class="footer__nav-title">
                {{$t('place_title')}}
              </h5>
              <li class="footer__nav-list-item" v-for="(category,key) in fts.categories" :key="key">
                <a href="#">{{category['title_'+$i18n.locale]}}</a>
              </li>
            </ul>
            <ul class="footer__nav-list">
              <h5 class="footer__nav-title">
                {{ $t('events') }}
              </h5>
              <li class="footer__nav-list-item">
                <NuxtLink to="/events">{{ $t('events_title') }}</NuxtLink>
              </li>
              <li class="footer__nav-list-item">
                <NuxtLink to="/news">{{ $t('news') }}</NuxtLink>
              </li>
              <li class="footer__nav-list-item">
                <a href="https://www.coronavirus2020.kz/">Covid19</a>
              </li>
            </ul>
            <ul class="footer__nav-list">
              <h5 class="footer__nav-title">
                {{ $t('shop') }}
              </h5>
              <li class="footer__nav-list-item">
                <NuxtLink to="/souvenirs">{{ $t('souvenirs') }}</NuxtLink>
              </li>
<!--              <li class="footer__nav-list-item">-->
<!--                <a href="#">Украшения</a>-->
<!--              </li>-->
            </ul>
            <ul class="footer__nav-list">
              <h5 class="footer__nav-title">
                Путешествие
              </h5>
              <li class="footer__nav-list-item">
                <a href="#">{{ $t('trip_type_1') }}</a>
              </li>
              <li class="footer__nav-list-item">
                <a href="#">{{ $t('trip_type_2') }}</a>
              </li>
              <li class="footer__nav-list-item">
                <a href="#">{{ $t('trip_type_3') }}</a>
              </li>
              <li class="footer__nav-list-item">
                <a href="#">{{ $t('trip_type_4') }}</a>
              </li>
              <li class="footer__nav-list-item">
                <a href="http://www.airserver.kz/flights/online-flights/">{{$t('trip_table')}}</a>
              </li>
              <li class="footer__nav-list-item">
                <a target="_blank" download href="/map.pdf">{{$t('footer_tourist_map')}}</a>
              </li>
            </ul>
          </nav>
          <div class="footer__contact">
            <h5 class="footer__contact-title">
              <a href="#">Контакты</a>
            </h5>
            <div class="footer__contact-social">
              <a href="#" class="footer__contact-social-item fab fa-instagram-square" ></a>
              <a href="#" class="footer__contact-social-item" style="background-image: url('/images/facebookLogo.svg');"></a>
              <a href="#" class="footer__contact-social-item" style="background-image: url('/images/youtubeLogo.svg');"></a>
            </div>
            <ul class="footer__contact-list">
              <div v-if="this.fts.phones.length>0">
                <li class="footer__contact-list-item" v-for="(item,i) in this.fts.phones" :key="i">
                  <a :href="'tel:'+item.phone">{{item.phone}}</a>
                </li>
              </div>
              <div v-else>
                <li class="footer__contact-list-item">
                  <a href="tel:77022695885">+7 702 269 5885</a>
                </li>
              </div>
              <div v-if="this.fts.emails.length>0">
                <li class="footer__contact-list-item" v-for="(item,i) in this.fts.emails" :key="i">
                  <a :href="'mailto:'+item.email">{{item.email}}</a>
                </li>
              </div>
              <div v-else>
                <li class="footer__contact-list-item">
                  <a href="mailto:info@visit-shymkent.kz">info@visit-shymkent.kz</a>
                </li>
              </div>

              <li class="footer__contact-list-item">
                <a class="error-form-link" href="#error-form">Сообщить об ошибке</a>
              </li>
            </ul>
          </div>
        </div>
        <p class="copyright">
          {{$t('footer_text')}}
        </p>
      </div>
    </footer>

    <form id="error-form" class="mfp-hide">
      <h1>Сообщить о проблеме</h1>
      <div class="error-form__input-inner">
        <input type="text" class="error-form__input" placeholder="Ваше имя">
        <input type="email" class="error-form__input" placeholder="Ваш e-mail">
      </div>
      <textarea class="error-form__textarea" placeholder="Описание проблемы"></textarea>
      <div class="error-form__field-wrapper">
        <input type="file" accept="image/*" name="error-form__file" id="error-form__field-file" class="error-form__field error-form__field-file" multiple>
        <label class="error-form__field-file-wrapper" for="error-form__field-file">
          <div class="error-form__field-file-fake">Прикрепить изображения</div>
        </label>
      </div>
      <div class="error-form__btn-inner">
        <div class="g-recaptcha google-captcha" data-sitekey="6LdPZuQZAAAAALRphYCRLx70tDN2Gs28U_uOc_x5"></div>
        <button type="submit" class="error-form__btn">
          Отправить
        </button>
      </div>
    </form>

  </section>
</template>

<script>

export default {
  name: "Footer",
  data(){
    return {
      fts: {
        categories: [],
        phones: [],
        emails: []
      }
    }
  },
  methods: {
    async loadSettings(){
      this.fts = await this.$axios.$get("/footer")
    }
  },
  mounted() {
    this.loadSettings()
  }

}
</script>

<style scoped lang="scss">

</style>

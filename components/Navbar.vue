<template>
  <section>
    <div class="footer-nav">
      <div class="footer-nav__background" onclick="headerMenuHide()"></div>
      <div class="footer-nav__content">
        <a class="footer-nav__logo" href="/"><img src="/images/logo.png" alt=""></a>
        <div class="footer-nav__search">
          <input class="footer-nav__search-input" type="search" :placeholder="$t('search')">
        </div>
        <ul class="footer-nav__content-list">
          <li class="footer-nav__content-item active">
            <NuxtLink to="/about">{{ $t("about_city") }}</NuxtLink>
          </li>
          <li class="footer-nav__content-item">
            <NuxtLink to="/places">{{ $t('place_title') }}</NuxtLink>
          </li>
          <li class="footer-nav__content-item footer-nav__content-item--to-del">
            <NuxtLink to="/events">{{ $t('events') }}</NuxtLink>
          </li>
          <li class="footer-nav__content-item footer-nav__content-item--to-del">
            <NuxtLink to="/routes">{{ $t('routes_title') }}</NuxtLink>
          </li>
          <li class="footer-nav__content-item">
            <NuxtLink to="/souvenirs">{{ $t('souvenirs') }}</NuxtLink>
          </li>
          <li class="footer-nav__content-item">
            <NuxtLink to="/news">{{ $t('news') }}</NuxtLink>
          </li>
          <li class="footer-nav__content-item">
            <NuxtLink to="/blogs">{{ $t('blog') }}</NuxtLink>
          </li>
          <li class="footer-nav__content-item footer-nav__content-item--to-del">
            <NuxtLink to="/login">{{ $t('cabinet') }}</NuxtLink>
          </li>
        </ul>
        <a class="footer-nav__map-link popup-modal" href="https://www.3Dshymkent.kz">{{ $t('map_shym') }}</a>
        <div class="footer-nav__contact-social">
          <NuxtLink to="/" class="footer-nav__contact-social-item" style="background-image: url('/images/instagramLogo.svg');"></NuxtLink>
          <NuxtLink to="/" class="footer-nav__contact-social-item" style="background-image: url('/images/facebookLogo.svg');"></NuxtLink>
          <NuxtLink to="/" class="footer-nav__contact-social-item" style="background-image: url('/images/youtubeLogo.svg');"></NuxtLink>
        </div>
        <ul class="footer-nav__contact">
          <li>
            <a href="tel:77772695885">+7 777 269 5885</a>
          </li>
          <li>
            <a href="tel:77772695885">+7 777 269 5885</a>
          </li>
          <li>
            <a href="mailto:info@visit-shymkent.kz">info@visit-shymkent.kz</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer-nav__menu">
      <div class="container">
        <ul class="footer-nav__items">
          <li class="footer-nav__item active">
            <NuxtLink to="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="25.495" height="24.233" viewBox="0 0 25.495 24.233"><defs></defs><g transform="translate(0 -12.675)"><g transform="translate(0 12.676)"><path class="a" d="M25.067,23.442l-2.154-1.962V14.972a.75.75,0,0,0-.75-.75H16.979a.75.75,0,0,0-.75.75v.417l-2.6-2.37a1.3,1.3,0,0,0-1.761,0L.428,23.442a1.307,1.307,0,0,0,.881,2.274H3.136V36.158a.75.75,0,0,0,.75.75h6.27a.75.75,0,0,0,.75-.75V29.818H14.59v6.341a.75.75,0,0,0,.75.75h6.27a.75.75,0,0,0,.75-.75V25.715h1.827a1.307,1.307,0,0,0,.881-2.274Zm-3.458.774a.75.75,0,0,0-.75.75V35.409H16.09V29.068a.75.75,0,0,0-.75-.75H10.155a.75.75,0,0,0-.75.75v6.341H4.635V24.966a.75.75,0,0,0-.75-.75H1.8l10.943-9.971,3.726,3.4a.75.75,0,0,0,1.255-.554V15.722h3.685V21.81a.75.75,0,0,0,.245.554l2.032,1.851Z" transform="translate(0 -12.676)"/></g></g></svg>
              {{ $t('main') }}
            </NuxtLink>
          </li>
          <li class="footer-nav__item">
            <NuxtLink to="/events">
              <svg xmlns="http://www.w3.org/2000/svg" width="23.676" height="24.233" viewBox="0 0 23.676 24.233"><defs></defs><path class="a" d="M194.453,281.5a.716.716,0,0,0,1.012,0l2.555-2.555a.716.716,0,0,0-1.012-1.012l-2.048,2.048-.934-.934a.716.716,0,1,0-1.012,1.012Zm0,0" transform="translate(-183.678 -264.581)"/><path class="a" d="M135.786,211.177a5.68,5.68,0,1,0-5.68-5.68A5.687,5.687,0,0,0,135.786,211.177Zm0-9.929a4.249,4.249,0,1,1-4.249,4.249A4.254,4.254,0,0,1,135.786,201.247Zm0,0" transform="translate(-123.948 -190.359)"/><path class="a" d="M21.362,1.524H20.057V.715a.715.715,0,1,0-1.431,0v.808H17.22V.715a.716.716,0,0,0-1.431,0v.808h-7.9V.715a.716.716,0,0,0-1.431,0v.808H5.05V.715a.716.716,0,0,0-1.431,0v.808H2.314A2.317,2.317,0,0,0,0,3.838V21.919a2.317,2.317,0,0,0,2.314,2.314H21.362a2.317,2.317,0,0,0,2.314-2.314V3.838A2.317,2.317,0,0,0,21.362,1.524Zm.883,20.4a.884.884,0,0,1-.883.883H2.314a.884.884,0,0,1-.883-.883V7.473H22.245ZM1.431,3.838a.884.884,0,0,1,.883-.883H3.619v.808a.716.716,0,0,0,1.431,0V2.955H6.456v.808a.716.716,0,0,0,1.431,0V2.955h7.9v.808a.716.716,0,0,0,1.431,0V2.955h1.406v.808a.716.716,0,0,0,1.431,0V2.955h1.3a.884.884,0,0,1,.883.883v2.2H1.431Zm0,0"/></svg>
              {{ $t('events') }}
            </NuxtLink>
          </li>
<!--          <li class="footer-nav__item">-->
<!--            <NuxtLink to="/">-->
<!--              <svg xmlns="http://www.w3.org/2000/svg" width="24.048" height="24.048" viewBox="0 0 24.048 24.048"><defs></defs><g transform="translate(0.629 0.669)"><path class="a" d="M21.911.055l-2.4,1.095a1.446,1.446,0,0,0-.417.289L15.17,5.36,1.675,3.742a.8.8,0,0,0-.663.23l-.751.751A.8.8,0,0,0,.5,6.023l9.671,4.336L7.394,13.136H2.544a.811.811,0,0,0-.569.235l-.405.408a.8.8,0,0,0,.251,1.305l4.092,1.753,1.753,4.092a.8.8,0,0,0,1.305.251l.407-.408a.8.8,0,0,0,.235-.569v-4.85l2.777-2.777,4.336,9.674a.8.8,0,0,0,1.3.239l.751-.751a.8.8,0,0,0,.23-.663L17.388,7.58l3.921-3.921a1.415,1.415,0,0,0,.289-.417l1.095-2.4A.589.589,0,0,0,21.911.055Z" transform="translate(0 0)"/></g></svg>-->
<!--              Билеты-->
<!--            </NuxtLink>-->
<!--          </li>-->
          <li class="footer-nav__item">
            <NuxtLink to="/routes">
              <svg xmlns="http://www.w3.org/2000/svg" width="18.394" height="24.861" viewBox="0 0 18.394 24.861"><defs></defs><g transform="translate(-69.873 1.7)"><g transform="translate(70.573 -1)"><path class="a" d="M79.07,0a8.506,8.506,0,0,0-8.5,8.5c0,5.814,7.6,14.35,7.928,14.711a.765.765,0,0,0,1.139,0c.324-.361,7.928-8.9,7.928-14.711A8.507,8.507,0,0,0,79.07,0Zm0,12.772A4.275,4.275,0,1,1,83.345,8.5,4.28,4.28,0,0,1,79.07,12.772Z" transform="translate(-70.573)"/></g></g></svg>
              {{ $t('routes_title') }}
            </NuxtLink>
          </li>
          <li class="footer-nav__item">
            <NuxtLink to="/cabinet">
              <svg xmlns="http://www.w3.org/2000/svg" width="17.49" height="23.61" viewBox="0 0 17.49 23.61"><defs></defs><g transform="translate(-19.922 -17.781)"><path class="a" d="M28.668,27.92a4.72,4.72,0,1,0-4.721-4.72A4.72,4.72,0,0,0,28.668,27.92Zm2,.322H26.665a6.05,6.05,0,0,0-6.043,6.044v4.9l.012.077.337.106a27.508,27.508,0,0,0,8.217,1.325,16.649,16.649,0,0,0,7.49-1.507h.034v-4.9A6.049,6.049,0,0,0,30.67,28.242Z"/></g></svg>
              {{ $t('cabinet') }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <header class="header">
      <div class="container">
        <div class="header__wrapper">
          <div class="header__menu-btn" onclick="headerMenuShow()">
            <span></span>
          </div>
          <NuxtLink class="header__logo" to="/"><img src="/images/logo.png" alt=""></NuxtLink>
          <nav class="header__nav">
            <ul class="header__menu">
              <li class="header__menu-item">
                <NuxtLink class="popup-modal" to="/about">{{ $t("about_city") }}</NuxtLink>
              </li>
              <li class="header__menu-item">
                <NuxtLink class="popup-modal" to="/places">{{ $t('place_title') }}</NuxtLink>
              </li>
              <li class="header__menu-item">
                <NuxtLink class="popup-modal" to="/events">{{ $t('events') }}</NuxtLink>
              </li>
              <li class="header__menu-item">
                <NuxtLink class="popup-modal" to="/routes">{{ $t('routes_title') }}</NuxtLink>
              </li>
              <li class="header__menu-item">
                <NuxtLink class="popup-modal" to="/souvenirs">{{ $t('souvenirs') }}</NuxtLink>
              </li>
              <li class="header__menu-item-btn">
                <a class="header__more-btn">
                  {{ $t('etc') }}
                  <svg xmlns="http://www.w3.org/2000/svg" width="9.318" height="4.985" viewBox="0 0 9.318 4.985"><g transform="translate(-6.4 -33.4)"><path d="M15.623,33.5a.329.329,0,0,0-.466,0l-4.094,4.1-4.1-4.1a.329.329,0,0,0-.466.466l4.326,4.326a.321.321,0,0,0,.233.1.335.335,0,0,0,.233-.1l4.326-4.326A.323.323,0,0,0,15.623,33.5Z" transform="translate(0)"/></g></svg>
                </a>
                <div class="header__more-wrapper">
                  <NuxtLink class="header__more-wrapper-item popup-modal" to="/news">{{ $t('news') }}</NuxtLink>
                  <NuxtLink class="header__more-wrapper-item popup-modal" to="/blogs">{{ $t('blog') }}</NuxtLink>
                </div>
              </li>
            </ul>
          </nav>
          <div class="header__icons-inner">
            <div @mouseover="hoverEffect(true,null,null)"
                 class="header__map"
                 :class="{ active: map }">
              <button class="header__map-btn"></button>
              <a class="header__map-link popup-modal" href="https://www.3Dshymkent.kz">{{ $t('map_shym') }}</a>
            </div>
            <div @mouseover="hoverEffect(null,true,null)"
                 class="header__search"
                 :class="{active: search}">
              <button class="header__search-btn" @click="onSearch"></button>
              <input class="header__search-input" @keyup.enter="onSearch" v-model="getSearch" type="search" :placeholder="$t('search')">
            </div>
            <div @mouseover="hoverEffect(null, null, true)"
                 class="header__personal-account"
                 :class="{active:login}">
              <button class="header__personal-account-btn"></button>
              <NuxtLink class="header__personal-account-link popup-modal" to="/cabinet" v-if="this.$auth.loggedIn">{{this.$auth.user.user.name}}</NuxtLink>
              <NuxtLink class="header__personal-account-link popup-modal" to="/login" v-else>{{ $t('cabinet') }}</NuxtLink>
            </div>
          </div>
          <div class="header__lang">
            <div class="header__lang-font-size bvi-open">aA</div>
            <div class="header__lang-current">
              {{toUpperCase(this.$i18n.locale)}}
              <svg xmlns="http://www.w3.org/2000/svg" width="9.318" height="4.985" viewBox="0 0 9.318 4.985"><g transform="translate(-6.4 -33.4)"><path d="M15.623,33.5a.329.329,0,0,0-.466,0l-4.094,4.1-4.1-4.1a.329.329,0,0,0-.466.466l4.326,4.326a.321.321,0,0,0,.233.1.335.335,0,0,0,.233-.1l4.326-4.326A.323.323,0,0,0,15.623,33.5Z" transform="translate(0)"/></g></svg>
            </div>
            <ul class="header__lang-list">
              <li class="header__lang-item" v-for="(item,i) in languages" :key="i">
                <a class="header__lang-link" @click="changeLanguage(item.link)">{{item.title}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  </section>
</template>


<script>
export default {
  data(){
    return {
      map: true,
      search: false,
      login: false,
      getSearch: '',
      languages: [
        {
          link: 'kz',
          title: 'Qazaq',
        },
        {
          link: 'ru',
          title: 'Русский',
        },
        {
          link: 'en',
          title: 'English',
        }
      ]
    }
  },
  methods:{
    toUpperCase(str) {
      return str.toUpperCase()
    },
    changeLanguage(lang) {
      this.$store.commit("setLanguage",lang);
      this.$i18n.locale = lang;
    },
    hoverEffect(map = null,search = null,login = null){
      if (map){
        this.map = true
        this.search = false
        this.login = false
      }
      if (search){
        this.search = true
        this.map = false
        this.login = false
      }
      if (login){
        this.login = true
        this.map = false
        this.search = false
      }
    },
    onSearch(){
      if (this.$route.path == '/search'){
        window.location.assign('/search?q='+this.getSearch)
      } else {
        this.$router.push({path: this.localePath('search'), query: {q: this.getSearch}});
      }
      // this.$router.push({path: this.localePath('search'), query: {q: this.getSearch}});
    }
  },
  mounted() {
    // console.log(this.$route)
  }

}
</script>

<style scoped>

</style>

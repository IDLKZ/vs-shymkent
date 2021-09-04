import Vue from 'vue';
Vue.mixin({
  data(){
    return {
      LANG: ''
    }
  },
  methods: {



    switchLanguages(){
      if (this.$i18n.locale == 'kz'){
        this.LANG = 'kk-KK'
      }
      if (this.$i18n.locale == 'ru'){
        this.LANG = 'ru-RU'
      }
      if (this.$i18n.locale == 'en'){
        this.LANG = 'en-EN'
      }
       this.$vuetify.lang.current = this.LANG;
    }
  },
  watch: {
    '$i18n.locale' () {
      this.switchLanguages();
       this.$axios.setHeader("Accept-Language",this.$i18n.locale);
    }
  },
  mounted() {
    this.switchLanguages()
  }
})

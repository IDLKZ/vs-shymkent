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
    }
  },
  watch: {
    '$i18n.locale' () {
      this.switchLanguages()
    }
  },
  mounted() {
    this.switchLanguages()
  }
})

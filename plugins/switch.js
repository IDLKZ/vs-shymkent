import Vue from 'vue';
Vue.mixin({
  watch: {
    '$i18n.locale' (newLocale) {
      this.$vuetify.lang.current = newLocale
    }
  }
})

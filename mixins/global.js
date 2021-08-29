import Vue from 'vue'
const globals = {
  install(Vue, ) {
    Vue.mixin({
      computed:{

      },
      methods:{
        truncateTitle(text,value) {
          return text.substring(0, value) + '…';
        },
        getImage(image) {
          return this.$store.state.image.image + image ;
        },
      }
      }
    )
  }
}

Vue.use(globals);

import Vue from 'vue'
const globals = {
  install(Vue, options) {
    Vue.mixin({
      computed:{

      },
      methods:{
        truncateTitle(text,value) {
          return text.substring(0, value) + '…';
        },
      }
      }
    )
  }
}

Vue.use(globals);

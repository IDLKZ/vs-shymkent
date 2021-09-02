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
        getEventum(id){
          return this.$store.state.eventum.code + id
        },
        getStarClass(item,max){
          max = Math.round(max);
          let className =  'guide-list__item-rating-star';
          for (let i = 1; i <= max; i++){
            if(item <= max){
              className = 'guide-list__item-rating-star active';
            }
          }
          return className;
        },
      }
      }
    )
  }
}

Vue.use(globals);

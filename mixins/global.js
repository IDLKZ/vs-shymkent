import Vue from 'vue'

const globals = {
  install(Vue,) {
    Vue.mixin({
      data(){
        return {
          btn_save: '',
          saveColor: ''
        }
      },
        computed: {},
        methods: {
          truncateTitle(text, value) {
            return text.length > value ? text.substring(0, value) + '...' : text;
          },
          getImage(image) {
            if(image == null || image == "null"){
              return  "https://www.freeiconspng.com/uploads/no-image-icon-4.png";
            }
            else{
              return this.$store.state.image.image + image;
            }
          },
          getEventum(id) {
            return this.$store.state.eventum.code + id
          },
          getStarClass(item, max) {
            max = Math.round(max);
            let className = 'guide-list__item-rating-star';
            for (let i = 1; i <= max; i++) {
              if (item <= max) {
                className = 'guide-list__item-rating-star active';
              }
            }
            return className;
          },
          changeBtnSave(color){
            if (color != 'color--red'){
              this.btn_save = 'saved'
              this.saveColor = 'color--red'
            } else {
              this.btn_save = 'save'
              this.saveColor = ''
            }
          },
          async addSave(form,color){
            this.changeBtnSave(color)
            try {
              this.$toast.show(this.$t('notification_updating_in'))
              await this.$axios.$post("/cabinet/add-save", form).then((response) => {
                this.$toast.success(this.$t('notification_updated'))
                color = response
                // window.location.reload()
              }).catch(({response}) => {
                if (response.status === 401){
                  window.location.assign('/login')
                }
                // this.errors = response.data.errors
              })
            } catch (e) {
              this.$toast.error('Error')
            }
          }
        }
      }
    )
  }
}

Vue.use(globals);

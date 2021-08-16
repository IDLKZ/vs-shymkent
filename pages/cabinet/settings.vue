<template>
   <div class="account__tabs-content active">
          <div class="account__personal-info">
            <div class="account__personal-info-img-wrapper">
              <div class="account__personal-info-img" :style="'background-image: url('+getImages(this.$auth.user.user.image)+');'"></div>
              <div class="account__personal-info-btns-wrapper">
                <div class="input__wrapper">
                  <form @submit.prevent="uploadPhoto" enctype="multipart/form-data">
                    <v-file-input
                      accept="image/*"
                      placeholder="Загрузить новое фото"
                      prepend-icon="mdi-camera"
                      label="Фото"
                      @change="uploadImg"
                    ></v-file-input>
                    <button type="submit" class="input__file-button">
                      <span class="input__file-icon-wrapper"></span>
                      <span class="input__file-button-text">Загрузить новое фото</span>
                    </button>
                  </form>
                </div>
                <button class="account__personal-info-btn">
                  <span>Удалить фото профиля</span>
                </button>
              </div>
            </div>
            <div class="account__personal-info-content">
              <h3 class="account__personal-info-content-title">
                Персональная информация
              </h3>
              <form @submit.prevent="submit" class="account__personal-info-form">
                <div class="account__personal-info-form-inner">
                  <div class="account__personal-info-form-item">
                    <label>ФИО</label>
                    <input v-model="form.name" type="text" class="account__personal-info-input" :placeholder="this.$auth.user.user.name">
                    <div v-if="errors.name">
                      <span class="error--text v-size--small" v-for="(err,i) in errors.name" :key="i">{{err}}</span>
                    </div>
                  </div>
                  <div class="account__personal-info-form-item">
                    <label>Номер телефона</label>
                    <input v-model="form.phone" type="number" class="account__personal-info-input" :placeholder="this.$auth.user.user.phone">
                    <div v-if="errors.phone">
                      <span class="error--text v-size--small" v-for="(err,i) in errors.phone" :key="i">{{err}}</span>
                    </div>
                  </div>

                  <div class="account__personal-info-form-item">
                    <label>E-mail</label>
                    <input v-model="form.email" type="email" class="account__personal-info-input" :placeholder="this.$auth.user.user.email">
                    <div v-if="errors.email">
                      <span class="error--text v-size--small" v-for="(err,i) in errors.email" :key="i">{{err}}</span>
                    </div>
                  </div>

                  <div class="account__personal-info-form-item">
                    <label>Пароль</label>
                    <input v-model="form.password" type="password" class="account__personal-info-input" placeholder="Введите новый пароль">
                    <div v-if="errors.password">
                      <span class="error--text v-size--small" v-for="(err,i) in errors.password" :key="i">{{err}}</span>
                    </div>

                  </div>
                </div>
                <button type="submit" class="account__personal-info-form-btn">Сохранить изменения</button>
              </form>
            </div>
          </div>
        </div>
</template>

<script>
export default {
  name: "index",
  middleware: 'auth',
  layout: 'cabinet',
  data(){
    return{
      form: {
        name: this.$auth.user.user.name,
        phone: this.$auth.user.user.phone,
        email: this.$auth.user.user.email,
        password: this.$auth.user.user.password,
        id: this.$auth.user.user.id,
        image: ''
      },

      errors: []
    }
  },
  methods:{
    getImages(data){
      return this.$store.state.image.image + data ;
    },
    async submit() {
      try {
        this.$toast.show('Updating in...')
        await this.$axios.$put("/cabinet/update-info", this.form).then((response) => {
          this.$toast.success('Успешно обновлена')
          this.errors = []
          window.location.reload()
        }).catch(({response}) => {
          this.errors = response.data.errors
        })
      } catch (e) {
        this.$toast.error('Error')
          console.log(e)
      }
    },
    async uploadPhoto() {
      try {
        const formData = new FormData();
        Object.keys(this.form).forEach((key) => {
          if(this.form[key] != null){
            formData.append(key, this.form[key])
          }
        })
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        await this.$axios.$post('/cabinet/update-photo', formData, config).then(async (e) => {
          this.$toast.success('Фото успешно добавлено')
          window.location.reload()
        }).catch(error => {
          this.errors = error.response.data
        })
      }
      catch (e) {
        console.log(e)
      }
    },
    uploadImg(e){
      this.form.image = e;
    },
  },

}
</script>

<style scoped>

</style>

<template>
  <section class="authorization">
    <div class="container">
      <ul class="crumbs">
        <li class="crumbs__item">
          <NuxtLink to="/">{{ $t('main') }}</NuxtLink>
        </li>
        <li class="crumbs__item current">
          <NuxtLink to="#">{{ $t('register') }}</NuxtLink>
        </li>
      </ul>
      <div class="authorization__box">
        <NuxtLink to="/" class="authorization__box-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="9.318" height="4.985" viewBox="0 0 9.318 4.985"><g transform="translate(-6.4 -33.4)"><path d="M15.623,33.5a.329.329,0,0,0-.466,0l-4.094,4.1-4.1-4.1a.329.329,0,0,0-.466.466l4.326,4.326a.321.321,0,0,0,.233.1.335.335,0,0,0,.233-.1l4.326-4.326A.323.323,0,0,0,15.623,33.5Z" transform="translate(0)"/></g></svg>
          {{ $t('back') }}
        </NuxtLink>
        <img src="/images/logo.png" alt="" class="authorization__box-img">
        <h4 class="authorization__box-title">
          {{ $t('register') }}
        </h4>
        <form class="authorization__box-form" @submit.prevent="submit">
          <input v-model="form.name" type="text" class="authorization__box-input" placeholder="ФИО *">
          <div v-if="fails.name">
                <span class="error--text v-size--small" v-for="(err,i) in fails.name" :key="i">{{err}}</span>
              </div>
          <input v-model="form.email" type="email" class="authorization__box-input" placeholder="Email *">
          <div v-if="fails.email">
                <span class="error--text v-size--small" v-for="(err,i) in fails.email" :key="i">{{err}}</span>
              </div>
          <input v-model="form.phone" type="number" class="authorization__box-input" placeholder="+7 (777) 777 77 77">
          <div class="authorization__box-note">
            {{$t('register_input')}}
          </div>
          <input v-model="form.password" type="password" class="authorization__box-input" placeholder="Пароль *">
          <div v-if="fails.password">
            <span class="error--text v-size--small" v-for="(err,i) in fails.password" :key="i">{{err}}</span>
          </div>
          <div class="authorization__box-note">
            * {{$t('required')}}
          </div>
          <div class="authorization__box-checkbox-inner">
            <div class="authorization__box-checkbox">
              <input @click="roles(3)" type="radio" name="role_id" id="reg1">
              <label class="authorization__box-label" for="reg1">{{ $t('register_role_user') }}</label>
            </div>
            <div class="authorization__box-checkbox">
              <input @click="roles(4)" type="radio" name="role_id" id="reg2">
              <label class="authorization__box-label" for="reg2">{{ $t('register_role_guide') }}</label>
            </div>
            <div class="authorization__box-checkbox">
              <input @click="roles(5)" type="radio" name="role_id" id="reg3">
              <label class="authorization__box-label" for="reg3">{{ $t('register_role_agency') }}</label>
            </div>
            <div class="authorization__box-checkbox">
              <input @click="roles(6)" type="radio" name="role_id" id="reg5">
              <label class="authorization__box-label" for="reg5">{{ $t('register_role_craft') }}</label>
            </div>
            <div class="authorization__box-checkbox">
              <input @click="roles(7)" type="radio" name="role_id" id="reg4">
              <label class="authorization__box-label" for="reg4">{{ $t('register_role_craftman') }}</label>
            </div>
          </div>
          <input v-model="form.title_kz" type="text" :class="'authorization__box-input '+this.d_none" placeholder="Наименование на каз *">
          <div v-if="fails.title_kz" :class="d_none">
                <span class="error--text v-size--small" v-for="(err,i) in fails.title_kz" :key="i">{{err}}</span>
              </div>
          <input v-model="form.title_ru" type="text" :class="'authorization__box-input '+this.d_none" placeholder="Наименование на рус *">
          <div v-if="fails.title_ru" :class="d_none">
                <span class="error--text v-size--small" v-for="(err,i) in fails.title_ru" :key="i">{{err}}</span>
              </div>
          <input v-model="form.title_en" type="text" :class="'authorization__box-input '+this.d_none" placeholder="Наименование на анг *">
          <div v-if="fails.title_en" :class="d_none">
                <span class="error--text v-size--small" v-for="(err,i) in fails.title_en" :key="i">{{err}}</span>
              </div>
          <button class="authorization__box-form-btn" type="submit">
            {{ $t('register_btn') }}
          </button>
          <div class="authorization__box-polit">
            <NuxtLink to="/privacystatement">{{$t('register_text')}}</NuxtLink>
          </div>
        </form>
        <div class="authorization__box-question">
          {{$t('register_message')}} <NuxtLink to="/login">{{ $t('login_btn') }}</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "register",
  middleware: 'guest',
  data(){
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        password: '',
        role_id: '',
        title_kz: '',
        title_ru: '',
        title_en: ''
      },
      d_none: 'd-none',
      fails: []
    }
  },
  methods: {
    roles(i){
      switch(i) {
        case 3:
          this.form.role_id = 3
          this.d_none = 'd-none'
          this.form.title_kz = this.form.name
          this.form.title_ru = this.form.name
          this.form.title_en = this.form.name
          break
        case 4:
          this.form.role_id = 4
          this.d_none = 'd-none'
          this.form.title_kz = this.form.name
          this.form.title_ru = this.form.name
          this.form.title_en = this.form.name
          break
        case 5:
          this.form.role_id = 5
          this.d_none = ''
          break
        case 6:
          this.form.role_id = 6
          this.d_none = ''
          break
        case 7:
          this.form.role_id = 7
          this.d_none = 'd-none'
          this.form.title_kz = this.form.name
          this.form.title_ru = this.form.name
          this.form.title_en = this.form.name
          break
        default:
          this.form.role_id = 3
          this.form.title_kz = ''
          this.form.title_ru = ''
          this.form.title_en = ''
          this.d_none = 'd-none'
          break
      }
    },
    async submit() {
      // console.log(this.form)
      await this.$axios.$post('register', this.form)
        .then(data => {
          try {
            this.$auth.loginWith("local", {
              data: {
                email: this.form.email,
                password: this.form.password
              }
            })

          } catch (e) {
            console.log(e)
          }
          this.$router.push({
            path: this.$route.query.redirect || "/cabinet"
          })
          // console.log(data);
        })
        .catch(({response}) => {
          console.log(response)
          this.fails = response.data.errors
        });
    }
  }
}
</script>

<style scoped>

</style>

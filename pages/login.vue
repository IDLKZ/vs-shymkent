<template>
  <section class="authorization">
    <div class="container">
      <ul class="crumbs">
        <li class="crumbs__item">
          <NuxtLink to="/">{{ $t('main') }}</NuxtLink>
        </li>
        <li class="crumbs__item">
          <NuxtLink to="#">{{ $t('auth') }}</NuxtLink>
        </li>
        <li class="crumbs__item current">
          <NuxtLink to="#">{{ $t('login') }}</NuxtLink>
        </li>
      </ul>
      <div class="authorization__box">
        <NuxtLink to="/" class="authorization__box-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="9.318" height="4.985" viewBox="0 0 9.318 4.985"><g transform="translate(-6.4 -33.4)"><path d="M15.623,33.5a.329.329,0,0,0-.466,0l-4.094,4.1-4.1-4.1a.329.329,0,0,0-.466.466l4.326,4.326a.321.321,0,0,0,.233.1.335.335,0,0,0,.233-.1l4.326-4.326A.323.323,0,0,0,15.623,33.5Z" transform="translate(0)"/></g></svg>
          {{ $t('back') }}
        </NuxtLink>
        <img src="/images/logo.png" alt="" class="authorization__box-img">
        <h4 class="authorization__box-title">
          {{ $t('login') }}
        </h4>
        <form @submit.prevent="submit" ref="form" class="authorization__box-form">
          <input v-model="form.email" name="email" type="email" class="authorization__box-input" placeholder="E-mail">
          <input v-model="form.password" name="password" type="password" class="authorization__box-input" placeholder="Пароль">
          <NuxtLink to="/forget" class="authorization__box-form-link">
            Забыли cвой пароль?
          </NuxtLink>
          <button style="color:white!important;" class="authorization__box-form-btn" type="submit">
            {{ $t('log_in') }}
          </button>
        </form>
        <div class="authorization__box-question">
          {{ $t('login_message') }} <NuxtLink to="/register">{{ $t('register_button') }}</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "login",
  middleware: ['guest'],
  data(){
    return{
      form:{
        email:"",
        password:""
      }
    }
  },
  methods: {
    async submit() {
      try {
        this.$toast.show(this.$t('notification_logging_in'))
        await this.$auth.loginWith("local", {
          data: this.form
        })
        this.$toast.success(this.$t('notification_success_auth'))
      } catch (e) {
        this.$toast.error(this.$t('notification_error_auth'))
        return console.log(e);
      }
      this.$router.push({
        path: this.$route.query.redirect || "/cabinet"
      })
    }
  }
}
</script>

<style scoped>

</style>

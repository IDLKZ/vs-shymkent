<template>
  <section class="authorization">
    <div class="container">
      <ul class="crumbs">
        <li class="crumbs__item">
          <NuxtLink to="/">Забыли пароль?</NuxtLink>
        </li>
        <li class="crumbs__item">
          <NuxtLink to="#">{{ $t('auth') }}</NuxtLink>
        </li>
        <li class="crumbs__item current">
          <NuxtLink to="#">Забыл пароль</NuxtLink>
        </li>
      </ul>
      <div class="authorization__box">
        <NuxtLink to="/login" class="authorization__box-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="9.318" height="4.985" viewBox="0 0 9.318 4.985"><g transform="translate(-6.4 -33.4)"><path d="M15.623,33.5a.329.329,0,0,0-.466,0l-4.094,4.1-4.1-4.1a.329.329,0,0,0-.466.466l4.326,4.326a.321.321,0,0,0,.233.1.335.335,0,0,0,.233-.1l4.326-4.326A.323.323,0,0,0,15.623,33.5Z" transform="translate(0)"/></g></svg>
          {{ $t('back') }}
        </NuxtLink>
        <img src="/images/logo.png" alt="" class="authorization__box-img">
        <h4 class="authorization__box-title">
          Восстановление доступа
        </h4>
        <form @submit.prevent="submit" ref="form" class="authorization__box-form">
          <input required v-model="form.email" name="email" type="email" class="authorization__box-input" placeholder="E-mail">
          <template v-if="fails.email !== undefined">
            <small class="red--text text-left" v-for="message in fails.email" :key="message">
              {{message}}
            </small>
          </template>

          <input v-model="form.password" name="password" type="password" class="authorization__box-input" placeholder="Пароль">
          <template v-if="fails.password !== undefined">
            <small class="red--text text-left" v-for="message in fails.password" :key="message">
              {{message}}
            </small>
          </template>
          <input v-model="form.same_password" name="same_password" type="password" class="authorization__box-input" placeholder="Повторите Пароль">
          <template v-if="fails.same_password !== undefined">
            <small class="red--text text-left" v-for="message in fails.same_password" :key="message">
              {{message}}
            </small>
          </template>
          <input v-model="form.code" name="code" type="text" class="authorization__box-input" placeholder="Ключ для сброса пароля">
          <template v-if="fails.code !== undefined">
            <small class="red--text text-left" v-for="message in fails.code" :key="message">
              {{message}}
            </small>
          </template>
          <NuxtLink to="/forget" class="authorization__box-form-link">
            Выслать новый ключ
          </NuxtLink>
          <NuxtLink to="/login" class="authorization__box-form-link">
             Вход
          </NuxtLink>
          <button class="authorization__box-form-btn" type="submit">
            Изменить пароль!
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
  name: "forget",
  middleware: ['guest'],
  data(){
    return{
      form:{
        email:"",
        password:"",
        same_password:"",
        code:""
      },
      fails:[]
    }
  },
  methods: {
    async submit() {
      try {
        this.$toast.show('Сбрасываем пароль и создаем новый...')
        await this.$axios.$post("/resetPassword", this.form)
          .then(e=>{
            this.$toast.success('Успешно изменили пароль!');
            this.$router.push("/login");
          })
        .catch(({response})=>{
          this.$toast.error("Упс возникла ошибка!");
          this.fails = response.data.errors;
          if(this.fails.expired !== undefined){
            this.$toast.error(this.fails.expired[0]);
          }
        })
      } catch (e) {
        this.$toast.error('Упс, что-то пошло не так')
      }
    }
  }
}
</script>

<style scoped>

</style>


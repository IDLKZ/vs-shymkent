<template>
  <section class="authorization">
    <div class="container">
      <ul class="crumbs">
        <li class="crumbs__item">
          <NuxtLink to="/">Главная</NuxtLink>
        </li>
        <li class="crumbs__item current">
          <NuxtLink to="#">Регистрация</NuxtLink>
        </li>
      </ul>
      <div class="authorization__box">
        <a href="#" class="authorization__box-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="9.318" height="4.985" viewBox="0 0 9.318 4.985"><g transform="translate(-6.4 -33.4)"><path d="M15.623,33.5a.329.329,0,0,0-.466,0l-4.094,4.1-4.1-4.1a.329.329,0,0,0-.466.466l4.326,4.326a.321.321,0,0,0,.233.1.335.335,0,0,0,.233-.1l4.326-4.326A.323.323,0,0,0,15.623,33.5Z" transform="translate(0)"/></g></svg>
          Назад
        </a>
        <img src="/images/logo.png" alt="" class="authorization__box-img">
        <h4 class="authorization__box-title">
          Регистрация
        </h4>
        <form action="" class="authorization__box-form">
          <input type="text" class="authorization__box-input" placeholder="Имя *">
          <input type="text" class="authorization__box-input" placeholder="Фамилия *">
          <input type="number" class="authorization__box-input" placeholder="+7 (777) 777 77 77">
          <div class="authorization__box-note">
            Необходим для покупки билетов и сувениров
          </div>
          <input type="password" class="authorization__box-input" placeholder="Пароль *">
          <input type="password" class="authorization__box-input" placeholder="Подтверждение пароля *">
          <div class="authorization__box-note">
            * обязательно для заполнения
          </div>
          <div class="authorization__box-checkbox-inner">
            <div class="authorization__box-checkbox">
              <input type="checkbox" id="reg1">
              <label class="authorization__box-label" for="reg1">Хочу писать в блоги</label>
            </div>
            <div class="authorization__box-checkbox">
              <input type="checkbox" id="reg2">
              <label class="authorization__box-label" for="reg2">Хочу предлагать мероприятия для публикации</label>
            </div>
          </div>
          <button class="authorization__box-form-btn" type="submit">
            Зарегистрироваться
          </button>
          <div class="authorization__box-polit">
            Продолжая, вы принимаете наше <a href="#">Пользовательское соглашение</a> и <a href="#">Политику конфиденциальности</a>
          </div>
        </form>
        <div class="authorization__box-question">
          У вас уже есть аккаунт? <NuxtLink to="/login">Авторизуйтесь</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "register"
}
</script>

<style scoped>

</style>

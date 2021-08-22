<template>
   <div class="account__tabs-content active">
          <div class="account__personal-info">
            <div>
              <div class="account__personal-info-img-wrapper">
                <div class="account__personal-info-img" :style="'background-image: url('+getImages(form.image)+');'"></div>
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
                        <span class="input__file-button-text">Загрузить личное фото</span>
                      </button>
                    </form>
                  </div>
                  <!--                <button class="account__personal-info-btn">-->
                  <!--                  <span>Удалить фото профиля</span>-->
                  <!--                </button>-->
                </div>
              </div>
              <div class="account__personal-info-img-wrapper">
                <div class="account__personal-info-img" :style="'background-image: url('+getImages(photo)+');'"></div>
                <div class="account__personal-info-btns-wrapper">
                  <div class="input__wrapper">
                    <form @submit.prevent="uploadImageCompany" enctype="multipart/form-data">
                      <v-file-input
                        accept="image/*"
                        placeholder="Загрузить фото компании"
                        prepend-icon="mdi-camera"
                        label="Фото"
                        @change="uploadPhotoCompany"
                      ></v-file-input>
                      <button type="submit" class="input__file-button">
                        <span class="input__file-icon-wrapper"></span>
                        <span class="input__file-button-text">Загрузить фото компании</span>
                      </button>
                    </form>
                  </div>
                  <!--                <button class="account__personal-info-btn">-->
                  <!--                  <span>Удалить фото профиля</span>-->
                  <!--                </button>-->
                </div>
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
                    <input v-model="form.name" type="text" class="account__personal-info-input" :placeholder="form.name">
                    <div v-if="fails.name">
                      <span class="error--text v-size--small" v-for="(err,i) in fails.name" :key="i">{{err}}</span>
                    </div>
                  </div>
                  <div class="account__personal-info-form-item">
                    <label>Номер телефона</label>
                    <input v-model="form.phone" type="number" class="account__personal-info-input" :placeholder="form.phone">
                    <div v-if="fails.phone">
                      <span class="error--text v-size--small" v-for="(err,i) in fails.phone" :key="i">{{err}}</span>
                    </div>
                  </div>

                  <div class="account__personal-info-form-item">
                    <label>E-mail</label>
                    <input v-model="form.email" type="email" class="account__personal-info-input" :placeholder="form.email">
                    <div v-if="fails.email">
                      <span class="error--text v-size--small" v-for="(err,i) in fails.email" :key="i">{{err}}</span>
                    </div>
                  </div>

                  <div class="account__personal-info-form-item">
                    <label>Пароль</label>
                    <input v-model="form.password" type="password" class="account__personal-info-input" placeholder="Введите новый пароль">
                    <div v-if="fails.password">
                      <span class="error--text v-size--small" v-for="(err,i) in fails.password" :key="i">{{err}}</span>
                    </div>

                  </div>
                </div>
                <button type="submit" class="account__personal-info-form-btn" style="color: white!important;">Сохранить изменения</button>
              </form>

              <div class="account__personal-info-content">
                <h3 class="account__personal-info-content-title">
                  Информация о деятельности
                  <v-tooltip bottom v-if="!person.status">
                    <template v-slot:activator="{ on, attrs }">
                      <span
                        v-bind="attrs"
                        v-on="on"
                        class="red--text"
                        style="font-size: 14px"
                      >(Не подтвержден)</span>
                    </template>
                    <span>Чтоб подтвердить аккаунт обратитесь к администратору сайта!</span>
                  </v-tooltip>
                  <span v-if="person.status" class="green--text" style="font-size: 14px">(Подтвержден)</span>
                </h3>
                <form @submit.prevent="updateGuide" v-if="this.$auth.user.user.role_id === 4">
                  <div class="account__personal-info-form-inner__cabinet">
                    <div class="account__personal-info-form-item">
                      <label>Знание языков</label>
                      <v-combobox
                        v-model="guide.languages"
                        :items="languages"
                        clearable
                        hide-selected
                        multiple
                        persistent-hint
                        small-chips
                      >
                      </v-combobox>
                    </div>
                    <div class="account__personal-info-form-item">
                      <label>Описание на казахском</label>
                      <ckeditor :editor="editor" v-model="guide.description_kz"></ckeditor>
                      <div v-if="fails.description_kz">
                        <span class="error--text v-size--small" v-for="(err,i) in fails.description_kz" :key="i">{{err}}</span>
                      </div>
                    </div>
                    <div class="account__personal-info-form-item">
                      <label>Описание на русском</label>
                      <ckeditor :editor="editor" v-model="guide.description_ru"></ckeditor>
                      <div v-if="fails.description_ru">
                        <span class="error--text v-size--small" v-for="(err,i) in fails.description_ru" :key="i">{{err}}</span>
                      </div>
                    </div>
                    <div class="account__personal-info-form-item">
                      <label>Описание на английском</label>
                      <ckeditor :editor="editor" v-model="guide.description_en"></ckeditor>
                      <div v-if="fails.description_en">
                        <span class="error--text v-size--small" v-for="(err,i) in fails.description_en" :key="i">{{err}}</span>
                      </div>
                    </div>
                    <div class="account__personal-info-form-item">
                      <label>Образование (на каз)</label>
                      <ckeditor :editor="editor" v-model="guide.education_kz"></ckeditor>
                      <div v-if="fails.education_kz">
                        <span class="error--text v-size--small" v-for="(err,i) in fails.education_kz" :key="i">{{err}}</span>
                      </div>
                    </div>
                    <div class="account__personal-info-form-item">
                      <label>Образование (на рус)</label>
                      <ckeditor :editor="editor" v-model="guide.education_ru"></ckeditor>
                      <div v-if="fails.education_ru">
                        <span class="error--text v-size--small" v-for="(err,i) in fails.education_ru" :key="i">{{err}}</span>
                      </div>
                    </div>
                    <div class="account__personal-info-form-item">
                      <label>Образование (на анг)</label>
                      <ckeditor :editor="editor" v-model="guide.education_en"></ckeditor>
                      <div v-if="fails.education_en">
                        <span class="error--text v-size--small" v-for="(err,i) in fails.education_en" :key="i">{{err}}</span>
                      </div>
                    </div>
                    <div class="account__personal-info-form-item">
                      <label>Контактные данные</label>
                      <v-combobox
                        v-model="guide.phone"
                        :items="guide.phone"
                        clearable
                        hide-selected
                        multiple
                        persistent-hint
                        small-chips
                      >
                      </v-combobox>
                    </div>
                    <div class="account__personal-info-form-item">
                      <label>Соц.сети</label>
                      <v-combobox
                        v-model="guide.social_networks"
                        :items="guide.social_networks"
                        clearable
                        hide-selected
                        multiple
                        persistent-hint
                        small-chips
                      >
                      </v-combobox>
                    </div>
                    <div class="account__personal-info-form-item">
                      <label>Веб-сайт</label>
                      <v-combobox
                        v-model="guide.sites"
                        :items="guide.sites"
                        clearable
                        hide-selected
                        multiple
                        persistent-hint
                        small-chips
                      >
                      </v-combobox>
                    </div>
                  </div>
                  <button type="submit" class="account__personal-info-form-btn" style="color: white!important;">Сохранить изменения</button>
                </form>
                <form @submit.prevent="updateAgency" v-if="this.$auth.user.user.role_id === 5">
                  <div class="account__personal-info-form-inner__cabinet">
                    <div class="account__personal-info-form-item">
                      <label>Наименование</label>
                      <input v-model="agency.title" type="text" class="account__personal-info-input" :placeholder="agency.title">
                      <div v-if="fails.title">
                        <span class="error--text v-size--small" v-for="(err,i) in fails.title" :key="i">{{err}}</span>
                      </div>
                    </div>
                    <div class="account__personal-info-form-item">
                      <label>Описание на казахском</label>
                      <ckeditor :editor="editor" v-model="agency.description_kz"></ckeditor>
                      <div v-if="fails.description_kz">
                        <span class="error--text v-size--small" v-for="(err,i) in fails.description_kz" :key="i">{{err}}</span>
                      </div>
                    </div>
                    <div class="account__personal-info-form-item">
                      <label>Описание на русском</label>
                      <ckeditor :editor="editor" v-model="agency.description_ru"></ckeditor>
                      <div v-if="fails.description_ru">
                        <span class="error--text v-size--small" v-for="(err,i) in fails.description_ru" :key="i">{{err}}</span>
                      </div>
                    </div>
                    <div class="account__personal-info-form-item">
                      <label>Описание на английском</label>
                      <ckeditor :editor="editor" v-model="agency.description_en"></ckeditor>
                      <div v-if="fails.description_en">
                        <span class="error--text v-size--small" v-for="(err,i) in fails.description_en" :key="i">{{err}}</span>
                      </div>
                    </div>
                    <div class="account__personal-info-form-item">
                      <label>Контактные данные</label>
                      <v-combobox
                        v-model="agency.phone"
                        :items="agency.phone"
                        clearable
                        hide-selected
                        multiple
                        persistent-hint
                        small-chips
                      >
                      </v-combobox>
                    </div>
                    <div class="account__personal-info-form-item">
                      <label>Соц.сети</label>
                      <v-combobox
                        v-model="agency.social_networks"
                        :items="agency.social_networks"
                        clearable
                        hide-selected
                        multiple
                        persistent-hint
                        small-chips
                      >
                      </v-combobox>
                    </div>
                    <div class="account__personal-info-form-item">
                      <label>Веб-сайт</label>
                      <v-combobox
                        v-model="agency.sites"
                        :items="agency.sites"
                        clearable
                        hide-selected
                        multiple
                        persistent-hint
                        small-chips
                      >
                      </v-combobox>
                    </div>
                    <div class="account__personal-info-form-item">
                      <label>Адрес</label>
                      <input v-model="agency.address" type="text" class="account__personal-info-input" :placeholder="agency.address">
                      <div v-if="fails.address">
                        <span class="error--text v-size--small" v-for="(err,i) in fails.address" :key="i">{{err}}</span>
                      </div>
                    </div>
                  </div>
                  <button type="submit" class="account__personal-info-form-btn" style="color: white!important;">Сохранить изменения</button>
                </form>
                <form @submit.prevent="updateCraft" v-if="this.$auth.user.user.role_id === 6">
                  <div class="account__personal-info-form-inner__cabinet">
                    <div class="account__personal-info-form-item">
                      <label>Наименование</label>
                      <input v-model="craft.title" type="text" class="account__personal-info-input" :placeholder="craft.title">
                      <div v-if="fails.title">
                        <span class="error--text v-size--small" v-for="(err,i) in fails.title" :key="i">{{err}}</span>
                      </div>
                    </div>
                    <div class="account__personal-info-form-item">
                      <label>Описание на казахском</label>
                      <ckeditor :editor="editor" v-model="craft.description_kz"></ckeditor>
                      <div v-if="fails.description_kz">
                        <span class="error--text v-size--small" v-for="(err,i) in fails.description_kz" :key="i">{{err}}</span>
                      </div>
                    </div>
                    <div class="account__personal-info-form-item">
                      <label>Описание на русском</label>
                      <ckeditor :editor="editor" v-model="craft.description_ru"></ckeditor>
                      <div v-if="fails.description_ru">
                        <span class="error--text v-size--small" v-for="(err,i) in fails.description_ru" :key="i">{{err}}</span>
                      </div>
                    </div>
                    <div class="account__personal-info-form-item">
                      <label>Описание на английском</label>
                      <ckeditor :editor="editor" v-model="craft.description_en"></ckeditor>
                      <div v-if="fails.description_en">
                        <span class="error--text v-size--small" v-for="(err,i) in fails.description_en" :key="i">{{err}}</span>
                      </div>
                    </div>
                    <div class="account__personal-info-form-item">
                      <label>Контактные данные</label>
                      <v-combobox
                        v-model="craft.phone"
                        :items="craft.phone"
                        clearable
                        hide-selected
                        multiple
                        persistent-hint
                        small-chips
                      >
                      </v-combobox>
                    </div>
                    <div class="account__personal-info-form-item">
                      <label>Соц.сети</label>
                      <v-combobox
                        v-model="craft.social_networks"
                        :items="craft.social_networks"
                        clearable
                        hide-selected
                        multiple
                        persistent-hint
                        small-chips
                      >
                      </v-combobox>
                    </div>
                    <div class="account__personal-info-form-item">
                      <label>Веб-сайт</label>
                      <v-combobox
                        v-model="craft.sites"
                        :items="craft.sites"
                        clearable
                        hide-selected
                        multiple
                        persistent-hint
                        small-chips
                      >
                      </v-combobox>
                    </div>
                    <div class="account__personal-info-form-item">
                      <label>Адрес</label>
                      <input v-model="craft.address" type="text" class="account__personal-info-input" :placeholder="craft.address">
                      <div v-if="fails.address">
                        <span class="error--text v-size--small" v-for="(err,i) in fails.address" :key="i">{{err}}</span>
                      </div>
                    </div>
                  </div>
                  <button type="submit" class="account__personal-info-form-btn" style="color: white!important;">Сохранить изменения</button>
                </form>
                <form @submit.prevent="updateCraftman" v-if="this.$auth.user.user.role_id === 7">
                  <div class="account__personal-info-form-inner__cabinet">
                    <div class="account__personal-info-form-item">
                      <label>Описание на казахском</label>
                      <ckeditor :editor="editor" v-model="craftman.description_kz"></ckeditor>
                      <div v-if="fails.description_kz">
                        <span class="error--text v-size--small" v-for="(err,i) in fails.description_kz" :key="i">{{err}}</span>
                      </div>
                    </div>
                    <div class="account__personal-info-form-item">
                      <label>Описание на русском</label>
                      <ckeditor :editor="editor" v-model="craftman.description_ru"></ckeditor>
                      <div v-if="fails.description_ru">
                        <span class="error--text v-size--small" v-for="(err,i) in fails.description_ru" :key="i">{{err}}</span>
                      </div>
                    </div>
                    <div class="account__personal-info-form-item">
                      <label>Описание на английском</label>
                      <ckeditor :editor="editor" v-model="craftman.description_en"></ckeditor>
                      <div v-if="fails.description_en">
                        <span class="error--text v-size--small" v-for="(err,i) in fails.description_en" :key="i">{{err}}</span>
                      </div>
                    </div>
                    <div class="account__personal-info-form-item">
                      <label>Контактные данные</label>
                      <v-combobox
                        v-model="craftman.phone"
                        :items="craftman.phone"
                        clearable
                        hide-selected
                        multiple
                        persistent-hint
                        small-chips
                      >
                      </v-combobox>
                    </div>
                    <div class="account__personal-info-form-item">
                      <label>Соц.сети</label>
                      <v-combobox
                        v-model="craftman.social_networks"
                        :items="craftman.social_networks"
                        clearable
                        hide-selected
                        multiple
                        persistent-hint
                        small-chips
                      >
                      </v-combobox>
                    </div>
                    <div class="account__personal-info-form-item">
                      <label>Веб-сайт</label>
                      <v-combobox
                        v-model="craftman.sites"
                        :items="craftman.sites"
                        clearable
                        hide-selected
                        multiple
                        persistent-hint
                        small-chips
                      >
                      </v-combobox>
                    </div>
                  </div>
                  <button type="submit" class="account__personal-info-form-btn" style="color: white!important;">Сохранить изменения</button>
                </form>
              </div>
            </div>
          </div>
        </div>
</template>

<script>
let ClassicEditor
let CKEditor

if (process.client) {
  ClassicEditor = require('@ckeditor/ckeditor5-build-classic')
  CKEditor = require('@ckeditor/ckeditor5-vue2')
} else {
  CKEditor = { component : {template:'<div></div>'}}
}
export default {
  name: "index",
  middleware: 'auth',
  layout: 'cabinet',
  components: {
    ckeditor: CKEditor.component
  },
  data(){
    return{
      editor: ClassicEditor,
      languages: ['казахский', 'русский', 'английский'],
      fails: []
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
          this.fails = []
          window.location.reload()
        }).catch(({response}) => {
          this.fails = response.data.errors
        })
      } catch (e) {
        this.$toast.error('Error')
          console.log(e)
      }
    },
    async updateAgency() {
      try {
        this.$toast.show('Updating in...')
        await this.$axios.$put("/cabinet/update-agency", this.agency).then((response) => {
          this.$toast.success('Успешно обновлена')
          this.fails = []
        }).catch(({response}) => {
          this.fails = response.data.errors
        })
      } catch (e) {
        this.$toast.error('Error')
        console.log(e)
      }
    },
    async updateGuide() {
      try {
        this.$toast.show('Updating in...')
        await this.$axios.$put("/cabinet/update-guide", this.guide).then((response) => {
          this.$toast.success('Успешно обновлена')
          this.fails = []
        }).catch(({response}) => {
          this.fails = response.data.errors
        })
      } catch (e) {
        this.$toast.error('Error')
        console.log(e)
      }
    },
    async updateCraft() {
      try {
        this.$toast.show('Updating in...')
        await this.$axios.$put("/cabinet/update-craft", this.craft).then((response) => {
          this.$toast.success('Успешно обновлена')
          this.fails = []
        }).catch(({response}) => {
          this.fails = response.data.errors
        })
      } catch (e) {
        this.$toast.error('Error')
        console.log(e)
      }
    },
    async updateCraftman() {
      try {
        this.$toast.show('Updating in...')
        await this.$axios.$put("/cabinet/update-craftman", this.craftman).then((response) => {
          this.$toast.success('Успешно обновлена')
          this.fails = []
        }).catch(({response}) => {
          this.fails = response.data.errors
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
          this.form.image = e
          // window.location.reload()
        }).catch(error => {
          this.fails = error.response.data
        })
      }
      catch (e) {
        console.log(e)
      }
    },
    async uploadImageCompany() {
      try {
        const formData = new FormData();
            formData.append('photo', this.photo)
            formData.append('role_id', this.$auth.user.user.role_id)
            formData.append('user_id', this.$auth.user.user.id)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        await this.$axios.$post('/cabinet/update-photo-company', formData, config).then(async (e) => {
          this.$toast.success('Фото успешно добавлено')
          this.photo = e
          // window.location.reload()
        }).catch(error => {
          this.fails = error.response.data
        })
      }
      catch (e) {
        console.log(e)
      }
    },
    uploadImg(e){
      this.form.image = e;
    },
    uploadPhotoCompany(e){
      this.photo = e;
    },
  },
  async asyncData({$axios}) {
    let person = [];
    let form = {};
    let guide = {};
    let agency = {};
    let craft = {};
    let craftman = {};
    let photo = '';
    try{
      await $axios.$get("/cabinet/user").then((e)=>{
        form.name = e.name
        form.phone = e.phone
        form.email = e.email
        form.password = e.password
        form.id = e.id
        form.image = e.image
        if (e.role_id === 4 || e.role_id === 5){
          person = e.organizators[0]
          photo = person.image
          switch (person.role_id){
            case 4:
              guide.description_kz = person.description_kz
              guide.description_ru = person.description_ru
              guide.description_en = person.description_en
              guide.languages = person.languages
              guide.education_kz = person.education_kz
              guide.education_ru = person.education_ru
              guide.education_en = person.education_en
              guide.phone = person.phone ? person.phone : []
              guide.social_networks = person.social_networks ? person.social_networks : []
              guide.sites = person.sites ? person.sites : []
              guide.role_id = person.role_id
              guide.user_id = person.user_id
              break;
            case 5:
              agency.title = person.title_ru
              agency.description_kz = person.description_kz
              agency.description_ru = person.description_ru
              agency.description_en = person.description_en
              agency.phone = person.phone ? person.phone : []
              agency.social_networks = person.social_networks ? person.social_networks : []
              agency.sites = person.sites ? person.sites : []
              agency.address = person.address
              agency.role_id = person.role_id
              agency.user_id = person.user_id
                  break;
          }
        }
        if (e.role_id === 6 || e.role_id === 7){
          person = e.shops[0]
          photo = person.image
          switch (person.role_id){
            case 6:
              craft.title = person.title_ru
              craft.description_kz = person.description_kz
              craft.description_ru = person.description_ru
              craft.description_en = person.description_en
              craft.phone = person.phone ? person.phone : []
              craft.social_networks = person.social_networks ? person.social_networks : []
              craft.sites = person.sites ? person.sites : []
              craft.address = person.address
              craft.role_id = person.role_id
              craft.user_id = person.user_id
              break;
            case 7:
              craftman.title = person.title_ru
              craftman.description_kz = person.description_kz
              craftman.description_ru = person.description_ru
              craftman.description_en = person.description_en
              craftman.phone = person.phone ? person.phone : []
              craftman.social_networks = person.social_networks ? person.social_networks : []
              craftman.sites = person.sites ? person.sites : []
              craftman.role_id = person.role_id
              craftman.user_id = person.user_id
                  break;
          }
        }
      });
    }
    catch (e) {
      console.log(e);
    }
    return {person,form,guide,agency,craft,craftman,photo}
  },
  mounted() {

    // console.log(this.person)
  }
}
</script>

<style scoped>

</style>

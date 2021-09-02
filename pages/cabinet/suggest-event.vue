<template>
  <div class="account__tabs-content active">
    <div class="account__save-tabs" v-if="this.$auth.user.user.status">
      <ul class="account__save-tabs-caption">
        <li v-for="tab in tabs" :key="tab.id" :class="tab.active" @click="activeTab(tab.id)">
          {{tab.title}}
        </li>
        <!--        <li>-->
        <!--          Билеты-->
        <!--        </li>-->
        <button class="account__save-tabs-btn" @click="activeTrue"><span>{{ $t('cabinet_add_record') }}</span></button>
      </ul>
      <div :class="'account__save-tabs-content '+this.tabs[0].active">
        <div class="calendar__inner__cabinet" v-if="events.data.length>0">
          <div class="calendar__item" v-for="(item,i) in events.data" :key="i">
            <div class="calendar__item-img" :style="'background-image: url('+getImages(item.image)+');'">
              <div class="calendar__item-day" v-if="item.workdays.length>0">
                <div v-for="(day,index) in item.workdays" :key="index">
                  <span>{{ $t('date') }} </span>{{day.date_start}} - {{day.date_end}}
                </div>

              </div>
              <div class="calendar__item-time">
                <div v-for="(day,index) in item.workdays" :key="index">
                  <span>{{ $t('time') }} </span>{{day.time_start}} - {{day.time_end}}
                </div>
              </div>
            </div>
            <div class="calendar__item-inner">
              <h4 class="calendar__item-title">
                {{ item['title_'+$i18n.locale] }}
              </h4>
              <div class="calendar__item-location">
                {{ item.address }}
              </div>
              <p class="calendar__item-text" v-html="truncate(item['description_'+$i18n.locale], 50)"></p>
              <div class="calendar__btn-wrapper">
                <NuxtLink class="calendar__item-btn popup-modal" :to="'/events/' + item.alias">
                  <span>{{ $t('more_info') }}</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <div class="account__not-found" v-else>
          <svg xmlns="http://www.w3.org/2000/svg" width="50.922" height="42.435" viewBox="0 0 50.922 42.435"><g transform="translate(0 -2)"><path d="M45.618,44.435H5.3a5.31,5.31,0,0,1-5.3-5.3V24.278a1.062,1.062,0,0,1,.093-.435L8.515,5.13A5.318,5.318,0,0,1,13.352,2H37.57a5.318,5.318,0,0,1,4.838,3.13l8.421,18.714a1.062,1.062,0,0,1,.093.435V39.131a5.31,5.31,0,0,1-5.3,5.3Zm-43.5-19.93V39.131A3.187,3.187,0,0,0,5.3,42.313H45.618A3.187,3.187,0,0,0,48.8,39.131V24.505L40.472,6a3.192,3.192,0,0,0-2.9-1.876H13.352A3.191,3.191,0,0,0,10.45,6Z"/><path d="M35.38,22.609h-20.4A3.2,3.2,0,0,1,12,20.544L9.851,14.809a1.061,1.061,0,0,0-.993-.687H1.311a1.061,1.061,0,1,1,0-2.122H8.858a3.2,3.2,0,0,1,2.981,2.064L13.988,19.8a1.066,1.066,0,0,0,.993.687h20.4a1.061,1.061,0,0,0,.993-.687l2.149-5.735A3.2,3.2,0,0,1,41.5,12h8.077a1.061,1.061,0,0,1,0,2.122H41.5a1.061,1.061,0,0,0-.993.687l-2.149,5.735A3.2,3.2,0,0,1,35.38,22.609Z" transform="translate(0.28 11.217)"/></g></svg>
          <h4 class="account__not-found-text">
            <p>{{ $t('cabinet_not_write') }}.</p>
            <p>{{ $t('cabinet_message') }}</p>
          </h4>
          <div class="load-more">
            <a href="#" @click="activeTrue">{{ $t('cabinet_add_record') }}</a>
          </div>
        </div>
      </div>
      <div :class="'account__save-tabs-content '+this.tabs[1].active">
        <div class="calendar__inner__cabinet" v-if="moderation.data.length>0">
          <div class="calendar__item" v-for="(item,i) in moderation.data" :key="i">
            <div class="calendar__item-img" :style="'background-image: url('+getImages(item.image)+');'">
              <div class="calendar__item-day" v-if="item.workdays.length>0">
                <div v-for="(day,index) in item.workdays" :key="index">
                  <span>{{ $t('date') }} </span>{{day.date_start}} - {{day.date_end}}
                </div>

              </div>
              <div class="calendar__item-time">
                <div v-for="(day,index) in item.workdays" :key="index">
                  <span>{{ $t('time') }} </span>{{day.time_start}} - {{day.time_end}}
                </div>
              </div>
            </div>
            <div class="calendar__item-inner">
              <h4 class="calendar__item-title">
                {{ item['title_'+$i18n.locale] }}
              </h4>
              <div class="calendar__item-location">
                {{ item.address }}
              </div>
              <p class="calendar__item-text" v-html="truncate(item['description_'+$i18n.locale], 50)"></p>
              <div class="calendar__btn-wrapper">
                <NuxtLink class="calendar__item-btn popup-modal" :to="'/events/' + item.alias">
                  <span>{{ $t('more_info') }}</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <div class="account__not-found" v-else>
          <svg xmlns="http://www.w3.org/2000/svg" width="50.922" height="42.435" viewBox="0 0 50.922 42.435"><g transform="translate(0 -2)"><path d="M45.618,44.435H5.3a5.31,5.31,0,0,1-5.3-5.3V24.278a1.062,1.062,0,0,1,.093-.435L8.515,5.13A5.318,5.318,0,0,1,13.352,2H37.57a5.318,5.318,0,0,1,4.838,3.13l8.421,18.714a1.062,1.062,0,0,1,.093.435V39.131a5.31,5.31,0,0,1-5.3,5.3Zm-43.5-19.93V39.131A3.187,3.187,0,0,0,5.3,42.313H45.618A3.187,3.187,0,0,0,48.8,39.131V24.505L40.472,6a3.192,3.192,0,0,0-2.9-1.876H13.352A3.191,3.191,0,0,0,10.45,6Z"/><path d="M35.38,22.609h-20.4A3.2,3.2,0,0,1,12,20.544L9.851,14.809a1.061,1.061,0,0,0-.993-.687H1.311a1.061,1.061,0,1,1,0-2.122H8.858a3.2,3.2,0,0,1,2.981,2.064L13.988,19.8a1.066,1.066,0,0,0,.993.687h20.4a1.061,1.061,0,0,0,.993-.687l2.149-5.735A3.2,3.2,0,0,1,41.5,12h8.077a1.061,1.061,0,0,1,0,2.122H41.5a1.061,1.061,0,0,0-.993.687l-2.149,5.735A3.2,3.2,0,0,1,35.38,22.609Z" transform="translate(0.28 11.217)"/></g></svg>
          <h4 class="account__not-found-text">
            <p>{{ $t('cabinet_not_write') }}.</p>
            <p>{{ $t('cabinet_message') }}</p>
          </h4>
          <div class="load-more">
            <a href="#" @click="activeTrue">{{ $t('cabinet_add_record') }}</a>
          </div>
        </div>
      </div>
      <div class="account__save-tabs-content " :class="{active: active}">
        <div class="account__blog">
          <!--          <a href="#" class="account__blog-link">-->
          <!--            <svg xmlns="http://www.w3.org/2000/svg" width="9.318" height="4.985" viewBox="0 0 9.318 4.985"><g transform="translate(-6.4 -33.4)"><path d="M15.623,33.5a.329.329,0,0,0-.466,0l-4.094,4.1-4.1-4.1a.329.329,0,0,0-.466.466l4.326,4.326a.321.321,0,0,0,.233.1.335.335,0,0,0,.233-.1l4.326-4.326A.323.323,0,0,0,15.623,33.5Z" transform="translate(0)"/></g></svg>-->
          <!--            Назад-->
          <!--          </a>-->
          <h3 class="account__blog-title">
            Редактор мероприятий
          </h3>

          <form @submit.prevent="submit" enctype="multipart/form-data" class="account__blog-form">
            <div class="account__blog-item">
              <h5 class="account__blog-item-title">
                Изображение для обложки
              </h5>
              <v-file-input
                accept="image/*"
                placeholder="Загрузить новое фото"
                prepend-icon="mdi-camera"
                label="Изображение для обложки"
                @change="uploadImg"
              ></v-file-input>
              <div v-if="fails.image">
                <span class="error--text v-size--small" v-for="(err,i) in fails.image" :key="i">{{err}}</span>
              </div>
            </div>
            <div class="account__blog-item">
              <v-textarea
                counter
                label="Заголовок на казахском"
                prepend-icon="mdi-comment"
                v-model="form.title_kz"
                rows="1"
              ></v-textarea>
              <div v-if="fails.title_kz">
                <span class="error--text v-size--small" v-for="(err,i) in fails.title_kz" :key="i">{{err}}</span>
              </div>
              <v-textarea
                counter
                label="Заголовок на русском"
                prepend-icon="mdi-comment"
                v-model="form.title_ru"
                rows="1"
              ></v-textarea>
              <div v-if="fails.title_ru">
                <span class="error--text v-size--small" v-for="(err,i) in fails.title_ru" :key="i">{{err}}</span>
              </div>
              <v-textarea
                counter
                label="Заголовок на английском"
                prepend-icon="mdi-comment"
                v-model="form.title_en"
                rows="1"
              ></v-textarea>
              <div v-if="fails.title_en">
                <span class="error--text v-size--small" v-for="(err,i) in fails.title_en" :key="i">{{err}}</span>
              </div>
              <h5 class="account__blog-item-title">
                Место проведения
              </h5>
              <v-autocomplete
                chips
                clearable
                dense
                outlined
                solo
                :items="places"
                item-text="title_ru"
                item-value="id"
                v-model="form.place_id"
              ></v-autocomplete>
              <div v-if="fails.address">
                <span class="error--text v-size--small" v-for="(err,i) in fails.address" :key="i">{{err}}</span>
              </div>
            </div>
            <div class="account__blog-item__cabinet">
              <h5 class="account__blog-item-title">
                Дата проведения
              </h5>
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="form.date"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </div>
            <div class="account__blog-item__cabinet">
              <h5 class="account__blog-item-title">
                Время начала
              </h5>
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="form.time"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.time"
                    label="--:--"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="modal"
                  v-model="form.time"
                  full-width
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="modal = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog.save(form.time)"
                  >
                    OK
                  </v-btn>
                </v-time-picker>
              </v-dialog>
            </div>
            <div class="account__blog-item">
              <h5 class="account__blog-item-title">
                Описание на казахском
              </h5>
              <ckeditor :editor="editor" v-model="form.description_kz"></ckeditor>
            </div>
            <div v-if="fails.description_kz">
              <span class="error--text v-size--small" v-for="(err,i) in fails.description_kz" :key="i">{{err}}</span>
            </div>
            <div class="account__blog-item">
              <h5 class="account__blog-item-title">
                Описание на русском
              </h5>
              <ckeditor :editor="editor" v-model="form.description_ru"></ckeditor>
            </div>
            <div v-if="fails.description_ru">
              <span class="error--text v-size--small" v-for="(err,i) in fails.description_ru" :key="i">{{err}}</span>
            </div>
            <div class="account__blog-item">
              <h5 class="account__blog-item-title">
                Описание на английском
              </h5>
              <ckeditor :editor="editor" v-model="form.description_en"></ckeditor>
            </div>
            <div v-if="fails.description_en">
              <span class="error--text v-size--small" v-for="(err,i) in fails.description_en" :key="i">{{err}}</span>
            </div>
            <div class="account__blog-item">
              <v-textarea
                counter
                label="Средний чек"
                prepend-icon="mdi-comment"
                v-model="form.price"
                rows="1"
              ></v-textarea>
              <div v-if="fails.price">
                <span class="error--text v-size--small" v-for="(err,i) in fails.price" :key="i">{{err}}</span>
              </div>
            </div>
            <div class="account__blog-item">
              <button type="submit" class="button">
                Опубликовать
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="account__not-found">
        <svg xmlns="http://www.w3.org/2000/svg" width="37.547" height="33.937" viewBox="0 0 37.547 33.937"><g transform="translate(0 -24.615)"><g transform="translate(0 24.615)"><g transform="translate(0 0)"><path d="M33.575,24.615H3.971A3.976,3.976,0,0,0,0,28.586V47.36a3.976,3.976,0,0,0,3.971,3.971H13.56l-1.155,5.776H8.665a.722.722,0,1,0,0,1.444H28.882a.722.722,0,0,0,0-1.444h-3.74l-1.155-5.776h9.589a3.976,3.976,0,0,0,3.971-3.971V28.586A3.976,3.976,0,0,0,33.575,24.615Zm-19.7,32.492,1.155-5.776h7.481l1.155,5.776H13.878ZM36.1,47.36a2.53,2.53,0,0,1-2.527,2.527H3.971A2.53,2.53,0,0,1,1.444,47.36V45.555H36.1V47.36Zm0-3.249H1.444V42.666H5.776a.722.722,0,1,0,0-1.444H1.444V28.586a2.53,2.53,0,0,1,2.527-2.527h29.6A2.53,2.53,0,0,1,36.1,28.586V44.111Z" transform="translate(0 -24.615)"/></g></g><g transform="translate(17.329 46.277)"><g transform="translate(0 0)"><path d="M237.752,320a1.444,1.444,0,1,0,1.444,1.444A1.446,1.446,0,0,0,237.752,320Z" transform="translate(-236.308 -320)"/></g></g><g transform="translate(7.221 41.223)"><path d="M99.892,251.662a.7.7,0,0,0-.041-.136.729.729,0,0,0-.066-.124.7.7,0,0,0-.2-.2.719.719,0,0,0-.125-.066.68.68,0,0,0-.135-.041.711.711,0,0,0-.282,0,.68.68,0,0,0-.135.041.707.707,0,0,0-.125.066.7.7,0,0,0-.2.2.734.734,0,0,0-.066.124.7.7,0,0,0-.041.136.694.694,0,0,0,0,.282.678.678,0,0,0,.041.135.706.706,0,0,0,.066.125.7.7,0,0,0,.2.2.717.717,0,0,0,.125.066.734.734,0,0,0,.135.042.73.73,0,0,0,.282,0,.734.734,0,0,0,.135-.042.707.707,0,0,0,.125-.066.7.7,0,0,0,.2-.2.716.716,0,0,0,.066-.125.678.678,0,0,0,.041-.135.694.694,0,0,0,0-.282Z" transform="translate(-98.462 -251.081)"/></g></g></svg>
        <h4 class="account__not-found-text">
          <p>.</p>
        </h4>
        <div class="load-more">
          <NuxtLink to="/cabinet">Вернуться назад</NuxtLink>
        </div>
      </div>
    </div>

    <div class="account__blog-warning">
      <div class="account__not-found">
        <svg xmlns="http://www.w3.org/2000/svg" width="37.547" height="33.937" viewBox="0 0 37.547 33.937"><g transform="translate(0 -24.615)"><g transform="translate(0 24.615)"><g transform="translate(0 0)"><path d="M33.575,24.615H3.971A3.976,3.976,0,0,0,0,28.586V47.36a3.976,3.976,0,0,0,3.971,3.971H13.56l-1.155,5.776H8.665a.722.722,0,1,0,0,1.444H28.882a.722.722,0,0,0,0-1.444h-3.74l-1.155-5.776h9.589a3.976,3.976,0,0,0,3.971-3.971V28.586A3.976,3.976,0,0,0,33.575,24.615Zm-19.7,32.492,1.155-5.776h7.481l1.155,5.776H13.878ZM36.1,47.36a2.53,2.53,0,0,1-2.527,2.527H3.971A2.53,2.53,0,0,1,1.444,47.36V45.555H36.1V47.36Zm0-3.249H1.444V42.666H5.776a.722.722,0,1,0,0-1.444H1.444V28.586a2.53,2.53,0,0,1,2.527-2.527h29.6A2.53,2.53,0,0,1,36.1,28.586V44.111Z" transform="translate(0 -24.615)"/></g></g><g transform="translate(17.329 46.277)"><g transform="translate(0 0)"><path d="M237.752,320a1.444,1.444,0,1,0,1.444,1.444A1.446,1.446,0,0,0,237.752,320Z" transform="translate(-236.308 -320)"/></g></g><g transform="translate(7.221 41.223)"><path d="M99.892,251.662a.7.7,0,0,0-.041-.136.729.729,0,0,0-.066-.124.7.7,0,0,0-.2-.2.719.719,0,0,0-.125-.066.68.68,0,0,0-.135-.041.711.711,0,0,0-.282,0,.68.68,0,0,0-.135.041.707.707,0,0,0-.125.066.7.7,0,0,0-.2.2.734.734,0,0,0-.066.124.7.7,0,0,0-.041.136.694.694,0,0,0,0,.282.678.678,0,0,0,.041.135.706.706,0,0,0,.066.125.7.7,0,0,0,.2.2.717.717,0,0,0,.125.066.734.734,0,0,0,.135.042.73.73,0,0,0,.282,0,.734.734,0,0,0,.135-.042.707.707,0,0,0,.125-.066.7.7,0,0,0,.2-.2.716.716,0,0,0,.066-.125.678.678,0,0,0,.041-.135.694.694,0,0,0,0-.282Z" transform="translate(-98.462 -251.081)"/></g></g></svg>
        <h4 class="account__not-found-text">
          <p>{{$t('cabinet_mobile_message')}}.</p>
        </h4>
        <div class="load-more">
          <NuxtLink to="/cabinet">Вернуться назад</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
let ClassicEditor
let CKEditor

if (process.client) {
  ClassicEditor = require('@ckeditor/ckeditor5-build-classic')
  CKEditor = require('@ckeditor/ckeditor5-vue2')
} else {
  CKEditor = { component : {template:'<div></div>'}}
}
export default {
  name: "suggest-event",
  layout: 'cabinet',
  middleware:['organizator'],
  components: {
    'ckeditor-nuxt': () => { if (process.client) { return import('@blowstack/ckeditor-nuxt') } },
    ckeditor: CKEditor.component,
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      menu: false,
      modal: false,
      editor: ClassicEditor,
      tabs: [
        {
          id: 0,
          title: 'Одобрено',
          active: 'active'
        },
        {
          id: 1,
          title: 'На модерации',
          active: ''
        }
      ],
      active: false,
      places: [],
      fails: []
    }
  },
  methods: {
    getImages(data){
      return this.$store.state.image.image + data ;
    },
    truncate(string, value) {
      return string.substring(0, value) + '...';
    },
    activeTab(i){
      this.tabs.forEach((item,i) => {
        item.active = ''
        this.active = false
      })
      this.tabs[i].active = 'active'
    },
    activeTrue(){
      this.tabs.forEach((item,i) => {
        item.active = ''
      })
      this.active = true
    },
    uploadImg(e){
      this.form.image = e;
    },
    async submit() {
      try {
        const formData = new FormData();
        Object.keys(this.form).forEach((key) => {
          if(this.form[key] != null){
            formData.append(key, this.form[key])
          }
        })

        await this.$axios.$post('/cabinet/send-event', formData).then(async (e) => {
          console.log(e)
          this.$toast.success('Успешно отправлен на модерацию')
          setTimeout(window.location.reload(), 500)
        }).catch(({response}) => {
          this.fails = response.data.errors
        })
      }
      catch (e) {
        console.log(e)
      }
    },
  },
  async asyncData({$axios}) {
    let events, moderation, places = []
    let form = {
      place_id: '',
      title_kz: '',
      title_ru: '',
      title_en: '',
      description_kz: '',
      description_ru: '',
      description_en: '',
      image: '',
      price: '',
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      time: null
    }
    try{
      await $axios.$get("/cabinet/my-events").then((e)=>{
        events = e[0]
        moderation = e[1]
        places = e[2]
        form.organizator_id = e[3].id
        // e[1].forEach((item,i) => {
        //   tags.push(item.title_ru)
        // })
      });
    }
    catch (e) {
      console.log(e);
    }
    return {events,moderation, places, form}
  },
  mounted() {
    // console.log(this.places)
  }
}
</script>

<style scoped>

</style>

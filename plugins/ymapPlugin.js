import Vue from 'vue'
import YmapPlugin from 'vue-yandex-maps'

const settings = {
  apiKey: 'ede39135-557c-420d-a147-cfb3d22f3eb3',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1'
}
 // настройки плагина

Vue.use(YmapPlugin, settings);

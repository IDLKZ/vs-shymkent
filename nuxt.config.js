import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Visit',
    title: 'Visit',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {rel:"stylesheet", href:"https://pro.fontawesome.com/releases/v5.10.0/css/all.css",
        integrity:"sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p",crossorigin:"anonymous"
      },
    ],
    script: [
      {src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',type: "text/javascript"},
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.11.1/typeahead.bundle.min.js'},
      // {src: '/js/pace.js'},
      // {src: '/js/js.cookie.min.js'},
      // {src: '/js/bvi-init.min.js'},
      // {src: '/js/bvi.min.js'},
      // {src: '/js/libs.min.js'},
      // {src: '/js/main.js'},
      {src: '/js/script.js'}
    ]
  },

  loading: {
    color: 'red',
    height: '5px',
    continuous: true
  },
  loadingIndicator: {
    name: 'circle',
    color: 'red',
    background: 'white'
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/pace-theme-minimal.css',
    '~/assets/css/style.min.css',
    '~/assets/frontend.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/ymapPlugin.js',  mode: 'client' },
    './plugins/mixins/user.js',
    './plugins/axios.js',
    './plugins/mixins/validation.js',
    './plugins/share.js',
    './plugins/stars.js',
    '~/mixins/global.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-i18n',
    '@nuxtjs/auth',
    '@nuxtjs/proxy',
    '@nuxtjs/toast',
    '@nuxtjs/moment',
  ],

  i18n: {
    locales: ['en', 'ru', 'kz'],
    defaultLocale: "ru",
    vueI18n: {
      fallbackLocale: "ru",
      messages: {
        en: require("./static/en.json"),
        ru: require("./static/ru.json"),
        kz: require("./static/kz.json"),
      },
      vuex: {moduleName: 'i18n', syncLocale: true, syncMessages: false, syncRouteParams: true}
    },
  },

  toast: {
    position: 'top-right',
    duration : 2000,
    register: [ // Register custom toasts
      {
        name: 'fail_login',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: "http://backend.visit-shymkent/api",
    credentials: false,
    proxyHeaders: false
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "auth/login",
            method: "post",
            propertyName: "meta.token"
          },
          user: {
            url: "auth/user",
            method: "get",
            propertyName: "data"
          },
          logout: {
            url: "auth/logout",
            method: "post"
          }
        }
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/'
    }
  },

  router: {

  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel:{
      plugins: [
        ["@babel/plugin-proposal-class-properties", { "loose": true }],
        ["@babel/plugin-proposal-private-methods", { "loose": true }],
        ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
      ]
    }
  }
}

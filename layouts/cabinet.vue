<template>
  <section>
    <v-app>
      <Navbar/>
      <section class="account">
        <div class="container">
          <ul class="crumbs">
            <li class="crumbs__item">
              <NuxtLink to="/">{{ $t('main') }}</NuxtLink>
            </li>
            <li class="crumbs__item current">
              <a href="#">{{ $t('cabinet') }}</a>
            </li>
          </ul>
          <div class="account__tabs">
            <ul class="account__tabs-caption d-md-flex justify-md-space-around pl-0">
              <NuxtLink :style="'color:'+tab.color" :to="tab.link" v-for="(tab,i) in tabs" :key="tab.id" :class="tab.active" @click.native="activeTab(i)" v-html="tab.svg+$t(tab.title)"></NuxtLink>
              <a @click="logout">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                {{ $t('log_out') }}
              </a>
            </ul>
              <Nuxt/>
          </div>
        </div>
      </section>
      <Footer/>
    </v-app>
  </section>
</template>

<script>
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default {
  name: "cabinet",
  components: {Footer, Navbar},
  middleware: ['auth', 'localeLang','admin'],
  data(){
    return {
      tabs: [
        {
          id: 0,
          title: 'cabinet_menu_savings',
          link: '/cabinet',
          svg: '<svg data-name="Livello 1" id="Livello_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title/><path d="M98.78,0H29.22A7.21,7.21,0,0,0,22,7.19V120.8a7.08,7.08,0,0,0,4.42,6.63,7.22,7.22,0,0,0,7.87-1.5L63.14,97.59a1.23,1.23,0,0,1,1.72,0l28.86,28.33a7.21,7.21,0,0,0,7.87,1.5A7.08,7.08,0,0,0,106,120.8V7.19A7.21,7.21,0,0,0,98.78,0ZM100,120.8a1.14,1.14,0,0,1-.74,1.09,1.17,1.17,0,0,1-1.34-.25h0L69.06,93.31a7.26,7.26,0,0,0-10.13,0L30.08,121.64a1.18,1.18,0,0,1-1.34.25A1.14,1.14,0,0,1,28,120.8V7.19A1.21,1.21,0,0,1,29.22,6H98.78A1.21,1.21,0,0,1,100,7.19Z"/></svg>',
          active: '',
          color: ''
        },
        // {
        //   id: 1,
        //   title: 'cabinet_menu_orders',
        //   link: '#',
        //   svg: '<svg xmlns="http://www.w3.org/2000/svg" width="17.186" height="15.751" viewBox="0 0 17.186 15.751"><path d="M16.479,24.206H3.042l-.2-2.225a.706.706,0,0,0-.7-.643H.706a.706.706,0,1,0,0,1.412h.789l.812,9.044a2.715,2.715,0,0,0,1.016,1.84,2.139,2.139,0,1,0,3.7.588h3.863a2.14,2.14,0,1,0,2.012-1.412H5.012a1.311,1.311,0,0,1-1.2-.795l11.279-.663a.706.706,0,0,0,.643-.533l1.434-5.736A.706.706,0,0,0,16.479,24.206ZM5.008,35.678a.728.728,0,1,1,.728-.728A.729.729,0,0,1,5.008,35.678Zm7.887,0a.728.728,0,1,1,.728-.728A.729.729,0,0,1,12.895,35.678Zm1.592-5.7-10.869.639-.448-4.995H15.576Z" transform="translate(0 -21.338)"/></svg>',
        //   active: '',
        //   color: ''
        // },
        // {
        //   id: 2,
        //   title: 'cabinet_menu_reviews',
        //   link: '#',
        //   svg: '<svg xmlns="http://www.w3.org/2000/svg" width="17.313" height="16" viewBox="0 0 17.313 16"><g transform="translate(0 -0.5)"><path d="M16.213,7.026H13.544V1.916A1.418,1.418,0,0,0,12.128.5H1.416A1.418,1.418,0,0,0,0,1.916V9.728a1.418,1.418,0,0,0,1.416,1.416H2.457l.756,3.022a.519.519,0,0,0,.9.2l2.662-3.226H8.172v2.043a1.1,1.1,0,0,0,1.1,1.1h3.5l1.67,2.024a.519.519,0,0,0,.9-.2l.455-1.819h.41a1.1,1.1,0,0,0,1.1-1.1V8.126A1.1,1.1,0,0,0,16.213,7.026Zm-9.679,3.08a.519.519,0,0,0-.4.189L3.971,12.915l-.6-2.417a.519.519,0,0,0-.5-.393H1.416a.377.377,0,0,1-.377-.377V1.916a.377.377,0,0,1,.377-.377H12.128a.377.377,0,0,1,.377.377V9.728a.377.377,0,0,1-.377.377Zm9.74,3.082a.061.061,0,0,1-.061.061H15.4a.519.519,0,0,0-.5.393l-.3,1.214-1.17-1.419a.52.52,0,0,0-.4-.189H9.273a.061.061,0,0,1-.061-.061V11.144h2.917a1.417,1.417,0,0,0,1.416-1.416V8.064h2.669a.061.061,0,0,1,.061.061Zm0,0"/><path d="M110.282,69.3a.519.519,0,0,1-.242-.06l-1.42-.746-1.42.746a.519.519,0,0,1-.754-.548l.271-1.581-1.149-1.119a.519.519,0,0,1,.288-.886l1.587-.231.71-1.438a.519.519,0,0,1,.932,0l.71,1.438,1.587.231a.519.519,0,0,1,.288.886l-1.149,1.119.271,1.581a.52.52,0,0,1-.512.607Zm-3.233-3.317.59.576a.519.519,0,0,1,.149.46l-.139.812.73-.384a.519.519,0,0,1,.483,0l.73.384-.139-.812a.519.519,0,0,1,.149-.46l.59-.576-.816-.119a.519.519,0,0,1-.391-.284l-.365-.739-.365.739a.52.52,0,0,1-.391.284Zm0,0" transform="translate(-101.849 -60.526)"/></g></svg>',
        //   active: '',
        //   color: ''
        // },
        {
          id: 1,
          title: 'cabinet_menu_blogs',
          link: '/cabinet/write-to-blog',
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="16.143" height="16.144" viewBox="0 0 16.143 16.144"><path d="M14.5.139a.473.473,0,0,0-.669,0L10.185,3.784H1.919A1.421,1.421,0,0,0,.5,5.2v6.621a1.42,1.42,0,0,0,1.419,1.419h.5v2.428A.473.473,0,0,0,3.234,16l2.7-2.759h5.508a1.42,1.42,0,0,0,1.419-1.419V6.459l3.645-3.645a.473.473,0,0,0,0-.669ZM10.151,7.83,8.813,6.493,12.826,2.48l1.338,1.338Zm-1.842-.5L9.317,8.334l-1.727.72Zm3.6,4.5a.473.473,0,0,1-.473.473H5.734a.473.473,0,0,0-.338.142L3.369,14.511V12.77A.473.473,0,0,0,2.9,12.3H1.919a.473.473,0,0,1-.473-.473V5.2a.473.473,0,0,1,.473-.473h7.32L7.81,6.158a.483.483,0,0,0-.1.158L6.4,9.459H3.842a.473.473,0,1,0,0,.946H6.712a.478.478,0,0,0,.186-.038l3.43-1.428a.48.48,0,0,0,.158-.1L11.914,7.4Zm2.919-8.675L13.5,1.811l.669-.669L15.5,2.48Zm0,0" transform="translate(-0.5)"/></svg>',
          active: '',
          color: ''
        },
        {
          id: 2,
          title: 'cabinet_menu_events',
          link: '/cabinet/suggest-event',
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="14.485" height="14.826" viewBox="0 0 14.485 14.826"><path d="M193.813,280.036a.438.438,0,0,0,.619,0l1.563-1.563a.438.438,0,0,0-.619-.619l-1.253,1.253-.571-.571a.438.438,0,1,0-.619.619Zm0,0" transform="translate(-187.221 -269.683)"/><path d="M133.581,206.767a3.475,3.475,0,1,0-3.475-3.475A3.479,3.479,0,0,0,133.581,206.767Zm0-6.075a2.6,2.6,0,1,1-2.6,2.6A2.6,2.6,0,0,1,133.581,200.692Zm0,0" transform="translate(-126.338 -194.03)"/><path d="M13.07.932h-.8V.438a.438.438,0,1,0-.876,0V.932h-.86V.438a.438.438,0,0,0-.876,0V.932H4.826V.438a.438.438,0,0,0-.876,0V.932H3.09V.438a.438.438,0,0,0-.876,0V.932h-.8A1.417,1.417,0,0,0,0,2.348V13.41a1.417,1.417,0,0,0,1.416,1.416H13.07a1.417,1.417,0,0,0,1.416-1.416V2.348A1.417,1.417,0,0,0,13.07.932Zm.54,12.478a.541.541,0,0,1-.54.54H1.416a.541.541,0,0,1-.54-.54V4.572H13.61ZM.876,2.348a.541.541,0,0,1,.54-.54h.8V2.3a.438.438,0,0,0,.876,0V1.808h.86V2.3a.438.438,0,0,0,.876,0V1.808H9.66V2.3a.438.438,0,0,0,.876,0V1.808h.86V2.3a.438.438,0,0,0,.876,0V1.808h.8a.541.541,0,0,1,.54.54V3.7H.876Zm0,0"/></svg>',
          active: '',
          color: ''
        },
        {
          id: 3,
          title: 'cabinet_menu_routes',
          link: '/cabinet/create-routes',
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" height="30" width="30"><g transform="matrix(2.142857142857143,0,0,2.142857142857143,0,0)"><g><path d="M11.5,5c0,2.49-4.5,8.5-4.5,8.5S2.5,7.49,2.5,5a4.5,4.5,0,0,1,9,0Z" style="fill: none;stroke: #000001;stroke-linecap: round;stroke-linejoin: round"></path><circle cx="7" cy="5" r="1.5" style="fill: none;stroke: #000001;stroke-linecap: round;stroke-linejoin: round"></circle></g></g></svg>',
          active: 'd-none',
          color: ''
        },
        {
          id: 4,
          title: 'cabinet_menu_settings',
          link: '/cabinet/settings',
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="15.675" height="15.675" viewBox="0 0 15.675 15.675"><g transform="translate(0 0)"><path d="M8.33,15.675H7.346A1.445,1.445,0,0,1,5.9,14.232V13.9a6.328,6.328,0,0,1-.983-.408l-.236.236a1.443,1.443,0,0,1-2.041,0l-.7-.7a1.443,1.443,0,0,1,0-2.041l.236-.236a6.329,6.329,0,0,1-.408-.983H1.443A1.445,1.445,0,0,1,0,8.33V7.346A1.445,1.445,0,0,1,1.443,5.9h.333a6.33,6.33,0,0,1,.408-.983l-.236-.236a1.443,1.443,0,0,1,0-2.041l.7-.7a1.443,1.443,0,0,1,2.041,0l.236.236A6.334,6.334,0,0,1,5.9,1.776V1.443A1.445,1.445,0,0,1,7.346,0H8.33A1.445,1.445,0,0,1,9.773,1.443v.333a6.328,6.328,0,0,1,.983.408l.236-.236a1.443,1.443,0,0,1,2.041,0l.7.7a1.443,1.443,0,0,1,0,2.041l-.236.236A6.329,6.329,0,0,1,13.9,5.9h.333a1.445,1.445,0,0,1,1.443,1.443V8.33a1.445,1.445,0,0,1-1.443,1.443H13.9a6.33,6.33,0,0,1-.408.983l.236.236a1.443,1.443,0,0,1,0,2.041l-.7.7a1.443,1.443,0,0,1-2.041,0l-.236-.236a6.334,6.334,0,0,1-.983.408v.333A1.445,1.445,0,0,1,8.33,15.675ZM5.074,12.527a5.413,5.413,0,0,0,1.4.582.459.459,0,0,1,.344.445v.678a.525.525,0,0,0,.525.525H8.33a.525.525,0,0,0,.525-.525v-.678A.459.459,0,0,1,9.2,13.11a5.413,5.413,0,0,0,1.4-.582.459.459,0,0,1,.559.071l.48.48a.524.524,0,0,0,.742,0l.7-.7a.524.524,0,0,0,0-.742L12.6,11.16a.459.459,0,0,1-.071-.558,5.412,5.412,0,0,0,.582-1.4.459.459,0,0,1,.445-.344h.678a.525.525,0,0,0,.525-.525V7.346a.525.525,0,0,0-.525-.525h-.678a.459.459,0,0,1-.445-.344,5.413,5.413,0,0,0-.582-1.4.459.459,0,0,1,.071-.558l.48-.48a.524.524,0,0,0,0-.742l-.7-.7a.524.524,0,0,0-.742,0l-.48.481a.459.459,0,0,1-.559.071,5.413,5.413,0,0,0-1.4-.582.459.459,0,0,1-.344-.445V1.443A.525.525,0,0,0,8.33.918H7.346a.525.525,0,0,0-.525.525v.678a.459.459,0,0,1-.344.445,5.413,5.413,0,0,0-1.4.582.459.459,0,0,1-.559-.071l-.48-.48a.524.524,0,0,0-.742,0l-.7.7a.524.524,0,0,0,0,.742l.481.481a.459.459,0,0,1,.071.558,5.412,5.412,0,0,0-.582,1.4.459.459,0,0,1-.445.344H1.443a.525.525,0,0,0-.525.525V8.33a.525.525,0,0,0,.525.525h.678a.459.459,0,0,1,.445.344,5.413,5.413,0,0,0,.582,1.4.459.459,0,0,1-.071.558l-.48.48a.524.524,0,0,0,0,.742l.7.7a.524.524,0,0,0,.742,0l.48-.481a.461.461,0,0,1,.559-.071Z"/><path d="M148.011,151.421a3.411,3.411,0,1,1,3.411-3.411A3.414,3.414,0,0,1,148.011,151.421Zm0-5.9a2.492,2.492,0,1,0,2.492,2.492A2.495,2.495,0,0,0,148.011,145.518Z" transform="translate(-140.173 -140.173)"/></g></svg>',
          active: '',
          color: '',
        },
      ]
    }
  },
  methods:{
    logout() {
      this.$auth.logout()
    },
    activeTab(i){
      this.tabs.forEach((item,i) => {
        item.active = ''
        item.color= ''
      })
      if (this.$auth.user.user.role_id === 6 || this.$auth.user.user.role_id === 7){
        this.tabs[3].active = 'd-none';
      }
      this.tabs[i].active = 'active'
      this.tabs[i].color = 'white!important'
    },
  },
  created() {
    if (this.$auth.user.user.role_id === 4 || this.$auth.user.user.role_id === 5){
      this.tabs[3].active = ''
      this.tabs[5] = {svg:null,title:null,link:null};
      this.tabs[5].svg = "<i class = 'far fa-question-circle mr-2'></i>"
      this.tabs[5].title = 'cabinet_menu_request'
      this.tabs[5].link = '/cabinet/leave-request'
    }
    if (this.$auth.user.user.role_id === 6 || this.$auth.user.user.role_id === 7){
      this.tabs[5] = {svg:null,title:null,link:null};
      this.tabs[2].title = 'cabinet_menu_souvenirs'
      this.tabs[2].link = '/cabinet/create-souvenir'
      this.tabs[5].svg = "<i class = 'far fa-question-circle mr-2'></i>"
      this.tabs[5].title = 'cabinet_menu_request'
      this.tabs[5].link = '/cabinet/leave-request'
    }
    if ( this.$auth.user.user.role_id === 3){
      this.tabs[4].svg = "<i class = 'far fa-question-circle mr-2'></i>"
      this.tabs[4].title = 'cabinet_menu_request'
      this.tabs[4].link = '/cabinet/leave-request'
      this.tabs.splice(this.tabs.findIndex(element => element.id == 3 ),1);
    }
  },

  mounted() {
    this.tabs.forEach((item,i) => {
      if (item.link == this.$route.path){
        item.active = 'active'
        item.color = 'white!important'
      }
    })
  }
}
</script>

<style scoped>

</style>

<template>
  <section class="souvenirs-page">
    <div class="container">
      <ul class="crumbs">
        <li class="crumbs__item">
          <NuxtLink to="/">{{ $t('main') }}</NuxtLink>
        </li>
        <li class="crumbs__item current">
          <NuxtLink to="#">{{ $t('souvenirs') }}</NuxtLink>
        </li>
      </ul>
      <div class="top-content">
        <div class="top-content__wrapper top-content__wrapper-5">
          <h2 class="top-content__title">
            {{ $t('souvenirs') }}
          </h2>
          <p class="top-content__text">
            {{ $t('souvenirs_subtitle') }}
          </p>
        </div>
        <div class="top-content__line"></div>
      </div>
      <div class="souvenirs-page__tabs">
        <ul class="souvenirs-page__tabs-caption">
          <li class="active">
            <NuxtLink style="color:white!important;" to="/souvenirs">{{$t('souvenirs')}}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/craft">{{$t('craft')}}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/craftman">{{$t('craftman')}}</NuxtLink>
          </li>
        </ul>
        <div class="souvenirs-page__tabs-content active">
          <div class="souvenirs-page__wrapper">
            <div class="souvenirs-page__categories-inner">
<!--              <button class="open-filter">-->
<!--                <span>Фильтр</span>-->
<!--              </button>-->
              <div class="souvenirs-page__list-categories">
                <div class="souvenirs-page__list-categories-container">
                  <h4 class="souvenirs-page__list-categories-title">
                    {{ $t('souvenirs_seller') }}
                  </h4>
                  <div class="souvenirs-page__list-categories-item">
                    <input type="checkbox" id="route-tab2-1"
                    :checked="getActiveCheckBox(0)"
                    @click="toggleActiveCheckBox(0)"

                    >
                    <label for="route-tab2-1">{{ $t('all') }}</label>
                  </div>
                  <div class="souvenirs-page__list-categories-item" v-for="(role,index) in roles">
                    <input type="checkbox" :id="'route-tab2-'+role.id"
                           :checked="getActiveCheckBox(role.id)"
                           @click="toggleActiveCheckBox(role.id)"
                    >
                    <label :for="'route-tab2-'+role.id">
                      {{role["title_" + $i18n.locale]}}
                  </label>
                  </div>

                </div>
                <div class="souvenirs-page__list-categories-container">
                  <h4 class="routes-page__list-categories-title">
                    {{ $t('souvenirs_cost') }}
                  </h4>
                  <div class="souvenirs-page__list-categories-item">
                    <input type="checkbox" value="[0,10000000]" v-model="price" id="route-tab3-4"> <label for="route-tab3-4">{{ $t('all') }}</label>
                  </div>
                  <div class="souvenirs-page__list-categories-item">
                    <input type="checkbox" value="[0,5000]" v-model="price" id="route-tab3-5"> <label for="route-tab3-5">{{ $t('filter_price_1') }}</label>
                  </div>
                  <div class="souvenirs-page__list-categories-item">
                    <input type="checkbox" value="[5000,50000]" v-model="price" id="route-tab3-6"> <label for="route-tab3-6">{{ $t('filter_price_2') }}</label>
                  </div>
                  <div class="souvenirs-page__list-categories-item">
                    <input type="checkbox" value="[50000,10000000]" v-model="price" id="route-tab3-7"> <label for="route-tab3-7">{{ $t('filter_price_3') }}</label>
                  </div>
                </div>
              </div>
<!--              <button class="do-filter">-->
<!--                Применить фильтр-->
<!--              </button>-->
            </div>
            <div class="souvenirs-page__items-wrapper">
              <div class="souvenirs__items-inner">
                <div class="souvenirs__item" v-for="(item,i) in souvenirs" :key="i">
                  <NuxtLink :to="'/souvenirs/'+item.alias">
                    <div class="souvenirs__item-img" :style="'background-image: url('+getImages(item.image)+');'"></div>
                  </NuxtLink>
                    <div class="souvenirs__item-content">
                      <h4 class="souvenirs__item-title">
                        <NuxtLink :to="'/souvenirs/'+item.alias">{{ item['title_'+$i18n.locale] }}</NuxtLink>
                      </h4>
                      <p class="souvenirs__item-text" v-html="truncate(item['description_'+$i18n.locale],50)"></p>
                      <div class="souvenirs__item-price-wrapper">
                        <v-dialog
                          v-if="item.eventum"
                          v-model="dialog"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <button class="souvenirs__item-btn"
                                    v-bind="attrs"
                                    v-on="on"
                                    style="color: white!important;"
                            >
                              <span>{{ $t('buy') }}</span>
                            </button>
                          </template>
                          <v-card>
                            <v-card-text>
                              <div id="modal-eventumCloseBtn" @click="dialog = false"
                                   style="float: right;height: 10px;width: 15px;cursor: pointer;position: absolute;right: 10px;top: 8px;">
                                <svg version="1.1" x="0px" y="0px" viewBox="0 0 15 15" width="100%" height="100%">
                                  <rect fill="#000000" x="-1.8" y="6.2"
                                        transform="matrix(0.7071 0.7071 -0.7071 0.7071 7.5178 -3.1079)" width="18.6"
                                        height="2.7"></rect>
                                  <rect fill="#000000" x="-1.8" y="6.2"
                                        transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 18.1391 7.5282)" width="18.6"
                                        height="2.7"></rect>
                                </svg>
                              </div>
                              <iframe :src="getEventum(item.eventum)" style="height:573px;width:100%;"
                                      frameborder="0"></iframe>
                            </v-card-text>

                            <v-divider></v-divider>

                          </v-card>
                        </v-dialog>
                        <div class="souvenirs__item-price">
                          {{ item.price }} ТГ
                        </div>
                      </div>
                    </div>
                </div>
              </div>
              <div class="load-more" v-if="current_page < last_page">
                <a @click="paginate">{{ $t('load_more') }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: "index",
  data(){
    return {
      dialog: false,
      role_id:[],
      price:[],
      roles:[],
      souvenirs:[],
      current_page:1,
      last_page:1

    }
  },
  watch:{
    price(val){
      this.current_page = 1;
      this.loadData();
    },
  },



  computed:{
    getRoleQuery(){
      if(!this.role_id.includes(0)){
        if(this.role_id.length > 0){return "&role_id=" + JSON.stringify(this.role_id)} else{return "";}
      }
      else{
        return "";
      }
    },
    getPriceQuery(){
      return "&price=" + this.price
    }
  },




  methods:{
    toggleActiveCheckBox(index){
      if(index == 0){
        if(this.role_id.includes(0)){
          this.role_id = [];
        }
        else{
          this.role_id = [];
          this.role_id.push(0);
          for(let item in this.roles){
            if(this.roles[item] !== undefined){
              this.role_id.push(this.roles[item].id);
            }
          }
        }
      }
      else{
        if(this.role_id.includes(index)){
          this.role_id.splice(this.role_id.indexOf(index),1);
          this.role_id.includes(0) == true ? this.role_id.splice(this.role_id.indexOf(0),1) : null;
        }
        else{
          this.role_id.push(index);
          if(!this.role_id.includes(0)){
            this.role_id.length == this.roles.length +1 ? this.role_id.push(0) : null;
          }
        }
      }
      this.current_page = 1;
      this.loadData();
      },

    getActiveCheckBox(index){
      return this.role_id.includes(index);
    },

    paginate(){
      this.current_page +=1
      this.loadData();
    },

//Загружаем новые страницы
    async loadData(){
      try{
        this.$axios.$get("/all-souvenirs?page=" + this.current_page + this.getRoleQuery + this.getPriceQuery).then(e=>{
          this.current_page == 1 ? (this.souvenirs = e[0].data) : (this.souvenirs.push(...e[0].data));
          this.current_page = e[0].current_page;
          this.last_page = e[0].last_page;
        }).catch(e=>{console.log(e)});
      }
      catch (e) {
        this.$toast.error("Произошла ошибка попробуйте позже");
      }

    },

    getImages(data){
      return this.$store.state.image.image + data ;
    },
    truncate(string, value) {
      return string.length > value ? string.substring(0, value) + '…' : string;

    },
    activeTab(i){
      this.tabs.forEach((item,i) => {
        item.active = ''
      })
      this.tabs[i].active = 'active'
    }
  },
  async asyncData({$axios}) {
    let current_page,last_page = 1;
    let roles = [];
    let souvenirs = [];
    try{
      await $axios.$get("/all-souvenirs").then((e)=>{
        souvenirs = e[0].data
        current_page = e[0].current_page;
        last_page = e[0].last_page;
        roles = e[1];
      });
    }
    catch (e) {
      console.log(e);
    }
    return {souvenirs,roles,current_page,last_page}
  },
}
</script>

<style scoped>

</style>

<template>
  <section class="routes-page">
    <div class="container">
      <ul class="crumbs">
        <li class="crumbs__item">
          <a href="/">{{ $t('main') }}</a>
        </li>
        <li class="crumbs__item">
          <a href="#">{{ $t('routes_title') }}</a>
        </li>
        <li class="crumbs__item current">
          <a href="#">{{ $t('ready_routes') }}</a>
        </li>
      </ul>
      <div class="top-content">
        <div class="top-content__wrapper top-content__wrapper-4">
          <h2 class="top-content__title">
            {{ $t('routes_title') }}
          </h2>
          <p class="top-content__text">
            {{ $t('routes_subtitle') }}
          </p>
        </div>
        <div class="top-content__line"></div>
      </div>
      <div class="routes-page__tabs">
        <ul class="routes-page__tabs-caption">
          <li class="active">
            <NuxtLink style="color:white!important;" to="/routes">{{$t('ready_routes')}}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/guides">{{$t('guides')}}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/agencies">{{$t('agencies')}}</NuxtLink>
          </li>
        </ul>
        <div class="routes-page__tabs-content active">
          <div class="routes-page__tabs-content-inner">
            <div class="routes-page__list-categories-wrapper">
<!--              <button class="open-filter">-->
<!--                <span>Фильтр</span>-->
<!--              </button>-->
              <div class="routes-page__list-categories">
                <div class="routes-page__list-categories-container">
                  <h4 class="routes-page__list-categories-title">
                    {{ $t('type_of_routes') }}
                  </h4>
                  <div class="routes-page__list-categories-item">
                    <input type="checkbox" id="cb1"
                           @click="toggleActiveCheckBox(0,'type')"
                           :checked="getActiveCheckBox(0,'type')"
                    > <label for="cb1">{{ $t('all') }}</label>
                  </div>
                  <div class="routes-page__list-categories-item" v-for="(item,index) in types" :key="item.created_at + index">
                    <input type="checkbox" :id="'type' + item.id"
                           @click="toggleActiveCheckBox(item.id,'type')"
                           :checked="getActiveCheckBox(item.id,'type')"
                    >
                    <label :for="'type' + item.id">
                    {{item["title_" + $i18n.locale]}}
                    </label>
                  </div>
                </div>

                <div class="routes-page__list-categories-container">
                  <h4 class="routes-page__list-categories-title">
                    {{ $t('categories') }}
                  </h4>
                  <div class="routes-page__list-categories-item">
                    <input type="checkbox" id="cb5"
                      @click="toggleActiveCheckBox(0,'category')"
                      :checked="getActiveCheckBox(0,'category')"
                    > <label for="cb5">{{ $t('all') }}</label>
                  </div>
                  <div class="routes-page__list-categories-item" v-for="(item,index) in categories">
                    <input type="checkbox" :id="'category' + item.id"
                           @click="toggleActiveCheckBox(item.id,'category')"
                           :checked="getActiveCheckBox(item.id,'category')"
                    >
                    <label :for="'category' + item.id">
                          {{item['title_' + $i18n.locale]}}
                    </label>
                  </div>
                </div>

                <div class="routes-page__list-categories-container">
                  <h4 class="routes-page__list-categories-title">
                    {{ $t('duration') }}
                  </h4>
                  <div class="routes-page__list-categories-item">
                    <input type="checkbox" id="cb9"
                           @click="toggleActiveCheckBox([0],'time')"
                           :checked="time.length == 1 || time.length <1"
                    > <label for="cb9">{{ $t('all') }}</label>
                  </div>
                  <div class="routes-page__list-categories-item">
                    <input type="checkbox" name="distance" id="cb10"
                           @click="toggleActiveCheckBox([0,3],'time')"
                           :checked="time[1] == 3"
                    > <label for="cb10">{{ $t('filter_time_1') }}

                  </label>
                  </div>
                  <div class="routes-page__list-categories-item">
                    <input type="checkbox" name="distance" id="cb11"
                           @click="toggleActiveCheckBox([3,9],'time')"
                           :checked="time[1] == 9"
                    > <label for="cb11">{{ $t('filter_time_2') }}</label>
                  </div>
                  <div class="routes-page__list-categories-item">
                    <input type="checkbox" name="distance" id="cb12"> <label for="cb12"
                         @click="toggleActiveCheckBox([9,24],'time')"
                         :checked="time[1] == 24"
                  >{{ $t('filter_time_3') }}</label>
                  </div>
                  <div class="routes-page__list-categories-item">
                    <input type="checkbox" name="distance" id="cb13"
                           @click="toggleActiveCheckBox([24,1000],'time')"
                           :checked="time[1] == 1000"
                    > <label for="cb13">{{ $t('filter_time_4') }}</label>
                  </div>
                </div>
              </div>
<!--              <button class="do-filter">-->
<!--                Применить фильтр-->
<!--              </button>-->
            </div>
            <div class="routes-page__list">
              <NuxtLink class="routes-page__link" :to="'/routes/'+item.alias" v-for="(item,i) in routes" :key="i">
                <div class="routes-page__item">
                  <div class="routes-page__item-img" :style="'background-image: url('+getImages(item.image)+');'"></div>
                  <div class="routes-page__item-content">
                    <h4 class="routes-page__item-title">
                      {{ item['title_'+$i18n.locale] }}
                    </h4>

                    <div class="routes-page__item-text" v-html="truncate(item['description_'+$i18n.locale], 120)"></div>
                    <div class="routes-page__item-about">
                      <div class="routes-page__item-time">
                        {{ $t('length') }}: <span>{{ item.time }}</span>
                      </div>
                      <div class="routes-page__item-distance">
                        {{ $t('distance') }}: <span>{{ item.distance }}</span>
                      </div>
                      <div class="routes-page__item-points" v-if="item.places.length>0">
                        {{ $t('count_of_points') }}: <span>{{item.places.length}}</span>
                      </div>
                      <div class="routes-page__item-points" v-else>
                        {{ $t('count_of_points') }}: <span>0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </NuxtLink>
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
      title: this.$t('guides'),
      routeTypes:[],
      categoryTypes:[],
      time:[],
      categories:[],
      types:[],
      routes:[],
      current_page:1,
      last_page:1,
    }
  },
  computed:{
    getQueryCategory(){
      // console.log(this.categoryTypes);
      // console.log(this.categoryTypes.length);
      if(this.categoryTypes.indexOf(0) == -1){
        if(this.categoryTypes.length > 0){
          return "&category_id=" + JSON.stringify(this.categoryTypes);
        }
        else{
          return "";
        }
      }
      else{
        return "";
      }
    },
    getQueryType(){
      // console.log(this.routeTypes.length);
      if(this.routeTypes.indexOf(0) == -1){
        if(this.routeTypes.length > 0){
          return "&types=" + JSON.stringify(this.routeTypes);
        }
        else{
          return "";
        }
      }
      else{
        return "";
      }
    },
    getQueryTime(){
      if(this.time.length  == 2){
        return "&time=" + JSON.stringify(this.time);
      }
      else{
        return "";
      }
    }
  },
  methods:{
    toggleActiveCheckBox(index,type){
      if(type == "category"){if(index == 0){

          if(this.categoryTypes.includes(0)){this.categoryTypes = [];}
          else{this.categoryTypes = [];this.categoryTypes.push(0);for (let i in this.categories){if(this.categories !== undefined){this.categoryTypes.push(this.categories[i].id)}}}} else{
            if(this.categoryTypes.includes(index)){
               this.categoryTypes.splice(this.categoryTypes.indexOf(index),1)
               this.categoryTypes.includes(0)?this.categoryTypes.splice(this.categoryTypes.indexOf(0),1) : null ;
            }
            else{
              this.categoryTypes.push(index);
                if(!this.categoryTypes.includes(0)){
                  // console.log(this.categoryTypes.length);
                  this.categoryTypes.length == this.categories.length ? this.categoryTypes.push(0) : null;
                }
            }
        }}
      else if(type == "type"){
        if(index == 0){

          if(this.routeTypes.includes(0)){this.routeTypes = [];}
          else{this.routeTypes = [];this.routeTypes.push(0);for (let i in this.types){if(this.types !== undefined){this.routeTypes.push(this.types[i].id)}}}}
        else{
          if(this.routeTypes.includes(index)){
            this.routeTypes.splice(this.routeTypes.indexOf(index),1)
            this.routeTypes.includes(0)?this.routeTypes.splice(this.routeTypes.indexOf(0),1) : null ;
          }
          else{
            this.routeTypes.push(index);
            if(!this.routeTypes.includes(0)){
              // console.log(this.routeTypes.length);
              this.routeTypes.length == this.types.length ? this.routeTypes.push(0) : null;
            }
          }
        }
      }
      else if(type == "time"){if(index.length == 2){this.time = [];this.time = index;} else{if(this.time.length == 1){this.time = [];} else{this.time = [0];}}}
      else{null;}
      this.current_page = 1;
      this.loadData();
      },

    getActiveCheckBox(index,type) {
          if(type == "category"){
            if(this.categoryTypes.includes(index)){return true;}else{return false;}
          }
          else if(type == "type"){
            if(this.routeTypes.length == this.types.length || this.routeTypes.includes(index)){return true;}else{return false;}
          }
          else if(type == "time"){
             if(this.time.length == 2){
               this.time[0] == index[0] ? true : false;
             }
             else if(this.time.length == 1){
               return false
             }
             else{
               return false
             }
          }
          else{
            return false
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
    },

    paginate(){
      this.current_page += 1;
      this.loadData();
    },


    //Загружаем новые страницы
    async loadData(){
      try{
        this.$axios.$get("/all-routes?page=" + this.current_page + this.getQueryCategory + this.getQueryType + this.getQueryTime).then(e=>{
          this.current_page == 1 ? (this.routes = e.data) : (this.routes.push(...e.data));
          this.current_page = e.current_page;
          this.last_page = e.last_page;
        }).catch(e=>{console.log(e)});
      }
      catch (e) {
        this.$toast.error("Произошла ошибка попробуйте позже");
      }

    },



  },
  async asyncData({$axios}) {
    let categories, types = [];
    let routes = [];
    let current_page,last_page = 1;
    try{
      await $axios.$get("/all-routes").then((e)=>{routes = e.data;current_page = e.current_page;last_page = e.last_page;}).catch((e)=>{console.log(e)});
      await $axios.$get("/all-route-categories").then((e)=>{
        types = e[0]
        categories = e[1]
      }).catch((e)=>{console.log(e)});

    }
    catch (e) {
      console.log(e);
    }
    return {routes,categories,types,current_page,last_page}
  }
}
</script>

<style scoped>

</style>

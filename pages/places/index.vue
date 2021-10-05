<template>
  <section class="guide-list">
    <div class="container">
      <ul class="crumbs">
        <li class="crumbs__item">
          <a href="/">{{ $t('main') }}</a>
        </li>
        <li class="crumbs__item current">
          <a href="#">{{ $t('place_title') }}</a>
        </li>
      </ul>
      <div class="top-content">
        <div class="top-content__wrapper top-content__wrapper-1">
          <h2 class="top-content__title">
            {{ $t('place_title') }}
          </h2>
          <p class="top-content__text">
            {{ $t('place_subtitle') }}
          </p>
        </div>
<!--        <a href="#" class="guide-list__top-link">Показать на карте</a>-->
        <div class="top-content__line"></div>
      </div>
      <div class="guide-list__content">
        <div class="guide-list__header-wrapper">
<!--          <button class="open-filter">-->
<!--            <span>Фильтр</span>-->
<!--          </button>-->
          <div class="guide-list__header">
            <h4 class="guide-list__header-title">
              {{ $t('categories') }}
            </h4>
            <div class="guide-list__accordion">
              <div class="guide-list__accordion-item">
                <div class="guide-list__accordion-trigger">
                  <input :checked="activeCheckbox[0]" @click="toggleActiveCheckBox(0)"  ref="check" type="checkbox" id="cb0"><label for="cb0">{{ $t('all') }}</label>
                </div>
              </div>
              <div class="guide-list__accordion-item" v-for="(item,i) in this.categories" :key="i">
                <div class="guide-list__accordion-trigger">
                  <input @click="toggleActiveCheckBox(item.id)"  :checked="activeCheckbox[item.id]"    class="check-all" type="checkbox" :id="'cb'+item.id">
                  <label :for="'cb'+item.id">
                    {{item['title_'+$i18n.locale]}}</label>
                  <svg @click="toggleActiveSideCheck(i)" v-if="item.children" :class="getActiveSideBox(i)" xmlns="http://www.w3.org/2000/svg" width="9.318" height="4.985" viewBox="0 0 9.318 4.985"><g transform="translate(-6.4 -33.4)"><path d="M15.623,33.5a.329.329,0,0,0-.466,0l-4.094,4.1-4.1-4.1a.329.329,0,0,0-.466.466l4.326,4.326a.321.321,0,0,0,.233.1.335.335,0,0,0,.233-.1l4.326-4.326A.323.323,0,0,0,15.623,33.5Z" transform="translate(0)"/></g></svg>
                </div>
<!--                  Подкатегории путеводителя-->
                <div class="guide-list__accordion-content" v-if="item.children" :style="getActiveStyle(i)">
                  <div class="guide-list__accordion-content-item" v-for="(value, i) in item.children" :key="i">
                    <input @click="toggleActiveCheckBox(value.id,value.parent_id)" :checked="activeCheckbox[value.id]" type="checkbox" :id="'cb'+value.id">
                    <label :for="'cb'+value.id">
                      {{value['title_'+$i18n.locale]}}</label>
                  </div>
                </div>
<!--                Подкатегории путеводителя-->
              </div>
            </div>
          </div>
<!--          <button class="do-filter">-->
<!--            Применить фильтр-->
<!--          </button>-->
        </div>
        <div class="guide-list__wrapper">
          <div class="guide-list__sort-wrapper">
            <div class="guide-list__search-wrapper">
              <input type="search" v-model="search" @keyup.enter="onSearch" class="guide-list__header-search" :placeholder="$t('search')">
              <button @click="onSearch">
                <svg xmlns="http://www.w3.org/2000/svg" height="136pt" version="1.1" viewBox="-1 0 136 136.21852" width="136pt">
                  <g id="surface1">
                    <path d="M 93.148438 80.832031 C 109.5 57.742188 104.03125 25.769531 80.941406 9.421875 C 57.851562 -6.925781 25.878906 -1.460938 9.53125 21.632812 C -6.816406 44.722656 -1.351562 76.691406 21.742188 93.039062 C 38.222656 104.707031 60.011719 105.605469 77.394531 95.339844 L 115.164062 132.882812 C 119.242188 137.175781 126.027344 137.347656 130.320312 133.269531 C 134.613281 129.195312 134.785156 122.410156 130.710938 118.117188 C 130.582031 117.980469 130.457031 117.855469 130.320312 117.726562 Z M 51.308594 84.332031 C 33.0625 84.335938 18.269531 69.554688 18.257812 51.308594 C 18.253906 33.0625 33.035156 18.269531 51.285156 18.261719 C 69.507812 18.253906 84.292969 33.011719 84.328125 51.234375 C 84.359375 69.484375 69.585938 84.300781 51.332031 84.332031 C 51.324219 84.332031 51.320312 84.332031 51.308594 84.332031 Z M 51.308594 84.332031 " style=" stroke:none;fill-rule:nonzero;fill:#C42313;fill-opacity:1;" />
                  </g>
                </svg>
              </button>
            </div>
            <div class="guide-list__select-wrapper select__wrapper d-block" style="width: 100%">
              <div class="guide-list__select-label select__label">{{ $t('show_to') }}:</div>
              <div class="guide-list__select select">
                  <v-select
                    :items="sorts"
                    v-model="sorts"
                    item-text='title'
                    item-value='value'
                    label="По дате"
                    @change="sortBySelect"
                    dense
                  ></v-select>

              </div>
            </div>
          </div>
          <div class="guide-list__items">
            <div class="guide-list__item" v-for="(item,i) in places" :key="i">
              <div class="guide-list__item-img" :style="'background-image: url('+getImages(item.image)+');'">
                <NuxtLink :to="'/places/'+item.alias"></NuxtLink>
              </div>
              <div class="guide-list__item-info">
                <div class="guide-list__item-category" v-for="(value,i) in item.category" :key="i">
                  {{value['title_'+$i18n.locale]}}
                </div>
              </div>
              <div class="d-flex justify-space-around my-2">
                <div>
                <small>{{$t('service_ratings')}}</small>
                <div class="guide-item__rating-inner">
                  <div class="guide-list__item-rating">
                    <div v-for="i in 5" :class="getStarClass(i,item.ratings_avg_rating)">
                      <svg height="511pt" viewBox="0 -10 511.98685 511" width="511pt" xmlns="http://www.w3.org/2000/svg"><path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"/></svg>
                    </div>
                  </div>
                  <div class="guide-item__contact-count">
                    ({{item.ratings_avg_rating !== null ?item.ratings_avg_rating : 0}})
                  </div>
                </div>
                </div>
                <div>
                  <small>{{$t('user_ratings')}}</small>
                  <div class="guide-item__rating-inner">
                    <div class="guide-list__item-rating">
                      <div v-for="i in 5" :class="getStarClass(i,item.reviews_avg_rating)">
                        <svg height="511pt" viewBox="0 -10 511.98685 511" width="511pt" xmlns="http://www.w3.org/2000/svg"><path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"/></svg>
                      </div>
                    </div>
                    <div class="guide-item__contact-count">
                      ({{item.reviews_avg_rating !== null ?item.reviews_avg_rating : 0 }})
                    </div>
                  </div>
                </div>
              </div>

              <div class="guide-list__item-content" style="overflow: hidden">
                <NuxtLink :to="'/places/'+item.alias" class="guide-list__item-title">
                  {{item['title_'+$i18n.locale]}}
                </NuxtLink>
                <p class="guide-list__item-text" v-html="truncate(item['description_'+$i18n.locale],150)"></p>
                <div class="guide-list__item-about mt-auto">
                  <NuxtLink :to="'/places/'+item.alias" class="guide-list__about-link white--text mt-3">{{ $t('more_info') }}</NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <div class="load-more" v-if="current_page < last_page">
            <a @click.prevent="paginate">{{ $t('load_more') }}</a>
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
      checked: true,
      current_page:1,
      last_page:1,
      places:[],
      activeCheckbox:{0:false},
      orderBy:"desc",
      search:"",
      activeSide:[]
    }
  },

  computed:{
    sorts(){
      return [
        {title:this.$t('new_records'),value:"desc"},
        {title:this.$t('old_records'),value:"asc"},
      ]
    },
    getCategoryId(){
      let categories = []
      for (let i in this.activeCheckbox){
          if(this.activeCheckbox[i]){
            categories.push(i);
          }
      }
      return categories.length > 0 ? "&categories=" + JSON.stringify(categories) : "";
    },
  },

  methods:{

    toggleActiveCheckBox(index,parent = null) {
      let result = !this.activeCheckbox[index];
      if(index == 0){
        for (let item in this.activeCheckbox){
          this.activeCheckbox[item] = result;
        }
      }
      else if(index && parent == null){
        result == false ? this.activeCheckbox["0"] = false : null;
        this.activeCheckbox[index] = result;
        if(this.categories[index].children !== undefined){
           for (let item in this.categories[index].children){
             this.activeCheckbox[item] = result;
           }
        }
      }
      else{
        result == false ? this.activeCheckbox["0"] = false : null;
        this.activeCheckbox[index] = result;
        let i = 0;
        if(this.categories[parent].children !== undefined){
          i = Object.keys(this.categories[parent].children).length;
          for (let item in this.categories[parent].children){
            if(this.activeCheckbox[item] == true){
              i--
            }
          }
        }
        i == 0 ? this.activeCheckbox[parent] = true :  this.activeCheckbox[parent] = false;
      }
      this.current_page = 1;
      this.loadData();
    },

    toggleActiveSideCheck(item){
      if(this.activeSide.includes(item)){
        this.activeSide.splice(this.activeSide.indexOf(item),1);
      }
      else{
        this.activeSide.push(item)
      }
    },
    getActiveSideBox(item){
      if(this.activeSide.includes(item)){
        return  "guide-list__accordion-trigger-svg active"
      }
      else{
        return "guide-list__accordion-trigger-svg"
      }
    },

    getActiveStyle(i){
      if(this.activeSide.includes(i)){
        return {display:"block"}
      }
      else{
        return {display:"none"}
      }
    },


    getImages(data){
      return this.$store.state.image.image + data ;
    },
    truncate(string, value) {
      return string.length > value ? string.substring(0, value) + '…' : string;
    },
    async loadData(){
      try{
        await this.$axios.$get("/places?page="+this.current_page + this.getCategoryId + "&order=" + this.orderBy + "&search=" + this.search).then((e)=>{
          this.current_page == 1 ?  this.places = e.data : this.places.push(...e.data);
          this.current_page = e.current_page;
          this.last_page = e.last_page;
        }).catch((e)=>{this.$toast.error("Упс, произошла ошибка, попробуйте позже")})
      }
      catch (e){
        this.$toast.error("Упс произошла ошибка попробуйте позже");
      }
    },

    paginate(){
      this.current_page +=1;
      this.loadData();
    },
    //Выполняем сортировку с пересбором новых данных
    sortBySelect(e){
      this.orderBy = e;
      this.loadData();
    },
    //Поиск
    onSearch(){
      this.current_page = 1;
      this.loadData();
    },

  },

  async asyncData({$axios,query}) {
    let activeCheckbox = {};
    let categories, places = [];
    let current_page,last_page = 1;

    try{
      await $axios.$get("/categoriesofthe-places-all").then((e)=>{categories = e});
    }
    catch (e) {
     console.log(e)
    }
    if(query.place){
      activeCheckbox[0] = false;
      if(Object.keys(categories).length > 0){
        for (let item in categories){
          if(categories[item].alias == query.place){
            activeCheckbox[item] = true;
            if(categories[item].children){
              for (let child in categories[item].children){
                activeCheckbox[child] = true
              }
            }
          }
          else{
            activeCheckbox[item] = false;
            if(categories[item].children){
              for (let child in categories[item].children){
                activeCheckbox[child] = false
              }
            }
          }

        }
      }
    }
    else{
      activeCheckbox[0] = true;
      for (let item in categories){
        activeCheckbox[item] = true;
        if(categories[item].children){
          for (let child in categories[item].children){
            activeCheckbox[child] = true
          }
        }
      }
    }
    let category = []
    for (let i in activeCheckbox){
      if(activeCheckbox[i]){
        category.push(i);
      }
    }
    category =  category.length > 0 ? "&categories=" + JSON.stringify(category) : "";
    try{
      await $axios.$get("/places?page=1" + category + "&order=" + "desc" + "&search=" + "").then((e)=>{places = e.data; current_page = e.current_page; last_page = e.last_page});

    }
    catch (e) {
      console.log(e);
    }

    return {categories, places,current_page,last_page,activeCheckbox}
  },
}
</script>

<style scoped lang="scss">
@media screen and (min-width: 1000px){
  .guide-list__item-img{
    min-height: 370px!important;
  }
}
@media screen and (max-width: 370px){
  .guide-list__item-img{
    min-height: 280px!important;
  }
}
@media screen and (min-width: 370px) and (max-width: 450px){
  .guide-list__item-img{
    min-height: 200px!important;
  }
}
@media screen and (min-width: 370px) and (max-width: 450px){
  .guide-list__item-img{
    min-height: 200px!important;
  }
}
@media screen and (min-width: 450px) and (max-width: 700px){
  .guide-list__item-img{
    min-height: 300px!important;
  }
}
@media screen and (min-width: 700px) and (max-width: 1000px){
  .guide-list__item-img{
    min-height: 350px!important;
  }
}

</style>

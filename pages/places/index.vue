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
                  <svg onclick="guideListAccordion()" v-if="item.children" class="guide-list__accordion-trigger-svg" xmlns="http://www.w3.org/2000/svg" width="9.318" height="4.985" viewBox="0 0 9.318 4.985"><g transform="translate(-6.4 -33.4)"><path d="M15.623,33.5a.329.329,0,0,0-.466,0l-4.094,4.1-4.1-4.1a.329.329,0,0,0-.466.466l4.326,4.326a.321.321,0,0,0,.233.1.335.335,0,0,0,.233-.1l4.326-4.326A.323.323,0,0,0,15.623,33.5Z" transform="translate(0)"/></g></svg>
                </div>
<!--                  Подкатегории путеводителя-->
                <div class="guide-list__accordion-content" v-if="item.children">
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
            <div class="guide-list__select-wrapper select__wrapper d-block">
              <div class="guide-list__select-label select__label">{{ $t('show_to') }}:</div>
              <div class="guide-list__select select">
                  <v-select
                    :items="sorts"
                    v-model="sorts.value"
                    item-text='title'
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
                <div class="guide-list__item-category" v-for="(item,i) in item.category" :key="i">
                  {{item['title_'+$i18n.locale]}} /
                </div>
              </div>
              <div class="guide-list__item-content">
                <NuxtLink :to="'/places/'+item.alias" class="guide-list__item-title">
                  {{item['title_'+$i18n.locale]}}
                </NuxtLink>
                <p class="guide-list__item-text" v-html="truncate(item['description_'+$i18n.locale],100)"></p>
                <div class="guide-list__item-about ">
                  <NuxtLink :to="'/places/'+item.alias" class="guide-list__about-link white--text">{{ $t('more_info') }}</NuxtLink>
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
      sorts:[
        {title:this.$t('new_records'),value:"desc"},
        {title:this.$t('old_records'),value:"asc"},
      ],
      search:""
    }
  },

  computed:{
    getCategoryId(){
      let categories = []
      for (let i in this.activeCheckbox){
          if(this.activeCheckbox[i]){
            categories.push(i);
          }
      }
      return categories.length > 0 ? "&categories=" + JSON.stringify(categories) : "";
    }
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

    getImages(data){
      return this.$store.state.image.image + data ;
    },
    truncate(string, value) {
      return string.length > value ? string.substring(0, value) + '…' : string;
    },
    async loadData(){
      console.log(this.orderBy);
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

<style scoped>

</style>

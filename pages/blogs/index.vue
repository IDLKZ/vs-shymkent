<template>
  <section class="blog-list">
    <div class="container">
      <ul class="crumbs">
        <li class="crumbs__item">
          <a href="/">{{ $t('main') }}</a>
        </li>
        <li class="crumbs__item current">
          <a href="#">{{ $t('blog') }}</a>
        </li>
      </ul>
      <div class="top-content">
        <div class="top-content__wrapper top-content__wrapper-6">
          <h2 class="top-content__title">
            {{$t('blog')}}
          </h2>
          <p class="top-content__text">
            {{$t('blogs_subtitle')}}
          </p>
        </div>
        <div class="top-content__line"></div>
      </div>
      <div class="blog-list__tabs active">
        <ul class="blog-list__tabs-caption">
          <li :class="getActiveClass(0)"  @click="toggleActiveClass(0)">
            {{$t('all')}}
          </li>
          <template v-if="tags.length">
          <li  v-for="(item) in tags" :key="item.created_at + item.id" :class="getActiveClass(item.id)" @click="toggleActiveClass(item.id)">
            {{item['title_'+$i18n.locale]}}
          </li>
            <li :class="getActiveClass(-1)" @click="toggleActiveClass(-1)">
              {{$t('author')}}
            </li>
          </template>
        </ul>
        <div class="blog-list__select-inner">
          <div class="blog-list__select-wrapper select__wrapper">
            <div class="blog-list__select select d-flex">
<!--              <div class="blog-list__select-label select__label">{{$t('show_to')}}:</div>-->
              <div class="blog-list__select-header select__header mx-2">
                <v-select
                  :items="sorts"
                  v-model="sorts.value"
                  :label="$t('show_to')"
                  item-text='title'
                  @change="sortBySelect"
                  dense
                ></v-select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template v-if="activeClass == -1">
        <div class="blog-list__authors">
          <div class="blog-list__authors-categories">
            <h3 class="blog-list__categories-title">
              {{$t('categories')}}
            </h3>
            <ul class="blog-list__authors-categories-list">
              <li>
                <input type="checkbox" id="0" :checked="getActiveCheckBox(0)" @click="toggleActiveCheckBox(0)">
                <label :for="0">{{$t('all')}}</label>
              </li>
              <li v-for="item in tags">
                <input type="checkbox" :id="item.id" :checked="getActiveCheckBox(item.id)" @click="toggleActiveCheckBox(item.id)">
                <label :for="item.id">{{ item["title_" + $i18n.locale] }}</label>
              </li>

            </ul>
          </div>
          <div class="blog-list__authors-content">
            <div class="blog-list__authors-search-inner">
              <input id="blog-list__authors-search" type="search" :placeholder="$t('author')" v-model="search" @keyup.enter="onSearch">
              <label for="blog-list__authors-search"></label>
            </div>
            <div class="blog-list__authors-list" v-if="authors.length">
              <div class="blog-list__author-item" v-for="(author,index) in authors" :key="author.created_at + index">

                <a href="#" class="blog-list-title text--bold">
                  <v-avatar>
                    <img :src="getImage(author.image)">
                  </v-avatar>
                  {{author.name}}
                </a>
                <p class="blog-list__author-notecount">Количество записей: <span>
                  {{author.blogs.length}}
                </span></p>
                <div class="blog-list__author-categories-wrapper">
                  <span>{{$t('categories')}}:</span>
                  <ul class="blog-list__author-categories" v-if="author.blogs.length">
                    <li v-for="(blog,index) in author.blogs" :key="blog.created_at + index">
                      <a href="#">#{{blog.tag["title_" + $i18n.locale]}}</a>
                    </li>
                  </ul>
                </div>
              </div>


            </div>
            <div class="load-more" v-if="current_page < last_page">
              <a @click.prevent="paginate">{{$t('load_more')}}</a>
            </div>
          </div>
        </div>
      </template>
      <template v-if="activeClass != -1">
        <div class="blog-list__items" v-if="blogs.length">
          <div class="blog-list__item" v-for="blog in blogs" :key="blog.created_at +blog.id">
            <div class="blog-list__item-img" :style="{backgroundImage:'url(' + getImage(blog.image) + ')'}"></div>
            <div class="blog-list__item-content">
              <div class="blog-list__info">
                <div class="blog-list__date">
                  {{$t('published')}}: <span>{{blog.created_at}}</span>
                </div>
                <div class="blog-list__tag">
                  #{{blog.tag["title_" + $i18n.locale]}}
                </div>
              </div>
              <NuxtLink :to="'/blogs/' + blog.alias" class="blog-list__text">
                {{truncateTitle(blog["title_" + $i18n.locale],100)}}
              </NuxtLink>
              <div class="blog-list__info">
                <div class="blog-list__author">
                  {{blog.user.name}}
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="load-more" v-if="current_page < last_page">
          <a @click.prevent="paginate">{{$t('load_more')}}</a>
        </div>
      </template>

    </div>
  </section>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      tags:[],
      authors:[],
      activeClass:0,
      blogs:[],
      current_page:1,
      last_page:1,
      sorts:[
        {title:this.$t('new_records'),value:"desc"},
        {title:this.$t('old_records'),value:"asc"},
      ],
      orderBy:"desc",
      activeCheckbox:[],
      search:""
    }
  },
  computed:{
    getTagId(){
      let arr = [-1,0];
      return arr.includes(this.activeClass) == true ? "" : "&tag_id="+this.activeClass
    },
    getCheckBoxTags(){
      return this.activeCheckbox.length > 0 ? "&tag_id=" + JSON.stringify(this.activeCheckbox) : "";
    }
  },
  methods:{
    //Отметить активную кнопку
    getActiveCheckBox(index){
        if(this.activeCheckbox.includes(index) || this.activeCheckbox.length == this.tags.length  + 1){
          return true;
        }
        else{
          return  false;
        }
    },
      //Переключать
    toggleActiveCheckBox(index){
      if(index == 0){
        if(this.activeCheckbox.includes(index)){
          this.activeCheckbox = [];
        }
        else{
            this.activeCheckbox = [];
            this.activeCheckbox.push(0);
            for(let i = 0; i < this.tags.length; i++){
              this.activeCheckbox.push(this.tags[i].id);
            }
        }
      }
      else{
        let pos = this.activeCheckbox.indexOf(index);
        if(pos == -1){
          this.activeCheckbox.push(index);
        }
        else{
          this.activeCheckbox.splice(pos,1)
        }
        if(this.activeCheckbox.includes(0)){
          if(this.activeCheckbox.length <= this.tags.length){
            this.activeCheckbox.splice(this.activeCheckbox.indexOf(0),1);
          }
        }
        else{
          this.activeCheckbox.length === this.tags.length ? this.activeCheckbox.push(0) : null;
        }
      }
      this.current_page = 1;
      this.loadData();
    },
    //Поиск
    onSearch(){
      this.current_page = 1;
      this.loadData();

    },

    //Активные табы
    getActiveClass(index){
      if(index == this.activeClass){
        return "news-list__categories-item active"
      }
      else{
        return "news-list__categories-item"
      }
    },
    //Переключение между табами
    toggleActiveClass(index){
      this.activeClass = index;
      this.current_page =1;
      this.loadData();
    },
    //Загружаем новые страницы
    async loadData(){
        if(this.activeClass != -1){
          this.$axios.$get("/blogs?page=" + this.current_page + this.getTagId + "&order=" + this.orderBy).then(e=>{
            this.current_page == 1 ? (this.blogs = e.data) : (this.blogs.push(...e.data));
            this.current_page = e.current_page;
            this.last_page = e.last_page;
          }).catch(e=>{console.log(e)});
        }
        else{
          this.$axios.$get("/author-blogs?page=" + this.current_page + this.getCheckBoxTags + "&search=" + this.search).then(e=>{
            this.current_page == 1 ? (this.authors = e.data) : (this.authors.push(...e.data));
            this.current_page = e.current_page;
            this.last_page = e.last_page;
          }).catch(e=>{console.log(e)});
        }

        },


    //Выполняем сортировку с пересбором новых данных
    sortBySelect(e){
      this.orderBy = e;
      this.loadData();
    },
    //Пагинация с вызовом загрузки новых данных
    paginate(){
      this.current_page +=1;
      this.loadData();
    }


  },
  //Асинхронная загрузка
  async asyncData({$axios}){
    let blogs,tags = [];
    let current_page,last_page = 1;
    await $axios.$get("/tags").then((e)=>{tags = e;}).catch(e=>{console.log(e)})
    await $axios.$get("/blogs").then((e)=>{blogs = e.data;current_page = e.current_page;last_page = e.last_page;}).catch(e=>{console.log(e)})

    return {tags,blogs,current_page,last_page}


  }





}
</script>

<style scoped>

</style>

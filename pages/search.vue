<template>
  <section class="search-page">
    <div class="container">
      <div class="search-page__results-title">
                <span>
                    {{$t('searchable_title')}}:
                </span>
        <div class="search-page__query-text">
          {{ this.$route.query.q }}
        </div>
        <div class="search-page__results-count">
          {{ count }} {{ $t('searchable_result') }}
        </div>
      </div>
      <ul class="search-page__results-list">
        <li class="search-page__result" v-for="(item, key) in this.results" :key="key">
          <div v-if="item.data.length>0">
            <div v-for="(value, i) in item.data" :key="i">
              <div class="search-page__result-top">
                <h4 class="search-page__result-title">
                  {{ value['title_'+$i18n.locale] }}
                </h4>
                <a style="color: white!important;" href="javascript:void (0)" class="search-page__result-tag">
                  {{ key }}
                </a>
                <div v-if="item.current_page < item.last_page">
                  <a style="color: white!important;" @click.prevent="paginate" class="search-page__result-tag mx-4"  v-if="current_page < last_page">
                    {{ $t('load_more') }}...
                  </a>
                </div>
              </div>
              <p class="search-page__result-text" v-html="truncateTitle(value['description_'+$i18n.locale], 300)"></p>
              <NuxtLink :to="value.link" class="search-page__result-btn">
                {{$t('more_info')}}...
              </NuxtLink>
            </div>
          </div>
        </li>
      </ul>
<!--      <div class="load-more">-->
<!--        <a @click.prevent="paginate" href="#"></a>-->
<!--      </div>-->
    </div>
  </section>
</template>

<script>
export default {
  name: "search",
  data(){
    return {

    }
  },
  methods:{
    async loadData(){
      // console.log(this.current_page)
      try{
        await this.$axios.$get("/search/"+this.$route.query.q + "?page=" + this.current_page).then((e)=>{
          for (const [key, item] of Object.entries(e.results)) {
            if (item.last_page > item.current_page){
              this.current_page = item.current_page;
              this.last_page = item.last_page;
            }
            item.data.forEach((value,i) => {
                if(this.current_page == 1) {
                  this.results[key].data = value
                } else {
                  this.results[key].data.push(value)
                }
                if (key == 'Блог'){
                  value.link = '/blogs/'+value.alias
                }
                if (key == 'События'){
                  value.link = '/events/'+value.alias
                }
                if (key == 'Маршруты'){
                  value.link = '/routes/'+value.alias
                }
                if (key == 'Новость'){
                  value.link = '/news/'+value.alias
                }
                if (key == 'Места'){
                  value.link = '/places/'+value.alias
                }
                if (key == 'Сувениры'){
                  value.link = '/souvenirs/'+value.alias
                }
                if (key == 'Организаторы'){
                  if (value.role_id == 4){
                    value.link = '/guides/'+value.alias
                  }
                  if (value.role_id == 5){
                    value.link = '/agencies/'+value.alias
                  }
                }
                if (key == 'Магазины'){
                  if (value.role_id == 6){
                    value.link = '/craft/'+value.alias
                  }
                  if (value.role_id == 7){
                    value.link = '/craftman/'+value.alias
                  }
                }
              })
          }
          // console.log(this.results)
          // console.log(this.current_page)
          // console.log(this.last_page)
        }).catch((e)=>{
          console.log(e);
        })
      }
      catch (e) {
        this.$toast.error("Упс произошла ошибка! Попробуйте позже");
      }
    },
    paginate(){
      this.current_page +=1;
      this.loadData();
    }
  },
  async asyncData({$axios, route}) {
    let results = []
    let count;
    let current_page = 1
    let last_page = 1
    try{
      await $axios.$get("/search/"+route.query.q).then((e)=>{
        results = e.results
        count = e.count
        for (const [key, item] of Object.entries(results)) {
          if (item.last_page > item.current_page){
            current_page = item.current_page;
            last_page = item.last_page;
          }
          item.data.forEach((value,i) => {
            if (key == 'Блог'){
              value.link = '/blogs/'+value.alias
            }
            if (key == 'События'){
              value.link = '/events/'+value.alias
            }
            if (key == 'Маршруты'){
              value.link = '/routes/'+value.alias
            }
            if (key == 'Новость'){
              value.link = '/news/'+value.alias
            }
            if (key == 'Места'){
              value.link = '/places/'+value.alias
            }
            if (key == 'Сувениры'){
              value.link = '/souvenirs/'+value.alias
            }
            if (key == 'Организаторы'){
              if (value.role_id == 4){
                value.link = '/guides/'+value.alias
              }
              if (value.role_id == 5){
                value.link = '/agencies/'+value.alias
              }
            }
            if (key == 'Магазины'){
              if (value.role_id == 6){
                value.link = '/craft/'+value.alias
              }
              if (value.role_id == 7){
                value.link = '/craftman/'+value.alias
              }
            }
          })
        }
        // console.log(this.results)
      });
    }
    catch (e) {
      console.log(e);
    }
    return {results,count,current_page,last_page}
  },
  mounted() {
    // console.log(this.data)
  }
}
</script>

<style scoped>

</style>

<template>
<section  class="news-list" style="min-height: 1000px">
  <input v-model="myRequest.params.title_ru">
  <div class="news-list__items">
    <div class="news-list__item" v-for="(item,i) in data" :key="i">
      <NuxtLink class="popup-modal" :to="'/news/'+item.alias">
        <img class="news-list__item-img" :src="getImages(item.image)" alt="">
        <div class="news-list__item-date">
          Опубликовано: <span>{{ item.created_at }}</span>
          <p>{{item["title_" + $i18n.locale]}}</p>
        </div>
      </NuxtLink>
    </div>
  </div>

<button @click="nextPage">
  Next Page
</button>
  <button @click="firstPage">
    First Page
  </button>


  <div>
    <v-file-input @change="uploadPhoto">

    </v-file-input>
    <div v-if="fails.errors && fails.errors.image">
      <span class="error--text v-size--small" v-for="(err,i) in fails.errors.image" :key="i">{{err}}</span>
    </div>

    <pre>
      {{fails}}
    </pre>
    <v-btn class="btn my-btn" @click="sendPhoto" v-if="photo">
      SEND
    </v-btn>



  </div>


</section>
</template>

<script>
export default {
  name: "test.vue",

  data(){
    return{
      photo:null,
      fails:[],
      myRequest:{url:"/all-news",page:1,
        params:{
          title_ru:""
        }


      },
    }
  },

  computed: {
    data(){
      return this.$store.state.test.data
    },

  },

  methods:{
    async loadData(){
      this.$store.dispatch("test/increment",this.myRequest);
    },
    nextPage(){
      this.myRequest.page = 2;
    },
    firstPage(){
      this.myRequest.page = 1;
    },
    getImages(data){
      return this.$store.state.image.image + data ;
    },
    uploadPhoto(e) {
      this.photo = e;
    },

    async sendPhoto(){
      let formData = new FormData();
      formData.append("image",this.photo);
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      await this.$axios.$post("/test", formData, config).then(async (e) => {
        this.$toast.success('Фото успешно добавлено')
        console.log(e);
        this.photo = null;
      }).catch(error => {
        this.fails = error.response.data
      })
    }
  },
  watch:{
    myRequest: {
     async handler(val){
       await this.loadData();
      },
      deep: true

    },
  },

  created() {
    //Глобальный STORE -> STATES -> IMAGE.JS -> IMAGE STATE

    this.$store.dispatch("test/increment",this.myRequest);
    this.data = this.$store.state.test.data;

  },



}
</script>

<style scoped>

</style>

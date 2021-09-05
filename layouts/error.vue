<template>
  <v-app dark>
<!--    <h1 v-if="error.statusCode === 404">-->
<!--      {{ pageNotFound }}-->
<!--    </h1>-->
<!--    <h1 v-else>-->
<!--      {{ otherError }}-->
<!--    </h1>-->
    <v-container>
      <v-row>
        <v-col md="12">
          <v-img src="https://i.pinimg.com/originals/86/41/80/86418032b715698a4dfa6684b50c12af.gif"
          width="100%"
          >

          </v-img>
        </v-col>
        <v-col md="12" class="my-4 text-center align-center">
          <NuxtLink to="/">
            Главная страница/Main Page
          </NuxtLink>
        </v-col>



      </v-row>


    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>

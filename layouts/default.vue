<template>
  <section>
    <v-app>
      <Navbar/>
      <Nuxt/>
      <Footer/>
    </v-app>
  </section>
</template>

<script>


import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default {
  components: {Footer, Navbar},
  middleware: 'localeLang',
  methods:{
    logout() {
      this.$auth.logout()
    }
  },
  mounted() {

  }
}
</script>
<style lang="scss">
.load-more{
  a{
    &:hover{
      color: white!important;
    }
  }
}
#__replain_widget{

}


</style>

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
  methods:{
    logout() {
      this.$auth.logout()
    }
  },
  mounted() {

  }
}
</script>

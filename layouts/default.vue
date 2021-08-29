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
import {mapGetters} from "vuex";
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

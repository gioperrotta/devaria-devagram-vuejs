<script lang="ts">
import { defineComponent } from 'vue'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'

export default defineComponent({
  components: { Header, Footer },

});
</script>

<template>
  <Header/>

  <Footer />
</template>
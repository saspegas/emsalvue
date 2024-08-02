<template>
  <main class="container mx-auto">
    <Header />
    <router-view />
  </main>
</template>

<script>
import Header from './components/Header.vue'

export default {
  components: {
    Header
  }
}
</script>


<style scoped>

</style>

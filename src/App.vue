<script>
import Navbar from './components/Navbar.vue'
import '../node_modules/materialize-css/dist/css/materialize.min.css'

export default { name: 'app', components: { Navbar } }
</script>

<template>
  <div>
    <Navbar />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style scoped></style>

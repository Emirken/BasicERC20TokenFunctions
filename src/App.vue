<template>
  <v-app>
    <app-bar/>
    <v-main class="main-style">
      <router-view/>
    </v-main>
  </v-app>

</template>

<style lang="scss">
.main-style{
  margin: 70px 70px !important;
}
</style>
<script setup lang="ts">
import AppBar from "@/AppBar.vue";
</script>
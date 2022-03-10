<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import WeatherView from './components/WeatherView.vue'
import DeviceCard from './components/DeviceCard.vue'
</script>

<template>
  <router-view/>
</template>


<style>
body {
  background-color: #211c2c;
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 600;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}
</style>

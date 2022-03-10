<template>
  <div class="p-4 mt-4">
    <WeatherView></WeatherView>
    <div class="grid grid-cols-2 gap-6 mt-6">
        <DeviceCard :device="device" v-for="device in devices" :key="device.id" @click="this.$router.push('/device/' + device.id)" ></DeviceCard>
    </div>
  </div>
</template>

<script>
import WeatherView from './WeatherView.vue'
import DeviceCard from './DeviceCard.vue'
import { getAllDevices, getAllRooms } from '../rest.js'
export default {
    components: {
        WeatherView,
        DeviceCard
    },

    data() {
      return {
        devices: []
      }
    },

    async created() {
      this.devices = await getAllDevices()
      console.log(this.devices)
    }
}
</script>

<style>

</style>
<template>
  <div class="p-4 mt-12">
    <button @click="openSettings" class="absolute top-2 left-2 w-16 h-14">
        <fa icon="gear" class="float-left ml-4 text-3xl"/><br>
    </button>
    <WeatherView></WeatherView>

    <div class="grid grid-cols-3 text-xl mt-6">
        <p class="ml-20">Rooms</p>
        <div class="mb-12 -mt-8 ml-5">
            <input id="filter" type="checkbox" class="appearance-none peer" />
            <span @click="toggleCheckbox" class="-mb-20 w-16 h-10 flex ml-4 p-1 bg-fuchsia-500 rounded-full duration-300 ease-in-out peer-checked:bg-pink-500 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span>
        </div>  
        <p class="mr-24">Devices</p>
    </div>
    
    <div v-if="checked" class="grid grid-cols-2 gap-6 mt-6">
        <DeviceCard :device="device" v-for="device in devices" :key="device.id" @click="this.$router.push('/device/' + device.id)" ></DeviceCard>
        <EmptyCard @click="this.$router.push('/device/add')"></EmptyCard>
    </div>
    <div v-else class="grid grid-cols-2 gap-6 mt-6">
        <RoomCard :room="room" v-for="room in rooms" :key="room.id" @click="this.$router.push('/room/' + room.id)"></RoomCard>
         <EmptyCard @click="this.$router.push('/room/add')"></EmptyCard>
    </div>
  </div>
</template>

<script>
import WeatherView from './weather/WeatherView.vue'
import DeviceCard from './device/DeviceCard.vue'
import EmptyCard from './device/EmptyCard.vue'
import RoomCard from './room/RoomCard.vue'
import { getAllDevices, getAllRooms } from '../rest.js'
import Swal from 'sweetalert2'
import config from '../config'
export default {
    components: {
        WeatherView,
        DeviceCard,
        RoomCard,
        EmptyCard
    },

    data() {
      return {
        devices: [],
        rooms: [],
        checked: false
      }
    },

    async created() {
        setInterval(async () => {
            if(this.devices.length == 0 && this.rooms.length == 0) {
                this.devices = await getAllDevices()
                this.rooms = await getAllRooms()
            }  
        }, 100);
    },

    methods: {
        openSettings() {
            Swal.fire({
                title: 'Settings',
                width: "80%",
                html: 
                `
                <p>Server IP</p>
                <input id='serverip-input' value="${config.serverIp}" class='bg-slate-800 border-slate-800 duration-200 border-2 mt-4 focus:border-fuchsia-800 outline-none rounded-lg  ' type='text'>
                `,
                background: '#302940',
                color: 'white',
                confirmButtonText: "Save"
            })
            .then(result => {
                if(result.isConfirmed) {
                    const ip = document.getElementById('serverip-input').value
                    config.serverIp = ip
                }
            })
        },

        toggleCheckbox() {
            const checkbox = document.getElementById('filter')
            checkbox.checked = !checkbox.checked;
            this.checked = checkbox.checked
        }
    }
}
</script>

<style>

</style>
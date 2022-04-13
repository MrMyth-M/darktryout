<template>
    <div class="p-4 mt-12">
        <BackBar :path="'/home'"></BackBar>
        <div class="">
            <h1 class="text-4xl font-black">{{ room.name }}</h1>
            <fa class="h-32 mt-4" :icon="room.icon"/><br>
            <select v-model="room.icon" class="font-black text-center w-16 h-12 border-slate-800 bg-slate-800 rounded-lg outline-none border-4 focus:border-fuchsia-800 duration-200" name="" id="">
                <option class="text-center" :value="icon[0]" v-for="icon in icons" :key="icon[0]">{{icon[1]}}</option>
            </select>
        </div>
        <h1 class="mt-6 text-4xl font-bold">Devices</h1>
       <div class="grid grid-cols-2 gap-6 mt-4">
           <DeviceCard :displayRoom='false' :device="device" v-for="device in devices" :key="device.id" @click="this.$router.push({name:'device', params: {id: device.id, from: '/room/' + room.id}})" ></DeviceCard>
       </div>
    </div>
</template>'

<script>
import { getDevicesByRoomId, getRoomById } from '../../rest'
import DeviceCard from '../device/DeviceCard.vue'
import BackBar from '../BackBar.vue'
export default {
    components: {
        DeviceCard,
        BackBar
    },

    data() {
        return {
            room: [],
            devices: [],
            icons: [["couch", ''], ["bed", ''], ['baby', ''], ['briefcase', ''] ]
        }
    },

    async created() {
        const id = this.$route.params.id
        const rooms = await getRoomById(id)
        this.room = rooms[0]
        this.devices = await getDevicesByRoomId(this.room.id)
    }
}
</script>

<style>

</style>
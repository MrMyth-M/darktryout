<template>
    <div class="w-full h-[11rem] bg-gradient-to-b from-purple-800 to-pink-500 m-auto p-4 rounded-lg">
        <fa :icon="device.icon" class="text-8xl"/>
        <p class="text-2xl -mb-2 mt-2 font-black">{{ device.name }}</p>
        <p v-if="this.displayRoom != false" class="text-md">{{ room.name }}</p>
        <p v-else class="text-md">{{ device.ipAddress }}</p>
    </div>
</template>

<script>
import { getRoomById } from '../../rest'
export default {

    props:['device', 'displayRoom'],

    data() {
        return {
            room: ""
        }
    },

 
    async created() {
        const rooms = await getRoomById(this.device.roomId)
        this.room = rooms[0]
    }
   
}
</script>

<style>

</style>
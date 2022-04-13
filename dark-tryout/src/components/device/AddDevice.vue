<template>
    <div class="p-8">
        <BackBar :path="'/home'"></BackBar>
        <h1 class="text-4xl font-black">Add Device</h1>
        <div>
            <p class="text-3xl mt-6 mb-2 font-bold">1 - Select a room</p>
            <div :class="{'active': this.newDevice.roomId == room.id}" class="w-4/5 m-auto h-12 bg-gradient-to-r from-purple-700 to-pink-500 mt-2 rounded-lg opacity-80 grayscale hover:scale-105 duration-300" 
                v-for="room in rooms" :key="room.id" @click="setRoom(room)">
                <fa class="p-4 w-12 float-left" :icon="room.icon"/>
                <p class="text-xl font-black py-3 text-left">{{ room.name }}</p>
            </div>
        </div>
        <div>
            <p class="text-3xl mt-10 mb-2 font-bold">2 - Enter Device Data</p>
            <div class="w-4/5 m-auto text-lg">
                <div class="mt-3">
                    <p class="text-left font-black ml-1">Name</p>
                    <input v-model="newDevice.name" type="text" class="text-2xl p-1 bg-slate-800 border-slate-700 focus:scale-105 duration-200 border-4 focus:border-fuchsia-800 outline-none rounded-lg">
                </div>
                <div class="mt-3">
                    <p class="text-left font-black ml-1">IP Address</p>
                    <input v-model="newDevice.ipAddress" type="text" class="text-2xl p-1 bg-slate-800 border-slate-700 focus:scale-105 duration-200 border-4 focus:border-fuchsia-800 outline-none rounded-lg">
                </div>
            </div>
        </div>
        <p class="text-3xl mt-10 mb-4 font-bold">3 - Select Device Icon</p>
        <div class="grid grid-cols-3 gap-6 w-[90%] m-auto">
            <div :class="{'active': this.newDevice.icon == icon}" class="h-[5.5rem] duration-300 bg-gradient-to-b from-purple-800 to-pink-500 float-left p-1 rounded-lg opacity-80 grayscale" 
                v-for="icon in icons" :key="icon" @click="newDevice.icon = icon">
                <div class="bg-slate-800 w-full h-full rounded-lg p-4">
                    <fa class="h-10 mt-1" :icon="icon"/>
                </div>
            </div>
        </div>
        <div class="fixed -right-4 -bottom-4 w-20 h-20 rounded-full bg-gradient-to-b from-purple-800 to-pink-400 opacity-80 hover:scale-110 hover:opacity-100 duration-300">
            <fa class="h-10 p-5" icon="check"/>
        </div>
    </div>
    
</template>

<script>
import { getAllRooms } from '../../rest'
import BackBar from "../BackBar.vue"
export default {
    components: {
        BackBar
    },

    async created() {
        this.rooms = await getAllRooms()
    },
    
    data() {
        return {
            rooms: [],
            newDevice: {name: undefined, ipAddress: undefined, roomId: undefined, icon: undefined},
            icons: ["lightbulb", "tv", "desktop", "utensils", "car"]
        }
    },

    methods: {
        setRoom(room) {
            this.newDevice.roomId = room.id
        }
    }
}
</script>

<style scoped>
    .active {
        filter: none;
        opacity: 1;
        scale: 1.1;
    }
</style>
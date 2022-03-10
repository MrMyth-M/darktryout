<template>
    <div class="w-5/6 mt-10 m-auto text-2xl">
        <fa :icon="icon" class="h-40"/><br>
        <h1 class="text-4xl font-bold mt-4">{{ device.name }}</h1>
        <div class="font-bold">
            <div class="mt-8">
                <p>Icon</p>
                <select v-model="icon" class="text-center w-16 border-slate-800 bg-slate-800 rounded-lg outline-none border-4 focus:border-fuchsia-800 duration-200" name="" id="">
                    <option class="text-center" v-for="icon in icons" :key="icon[0]" :value="icon[0]">{{icon[1]}}</option>
                </select>
            </div>
            <div class="mt-3">
                <p>Device Name</p>
                <input :value="device.name" type="text" class="bg-slate-800 border-slate-800 focus:scale-105 duration-200 border-4 focus:border-fuchsia-800 outline-none rounded-lg">
            </div>
            <div class="mt-3">
                <p>IP Address</p>
                <input :value="device.ipAddress" type="text"  class="bg-slate-800 border-slate-800 focus:scale-105 duration-200 border-4 focus:border-fuchsia-800 outline-none rounded-lg" >
            </div>
            <div class="mt-3">
                <p>Room</p>
                <select class="w-72 border-slate-800 bg-slate-800 rounded-lg outline-none border-4 focus:border-fuchsia-800 duration-200" name="" id="">
                    <option class="selected:bg-green-200" v-for="room in rooms" :key="room.id" :value="room.id" >{{ room.name }}</option>
                </select>
            </div>
            <div class="mt-12">
                <button @click="save" class="w-40 p-2 rounded-lg bg-gradient-to-b from-purple-800 to-pink-600 active:scale-110 duration-200">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
import { getAllRooms, getDeviceById } from '../rest'
export default {
    data() {
        return {
            device: [],
            rooms: [],
            icons: [["tv", ''], ["lightbulb", ''], ['car', ''] ],
            icon: ""
        }
    },

    async created() {
        const response = await getDeviceById(this.$route.params.id)
        this.device = response[0]
        this.rooms = await getAllRooms()
    }
}
</script>
}

<style>
    select {
        font-family: 'FontAwesome';
    }
</style>
<template>
    <div class="w-5/6 mt-14 m-auto text-2xl">
        <BackBar :path="this.$route.params.from != undefined ? this.$route.params.from : '/home'"></BackBar>
        <fa :icon="device.icon" class="h-40"/><br>
        <h1 class="text-4xl font-bold mt-4">{{ device.name }}</h1>
        <div class="font-bold">
            <div class="mt-8">
                <p>Icon</p>
                <select v-model="device.icon" class="font-black text-center w-16 border-slate-800 bg-slate-800 rounded-lg outline-none border-4 focus:border-fuchsia-800 duration-200" name="" id="">
                    <option class="text-center" v-for="icon in icons" :key="icon[0]" :value="icon[0]">{{icon[1]}}</option>
                </select>
            </div>
            <div class="mt-3">
                <p>Device Name</p>
                <input v-model="device.name" type="text" class="bg-slate-800 border-slate-800 focus:scale-105 duration-200 border-4 focus:border-fuchsia-800 outline-none rounded-lg">
            </div>
            <div class="mt-3">
                <p>IP Address</p>
                <input v-model="device.ipAddress" type="text"  class="bg-slate-800 border-slate-800 focus:scale-105 duration-200 border-4 focus:border-fuchsia-800 outline-none rounded-lg" >
            </div>
            <div class="mt-3">
                <p>Room</p>
                <select v-model="device.roomId" class="w-72 border-slate-800 bg-slate-800 rounded-lg outline-none border-4 focus:border-fuchsia-800 duration-200" name="" id="">
                    <option class="selected:bg-green-200" v-for="room in rooms" :key="room.id" :value="room.id" >{{ room.name }}</option>
                </select>
            </div>
            <div class="mt-12">
                <button @click="openSaveDialog" class="w-40 p-2 rounded-lg bg-gradient-to-b from-purple-800 to-pink-600 active:scale-110 duration-200">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
import { getAllRooms, getDeviceById, updateDevice } from '../../rest'
import Swal from 'sweetalert2'
import BackBar from '../BackBar.vue'
export default {
    components: {
        BackBar
    },

    data() {
        return {
            device: [],
            rooms: [],
            icons: [["tv", ''], ["lightbulb", ''], ['car', ''], ['desktop', ''], ['utensils', ''] ]
        }
    },

    async created() {
        const response = await getDeviceById(this.$route.params.id)
        this.device = response[0]
        this.rooms = await getAllRooms()
    },

    methods: {
        async openSaveDialog() {
            Swal.fire({
                title: 'Save changes?',
                width: '80%',
                icon: 'question',
                iconColor: 'white',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: 'Save',
                cancelButtonText: 'Cancel',
                confirmButtonColor: 'linear-gradient(#FFF, #000)',
                background: '#302940',
                color: 'white',
                }).then(result => {
                    if(result.isConfirmed) {
                        this.save()
                    }
            })
        },

        async save() {
            const response = await updateDevice(this.device)
                if(response.status === 200) {
                    console.log("UPDATED")
                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        iconColor: 'white',
                        toast: true,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        position: 'top',
                        color: 'white',
                        background: 'linear-gradient(#8600a1,#eb009c) repeat scroll 0 0',
                        timer: 3000
                    })
                }
        }
    }
}
</script>
}

<style>
    select {
        font-family: 'FontAwesome', 'Nunito Sans';
    }
    .swal2-confirm {
        background-color: purple !important;     
        width: 5rem;
        padding: 0.8rem;
        font-weight: bold;
        outline: none !important;
    }
    .swal2-confirm:focus:active {
        outline: none;
    }
    .swal2-cancel {
        background-color: transparent !important;
        border: 1px solid white !important;
        font-weight: bold;
    }
    
</style>
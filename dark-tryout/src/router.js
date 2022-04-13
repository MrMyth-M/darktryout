import DeviceDetail from "./components/device/DeviceDetail.vue"
import AddDevice from "./components/device/AddDevice.vue"
import RoomDetail from "./components/room/RoomDetail.vue"
import AddRoom from "./components/room/AddRoom.vue"
import App from "./components/HomeComponent.vue"
import { createRouter, createWebHistory } from "vue-router"


const routes = [
    {
        path: "/",
        name: "default",
        redirect: "/home"
    },
    {
        path: "/home",
        name: "home",
        component: App
    },
    {
        path: "/device/:id",
        name: "device",
        component: DeviceDetail
    },
    {
        path: "/room/:id",
        name: "room",
        component: RoomDetail
    },
    {
        path: "/device/add",
        name: "addDevice",
        component: AddDevice
    },
    {
        path: "/room/add",
        name: "addRoom",
        component: AddRoom
    },
]

const router = createRouter({history: createWebHistory(), routes})
export default router
import DeviceDetail from "./components/DeviceDetail.vue"
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
]

const router = createRouter({history: createWebHistory(), routes})

export default router
import * as core from "express-serve-static-core"
import em from "./entity-manager"
import {Room} from "./model/room"
import {Device} from "./model/device"
import e from "express"

class Router {
    async setup(app: core.Express) {
        this.setupRoutes(app)
    }
    private setupRoutes(app: core.Express) {
        // Get all Rooms
        app.get("/app/room", async (_, res) => {
            const rooms = await em.createQuery<Room>("Room")
            console.log("sending all rooms", JSON.stringify(rooms))
            res.send(rooms)
        })
        // Insert new Room
        app.post("/app/room/insert", async (_, res) => {
            const room = { id: 0, name: _.body.name, area: _.body.area, icon: _.body.icon }
            const response = await em.insert<Room>("Room", room)
            console.log("inserted room " + room)
            res.set("Content-Type", "text/plain").send(response)
        })
        // Insert new Device
        app.post("/app/device/insert", async (_, res) => {
            const device = { id: 0, name: _.body.name, ipAddress: _.body.ipAddress, roomId: _.body.roomId, icon: _.body.icon }
            const response = await em.insert<Device>("Device", device)
            console.log("inserted device " + device)
            res.set("Content-Type", "text/plain").send(response)
        })
        // Update Device Data
        app.put("/app/device/update", async (_, res) => {
            const device = { id: _.body.id, name: _.body.name, ipAddress: _.body.ipAddress, roomId: _.body.roomId, icon: _.body.icon }
            const response = await em.updateDevice(device)
            console.log("updated device: " + response)
            res.sendStatus(200)
        })
        // Get Device By ID
        app.get("/app/device/:id", async (_, res) => {
            const device = await em.getById<Device>("Device", Number(_.params.id))
            console.log("get device by id " + _.params.id, JSON.stringify(device))
            res.send(device)
        })
        // Get Room By ID
        app.get("/app/room/:id", async (_, res) => {
            const room = await em.getById<Room>("Room", Number(_.params.id))
            console.log("get room by id " + _.params.id, JSON.stringify(room))
            res.send(room)
        })
        // Get All Devices
        app.get("/app/device", async (_, res) => {
            const devices = await em.createQuery<Device>("Device")
            console.log("sending all devices", JSON.stringify(devices))
            res.send(devices)
        })
        // Get Devices By Room ID
        app.get("/app/device/room/:id", async (_, res) => {
            const devices = await em.devicesByRoom(Number(_.params.id))
            console.log("sending devices from room id", JSON.stringify(devices))
            res.send(devices)
        })
    }
}
const router = new Router()
export default router

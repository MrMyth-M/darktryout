import * as core from "express-serve-static-core"
import em from "./entity-manager"
import {Room} from "./model/room"
import {Device} from "./model/device"

class Router {
    async setup(app: core.Express) {
        this.setupRoutes(app)
    }
    private setupRoutes(app: core.Express) {
        app.get("/", async (_, res) => {
            res.set("Content-Type", "text/plain").send("hello! ")
        })
        app.get("/app/room", async (_, res) => {
            const rooms = await em.createQuery<Room>("Room")
            console.log("sending rooms", JSON.stringify(rooms))
            res.send(rooms)
        })
        app.post("/app/room/insert", async (_, res) => {
            const room = { id: 0, name: _.body.name, area: _.body.area }
            const response = await em.insert<Room>("Room", room)
            res.set("Content-Type", "text/plain").send(response)
        })
        app.post("/app/device/insert", async (_, res) => {
            const device = { id: 0, name: _.body.name, ipAddress: _.body.ipAddress, roomId: _.body.roomId }
            const response = await em.insert<Device>("Device", device)
            res.set("Content-Type", "text/plain").send(response)
        })
        app.get("/app/device/:id", async (_, res) => {
            const device = await em.getById<Device>("Device", Number(_.params.id))
            console.log("get device by id " + _.params.id, JSON.stringify(device))
            res.send(device)
        })
        app.get("/app/device", async (_, res) => {
            const devices = await em.createQuery<Device>("Device")
            console.log("sending devices", JSON.stringify(devices))
            res.send(devices)
        })
    }
}
const router = new Router()
export default router

import * as core from "express-serve-static-core"
import em from "./entity-manager"
import {School} from "./model/school"
import {Student} from "./model/student"

class Router {
    async setup(app: core.Express) {
        this.setupRoutes(app)
    }
    private setupRoutes(app: core.Express) {
        app.get("/", (_, res) => {
            res.set("Content-Type", "text/plain").send("hello world")
        })
        app.get("/app/school", async (_, res) => {
            const schools = await em.createQuery<School>("School")
            console.log("sending schools", JSON.stringify(schools))
            res.send(schools)
        })
        app.get("/app/student", async (_, res) => {
            const students = await em.createQuery<Student>("Student")
            console.log("sending students", JSON.stringify(students))
            res.send(students)
        })
    }
}
const router = new Router()
export default router

import express from "express"
import router from "./app-router"
import {loadSettings} from "./settings"
import em from "./entity-manager"

const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    if (req.url.startsWith("/api/")) {
        res.set("Content-Type", "application/json")
    }
    next()
})
async function start() {
    const settings = loadSettings()
    console.log("loaded settings", settings)
    await router.setup(app)
    em.initialize(settings.database)
    const port = settings.port ? settings.port : 8080
    app.listen(port, () => {
        console.log(`server is listening on port ${port}`)
    })
}

start()

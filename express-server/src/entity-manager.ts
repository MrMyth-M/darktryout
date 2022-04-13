import {DatabaseSettings} from "./settings"
import {Knex, knex} from "knex"
import { Device } from "./model/device"
import { Room } from "./model/room"

class EntityManager {
    private _knex: Knex

    initialize(databaseSettings: DatabaseSettings) {
        const connection = {
            host : databaseSettings.host,
            user : databaseSettings.username,
            password : databaseSettings.password,
            database : databaseSettings.database
        }

        this._knex = knex({
          client: "mysql",
          connection})
    }

    createQuery<T>(table: string) {
        return this._knex<T>(table)
    }

    getById<T>(table: string, id: number) {
        return this._knex(table).where('id', id)
    }

    insert<T>(table: string, entry : T) {
        return this._knex(table).insert(entry)
    }

    updateDevice(device : Device) {
        return this._knex("Device").where("id", device.id).update({name: device.name, ipAddress: device.ipAddress, roomId: device.roomId, icon: device.icon})
    }

    devicesByRoom(roomId: number) {
        return this._knex("Device").where('roomId', roomId)
    }
}

export default new EntityManager()

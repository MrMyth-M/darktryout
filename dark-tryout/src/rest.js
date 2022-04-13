import config from './config'

const BASE1 = "http://"
const BASE2 = ":8080/app"
// Devices
const DEVICE_ALL = "/device"
const DEVICE_INSERT = "/device/insert"
const DEVICE_BY_ID = "/device"
const DEVICE_UPDATE = "/device/update"
const DEVICE_BY_ROOM = "/device/room"
// Rooms
const ROOM_ALL = "/room"
const ROOM_INSERT = "/room/insert"
const ROOM_BY_ID = "/room"

export async function getAllRooms() {
    return await getAll(ROOM_ALL)
}

export async function insertRoom(room) {
    throw new 'Not implemented'
}

export async function getRoomById(id) {
    return await getAll(ROOM_BY_ID + "/" + id)
}

export async function getAllDevices() {
    return await getAll(DEVICE_ALL)
}

export async function getDeviceById(id) {
    return await getAll(DEVICE_BY_ID + "/" + id)
}

export async function getDevicesByRoomId(id) {
    return await getAll(DEVICE_BY_ROOM + "/" + id)
}

export async function updateDevice(device) {
    const result = fetch(BASE1 + config.serverIp + BASE2 + DEVICE_UPDATE, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(device),
        })
        .then(response => {
            return response
        })
        .catch((error) => {
            console.error('Error updating device:', error);
        });
    return result
}

export async function insertDevice(device) {
    throw new 'Not implemented'
}

async function getAll(url) {
    const options = {
        method: "GET",
        headers: new Headers({ 'content-type': 'application/json' }),
    };
    const response = await fetch(BASE1 + config.serverIp + BASE2 + url, options)
    const json = await response.json()
    return json
}
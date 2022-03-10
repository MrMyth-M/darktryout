const BASEURL = "http://localhost:8080/app"
// Devices
const DEVICE_ALL = "/device"
const DEVICE_INSERT = "/device/insert"
const DEVICE_BY_ID = "/device"
// Rooms
const ROOM_ALL = "/room"
const ROOM_INSERT = "/room/insert"

export async function getAllRooms() {
    return await getAll(ROOM_ALL)
}

export async function insertRoom(room) {
    throw new 'Not implemented'
}

export async function getAllDevices() {
    return await getAll(DEVICE_ALL)
}

export async function getDeviceById(id) {
    return await getAll(DEVICE_BY_ID + "/" + id)
}

export async function insertDevice(device) {
    throw new 'Not implemented'
}

async function getAll(url) {
    const response = await fetch(BASEURL + url)
    const json = await response.json()
    return json
}
<template>
    <div>
        <h1 @click="getGeolocation" class="text-5xl font-bold mb-4">Weather</h1>
        <div class="h-80 p-3 bg-gradient-to-r opacity-90 from-midnight to-pink font-light shadow-xl rounded-3xl" v-if="dataFetched">
            <div class="bg-dark h-full rounded-xl text-4xl text-left p-8 grid grid-cols-3">
                <div class="h-1/2 col-span-2">
                    <!-------Location------------>
                    <fa icon="location-dot" class="text-3xl float-left mr-4 mt-2"/>
                    <p class="text-4xl p-1">{{ cityName }}</p>   
                    <!-------Temperature--------->
                    <p class="text-7xl mt-1 mb-2.5 ml-10">{{ Math.round(currentWeather.temp) }} °C</p>
                </div>
                <div class="h-1/3 ml-16">
                    <fa icon="sun" class="text-3xl float-left"/>
                    <p class="text-2xl ml-10">{{ fromUnixTime(currentWeather.sunrise) }}</p>
                    <fa icon="moon" class="text-3xl float-left"/>
                     <p class="text-2xl ml-10">{{ fromUnixTime(currentWeather.sunset) }}</p>
                </div>
                <div class="col-span-3 text-xl">
                    <div v-for="entry in this.hourlyWeather" class="w-1/6 float-left" :key="entry.dt">
                        <div class="m-auto text-center">
                            <p class="mb-[-1rem]">{{ fromUnixTime(entry.dt) }}</p>
                            <img  :src="`https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`" :alt="entry.weather[0].main">
                            <p class="mt-[-1rem]">{{ Math.round(entry.temp) }} °C</p>
                        </div>
                    </div>
                </div>
            </div>      
        </div>
    </div>
</template>

<script>
import { Geolocation } from '@capacitor/geolocation'
export default {
    data() {
        return {
            currentWeather: [],
            hourlyWeather: [],
            cityName: "",
            apiKey: "236db6590c47647c64b7a8f04d41e518",
            dataFetched: false
        }
    },

    async created() {
       
        const latlon = await this.getGeolocation()
        await this.fetchCityName(latlon.lat, latlon.lon)
        await this.fetchWeatherData(latlon.lat, latlon.lon)
    },


    methods: {
        async fetchWeatherData(lat, lon) {
            const url = `https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${lat}&lon=${lon}&exclude=minutely,daily&appid=${this.apiKey}`
            const response = await fetch(url)
            const json = await response.json()
            this.currentWeather = json.current
            this.hourlyWeather = json.hourly.splice(1, 6)
            this.dataFetched = true
        },

        async fetchCityName(lat, lon) {
            const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${this.apiKey}`
            const response = await fetch(url)
            const json = await response.json()
            this.cityName = json[0].name
        },

        fromUnixTime(time) {
            const date = new Date(time * 1000)
            let hours = date.getHours()
            let minutes = date.getMinutes()
            if(hours.toString().length == 1) {
                hours = "0" + hours
            }
            if(minutes.toString().length == 1) {
                minutes = "0" + minutes
            }
            return hours + ":" + minutes
        },

        async getGeolocation() {
            const coordinates = await Geolocation.getCurrentPosition();
            console.log('Current position:', coordinates);
            return {lat: coordinates.coords.latitude, lon: coordinates.coords.longitude}
        }
    }
}
</script>

<style>

</style>
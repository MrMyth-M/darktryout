<template>
    <div>
        <h1 @click="this.fetchWeatherData(10,10)" class="text-5xl font-bold mb-4">Weather</h1>
        <div class="h-48 p-2 bg-gradient-to-r opacity-90 from-midnight to-pink font-light shadow-xl rounded-3xl">
            <div class="bg-dark h-full rounded-xl text-3xl text-left p-4">
                <div class="float-left">
                    <!-------Location------------>
                    <fa icon="location-dot" class="text-xl float-left mr-2"/>
                    <p class="text-2xl float-right mt-[-0.3rem]">{{ cityName }}</p>   
                    <!-------Temperature--------->
                    <p class="text-5xl mb-2.5 ml-10">{{ Math.round(currentWeather.temp) }} °C</p>
                </div>
                <div class="w-32 float-right text-right">
                    <fa icon="sun" class="text-xl float-left ml-12 mt-1"/>
                    <p class="text-xl">{{ fromUnixTime(currentWeather.sunrise) }}</p>
                    <fa icon="moon" class="text-xl float-left ml-12 mt-1"/>
                     <p class="text-xl">{{ fromUnixTime(currentWeather.sunset) }}</p>
                </div>
                <div class="w-full grid grid-cols-6 text-sm text-center">
                    <div v-for="entry in this.hourlyWeather" :key="entry.dt">
                        <div class="m-auto">
                            <p class="mb-[-1rem]">{{ fromUnixTime(entry.dt) }}</p>
                            <img  :src="`https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`" :alt="entry.weather[0].main">
                            <p class="mt-[-0.8rem]">{{ Math.round(entry.temp) }} °C</p>
                        </div>
                    </div>
                </div>
            </div>      
        </div>
    </div>
</template>

<script>
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
        await this.fetchCityName()
        await this.fetchWeatherData()
    },


    methods: {
        async fetchWeatherData() {
            const url = `https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${48.075077}&lon=${14.460545}&exclude=minutely,daily&appid=${this.apiKey}`
            const response = await fetch(url)
            const json = await response.json()
            this.currentWeather = json.current
            this.hourlyWeather = json.hourly.splice(1, 6)
            this.dataFetched = true
        },

        async fetchCityName() {
            const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${48.075077}&lon=${14.460545}&appid=${this.apiKey}`
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
        }
    }
}
</script>

<style>

</style>
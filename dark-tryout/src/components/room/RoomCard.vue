<template>
    <div class="w-full h-[11rem] bg-gradient-to-b from-purple-800 to-pink-500 m-auto p-4 rounded-lg">
        <fa :icon="room.icon" class="text-8xl"/>
        <p class="text-xl font-black">{{ room.name }}</p>
        <p class="textl-md">{{ room.area }} m<sup>2</sup></p>
    </div>
</template>

<script>
export default {
    props:['room'],
}
</script>

<style>

</style>
<template>
    <button @click="this.$router.push(path)" class="absolute top-0 left-0 w-screen h-14 text-3xl">
        <fa icon="arrow-left" class="float-left ml-4 mt-1"/><br>
    </button>
</template>

<script>
export default {
    props:['path']
}
</script>

<style>

</style>
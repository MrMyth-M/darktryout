<template>
  <div class="p-8">
        <BackBar :path="'/home'"></BackBar>
        
  </div>
</template>

<script>
import BackBar from "../BackBar.vue"
export default {
    components: {
        BackBar
    },
}
</script>

<style>

</style>
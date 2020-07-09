<template>
    <div class="category">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "catalog",
    }
</script>

<style scoped>
    .category {
        width: 100%;
        margin: auto;
    }
</style>

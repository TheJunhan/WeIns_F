<template>
    <el-card class="my-blog" shadow="hover">
        <Blog></Blog>
        <el-divider direction="horizon"></el-divider>
        <Blog></Blog>
        <el-divider direction="horizon"></el-divider>
        <Blog></Blog>
    </el-card>
</template>

<script>
    import Blog from './blog';
    export default {
        components: { Blog },
        data() {

        }
    }
</script>

<style scoped>

</style>

<template>
    <div>
        <el-header>
            <el-tag>Top nav</el-tag>
        </el-header>
        <el-container style="height: 400px">
            <el-tag>sub nav and main content</el-tag>
        </el-container>
        <el-footer>
            <Footer></Footer>
        </el-footer>
    </div>
</template>

<script>
    import Footer from '../components/footer';

    export default {
        name: "home",
        components: { Footer }
    }

</script>

<style scoped>

</style>

<template>
    <div>
        <el-header>
            <Header></Header>
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
    import Header from '../components/topnav';
    import Footer from '../components/footer';

    export default {
        name: "home",
        components: { Header, Footer }
    }

</script>

<style scoped>

</style>

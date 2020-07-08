<template>
    <div>
        <el-header style="z-index: 1000">
            <Header></Header>
        </el-header>
        <el-container style="width: 100%;margin-bottom: 70px">
            <router-view></router-view>
        </el-container>
        <el-footer>
            <Footer style="margin-top: 2%"></Footer>
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

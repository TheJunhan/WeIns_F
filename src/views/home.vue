<template>
    <div>
        <el-header>
            <Header></Header>
        </el-header>
        <el-container>
            <Side style="float: left; margin-left: 2%"></Side>
        </el-container>
        <el-footer>
            <Footer style="margin-top: 2%"></Footer>
        </el-footer>
    </div>
</template>

<script>
    import Header from '../components/topnav';
    import Footer from '../components/footer';
    import Side from '../components/sidenav';

    export default {
        name: "home",
        components: { Header, Footer, Side }
    }

</script>

<style scoped>

</style>

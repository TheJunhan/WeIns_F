<template>
    <div>
        <el-header>
            <Header></Header>
        </el-header>
        <el-container style="width: 100%;margin-bottom: 70px">
            <el-container style="width: 20%">
                <Side style="float: left; margin-left: 2%;margin-top: 100px"></Side>
            </el-container>
            <el-container style="width: 80px;height: 1000px;background-color: red"></el-container>
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

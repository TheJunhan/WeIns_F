<template>
    <div class="home">
        <el-header id="float">
            <Header ></Header>
        </el-header>
        <el-container style="width: 100%;margin-bottom: 70px;z-index: -1">
            <router-view ></router-view>
        </el-container>
        <el-footer>
            <Backtop></Backtop>
            <Footer style="margin-top: 2%"></Footer>
        </el-footer>
    </div>
</template>

<script>
    import Header from '../components/topnav';
    import Footer from '../components/footer';
    import Backtop from '../components/backtop';

    export default {
        name: "home",
        components: { Header, Footer, Backtop }
    }

</script>

<style scoped>
    .home {
        background-color: #A7CFE8;
    }
</style>

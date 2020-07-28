<template>
    <div class="home" style="width: 100%; background-color: #A7CFE8">
        <el-header id="float">
            <Header></Header>
        </el-header>
        <el-container style="width: 100%;margin-bottom: 70px">
            <div class="category" style="width: 100%; margin: auto">
                <Issue></Issue>
            </div>
        </el-container>
        <el-footer>
            <Footer style="margin-top: 2%"></Footer>
        </el-footer>
    </div>
</template>

<script>
    import Header from '../components/topnav';
    import Footer from '../components/footer';
    import Issue from '../components/issue';

    export default {
        components: { Header, Footer, Issue },
    }
</script>

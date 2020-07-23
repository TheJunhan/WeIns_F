<template>
    <div class="home" style="width: 100%">
        <el-header id="float">
            <Header ></Header>
        </el-header>
        <el-container style="width: 100%;margin-bottom: 70px">
            <div class="category">
<!--                <router-view></router-view>-->
<!--                <div class="issue">-->
<!--                    <div class="side" style="position: fixed;height: 300px;margin-top: 30px">-->
<!--                        <Side style="float: left; margin-left: 2%;"></Side>-->
<!--                    </div>-->
<!--                    <div class="container">-->
<!--                        <div class="release">-->
<!--                            <Release></Release>-->
<!--                        </div>-->
<!--                        <div class="blogs">-->
<!--                            <Blog></Blog>-->
<!--                            <el-divider direction="horizon"></el-divider>-->
<!--                            <Blog></Blog>-->
<!--                            <el-divider direction="horizon"></el-divider>-->
<!--                            <Blog></Blog>-->
<!--                            <el-divider direction="horizon"></el-divider>-->
<!--                            <Blog></Blog>-->
<!--                            <el-divider direction="horizon"></el-divider>-->
<!--                            <Blog></Blog>-->
<!--                            <el-divider direction="horizon"></el-divider>-->
<!--                            <Blog></Blog>-->
<!--                            <el-divider direction="horizon"></el-divider>-->
<!--                            <Blog></Blog>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div>-->
<!--                        <el-card class="login" v-if="true">-->
<!--                            <Login style="width: 100%;"></Login>-->
<!--                        </el-card>-->
<!--                    </div>-->

<!--                </div>-->
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

    import  Issue from '../components/issue'

    export default {
        name: "home",
        components: { Header, Footer,  Issue},

    }

</script>

<style scoped>
    .home {
        background-color: #A7CFE8;
    }
    .issue {
        background-color: #A7CFE8;
    }

    .container {
        width: 50%;
        float: left;
        margin-left: 10%;
    }

    .release {
        /*height: 300px;*/
        margin-bottom: 10px;
    }

    .blogs {
        margin-top: 10px;
    }

    .login {
        float: left;
        width: 30%;
        margin-left: 5%;
        background-color: #F2F2F5;
        margin-top: 100px;
        scroll-behavior: auto;
        display: block;
    }
    .category {
        width: 100%;
        margin: auto;
    }
</style>

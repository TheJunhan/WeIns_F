<template>
    <div class="issue">
        <Side style="float: left; margin-left: 2%"></Side>
        <div class="container">
            <div class="release">
                <Release></Release>
            </div>
            <div class="blogs">
                <Blog></Blog>
                <el-divider direction="horizon"></el-divider>
                <Blog></Blog>
                <el-divider direction="horizon"></el-divider>
                <Blog></Blog>
                <el-divider direction="horizon"></el-divider>
                <Blog></Blog>
                <el-divider direction="horizon"></el-divider>
                <Blog></Blog>
                <el-divider direction="horizon"></el-divider>
                <Blog></Blog>
                <el-divider direction="horizon"></el-divider>
                <Blog></Blog>
            </div>
        </div>
        <el-card class="login" v-if="true">
            <Login style="width: 100%;"></Login>
        </el-card>
    </div>
</template>

<script>
    import Side from '../components/sidenav';
    import Login from "./signinForm";
    import Blog from "./blog";
    import Release from "./release";

    export default {
        name: "issue",
        components: { Release, Login, Side, Blog },
        data() {
            return {
                issue: '',
            }
        },
        created() {

        }
    }
</script>

<style scoped>
    .issue {
        background-color: #A7CFE8;
    }

    .container {
        width: 50%;
        float: left;
        margin-left: 5%;
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
    }
</style>

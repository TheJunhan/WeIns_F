<template>
    <div class="issue">
        <Side style="float: left; margin-left: 2%"></Side>
        <div class="container">
            <el-tag>{{issue}}</el-tag>
        </div>
        <div class="login" v-if="true">
            <Login></Login>
        </div>
    </div>
</template>

<script>
    import Side from '../components/sidenav';
    import Login from "../components/login";
    export default {
        name: "issue",
        components: {Login, Side },
        data() {
            return {
                issue: '',
            }
        },
        created() {
            this.issue = 'hello world!';
        }
    }
</script>

<style scoped>
    .issue {
    }

    .container {
        width: 60%;
        height: 500px;
        float: left;
        margin-left: 5%;
        background-color: pink;
    }
</style>

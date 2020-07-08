<template>
    <div class="issue">
        <Side style="float: left; margin-left: 2%"></Side>
        <div class="container">
            <Blogs></Blogs>
        </div>
        <div class="login" v-if="true">
            <Login style="width: 90%; margin-left: 5%; margin-bottom: 5%"></Login>
        </div>
    </div>
</template>

<script>
    import Side from '../components/sidenav';
    import Login from "./signinForm";
    import Blogs from "./blogs";

    export default {
        name: "issue",
        components: { Login, Side, Blogs },
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
        width: 50%;
        float: left;
        margin-left: 5%;
        background-color: #F2F2F5;
    }

    .login {
        float: left;
        width: 30%;
        margin-left: 5%;
        background-color: #F2F2F5;
    }
</style>

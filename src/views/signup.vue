<template>
    <div class="container">
        <div class="box">
            <div class="image">
                <img src="../assets/image/poster_1.png" alt="port picture"/>
            </div>
            <div class="login">
                <Form></Form>
            </div>
        </div>
    </div>
</template>

<script>
    import Form from '../components/signupForm';

    export default {
        name: "Login",
        components: { Form }
    }
</script>

<style scoped>

    .container{
        height: 560px;
        padding: 60px 232px;
        background-color: skyblue;
        margin: auto;
    }

    .box{
        height: 450px;
        width: 800px;
        margin-top: 50px;
        border-radius: 5px;
        background-color: #f3f5f7;
    }

    .image{
        float: left;
        width: 360px;
        height: 360px;
        margin: 45px 45px 0 45px;
    }

    .image img{
        width: 100%;
    }

    .login{
        float: left;
        height: 360px;
        width: 280px;
        margin-top: 45px;
        margin-bottom: 45px;
        margin-left: 15px;
        background-color: #f3f5f7;
    }
</style>

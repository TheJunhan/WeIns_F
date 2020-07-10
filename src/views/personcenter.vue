<template>
    <div class="extern">
        <div class="person">
            <div class="head">
                <Card class="card"></Card>
            </div>
            <div class="container">
                <div class="side">
                    <Counter class="counter"></Counter>
                    <Info class="info"></Info>
                    <Footstep class="footstep"></Footstep>
                </div>
                <div class="main">
                    <Information></Information>
                    <Myblogs></Myblogs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Counter from "../components/counter";
    import Card from '../components/personalcard';
    import Footstep from "../components/footstep";
    import Info from "../components/info";
    import Myblogs from "../components/myblogs";
    import Information from "../components/information";

    export default {
        components: { Info, Information, Myblogs, Footstep, Counter, Card }
    }
</script>

<style scoped>
    .extern {
        width: 100%;
    }

    .person {
        width: 90%;
        margin-left: 5%;
    }

    .head {
        width: 100%;
    }

    .container {
        width: 90%;
        margin-left: 5%;
        margin-top: 20px;
    }

    .card {
        width: 80%;
    }

    .side {
        float: left;
        width: 20%;
    }

    .counter {

    }

    .info {
        margin-top: 10px;
    }

    .footstep {
        margin-top: 10px;
    }

    .main {
        float: left;
        margin-left: 3%;
        width: 77%;
    }
</style>

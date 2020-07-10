<template>
    <div class="extern">
        <div class="person">
            <div class="head">
                <Card class="card"></Card>
            </div>
            <div class="side">
                <Counter class="counter"></Counter>
                <Info></Info>
                <Footstep></Footstep>
            </div>
            <div class="main">
                <Myblogs></Myblogs>
                <Information></Information>
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
        width: 80%;
        margin-left: 10%;
    }

    .head {
        width: 100%;
    }

    .card {
        width: 80%;
    }

    .side {
        float: left;
        width: 20%;
    }

    .counter {
        margin-left: 10%;
    }

    .main {
        float: left;
        width: 80%;
    }
</style>

<template>
    <div class="extern">
        <div class="person">
            <Card class="card"></Card>
            <Counter class="counter"></Counter>
        </div>
    </div>
</template>

<script>
    import Counter from "../components/counter";
    import Card from '../components/personalcard';

    export default {
        components: { Counter, Card }
    }
</script>

<style scoped>
    .extern {
        width: 100%;
    }

    .person {
        width: 70%;
        margin-left: 15%;
    }

    .card {
        width: 80%;
    }

    .counter {
        margin-left: 10%;
        width: 30%;
    }
</style>

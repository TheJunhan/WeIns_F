<template>
    <div class="person">
        <Card class="card"></Card>
        <Counter class="counter"></Counter>
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
    .card {
        width: 80%;
    }

    .counter {
        margin-left: 10%;
        width: 30%;
    }
</style>

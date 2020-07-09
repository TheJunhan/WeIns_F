<template>
    <div class="person">
        <Counter></Counter>
        <Card></Card>
    </div>
</template>

<script>
    import Counter from "../components/counter";
    import Card from '../components/personalcard';

    export default {
        name: "personcenter",
        components: { Counter, Card }
    }
</script>

<style scoped>

</style>

<template>
    <div>
        <ul>
            <li v-for="(str, index) in arr" :key="text.indexOf(str) + index">
                <p style="word-break: break-word">{{str}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            text: String
        },
        data() {
            return {
                arr: []
            }
        },
        created() {
            this.generator();
        },
        methods: {
            generator() {
                let str = this.$props.text;
                this.arr = str.split('\n');
            }
        }
    }
</script>

<style scoped>

</style>

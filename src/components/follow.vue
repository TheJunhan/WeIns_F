<template>
    <div class="extern">
        <el-card shadow="hover">
<!--            <ul>-->
<!--                <li v-for="user in users" :key="user">-->
<!--                    <Following :uid="user" v-if="Type === following"></Following>-->
<!--                    <Follower :uid="user" v-if="Type === follower"></Follower>-->
<!--                </li>-->
<!--            </ul>-->
            <follower :uid="3"></follower>
            <following :uid="2"></following>
        </el-card>
    </div>
</template>

<script>
    import Following from "./following";
    import Follower from "./follower";

    export default {
        components: {Follower,Following},
        data() {
            return {
                Type: '',
                users: [2, 3, 4]
            }
        },
        props: {
            type: String // "follower" or "following"
        },
        created() {
            this.generator();
        },
        methods: {
            generator() {
                // this.Type = this.$props.type;
                this.Type = 'following';
            }
        }
    }
</script>

<style scoped>

</style>

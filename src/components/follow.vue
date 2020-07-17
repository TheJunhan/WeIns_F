<template>
    <div class="extern">
        <el-card shadow="hover">
            <el-tag>粉丝/关注</el-tag>
            <follower></follower>
            <following ></following>

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
                Type: ''
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
                this.type = this.$props.type;

            }
        }
    }
</script>

<style scoped>
    /*.el-divider--vertical{*/
    /*    height: 3em;*/
    /*}*/
</style>

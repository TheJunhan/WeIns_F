<template>
    <div class="extern">
        <el-card shadow="hover">
            <el-tag>粉丝/关注</el-tag>
        </el-card>
    </div>
</template>

<script>
    export default {
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

</style>

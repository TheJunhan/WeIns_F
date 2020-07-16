<template>
    <el-card class="my-blog" shadow="hover">
        <Blog></Blog>
        <el-divider direction="horizon"></el-divider>
        <Blog></Blog>
        <el-divider direction="horizon"></el-divider>
        <Blog></Blog>
    </el-card>
</template>

<script>
    import Blog from './blog';
    // import axios from "axios";
    export default {
        components: {Blog},
        data() {
            return{
                myblogs:{
                    num:0
                }
            }
        },
        mounted(){
            this.getinfo();
        },
        methods: {
            getinfo() {
                // let url = 'http://localhost:8088/user/getOne';
                // let id = sessionStorage.getItem("id");
                // const data = {
                //     params: {id}
                // }
                //
                // axios.get(url, data).then((response) => {
                //     this.user = response.data;
                // }).catch(err => {
                //     console.log(err);
                // });
            }
        }
    }
</script>

<style scoped>

</style>

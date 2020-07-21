<template>
    <el-card class="my-blog" shadow="hover">
<!--        <Blog></Blog>-->
<!--        <el-divider direction="horizon"></el-divider>-->
<!--        <Blog></Blog>-->
<!--        <el-divider direction="horizon"></el-divider>-->
<!--        <Blog></Blog>-->
        <ul>
            <li v-for="blog in myblogs" :key="blog.id">
                <Blog :blogs="blog"></Blog>
            </li>
        </ul>
    </el-card>
</template>

<script>
    import Blog from './blog';
    import axios from "axios";
    export default {
        components: {Blog},
        data() {
            return{
                myblogs: []
            }
        },
        mounted(){
            this.getinfo();
        },
        methods: {
            getinfo() {
                // let blogs = JSON.parse(sessionStorage.getItem("userMongo")).blogs;
                let url = 'http://localhost:8088/blog/getBlogsLogined?uid=' + sessionStorage.getItem("id");

                axios.get(url).then((response) => {
                    console.log(response.data);
                    this.myblogs = response.data;
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }
</script>

<style scoped>

</style>

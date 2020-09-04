<template>
    <el-card class="my-blog" shadow="hover">
        <el-header class="head">
            <p>ta的动态</p>
        </el-header>

        <div v-if="empty === false">
            <ul>
                <li v-for="blog in blogs" :key="blog.id">
                    <Blog :data="blog" style="margin-bottom: 5px"></Blog>
                </li>
            </ul>
        </div>

        <div v-else class="none">
            <p>暂无动态或动态不可见</p>
        </div>
    </el-card>
</template>

<script>
    import Blog from './blog';
    import axios from "axios";

    export default {
        components: { Blog },
        data() {
            return{
                blogs: [],
                empty: true
            }
        },
        created(){
            this.getinfo();
        },
        methods: {
            getinfo() {
                let url = 'http://localhost:8088/blog/getBlogsById?uid=' + sessionStorage.getItem("id")
                    + '&to_see_uid=' + this.$route.query.id;

                axios.get(url, {
                    headers: {
                        token: sessionStorage.getItem("token")
                    }
                }).then((response) => {
                    this.blogs = response.data;
                    this.empty = (this.blogs.size === 0);
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }
</script>

<style scoped>
    .head {
        text-align: center;
        font-size: x-large;
    }

    .none {
        text-align: center;
        font-size: large;
        color: #909399;
    }
</style>

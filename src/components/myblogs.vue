<template>
    <el-card class="my-blog" shadow="hover">
        <div v-if="size > 0">
            <ul>
                <li v-for="(blog, index) in myblogs" :key="blog.blog.id">
                    <Blog :data="blog" style="margin-bottom: 5px" @delete="remove(index)"></Blog>
                </li>
            </ul>
        </div>

        <div v-else>
            <p style="text-align: center; font-size: 40px; color: #c0c4cc;">暂无动态</p>
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
                myblogs: [],
                size: 0,
            }
        },
        created(){
            this.getinfo();
        },
        methods: {
            getinfo() {
                let id = sessionStorage.getItem("id");

                let url = 'http://localhost:8088/blog/getBlogsById?uid=' + id + '&to_see_uid=' + id;

                axios.get(url, {
                    headers: {
                        token: sessionStorage.getItem("token")
                    }
                }).then((response) => {
                    this.myblogs = response.data;
                    this.size = this.myblogs.length;
                }).catch(err => {
                    console.log(err);
                });
            },
            remove(index) {
                this.myblogs.splice(index, 1);
                this.size--;
            }
        }
    }
</script>

<style scoped>

</style>

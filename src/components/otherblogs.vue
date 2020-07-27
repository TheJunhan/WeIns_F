<template>
    <el-card class="my-blog" shadow="hover">
        <div v-if="myblogs !== null">
            <ul>
                <li v-for="blog in myblogs" :key="blog.id">
                    <Blog :data="blog" style="margin-bottom: 5px"></Blog>
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
                myblogs: []
            }
        },
        created(){
            this.getinfo();
        },
        methods: {
            getinfo() {
                // let url = 'http://localhost:8088/blog/getBlogsById?uid=' + sessionStorage.getItem("id");

                let id = this.$route.query.id;
                let url = 'http://localhost:8088/blog/getBlogsLogined?uid=' + id;

                axios.get(url).then((response) => {
                    // this.myblogs = response.data;

                    let tmp = response.data;

                    for (let i = 0; i < tmp.length; ++i) {
                        if (tmp[i].blog.uid === Number(id))
                            this.myblogs.push(tmp[i]);
                    }
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }
</script>

<style scoped>

</style>

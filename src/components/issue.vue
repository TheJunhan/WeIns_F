<template>
    <div class="issue">
        <div class="side" style="position: fixed;height: 300px;margin-top: 30px">
            <Side style="float: left; margin-left: 2%;"></Side>
        </div>
        <div class="container" :class="{logged:this.$root.logged}">
            <div class="release">
                <Release @change="getBlogs"></Release>
            </div>
            <div class="blogs">
                <div v-if="size > 0">
                    <ul>
                        <li v-for="(blog, index) in blogs" :key="blog.blog.id">
                            <Blog @change="getBlogs" @delete="remove(index)" :data="blogs[index]" style="margin-bottom: 5px"></Blog>
                        </li>
                    </ul>
                </div>

                <div v-else>
                    <p style="text-align: center; font-size: 40px; color: #c0c4cc;">暂无动态</p>
                </div>
            </div>
            <div class="more">
                <el-card>
                    <div style="margin-top: -5px; margin-bottom: -5px; text-align: center">
                        <el-button type="text" size="mini" @click="showMore">点击加载更多 >></el-button>
                    </div>
                </el-card>
            </div>
        </div>

        <div v-if="this.$root.logged === false" id="issue_div_logindiv">
            <el-card class="login" v-if="true">
                <Login style="width: 100%;"></Login>
            </el-card>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Side from '../components/sidenav';
    import Login from "./signinForm";
    import Blog from "./blog";
    import Release from "./release_blog";

    export default {
        name: "issue",
        components: { Release, Login, Side, Blog },
        data() {
            return {
                blogs: [],
                size: 0,
            }
        },
        created() {
            this.getBlogs();
        },
        methods: {
            getBlogs() {
                let url = 'http://localhost:8088/blog/getPublicBlogs';

                if (this.$root.logged === true)
                    url = 'http://localhost:8088/blog/getBlogsLogined?uid=' + sessionStorage.getItem("id");

                axios.get(url).then((response) =>{
                    console.log(response.data);
                    this.blogs = response.data;
                    this.size = this.blogs.length;
                    this.blogs.reverse();
                }).catch(err =>{
                    console.log(err);
                });

                let url1 = 'http://localhost:8088/blog/page/recommend?uid=' + sessionStorage.getItem("id")
                    + '&index=0' + '&num=5';
                axios.get(url1, {
                    headers: {
                        token: sessionStorage.getItem("token")
                    }
                }).then(res => {
                    console.log(res.data);
                }).catch(err => {
                    console.log(err);
                });
            },
            showMore() {
                this.$message.info('下拉刷新暂不支持！');
            },
            remove(index) {
                this.blogs.splice(index, 1);
                this.size--;
                console.log(this.size);
            }
        }
    }
</script>

<style scoped>
    .issue {
        background-color: #A7CFE8;
    }

    .container {
        width: 50%;
        float: left;
        margin-left: 10%;
    }

    .release {
        margin-bottom: 10px;
    }

    .blogs {
        margin-top: 10px;
    }

    .login {
        float: left;
        width: 30%;
        margin-left: 5%;
        background-color: #F2F2F5;
        margin-top: 100px;
        scroll-behavior: auto;
        display: block;
    }

    .logged {
        width: 60%;
        float: left;
        margin-left: 20%;
    }

    .more {
        height: 20px;
    }
</style>

<template>
    <div class="discover-issue">
        <el-container class="container" :class="{logged:this.$root.logged}">
            <el-header class="header">
                <el-radio-group @change="handleClick" v-model="activeIndex" style="margin-bottom: 30px;">
                    <el-radio-button label="1">科技</el-radio-button>
                    <el-radio-button label="2">教育</el-radio-button>
                    <el-radio-button label="3">生活</el-radio-button>
                    <el-radio-button label="4">娱乐</el-radio-button>
                    <el-radio-button label="5">军事</el-radio-button>
                    <el-radio-button label="6">动漫</el-radio-button>
                </el-radio-group>
            </el-header>

            <div class="blogs">
                <div v-if="size > 0">
                    <ul>
                        <li v-for="(blog, index) in blogs" :key="blog.blog.id">
                            <Blog @change="generator" @delete="remove(index)" :data="blogs[index]" style="margin-bottom: 5px"></Blog>
                        </li>
                    </ul>
                </div>

                <div v-else>
                    <el-card>
                        <p style="text-align: center; font-size: 30px; color: #c0c4cc;">暂无动态</p>
                    </el-card>
                </div>
            </div>
            <div class="more">
                <el-card>
                    <div style="margin-top: -5px; margin-bottom: -5px; text-align: center">
                        <el-button type="text" size="mini" @click="showMore">点击加载更多 >></el-button>
                    </div>
                </el-card>
            </div>
        </el-container>

        <div v-if="this.$root.logged === false">
            <el-card class="login" v-if="true">
                <Login style="width: 100%;"></Login>
            </el-card>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Login from "./signinForm";
    import Blog from "./blog";

    export default {
        name: "issue",
        components: { Login, Blog },
        data() {
            return {
                activeIndex: '1',
                blogs: [],
                size: 0,
            }
        },
        created() {
            this.generator();
        },
        methods: {
            generator() {
                let url = 'http://localhost:8088/blog/getPublicBlogs';

                if (this.$root.logged === true) {
                    url = 'http://localhost:8088/blog/getBlogsByLabel?'
                        + 'lid=' + this.$route.query.lid
                        + '&uid=' + sessionStorage.getItem("id");
                }

                console.log(url);

                axios.get(url).then(res =>{
                    console.log(res.data);
                    this.blogs = res.data;
                    this.size = this.blogs.length;
                    this.blogs.reverse();
                }).catch(err =>{
                    console.log(err);
                });

                // let url1 = 'http://localhost:8088/blog/page/recommend?uid=' + sessionStorage.getItem("id")
                //     + '&index=0' + '&num=5';
                // console.log(url1);
                // axios.get(url1, {
                //     headers: {
                //         token: sessionStorage.getItem("token")
                //     }
                // }).then(res => {
                //     console.log(res.data);
                //     this.blogs = res.data;
                //     this.size = this.blogs.length;
                //     this.blogs.reverse();
                // }).catch(err => {
                //     console.log(err);
                // });
            },
            showMore() {
                this.$message.info('下拉刷新暂不支持！');
            },
            remove(index) {
                this.blogs.splice(index, 1);
                this.size--;
                console.log(this.size);
            },
            handleClick() {
                this.$router.push({
                    path: '/discover',
                    query: {
                        lid: this.activeIndex
                    }
                });
            }
        },
        watch: {
            // eslint-disable-next-line no-unused-vars
            '$route'(to, from) {
                this.generator();
            }
        }
    }
</script>

<style scoped>
    .discover-issue {
        background-color: #A7CFE8;
    }

    .header {
        background-color: #A7CFE8;
    }

    .container {
        width: 50%;
        float: left;
        margin-left: 10%;
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

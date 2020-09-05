<template>
    <div class="issue">
        <div class="container" :class="{logged:this.$root.logged}">
            <div class="release">
                <Release @change="getBlogs"></Release>
            </div>
            <div class="blogs">
                <div v-if="blogs.length > 0">
                    <ul>
                        <li v-for="(blog, index) in blogs" :key="blog.blog.id">
                            <Blog @change="getBlogs" @delete="remove(index)" :data="blogs[index]" style="margin-bottom: 5px"></Blog>
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
        </div>

        <div v-if="this.$root.logged === false">
            <el-card class="login" v-if="true">
                <Login style="width: 100%"></Login>
            </el-card>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Login from "./signinForm";
    import Blog from "./blog";
    import Release from "./release_blog";

    export default {
        components: { Release, Login, Blog },
        data() {
            return {
                blogs: [
                    {
                        userAvatar: 'http://bpic.588ku.com/element_pic/01/55/09/6357474dbf2409c.jpg',
                        blog: {
                            blogMongo: null,
                            coll_number: 0,
                            com_number: 0,
                            id: 0,
                            is_del: 0,
                            like: 0,
                            post_day: "2020-09-01 08:00",
                            reblog: 0,
                            reblog_id: -1,
                            type: 3,
                            uid: 0
                        },
                        blogMongo: {
                            comments: [],
                            content: 'Hello world',
                            id: 0,
                            images: [],
                            labels: [],
                            video: null,
                            who_collect: [],
                            who_like: [],
                            who_reblog: []
                        },
                        comments: [],
                        reblog: {},
                        reblogMongo: {},
                        userName: 'weins',
                        reblogUserName: '',
                    }
                ]
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
                //     this.blogs.reverse();
                // }).catch(err => {
                //     console.log(err);
                // });
            },
            showMore() {
                this.blogs.reverse();
                this.blogs.push(this.blogs[0]);
                this.blogs.reverse();
            },
            remove(index) {
                this.blogs.splice(index, 1);
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

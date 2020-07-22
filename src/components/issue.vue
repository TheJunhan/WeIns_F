<template>
    <div class="issue">
        <div class="side" style="position: fixed;height: 300px;margin-top: 30px">
            <Side style="float: left; margin-left: 2%;"></Side>
        </div>
        <div class="container" :class="{logged:this.$root.logged}">
            <div class="release">
                <Release></Release>
            </div>
            <div class="blogs">
                <div v-if="empty(myblogs) !== true">
                    <ul>
                        <li v-for="blog in myblogs" :key="blog.id">
                            <Blog :data="blog" style="margin-bottom: 5px"></Blog>
                        </li>
                    </ul>
                </div>

                <div v-else>
                    <p style="text-align: center; font-size: 40px; color: #c0c4cc;">暂无动态</p>
                </div>
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
                myblogs: [],
            }
        },
        created() {
            this.getInfo();
        },
        methods: {
            getInfo() {
                let url = 'http://localhost:8088/blog/getPublicBlogs';

                axios.get(url).then((response) =>{
                    console.log(response.data);
                    // this.myblogs = response.data;
                }).catch(err =>{
                    console.log(err);
                });
            },
            empty(arr) {
                return arr.length === 0;
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
        /*height: 300px;*/
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
    .logged{
        width: 80%;
    }
</style>

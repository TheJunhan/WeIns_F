<template>
    <div class="extern">
        <el-card shadow="hover" style="background-color: #f2f2f5;">
            <div class="card">
                <div class="avatar">
                    <el-avatar :size="50" :src="userMongo.avatar" alt="avatar"></el-avatar>
                </div>

                <div class="content">
                    <el-row class="name" style="text-align: left; margin-left: 5%; margin-bottom: 5px;">
                        <el-button type="text" @click="visit">{{ name }}</el-button>
                    </el-row>
                    <el-row class="counter">
                        <el-col :span="7" class="cube right-light-border">
                            <span class="item">关注</span>
                            <span class="number"> {{ following_num }} </span>
                        </el-col>
                        <el-col :span="7" class="cube right-light-border">
                            <span class="item">粉丝</span>
                            <span class="number"> {{ follower_num }} </span>
                        </el-col>
                        <el-col :span="7" class="cube">
                            <span class="item">动态</span>
                            <span class="number"> {{ blog_num }} </span>
                        </el-col>
                    </el-row>
                    <el-row class="buttons" :gutter="10">
                        <el-col :span="12">
                            <div v-if="follow_flag === true">
                                <el-popconfirm
                                        confirmButtonText='好的'
                                        cancelButtonText='不用了'
                                        icon="el-icon-info"
                                        iconColor="red"
                                        @onConfirm="follow(-1)"
                                        width="80"
                                        title="你是否确定取消关注 ta ？">
                                    <el-button type="plain" size="mini" slot="reference" icon="el-icon-check">已关注</el-button>
                                </el-popconfirm>
                            </div>
                            <div v-else>
                                <el-button type="plain" size="mini" @click="follow(1)" icon="el-icon-plus">关注 ta</el-button>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <el-button type="plain" size="mini" @click="visit" style="float: right">ta 的主页>></el-button>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "following",
        props: {
            uid: Number
        },
        data(){
            return {
                id: 0,
                name: 'weins',
                following_num: 0,
                follower_num: 0,
                blog_num: 0,
                follow_flag: false,
                userMongo: {
                    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                }
            }
        },
        created() {
            this.id = this.$props.uid;
            let url = 'http://localhost:8088/user/getPlainOne?id=' + this.id;

            axios.get(url, {
                headers: {
                    token: sessionStorage.getItem("token")
                }
            }).then((res) => {
                let user = res.data;
                this.name = user.name;
                this.userMongo = user.userMongo;
                let mongo = user.userMongo;
                this.following_num = mongo.following_num;
                this.follower_num = mongo.follower_num;
                this.blog_num = mongo.blog_num;

                let followers = mongo.followers;
                for (let i = 0; i < followers.length; ++i) {
                    if (followers[i] === Number(sessionStorage.getItem("id"))) {
                        this.follow_flag = true;
                        break;
                    }
                }
            }).catch(err=> {
                console.log(err);
            });
        },
        methods: {
            follow(flag) {
                if (this.$root.logged === false) {
                    this.$message.info('请登陆后再进行操作！');
                    return;
                }

                let url = 'http://localhost:8088/user/follow?'
                    + 'sub=' + sessionStorage.getItem("id")
                    + '&obj=' + this.id
                    + '&flag=' + flag;

                axios.post(url, {}, {
                    headers: {
                        token: sessionStorage.getItem("token")
                    }
                }).then((response) =>{
                    if (response.data === 'success') {
                        if (!this.follow_flag) {
                            this.follow_flag = true;
                            this.$message.success('关注 ' + this.name + ' 成功！');
                        }

                        else {
                            this.follow_flag = false;
                            this.$message.success('取消关注 ' + this.name + ' 成功！');
                        }
                    }
                }).catch(err => {
                    console.log(err);
                });
            },
            visit() {
                if (this.$root.logged === true && this.id === Number(sessionStorage.getItem('id'))) {
                    this.$router.push('/person');
                }

                else {
                    this.$router.push({
                        path: '/visit',
                        query: {
                            id: this.id
                        }
                    });
                }
            }
        }
    }
</script>

<style scoped>
    .extern {
        width: 47%;
    }

    .avatar {
        width: 20%;
        float: left;
    }

    .content {
        width: 72%;
        float: left;
        padding-left: 4%;
        border-left: 1px solid darkgray;
        text-align: center;
        margin-bottom: 10px;
    }

    .right-light-border {
        border-right: 1px solid lightgray;
    }

    .cube {
        font-size: 12px;
        text-align: center;
    }

    .cube:hover {
        color: rebeccapurple;
    }

    .item {
        color: #333333;
    }

    .number {
        color: #EB7350;
    }

    .buttons {
        margin-top: 5px;
        margin-left: 5%;
        float: left;
    }
</style>

<style scoped>
    .el-button--text {
        font-size: 16px;
        color: #333333;
    }

    .el-button--text:hover {
        color: #EB7350;
    }
</style>

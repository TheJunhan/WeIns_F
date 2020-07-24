<template>
    <div style="width: 100%">
        <el-card class="extern" shadow="hover" >
            <div class="blog" style="width: 100%">
                <div class="avatar">
                    <el-avatar :src="data.userAvatar"></el-avatar>
                </div>

                <div class="container">
                    <div class="header" style="z-index: 998;">
                        <el-row style="height: 20px">
                            <el-col :span="20">
                                <div class="name">
                                    <el-button type="text" style="float: left" @click="visit">{{generator(data)}}</el-button>
                                </div>
                                <div class="timestamp">{{blog.post_day}}</div>
                                <div class="timestamp">当前可见：{{parseType2Str()}}</div>
                            </el-col>

                            <el-col :span="3" style="float: right">
                                <div>
                                    <el-dropdown trigger="click" style="outline: none">
                                    <span
                                            class="el-dropdown-link btn send time-send small-hand"
                                            id="custom-send-btn"
                                    >选项<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>

                                        <el-dropdown-menu slot="dropdown" style="width: 12%">

                                            <p v-on:click="option(0)" class="menuitem" v-if="blog.type !== 0">
                                                <el-dropdown-item >设置权为私密</el-dropdown-item>
                                            </p>

                                            <p v-on:click="option(3)" class="menuitem" v-if="blog.type !== 3">
                                                <el-dropdown-item>设置为所有人可见</el-dropdown-item>
                                            </p>

                                            <p v-on:click="option(1)" class="menuitem" v-if="blog.type !== 1">
                                                <el-dropdown-item>设置为好友可见</el-dropdown-item>
                                            </p>

                                            <p v-on:click="option(2)" class="menuitem" v-if="this.$root.is_superuser === true">
                                                <el-dropdown-item>删除</el-dropdown-item>
                                            </p>

                                        </el-dropdown-menu>

                                    </el-dropdown>
                                </div>

                            </el-col>
                        </el-row>
                    </div>

                    <div class="content" style="z-index: 998;">
                        <div class="text">
                            {{blogMongo.content}}
                        </div>
                        <div class="images" v-if="blogMongo.images !== null">
                            <ul>
                                <li style="" v-for="image in data.blogMongo.images" :key="image">
                                    <img @click="maxPic(image)" :src="parseBase64(image)" class="img" style="z-index: 998"/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="footer" style="text-align: center">
                    <el-row>
                        <el-col :span="6">
                            <div v-if="collect_flag === true">
                                <el-button type="text" icon="el-icon-folder-remove" @click="collect">{{blog.coll_number}}
                                </el-button>
                            </div>
                            <div v-else>
                                <el-button type="text" icon="el-icon-folder-add" @click="collect">{{blog.coll_number}}
                                </el-button>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="text" icon="el-icon-top-right" @click="share">{{blog.reblog}}</el-button>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="text" icon="el-icon-chat-dot-square" @click="comment">
                                {{blog.com_number}}
                            </el-button>
                        </el-col>
                        <el-col :span="6">
                            <div v-if="like_flag === true">
                                <el-button type="text" icon="el-icon-star-on" @click="like">{{blog.like}}</el-button>
                            </div>
                            <div v-else>
                                <el-button type="text" icon="el-icon-star-off" @click="like">{{blog.like}}</el-button>
                            </div>
                        </el-col>
                    </el-row>

                    <el-dialog :append-to-body="true" :visible.sync="share_flag" width="40%" :show-close="false"
                               title="转发动态到">
                        <share :id="blog.id" :user="blog.username" :content="blogMongo.content"
                               @change="change"></share>
                    </el-dialog>
                    <el-dialog :visible.sync="dialogVisible" width="40%" :show-close="false" :append-to-body="true"
                               style="z-index: 999">
                        <el-image :src="this.showpic" class="big-img"></el-image>
                    </el-dialog>

                    <el-dialog :append-to-body="true" :visible.sync="comment_flag" width="60%" :show-close="false">
                        <release_comment :bid="this.blog.id" :to_uid="this.blog.uid" :to_username="this.blog.username"></release_comment>
                        <comment></comment>
                    </el-dialog>
                </div>
            </div>
        </el-card>
    </div>

</template>

<script>
    import axios from 'axios';

    import share from '../components/share';
    import comment from "./comment";
    import release_comment from "./release_comment";

    export default {
        components: {
            share, comment, release_comment
        },
        props: {
            data: Object
        },
        data() {
            return {
                blog: {},
                blogMongo: {},
                comments: [],
                reblog: {},
                reblogMongo: {},
                dialogVisible: false,
                showpic: "",

                like_num: 0,
                like_flag: false,
                collect_num: 0,
                collect_flag: false,
                share_num: 0,
                share_flag: false,
                comment_num: 0,
                comment_flag: false
            }
        },
        methods: {
            // 拉取数据
            generator(val) {
                this.blog = val.blog;
                this.blogMongo = val.blogMongo;
                this.comments = val.comments;
                this.comment_num = this.comments.length;

                console.log(val);
                console.log("nmsl")
                console.log(this.blog);

                if (this.$root.logged === true) {
                    let id = Number(sessionStorage.getItem("id"));
                    console.log(id);

                    // collect
                    let colllist = this.blogMongo.who_collect;
                    for (let i = 0; i < colllist.length; i++) {
                        if (colllist[i] === id) {
                            this.collect_flag = true;
                            break;
                        }
                    }

                    let likelist = this.blogMongo.who_like;
                    for (let i = 0; i < likelist.length; i++) {
                        if (likelist[i] === id) {
                            this.like_flag = true;
                            break;
                        }
                    }
                }
                return val.blog.username;
            },
            parseBase64(image) {
                return JSON.parse(image).base64;
            },
            parseType2Str() {
                switch (this.blog.type) {
                    case 0:
                        return '仅自己可见';
                    case 1:
                        return '粉丝可见';
                    case 3:
                        return '公开可见';
                }
            },
            option(op) {
                switch (op) {
                    case 0: case 1: case 3:
                        this.blog.type = op;
                        break;
                    case 2:
                        this._delete();
                        break;
                    default:
                        break;
                }
            },
            _delete() {
                let url = 'http://localhost:8088/blog/removeBlog?'
                + 'uid=' + sessionStorage.getItem("id")
                + '&bid=' + this.blog.id
                + '&type=' + this.blog.type;

                axios.get(url).then((response) =>{
                    if (response.data === true) {
                        this.$message.success('删除成功！');
                        window.location.reload();
                    }

                    else
                        this.$message.error('没有权限删除！');
                });
            },
            share() {
                if (this.$root.logged === false) {
                    this.$message.info("请登录后再进行操作");
                    return false;
                }

                this.share_flag = true;
                return true;
            },
            change() {
                this.share_flag = false;
                return true;
            },
            collect() {
                if (this.$root.logged === false) {
                    this.$message.info("请登录后再进行操作");
                    return false;
                }

                let url = 'http://localhost:8088/blog/collect' +
                    '?uid=' + sessionStorage.getItem('id') +
                    '&bid=' + this.blog.id +
                    '&flag=';

                if (this.collect_flag) {
                    axios.get(url + 'false').then((response) =>{
                        if (response.data === true) {
                            this.$message.error('取消收藏！');
                            this.blog.coll_number--;
                            this.collect_flag = false;
                            return false;
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                }

                else {
                    axios.get(url + 'true').then((response) =>{
                        if (response.data === true) {
                            this.$message.success('收藏成功！');
                            this.collect_flag = true;
                            this.blog.coll_number++;
                            return true;
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                }
            },
            like() {
                if (this.$root.logged === false) {
                    this.$message.info("请登录后再进行操作");
                    return false;
                }

                if (this.like_flag) {
                    let url = 'http://localhost:8088/blog/removeLike?'
                        + 'uid=' + sessionStorage.getItem("id")
                        + '&bid=' + this.blog.id;

                    axios.get(url).then((response) =>{
                        if (response.data === true) {
                            this.$message.error('取消赞！');
                            this.like_flag = false;
                            this.blog.like--;
                            return false;
                        }
                        else {
                            console.log('have liked.');
                        }
                    }).catch(err => {
                        console.log(err);
                    });

                }

                else {
                    let url = 'http://localhost:8088/blog/like?'
                        + 'uid=' + sessionStorage.getItem("id")
                        + '&bid=' + this.blog.id;

                    axios.get(url).then((response) =>{
                        if (response.data === true) {
                            this.like_flag = true;
                            this.blog.like++;
                            this.$message.success('点赞成功！');
                            return true;
                        }

                        else {
                            console.log('have liked.');
                            return false;
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                }
            },
            visit() {
                this.$router.push({
                    path: '/visit',
                    query: {
                        id: this.blog.uid
                    }
                });
            },
            maxPic(image) {
                this.dialogVisible = true;
                this.showpic = JSON.parse(image).base64;
                return true;
            },
            comment() {
                if (this.$root.logged === false) {
                    this.$message.info("请登录后再进行操作");
                    return false;
                }
                this.comment_flag = true;
                return true;
            },

        },
    }
</script>

<style scoped>
    .extern {
        width: 100%;
    }

    .blog {
        width: 100%;
        margin-top: -10px;
    }

    .avatar {
        float: left;
        width: 7%;
    }

    .container {
        margin-left: 2%;
        float: left;
        width: 85%;
        display: flex;
        flex-direction: column;
    }

    .header {
        width: 100%;
    }

    .name {
        float: left;
        width: 100%;
        text-align: left;
    }

    .timestamp {
        text-align: left;
        color: darkgray;
        font-size: 10px;
    }

    .content {
        width: 100%;
        margin-top: 5%;
        background: rgba(255, 255, 255, 0.4);
    }

    .menuitem {
    }

    .text {
        text-align: left;
    }

    .img {
        width: 150px;
        height: 150px;
        float: left;
        margin-left: 1%;
        margin-top: 1%;
        cursor: pointer;
        object-fit: cover;
    }

    .big-img {
        width: 100%;
    }

    .footer {
        border-top: 2px #909399;
        margin-top: 20px;
    }
</style>

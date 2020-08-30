<template>
    <div style="width: 100%" class="blog_div1">
        <el-card class="extern" shadow="hover" >
            <div class="blog" style="width: 100%">
                <div class="avatar">
                    <el-avatar class="blog_avatar" :src="data.userAvatar"></el-avatar>
                </div>

                <div class="container">
                    <div class="header" style="z-index: 998;">
                        <el-row style="height: 20px">
                            <el-col :span="20">
                                <div class="name">
                                    <el-button type="text" style="float: left" @click="visit(blog.uid)">{{generator(data)}}</el-button>
                                </div>
                                <div class="timestamp">{{blog.post_day}}</div>
                                <div class="timestamp">当前可见：{{parseType2Str()}}</div>
                            </el-col>

                            <el-col :span="3" style="float: right">
                                <div v-if="this.options_flag === true">
                                    <el-dropdown trigger="click" style="outline: none">
                                    <span
                                            class="el-dropdown-link btn send time-send small-hand"
                                            id="custom-send-btn"
                                    >选项<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>

                                        <el-dropdown-menu slot="dropdown" style="width: 12%">

                                            <p v-on:click="option(0)" class="menuitem" v-if="option_auth(0)">
                                                <el-dropdown-item >设置权为私密</el-dropdown-item>
                                            </p>

                                            <p v-on:click="option(3)" class="menuitem" v-if="option_auth(3)">
                                                <el-dropdown-item>设置为所有人可见</el-dropdown-item>
                                            </p>

                                            <p v-on:click="option(1)" class="menuitem" v-if="option_auth(1)">
                                                <el-dropdown-item>设置为好友可见</el-dropdown-item>
                                            </p>

                                            <p v-on:click="option(2)" class="menuitem" v-if="option_auth(2)">
                                                <el-dropdown-item>删除</el-dropdown-item>
                                            </p>

                                        </el-dropdown-menu>

                                    </el-dropdown>
                                </div>
                            </el-col>
                        </el-row>
                    </div>

                    <div class="content" style="z-index: 998;">
                        <el-row v-if="tag_falg === true" style="margin-top: 10px;margin-bottom: 5px">
                            <el-tag
                                    style="margin-left: 3px;margin-right: 3px"
                                    :key="tag.id"
                                    v-for="tag in blogMongo.labels"
                                    :disable-transitions="false"
                                    @click="visitTag(tag)">
                                #{{tag.content}}#
                            </el-tag>
                        </el-row>
                        <el-row class="text">
                            <FormatContent :text="blogMongo.content"></FormatContent>
                        </el-row>
                        <el-row class="images" v-if="blogMongo.images !== null">
                            <ul>
                                <li style="" v-for="image in data.blogMongo.images" :key="image">
                                    <img @click="maxPic(image)" :src="parseBase64(image)" class="img" style="z-index: 998"/>
                                </li>
                            </ul>
                        </el-row>
                    </div>

                    <div v-if="blog.reblog_id !== -1" style="margin-top: 30px;">
                        <div class="quote text-overflow">
                            <el-button type="text" style="margin-left: 5px;" @click="visit(this.reblog.uid)">{{this.reblog_name}}</el-button>
                                : {{this.reblogMongo.content}}
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

                    <el-dialog class="blog_dialog1" :append-to-body="true" :visible.sync="share_flag" width="40%" :show-close="false"
                               title="转发动态到">
                        <share :id="blog.id" :to_uid="blog.uid" :user="username" :content="blogMongo.content"
                               @change="change"></share>
                    </el-dialog>
                    <el-dialog class="blog_dialog2" :visible.sync="dialogVisible" width="40%" :show-close="false" :append-to-body="true"
                               style="z-index: 999">
                        <el-image :src="showPicture" class="big-img"></el-image>
                    </el-dialog>
                </div>

                <div class="comment" v-if="comment_flag === true">
                    <comments :bid="this.blog.id" :uid="this.blog.uid" @fresh="fresh" style="margin-top: -10px"></comments>
                </div>
            </div>
        </el-card>
    </div>

</template>

<script>
    import axios from 'axios';

    import share from './share';
    import comments from './comments';
    import FormatContent from './formatcontent';

    export default {
        components: { share, comments, FormatContent },
        props: {
            data: Object
        },
        data() {
            return {
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
                username: 'weins',
                reblog_name: '',

                dialogVisible: false,
                options_flag: false,
                showPicture: '',

                tag_falg: false,
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
            generator(val) {
                this.blog = val.blog;
                this.blogMongo = val.blogMongo;
                this.comments = val.comments;
                this.comment_num = this.comments.length;
                this.reblog = val.reblog;
                this.reblogMongo = val.reblogMongo;

                for (let i = 0; i < 4; i++) {
                    if (this.option_auth(i))
                        this.options_flag = true;
                }

                this.reblog_name = val.reblogUserName;

                if (this.$root.logged === true) {
                    let id = Number(sessionStorage.getItem("id"));

                    // collect
                    let collList = this.blogMongo.who_collect;
                    for (let i = 0; i < collList.length; i++) {
                        if (collList[i] === id) {
                            this.collect_flag = true;
                            break;
                        }
                    }

                    let likeList = this.blogMongo.who_like;
                    for (let i = 0; i < likeList.length; i++) {
                        if (likeList[i] === id) {
                            this.like_flag = true;
                            break;
                        }
                    }
                }

                this.tag_falg = (this.blogMongo.labels.length > 0);

                this.username = val.userName;
                return val.userName;
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
            option_auth(op) {
                switch (op) {
                    case 0: case 1: case 3:
                        return (String(this.blog.uid) === sessionStorage.getItem("id"));
                    case 2:
                        return (this.$root.auth_blog_manager === true ||
                            String(this.blog.uid) === sessionStorage.getItem("id"));
                    default:
                        break;
                }

                return false;
            },
            _delete() {
                let url = 'http://localhost:8088/blog/removeBlog?'
                + 'uid=' + sessionStorage.getItem("id")
                + '&bid=' + this.blog.id
                + '&type=' + this.blog.type;

                axios.get(url, {
                    headers: {
                        token: sessionStorage.getItem("token")
                    }
                }).then((response) =>{
                    if (response.data === true) {
                        this.$message.success('删除成功！');
                        this.$emit('delete');
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
                this.comment_flag = false;
                this.$emit('change');
                return true;
            },
            fresh() {
                this.share_flag = false;
                this.comment_flag = false;
                this.$message.success('hahaha');
                axios.get('http://localhost:8088/blog/getSingleBlog?bid=' + this.blog.id, {
                    headers: {
                        token: sessionStorage.getItem("token")
                    }
                }).then(res => {
                   this.generator(res.data);
                }).catch(err => {
                    console.log(err);
                });
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
                    axios.get(url + 'false', {
                        headers: {
                            token: sessionStorage.getItem("token")
                        }
                    }).then((response) =>{
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
                    axios.get(url + 'true', {
                        headers: {
                            token: sessionStorage.getItem("token")
                        }
                    }).then((response) =>{
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

                    axios.get(url, {
                        headers: {
                            token: sessionStorage.getItem("token")
                        }
                    }).then((response) =>{
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

                    axios.get(url, {
                        headers: {
                            token: sessionStorage.getItem("token")
                        }
                    }).then((response) =>{
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
            visit(id) {
                if (this.$root.logged === true &&
                    id === Number(sessionStorage.getItem("id"))) {
                    this.$router.push('/person');
                    return;
                }

                this.$router.push({
                    path: '/visit',
                    query: {
                        id: id
                    }
                });
            },
            visitTag(tag) {
                this.$message.success('导航到标签 #' + tag.content + '#');
            },
            maxPic(image) {
                this.dialogVisible = true;
                this.showPicture = JSON.parse(image).base64;
                return true;
            },
            comment() {
                if (this.comment_flag === false) {
                    sessionStorage.setItem("comments", JSON.stringify(this.comments));
                    this.comment_flag = true;
                    return true;
                }

                this.comment_flag = false;
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

    .quote {
        background-color: #F2F2F5;
    }

    .text-overflow {
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        height: 40%;
        overflow: hidden;
        white-space: nowrap;
    }

    .footer {
        border-top: 2px #909399;
        margin-top: 20px;
    }
</style>

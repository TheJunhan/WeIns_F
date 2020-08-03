<template>
    <el-card class="com" shadow="hover">

        <div class="avatar">
            <el-avatar class="comava" shape="square" :size="50" :src="data.avatar"></el-avatar>
        </div>

        <div>
            <div class="content">

                <div class="con">
                    <p class="content-text1">{{data.username}}</p>
                    <p class="content-text2"> : {{data.content}}</p>
                </div>

                <div class="icons">
                    <el-row>
                        <el-col class="icon1" :span="6">
                            <p>{{data.post_time}}</p>
                        </el-col>

                        <el-col class="icon2" :span="6">
                            <el-button type="text" icon="el-icon-chat-dot-square" @click="feedback(-1)">回复</el-button>
                        </el-col>
                        <el-col class="icon2" :span="6">
                            <el-button type="text" icon="el-icon-star-off" @click="like">喜欢</el-button>
                        </el-col>
                        <el-col class="icon2" :span="6">
                            <div v-if="delete_flag === true">
                                <el-button type="text" icon="el-icon-delete" @click="remove(data.cid)">删除</el-button>
                            </div>

                            <div v-else>
                                <p style="color: #f2f2f5">占位置</p>
                            </div>
                        </el-col>
                    </el-row>
                </div>

                <release v-if="reply_flag === true" :type="1" :bid="data.bid" :to_uid="data.uid" :to_username="data.username" :comment="data"></release>

                <div class="re-comment">
                    <div class="con2" v-if="show_flag === 0 || show_flag === 2">
                        <ul><li style="clear: both" v-for="(reply, index) in replies" :key="reply.cid">
                            <div class="reply">
                                <div class="content-text4" style="margin-left: 5px; margin-top: 5px">
                                    <el-button type="text" size="mini" style="font-size: 14px; margin-top: -6px; z-index: 999" @click="visit(reply.uid)">{{reply.username}}</el-button> : {{displayReplyContent(reply)}}
                                </div>

                                <div style="margin-left: 5px">
                                    <el-row>
                                        <el-col :span="18">
                                            <p class="content-text5">{{reply.post_time}}</p>
                                        </el-col>
                                        <el-col :span="3">
                                            <div v-if="reply.delete_flag === true">
                                                <el-button icon="el-icon-delete" type="text" @click="remove(reply.cid)" style="z-index: 999">删除</el-button>
                                                <el-divider direction="vertical"></el-divider>
                                            </div>
                                            <div v-else>
                                                <p style="color: #eaeaec">占位置</p>
                                            </div>
                                        </el-col>
                                        <el-col :span="3">
                                            <el-button icon="el-icon-chat-dot-square" type="text" @click="feedback(index)" style="z-index: 999">回复</el-button>
                                        </el-col>
                                    </el-row>
                                </div>

                                <release v-if="reply.flag === true" :type="1" :bid="reply.bid" :to_uid="reply.uid" :to_username="reply.username" :comment="reply"></release>
                            </div>
                        </li></ul>
                    </div>

                    <div class="more-button">
                        <el-row>
                            <el-col :span="12">
                                <div v-if="show_flag === 1">
                                    <el-button type="text" @click="showMore" style="z-index: 999">共{{size}}条回复，查看更多 >></el-button>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div v-if="show_flag === 2">
                                    <el-button type="text" @click="showMore"> >> 收起</el-button>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
    </el-card>
</template>

<script>
    import axios from 'axios';
    import release from "./release_comment";

    export default {
        components: {
            release
        },
        props: {
            bid: Number,
            to_uid: Number,
            data: Object
        },
        data() {
            return {
                replies: [],
                size: 0,
                reply_flag: false,
                delete_flag: false,
                show_flag: 0
            }
        },
        created() {
            this.delete_flag = (this.$root.auth_comment_manager === true || this.$props.data.uid === Number(sessionStorage.getItem("id")));

            let cid = this.$props.data.cid;
            let tmp = JSON.parse(sessionStorage.getItem("comments"));
            for (let i = 0; i < tmp.length; ++i) {
                if (tmp[i].root_cid === cid) {
                    tmp[i].flag = false;
                    tmp[i].delete_flag = (this.$root.auth_comment_manager === true || tmp[i].uid === Number(sessionStorage.getItem("id")));
                    this.replies.push(tmp[i]);
                }
            }

            this.size = this.replies.length;
            if (this.size > 5)
                this.show_flag = 1;
        },

        methods: {
            displayReplyContent(reply){
                if (reply.to_cid !== this.$props.data.cid)
                    return '回复@' + reply.to_username + ':' + reply.content;
                else
                    return reply.content;
            },
            feedback(type) {
                if (type === -1)
                    this.reply_flag = (this.reply_flag !== true);
                else
                    this.replies[type].flag = (this.replies[type].flag !== true);
            },
            like() {
                this.$message.info('暂不支持');
            },
            remove(cid) {
                let url = 'http://localhost:8088/blog/removeComment?uid=' + sessionStorage.getItem("id")
                 + '&cid=' + cid
                 + '&type=' + sessionStorage.getItem("type");

                axios.post(url, {
                    headers: {
                        token: sessionStorage.getItem("token")
                    }
                }).then(res => {
                    if (res.data === true) {
                        this.$message.success('删除评论成功！');
                        this.$emit('change');
                    }
                    else
                        this.$message.error('没有权限删除！');
                }).catch(err =>{
                    console.log(err);
                });
            },
            showMore() {
                if (this.show_flag === 1)
                    this.show_flag = 2;
                else if (this.show_flag === 2)
                    this.show_flag = 1;
            },
            visit(uid) {
                this.$router.push({
                    path: '/visit',
                    query: {
                        id: uid
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .avatar {
        float: left;
        width: 8%;
    }

    .content {
        width: 80%;
        float: left;
        margin-left: 5%;
        color: black;
    }

    .down {
        float: right;
        width: 10%;
    }

    .comava {
        float: left;
        margin-left: 3%;
        margin-bottom: 10%;
    }

    .con {
        clear: both;
    }

    .con2 {
        margin-bottom: 5%;
     }

    .icons {
        clear: both;
    }

    .content-text1 {
        text-align: left;
        float: left;
        color: dodgerblue;
    }

    .content-text2 {
        text-align: left;
        float: left;
    }

    .icon1 {
        text-align: left;
        float: left;
        margin-top:1.5%;
        color: darkgray;
        font-size: 12px;
    }

    .icon2 {
        float: right;
        text-align: right;
    }

    .re-comment {
        clear: both;
        width: 100%;
    }

    .reply {
        background-color: #eaeaec;
        width: 100%;
    }

    .content-text4 {
        width: 100%;
        word-break:break-all;
        float: left;
        display: flex;
    }

    .more-button {
        width: 100%;
    }

    .com {
        background-color: #f2f2f5;
    }

    .content-text5 {
        float: left;
        margin-top: 13px;
        color: darkgray;
        font-size: 10px;
    }
</style>

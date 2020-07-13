<template>
    <div>
        <el-card class="extern" shadow="hover">
            <div class="blog">
                <div class="avatar">
                    <el-avatar :src="blog.user.avatar.iconBase64"></el-avatar>
                </div>
                <div class="container">
                    <div class="header" style="z-index: 998;">
                        <el-row style="height: 20px">
                            <el-col :span="18">
                                <div class="name">
                                    <el-button type="text" style="float: left">{{blog.user.name}}</el-button>
                                </div>
                                <div class="timestamp">{{blog.time}}</div>
                                <div class="timestamp">当前可见：{{}}</div>
                            </el-col>

                            <el-col :span="3">
                                <div >
                                    <el-dropdown trigger="click" style="outline: none">
                                    <span
                                            class="el-dropdown-link btn send time-send small-hand"
                                            id="custom-sebd-btn"
                                    >选项<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>

                                        <el-dropdown-menu slot="dropdown" style="width: 12%">

                                            <el-dropdown-item class="menuitem">设置权为私密</el-dropdown-item>

                                            <el-dropdown-item class="menuitem">设置为所有人可见</el-dropdown-item>

                                            <el-dropdown-item class="menuitem">设置为好友可见</el-dropdown-item>

                                            <el-dropdown-item class="menuitem" v-if="this.$route.params.is_superuser">删除</el-dropdown-item>

                                        </el-dropdown-menu>

                                    </el-dropdown>
                                </div>

                            </el-col>
                        </el-row>
                    </div>

                    <div class="content" style="z-index: 998;">
                        <div class="text">
                            {{blog.content.text}}
                        </div>
                        <div class="images" v-if="blog.content.image !== null">
                            <ul>
                                <li style="" v-for="image in blog.content.images" :key="image.image">
                                    <img @click="maxPic(image)" :src="image.image" class="img" style="z-index: 998"/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <el-row>
                        <el-col :span="6">
                            <div v-if="blog.collect_flag === true">
                                <el-button type="text" icon="el-icon-folder-remove" @click="collect">{{blog.collect}}
                                </el-button>
                            </div>
                            <div v-else>
                                <el-button type="text" icon="el-icon-folder-add" @click="collect">{{blog.collect}}
                                </el-button>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="text" icon="el-icon-top-right" @click="share">{{blog.share}}</el-button>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="text" icon="el-icon-chat-dot-square" @click="comment">
                                {{blog.comment.count}}
                            </el-button>
                        </el-col>
                        <el-col :span="6">
                            <div v-if="blog.like_flag === true">
                                <el-button type="text" icon="el-icon-star-on" @click="like">{{blog.like}}</el-button>
                            </div>
                            <div v-else>
                                <el-button type="text" icon="el-icon-star-off" @click="like">{{blog.like}}</el-button>
                            </div>
                        </el-col>
                    </el-row>

                    <el-dialog :visible.sync="blog.share_flag" width="40%" :show-close="false" title="转发动态到">
                        <Share :id="blog.id" :user="blog.user.name" :content="blog.content.text"
                               @change="change"></Share>
                    </el-dialog>
                    <el-dialog :visible.sync="dialogVisible" width="40%" :show-close="false">
                        <el-image :src="this.showpic" class="big-img"></el-image>
                    </el-dialog>
                </div>
            </div>
        </el-card>

    </div>

</template>

<script>
    import image from '../assets/image/poster_1.png';
    import image2 from '../assets/image/poster_2.png';
    import Share from '../components/share';

    export default {
        components: {Share},
        data() {
            return {
                blog: {
                    id: 0,
                    user: {
                        name: '交通大学',
                        avatar: {
                            // default avatar, must be iconBase64 mode
                            iconBase64: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                        }
                    },
                    time: '2020-07-09 21:57',
                    content: {
                        text: '大家好,我是上海交通大学软件学院的最咸的咸鱼！不会有人比我还菜吧，不会吧不会吧！项目做得太差劲了！哭哭!',
                        images: [{
                            image: image
                        }, {
                            image: image2
                        }, {
                            image: image2
                        }, {
                            image: image2
                        }, {
                            image: image
                        }]
                    },
                    like: 1453,
                    like_flag: false,
                    collect: 253,
                    collect_flag: false,
                    share: 424,
                    share_flag: false,
                    comment: {
                        count: 3214,
                    },
                    comment_flag: false
                },
                dialogVisible: false,
                showpic: "",
            }
        },
        created() {
            this.generate();
        },
        methods: {
            // 拉取数据
            generate() {

            },
            share() {
                this.blog.share_flag = true;
            },
            change() {
                this.blog.share_flag = false;
            },
            collect() {
                if (this.blog.collect_flag) {
                    this.$message.error('取消收藏！');
                    this.blog.collect--;
                    this.blog.collect_flag = false;
                } else {
                    this.$message.success('收藏成功！');
                    this.blog.collect_flag = true;
                    this.blog.collect++;
                }
            },
            like() {
                if (this.blog.like_flag) {
                    this.$message.error('取消赞！');
                    this.blog.like_flag = false;
                    this.blog.like--;
                } else {
                    this.$message.success('点赞成功！');
                    this.blog.like_flag = true;
                    // 实际使用的时候不能用flag，否则一刷新就会重新能点赞，应该跟用户是否对这条动态点赞绑定
                    this.blog.like++;
                }
            },
            maxPic(image) {

                this.dialogVisible = true;
                this.showpic = image.image;

            },
            comment() {
                this.$message.success('评论成功！');
            },

        }
    }
</script>

<style scoped>
    .extern {
        width: 100%;
        display: flex;
    }

    .blog {

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
        /*float: left;*/
        text-align: left;
        color: darkgray;
        font-size: 10px;
    }

    .content {
        width: 100%;
        margin-top: 5%;
        background: rgba(255, 255, 255, 0.4);
    }

    .menuitem{
    }
    .text {
        text-align: left;
    }

    .img {
        width: 30%;
        float: left;
        margin-left: 1%;
        margin-top: 1%;
        cursor: pointer;
    }

    .big-img {
        width: 100%;
    }

    .footer {
        border-top: 2px #909399;
        margin-top: 20px;
    }
</style>

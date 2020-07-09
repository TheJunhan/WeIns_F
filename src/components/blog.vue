<template>
    <el-card  class="extern" shadow="hover">
        <div class="blog">
            <div class="avatar">
                <el-avatar :src="blog.user.avatar.iconBase64"></el-avatar>
            </div>
            <div class="container">
                <div class="header">
                    <el-button  class="name_button" type="text" style="float: left">{{blog.user.name}}</el-button>
                    <div class="timestamp">
                        {{blog.time}}
                    </div>
                </div>

                <div class="content">
                    <div class="text" >
                        {{blog.content.text}}
                    </div>
                    <div class="images" v-if="blog.content.image !== null">
                        <ul>
                            <li style="z-index: auto" v-for="image in blog.content.images" :key="image.image">
                                <el-image :src="image.image" class="img"></el-image>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer">
                <el-row>
                    <el-col :span="6">
                        <el-button type="text" icon="el-icon-folder-checked" @click="collect">{{blog.collect}}</el-button>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="text" icon="el-icon-top-right" @click="share">{{blog.share}}</el-button>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="text" icon="el-icon-chat-dot-square" @click="comment">{{blog.comment.count}}</el-button>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="text" icon="el-icon-star-off" @click="like">{{blog.like}}</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
    </el-card>
</template>

<script>
    import image from '../assets/image/poster_1.png';
    import image2 from '../assets/image/poster_2.png';
    export default {
        data() {
            return {
                blog: {
                    user: {
                        name: '交通大学',
                        avatar: {
                            // default avatar, must be iconBase64 mode
                            iconBase64: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                        }
                    },
                    time: '2020-07-09 21:57',
                    content: {
                        text: '大家好,我是上海交通大学软件学院的奸细！大家好,我是上海交通大学软件学院的奸细！',
                        images: [{
                            image: image
                        },{
                            image: image2
                        },{
                            image: image2
                        },{
                            image: image2
                        },{
                            image: image
                        },{
                            image: image
                        }]
                    },
                    like: 153,
                    like_flag: false,
                    collect: 253,
                    collect_flag: false,
                    share: 424,
                    share_flag: false,
                    comment: {
                        count: 3214,
                    },
                    comment_flag: false
                }
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
                // 分享的时候
                this.$message.success('分享成功！');
            },
            collect() {
                this.$message.success('收藏成功！');
            },
            like() {
                this.$message.success('点赞成功！');
                this.blog.like ++;
            },
            comment() {
                this.$message.success('评论成功！');
            }
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
        flex-direction: column;
        display:-webkit-flex;
        display: flex;
        -webkit-flex-direction: column;
    }

    .name_button {
        text-align: left;
    }

    .timestamp {
        flex-direction: column;
        text-align: left;
        margin-left: 1%;
        color: darkgray;
    }


    .content {
        width: 100%;
        margin-top: 5%;
    }

    .text {
        text-align: left;
    }

    .img {
        width: 30%;
        float: left;
        margin-left: 1%;
        margin-top: 1%;
    }

    .footer {
        border-top: 2px #909399;
        margin-top: 20px;
    }
</style>

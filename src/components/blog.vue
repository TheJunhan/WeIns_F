<template>
    <div class="extern">
        <div class="blog">
            <div class="avatar">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </div>
            <div class="container">
                <div class="header">
                    <el-button type="text" style="float: left">{{blog.name}}</el-button>
                </div>

                <div class="content">
                    <div class="text">
                        {{blog.content.text}}
                    </div>
                    <div class="images" v-if="blog.content.image !== null">
                        <ul>
                            <li v-for="image in blog.content.images" :key="image.image">
                                <el-image :src="image.image" class="img"></el-image>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer">
            <el-button type="text"><el-icon class="el-icon-folder-checked"></el-icon> {{blog.collect}}</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text"><el-icon class="el-icon-top-right"></el-icon> {{blog.share}}</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text"><el-icon class="el-icon-chat-dot-square"></el-icon> {{blog.comment.count}}</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text"><el-icon class="el-icon-star-off"></el-icon> {{blog.like}}</el-button>
        </div>
    </div>
</template>

<script>
    import image from '../assets/image/poster.png';

    export default {
        name: "blog",
        data() {
            return {
                blog: {
                    name: '交通大学',
                    time: '2020-07-08 20:20',
                    content: {
                        text: '大家好,我是上海交通大学软件学院的奸细！',
                        images: [{
                            image: image
                        },{
                            image: image
                        }]
                    },
                    like: 153,
                    collect: 253,
                    share: 424,
                    comment: {
                        count: 3214,
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .extern {
        width: 100%;
        flex-direction: column;
        background-color: white;
    }

    .blog {
        width: 94%;
        margin-left: 3%;
        margin-top: 3%;
        background-color: pink;
    }

    .avatar {
        float: left;
        height: 100%;
        width: 7%;
    }

    .container {
        margin-left: 2%;
        float: left;
        width: 85%;
    }

    .header {
        width: 100%;
        background-color: black;
    }

    .content {
        width: 100%;
        margin-top: 5%;
    }

    .img {
        width: 30%;
        float: left;
        margin-left: 1%;
    }
</style>

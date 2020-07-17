<template>
    <div class="share">
        <div class="destination">
            <div class="tabs">
                <el-tabs v-model="active_tab">
                    <el-tab-pane label="我的动态" name="1"></el-tab-pane>
                    <el-tab-pane label="好友圈" name="2"></el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="main">
            <div class="quote text-overflow">
                @{{this.$props.user}}: {{this.$props.content}}
            </div>
            <div class="comment">
                <el-input type="textarea" v-model="blog.content.text" :placeholder="holder"/>
            </div>
        </div>
        <div class="foot">
            <div class="check">
                <el-checkbox v-model="checked">同时评论给 {{this.$props.user}}</el-checkbox>
            </div>
            <div class="btn">
                <el-button type="primary" @click="submit" size="mini">发布</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"share",
        props: {
            id: Number,
            user: String,
            content: String,
        },
        data() {
            return {
                comment_to_flag: false,
                holder: '//@',
                active_tab: '1',
                blog: {
                    id: 0,
                    user: {
                        name: '交通大学',
                        avatar: {
                            // default avatar, must be iconBase64 mode
                            iconBase64: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                        }
                    },
                    time: '',
                    content: {
                        text: '',
                        images: []
                    },
                    comment: {
                        count: 0,
                    },
                }
            }
        },
        created() {
            this.holder += this.$props.user + ':转发动态';
        },
        methods: {
            submit() {
                this.$message.success('转发成功！');

                this.$emit('change',)

            }
        }
    }
</script>

<style scoped>
    .share {
        width: 100%;
        background-color: white;
        flex-direction: column;
    }

    .quote {
        width: 100%;
        text-align: left;
    }

    .tabs {
        margin-top: -30px;
        height: 30px;
    }

    .main {
        margin-top: 20px;
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

    .comment {
        margin-top: 10px;
    }

    .foot {
        margin-top: 10px;
        margin-bottom: -10px;
        width: 100%;
        height: 40px;
    }

    .check {
        float: left;
    }

    .btn {
        float: right;
    }
</style>

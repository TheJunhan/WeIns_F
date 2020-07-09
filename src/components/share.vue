<template>
    <div class="share">
        <div class="destination">
            <div class="prefix">
                <span>转发到</span>
            </div>
            <div class="tabs">
                <el-tabs v-model="active_tab" @tab-click="handleClick" type="card">
                    <el-tab-pane label="用户管理" name="1">用户管理</el-tab-pane>
                    <el-tab-pane label="配置管理" name="2">配置管理</el-tab-pane>
                    <el-tab-pane label="角色管理" name="3">角色管理</el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="quote">
            <el-input type="textarea" v-model="blog.content.text"/>
        </div>
        <div class="comment">

        </div>
        <div class="footer">
            <div class="footer-left">同时评论{{this.$props.user}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            id: Number,
            user: String,
            content: String,
        },
        data() {
            return {
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
        },
        methods: {
            submit() {

            }
        }
    }
</script>

<style scoped>
    .share {
        background-color: white;
    }

    .prefix {
        float: left;
    }

    .tabs {
        float: left;
    }
</style>

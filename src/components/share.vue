<template>
    <div class="share">
        <div class="destination">
            <div class="tabs">
                <el-tabs v-model="active_tab">
                    <el-tab-pane label="我的动态" name="3"></el-tab-pane>
                    <el-tab-pane label="好友圈" name="1"></el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="main">
            <div class="quote text-overflow">
                @{{this.$props.user}}: {{this.$props.content}}
            </div>
            <div class="comment">
                <el-input type="textarea" v-model="text" :placeholder="holder"/>
            </div>
        </div>
        <div class="foot">
<!--            <el-row>-->
<!--                <el-col :span="4">-->
<!--                    <el-button class="emoji" type="text" icon="el-icon-magic-stick" @click="emoji">表情</el-button>-->
<!--                </el-col>-->

<!--                <el-col :span="8">-->
<!--                    <el-checkbox class="check-box" :span="8" v-model="comment_to_flag">同时评论给 {{this.$props.user}}</el-checkbox>-->
<!--                </el-col>-->

<!--                <el-col :span="8">-->
<!--                    <el-button :span="8" type="primary" size="mini" @click="submit">发布</el-button>-->
<!--                </el-col>-->
<!--            </el-row>-->
            <div class="emoji">
                <el-button class="emoji-btn" type="text" icon="el-icon-magic-stick" @click="emoji">表情</el-button>
            </div>
            <div class="check-box">
                <el-checkbox v-model="comment_to_flag">同时评论给 {{this.$props.user}}</el-checkbox>
            </div>
            <div class="btn">
                <el-button type="primary" @click="submit" size="mini">发布</el-button>
            </div>
        </div>

        <el-row class="emoji-picker" style="z-index: 999">
            <VEmojiPicker
                    v-show="showEmojiPicker"
                    labelSearch="Search"
                    lang="pt-BR"
                    @select="onSelectEmoji"
            />
        </el-row>
    </div>
</template>

<script>
    import axios from 'axios';
    import VEmojiPicker from 'v-emoji-picker';

    export default {
        components: { VEmojiPicker },
        props: {
            id: Number,
            to_uid: Number,
            user: String,
            content: String,
        },
        data() {
            return {
                comment_to_flag: false,
                holder: '//@',
                active_tab: '3',
                text: '',
                showEmojiPicker: false,
            }
        },
        created() {
            this.holder += this.$props.user + ':转发动态';
        },
        methods: {
            emoji() {
                this.showEmojiPicker = (this.showEmojiPicker !== true);
            },
            onSelectEmoji(emoji) {
                this.text += emoji.data;
            },
            curr_time() {
                let date = new Date();
                let res = date.getFullYear() + '-';
                if (date.getMonth() < 9)
                    res += '0';
                let month=date.getMonth()+1;
                res += (month+ '-');

                if (date.getDate() < 10)
                    res += '0';

                res += date.getDate() + ' ';

                if (date.getHours() < 10)
                    res += '0';

                res += date.getHours() + ':';

                if (date.getMinutes() < 10)
                    res += '0';

                res += date.getMinutes();

                return res;
            },
            submit() {
                let url = 'http://localhost:8088/blog/setReblog';

                if (this.text === '') {
                    this.text = '转发动态';
                }

                axios.post(url, {
                    uid: sessionStorage.getItem("id"),
                    bid: this.$props.id,
                    type: this.active_tab,
                    content: this.text,
                    post_day: this.curr_time(),
                    username: this.$props.user
                    },
                    {
                        headers: {
                            token: sessionStorage.getItem("token")
                        }
                    }).then((response) => {

                    if (response.data === true) {
                        this.$message.success('转发成功！');
                        if (this.comment_to_flag === true)
                            this.comment();
                    }
                    else
                        this.$message.error('转发失败');
                }).catch(err => {
                    console.log(err);
                });

                this.$emit('change',);
                return true;
            },
            comment() {
                let url = 'http://localhost:8088/blog/setComment';

                axios.post(url, {
                        uid: sessionStorage.getItem("id"),
                        to_uid: this.$props.to_uid,
                        bid: this.$props.id,
                        content: this.text,
                        post_time: this.curr_time(),
                        root_cid: -1,
                        to_cid: -1
                    },
                    {
                        headers: {
                            token: sessionStorage.getItem("token")
                        }
                    }).then((response) =>{
                    if (response.data === true) {
                        this.$message.success('评论成功！');
                        this.text = '';
                        window.location.reload();
                    }

                    else
                        this.$message.success('评论失败！');
                }).catch(err =>{
                    console.log(err);
                });
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

    .check-box {
        float: left;
        margin-left: 20px;
        margin-top: 10px;
    }

    .emoji {
        float: left;
    }

    .btn {
        float: right;
        margin-top: 5px;
    }
</style>

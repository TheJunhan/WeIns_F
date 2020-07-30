<template>
    <el-card  shadow="hover">
        <div class="card">
            <div class="in" >
                <div class="ava" v-if="type !== 1">
                    <el-avatar class="comava" shape="square" :size="50" :src="squareUrl"></el-avatar>
                </div>

                <el-input
                        class="cominput"
                        type="textarea"
                        :rows="1"
                        placeholder="请输入评论内容"
                        v-model="text">
                </el-input>
            </div>
            <div class="operation">
                <el-row>
                    <el-col :span="4">
                        <el-button type="text" icon="el-icon-magic-stick" >表情</el-button>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="text" icon="el-icon-picture" >图片</el-button>
                    </el-col>
                    <el-checkbox :span="8" class="radio" :label="1" v-model="radio">同时发表到我的微博</el-checkbox>
                    <el-button :span="8" class="combutton" type="primary" size="mini" @click="submit" :disabled="disable()">发表评论</el-button>
                </el-row>
            </div>
        </div>
    </el-card>
</template>

<script>
    import axios from 'axios';

    export default {
        props: {
            bid: Number,
            to_uid: Number,
            to_username: String,
            type: Number,
            comment: Object
        },
        data () {
            return {
                squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
                radio: 0,
                text: '',
                pretext: '',
                to_comment: {}
            }
        },
        created() {
            if (this.$props.type === 1)
                this.to_comment = this.$props.comment;

            this.pretext = (this.$props.type === 1) ? '回复@' + this.$props.to_username + ':' : '';
            this.text = this.pretext;
            this.squareUrl = sessionStorage.getItem("avatar");
            this.radio = 0;
        },
        methods: {
            disable() {
                return this.text === this.pretext || this.text === '';
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
            textSplit() {
                if (this.$props.type === 1) {
                    let index = this.text.indexOf(':');
                    console.log(index);
                    console.log(this.text.substr(index + 1, this.text.length - index));
                    return this.text.substr(index + 1, this.text.length - index);
                }

                else
                    return this.text;
            },
            getRoot_cid() {
                if (this.to_comment.root_cid === -1)
                    return this.to_comment.cid;
                else
                    return this.to_comment.root_cid;
            },
            submit() {
                if (this.$root.logged === false) {
                    this.$message.info("请登录后再进行操作");
                    return false;
                }

                if (this.text === this.pretext) {
                    this.$message.error('评论不能为空！');
                    this.disabled = false;
                    return false;
                }

                let url = 'http://localhost:8088/blog/setComment';

                axios.post(url, {
                    uid: sessionStorage.getItem("id"),
                    to_uid: this.$props.to_uid,
                    bid: this.$props.bid,
                    content: this.textSplit(),
                    post_time: this.curr_time(),
                    root_cid: (this.$props.type === 1) ? this.getRoot_cid() : -1,
                    to_cid: (this.$props.type === 1) ? this.to_comment.cid : -1
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

                this.$emit('change');
            }
        }
    }
</script>

<style scoped>
    .in{
        display: flex;
    }

    .ava{
        float: left;
        flex-direction: column;
    }

    .cominput{
        width: 100%;
        margin-left: 5%;
        margin-top: 1%;
        float: left;
        flex-direction: column;
    }

    .operation {
        margin-left: 10%;
        margin-top: 5px;
    }

    .combutton{
        float: right;
    }

    .radio{
        margin-top: 1.5%;
        float: left;
    }

</style>

<template>
    <el-card  shadow="hover">
        <div class="card">
            <div class="in" >
                <div class="ava">
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
            <div class="operation" >
                <el-row>
                    <el-col :span="4">
                        <el-button type="text" icon="el-icon-magic-stick" >表情</el-button>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="text" icon="el-icon-picture" >图片</el-button>
                    </el-col>
                    <el-checkbox :span="8" class="radio" :label="1" v-model="radio">同时发表到我的微博</el-checkbox>
                    <el-button :span="8" class="combutton" type="primary" @click="submit">发表评论</el-button>
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
            to_username: String
        },
        data () {
            return {
                squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
                radio: 0,
                text: ''
            }
        },
        created() {
            this.squareUrl = JSON.parse(sessionStorage.getItem("userMongo")).avatar;
            this.radio = 0;
            this.text = '';
        },
        methods: {
            submit() {
                if (this.$root.logged === false) {
                    this.$message.info("请登录后再进行操作");
                    return false;
                }

                if (this.text === '') {
                    return false;
                }

                let url = 'http://localhost:8088/blog/setComment';

                axios.post(url, {
                    uid: sessionStorage.getItem("id"),
                    username: sessionStorage.getItem("name"),
                    to_uid: this.$props.to_uid,
                    to_username: this.$props.to_username,
                    bid: this.$props.bid,
                    content: this.text
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

    .operation{
        margin-left: 10%;
    }

    .combutton{
        float: right;
    }

    .radio{
        margin-top: 1.5%;
        float: left;
    }

</style>

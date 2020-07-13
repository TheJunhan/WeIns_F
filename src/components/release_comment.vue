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
                        v-model="textarea">
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
                    <el-radio :span="8" class="radio" :label="1">同时发表到我的微博</el-radio>
                    <el-button :span="8" class="combutton" type="primary">发表评论</el-button>
                </el-row>
            </div>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "release_comment",
        data () {
            return {
                squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
                radio:0
            }
        }
    }
</script>

<style scoped>
    .in{
        display: flex;
    }
    /*.ava{*/
    /*    width: 15%;*/
    /*}*/
    .ava{
        float: left;
        /*margin-left: 3%;*/
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
    /*.a{*/
    /*    flex-direction: column;*/
    /*}*/
</style>

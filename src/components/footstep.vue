<template>
    <div>
        <el-card shadow="hover">
            <p class="head">赞</p>
            <div class="main">
                <div class="divider">
                    <el-divider></el-divider>
                </div>
                <img class="pic" src="../assets/image/poster_1.png" alt="picture"/>
                <div class="content">
                    <p class="name-text">{{footstep.name}}</p>
                    <p class="content-text text-overflow">{{footstep.context}}</p>
                </div>
                <div class="divider">
                    <el-divider></el-divider>
                </div>
            </div>
            <div class="btn">
                <el-button type="text" @click="more">查看更多>></el-button>
            </div>
        </el-card>
    </div>

</template>

<script>
    export default {
        name: "footstep",
        data(){
            return{
                footstep:{
                    img:"",
                    name: "WeIns",
                    context:"大家好,我是上海交通大学软件学院的最咸的咸鱼！大家好,我是上海交通大学软件学院的最咸的咸鱼！"
                }
            }
        },
        methods: {
            more() {
                this.$message.success('查看更多！');
            }
        }
    }
</script>

<style scoped>
    .pic{
        width: 40%;
        height:40%;
        float: left;
    }

    .main {
        margin-top: -10px;
        margin-bottom: -10px;
    }

    .content{
        width: 55%;
        height:40%;
        float: left;
        margin-left: 3%;
    }
    .divider{
        padding-top: 3%;
        clear: both;
    }
    .head{
        height: 10%;
        text-align: left;
    }
    .name-text{
        font-size: larger;
        text-align: center;
        color: antiquewhite;
    }
    .content-text{
        color: #A7CFE8;
        text-align: left;
        font-size: small;
    }
    .text-overflow {
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        height: 40%;
        overflow: hidden;
        white-space: nowrap;
    }
    .btn {
        margin-top: -10px;
        margin-bottom: -10px;
    }
</style>

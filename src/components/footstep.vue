<template>
    <el-card shadow="hover">
       <p class="head">赞</p>
        <div class="divi">
            <el-divider ></el-divider>
        </div>
        <img class="pic" src="../assets/image/poster_1.png" alt="picture"/>
        <div class="content">
            <p class="nametext">{{footstep.name}}</p>
            <p class="contenttext text-overflow">{{footstep.context}}</p>
        </div>
        <div class="divi">
            <el-divider ></el-divider>
        </div>
        <el-button class="but" type="text" >查看更多>></el-button>
    </el-card>
</template>

<script>
    export default {
        name: "footstep",
        data(){
            return{
                footstep:{
                    img:"",
                    name:"weins",
                    context:"大家好,我是上海交通大学软件学院的最咸的咸鱼！大家好,我是上海交通大学软件学院的最咸的咸鱼！大家好,我是上海交通大学软件学院的最咸的咸鱼！"
                }
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
    .content{
        width: 55%;
        height:40%;
        float: left;
        margin-left: 3%;
    }
    .divi{
        padding-top: 3%;
        /*margin-bottom: 10%;*/
        clear: both;
    }
    .head{
        height: 10%;
        text-align: left;
    }
    .nametext{
        font-size: larger;
        text-align: center;
    }
    .contenttext{
        color: #A7CFE8;
        text-align: left;
        /*text-after-overflow: ellipsis;*/
        font-size: small;
    }
    .text-overflow {
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        height: 40%;
        overflow: hidden;
        white-space: nowrap;
    }

</style>

<template>
    <el-card style="width: 80%;text-align: center;margin-left: 10%">
        <div class="back">
            <img class="pic" src='../assets/image/logo.png' alt="picture" v-on:click="home"/>
            <div class="text1" >
                {{personalcard.name}}
            </div>
            <div class="text2" >
                {{personalcard.signature}}
            </div>

        </div>
        <el-menu class="el-menu-demo" mode="horizontal"  >
            <el-menu-item  class="menu" index="1">我的主页</el-menu-item>
            <el-menu-item class="menu" index="2">管理中心</el-menu-item>
        </el-menu>
    </el-card>
</template>

<script>
    // import image1 from '../assets/image/poster_1.png';
    // import image2 from '../assets/image/poster_2.png';
    export default {
        name: "personalcard",
        data(){
            return{
                personalcard:{
                    name: "weins",
                    signature:"join us",
                    // bg:image1,
                    // photo:image2
                }
            }
        },
        methods:{

        }
    }
</script>

<style scoped>
    .back{
        width: 100%;
        height: 300px;
        /*display: flex;*/
        background: url("../assets/image/poster_1.png");
    }
    .pic{
        margin-top: 40px;
        width: 150px;
        height:150px;

        /*flex-direction: column;*/
        clear: both;
    }
    /*.pic{*/

    /*}*/
    .text1{
        /*margin-top: 1%;*/
        text-align: center;
        /*flex-direction: column;*/
        clear: both;
        color: white;
        font-size: xx-large;
    }
    .text2{
        /*margin-top: 1%;*/
        clear: both;
        text-align: center;
        /*flex-direction: column;*/
        color: #c6c6c6;

    }
    .menu{
        width: 50%;
    }

</style>

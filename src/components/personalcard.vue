<template>
    <el-card>
        <div class="back">
            <img class="pic" src='../assets/image/logo.png' alt="picture"/>
            <div class="text1" >
                {{personalcard.name}}
            </div>
            <div class="text2" >
                {{personalcard.signature}}
            </div>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item  class="menu" index="1">我的主页</el-menu-item>
                <el-menu-item class="menu" index="2">管理中心</el-menu-item>
            </el-menu>
        </div>
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
        }
    }
</script>

<style scoped>
    .back{
        width: 100%;
        height: 100%;
        /*display: flex;*/
        background: url("../assets/image/poster_1.png");
    }
    .pic{
        width: 10%;
        height:10%;

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

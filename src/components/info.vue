<template>
    <el-card  shadow="hover">
        <div class="card">
            <el-divider class="divi"></el-divider>
            <span class="graytext">个人资料完成度</span>
            <el-progress :percentage=info.percentage></el-progress>
            <el-divider class="divi"></el-divider>
            <el-button class="but" type="text" >编辑个人资料>></el-button>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "info",
        data(){
            return{
                info:{
                    percentage:50
                }
            }
        }
    }
</script>

<style scoped>
    .graytext{
        color: darkgray;
    }
    .card{
        width: 100%;
    }
    .divi{
        margin-top: 5%;
    }
    .but{
       height: 1%;
    }
</style>

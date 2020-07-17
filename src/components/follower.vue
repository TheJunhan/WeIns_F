<template>
    <div class="extern">
        <el-card shadow="hover" style="background-color: #f2f2f5;">
            <div class="card">
                <div class="avatar">
                    <el-avatar :size="50" :src="avatarUrl"></el-avatar>
                </div>
                <div class="content" style="border-left:1px solid lightgray;text-align: center">
                    <p style="text-align: left; margin-left: 10%; margin-bottom: 5%;color: #ec2025">{{following.name}}</p>
                    <p style="text-align: left; margin-left: 10%; margin-bottom: 5%;">关注了你</p>
                    <div class="buttons">
                        <el-button type="text" icon="el-icon-plus">关注</el-button>
                        <el-button type="text" style="float: right">去他/她的主页>></el-button>
                    </div>

                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "following",
        data(){
            return{
                following :{
                    avatarUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                    name:"weins",
                }
            }
        }
    }
</script>

<style scoped>
    .extern {
        width: 40%;

    }
    .avatar{
        margin-top: 8%;
        width: 20%;
        float: left;
        /*background-color: red;*/
    }
    .content{
        width: 68%;
        float: left;
        margin-left: 5%;
        margin-bottom: 5%;

    }
</style>
<template>
    <div>
        <el-card  shadow="hover">
            <div class="card">
                <el-divider class="divider"></el-divider>
                <span class="gray-text">个人资料完成度</span>
                <el-progress :percentage=info.percentage></el-progress>
                <el-divider class="divider"></el-divider>
                <div class="btn">
                    <el-button type="text" >编辑个人资料>></el-button>
                </div>
            </div>
        </el-card>
    </div>

</template>

<script>
    export default {
        name: "info",
        data(){
            return{
                info:{
                    percentage: 50
                }
            }
        }
    }
</script>

<style scoped>
    .gray-text{
        color: darkgray;
    }
    .card {
        width: 100%;
    }
    .divider {
        margin-top: 5%;
    }
    .btn {
        margin-top: -15px;
        margin-bottom: -15px;
    }
</style>

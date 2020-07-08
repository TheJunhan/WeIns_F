<template>
    <div class="bottom center">
        <div class="group">
            <el-icon class="el-icon-info"></el-icon>
            WeIns produced by Agent 007
        </div>

        <div class="member">
            <el-link href="https://github.com/DDIP2020" target="_blank" type="primary">GitHub</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link href="https://github.com/Laffery" target="_blank" type="info">Ao Yuchen</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link href="https://github.com/1047666945" target="_blank" type="info">Dou Jiawei</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link href="https://github.com/TheJunhan" target="_blank" type="info">Xu Junhan</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link href="https://github.com/Tarosweet" target="_blank" type="info">Fu Yuhan</el-link>
        </div>

        <div class="copyright">
            Copyright 2020© Powered by SJTU SE DDIP
        </div>
    </div>
</template>

<script>
    export default {
        name: "footer"
    }
</script>

<style scoped>
    .bottom {
        font-size: x-small;
        color: #909399;
        width: 110%;
        padding-bottom: 2%;
        padding-top: 2%;
        margin-left: -5%;
        background-color: #F2F2F5;
    }

    .member {
        margin-top: 0.5%;
    }

    .copyright {
        margin-top: 0.5%;
    }
</style>

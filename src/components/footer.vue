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
        name: "Footer"
    }
</script>

<style scoped>
    .bottom {
        text-align: center;
        font-size: x-small;
        color: #909399;
        width: 100%;
        padding: 30px 10%;
        margin-left: -10%;
        background-color: #F2F2F5;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .member {
        margin-top: 5px;
    }

    .copyright {
        margin-top: 5px;
    }
</style>

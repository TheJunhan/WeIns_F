<template>
    <div class="sider">
        <el-menu default-active="1"
                 class="nav"
                 :collapse="false"
                 unique-opened="true">
            <el-menu-item index="1">
                <span slot="title">热门</span>
            </el-menu-item>
            <el-menu-item index="2">
                <span slot="title">社会</span>
            </el-menu-item>
            <el-menu-item index="3">
                <span slot="title">生活</span>
            </el-menu-item>
            <el-menu-item index="4" >
                <span slot="title" >电影</span>
            </el-menu-item>
            <el-menu-item index="5">
                <span slot="title">时尚</span>
            </el-menu-item>
            <el-menu-item index="6">
                <span slot="title">教育</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "sidenav"
    }
</script>

<style scoped>

</style>

<template>
    <div>
        <div class="extern">
            <el-header>
                <Header></Header>
            </el-header>
            <div class="content">
                <userTable></userTable>
            </div>
        </div>
        <el-footer>
            <Footer></Footer>
        </el-footer>
    </div>
</template>

<script>
    import Header from "../components/topnav";
    import Footer from "../components/footer";
    import userTable from "../components/userTable";

    export default {
        components: { Header, Footer, userTable }
    }
</script>

<style scoped>
    .extern {
        background-color: #A7CFE8;
    }

    .content {
        clear: both;
        display: flex;
        margin-left: 4%;
        width: 100%;
        padding-bottom: 40px;
    }
</style>

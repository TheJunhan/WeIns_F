<template>
    <div class="home" style="width: 100%">
        <el-header id="float">
            <Header ></Header>
        </el-header>
        <el-container style="width: 100%;margin-bottom: 70px">
            <div class="category">
                <Issue></Issue>
            </div>
        </el-container>
        <el-footer>
            <Footer style="margin-top: 2%"></Footer>
        </el-footer>

    </div>
</template>

<script>
    import Header from '../components/topnav';
    import Footer from '../components/footer';
    import Issue from '../components/issue';

    export default {
        name: "home",
        components: { Header, Footer,  Issue},
        created() {
            if (sessionStorage.getItem("token") !== null) {
               this.$root.logged = true;

               if (Number(sessionStorage.getItem("type")) > 0)
                   this.$root.is_superuser = true;
            }
        }
    }

</script>

<style scoped>
    .home {
        background-color: #A7CFE8;
    }

    .category {
        width: 100%;
        margin: auto;
    }
</style>

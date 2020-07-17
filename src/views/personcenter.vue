<template>
    <div class="extern">
        <el-header>
            <Header></Header>
        </el-header>
        <div class="person">
            <div class="head">
                <Card class="card"></Card>
            </div>
            <div class="container">
                <div class="side">
                    <Counter class="counter"></Counter>
                    <Info class="info"></Info>
                    <Footstep class="footstep"></Footstep>
                </div>
                <div class="main">
                    <Information></Information>
                    <Blogs></Blogs>
                    <R_Comment></R_Comment>
                    <Comment></Comment>
                    <Follow></Follow>
                </div>
            </div>
        </div>
        <el-footer>
            <Foot style="margin-top: 30px; text-align: center;"></Foot>
        </el-footer>
    </div>
</template>

<script>
    import Counter from "../components/counter";
    import Card from '../components/personalcard';
    import Footstep from "../components/footstep";
    import Info from "../components/info";
    import Blogs from "../components/myblogs";
    import Information from "../components/information";
    import R_Comment from "../components/release_comment";
    import Comment from "../components/comment";
    import Header from '../components/topnav';
    import Foot from '../components/footer';
    import Follow from '../components/follow';

    export default {
        components: {
            Header, Counter, Info , Footstep, Information,
            Card, R_Comment, Comment, Blogs, Foot, Follow
        }
    }
</script>

<style scoped>
    .extern {
        width: 100%;
        background-color: #A7CFE8;
    }

    .person {
        width: 90%;
        display: flex;
        flex-direction: column;
        margin-left: 5%;
    }

    .head {
        width: 100%;
    }

    .container {
        width: 90%;
        margin-left: 5%;
        margin-top: 20px;
    }

    .card {
        width: 80%;
        margin-left: 10%;
    }

    .side {
        float: left;
        width: 20%;
    }

    .counter {

    }

    .info {
        margin-top: 10px;
    }

    .footstep {
        margin-top: 10px;
    }

    .main {
        float: left;
        margin-left: 3%;
        width: 77%;
    }
</style>

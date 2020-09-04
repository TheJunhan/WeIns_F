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
                    <Counter :follower_num="follower_num" :following_num="following_num" :blog_num="blog_num"></Counter>
                    <Info class="info"></Info>
                    <Footstep class="footstep"></Footstep>
                </div>
                <div class="main">
                    <Information v-if="this.$root.my_person_center_info === true"></Information>
                    <Blogs v-if="this.$root.my_person_center_blogs === true"></Blogs>
                    <Follower v-if="this.$root.my_person_center_follower === true"></Follower>
                    <Following v-if="this.$root.my_person_center_following === true"></Following>
                </div>
            </div>
        </div>
        <el-footer>
            <Foot style="margin-top: 30px; text-align: center;"></Foot>
        </el-footer>
    </div>
</template>

<script>
    import axios from 'axios';

    import Counter from "../components/counter";
    import Card from '../components/personalcard';
    import Footstep from "../components/footstep";
    import Info from "../components/info";
    import Header from '../components/topnav';
    import Foot from '../components/footer';
    import Blogs from "../components/myblogs";
    import Information from "../components/information";
    import Follower from '../components/followers';
    import Following from '../components/followings';

    export default {
        components: {
            Header, Counter, Info , Footstep, Card, Foot, Information, Blogs, Follower, Following
        },
        data() {
            return {
                follower_num: 0,
                following_num: 0,
                blog_num: 0,
            }
        },
        created() {
            this.$root.my_person_center = true;

            let url = 'http://localhost:8088/user/getPlainOne?id=' + sessionStorage.getItem("id");

            axios.get(url).then(res => {
                console.log(res.data);
                let userMongo = res.data.userMongo;
                this.follower_num = userMongo.follower_num;
                this.following_num = userMongo.following_num;
                this.blog_num = userMongo.blog_num;
            }).catch(err => {
                console.log(err);
            });
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

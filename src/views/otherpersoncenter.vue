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
                    <Counter class="counter" :data="user"></Counter>
                </div>
                <div class="main">
                    <Information v-if="this.$root.my_person_center_info === true"></Information>
                    <Blogs v-if="this.$root.my_person_center_blogs === true"></Blogs>
                    <Follow v-if="this.$root.my_person_center_follower === true"></Follow>
                    <Follow v-if="this.$root.my_person_center_following === true"></Follow>
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

    import Counter from "../components/othercounter";
    import Card from '../components/otherpersonalcard';
    import Header from '../components/topnav';
    import Foot from '../components/footer';
    import Blogs from "../components/otherblogs";
    import Information from "../components/otherinformation";
    import Follow from '../components/follow';

    export default {
        components: {
            Header, Card, Foot, Counter,
            Information, Blogs, Follow,
        },
        data() {
            return {
                id: 0,
                user: {}
            }
        },
        created() {
            this.$root.my_person_center = false;
            this.$root.my_person_center_info = false;
            this.$root.my_person_center_blogs = true;
            this.$root.my_person_center_follower = false;
            this.$root.my_person_center_following = false;

            this.id = this.$route.query.id;
            let url = 'http://localhost:8088/user/getOne?id=' + this.id;
            console.log(url);

            axios.get(url, {
                headers: {
                    token: sessionStorage.getItem("token")
                }
            }).then((response) => {
                this.user = response.data;
            }).catch(err => {
                console.log(err);
            });
        },
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

    .main {
        float: left;
        margin-left: 3%;
        width: 77%;
    }
</style>

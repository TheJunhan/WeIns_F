<template>
    <div class="extern">
        <el-header>
            <Header></Header>
        </el-header>
        <div class="person">
            <div class="head">
                <Card class="card" :avatar="user.userMongo.avatar" :name="user.name" :flag="follow_flag"></Card>
            </div>
            <div class="container">
                <div class="side">
                    <Counter class="counter" :follower_num="user.userMongo.follower_num"
                             :following_num="user.userMongo.following_num" :blog_num="user.userMongo.blog_num"></Counter>
                </div>
                <div class="main">
                    <Information v-if="this.$root.my_person_center_info === true" :data="user"></Information>
                    <Blogs v-if="this.$root.my_person_center_blogs === true"></Blogs>
                    <Following v-if="this.$root.my_person_center_following === true" :list="user.userMongo.followers"></Following>
                    <Follower v-if="this.$root.my_person_center_follower === true" :list="user.userMongo.followings"></Follower>
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
    import Card from '../components/otherpersonalcard';
    import Header from '../components/topnav';
    import Foot from '../components/footer';
    import Blogs from "../components/otherblogs";
    import Information from "../components/otherinformation";
    import Follower from '../components/followers';
    import Following from '../components/followings';

    export default {
        components: {
            Header, Card, Foot, Counter, Information, Blogs, Follower, Following
        },
        data() {
            return {
                id: 0,
                user: {},
                follow_flag: 0
            }
        },
        created() {
            this.$root.my_person_center = false;
            this.$root.my_person_center_info = false;
            this.$root.my_person_center_blogs = true;
            this.$root.my_person_center_follower = false;
            this.$root.my_person_center_following = false;

            this.id = this.$route.query.id;
            let url = 'http://localhost:8088/user/getPlainOne?id=' + this.id;

            axios.get(url, {
                headers: {
                    token: sessionStorage.getItem("token")
                }
            }).then(res => {
                this.user = res.data;

                if (this.$root.logged === true) {
                    let followers = this.user.userMongo.followers;
                    for (let i = 0; i < followers.length; ++i) {
                        if (followers[i] === Number(sessionStorage.getItem("id"))) {
                            this.follow_flag = 1;
                            break;
                        }
                    }
                }
            }).catch(err => {
                console.log(err);
            });
        },
        watch: {
            // eslint-disable-next-line no-unused-vars
            '$route'(to, from) {
                this.generator();
            }
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

    .main {
        float: left;
        margin-left: 3%;
        width: 77%;
    }
</style>

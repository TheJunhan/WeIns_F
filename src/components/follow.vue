<template>
    <div class="extern">
        <el-card shadow="hover">
            <el-header>
                <p class="header">{{header()}}</p>
            </el-header>
            <div class="following" v-if="this.$root.my_person_center_following === true">
                <ul>
                    <li v-for="user in followings" :key="user">
                        <Following :uid="user"></Following>
                    </li>
                </ul>
            </div>
            <div class="follower" v-else>
                <ul>
                    <li v-for="user in followers" :key="user">
                        <Follower :uid="user"></Follower>
                    </li>
                </ul>
            </div>
        </el-card>
    </div>
</template>

<script>
    import axios from 'axios';

    import Following from "./following";
    import Follower from "./follower";

    export default {
        components: { Follower, Following },
        data() {
            return {
                followers: [],
                followings: []
            }
        },
        created() {
            this.generator();
        },
        methods: {
            generator() {
                if (this.$root.my_person_center === true) {
                    this.followings = JSON.parse(sessionStorage.getItem("userMongo")).followings;
                    this.followers = JSON.parse(sessionStorage.getItem("userMongo")).followers;
                }

                else {
                    let url = 'http://localhost:8088/user/getOne?id=' + this.$route.query.id;

                    axios.get(url).then((response) => {
                       let mongo = response.data.userMongo;
                       this.followers = mongo.followers;
                       this.followings = mongo.followings;
                    }).catch(err => {
                        console.log(err);
                    });
                }
            },
            header() {
                if (this.$root.my_person_center_following === true)
                    if (this.$root.my_person_center === true)
                        return "我的关注";
                    else
                        return "ta的关注";

                else if (this.$root.my_person_center_follower === true)
                    if (this.$root.my_person_center === true)
                        return "我的粉丝";
                    else
                        return "ta的粉丝";
            }
        }
    }
</script>

<style scoped>
    .header {
        text-align: center;
        font-size: x-large;
    }
</style>

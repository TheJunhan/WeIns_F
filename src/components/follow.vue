<template>
    <div class="extern">
        <el-card shadow="hover">
            <el-header>
                <p class="header">{{header()}}</p>
            </el-header>
            <div class="following" v-if="this.flag === true">
                <div v-if="this.followings.length > 0">
                    <ul>
                        <li v-for="user in followings" :key="user">
                            <Following :uid="user"></Following>
                        </li>
                    </ul>
                </div>
                <div v-else class="none">
                    <p>ta还没有关注的人哦</p>
                </div>
            </div>
            <div class="follower" v-else>
                <div v-if="followers.length > 0">
                    <ul>
                        <li v-for="user in followers" :key="user">
                            <Follower :uid="user"></Follower>
                        </li>
                    </ul>
                </div>

                <div v-else class="none">
                    <p>ta还没有粉丝哦</p>
                </div>
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
        props: {
            list: Array
        },
        data() {
            return {
                flag: false,
                followers: [],
                followings: []
            }
        },
        created() {
            this.generator();
            console.log(this.$props.list);
        },
        methods: {
            generator() {
                if (this.$root.my_person_center_following === true)
                    this.flag = true;

                if (this.$root.my_person_center === true) {
                    this.followings = JSON.parse(sessionStorage.getItem("userMongo")).followings;
                    this.followers = JSON.parse(sessionStorage.getItem("userMongo")).followers;
                }

                else {
                    let url = 'http://localhost:8088/user/getPlainOne?id=' + this.$route.query.id;

                    axios.get(url, {
                        headers: {
                            token: sessionStorage.getItem("token")
                        }
                    }).then((response) => {
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

    .none {
        text-align: center;
        font-size: large;
        color: #909399;
    }
</style>

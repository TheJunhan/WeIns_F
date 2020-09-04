<template>
    <div class="extern">
        <el-card shadow="hover">
            <el-header>
                <p class="header">{{ header() }}的粉丝</p>
            </el-header>
            <div class="follower">
                <div v-if="followers.length > 0">
                    <ul>
                        <li v-for="user in followers" :key="user">
                            <Follower :uid="user" style="float: left; margin-left: 2%; margin-bottom: 10px"></Follower>
                        </li>
                    </ul>
                </div>

                <div v-else class="none">
                    <p>{{ header() }}还没有粉丝哦</p>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import axios from 'axios';
    import Follower from "./followcard";

    export default {
        components: { Follower },
        props: {
            list: Array
        },
        data() {
            return {
                followers: []
            }
        },
        created() {
            this.generator();
        },
        methods: {
            generator() {
                let id = this.$root.my_person_center ? sessionStorage.getItem("id") : this.$route.query.id;
                let url = 'http://localhost:8088/user/getPlainOne?id=' + id;

                axios.get(url, {
                    headers: {
                        token: sessionStorage.getItem("token")
                    }
                }).then((res) => {
                    this.followers = res.data.userMongo.followers;
                }).catch(err => {
                    console.log(err);
                });
            },
            header() {
                return this.$root.my_person_center ? "你" : "ta";
            }
        }
    }
</script>

<style scoped>
    .header {
        text-align: center;
        font-size: x-large;
        color: #333333;
    }

    .none {
        text-align: center;
        font-size: large;
        color: #909399;
    }
</style>

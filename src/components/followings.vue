<template>
    <div class="extern">
        <el-card shadow="hover">
            <el-header>
                <p class="header">{{ header() }}的关注</p>
            </el-header>
            <div class="following">
                <div v-if="this.followings.length > 0">
                    <ul>
                        <li v-for="user in followings" :key="user">
                            <Following :uid="user" style="float: left; margin-left: 2%; margin-bottom: 10px"></Following>
                        </li>
                    </ul>
                </div>
                <div v-else class="none">
                    <p>{{ header() }}还没有关注的人哦</p>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import axios from 'axios';
    import Following from "./followcard";

    export default {
        components: { Following },
        props: {
            list: Array
        },
        data() {
            return {
                followings: []
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
                    this.followings = res.data.userMongo.followings;
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

<template>
    <div class="extern">
        <el-card shadow="hover">
            <el-header>
                <p class="header">{{header()}}</p>
            </el-header>
            <div class="following" v-if="this.$root.my_person_center_following === true">
                <ul>
                    <li v-for="user in users" :key="user">
                        <Following :uid="user"></Following>
                    </li>
                </ul>
            </div>
            <div class="follower" v-else>
                <ul>
                    <li v-for="user in users" :key="user">
                        <Follower :uid="user"></Follower>
                    </li>
                </ul>
            </div>
        </el-card>
    </div>
</template>

<script>
    import Following from "./following";
    import Follower from "./follower";

    export default {
        components: { Follower, Following },
        data() {
            return {
                type: 0,
                users: [2, 3, 4]
            }
        },
        created() {
            this.generator();
        },
        methods: {
            generator() {
                // this.users = JSON.parse(sessionStorage.getItem("userMongo")).followings;
            },
            header() {
                if (this.$root.my_person_center_following === true)
                    return "我的关注";

                else if (this.$root.my_person_center_follower === true)
                    return "我的粉丝";
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

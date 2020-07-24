<template>
    <div class="extern">
        <el-card style="width: 90%; text-align: center; margin-left: 5%">
            <div class="back">
                <img class="pic" v-bind:src="mongo.avatar" alt="picture" v-on:click="home"/>
                <div class="text1">
                    {{name}}
                </div>
                <div class="text2" v-if="follow_flag === false">
                    <el-button type="plain" size="mini" @click="follow(1)"><I class="el-icon-plus"></I> 关注</el-button>
                </div>
                <div class="text2" v-else>
                    <el-button type="plain" size="mini" @click="follow(-1)"><I class="el-icon-check"></I> 已关注</el-button>
                </div>
            </div>
            <el-menu class="el-menu-demo" mode="horizontal" default-active="1">
                <el-menu-item class="menu" index="1" @click="handleSelect(1)">ta的主页</el-menu-item>
                <el-menu-item class="menu" index="2" @click="handleSelect(2)">ta的资料</el-menu-item>
            </el-menu>
        </el-card>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                id: 0,
                name: '',
                mongo: '',
                follow_flag: false,
            }
        },
        created() {
            this.id = this.$route.query.id;
            let url = 'http://localhost:8088/user/getOne?id=' + this.id;

            axios.get(url).then((response) => {
                let user = response.data;

                this.name = user.name;
                this.mongo = user.userMongo;

                let followers = this.mongo.followers;
                for (let i = 0; i < followers.length; ++i) {
                    if (followers[i] === Number(sessionStorage.getItem("id"))) {
                        this.follow_flag = true;
                        break;
                    }
                }
            }).catch(err => {
                console.log(err);
            });
        },
        methods: {
            followed() {
                if (this.$root.logged === false)
                    return false;

                console.log(this.mongo);
                let follower = this.mongo.follower;
                console.log("follower");
                console.log(follower);
                for (let i = 0; i < follower.length; i++) {
                    if (follower[i] === Number(sessionStorage.getItem("id")))
                        return true;
                }

                return false;
            },
            follow(flag) {
                if (this.$root.logged === false) {
                    this.$message.info('请登陆后再进行操作！');
                    return;
                }

                let url = 'http://localhost:8088/user/follow?'
                + 'sub=' + sessionStorage.getItem("id")
                + '&obj=' + this.id
                + '&flag=' + flag;
                console.log(url);

                axios.post(url).then((response) =>{
                    console.log(response.data);
                    if (response.data === 'success') {
                        if (flag === 1) {
                            this.follow_flag = true;
                            this.$message.success('关注 ' + this.name + ' 成功！');
                        }

                        else {
                            this.follow_flag = false;
                            this.$message.success('取消关注 ' + this.name + ' 成功！');
                        }
                    }
                }).catch(err => {
                    console.log(err);
                });
            },
            home() {
                this.$message.info("nmsl");
            },
            handleSelect(index) {
                if (index === 1) {
                    this.$root.my_person_center_info = false;
                    this.$root.my_person_center_blogs = true;
                    this.$root.my_person_center_follower = false;
                    this.$root.my_person_center_following = false;
                }

                else {
                    this.$root.my_person_center_info = true;
                    this.$root.my_person_center_blogs = false;
                    this.$root.my_person_center_follower = false;
                    this.$root.my_person_center_following = false;
                }
            }
        }
    }
</script>

<style scoped>
    .extern {
        width: 100%;
        flex-direction: column;
    }

    .back {
        width: 100%;
        height: 300px;
        background: url("../assets/image/poster_1.png");
    }

    .pic {
        margin-top: 40px;
        width: 150px;
        height:150px;
        border-radius: 75px;
        clear: both;
    }

    .text1 {
        text-align: center;
        clear: both;
        color: white;
        font-size: xx-large;
    }

    .text2 {
        clear: both;
        text-align: center;
        color: #c6c6c6;
    }

    .menu {
        width: 50%;
    }

</style>

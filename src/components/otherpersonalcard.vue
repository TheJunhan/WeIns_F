<template>
    <div class="extern">
        <el-card style="width: 90%; text-align: center; margin-left: 5%">
            <div class="back">
                <img class="pic" :src="avatar" alt="picture" v-on:click="home"/>
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
        props: {
            avatar: String,
            name: String,
            flag: Number // 0 means have not been followed, 1 means what you know
        },
        data() {
            return {
                id: 0,
                follow_flag: false
            }
        },
        created() {
            this.id = this.$route.query.id;
            this.follow_flag = (this.$props.flag === 1);
        },
        methods: {
            follow(flag) {
                if (this.$root.logged === false) {
                    this.$message.info('请登陆后再进行操作！');
                    return;
                }

                let url = 'http://localhost:8088/user/follow?'
                + 'sub=' + sessionStorage.getItem("id")
                + '&obj=' + this.id
                + '&flag=' + flag;

                axios.post(url, {}, {
                    headers: {
                        token: sessionStorage.getItem("token")
                    }
                }).then((response) =>{
                    if (response.data === 'success') {
                        if (!this.follow_flag) {
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
                this.$root.my_person_center_info = false;
                this.$root.my_person_center_blogs = true;
                this.$root.my_person_center_follower = false;
                this.$root.my_person_center_following = false;
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

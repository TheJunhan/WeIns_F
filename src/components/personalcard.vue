<template>
    <div class="extern">
        <el-card style="width: 90%; text-align: center; margin-left: 5%">
                <div class="back">
                    <img class="pic" v-bind:src="user.userMongo.avatar" alt="picture" v-on:click="home"/>
                    <div class="text1">
                        {{user.name}}
                    </div>
                    <div class="text2" >
                        {{this.signature}}
                    </div>

                </div>
                <el-menu class="el-menu-demo" mode="horizontal"  >
                    <el-menu-item  class="menu" index="1">我的主页</el-menu-item>
                    <el-menu-item class="menu" index="2">管理中心</el-menu-item>
                </el-menu>
        </el-card>
    </div>
</template>

<script>
    // import image1 from '../assets/image/poster_1.png';
    // import image2 from '../assets/image/poster_2.png';
    // import axios from "axios";

    export default {
        data() {
            return {
                signature: "",
                user: {
                    id: 0,
                    name: '交通大学',
                    birthday: '1896-04-07',
                    sex: 1,
                    reg_time: '2020-07-01',
                    age: 14,
                    email: 'se128@sjtu.edu.cn',
                    phone: '021-34200000',
                    userMongo: {
                        avatar: ''
                    }
                }
            }
        },
        created() {
            this.generator();
        },
        methods: {
            generator() {
                this.user.id = sessionStorage.getItem("id");
                this.user.name = sessionStorage.getItem("name");
                this.user.reg_time = sessionStorage.getItem("reg_time");
                this.user.phone = sessionStorage.getItem("phone");
                this.user.sex = sessionStorage.getItem("sex");
                this.user.userMongo.avatar = JSON.parse(sessionStorage.getItem("userMongo")).avatar;
                this.user.birthday = sessionStorage.getItem("birthday");
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

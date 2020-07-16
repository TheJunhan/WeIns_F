<template>
    <div class="extern">
        <el-card style="width: 80%;text-align: center;margin-left: 10%">
            <div>
                <div class="back">
                    <img class="pic" src='../assets/image/logo.png' alt="picture" v-on:click="home"/>
                    <div class="text1" >
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

            </div>
        </el-card>
    </div>

</template>

<script>
    // import image1 from '../assets/image/poster_1.png';
    // import image2 from '../assets/image/poster_2.png';
    // import axios from "axios";

    export default {
        // name: "personalcard",
        data() {
            return {
                // personalcard:{
                signature: "",
                user: {
                    id: 0,
                    name: '交通大学',
                    birthday: '1896-04-07',
                    sex: 1,
                    reg_time: '2020-07-09',
                    age: 19,
                    email: 'se128@sjtu.edu.cn',
                    phone: '021-34200000',
                    userMongo: {
                        avatar: ''
                    }
                }
                // name: "weins",
                // avatar:''
                // }
            }
        },
        mounted() {
            this.getinfo();
        },
        methods: {
            getinfo() {
                // //  console.log(sessionStorage.getItem("name"));
                // // this.personalcard.name=sessionStorage.getItem("name");
                //     let url = 'http://localhost:8088/user/getOne';
                //     let id=sessionStorage.getItem("id");
                //     const data = {
                //         params: {id}
                //     }
                //
                //     axios.get(url,data).then((response) => {
                //         // let user = response.data;
                //         // console.log(user["name"]);
                //         // console.log(user.userMongo.avatar);
                //         // this.personalcard.avatar=user.UserMongo.avatar;
                //         // this.$set(this.personalcard.name,user.name);
                //         this.user=response.data;
                //     }).catch(err=>{
                //         console.log(err);
                //     })
                    // return true;
                }
            }
        }
</script>

<style scoped>
    .extern {
        width: 100%;
        flex-direction: column;
    }
    .back{
        width: 100%;
        height: 300px;
        /*display: flex;*/
        background: url("../assets/image/poster_1.png");
    }
    .pic{
        margin-top: 40px;
        width: 150px;
        height:150px;

        /*flex-direction: column;*/
        clear: both;
    }
    /*.pic{*/

    /*}*/
    .text1{
        /*margin-top: 1%;*/
        text-align: center;
        /*flex-direction: column;*/
        clear: both;
        color: white;
        font-size: xx-large;
    }
    .text2{
        /*margin-top: 1%;*/
        clear: both;
        text-align: center;
        /*flex-direction: column;*/
        color: #c6c6c6;

    }
    .menu{
        width: 50%;
    }

</style>

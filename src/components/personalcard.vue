<template>
    <div class="extern">
        <el-card style="width: 90%; text-align: center; margin-left: 5%">
                <div class="back">
                    <img class="pic" v-bind:src="user.userMongo.avatar" alt="picture" v-on:click="home"/>
                    <div class="text1">
                        {{user.name}}
                    </div>
                    <div class="text2" >
                        <el-upload
                                action=''
                                style="width: 80%;z-index: 998"
                                class="avatar-uploader"
                                :on-remove="removefile"
                                :on-change="getFile1"
                                :on-success="uploadsuccess"
                                list-type="picture"
                                :auto-upload="false"
                                :show-file-list="false"
                                accept=".jpg,.jpeg,.png">
                            <el-button size="mini" type="plain" icon="el-icon-upload" @click="upload">上传头像</el-button>
                        </el-upload>
                    </div>
                </div>
                <el-menu class="el-menu-demo" mode="horizontal" default-active="1">
                    <el-menu-item class="menu" index="1">我的主页</el-menu-item>
                    <el-menu-item class="menu" index="2">管理中心</el-menu-item>
                </el-menu>
        </el-card>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                signature: "",
                user: {
                    id: 0,
                    name: '交通大学',
                    birthday: '1896-04-07',
                    sex: -1,
                    reg_time: '2020-07-01',
                    phone: '021134200000',
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
                this.user.sex = sessionStorage.getItem("sex");
                this.user.userMongo.avatar =sessionStorage.getItem("userMongo")!=null ? JSON.parse(sessionStorage.getItem("userMongo")).avatar : null;
            },
            upload() {
                let url = 'http://localhost:8088/user/update';

                axios.post(url, {
                    id: sessionStorage.getItem("id"),
                    userMongo: {
                        avatar: '' // 上传的图片的base64
                    }
                }).then((response) => {
                    if(response.data === 'success')
                        this.$message.success('更换头像成功！');
                }).catch(err => {
                   console.log(err);
                });
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
        margin-top: 20px;
        margin-left: 130px;
    }

    .menu {
        width: 50%;
    }

</style>

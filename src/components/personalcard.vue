<template>
    <div class="extern">
        <el-card style="width: 90%; text-align: center; margin-left: 5%">
                <div class="back">
                    <img class="pic" v-bind:src="user.userMongo.avatar" alt="picture"/>
                    <div class="text1">
                        {{user.name}}
                    </div>
                    <div class="text2" v-if="this.update_flag === false">
                        <el-upload
                                action='string'
                                style="width: 80%;z-index: 998"
                                class="avatar-uploader"
                                :on-change="getFile"
                                :limit="1"
                                :auto-upload="false"
                                :show-file-list="false"
                                accept=".jpg,.jpeg,.png">
                            <el-button size="mini" type="plain" icon="el-icon-upload">上传头像</el-button>
                        </el-upload>
                    </div>

                    <div v-if="this.update_flag === true" class="text3">
                        <el-button size="mini" type="primary" icon="el-icon-check" @click="upload"></el-button>
                        <el-button size="mini" type="danger" icon="el-icon-close" @click="cancel"></el-button>
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
                update_flag: false,
                origin_avatar: '',
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
                let url = 'http://localhost:8088/user/getPlainOne?id=' + this.user.id;

                axios.get(url, {
                    headers: {
                        token: sessionStorage.getItem("token")
                    }
                }).then(res => {
                    this.user = res.data;
                    this.origin_avatar = this.user.userMongo.avatar;
                }).catch(err => {
                    console.log(err);
                });
            },
            getBase64(file) {
                return new Promise(function (resolve, reject) {
                    let reader = new FileReader();
                    let imgResult = '';
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                        imgResult = reader.result;
                    };
                    reader.onerror = function (error) {
                        reject(error);
                    };
                    reader.onloadend = function () {
                        resolve(imgResult);
                    };
                });
            },
            getFile(file) {
                if (!this.uploaded)
                    this.uploaded = true;
                this.getBase64(file.raw).then(res => {
                    this.user.userMongo.avatar = res;
                });

                this.update_flag = true;
                return true;
            },
            cancel() {
                this.update_flag = false;
                this.user.userMongo.avatar = this.origin_avatar;
            },
            upload() {
                let url = 'http://localhost:8088/user/update';
                console.log(url);

                let form = this.user;
                form.avatar = this.user.userMongo.avatar;

                axios.post(url, form, {
                    headers: {
                        token: sessionStorage.getItem("token")
                    }
                }).then(res => {
                    if(res.data === 'success')
                        this.$message.success('更换头像成功！');
                    console.log(res.data);
                }).catch(err => {
                   console.log(err);
                });

                this.update_flag = false;
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

    .text3 {
        clear: both;
        text-align: center;
        color: #c6c6c6;
        margin-top: 20px;
    }

    .menu {
        width: 50%;
    }

</style>

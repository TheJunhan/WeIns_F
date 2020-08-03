<template>
    <div class="extern">
        <el-card shadow="hover">
            <div>
                <div class="basic">
                    <div class="basic-header">
                        <div class="basic-header-left">
                            基本信息
                        </div>
                        <div class="basic-header-divider">
                            <el-divider direction="horizontal"></el-divider>
                        </div>
                    </div>

                    <div class="basic-info">
                        <el-form ref="form" :model="user" label-width="80px">
                            <el-form-item label="昵称">
                                <span style="float: left" class="span-text">{{user.name}}</span>
                            </el-form-item>
                            <el-form-item label="性别">
                                <span style="float: left" class="span-text">{{sex()}}</span>
                            </el-form-item>
                            <el-form-item label="年龄">
                                <span style="float: left" class="span-text">{{age()}}</span>
                            </el-form-item>
                            <el-form-item label="生日">
                                <span style="float: left" class="span-text">{{user.birthday}}</span>
                            </el-form-item>
                            <el-form-item label="注册时间">
                                <span style="float: left" class="span-text">{{user.reg_time}}</span>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>

                <div class="contact">
                    <div class="contact-header">
                        <div class="contact-header-left">
                            联系信息
                        </div>
                        <div class="contact-header-divider">
                            <el-divider direction="horizontal"></el-divider>
                        </div>
                    </div>

                    <div class="contact-info">
                        <el-form ref="form" :model="user" label-width="80px">
                            <el-form-item label="常用邮箱">
                                <span style="float: left" class="span-text">{{user.email}}</span>
                            </el-form-item>
                            <el-form-item label="手机号码">
                                <div>
                                    <span style="float: left" class="span-text">{{user.phone}}</span>
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                birthright:"",
                sexStr: '未知',
                user: {
                    id: 0,
                    name: '交通大学',
                    birthday: '1896-04-07',
                    sex: -1,
                    reg_time: '2020-07-09',
                    email: 'se128@sjtu.edu.cn',
                    phone: '021-34200000',
                    userMongo: {}
                }
            }
        },
        created() {
            let url = 'http://localhost:8088/user/getOne?id=' + this.$route.query.id;

            axios.get(url, {
                headers: {
                    token: sessionStorage.getItem("token")
                }
            }).then((response) => {
               this.user = response.data;

                this.user.email = '暂未设置';
            }).catch(err => {
                console.log(err);
            });
        },
        methods: {
            sex() {
                switch (this.user.sex) {
                    case "1":
                        return "男";
                    case "0":
                        return "女";
                    case "-1":
                        return "未知";
                    default:
                        return "未知";
                }
            },
            age() {
                let date = new Date();
                let year = Number(this.user.birthday.substr(0, 4));
                return date.getFullYear() - year;
            },
        }
    }
</script>

<style scoped>
    .extern {
        width: 100%;
        flex-direction: column;
    }

    .basic {
        width: 100%;
    }

    .basic-header {
        width: 100%;
        float: left;
        margin-bottom: 20px;
    }

    .basic-header-left {
        width: 15%;
        float: left;
    }

    .basic-header-divider {
        width: 70%;
        float: left;
        height: 20px;
    }

    .basic-info {
        margin-top: 20px;
        width: 80%;
        margin-left: 3%;
    }

    .contact {
        width: 100%;
    }

    .contact-header {
        width: 100%;
        float: left;
        margin-bottom: 20px;
    }

    .contact-header-left {
        width: 15%;
        float: left;
    }

    .contact-header-divider {
        width: 70%;
        float: left;
        height: 20px;
    }

    .contact-info {
        width: 80%;
        margin-left: 3%;
    }
</style>

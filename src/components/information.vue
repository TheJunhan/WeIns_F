<template>
    <div class="extern">
        <el-card  shadow="hover">
            <div>
                <div class="basic">
                    <div class="basic-header">
                        <div class="basic-header-left">
                            基本信息
                        </div>
                        <div class="basic-header-divider">
                            <el-divider direction="horizontal"></el-divider>
                        </div>
                        <div class="basic-header-btn" v-if="basic_flag === true">
                            <el-button size="mini" type="plain" round @click="basic">保存</el-button>
                        </div>
                        <div class="basic-header-btn" v-else>
                            <el-button size="mini" type="plain" round @click="basic">编辑</el-button>
                        </div>
                    </div>

                    <div class="basic-info">
                        <el-form ref="form" :model="user" label-width="80px">
                            <el-form-item label="昵称">
                                <div v-if="basic_flag === true">
                                    <el-input v-model="user.name" size="mini"></el-input>
                                </div>
                                <div v-else>
                                    <span style="float: left" class="span-text">{{user.name}}</span>
                                </div>
                            </el-form-item>
                            <el-form-item label="性别">
                                <div v-if="basic_flag === true">
                                    <el-input v-model="sexStr" size="mini"></el-input>
                                </div>
                                <div v-else>
                                    <span style="float: left" class="span-text">{{sex()}}</span>
                                </div>
                            </el-form-item>
                            <el-form-item label="年龄">
                                <div>
                                    <span style="float: left" class="span-text">{{age()}}</span>
                                </div>
                            </el-form-item>
                            <el-form-item label="生日">
                                <div v-if="basic_flag === true">
                                    <el-input v-model="user.birthday" size="mini"></el-input>
                                </div>
                                <div v-else>
                                    <span style="float: left" class="span-text">{{user.birthday}}</span>
                                </div>
                            </el-form-item>
                            <el-form-item label="注册时间">
                                <div v-if="basic_flag === true">
                                    <el-input v-model="user.reg_time" size="mini"></el-input>
                                </div>
                                <div v-else>
                                    <span style="float: left" class="span-text">{{user.reg_time}}</span>
                                </div>
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
                        <div class="contact-header-btn" v-if="contact_flag === true">
                            <el-button size="mini" type="plain" round @click="contact">保存</el-button>
                        </div>
                        <div class="contact-header-btn" v-else>
                            <el-button size="mini" type="plain" round @click="contact">编辑</el-button>
                        </div>
                    </div>

                    <div class="contact-info">
                        <el-form ref="form" :model="user" label-width="80px">
                            <el-form-item label="常用邮箱">
                                <div v-if="contact_flag === true">
                                    <el-input v-model="user.email" size="mini"></el-input>
                                </div>
                                <div v-else>
                                    <span style="float: left" class="span-text">{{user.email}}</span>
                                </div>
                            </el-form-item>
                            <el-form-item label="手机号码">
                                <div v-if="contact_flag === true">
                                    <el-input v-model="user.phone" size="mini"></el-input>
                                </div>
                                <div v-else>
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
    // import axios from 'axios';
    export default {
        data() {
            return {
                basic_flag: false,
                contact_flag: false,
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
            this.generator();
        },
        methods: {
            sex() {
                switch (this.user.sex) {
                    case "1":
                        return "男";
                    case "0":
                        return "女";
                    default:
                        return "未知";
                }
            },
            sexStrToNum(){
                if (this.sexStr === "男") {
                    this.user.sex = 1;
                    return;
                }

                if (this.sexStr === "女") {
                    this.user.sex = 0;
                    return;
                }

                this.user.sex = -1;
            },
            age() {
                let date = new Date();
                let year = Number(this.user.birthday.substr(0, 4));
                return date.getFullYear() - year;
            },
            generator() {
                this.user.id = sessionStorage.getItem("id");
                this.user.name = sessionStorage.getItem("name");
                this.user.reg_time = sessionStorage.getItem("reg_time");
                this.user.phone = sessionStorage.getItem("phone");
                this.user.sex = sessionStorage.getItem("sex");
                this.user.birthday = sessionStorage.getItem("birthday");
                this.userMongo = JSON.parse(sessionStorage.getItem("userMongo"));
            },
            update() {
                let url = 'http://localhost:8088/user/update';
                this.sexStrToNum();
                let user = this.user;

                console.log(url);
                console.log(user);
                console.log(this.user);
                console.log(this.user.userMongo);

                // axios.post(url, user).then((response) =>{
                //     console.log(response);
                // }).catch(err=>{
                //     console.log(err);
                // });
            },
            basic() {
                if (this.basic_flag) {
                    this.basic_flag = false;
                    this.update();
                    this.$message.success('保存成功！');
                }

                else {
                    this.$message.success('启用编辑！');
                    this.basic_flag = true;
                }
            },
            contact() {
                if (this.contact_flag) {
                    this.contact_flag = false;
                    this.update();
                    this.$message.success('保存成功！');
                }

                else {
                    this.$message.success('启用编辑！');
                    this.contact_flag = true;
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

    .basic {
        width: 100%;
    }

    .basic-header {
        width: 100%;
    }

    .basic-header-left {
        width: 15%;
        float: left;
        margin-bottom: -10px;
    }

    .basic-header-divider {
        width: 70%;
        float: left;
        height: 20px;
        margin-bottom: -10px;
    }

    .basic-header-btn {
        width: 15%;
        float: left;
    }

    .basic-info {
        width: 80%;
        margin-left: 3%;
    }

    .contact {
        width: 100%;
    }

    .contact-header {
        width: 100%;
    }

    .contact-header-left {
        width: 15%;
        float: left;
        margin-bottom: -10px;
    }

    .contact-header-divider {
        width: 70%;
        float: left;
        height: 20px;
        margin-bottom: -10px;
    }

    .contact-header-btn {
        width: 15%;
        float: left;
    }

    .contact-info {
        width: 80%;
        margin-left: 3%;
    }
</style>

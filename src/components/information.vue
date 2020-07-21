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
                                    <el-input v-model="user.name" size="mini" style="width: 40%"
                                              @input="update"></el-input>
                                    <span style="color: red" v-show="this.errormessage.name.flag">{{this.errormessage.name.message}}</span>
                                </div>
                                <div v-else>
                                    <span style="float: left" class="span-text">{{user.name}}</span>
                                </div>
                            </el-form-item>
                            <el-form-item label="性别">
                                <div v-if="basic_flag === true">
                                    <el-dropdown style="margin-left: 10%">
                                        <span class="el-dropdown-link">
                                            {{sex()}}<i class="el-icon-arrow-down el-icon--right"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown" style="width: 100px;margin-left: 100px">
                                            <span v-on:click="()=>{this.user.sex='1'}"><el-dropdown-item>男</el-dropdown-item></span>
                                            <span v-on:click="()=>{this.user.sex='0'}"><el-dropdown-item>女</el-dropdown-item></span>
                                        </el-dropdown-menu>
                                    </el-dropdown>
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
                                    <el-date-picker
                                            v-model="birthright"
                                            type="date"
                                            size="middle"
                                            format="yyyy-MM-dd"
                                            placeholder="请选择生日"
                                            clear-icon="none"
                                            style="text-align: left"
                                    >
                                    </el-date-picker>
                                </div>
                                <div v-else>
                                    <span style="float: left" class="span-text">{{user.birthday}}</span>
                                </div>
                            </el-form-item>
                            <el-form-item label="注册时间">
                                <div>
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
    import axios from 'axios';

    export default {
        data() {
            return {
                basic_flag: false,
                contact_flag: false,
                birthright:"",
                sexStr: '未知',
                errormessage: {
                    name: {
                        message: "该用户重复或格式不正确",
                        flag: false
                    },
                    date: {
                        message: "该用户重复或格式不正确",
                        flag: false
                    },
                    ddd: {
                        message: "该用户重复或格式不正确",
                        flag: false
                    },
                },
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
                    case "-1":
                        return "未知";
                    default:
                        return "未知";
                }
            },
            sexStrToNum() {
                if (this.sexStr === "男") {
                    this.user.sex = "1";
                    return true;
                }

                if (this.sexStr === "女") {
                    this.user.sex = "0";
                    return true;
                }

                this.user.sex = "-1";
                return false
            },
            nonage(date) { // 判断是否满14周岁
                let curr = new Date();
                if((curr.getFullYear()-date.getFullYear()>14 )
                    || (curr.getFullYear() - date.getFullYear() === 14)
                    && (curr.getMonth() > date.getMonth()
                        || (curr.getMonth() === date.getMonth() && curr.getDate()>date.getDate())))
                    return true;
                else
                    return false;
            },
            birth_format(date) {
                let birth = date.getFullYear() + '-';
                if (date.getMonth() < 9)
                    birth += '0';
                let month=date.getMonth()+1;
                birth += (month+ '-');

                if (date.getDate() < 10)
                    birth += '0';

                return (birth + date.getDate());
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
                if (sessionStorage.getItem("birthday") == null) this.user.birthday = "2002-03-03"
                this.sexStr = this.sex();

            },
            sessionUpdate() {
                sessionStorage.setItem("name", this.user.name);
                sessionStorage.setItem("userMongo", JSON.stringify(this.user.userMongo))
                sessionStorage.setItem("sex", this.user.sex);
                sessionStorage.setItem("birthday", this.user.birthday);
                return true;
            },
            update() {
                if (this.birthright != "") {
                    let date = new Date(this.birthright);
                    if (this.nonage(date) === false) {
                        this.$message.error("生日不符合条件或未满18周岁");
                        return false;
                    }
                    this.birthright="";
                    this.basic_flag=false;
                    this.user.birthday = this.birth_format(date);
                }
                let url = 'http://localhost:8088/user/update';
                let user = this.user;
                console.log(user);

                axios.post(url, user).then((response) => {
                    if (response.data === "error") {
                        this.errormessage.name.flag = true;
                        // this.generator(); // 回溯
                    } else {
                        console.log(response.data)
                        this.errormessage.name.flag = false;
                        this.sessionUpdate();
                    }
                }).catch(err => {
                    console.log(err);
                });
                return this.axios.post(url).then(res => {
                    if (res == "success") return true;
                    else return false;
                })
            },
            basic() {
                if (this.basic_flag) {
                    if(this.birthright!="") {
                        this.update();
                    }
                    this.basic_flag = false;
                    this.update();
                    return false;
                } else {
                    this.$message.success('启用编辑！');
                    this.basic_flag = true;
                    return true;
                }
            },
            contact() {
                if (this.contact_flag) {
                    this.contact_flag = false;
                    this.update();
                    return false;
                } else {
                    this.$message.success('启用编辑！');
                    this.contact_flag = true;
                    return true;
                }
            },
            changename() {
                this.update();
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

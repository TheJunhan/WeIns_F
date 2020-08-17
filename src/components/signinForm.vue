<template>
    <div class="extern">
        <div class="login">
            <div class="tag">
                账号登录
            </div>
            <div style="width: 80%; text-align: center; margin-left: 10%">
                <el-menu mode="horizontal" default-active="1">
                    <el-menu-item class="menu" index="1" @click="handleSelect(1)">普通用户</el-menu-item>
                    <el-menu-item class="menu" index="2" @click="handleSelect(2)">管理员</el-menu-item>
                </el-menu>
            </div>
            <div class="form">
                <el-form ref="form" :model="form" @keyup.native.enter="onSubmit" label-width="11%">
                    <el-form-item props="phone">
                        <el-input id="signinForm_input_phone"  type="text" v-model="form.phone"  auto-complete="off" placeholder="请输入手机号码"/>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                                id="signinForm_input_password"
                                type="text" v-model="form.password" auto-complete="off"
                                placeholder="请输入账号密码" show-password/>
                    </el-form-item>
                </el-form>
            </div>

            <div class="pwd-mem">
                <div class="remember">
                    <el-checkbox v-model="checked">记住密码</el-checkbox>
                </div>

                <div class="forget">
                    <el-link href="">忘记密码</el-link>
                </div>
            </div>

            <div class="btn">
                <el-button id="signinForm_button_login" type="success" @click="onSubmit" size="medium" style="width: 80%">登录</el-button>
            </div>

            <div class="signup">
                <span>还没有WeIns账号？</span>
                <router-link to="/signup"><el-button id="signinForm_button_signup" type="text" @click="signup">立即注册>></el-button></router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                checked: false,
                isSubmit: false,
                login_path: 1,
                error_message:"",
                form: {
                    phone: '',
                    password: '',
                },
            }
        },
        created() {
            if (sessionStorage.getItem("pwd") !== null)
                this.form.password = sessionStorage.getItem("pwd");
        },
        methods: {
            handleSelect(index) {
                this.login_path = index;
            },
            onSubmit() {
                if (!this.isSubmit) {
                    let phone = this.form.phone;
                    if (phone.length === 0) {
                        this.error_message="电话号码不能为空!";
                        this.$message.error("电话号码不能为空!")
                        return false;
                    } else {
                        let format = /^(1[0-9]{10})$/;
                        if (!format.test(phone)) {
                            this.error_message="电话号码格式不正确!";
                            this.$message.error("电话号码格式不正确!")
                            return false;
                        }
                    }

                    let pwd = this.form.password;
                    if (pwd.length === 0) {
                        this.error_message="密码不能为空";

                        this.$message.error("密码不能为空") ;
                        return false;
                    } else if(pwd.length < 6 || pwd.length > 16) {
                        this.error_message="密码长度须在 6 到 16 个字符";

                        this.$message.error("密码长度须在 6 到 16 个字符");
                        return false;
                    }

                    this.isSubmit = true; // 防止恶意多次点击

                    let url = 'http://localhost:8088/user/login' +
                        '?ph=' + this.form.phone +
                        '&pwd=' + this.form.password;

                    axios.post(url).then((response) => {
                        let user = response.data;
                        console.log(user);
                        if (user.id >= 0) {
                            if (user.type < 0) {
                                this.$message.error("该账户已被封禁！");
                                this.isSubmit = false;
                            }

                            else if (user.type === 0 && this.login_path === 2) {
                                this.$message.info('普通用户请从普通用户通道登录！');
                                this.isSubmit = false;
                                return false;
                            }

                            else if (user.type > 0 && this.login_path === 1) {
                                this.$message.info('管理员用户请从管理员通道登录！');
                                this.isSubmit = false;
                                return false;
                            }

                            else {
                                this.$root.logged = true;
                                this.$root.parseAuth(user.type);

                                // 登录后这里存各种session的数据
                                sessionStorage.setItem("phone", user.phone);
                                sessionStorage.setItem("name", user.name);
                                sessionStorage.setItem("id", user.id);
                                sessionStorage.setItem("userMongo", JSON.stringify(user.userMongo));
                                sessionStorage.setItem("avatar", user.userMongo.avatar);
                                sessionStorage.setItem("type", user.type);
                                sessionStorage.setItem("sex", user.sex);
                                sessionStorage.setItem("birthday", user.birthday);
                                sessionStorage.setItem("reg_time", user.reg_time);
                                sessionStorage.setItem("token", user.password);

                                // 记住密码
                                if (this.checked) {
                                    sessionStorage.setItem("pwd", this.form.password);
                                }

                                if (user.type === 0) {
                                    this.error_message = '用户 ' + user.name + ' 登录成功！';
                                }

                                else if (user.type === 8) {
                                    this.error_message = '老板好！';
                                }

                                else {
                                    this.error_message = '管理员用户' + user.name + '登录成功';
                                }

                                this.$message.success(this.error_message);
                            }
                        }

                        else {
                            if (user.id === -1) {
                                this.error_message='此账户不存在！';
                                this.$message.error('此账户不存在！');
                            }

                            if (user.id === -2) {
                                this.error_message='密码错误，请重新输入！';
                                this.$message.error('密码错误，请重新输入！');
                            }

                            this.isSubmit = false;
                        }
                    })
                    // return this.axios.post(url).then(res=>{
                    //     return res === 'success';
                    // });
                }
                return false;
            },
            signup() {
                this.$router.push('/signup');
                return true;
            },
        }
    }
</script>

<style scoped>
    .extern {
        width: 100%;
    }

    .login {
        width: 100%;
        margin-top: 5%;
        background-color: white;
        border-radius: 2px;
        text-align: center;
    }

    .tag {
        font-size: 20px;
        font-weight: 600;
        padding-top: 20px;
        background-color: white;
    }


    .menu {
        width: 50%;
    }

    .form {
        width: 90%;
        margin-top: 5%;
    }

    .remember {
        margin-left: 10%;
        float: left;
    }

    .forget {
        margin-right: 10%;
        float: right;
    }

    .btn {
        padding-top: 20px;
    }

    .signup {
        color: #8B8B8B;
        font-size: 12px;
    }
</style>

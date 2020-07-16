<template>
    <div class="extern">
        <div class="login">
            <div class="tag">
                账号登录
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
                                  placeholder="请输入账户密码" show-password/>
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
                errmessage:"",
                form: {
                    phone: '',
                    password: '',
                },
                rules: {
                    phone: [
                        {
                            required: true, message: '电话号码不能为空', trigger: 'blur'
                        },{
                            min: 11, max: 11, message: '电话号码为11位数字'
                        }],
                    password: [
                        {
                            required: true, message: '密码不能为空', trigger: 'blur'
                        },{
                            min: 6, max: 16, message: '密码长度在 6 到 16 个字符', trigger: 'blur'
                        }],
                },
            }
        },
        methods: {
            onSubmit() {
                if (!this.isSubmit) {
                    this.isSubmit = true; // 防止恶意多次点击

                    let url = 'http://localhost:8088/user/login' +
                        '?ph=' + this.form.phone +
                        '&pwd=' + this.form.password;
                    console.log(url);
                    axios.post(url).then((response) => {
                        let user = response.data;
                        console.log(user);
                        if (user.id >= 0) {
                            this.$root.logged=true;
                            this.$root.is_superuser=(user.type==0 ? false : true);
                            sessionStorage.setItem("phone",user.phone);
                            sessionStorage.setItem("name",user.name);
                            sessionStorage.setItem("id",user.id);
                            // 登录后这里还要存各种session的数据
                            this.errmessage='用户 ' + user.name + ' 登录成功！';
                            this.$message.success(this.errmessage);
                            // TO DO
                            // return true;
                        }

                        else {
                            if (user.id === -1) {
                                this.errmessage='此账户不存在！';
                                this.$message.error('此账户不存在！');
                            }

                            if (user.id === -2) {
                                this.errmessage='密码错误，请重新输入！';
                                this.$message.error('密码错误，请重新输入！');
                            }

                            this.isSubmit = false;
                        }
                    });
                    // return this.axios.post(url).then(res=>{
                    //     if(res=='success') return true;
                    //     else return false;
                    // });
                }
                return false;
            },
            signup() {
                // this.$router.push('/signup');
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

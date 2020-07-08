<template>
    <div class="extern">
        <div class="login">
            <div class="tag">
                账号登录
            </div>
            <div class="form">
                <el-form ref="form" :model="form" @keyup.native.enter="onSubmit" label-width="11%">
                    <el-form-item props="phone">
                        <el-input type="text" v-model="form.phone" auto-complete="off"
                                  prefix-icon="el-icon-user"
                                  placeholder="请输入手机号码"/>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="text" v-model="form.password" auto-complete="off"
                                  prefix-icon="el-icon-key"
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
                <el-button type="success" @click="onSubmit" size="medium" style="width: 80%">登录</el-button>
            </div>

            <div class="signup">
                <span>还没有WeIns账号？</span>
                <el-button type="text" @click="signup">立即注册>></el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    phone: '',
                    password: '',
                    checked: false,
                    isSubmit: false,
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
                    this.$message.success("submit!")
                    this.isSubmit = true;
                }
            },
            signup() {
                this.$router.push('/signup');
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

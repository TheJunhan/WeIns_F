<template>
    <el-form :model="registerForm" class="registerRoot">
        <h3 class="registerTitle">注册</h3>
        <el-form-item prop="phone">
            <el-input type="text" v-model="registerForm.phone" auto-complete="off"
                      placeholder="请输入手机号码"/>
        </el-form-item>
        <el-form-item prop="name">
            <el-input type="text" v-model="registerForm.name" auto-complete="off"
                      placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item >
            <el-date-picker
                    v-model="registerForm.birthday"
                    type="date"
                    size="middle"
                    format="yyyy-MM-dd"
                    placeholder="请选择生日"
                    clear-icon="none"
                    style="text-align: left"
            >
            </el-date-picker>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="text" v-model="registerForm.password" auto-complete="off"
                      placeholder="请输入密码" show-password/>
        </el-form-item>
        <el-button type="primary" style="width: 100%" @click="register">注册</el-button>
    </el-form>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                errMessage : '',
                registerForm: {
                    phone    : '',
                    name     : '',
                    password : '',
                    birthday : '',
                    avatar: 'http://bpic.588ku.com/element_pic/01/55/09/6357474dbf2409c.jpg',
                }
            }
        },
        methods: {
            nonage(date) { // 判断是否满14周岁
                let curr = new Date();
                return (curr.getFullYear() - date.getFullYear() > 14)
                    || (curr.getFullYear() - date.getFullYear() === 14)
                    && (curr.getMonth() > date.getMonth()
                        || (curr.getMonth() === date.getMonth() && curr.getDate() > date.getDate()));
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
            register() {
                let form = this.registerForm;
                let phone = form.phone;
                if (phone.length === 0) {
                    this.errMessage = "电话号码不能为空!";
                    this.$message.error("电话号码不能为空!")
                    return false;
                }

                else {
                    let format = /^(1[0-9]{10})$/;
                    if (!format.test(phone)) {
                        this.errMessage = "电话号码格式不正确!";
                        this.$message.error("电话号码格式不正确!")
                        return false;
                    }
                }

                let name = form.name;
                if (name.length === 0) {
                    this.errMessage = "用户名不能为空!";
                    this.$message.error("用户名不能为空!")
                    return false;
                }

                else if (name.length < 3 || name.length > 12) {
                    this.errMessage = "用户名长度须在 3 到 12 个字符!";
                    this.$message.error("用户名长度须在 3 到 12 个字符!")
                    return false;
                }

                let pwd = form.password;
                if (pwd.length === 0) {
                    this.errMessage = "密码不能为空";
                    this.$message.error("密码不能为空") ;
                    return false;
                } else if(pwd.length < 6 || pwd.length > 16) {
                    this.errMessage = "密码长度须在 6 到 16 个字符";
                    this.$message.error("密码长度须在 6 到 16 个字符");
                    return false;
                }

                let date = new Date(form.birthday);
                if (this.nonage(date) === false) {
                    this.errMessage   = "未满14周岁不能注册账户！";
                    this.$message.error("未满14周岁不能注册账户！");
                    return false;
                }
                form.birthday = this.birth_format(date);

                let url = 'http://localhost:8088/user/register';
                axios.post(url, form).then(res =>{
                    switch (res.data) {
                        case "phone error":
                            this.$message.error("这个手机号已注册过啦！");
                            break;
                        case "name error":
                            this.$message.error("这个名字已经有人用过啦！");
                            break;
                        case "success":
                            this.errMessage = "注册成功！";
                            this.$message.success("注册成功！");
                            this.$router.push('/home');
                            break;
                        default:
                            break;
                    }
                }).catch(err => {
                    console.log(err);
                });

                this.errMessage = "bad";
                return this.axios.post(url).then(res=>{
                    return res === 'success';
                });

            }
        }
    }
</script>

<style scoped>
    .registerRoot {
        width: 220px;
        height: 360px;
        border-radius: 15px;
        background-clip: padding-box;
        margin: auto auto;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #c6c6c6;
    }
    .registerTitle {
        margin: 15px auto 20px auto;
        text-align: center;
        color: #505050;
    }
</style>


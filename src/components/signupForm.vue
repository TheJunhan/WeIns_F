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
                    style="text-align: left">
            </el-date-picker>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="text" v-model="registerForm.password" auto-complete="off"
                      placeholder="请输入密码" show-password/>
        </el-form-item>
        <el-button type="primary" style="width: 100%" @click="registerCheck">注册</el-button>

        <el-dialog
                :visible.sync="dialogVisible"
                width="50%" :show-close="false"
                title="请选择 3 个您最感兴趣的话题">
            <el-tag v-for="tag in tags" :key="tag.id" @click="SelectTag(tag)" style="margin-left: 5px">
                {{ tag.content }}
            </el-tag>

            <div slot="default" v-if="registerForm.interests.length > 0" style="margin-top: 30px">
                <span style="font-size: 16px; color: #111111">已选择 {{ registerForm.interests.length }} 个话题:</span>
                <el-tag v-for="(tag, i) in chosen" :key="tag.id" closable @close="CloseTag(i)" style="margin-left: 5px">
                    {{ tag.content }}
                </el-tag>
            </div>

            <div slot="footer">
                <span v-if="registerForm.interests.length === 0" style="font-size: 12px; color: rgba(255, 0, 0, 0.8)">
                    还未选择感兴趣的话题，是否依然提交？
                </span>
            </div>

            <div slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="register">确认提交</el-button>
            </div>
        </el-dialog>
    </el-form>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                errMessage : '',
                dialogVisible: false,
                chosen: [],
                registerForm: {
                    phone    : '',
                    name     : '',
                    password : '',
                    birthday : '',
                    avatar: 'http://bpic.588ku.com/element_pic/01/55/09/6357474dbf2409c.jpg',
                    interests: [],
                },
                tags: [ // 基本固定的几个话题，实际要从数据库中取，我们规定label库中的前十个即这几个
                    {id: 1, content: "科技"},
                    {id: 2, content: "教育"},
                    {id: 3, content: "生活"},
                    {id: 4, content: "娱乐"},
                    {id: 5, content: "军事"},
                    {id: 6, content: "动漫"},
                    {id: 7, content: "美妆"},
                    {id: 8, content: "科幻"},
                    {id: 9, content: "IT"},
                    {id: 10, content: "历史"}
                ]
            }
        },
        created() {
            this.getTopics();
        },
        methods: {
            getTopics() {
                let url = 'http://localhost:8088/blog/getLabels';
                axios.get(url).then(res => {
                    this.tags = [];
                    for (let i = 0; i < 10; ++i)
                        this.tags.push(res.data[i]);
                }).catch(err => {
                    console.log(err);
                });
            },
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
            SelectTag(tag) {
                if (this.registerForm.interests.length === 3) {
                    this.$message.error("最多只能选择3个话题噢！");
                    return false;
                }

                for (let i = 0; i < this.registerForm.interests.length; ++i) {
                    if (this.registerForm.interests[i] === tag.id) {
                        this.$message.error("这个话题已经选择过了噢！");
                        return false;
                    }
                }

                this.chosen.push(tag);
                this.registerForm.interests.push(tag.id);
                return true;
            },
            CloseTag(i) {
                this.chosen.splice(i, 1);
                this.registerForm.interests.splice(i, 1);
                return true;
            },
            registerCheck() {
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

                this.registerForm.birthday = this.birth_format(date);
                this.dialogVisible = true;
                return true;
            },
            register() {
                if (this.registerForm.interests.length === 0) {
                    this.$message.error("至少要选择一个话题噢！");
                    return false;
                }

                this.dialogVisible = false;
                let form = this.registerForm;
                let url = 'http://localhost:8088/user/register';
                axios.post(url, form).then(res => {
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

                this.errMessage = 'bad';
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


<template>
    <div class="extern">
        <el-card shadow="hover" style="background-color: #f2f2f5;">
            <div class="card">
                <div class="avatar">
                    <el-avatar :size="50" :src="userMongo.avatar"></el-avatar>
                </div>
                <div class="content" style="border-left:1px solid lightgray;text-align: center">
                    <div class="tex">
                        <p class="tex" style="text-align: left; margin-left: 10%; margin-bottom: 5%;color: #ec2025">{{name}}</p>
                    </div>
                    <div>
                        <p class="tex" style="text-align: left; margin-left: 10%; margin-bottom: 5%">已关注√</p>
                    </div>
                    <div class="buttons">
                        <el-button type="text" @click="un_follow">取消关注</el-button>
                        <el-button type="text" @click="home" style="float: right">去他/她的主页>></el-button>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "following",
        props: {
            uid: Number
        },
        data(){
            return{
                id: 0,
                name: 'weins',
                userMongo: {
                    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                }
            }
        },
        created() {
            this.id = this.$props.uid;
            let url = 'http://localhost:8088/user/getPlainOne?id=' + this.id;

            axios.get(url, {
                headers: {
                    token: sessionStorage.getItem("token")
                }
            }).then((response) =>{
                this.name = response.data.name;
                this.userMongo = response.data.userMongo;
            }).catch(err=> {
                console.log(err);
            });
        },
        methods: {
            un_follow() {
                let url = 'http://localhost:8088/user/follow?' +
                    'sub=' + sessionStorage.getItem("id") +
                    '&obj=' + this.id +
                    '&flag=-1';

                axios.post(url, {}, {
                    headers: {
                        token: sessionStorage.getItem("token")
                    }
                }).then((response) => {
                   if (response.data === 'success')
                       this.$message.success('取关 ' + this.name + ' 成功！');
                }).catch(err=> {
                    console.log(err);
                });
            },
            home() {
                // TO DO
                this.$message.success("导航到 " + this.name + "的主页");

                this.$router.push({
                    path: '/visit',
                    query: {
                        id: this.id
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .extern {
        width: 40%;
    }

    .avatar {
        margin-top: 8%;
        width: 20%;
        float: left;
    }

    .content {
        width: 68%;
        float: left;
        margin-left: 5%;
        margin-bottom: 5%;
    }
</style>

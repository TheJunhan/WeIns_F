<template>
    <div class="extern">
        <el-card  shadow="hover">
            <div class="card">
                <div class="cube" style="border-right:1px solid darkgray;text-align: center" @click="following">
                    <el-button class="but" type="text" > {{user.userMongo.following}}</el-button>
                    <div class="con" >关注</div>
                </div>
                <div class="cube" style="border-right:1px solid darkgray;text-align: center" @click="follower">
                    <el-button class="but" type="text"> {{user.userMongo.follower}}</el-button>
                    <div class="con">粉丝</div>
                </div>
                <div class="cube" style="text-align: center" @click="blogs">
                    <el-button class="but" type="text" > {{user.userMongo.blogs}}</el-button>
                    <div class="con">动态</div>
                </div>
            </div>
        </el-card>
    </div>

</template>

<script>
    import axios from "axios";
    export default {
        data() {
            return{
                // counter:{
                //     following: 12,
                //     follower: 99,
                //     blogs: 23
                // }
                user: {
                    id:0,
                    name: '交通大学',
                    birthday: '1896-04-07',
                    sex: 1,
                    reg_time: '2020-07-09',
                    age: 19,
                    email: 'se128@sjtu.edu.cn',
                    phone: '021-34200000',
                    userMongo:{
                        avatar:'',
                        following: 12,
                        follower: 99,
                        blogs: 23
                    }
                }
            }
        },
        mounted(){
            this.getinfo();
        },
        methods:{
            following() {
                this.$message.success(this.counter.following + '关注！');
            },
            follower() {
                this.$message.success(this.counter.follower + '粉丝！');
            },
            blogs() {
                this.$message.success(this.counter.blogs + '动态！');
            },
            getinfo(){
                let url = 'http://localhost:8088/user/getOne';
                let id=sessionStorage.getItem("id");
                const data = {
                    params: {id}
                }

                axios.get(url,data).then((response) => {
                    this.user= response.data;
                }).catch(err=>{
                    console.log(err);
                });
            }
        }
    }
</script>

<style scoped>
    .extern {
        width: 100%;
        flex-direction: column;
    }
    .card {
        width: 100%;
        display: flex;
        background-color: white;
    }

    .cube {
        width: 33%;
        float: left;
        flex-direction: row;

    }

    .con {
        color: darkgray;

    }
    /*.but{*/
    /*    !*opacity: 0;*!*/
    /*    !*display: block;*!*/
    /*}*/
    .cube:hover .but{
        color: rebeccapurple;
    }
</style>

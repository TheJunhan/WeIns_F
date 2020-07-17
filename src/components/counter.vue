<template>
    <div class="extern">
        <el-card  shadow="hover">
            <div class="card">
                <div class="cube" style="border-right:1px solid darkgray;text-align: center" @click="following">
                    <el-button class="but" type="text" > {{counter.following}}</el-button>
                    <div class="con" >关注</div>
                </div>
                <div class="cube" style="border-right:1px solid darkgray;text-align: center" @click="follower">
                    <el-button class="but" type="text"> {{counter.follower}}</el-button>
                    <div class="con">粉丝</div>
                </div>
                <div class="cube" style="text-align: center" @click="blogs">
                    <el-button class="but" type="text" > {{counter.blogs}}</el-button>
                    <div class="con">动态</div>
                </div>
            </div>
        </el-card>
    </div>

</template>

<script>
    export default {
        data() {
            return{
                counter:{
                    following: 12,
                    follower: 99,
                    blogs: 23
                }
            }
        },
        created() {
            this.generator();
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
            generator() {
                let userMongo = JSON.parse(sessionStorage.getItem("userMongo"));
                this.counter.following = userMongo.following_num;
                this.counter.follower = userMongo.follower_num;
                this.counter.blogs = userMongo.blog_num;
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

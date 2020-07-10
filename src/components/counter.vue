<template>
    <el-card  shadow="hover">
        <div class="card">
            <div class="cube" style="border-right:1px solid darkgray;" @click="following">
                <el-button class="but" type="text" > {{counter.following}}</el-button>
                <div class="con" >关注</div>
            </div>
            <div class="cube" style="border-right:1px solid darkgray;" @click="follower">
                <el-button class="but" type="text"> {{counter.follower}}</el-button>
                <div class="con">粉丝</div>
            </div>
            <div class="cube" @click="blogs">
                <el-button class="but" type="text" > {{counter.blogs}}</el-button>
                <div class="con">动态</div>
            </div>
        </div>
    </el-card>
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
        methods:{
            following() {
                this.$message.success(this.counter.following + '关注！');
            },
            follower() {
                this.$message.success(this.counter.follower + '粉丝！');
            },
            blogs() {
                this.$message.success(this.counter.blogs + '动态！');
            }
        }
    }
</script>

<style scoped>
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

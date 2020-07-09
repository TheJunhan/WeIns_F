<template>

        <el-card  shadow="hover">
            <div class="totalcard">
                <div class="cube" style="border-right:1px solid darkgray;">
                    <el-button type="text"> {{counter.following}}</el-button>
                    <div class="con" >关注</div>
                </div>
                <!--            <div class="cube">-->
                <!--                <el-divider direction="vertical"></el-divider>-->
                <!--            </div>-->
                <div class="cube" style="border-right:1px solid darkgray;">
                    <el-button type="text"> {{counter.follower}}</el-button>
                    <div class="con">粉丝</div>
                </div>
                <!--            <div class="cube">-->
                <!--                <el-divider direction="vertical"></el-divider>-->
                <!--            </div>-->
                <div class="cube">
                    <el-button type="text" > {{counter.blogs}}</el-button>
                    <div class="con">动态</div>
                </div>
            </div>

        </el-card>


</template>

<script>
    export default {
        name: "counter",
        data()
        {
            return{
                counter:{
                    following:12,
                    follower:99,
                    blogs:23
                }
            }
        }
    }
</script>

<style scoped>
    .totalcard {
        width: 100%;
        display: flex;
        background-color: white;
    }
    .cube{
        width: 33%;
        float: left;
        flex-direction: row;

    }
    .con{
        color: darkgray;
    }
    /*.dd {*/
    /*    margin-top: 20%;*/
    /*    color: darkgray;*/
    /*    !*line-height: 50px;*!*/
    /*    font-size: 40px;*/
    /*    !*font-family: Arial, sans-serif;*!*/
    /*    !*float: left;*!*/
    /*}*/
</style>

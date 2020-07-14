<template>
    <el-card  shadow="hover">
        <div class="com">
            <div class="ava">
                <el-avatar class="comava" shape="square" :size="50" :src="comment.squareUrl"></el-avatar>
            </div>

            <div class="content">
                <div class="con">
                    <p class="content-text1">{{comment.name}} :</p>
                    <p class="content-text2">{{comment.text}}</p>
                </div>
                <div class="icons">
<!--                        <div class="icon1" >-->
<!--                            <p>{{comment.time}}</p>-->
<!--                        </div>-->
<!--                        <el-button class="re" type="text" icon="el-icon-chat-dot-round">回复</el-button>-->
<!--                        <el-button class="like" type="text" icon="el-icon-star-off">喜欢</el-button>-->
                    <el-row>
                        <el-col class="icon1" :span="8">
                            <p>{{comment.time}}</p>
                        </el-col>
                        <el-col class="icon2" :span="8">
                            <el-button type="text" class="re">回复</el-button>
                        </el-col>
                        <el-col class="icon2" :span="8">
                            <el-button class="like" type="text" icon="el-icon-star-off">喜欢</el-button>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="down">
                <el-dropdown trigger="click" style="outline: none">
                    <span
                            class="el-dropdown-link btn send time-send small-hand"
                            id="custom-sebd-btn"
                    ><i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>

                    <el-dropdown-menu slot="dropdown" style="width: 12%">

                        <el-dropdown-item class="menuitem">删除</el-dropdown-item>

                        <el-dropdown-item class="menuitem">设置为仅博主可见</el-dropdown-item>

                        <el-dropdown-item class="menuitem">设置为所有人可见</el-dropdown-item>

                        <el-dropdown-item class="menuitem" v-if="this.$route.params.is_superuser">删除</el-dropdown-item>

                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </el-card>

</template>

<script>
    export default {
        name: "comment",
    data () {
        return {
            comment:{
                squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
                name:"weinssssssssssssssssssssssssssssss",
                time: '2020-07-09 21:57',
                text:"好的!!!!!!!!!!!!!!!!!!!!!!!!！好的好的好的好的好的好的好的好的好你妹好你妹好你妹好你妹好你妹好你妹好你妹好你妹好你妹好你妹好你妹好你妹好你妹好你妹",
                nums:5
            }

        }
    }
    }
</script>

<style scoped>
    .ava{
        width: 15%;
    }
    .content{
        /*background-color: pink;*/
        width: 70%;
        float: left;
        margin-left: 5%;
    }
    .down{
        float: left;
        width: 10%;
    }
    .comava {
        float: left;
        margin-left: 3%;
        margin-bottom: 10%;
    }

    .con{
        clear: both;
      }
    .icons{
        clear: both;
        }
    .content-text1{
        /*background-color: darkgray;*/
        text-align: left;
        float: left;
        color: dodgerblue;
    }
    .content-text2{
        /*background-color: #c6c6c6;*/
        text-align: left;
        /*margin-left: 3%;*/
        float: left;
    }
    .icon1{
        text-align: left;
        float: left;
        margin-top:1.5%;
        color: darkgray;
       font-size: 15px;
    }
    .icon2{
        float: right;
        text-align: right;
    }
</style>

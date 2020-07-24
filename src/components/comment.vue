<template>
    <el-card class="com" shadow="hover">
        <div >
            <div class="ava">
                <el-avatar class="comava" shape="square" :size="50" :src="comment.squareUrl"></el-avatar>
            </div>

            <div class="content">
                <div class="con">
                    <p class="content-text1">{{comment.name}} :</p>
                    <p class="content-text2">{{comment.text}}</p>
                </div>
                <div class="icons">
                    <el-row>
                        <el-col class="icon1" :span="6">
                            <p>{{comment.time}}</p>
                        </el-col>
                        <el-col class="icon2" :span="6">
                            <el-button type="text" icon="el-icon-warning-outline">投诉</el-button>
                        </el-col>
                        <el-col class="icon2" :span="6">
                            <el-button type="text" icon="el-icon-chat-dot-square">回复</el-button>
                        </el-col>
                        <el-col class="icon2" :span="6">
                            <el-button type="text" icon="el-icon-star-off">喜欢</el-button>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div v-if="comment.flag === true" class="down">
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
            <div class="recomment" >
                    <div  class="con2" >
                        <ul >
                            <li  style="clear: both" v-for="recom in comment.arr" :key="recom.name">
                                <div class="re" >
                                    <div class="content-text4">
                                        <span style="color: dodgerblue">{{recom.name}}</span> : {{recom.con}}
                                    </div>
                                    <p class="content-text5">{{comment.time}}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <el-divider></el-divider>
                    <div class="morebutton" v-if="comment.morethan5==true">
                        <el-button type="text">查看更多回复>></el-button>
                    </div>
            </div>
        </div>
    </el-card>
</template>

<script>
    export default {
        props: {
            bid: Number,
            to_uid: Number,
            to_username: String
        },
        data () {
            return {
                comment:{
                    squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
                    name:"weins",
                    time: '2020-07-09 21:57',
                    text:"好的!!!!!!!!!!!!!!!!!!!!!!!!！好的好的好的好的好的好的好的好的好你妹好你妹好你妹好你妹好你妹好你妹好你妹好你妹好你妹好你妹好你妹好你妹好你妹好你妹",
                    flag:true,//是否是自己的评论
                    morethan5:true,//是否>五个
                    arr: [{name:"a",con:"hskjljd;rgresk,hfaluiehwlufhsdn,nkiulehliauhdcjasknaskd,nakhdualwihucxm,nufehaliueliafndskjnc,mxnzeu.fhsjd,nf,cmxjdalkdli",time: '2020-07-09 21:57'},{name:"wdada",con:"asdadadwdawadwd",time: '2020-07-09 21:57'},{name:"wad",con:"wdacfasfefe",time: '2020-07-09 21:57'},{name:"ef",con:"efegreghtgt",time: '2020-07-09 21:57'},{name:"rgr",con:"erggregrg",time: '2020-07-09 21:57'}],
                }

            }
        }
    }
</script>

<style scoped>
    .ava {
        width: 15%;
    }

    .content {
        width: 70%;
        float: left;
        margin-left: 5%;
    }

    .down {
        float: left;
        width: 10%;
    }

    .comava {
        float: left;
        margin-left: 3%;
        margin-bottom: 10%;
    }

    .con {
        clear: both;
    }

    .con2 {
        margin-bottom: 5%;
     }

    .icons {
        clear: both;
    }

    .content-text1 {
        text-align: left;
        float: left;
        color: dodgerblue;
    }

    .content-text2 {
        text-align: left;
        float: left;
    }

    .icon1 {
        text-align: left;
        float: left;
        margin-top:1.5%;
        color: darkgray;
       font-size: 15px;
    }

    .icon2 {
        float: right;
        text-align: right;
    }

    .recomment {
        background-color: #eaeaec;
        margin-left: 11%;
        clear: both;
        width: 70%;
    }

    .content-text4 {
        /*width: 60%;*/
        /*background-color:white;*/
        word-break:break-all;
        float: left;
        display: flex;
    }

    .content-text4:hover {
        background-color: white;
    }

    .morebutton {
        float: right;
        clear: both;
       /*background-color: red;*/
    }

    .com {
        background-color: #f2f2f5;
    }

    .content-text5 {
        width: 20%;
        float: right;
        margin-top:1.5%;
        color: darkgray;
        font-size: small;
    }
</style>

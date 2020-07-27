<template>
    <div class="extern">
        <el-card  shadow="hover">
            <div class="card">
                <div class="cube" style="border-right:1px solid darkgray;text-align: center" @click="following">
                    <el-button class="but" type="text" > {{data.userMongo.following_num}}</el-button>
                    <div class="con" >关注</div>
                </div>
                <div class="cube" style="border-right:1px solid darkgray;text-align: center" @click="follower">
                    <el-button class="but" type="text"> {{data.userMongo.follower_num}}</el-button>
                    <div class="con">粉丝</div>
                </div>
                <div class="cube" style="text-align: center" @click="blogs">
                    <el-button class="but" type="text" > {{data.userMongo.blog_num}}</el-button>
                    <div class="con">动态</div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>

    export default {
        props: {
            data: Object
        },
        data() {
            return{
                following_num: 12,
                follower_num: 99,
                blog_num: 23
            }
        },
        created() {
            this.generator();
        },
        methods:{
            following() {
                this.$root.my_person_center_info = false;
                this.$root.my_person_center_blogs = false;
                this.$root.my_person_center_follower = false;
                this.$root.my_person_center_following = true;
                // this.$message.success(this.following_num + '关注！');
            },
            follower() {
                this.$root.my_person_center_info = false;
                this.$root.my_person_center_blogs = false;
                this.$root.my_person_center_follower = true;
                this.$root.my_person_center_following = false;
                // this.$message.success(this.follower_num + '粉丝！');
            },
            blogs() {
                this.$root.my_person_center_info = false;
                this.$root.my_person_center_blogs = true;
                this.$root.my_person_center_follower = false;
                this.$root.my_person_center_following = false;
                // this.$message.success(this.blog_num + '动态！');
            },
            generator() {
                // let userMongo = JSON.parse(sessionStorage.getItem("userMongo"));
                // this.following_num = userMongo.following_num;
                // this.follower_num = userMongo.follower_num;
                // this.blog_num = userMongo.blog_num;
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

    .cube:hover .but {
        color: rebeccapurple;
    }
</style>

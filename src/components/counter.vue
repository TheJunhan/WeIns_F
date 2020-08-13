<template>
    <div class="extern">
        <el-card  shadow="hover">
            <div class="card">
                <div class="cube" style="border-right:1px solid darkgray;text-align: center" @click="following">
                    <el-button class="but" type="text" > {{following_num}}</el-button>
                    <div class="con" >关注</div>
                </div>
                <div class="cube" style="border-right:1px solid darkgray;text-align: center" @click="follower">
                    <el-button class="but" type="text"> {{follower_num}}</el-button>
                    <div class="con">粉丝</div>
                </div>
                <div class="cube" style="text-align: center" @click="blogs">
                    <el-button class="but" type="text" > {{blog_num}}</el-button>
                    <div class="con">动态</div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        props: {
            following_num: Number,
            follower_num: Number,
            blog_num: Number
        },
        methods: {
            following() {
                this.$root.my_person_center_info = false;
                this.$root.my_person_center_blogs = false;
                this.$root.my_person_center_follower = false;
                this.$root.my_person_center_following = true;
            },
            follower() {
                this.$root.my_person_center_info = false;
                this.$root.my_person_center_blogs = false;
                this.$root.my_person_center_follower = true;
                this.$root.my_person_center_following = false;
            },
            blogs() {
                this.$root.my_person_center_info = false;
                this.$root.my_person_center_blogs = true;
                this.$root.my_person_center_follower = false;
                this.$root.my_person_center_following = false;
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

    .cube:hover .but{
        color: rebeccapurple;
    }
</style>

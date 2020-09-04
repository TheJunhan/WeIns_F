<template>
    <div>
        <el-card  shadow="hover">
            <div class="card">
                <el-divider class="divider"></el-divider>
                <span class="gray-text">个人资料完成度</span>
                <el-progress :percentage=percentage></el-progress>
                <el-divider class="divider"></el-divider>
                <div class="btn">
                    <el-button type="text" @click="information">编辑个人资料>></el-button>
                </div>
            </div>
        </el-card>
    </div>

</template>

<script>
    export default {
        data(){
            return{
                percentage: 0
            }
        },
        created() {
            let total = 8.0;
            let count = 6;
            if (sessionStorage.getItem("sex") !== "-1")
                count++;

            if (sessionStorage.getItem("avatar") !== "http://bpic.588ku.com/element_pic/01/55/09/6357474dbf2409c.jpg")
                count++;

            this.percentage = (count / total) * 100;
        },
        methods: {
            information() {
                this.$root.my_person_center_info = true;
                this.$root.my_person_center_blogs = false;
                this.$root.my_person_center_follower = false;
                this.$root.my_person_center_following = false;
            }
        }
    }
</script>

<style scoped>
    .gray-text{
        color: darkgray;
    }
    .card {
        width: 100%;
    }
    .divider {
        margin-top: 5%;
    }
    .btn {
        margin-top: -15px;
        margin-bottom: -15px;
    }
</style>

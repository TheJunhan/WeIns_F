<template>
    <el-table
            :data="arr"
            stripe
            border
            width="100%">
        <el-table-column
                fixed
                prop="id"
                label="用户编号"
                width="50">
        </el-table-column>
        <el-table-column
                prop="name"
                label="姓名"
                width="100">
        </el-table-column>
        <el-table-column
                prop="birthday"
                label="生日"
                width="120">
        </el-table-column>
        <el-table-column
                prop="sex"
                label="性别"
                width="50">
        </el-table-column>
        <el-table-column
                prop="reg_time"
                label="注册时间"
                width="120">
        </el-table-column>
        <el-table-column
                prop="email"
                label="电子邮箱"
                width="150">
        </el-table-column>
        <el-table-column
                prop="phone"
                label="电话号码"
                width="120">
        </el-table-column>
        <el-table-column
                label="操作"
               width="100">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">操作</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>


<script>
    export default {
        name: "userTable",
        props :['user'],
        methods: {
            handleClick(row) {
                console.log(row);
            }
        },
        data(){
            return{
                arr:[]
            }
        },
        watch:{
            user(){
                this.arr = this.user;
            }
        },
        mounted(){
            this.arr = this.user;
            console.log("receive!");
            console.log(this.user);
        }
    }
</script>

<style scoped>

</style>

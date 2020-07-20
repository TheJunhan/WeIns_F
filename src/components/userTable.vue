<template>
    <el-table
            :data="arr"
            stripe
            border>
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
        methods: {
            handleClick(row) {
                console.log(row);
            }
        },
        data(){
            return{
                arr:[ {
                    id: 0,
                    name: '交通大学',
                    birthday: '1896-04-07',
                    sex: 1,
                    reg_time: '2020-07-01',
                    email: 'se128@sjtu.edu.cn',
                    phone: '021-34200000'
            },  {
                    id: 1,
                    name: '复旦大学',
                    birthday: '1844-04-07',
                    sex: 1,
                    reg_time: '2020-07-04',
                    email: 'se128@xxu.edu.cn',
                    phone: '021-34200000'
            },{
                    id: 2,
                    name: '清华大学',
                    birthday: '1823-04-07',
                    sex: 1,
                    reg_time: '2020-07-05',
                    email: 'se128@xxu.edu.cn',
                    phone: '021-34200000'
            },{
                    id: 3,
                    name: '北京大学',
                    birthday: '1823-04-07',
                    sex: 1,
                    reg_time: '2020-07-05',
                    email: 'se128@xxu.edu.cn',
                    phone: '021-34200000'
                },{
                    id: 4,
                    name: 'aa大学',
                    birthday: '1823-04-07',
                    sex: 1,
                    reg_time: '2020-07-05',
                    email: 'se128@xxu.edu.cn',
                    phone: '021-34200000'
                },{
                    id: 5,
                    name: 'bb大学',
                    birthday: '1823-04-07',
                    sex: 1,
                    reg_time: '2020-07-05',
                    email: 'se128@xxu.edu.cn',
                    phone: '021-34200000'
                },{
                    id: 6,
                    name: 'cc大学',
                    birthday: '1823-04-07',
                    sex: 1,
                    reg_time: '2020-07-05',
                    email: 'se128@xxu.edu.cn',
                    phone: '021-34200000'
                }]
            }
        }
    }
</script>

<style scoped>

</style>

<template>
    <el-table
            id="el-table"
            :data="arr"
            :key="random"
            :row-class-name="rowClassNameFilter"
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
                prop="Type"
                label="权限"
                width="80">
        </el-table-column>
        <el-table-column
                prop="birthday"
                label="生日"
                width="100">
        </el-table-column>
        <el-table-column
                prop="sex"
                label="性别"
                column-key="sex"
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
                width="50">
        </el-table-column>
        <el-table-column
                prop="phone"
                label="电话号码"
                width="120">
        </el-table-column>
        <el-table-column
                label="操作"
               width="150">
            <template slot-scope="scope" style="text-align: center;">
                <el-button @click="handleClick(scope.row,scope.row.type-8)" type="danger" size="small">封禁</el-button>
                <el-button @click="handleClick(scope.row,scope.row.type+8)" type="success" size="small">解封</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>


<script>
    import axios from "axios";

    export default {
        name: "userTable",
        props :['user'],
        methods: {
            handleClick(row,tar) {
                console.log(row);
                const url='http://localhost:8088/user/auth?sub='+sessionStorage.getItem('id')
                            +'&obj='+row.id+'&tar='+tar;

                axios.post(url, {}, {
                    headers: {
                        token: sessionStorage.getItem("token")
                    }
                }).then((response) => {
                    if(response.data === 'success'){
                        for(let i=0;i<this.arr.length;++i){
                            if(this.arr[i].id === row.id){
                                this.arr[i].type=tar;
                                this.arr[i].Type=tar<0 ? '被封禁' : (tar === 0 ?'普通用户' : '管理员：'+tar);
                                this.random=Math.random();
                                this.$message.success(response.data)
                                return;
                            }
                        }

                    }
                    else this.$message.warning(response.data);

                })
            },
            rowClassNameFilter({row,rowIndex}){
                console.log(rowIndex);
                if(row.Type==='老板'){
                    return 'green-green-row'
                }else
                if(row.Type.indexOf('管理员') !== -1){
                    return 'green-row'
                }else if(row.Type==='普通用户'){
                    return 'white-row'
                }else{
                    return 'red-row'
                }
            }
        },
        data(){
            return{
                arr:[],
                random:0
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

<style >
    .el-table .green-green-row {
        background: rgba(0,255,0,0.5);
    }

    .el-table .red-row{
        background: rgba(255,0,0,0.1);
    }

    .el-table .green-row {
        background: rgba(0,255,0,0.1);
    }

    .el-table .white-row {
        background: rgba(255,255,255,0.1);
    }
</style>

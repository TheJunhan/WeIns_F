<template>
    <div style="width: 100%">
        <div style="float: left; width: 810px">
            <el-table
                    id="el-table"
                    :data="show"
                    :key="random"
                    :row-class-name="rowClassNameFilter"
                    width="100%">
                <el-table-column
                        fixed
                        prop="id"
                        label="编号"
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
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="性别"
                        column-key="sex"
                        width="60">
                </el-table-column>
                <el-table-column
                        prop="reg_time"
                        label="注册时间"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="电话号码"
                        width="120">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="120">
                    <template slot-scope="scope" style="text-align: center;">
                        <div v-if="scope.row.id === 1">
                            <el-button type="primary" disabled size="small">老板</el-button>
                        </div>
                        <div v-else-if="scope.row.Type !== '被封禁'">
                            <el-button @click="handleClick(scope.row,scope.row.type-8)" type="danger" size="small">封禁</el-button>
                        </div>
                        <div v-else>
                            <el-button @click="handleClick(scope.row,scope.row.type+8)" type="success" size="small">解封</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="search" style="height: 450px; float: left; margin-left: 50px;">
            <div style="float: none">
                <el-input
                        placeholder="输入条件"
                        v-model="input"
                        style="width: 50%; float: left; margin-bottom: 5%; margin-right: 2%"
                        @keyup.native.enter="search(1)">
                </el-input>
                <div style="float: left">
                    <el-button type="primary" @click="search(1)">搜索</el-button>
                    <el-button v-if="search_flag === true" type="danger" @click="search(0)">取消</el-button>
                </div>
            </div>

            <div class="select">
                <p style="clear: both; color: darkgray; margin-bottom: 5%">选择条件：</p>
                <el-radio-group v-model="radio" style="float: left;margin-bottom: 5%" @change="change">
                    <el-radio-button label="编号"></el-radio-button>
                    <el-radio-button label="姓名"></el-radio-button>
                    <el-radio-button label="权限"></el-radio-button>
                    <el-radio-button label="电话号码"></el-radio-button>
                </el-radio-group>
            </div>

            <div class="details">
                <span style="clear: both; color: darkgray; margin-bottom: 5%">
                    详细信息：
                    <el-popover
                            placement="top-start"
                            title="权限规则"
                            width="200"
                            trigger="hover"
                            content="1/3/5/7: 评论管理员; 2/3/6/7: 动态管理员; 4/5/6/7: 用户管理员;">
                        <el-button slot="reference" type="text" icon="el-icon-question"></el-button>
                    </el-popover>
                </span>

                <el-card shadow="hover" style="width: 55%">
                    <p>当前管理员ID : <span style="color: red">{{this.id}}</span> </p>
                    <el-divider></el-divider>
                    <p>搜索结果共计 <span style="color:red">{{this.show.length}}</span> 条记录</p>
                </el-card>
            </div>
        </div>
    </div>
</template>


<script>
    import axios from "axios";

    export default {
        data() {
            return {
                random: 0,
                id: 1,
                input: '',
                radio: '姓名',
                search_flag: '',
                users: [],
                show: []
            }
        },
        created() {
            this.id = sessionStorage.getItem("id");
            this.init();
        },
        methods: {
            init(){
                let url = 'http://localhost:8088/user/getAll';
                axios.get(url, {
                    headers: {
                        token: sessionStorage.getItem("token")
                    }
                }).then(res => {
                        console.log(res.data);
                        this.users = res.data;
                        for (let i = 0; i < this.users.length; i++) {
                            if (this.users[i].type < 0)
                                this.users[i].Type = '被封禁';
                            else if (this.users[i].type === 0)
                                this.users[i].Type = '普通用户';
                            else if (this.users[i].type === 8)
                                this.users[i].Type = '老板';
                            else
                                this.users[i].Type = '管理员:' + this.users[i].type;

                            if (this.users[i].sex === -1)
                                this.users[i].sex='未知';
                            else if (this.users[i].sex === 1)
                                this.users[i].sex='男';
                            else
                                this.users[i].sex='女';
                        }

                        this.show = this.users;
                    }
                ).catch(err => {
                    console.log(err);
                });
            },
            search(i) {
                if(this.input === '' || i === 0) {
                    this.search_flag = false;
                    this.input = '';
                    return this.init();
                }

                this.search_flag = true;

                let newArr = [];
                this.$message.success(this.radio);
                for (let i = 0; i < this.users.length; ++i) {
                    switch (this.radio) {
                        case "姓名":
                            if (this.users[i].name.indexOf(this.input) !== -1)
                                newArr.push(this.users[i]);
                            break;
                        case "编号":
                            if (this.users[i].id === Number(this.input))
                                newArr.push(this.users[i]);
                            break;
                        case "权限":
                            if (this.users[i].Type.indexOf(this.input) !== -1)
                                newArr.push(this.users[i]);
                            break;
                        case "电话号码":
                            if (this.users[i].phone.indexOf(this.input) !== -1)
                                newArr.push(this.users[i]);
                            break;
                        default:
                            break;
                    }
                }
                this.show = newArr;
            },
            change(item) {
                this.radio = item;
            },
            handleClick(row, tar) {
                let url='http://localhost:8088/user/auth?sub=' + sessionStorage.getItem('id')
                            +'&obj=' + row.id + '&tar=' + tar;

                axios.post(url, {}, {
                    headers: {
                        token: sessionStorage.getItem("token")
                    }
                }).then(res => {
                    if(res.data === 'success'){
                        for (let i = 0; i < this.users.length; ++i){
                            if (this.users[i].id === row.id) {
                                this.users[i].type = tar;
                                this.users[i].Type = (tar < 0) ? '被封禁' : ((tar === 0) ? '普通用户' : ('管理员:' + tar));
                                this.random=Math.random();
                                this.$message.success(res.data)
                                return true;
                            }
                        }

                        this.show = this.users;
                    }
                    else {
                        this.$message.warning(res.data);
                        return false;
                    }
                })
            },
            // eslint-disable-next-line no-unused-vars
            rowClassNameFilter({row, rowIndex}) {
                if (row.Type === '老板' || row.Type.indexOf('管理员') !== -1)
                    return 'green-row';
                else if (row.Type==='普通用户')
                    return 'white-row';
                else
                    return 'red-row';
            }
        }
    }
</script>

<style >
    .el-table .red-row {
        background: rgba(255, 0, 0, 0.1);
    }

    .el-table .green-row {
        background: rgba(0, 255, 0, 0.1);
    }

    .el-table .white-row {
        background: rgba(253, 245, 230, 0.5);
    }
</style>

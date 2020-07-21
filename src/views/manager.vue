<template>
    <div class="extern">
        <el-header>
            <Header></Header>
        </el-header>
        <div class="content" style="clear: both;display: flex;margin-left: 10%;width: 100%">
            <div style="float: left;width: 810px">
                <user-table :user="users"></user-table>
            </div>
            <div class="search" style="float: left;width: 40%;margin-left: 100px;">
                <el-input
                        placeholder="按照条件搜索……"
                        v-model="input"
                        style="width: 55%;float: left;margin-bottom: 5%">
                </el-input>
                <p style="clear:both;color: darkgray;margin-bottom: 5%">选择条件：</p>
                <el-radio-group v-model="radio"  style="float: left;margin-bottom: 5%">
                    <el-radio-button label="编号"></el-radio-button>
                    <el-radio-button label="姓名"></el-radio-button>
                    <el-radio-button label="电话号码"></el-radio-button>
                    <el-radio-button label="电子邮箱"></el-radio-button>
                </el-radio-group>
                <p style="clear:both;color: darkgray;margin-bottom: 5%">详细信息：</p>
                <el-card shadow="hover" style="width: 55%">
                    <p>管理员 : <span style="color: red">{{this.managerid}}</span> </p>
                    <el-divider></el-divider>
                    <p>搜索结果共计  <span style="color:red">{{this.nums}}</span>  条记录</p>
                    <el-divider></el-divider>
                    <p>已对  <span style="color:red">{{this.operations}}</span>  个用户进行操作</p>
                </el-card>
            </div>
        </div>

        <el-footer>
            <Footer style="margin-top: 2%"></Footer>
        </el-footer>
    </div>
</template>

<script>
    import Header from "../components/topnav";
    import Footer from "../components/footer";
    import userTable from "../components/userTable";

    export default {
        name: "manager",
        components: { Header, Footer, userTable},
        data(){
            return{
                managerid:1,
                input:'',
                radio:'姓名',
                nums:0,//记录符合条件的总数
                operations:0,//记录已经操作过的用户数量
                users:[{
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
                    phone: '033-34200000'
                },{
                    id: 7,
                    name: 'cc大学',
                    birthday: '1823-04-07',
                    sex: 1,
                    reg_time: '2020-07-05',
                    email: 'se128@xxu.edu.cn',
                    phone: '033-34200000'
                },{
                    id: 9,
                    name: 'cc大学',
                    birthday: '1823-04-07',
                    sex: 1,
                    reg_time: '2020-07-05',
                    email: 'se128@xxu.edu.cn',
                    phone: '033-34200000'
                },{
                    id: 8,
                    name: 'cc大学',
                    birthday: '1823-04-07',
                    sex: 1,
                    reg_time: '2020-07-05',
                    email: 'se128@xxu.edu.cn',
                    phone: '033-34200000'
                },{
                    id: 11,
                    name: 'cc大学',
                    birthday: '1823-04-07',
                    sex: 1,
                    reg_time: '2020-07-05',
                    email: 'se128@xxu.edu.cn',
                    phone: '033-34200000'
                }],
                originusers:[{
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
                    phone: '033-34200000'
                },{
                    id: 7,
                    name: 'cc大学',
                    birthday: '1823-04-07',
                    sex: 1,
                    reg_time: '2020-07-05',
                    email: 'se128@xxu.edu.cn',
                    phone: '033-34200000'
                },{
                    id: 9,
                    name: 'cc大学',
                    birthday: '1823-04-07',
                    sex: 1,
                    reg_time: '2020-07-05',
                    email: 'se128@xxu.edu.cn',
                    phone: '033-34200000'
                },{
                    id: 8,
                    name: 'cc大学',
                    birthday: '1823-04-07',
                    sex: 1,
                    reg_time: '2020-07-05',
                    email: 'se128@xxu.edu.cn',
                    phone: '033-34200000'
                },{
                    id: 11,
                    name: 'cc大学',
                    birthday: '1823-04-07',
                    sex: 1,
                    reg_time: '2020-07-05',
                    email: 'se128@xxu.edu.cn',
                    phone: '033-34200000'
                }],
            }
        },
        watch:{
            input(){
                this.search();
            }
        },
        methods:{
            search(){
                console.log("search for");
                console.log(this.input);
            }
        }
    }
</script>

<style scoped>
    .extern{
        background-color: #A7CFE8;
    }

</style>
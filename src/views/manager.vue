<template>
    <div >
        <div class="extern" >
            <el-header>
                <Header></Header>
            </el-header>
            <div class="content" style="clear: both;display: flex;margin-left: 10%;width: 100%">
                <div style="float: left;width: 810px">
                    <user-table :user="users"></user-table>
                </div>
                <div class="search" style="height: 800px;float: left;width: 40%;margin-left: 100px;">
                    <div style="float: none">
                        <el-input
                                placeholder="按照条件搜索……"
                                v-model="input"
                                style="width: 30%;float: left;margin-bottom: 5%;margin-right: 2%" >
                        </el-input>
                    </div>

                    <div>
                        <el-button style="float: left" type="primary" icon="search" @click="search">搜索</el-button>
                        <el-button style="float: left;left: 0" type="primary" icon="search" @click="search(0)">取消搜索</el-button>

                    </div>
                    <p style="clear:both;color: darkgray;margin-bottom: 5%">选择条件：</p>
                    <el-radio-group v-model="radio" style="float: left;margin-bottom: 5%" @change="change">
                        <el-radio-button label="编号"></el-radio-button>
                        <el-radio-button label="姓名"></el-radio-button>
                        <el-radio-button label="权限"></el-radio-button>
                        <el-radio-button label="电话号码"></el-radio-button>
                    </el-radio-group>
                    <p style="clear:both;color: darkgray;margin-bottom: 5%">详细信息：</p>
                    <el-card shadow="hover" style="width: 55%">
                        <p>管理员 : <span style="color: red">{{this.managerid}}</span> </p>
                        <el-divider></el-divider>
                        <p>搜索结果共计  <span style="color:red">{{this.users.length}}</span>  条记录</p>
                    </el-card>
                </div>
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
    import axios from "axios";

    export default {
        name: "manager",
        components: { Header, Footer, userTable},
        data(){
            return{
                managerid:1,
                input:'',
                radio:'姓名',
                users:[],
            }
        },

        methods:{
            search(i){
                if(this.input==''||i==0)  return this.init();
                var newA=new Array();
                for(let i=0;i<this.users.length;++i){
                    if(this.radio=='姓名'){
                        if(this.users[i].name.indexOf(this.input)!=-1) newA.push(this.users[i]);
                    }else  if(this.radio=='编号'){
                        if(this.users[i].id==this.input) newA.push(this.users[i]);
                    }else if(this.radio=='权限'){
                        if(this.users[i].Type.indexOf(this.input)!=-1) newA.push(this.users[i]);
                    }else  if(this.radio=='电话号码'){
                        if(this.users[i].phone.indexOf(this.input)!=-1) newA.push(this.users[i]);
                    }
                }
                this.users=newA;
            },
            change(item){
                this.radio=item;
            },
            init(){
                let url = 'http://localhost:8088/user/getAll'
                axios.get(url, {
                    headers: {
                        token: sessionStorage.getItem("token")
                    }
                }).then((response) => {
                        console.log(response);
                        this.users=response.data;
                        for(let i =0;i<this.users.length;i++){
                            if(this.users[i].type<0)  this.users[i].Type='被封禁';
                            else if(this.users[i].type==0) this.users[i].Type='普通用户';
                            else if(this.users[i].type==8) this.users[i].Type='老板';
                            else this.users[i].Type='管理员:'+this.users[i].type;
                            if(this.users[i].sex==-1) this.users[i].sex='未知';
                            else if (this.users[i].sex==1) this.users[i].sex='男';
                            else this.users[i].sex='女';
                        }
                    }
                )
            }
        },
        mounted(){
            this.managerid=sessionStorage.getItem('id');
            this.init();
        }
    }
</script>

<style scoped>
    .extern{
        background-color: #A7CFE8;
    }

</style>
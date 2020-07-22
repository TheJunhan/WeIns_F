<template>
    <div style="z-index: 100">
        <div class="container">
            <div class="logo">
                <img class="logo img" src='../assets/image/logo.png' alt="logo picture"/>
                <span class="tit">WeIns</span>
            </div>
            <div class="searchbar">
                <el-autocomplete
                        v-model="state"
                        :fetch-suggestions="querySearchAsync"
                        placeholder="请输入内容"
                        @select="handleSelect"
                        size="min"
                        style="width: 40%"
                ></el-autocomplete>
                <el-button type="primary" icon="el-icon-search" v-on:click="log(0)">搜索</el-button>
            </div>
            <div class="nav">


                <div class="el-dropdown-link">
                    <router-link to="/home">
                        <p class="el-dropdown-link can-point"><i class="el-icon-s-home el-icon--left"></i>首页</p>
                    </router-link>
                </div>
                <span class="dd">|</span>
                <router-link to="/manager" class="el-dropdown-link">
                    <p class="el-dropdown-link can-point" ><i class="el-icon-search el-icon--left"></i>发现</p>
                </router-link>
                <span class="dd" v-if="this.$root.logged === true">|</span>


                <div class="el-dropdown-link" v-if="this.$root.logged === true">
                    <el-dropdown>
                    <span class="el-dropdown-link">
                        我的<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                        <el-dropdown-menu slot="dropdown" style="width: 100px">
                            <router-link to="/person">
                                <span class="el-dropdown-link can-point" ><el-dropdown-item>个人信息</el-dropdown-item></span>
                            </router-link>
                            <router-link to="/person">
                                <span class="el-dropdown-link can-point" ><el-dropdown-item>我的足迹</el-dropdown-item></span>
                            </router-link>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>


                <span class="dd">|</span>
                <div class="el-dropdown-link">
                    <el-dropdown>
                        <p class="el-dropdown-link">
                            用户服务<i class="el-icon-arrow-down el-icon--right"></i>
                        </p>
                        <el-dropdown-menu slot="dropdown" style="width: 80px;font-size: 10px">
                            <p v-if="!this.$root.logged" style="width: 80px" v-on:click="log(0)"><el-dropdown-item >登陆</el-dropdown-item></p>
                            <p v-if="!this.$root.logged" style="width: 80px" v-on:click="log(1)"><el-dropdown-item>注册</el-dropdown-item></p>
                            <p v-if="this.$root.logged" style="width: 80px" v-on:click="log(2)"><el-dropdown-item>注销</el-dropdown-item></p>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>


            </div>
        </div>

        <el-dialog :visible.sync="dialogVisible" width="40%" :show-close="false">
            <Login></Login>
        </el-dialog>

    </div>
</template>

<script>
    import Login from "./signinForm";
    export default {
        components: { Login },
        data() {
            return {
                items: [],
                state: '',
                timeout: null,
                activeIndex: '1',
                activeIndex2: '1',
                showitems:[],
                dialogVisible: false,
                any: [{
                    value: 'huangjingao',
                    label: '黄金糕',
                }, {
                    value: 'shizitou',
                    label: '狮子头',
                }, {
                    value: 'luosifen',
                    label: '螺蛳粉',
                }]
            };
        },
        methods: {
            loadAll() {
                const url="https://localhost:8088/ddd"
                return this.axios.post(url).then(res=>{
                        if(res=='success'){
                            return true;
                        }
                        else return false;
                })

            },
            querySearchAsync(queryString,cbe) {

                let items = this.items;
                let results = queryString ? items.filter((state) => {
                    return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                }) : items;
                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(() => {
                        cbe(results);
                    }, 3000 * Math.random());

               return results;
            },

            handleSelect(item) {
                console.log(item);
                return item;
            },

            log(i) {
                if(i === 0){
                    this.dialogVisible = true;
                    return 0;
                }
                else if (i === 1) {
                    this.$router.push("/signup");
                    return 1;
                }
                else if(i === 2){
                    //注销
                    this.$root.logout();
                    this.$router.push("/home");
                    sessionStorage.clear();
                    this.$message.success("已注销");
                    return 2;
                }
                else return -1;
            },

        },
        mounted() {

            this.items=[{"value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号"},
            {"value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号"},
            {"value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113"},
            {"value": "泷千家(天山西路店)", "address": "天山西路438号"},
            {"value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"},
            {"value": "贡茶", "address": "上海市长宁区金钟路633号"},
            {"value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号"},
            {"value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号"}];
            this.loadAll();

        },
    }
</script>


<style scoped>
    .tit {
        height: 50px;
        font-size: 20px;
        color: coral;
        line-height: 50px;
        font-family: "Al Bayan",serif;
        width: 50%;
    }
    .container {
        width: 100%;
        float: left;
        background-color: antiquewhite;
        left: 0;
        right: 0;
        position: fixed;
        z-index: 999;
    }
    .logo {
        width: 10%;
        height: 10%;
        float: left;
        margin-left: 3%;
        padding: 0;
        text-align: center;
    }
    .logo .img {
        width: 50px;
    }
    body {
        margin: 0;
        padding: 0;
    }
    .searchbar {
        width: 35%;
        float: left;
        height: 50px;
        line-height: 50px;
        text-align: center;
    }
    el-autocomplete {
        width: 10%
    }
    .nav {
        width: 45%;
        float: left;
        text-align: center;
        height: 50px;
    }
    el-menu {
        height: 50px;
        background-color: antiquewhite;
    }
    .el-dropdown-link {
        font-size: 15px;
        line-height: 50px;
        height: 50px;
        width:100px;
        float: left;
    }
    .el-dropdown-link:hover {
        font-size: 17px;
    }
    .can-point {
        cursor: pointer;
    }
    .dd {
        line-height: 50px;
        font-size: 15px;
        font-family: Arial, sans-serif;
        float: left;
    }
</style>

<template>
    <div style="z-index: 100">
        <div class="container">
            <div class="logo">
                <img class="logo img" src='../assets/image/logo.png' alt="logo picture"/>
                <span class="tit">WeIns</span>
            </div>

            <div class="searchbar">
                <el-autocomplete
                        popper-class="my-autocomplete"
                        v-model="state"
                        :fetch-suggestions="querySearchAsync"
                        placeholder="请输入搜索内容"
                        @select="handleSelect"
                        style="width: 40%"
                        @keyup.native.enter="querySearchAsync">
                    <template slot-scope="{ item }">
                        <div v-if="item.type === '用户'">
                            <div class="name">{{ item.value }}</div>
                            <span class="underline">{{ item.type }}</span>
                        </div>
                        <div v-else>
                            <div class="topic">#{{ item.value }}#</div>
                            <span class="underline">{{ item.type }}</span>
                        </div>
                    </template>
                </el-autocomplete>
                <el-button type="primary" icon="el-icon-search" @click="querySearch">搜索</el-button>
            </div>

            <div class="nav">
                <div class="el-dropdown-link">
                    <router-link to="/home">
                        <p class="el-dropdown-link can-point"><i class="el-icon-s-home el-icon--left"></i>首页</p>
                    </router-link>
                </div>

                <span class="dd">|</span>
<!--                <router-link to="/manager" class="el-dropdown-link">-->
                    <p class="el-dropdown-link can-point" ><i class="el-icon-search el-icon--left"></i>发现</p>
<!--                </router-link>-->
                <span class="dd" v-if="this.$root.logged === true">|</span>

                <div class="el-dropdown-link" v-if="this.$root.logged === true">
                    <el-dropdown  trigger="click">
                    <span class="el-dropdown-link">
                        我的<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                        <el-dropdown-menu slot="dropdown" style="width: 100px">
                            <router-link to="/person">
                                <span class="el-dropdown-link can-point" id="person"><el-dropdown-item>个人中心</el-dropdown-item></span>
                            </router-link>
                            <router-link to="/manager" v-if="this.$root.auth_user_manager === true">
                                <span class="el-dropdown-link can-point" ><el-dropdown-item>用户管理</el-dropdown-item></span>
                            </router-link>
                            <router-link to="/person">
                                <span class="el-dropdown-link can-point" id="footprint"><el-dropdown-item>我的足迹</el-dropdown-item></span>
                            </router-link>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>

                <span class="dd">|</span>
                <div class="el-dropdown-link">
                    <el-dropdown trigger="click">
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

        <el-dialog :visible.sync="dialogVisible" width="40%" :show-close="false" v-if="this.$root.logged === false">
            <Login></Login>
        </el-dialog>

    </div>
</template>

<script>
    import Login from "./signinForm";
    import axios from  'axios';

    export default {
        components: { Login },
        data() {
            return {
                heat: [],
                items: [],
                state: '',
                timeout: null,
                activeIndex: '1',
                activeIndex2: '1',
                dialogVisible: false
            };
        },
        created() {
            // 候选项，如果未进行搜索则候选项为热搜榜，故这里拉取热搜榜
            this.heat = [
                {value: "三全鲜食（北新泾店）", type: '话题'},
                {value: "Hot honey 首尔炸鸡", type: '话题'},
                {value: "新旺角茶餐厅", type: '话题'},
                {value: "泷千家(天山西路店)", type: '话题'},
                {value: "胖仙女纸杯蛋糕", type: '话题'},
                {value: "贡茶", type: '话题'},
                {value: "豪大大香鸡排超级奶爸", type: '话题'},
                {value: "茶兰（奶茶，手抓饼）", type: '话题'}
                ];
            this.items = [
                {value: '瓦坎达Forever!', type: '话题', id: 1},
                {value: 'Trump:没有人比我更懂Web!', type: '话题', id: 2},
                {value: 'Donald Trump', type: '用户', id: 1},
                {value: '安倍晋三', type: '用户', id: 2}
            ];
        },
        methods: {
            querySearch() {
                if (this.state === '') {
                    this.$message.info('搜索内容为空!');
                    return false;
                }

                this.items = [];
                this.querySearchUser();
                this.querySearchLabel();

                console.log('items');
                console.log(this.items);
                return true;
            },
            querySearchUser() {
                let url = 'http://localhost:8088/user/getByFuzzyName?name=' + this.state;

                axios.get(url).then(res => {
                    let users = res.data;
                    for (let i = 0; i < users.length; ++i) {
                        let user = {
                            value: users[i].name,
                            type: '用户',
                            id: users[i].id
                        };
                        this.items.push(user);
                    }
                }).catch(err => {
                    console.log(err);
                });
            },
            querySearchLabel() {
                let url = 'http://localhost:8088/blog/findFuzzyLabels?lab=' + this.state;
                axios.get(url).then(res => {
                    let labels = res.data;
                    for (let i = 0; i < labels.length; ++i) {
                        let label = {
                            value: labels[i].content,
                            type: '话题',
                            id: labels[i].id
                        };
                        this.items.push(label);
                    }
                }).catch(err => {
                    console.log(err);
                });
            },
            querySearchAsync(queryStr, cbe) {
                let results = this.heat; // 默认为热搜榜
                if (queryStr) {
                    this.querySearch();
                    results = this.items;
                }

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => { cbe(results); }, 1000 * Math.random());
                return results;
            },
            handleSelect(item) {
                if (item.type === '用户') {
                    if (this.$root.logged === true &&
                        item.id === Number(sessionStorage.getItem("id"))) {
                        this.$router.push('/person');
                        return;
                    }

                    this.$router.push({
                        path: '/visit',
                        query: {
                            id: item.id
                        }
                    });
                }

                else { // TO DO: 显示话题
                    console.log(item);
                }

                return item;
            },
            log(i) {
                switch (i) {
                    case 0:
                        this.dialogVisible = true;
                        return 0;
                    case 1:
                        this.$router.push("/signup");
                        return 1;
                    case 2: //注销
                        this.$root.logout();
                        this.$router.push("/home");
                        sessionStorage.clear();
                        this.$message.success("已注销");
                        return 2;
                    default:
                        return -1;
                }
            }
        }
    }
</script>

<style scoped>
    .tit {
        height: 50px;
        font-size: 20px;
        color: coral;
        line-height: 50px;
        font-family: "Al Bayan", serif;
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
    .nav {
        width: 45%;
        float: left;
        text-align: center;
        height: 50px;
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

<style scoped>
    .my-autocomplete li {
        line-height: normal;
        padding: 7px;
    }
    .name {
        text-overflow: ellipsis;
        overflow: hidden;
        color: #67C667;
    }
    .topic {
        text-overflow: ellipsis;
        overflow: hidden;
        color: #EE731B;
    }
    .underline {
        margin-top: -5px;
        font-size: 12px;
        color: #b4b4b4;
    }
    .highlighted .addr {
        color: #ddd;
    }
</style>

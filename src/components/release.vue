<template>
    <div class="extern">
        <el-card class="release" shadow="hover">
            <div class="header">
                <div class="motto">
                    <img src="../assets/image/motto.png" alt="motto" style="height: 100%"/>
                </div>
                <div class="counter">
                    <span>已输入{{counter()}}字</span>
                </div>
            </div>
            <div class="input-area">
                <div class="input">
                    <el-input type="textarea" v-model="text"></el-input>
                </div>
            </div>
            <div class="foot">
                <div class="addition">
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="4">
                            <el-button type="text" icon="el-icon-sunny" @click="emoji">表情</el-button>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="text" icon="el-icon-picture-outline-round" @click="picture">图片</el-button>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="text" icon="el-icon-video-camera" @click="video">视频</el-button>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="text" icon="el-icon-guide" @click="topic">话题</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div class="issue">
                    <div class="btn">
                        <el-button type="primary" size="mini">发布</el-button>
                    </div>
                    <div class="issue-state">
                        <el-dropdown size="mini" trigger="click" >
                        <span class="el-dropdown-link">
                        可见：{{state}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                            <el-dropdown-menu slot="dropdown" style="width: 80px"   >
                                <p v-on:click="handleCommand(0)"><el-dropdown-item>公开</el-dropdown-item></p>
                                <p v-on:click="handleCommand(1)"><el-dropdown-item>粉丝</el-dropdown-item></p>
                                <p v-on:click="handleCommand(2)"><el-dropdown-item>仅自己</el-dropdown-item></p>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                text: '',
                state: '公开'
            }
        },
        methods: {
            counter() {
                return this.text.length;
            },
            emoji() {
                this.$message.success('emoji!');
            },
            picture() {
                this.$message.success('picture!');
            },
            video() {
                this.$message.success('video');
            },
            topic() {
                this.$message.success('topic!');
            },
            handleCommand(command) {
                if(command==0) this.state="公开";
                if(command==1) this.state="粉丝";
                if(command==2) this.state="仅自己";
            }
        }
    }
</script>


<style scoped>
    .extern {
        width: 100%;
    }

    .release {
        flex-direction: column;
        width: 100%;
    }

    .header {
        height: 20px;
    }

    .motto {
        float: left;
        height: 30px;
    }

    .counter {
        float: right;
        font-size: 12px;
        margin-top: 6px;
        color: #909399;
    }

    .foot {
        background-color: white;
        height: 40px;
        padding-bottom: -5px;
    }

    .addition {
        width: 65%;
        float: left;
        background-color: white;
    }

    .issue {
        width: 35%;
        float: left;
        background-color: white;
    }

    .issue-state {
        float: right;
        margin-right: 10%;
        margin-top: 10px;
    }

    .btn {
        margin-top: 6px;
        float: right;
        margin-right: 5%;
    }
</style>

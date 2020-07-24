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
                            <el-upload
                                    action=''
                                    style="width: 80%;z-index: 998"
                                    class="avatar-uploader"
                                    :on-remove="removefile"
                                    :on-change="getFile1"
                                    :on-success="uploadsuccess"
                                    list-type="picture"
                                    :auto-upload="false"
                                    :show-file-list="false"
                                    accept=".jpg,.jpeg,.png">
                                <el-button type="text" icon="el-icon-picture-outline-round" @click="changemode">图片
                                </el-button>
                            </el-upload>

                        </el-col>
                        <el-col :span="4">
                            <el-upload
                                    class="avatar-uploader el-upload--text"
                                    action='' :show-file-list="false"
                                    :on-success="uploadsuccess"
                                    :on-remove="removefile"
                                    :on-change="getFile2"
                                    :auto-upload="false"
                                    accept=".mp4"
                            >
                                <el-button type="text" icon="el-icon-video-camera" @click="changemode">视频</el-button>
                            </el-upload>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="text" icon="el-icon-guide" @click="topic">话题</el-button>
                        </el-col>
                    </el-row>
<!--                    <el-row v-for="(item,i) in filelist" v-bind:key="i" type="flex" class="row-bg"-->
<!--                            justify="space-around">-->
<!--                        <el-col><span-->
<!--                                style="color: #8B8B8B;font-family: 'DejaVu Sans', Arial, Helvetica, sans-serif ;float: left;font-size: medium;margin-left: 20px;width: 10%;height: 30px;text-align: left;line-height: 30px">{{i+1}}</span>-->
<!--                        </el-col>-->
<!--                        <el-col><span-->
<!--                                style="color: #8B8B8B;font-family: 'DejaVu Sans', Arial, Helvetica, sans-serif ;float: left;font-size: medium;margin-left: 20px;width: 30%;height: 30px;text-align: left;line-height: 30px">{{item['filename']}}</span>-->
<!--                        </el-col>-->
<!--                        <el-row>-->
<!--                            <el-button style="margin-left: 100%" @click="removefile(i)" type="text" size="mini"-->
<!--                                       icon="el-icon-close">删除-->
<!--                            </el-button>-->
<!--                        </el-row>-->
<!--                    </el-row>-->
                </div>

                <div class="issue">
                    <el-row class="btn">
                        <el-button type="primary" size="mini" @click="release" id="release_button">发布</el-button>
                    </el-row>
                    <div class="issue-state">
                        <el-dropdown size="mini" trigger="click" id="dropdown_release">
                        <span class="el-dropdown-link">
                        可见：{{state}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                            <el-dropdown-menu slot="dropdown" style="width: 80px" id="dropdownmenu_release">
                                <p v-on:click="handleCommand(0)">
                                    <el-dropdown-item id="dropdownmenu_release1">公开</el-dropdown-item>
                                </p>
                                <p v-on:click="handleCommand(1)">
                                    <el-dropdown-item id="dropdownmenu_release2">粉丝</el-dropdown-item>
                                </p>
                                <p v-on:click="handleCommand(2)">
                                    <el-dropdown-item id="dropdownmenu_release3">仅自己</el-dropdown-item>
                                </p>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>

            </div>
            <div>
                <el-row v-for="(item,i) in filelist" v-bind:key="i" type="flex" class="row-bg"
                        justify="space-around">
                    <el-col :span="3"><span
                            style="color: #8B8B8B;font-family: 'DejaVu Sans', Arial, Helvetica, sans-serif ;float: left;font-size: medium;margin-left: 20px;width: 1%;height: 30px;text-align: left;line-height: 30px">{{i+1}}</span>
                    </el-col>
                    <el-col><span
                            style="color: #8B8B8B;font-family: 'DejaVu Sans', Arial, Helvetica, sans-serif ;float: left;font-size: medium;margin-left: 20px;width: 100%;height: 30px;text-align: left;line-height: 30px">{{item['filename']}}</span>
                    </el-col>
                    <el-col>
                        <el-button  @click="removefile(i)" type="text" size="mini"
                                   icon="el-icon-close">删除
                        </el-button>
                    </el-col>
                </el-row>
            </div>

            <div>
                <el-row style="margin-top: 10px;margin-bottom: 5px">
                    <el-tag
                            style="margin-left: 3px;margin-right: 3px"
                            :key="tag"
                            v-for="(tag,i) in choosen_tags"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(i)">
                        {{tag}}
                    </el-tag>
                </el-row>
                <el-row style="margin-top: 10px;margin-bottom: 5px">
                    <el-input v-model="taginput" placeholder="请输入标签搜索" v-on:change="searchtags" style="width:50%"></el-input>
                    <el-button type="primary" style="width: 15%;font-size: 10px;margin-left: 5px" v-on:click="searchtags">搜索</el-button>
                    <el-button type="primary" style="width: 15%;font-size: 10px">新建</el-button>
                </el-row>
                <el-row style="margin-top: 10px;margin-bottom: 5px">
                    <el-tag
                            :key="tag"
                            v-for="(tag,i) in Tags"
                            :disable-transitions="false"
                            @close="handleClose(i)"
                            style="margin-left: 3px;margin-right: 3px"

                    ><el-button type="text" size="mini" @click="addTag(i)" >{{tag}}</el-button>
                    </el-tag>
            </el-row>

            </div>

        </el-card>


    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                text: '',
                state: '公开',
                uploaded: false,
                filelist: [],
                uploadmode: false,
                lock: 0,
                dialogVisible: false,
                Tags: [],
                choosen_tags: [],
                taginput: '',
                oldtags: [],  //no use
                message: '',
            }
        },
        methods: {
            // 刷新
            fresh() {
               this.text = '';
               this.state = '公开';
               this.uploaded = false;
               this.filelist = [];
               this.uploadmode = false;
               this.lock = 0;
               this.dialogVisible = false;
               this.Tags = [];
               this.choosen_tags = [];
               this.taginput = '';
               this.oldtags = [];
               this.message = '';
            },
            counter() {
                return this.text.length;
            },
            typify() {
                if (this.state === '公开')
                    return 3;
                else if (this.state === '粉丝')
                    return 1;
                else
                    return 0;
            },
            curr_time() {
                let date = new Date();
                let res = date.getFullYear() + '-';
                if (date.getMonth() < 9)
                    res += '0';
                let month=date.getMonth()+1;
                res += (month+ '-');

                if (date.getDate() < 10)
                    res += '0';

                res += date.getDate() + ' ';

                if (date.getHours() < 10)
                    res += '0';

                res += date.getHours() + ':';

                if (date.getMinutes() < 10)
                    res += '0';

                res += date.getMinutes();

                return res;
            },
            release() {
                if (this.$root.logged === false) {
                    this.$message.error('请登录后再进行操作！');
                }

                // args:
                // Integer uid, Integer type, String content, String post_day, String video,
                // String imag, String label, String username, String useravatar

                let url = 'http://localhost:8088/blog/setBlog';

                axios.post(url, {
                    uid: sessionStorage.getItem("id"),
                    content: this.text,
                    type: this.typify(),
                    post_day: this.curr_time(),
                    video: null,
                    imag: JSON.stringify(this.filelist),
                    label: JSON.stringify(this.choosen_tags),
                    username: sessionStorage.getItem("name"),
                    useravatar: JSON.parse(sessionStorage.getItem("userMongo")).avatar
                }).then((response) =>{
                    console.log(response);
                    this.$message.success("动态发布成功！");
                    this.fresh();
                    this.$emit('change')
                }).catch(err=> {
                    console.log(err);
                });
            },
            emoji() {
                this.$message.success('emoji!');
                this.message='emoji!';
                return true;
            },
            uploadsuccess() {
                this.$message.success('上传成功')
                this.message='上传成功';
                return true;
            },
            topic() {
                this.$message.success('topic!');
                this.message='topic!';
                return true;
            },
            handleCommand(command) {
                if (command === 0) {
                    this.state = "公开";
                    return 0;
                }
                if (command === 1) {
                    this.state = "粉丝";
                    return 1;
                }
                if (command === 2) {
                    this.state = "仅自己";
                    return 2;
                }
                return -1;
            },
            changemode() {
                this.uploadmode = !this.uploadmode
                return true;
            },
            getBase64(file) {
                return new Promise(function (resolve, reject) {
                    let reader = new FileReader();
                    let imgResult = "";
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                        imgResult = reader.result;
                    };
                    reader.onerror = function (error) {
                        reject(error);
                    };
                    reader.onloadend = function () {
                        resolve(imgResult);
                    };
                });
            },
            getFile(file) {
                if (!this.uploaded)
                    this.uploaded = true;
                this.getBase64(file.raw).then(res => {
                    console.log(res);
                    this.filelist.push({
                        filename: file.name,
                        base64: res,
                    });
                    console.log(file.name)
                    console.log(this.filelist)

                });
                return true;
            },
            getFile1(file) {
                console.log("file:")
                console.log(file);
                if (this.lock === 2) {
                    this.$message.warning("图片和视频无法同时上传！");
                    this.message="图片和视频无法同时上传！";
                    return false;
                } else {
                    if (this.filelist.length >= 6) {
                        this.$message.warning("做多上传6张图片！");
                        return false;
                    }
                    this.lock = 1;
                    this.getFile(file);
                    return true;
                }
            },
            getFile2(file) {
                if (this.lock === 1) this.$message.warning("图片和视频无法同时上传！");
                else {
                    if (this.filelist.length >= 1) {
                        this.$message.warning("视频太多了，老板做不出来！");
                        return false;
                    }
                    this.lock = 2;
                    this.getFile(file);
                    return true;
                }
                return false;
            },
            removefile(i) {

                this.filelist.splice(i, 1);
                if (this.filelist.length === 0) {

                    this.uploaded = false;
                    this.lock = 0;
                }
                console.log(this.lock);
                return true;
            },
            handleClose(i){
                this.choosen_tags.splice(i,1);
                return true;
            },
            addTag(i){
                this.choosen_tags.push(this.Tags[i]);
                return true;
            },
            searchtags() {
                let T = new Array();
                for(let i in this.Tags){
                    if (this.Tags[i].indexOf(this.taginput) !== -1) {
                        T.push(this.Tags[i]);
                    }
                }
                this.Tags=T;
                return true;
            },
            init(){
                const url="https://localhost:8088/gettags"
                return this.axios.post(url).then(res=>{
                    if(res === 'success'){
                        this.oldtags=["交大","软院","菜鸡","瓜皮","东川路","东三区","小霸王","挂科小能手","ics太简单了"];
                        this.Tags=this.oldtags;
                        return true;
                    }
                    else return false;
                })

            }
        },
        created() {
            this.init();
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

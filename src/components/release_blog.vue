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
                            <el-button type="text" icon="el-icon-magic-stick" @click="emoji">表情</el-button>
                        </el-col>
                        <el-col :span="4">
                            <el-upload
                                    action=''
                                    style="width: 80%;z-index: 998"
                                    class="avatar-uploader"
                                    :on-remove="removeFile"
                                    :on-change="getFile1"
                                    :on-success="uploadSuccess"
                                    list-type="picture"
                                    :auto-upload="false"
                                    :show-file-list="false"
                                    accept=".jpg,.jpeg,.png">
                                <el-button type="text" icon="el-icon-picture-outline-round" @click="changeMode">图片
                                </el-button>
                            </el-upload>

                        </el-col>
                        <el-col :span="4">
                            <el-upload
                                    class="avatar-uploader el-upload--text"
                                    action='' :show-file-list="false"
                                    :on-success="uploadSuccess"
                                    :on-remove="removeFile"
                                    :on-change="getFile2"
                                    :auto-upload="false"
                                    accept=".mp4">
                                <el-button type="text" icon="el-icon-video-camera" @click="changeMode">视频</el-button>
                            </el-upload>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="text" icon="el-icon-guide" @click="topic">话题</el-button>
                        </el-col>
                    </el-row>
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
                            <el-dropdown-menu slot="dropdown" style="width: 80px" id="dropdown_menu_release">
                                <p v-on:click="handleCommand(0)">
                                    <el-dropdown-item id="dropdown_menu_release1">公开</el-dropdown-item>
                                </p>
                                <p v-on:click="handleCommand(1)">
                                    <el-dropdown-item id="dropdown_menu_release2">粉丝</el-dropdown-item>
                                </p>
                                <p v-on:click="handleCommand(2)">
                                    <el-dropdown-item id="dropdown_menu_release3">仅自己</el-dropdown-item>
                                </p>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>

            </div>
            <div>
                <el-row v-for="(item,i) in fileList"
                        v-bind:key="i"
                        type="flex"
                        class="row-bg"
                        justify="space-around">
                    <el-col :span="3">
                        <span style="color: #8B8B8B;font-family: 'DejaVu Sans', Arial, Helvetica, sans-serif ;float: left;font-size: medium;margin-left: 20px;width: 1%;height: 30px;text-align: left;line-height: 30px">
                            {{ i + 1 }}
                        </span>
                    </el-col>
                    <el-col>
                        <span style="color: #8B8B8B;font-family: 'DejaVu Sans', Arial, Helvetica, sans-serif ;float: left;font-size: medium;margin-left: 20px;width: 100%;height: 30px;text-align: left;line-height: 30px">
                            {{ item['filename'] }}
                        </span>
                    </el-col>
                    <el-col>
                        <el-button  @click="removeFile(i)" type="text" size="mini" icon="el-icon-close">删除</el-button>
                    </el-col>
                </el-row>
            </div>

            <div v-if="topic_flag">
                <el-card shadow="hover">
                    <el-row style="margin-top: 10px;margin-bottom: 5px">
                        <el-tag
                                style="margin-left: 3px;margin-right: 3px"
                                :key="tag.id"
                                v-for="(tag, i) in chosen_tags"
                                closable
                                :disable-transitions="false"
                                @close="handleClose(i)">
                            #{{ tag.content }}#
                        </el-tag>
                    </el-row>
                    <el-row style="margin-top: 10px;margin-bottom: 5px">
                        <el-autocomplete
                                popper-class="my-autocomplete"
                                v-model="tagInput"
                                :fetch-suggestions="querySearchAsync"
                                placeholder="请输入标签搜索"
                                @select="handleSelect"
                                style="width: 60%"
                                @keyup.native.enter="querySearchAsync">
                            <template slot-scope="{ item }">
                                <div class="topic">#{{ item.content }}#</div>
                            </template>
                        </el-autocomplete>
                        <el-button type="primary" style="width: 15%;font-size: 10px;margin-left: 5px" v-on:click="querySearchAsync">搜索</el-button>
                        <el-button type="primary" style="width: 15%; font-size: 10px" @click="newTag = !newTag">{{newTagBtn()}}</el-button>
                    </el-row>
                    <el-row v-if="newTag === true">
                        <el-input v-model="newTagInput" placeholder="请输入新的标签" style="width: 60%"></el-input>
                        <el-button type="success" style="width: 15%; font-size: 10px;margin-left: 5px" @click="createTag">提交</el-button>
                        <span class="tagCounter" style="width: 20%; margin-left: 15px">还可以输入{{ newTagCounter() }}字</span>
                    </el-row>
                </el-card>
            </div>

            <el-row class="emoji-picker" style="z-index: 999">
                <VEmojiPicker
                    v-show="showEmojiPicker"
                    labelSearch="Search"
                    lang="pt-BR"
                    @select="onSelectEmoji"
                />
            </el-row>

        </el-card>

    </div>
</template>

<script>
    import axios from 'axios';
    import VEmojiPicker from 'v-emoji-picker';

    export default {
        components: {
            VEmojiPicker
        },
        data() {
            return {
                text: '',
                state: '公开',
                uploaded: false,
                fileList: [],
                uploadMode: false,
                lock: 0,
                dialogVisible: false,
                showEmojiPicker: false,

                Tags: [],
                chosen_tags: [],
                tagInput: '',
                newTag: false,
                newTagInput: '',
                topic_flag: false,
                message: 'error message'
            }
        },
        created() {
            this.loadTags();
        },
        methods: {
            fresh() {
               this.text = '';
               this.state = '公开';
               this.uploaded = false;
               this.fileList = [];
               this.uploadMode = false;
               this.lock = 0;
               this.dialogVisible = false;
               this.Tags = [];
               this.newTag = false;
               this.newTagInput = '';
               this.chosen_tags = [];
               this.tagInput = '';
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
                this.showEmojiPicker = false;
                if (this.$root.logged === false) {
                    this.$message.info('请登录后再进行操作！');
                }

                if (this.text === '' && this.fileList.length === 0) {
                    this.$message.error('不能发布空动态！');
                    return;
                }

                let url = 'http://localhost:8088/blog/setBlog';
                axios.post(url, {
                    uid: sessionStorage.getItem("id"),
                    content: this.text,
                    type: this.typify(),
                    post_day: this.curr_time(),
                    video: null,
                    imag: JSON.stringify(this.fileList),
                    label: JSON.stringify(this.chosen_tags),
                    username: sessionStorage.getItem("name"),
                    useravatar: JSON.parse(sessionStorage.getItem("userMongo")).avatar
                },
                    {
                        headers: {
                            token: sessionStorage.getItem("token")
                        }
                    }).then(() =>{
                    this.$message.success("动态发布成功！");
                    this.fresh();
                    this.$emit('change')
                }).catch(err=> {
                    console.log(err);
                });
            },
            emoji() {
                this.showEmojiPicker = (this.showEmojiPicker !== true);
                return this.showEmojiPicker;
            },
            onSelectEmoji(emoji) {
                console.log(emoji);
                this.text += emoji.data;
            },
            uploadSuccess() {
                this.$message.success('上传成功')
                this.message='上传成功';
                return true;
            },
            topic() {
                this.topic_flag = (this.topic_flag !== true);
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
            changeMode() {
                this.uploadMode = !this.uploadMode
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
                    this.fileList.push({
                        filename: file.name,
                        base64: res,
                    });
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
                    if (this.fileList.length >= 6) {
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
                    if (this.fileList.length >= 1) {
                        this.$message.warning("视频太多了，老板做不出来！");
                        return false;
                    }
                    this.lock = 2;
                    this.getFile(file);
                    return true;
                }
                return false;
            },
            removeFile(i) {
                this.fileList.splice(i, 1);
                if (this.fileList.length === 0) {

                    this.uploaded = false;
                    this.lock = 0;
                }
                console.log(this.lock);
                return true;
            },
            handleClose(i){
                this.chosen_tags.splice(i,1);
                return true;
            },
            loadTags() {
                let url = 'http://localhost:8088/blog/getLabels';
                axios.get(url).then(res => {
                    let tags = res.data;
                    for (let i = 0; i < tags.length; ++i) {
                        let tag = {
                            id: tags[i].id,
                            content: tags[i].content
                        };
                        this.Tags.push(tag);
                    }
                }).catch(err => {
                    console.log(err);
                });
            },
            addTag(tag) {
                switch (this.chosen_tags.length) {
                    case 2:
                        this.$message.error('最多只能添加 2 个标签噢！');
                        return false;
                    case 1:
                        if (this.chosen_tags[0].id === tag.id) {
                            this.$message.error('不能添加重复标签噢！');
                            return false;
                        }
                        else {
                            this.chosen_tags.push(tag);
                            return true;
                        }
                    case 0:
                        this.chosen_tags.push(tag);
                        return true;
                    default:
                        return false;
                }
            },
            querySearchLabel() {
                let items = [];
                let url = 'http://localhost:8088/blog/findFuzzyLabels?lab=' + this.tagInput;
                axios.get(url).then(res => {
                    let labels = res.data;
                    for (let i = 0; i < labels.length; ++i) {
                        let label = {
                            content: labels[i].content,
                            id: labels[i].id
                        };
                        items.push(label);
                    }
                }).catch(err => {
                    console.log(err);
                });

                return items;
            },
            querySearchAsync(queryStr, cbe) {
                let results = queryStr ? this.querySearchLabel() : this.Tags;
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => { cbe(results); }, 1000 * Math.random());
                return results;
            },
            handleSelect(tag) {
                this.addTag(tag);
                return tag;
            },
            newTagBtn() {
                return this.newTag ? '取消' : '新建';
            },
            newTagCounter() {
                if (20 - this.newTagInput.length <= 0) {
                    this.$message.info('新标签的长度不能超过 20 个字符！');
                    this.newTagInput = this.newTagInput.substr(0, 20);
                }

                return 20 - this.newTagInput.length;
            },
            createTag() {
                if (this.$root.logged === false) {
                    this.$message.info('请登录后再进行操作！');
                    return;
                }

                if (this.newTagInput === '' || this.newTagInput.length > 20) {
                    this.$message.info('新标签内容不能为空！');
                    return;
                }

                let url = 'http://localhost:8088/blog/setLabel?label=' + this.newTagInput.replace(/\s*/g, "");

                axios.get(url, {
                    headers: {
                        token: sessionStorage.getItem("token")
                    }
                }).then(() => {
                    this.$message.success("创建话题 #" + this.newTagInput + "# 成功！");
                    this.newTag = false;
                    this.newTagInput = '';
                }).catch(err=> {
                    console.log(err);
                });
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

    .tagCounter {
        font-size: 12px;
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

    .topic {
        text-overflow: ellipsis;
        overflow: hidden;
        color: #EE731B;
    }
</style>

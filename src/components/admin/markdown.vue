<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>markdown</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="editor">
            <div class="title">
                标题：<input type="text" v-model="title">
            </div>
            <el-button size="small" type="primary" class="coverPic">来张封面图？</el-button>
            <markdown-editor v-model="content" :configs="configs" ref="markdownEditor"></markdown-editor>
            <div class="tag">
                标签：
                <div class="tag-all">
                    <el-tag v-for="tag in tags" :key="tag.id" @click.native="handleTagSel(tag)">{{ tag.name }}</el-tag>
                </div>
                <div class="tag-sel">
                    <el-tag v-for="(tag, i) in tagSel" :key="tag.id" :closable="true" :close-transition="false" type="success" @close="handleClose(i)">{{ tag.name }}</el-tag>
                    <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="mini"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                </div>
            </div>
            <div class="submit">
                <el-button type="success" @click="submitHandle">发布</el-button>
                <el-button type="info">存稿</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { markdownEditor } from 'vue-simplemde'
    import axios from 'axios'
    export default {
        name: 'Markdown',
        props: ['userData'],
        components: {
            markdownEditor
        },
        data() {
            return {
                title: '',
                content: '',
                tags: [],
                tagSel: [],
                inputVisible: false,
                inputValue: '',
                configs: {
                    spellChecker: false, // 禁用拼写检查
                    renderingConfig: {
                        codeSyntaxHighlighting: true, // 开启代码高亮 
                        highlightingTheme: 'vs'
                    }
                }
            }
        },
        created() {
            axios.get('/api/tag/getTagAll')
                .then((res) => {
                    this.tags = res.data;
                })
                .catch((err) => {
                    console.log('err', err);
                });
        },
        methods: {
            handleTagSel(tag) {
                if(this.tagSel.indexOf(tag) == -1){
                    this.tagSel.splice(this.tagSel.length, 1, tag);
                }
            },
            handleClose(index) {
                this.tagSel.splice(index, 1);
            },
            handleInputConfirm() {
                let inputValue = this.inputValue.trim(), flag = false, tagAll = this.tags.concat(this.tagSel);
                tagAll.map((tag) => {
                    if(tag.name.toLocaleLowerCase() == inputValue.toLocaleLowerCase()){
                        flag = true;
                    }
                })
                if (inputValue && !flag) {
                    this.tagSel.push({id:-1,name:inputValue});
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            submitHandle() {
                console.log('title', this.title);
                console.log('content', this.content);
                console.log('tagSel', this.tagSel);
                var obj = {
                    user_id: this.userData.id,
                    author: this.userData.name,
                    title: this.title,
                    content: this.content,
                    state: 1,
                    type: 1,
                    loadURL: '#',
                    summary: '啦啦啦啦',
                    view: 0,
                    start: 0,
                    image: '',
                    filePath: ''
                }
                console.log('obj', obj);
                this.$http.post('/api/article/addArticle', {
                    user_id: this.userData.id,
                    author: this.userData.name,
                    title: this.title,
                    // content: this.content,
                    state: 1,
                    type: 1,
                    loadURL: '#',
                    summary: '啦啦啦啦',
                    view: 0,
                    start: 0,
                    image: '',
                    filePath: ''
                }).then((res) => {
                    console.log('res', res);
                }).catch((err) => {
                    console.log('err', err);
                });
            }
        }
    }
</script>

<style scoped>
    .markdown-editor {
        height: 100%
    }
    .title {
        padding: 10px;
    }
    .title input {
        border: none;
        outline: none;
        border-bottom: 1px solid #000;
        font-weight: bold;
        font-size: 20px;
        text-align: center;
        min-width: 100px; 
    }
    .coverPic {
        margin: 10px;
    }
    .tag {
        margin-bottom: 20px;
    }
    .tag span.el-tag {
        margin: 5px;
        cursor: pointer;
    }
    .tag-all span:hover {
        color: #000;
        background-color: #F7BA2A;
    }
    .tag-sel {
        border: 1px dotted yellowgreen;
        min-height: 50px;
        padding: 5px;
    }
    .input-new-tag {
         max-width: 77px;
    }
</style>

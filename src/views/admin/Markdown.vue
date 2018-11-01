<template>
  <div class="markdown-container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>
        <el-breadcrumb-item>markdown</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="editor">
      <div class="title">
        标题：<input type="text" v-model="title" :title="title">
      </div>
      <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor>
      <div class="tag">
        标签：
        <div class="tag-all">
          <el-tag v-for="tag in tags" :key="tag.id" @click.native="selectTag(tag)">{{ tag.name }}</el-tag>
        </div>
        <div class="tag-sel">
          <el-tag v-for="(tag, i) in tagSel" :key="tag.id" :closable="true" :close-transition="false" type="success" @close="closeTag(i)">{{ tag.name }}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="mini"
            @keyup.enter.native="tagInputConfirm"
            @blur="tagInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="addNewTag">+ New Tag</el-button>
        </div>
      </div>
      <div class="submit">
        <el-button type="success" @click="submit(1)" v-if="userInfo.root">发布</el-button>
        <el-button type="info" @click="submit(2)">存稿</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import markdownEditor from 'vue-simplemde/src/markdown-editor'
  import apiUrl from '@/serviceAPI.config.js'
  export default {
    name: 'Markdown',
    props: {
      userInfo: {
        type: Object,
        default: {}
      }
    },
    components: {
      markdownEditor
    },
    data() {
      return {
        title: '',
        content: '',
        tags: [],
        tagSel: [],
        tagIdMax: 1,
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
      this.newTagId = 0
      let query = this.$route.query;
      // this.$http.get('/api/tag/getTagAll')
      //   .then((res) => {
      //     this.tags = res.data;
      //     res.data.forEach(element => {
      //       this.tagIdMax = this.tagIdMax < element.id ? element.id : this.tagIdMax;
      //     });
      //   })
      //   .catch((err) => {
      //     console.log('err', err);
      //   });
      if (query.title) {
        this.title = query.title
        this.$http.get('/api/article/getArticleById', {
            params: {id: query.id, title: this.title, editor: true}
          }).then((res) => {
            let data = res.data
            if (data.length !== 0) {
              this.tagSel = data[0].tags
              this.content = data[0].content
            }
          })
      }
    },
    methods: {
      selectTag(tag) {
        if(this.tagSel.indexOf(tag) === -1){
          this.tagSel.splice(this.tagSel.length, 1, tag)
        }
      },
      closeTag(index) {
        this.tagSel.splice(index, 1)
      },
      tagInputConfirm() {
        let inputValue = this.inputValue.trim(), flag = false, tagAll = this.tags.concat(this.tagSel)
        tagAll.map((tag) => {
          if(tag.name.toLocaleLowerCase() == inputValue.toLocaleLowerCase()){
            flag = true
          }
        })
        if (inputValue && !flag) {
          this.tagSel.push({id: `${this.newTagId}_newTag`, name:inputValue})
          this.newTagId += 1
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      addNewTag() {
        this.inputVisible = true;
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus()
        });
      },
      submit(state) {
        // console.log(this.tagSel)
        // return
        if (this.title === '' || this.content === '') {
          this.$message.error('提交失败,请完善内容')
          return;
        }
        this.$http.post(apiUrl.insertArticle, {
          data: {user: this.userInfo.id, title: this.title, content: this.content, tags: this.tagSel}
        }).then((res) => {
          if (res.data.code === 200) {
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .markdown-container {
    text-align: left;
    .title {
      padding: 10px;
      input {
        border: none;
        outline: none;
        border-bottom: 1px solid #000;
        font-weight: bold;
        font-size: 20px;
        text-align: center;
        min-width: 100px;
      }
    }
    .markdown-editor {
      height: 100%
    }
    .tag {
      margin-bottom: 20px;
      span.el-tag {
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
        .input-new-tag {
          max-width: 77px;
        }
      }
    }
  }
</style>

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
  import { apiUrl } from '@/serviceAPI.config.js'
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
        id: '-1',
        originTitle: '',
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
      this.$http.post(apiUrl.getTag).then((res) => {
        if (res.data.code === 200) {
          this.tags = res.data.message;
          this.tags.forEach(ele => {
            ele.id = ele._id
          })
        }
      })
      if (query.id) {
        this.id = query.id
        this.$http.post(apiUrl.getArticle, {
            data: {id: query.id, markdown: true}
          }).then((res) => {
            const message = res.data.message
            if (res.data.code === 200) {
              this.title = message[0].title
              this.tagSel = message[0].tag
              this.content = message[0].content
              this.tagSel.forEach(ele => {
                ele.id = ele._id
              })
              this.originTitle = message[0].title
            } else {
              this.$message.error(message)
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
        if (this.title === '' || this.content === '') {
          this.$message.error('提交失败,请完善内容')
          return
        }
        this.$http.post(apiUrl.insertArticle, {
          data: {
            id: this.id,
            originTitle: this.originTitle,
            user: this.userInfo.id,
            title: this.title,
            content: this.content,
            tags: this.tagSel,
            state
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.$message.success(res.data.message);
            this.$router.push('/admin/articles')
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/css/variable.scss';
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
      .tag-all span {
        &:hover {
          color: $color-white;
          background-color: $color-origin;
        }
        &:first-child {
          margin-left: 0;
        }
      }
      .tag-sel {
        border: 1px dotted $color-green;
        min-height: 50px;
        padding: 5px;
        .input-new-tag {
          max-width: 77px;
        }
      }
    }
  }
</style>

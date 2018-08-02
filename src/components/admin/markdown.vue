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
        标题：<input type="text" v-model="title" :title="title">
      </div>
      <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor>
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
        <el-button type="success" @click="submitHandle(1)" v-if="userData.root">发布</el-button>
        <el-button type="info" @click="submitHandle(2)">存稿</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import markdownEditor from 'vue-simplemde/src/markdown-editor'
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
        view: 0,
        start: 0,
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
      let query = this.$route.query;
      this.$http.get('/api/tag/getTagAll')
        .then((res) => {
          this.tags = res.data;
          res.data.forEach(element => {
            this.tagIdMax = this.tagIdMax < element.id ? element.id : this.tagIdMax;
          });
        })
        .catch((err) => {
          console.log('err', err);
        });
      if (query.title) {
        this.title = query.title;
        this.$http.get('/api/article/getArticleById', {
            params: {id: query.id, title: this.title, editor: true}
          }).then((res) => {
            let data = res.data;
            if (data.length !== 0) {
              this.tagSel = data[0].tags;
              this.content = data[0].content;
              this.view = data[0].view;
              this.start = data[0].start;
            }
          }).catch((err) => {
            console.log('err', err);
          });
      }
      
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
      submitHandle(state) {
        if (this.title === '' || this.content === '') {
          this.$message.error('提交失败,请完善内容');
          return;
        }
        let summary = '', len = 250, query = this.$route.query, url = query.id ? 'updArticle' : 'addArticle';
        this.$http.post('/api/article/' + url, {
          user_id: this.userData.id,
          title: this.title,
          content: this.content,
          state: state,   // 1:发布 2:存稿
          type: 1,        // 1:原创 2:转载
          loadURL: '*',   // 转载地址
          view: this.view,
          start: this.start,
          tags: this.tagSel,
          id: query.id,
          tagIdMax: this.tagIdMax
        }).then((res) => {
          if (res.data.status) {
            this.$message.success(res.data.msg);
            this.$router.push('/admin/articles');
          } else {
            this.$message.error(res.data.msg);
          }
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

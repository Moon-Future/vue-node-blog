<template>
  <div class="list">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>
        <el-breadcrumb-item>Article</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-tabs @tab-click="tabClick">
      <el-tab-pane><span slot="label"><i class="el-icon-document"></i> 文章列表</span></el-tab-pane>
      <el-tab-pane><span slot="label"><i class="el-icon-delete"></i> 回收站</span></el-tab-pane>
    </el-tabs>
    <el-table :data="delFlag ? articlesDel : articles" border style="width:100%">
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="title" label="标题" width="300"></el-table-column>
      <el-table-column prop="tags" label="标签" width="200" :filters="tags" :filter-method="filterTag" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag v-for="tag in scope.row.tags" :key="tag.id" type="primary">{{ tag.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="发表时间" width="200">
        <template slot-scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.post_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更改时间" width="200">
        <template slot-scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.upd_time }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="view" label="浏览" width="100"></el-table-column>
      <el-table-column prop="start" label="点赞" width="100"></el-table-column>
      <el-table-column prop="state" label="状态" width="80">
        <template slot-scope="scope">
          <!-- 0：删除  1：已发布  2：暂存稿 -->
          <span v-if="scope.row.state === 1" style="color:#13ce66">已发布</span>
          <span v-else-if="scope.row.state === 0" style="color:#ff4949">删除</span>
          <span v-else style="color:#8391a5">暂存稿</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="220">
        <template slot-scope="scope">
          <el-button size="small" type="primary" v-show="!delFlag" :disabled="userData.root ? false : true" @click="editorHandle(scope.row)">编辑</el-button>
          <el-button size="small" type="warning" v-show="!delFlag" :disabled="userData.root ? false : true" v-if="scope.row.state === 1" @click="operateHandle(scope.row, 2)">存稿</el-button>
          <el-button size="small" type="success" v-show="!delFlag" :disabled="userData.root ? false : true" v-if="scope.row.state === 2" @click="operateHandle(scope.row, 1)">发布</el-button>
          <el-button size="small" type="danger" v-show="!delFlag" :disabled="userData.root ? false : true" @click="operateHandle(scope.row, 0, scope.$index)">删除</el-button>
          <el-button size="small" type="success" v-show="delFlag" :disabled="userData.root ? false : true" @click="operateHandle(scope.row, 2, scope.$index)">还原</el-button>
          <el-button size="small" type="danger" v-show="delFlag" :disabled="userData.root ? false : true" @click="operateHandle(scope.row, 3, scope.$index)">彻底删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'ArticleList',
    props: ['userData'],
    data() {
      return {
        articles: [],
        articlesDel: [],
        tags: [],
        delFlag: false
      }
    },
    created() {
      this.$http.get('/api/article/getArticleAll')
        .then((res) => {
          this.articles = res.data.articles;
          this.articlesDel = res.data.articlesDel;
          this.articles.map((article) => {
            article.post_time = new Date(article.post_time).format('yyyy/MM/dd hh:mm');
            article.upd_time = article.upd_time == '' ? '暂无修改' : new Date(article.upd_time).format('yyyy/MM/dd hh:mm');
          });
          this.articlesDel.map((article) => {
            article.post_time = new Date(article.post_time).format('yyyy/MM/dd hh:mm');
            article.upd_time = article.upd_time == '' ? '暂无修改' : new Date(article.upd_time).format('yyyy/MM/dd hh:mm');
          });
        })
        .catch((err) => {
          console.log('err', err);
        });
      this.$http.get('/api/tag/getTagAll')
        .then((res) => {
          this.tags = res.data;
          this.tags.map((tag) => {
            tag.text = tag.name;
            tag.value = tag.id;
          })
        })
        .catch((err) => {
          console.log('err', err);
        }); 
    },
    methods: {
      filterTag(value, row) {
        let flag = false;
        for(let i = 0, len = row.tags.length; i < len; i++){
          if(row.tags[i].id == value){
            flag = true;
            return row.tags;
          }
        }
      },
      editorHandle(article) {
        this.$router.push({
          path: 'markdown',
          query: {id: article.id, title: article.title}
        })
      },
      operateHandle(...arg) {
        let article = arg[0], state = arg[1], index = arg[2], type = arg[1],
          postData = {id: article.id, title: article.title, state: state};
        // index !== undefined ? postData.type = type : false;
        this.$http.post('/api/article/updArticle', postData)
          .then((res) => {
            let msg = '';
            if (res.data.status === true) {
              if (type === 0) {
                article.state = 0;
                this.articles.splice(index, 1);
                this.articlesDel.push(article);
                msg = '删除到回收站';
              } else if (type === 2) {
                article.state = 2;
                if (index !== undefined) {
                  this.articlesDel.splice(index, 1);
                  this.articles.push(article);
                  msg = '还原到存稿';
                } else {
                  msg = '存稿';
                }
              } else if (type === 3) {
                if (index !== undefined) {
                  this.articlesDel.splice(index, 1);
                  msg = '删除成功';
                }
              } else {
                article.state = 1;
                msg = '发布';
              }
              this.$message.success(msg)
            } else {
              this.$message.error(res.data.msg);
            }
          }).catch((err) => {
            throw err;
          });
      },
      tabClick(tab) {
        this.delFlag = tab.index === '1' ? true : false;
      }
    }
  }
</script>

<style>
  span.el-tag {
    margin-right: 5px;
  }
</style>

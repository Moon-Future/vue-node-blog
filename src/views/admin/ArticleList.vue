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
      <!-- <el-tab-pane><span slot="label"><i class="el-icon-delete"></i> 回收站</span></el-tab-pane> -->
    </el-tabs>
    <el-table v-loading="loading" size="mini" border :data="articles" style="width:100%">
      <template v-for="(item, i) in field">
        <el-table-column
          v-if="item.prop !== 'tag'"
          align="center"
          :prop="item.prop"
          :label="item.label"
          :width="item.width ? item.width : ''"
          :key="i">
         </el-table-column>
         <el-table-column
          v-else
          align="center"
          :prop="item.prop"
          :label="item.label"
          :width="item.width ? item.width : ''"
          :key="i">
            <template slot-scope="scope">
              <el-tag v-for="(tag, i) in scope.row[item.prop]" size="mini" :key="i">{{ tag.name }}</el-tag>
            </template>
         </el-table-column>
      </template>
      <el-table-column label="操作" align="center" min-width="100">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row._id)">编辑</el-button>
          <el-button size="mini" type="danger" v-if="userInfo.root === 1" @click="del(scope.row._id, scope.row.title, scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { apiUrl } from '@/serviceAPI.config.js'
  import { dateFormat } from '@/common/js/tool.js'
  export default {
    name: 'ArticleList',
    props: {
      userInfo: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        articles: [],
        articlesDel: [],
        tags: [],
        loading: false,
        field: [
          {prop: 'title', label: '标题'},
          {prop: 'tag', label: '标签'},
          {prop: 'createTime', label: '发表时间', width: '150'},
          {prop: 'updateTime', label: '更新时间'},
          {prop: 'view', label: '浏览数'},
          {prop: 'like', label: '点赞数'},
          {prop: 'state', label: '状态'}
        ]
      }
    },
    created() {
      this.loading = true
      this.$http.post(apiUrl.getArticle, {
        data: {admin: true}
      }).then((res) => {
        this.loading = false
        if (res.data.code === 200) {
          this.articles = res.data.message;
          this.articles.forEach(ele => {
            ele.createTime = dateFormat(ele.createTime, 'yyyy-MM-dd hh:mm')
            ele.updateTime = ele.updateTime === null ? '' : dateFormat(ele.updateTime, 'yyyy-MM-dd hh:mm')
            ele.state = ele.state === 1 ? '已发布' : state === 2 ? '已存稿' : '已删除'
          })
        }
      })
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
      tabClick(tab) {
        this.delFlag = tab.index === '1' ? true : false;
      },
      edit(id) {
        this.$router.push({path: 'markdown', query: {id}})
      },
      del(id, title, index) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(apiUrl.deleteArticle, {
            data: {id, title}
          }).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.message);
              this.articles.splice(index, 1)
            } else {
              this.$message.error(res.data.message);
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  span.el-tag {
    margin-right: 5px;
  }
</style>

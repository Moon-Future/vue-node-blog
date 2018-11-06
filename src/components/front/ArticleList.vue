<template>
  <div class="article-list">
    <div class="article-wrapper" v-for="(article, i) in articleList" :key="i">
      <div class="text">
        <div class="title" @click="goDetail(article)">{{ article.title }}</div>
        <div class="message">
          <div class="msg time">{{ article.createTime }}</div>
          <div class="msg view">
            <icon-font icon="icon-view">
              <span slot="content">{{ article.view }}</span>
            </icon-font>
          </div>
        </div>
        <div class="markdown-body" v-html="article.summary"></div>
      </div>
      <div class="picture">
        <img v-lazy="`https://source.unsplash.com/200x200/weekly?it,${i}`" alt="pic">
      </div>
      <!-- <div class="readall">阅读全文</div> -->
    </div>
    <el-pagination
      v-if="pageShow"
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script>
  import IconFont from '@/components/Iconfont'
  import apiUrl from '@/serviceAPI.config.js'
  import { dateFormat } from '@/common/js/tool.js'
  export default {
    name: 'articleList',
    data() {
      return {
        articleList: [],
        pageShow: false
      }
    },
    created() {
      this.getArticle()
    },
    methods: {
      getArticle() {
        this.$http.post(apiUrl.getArticle, {
          data: {summary: true}
        }).then(res => {
          if (res.data.code === 200) {
            this.articleList = res.data.message
            this.articleList.forEach(ele => {
              ele.createTime = dateFormat(ele.createTime, 'yyyy-MM-dd')
            })
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      goDetail(article) {
        this.$router.push(`/article/${article._id}`)
      }
    },
    components: {
      IconFont
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/css/variable.scss';
  .article-list {
    width: 70%;
    .article-wrapper {
      display: flex;
      box-shadow: 0px 0px 5px $color-white;
      padding: 10px;
      margin-bottom: 20px;
      overflow: hidden;
      background: $color-gray;
      opacity: 0.8;
      &:hover {
        box-shadow: 1px 1px 10px $color-blue;
      }
      .text {
        text-align: left;
        margin-right: 10px;
        width: 100%;
        .title {
          font-weight: bold;
          font-size: 22px;
          color: $color-blue;
          margin-bottom: 5px;
          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }
        .message {
          display: flex;
          color: $color-white;
          font-size: 14px;
          line-height: 16px;
          .msg {
            margin-right: 10px;
          }
        }
      }
      .readall {
        position: absolute;
        bottom: 10px;
        cursor: pointer;
        color: $color-deepgray;
      }
    }
  }
</style>

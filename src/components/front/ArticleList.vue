<template>
  <div class="article-list">
    <div class="article-wrapper" v-for="(article, i) in articleList" :key="i">
      <div class="text">
        <div class="title">{{ article.title }}</div>
        <div class="message">
          <div class="msg time">{{ article.createTime }}</div>
          <div class="msg view">
            <icon-font icon="icon-view"></icon-font>{{ article.view }}
          </div>
          <div class="msg like">
            <icon-font icon="icon-like"></icon-font>{{ article.view }}
          </div>
        </div>
        <div class="markdown-body" v-html="article.summary"></div>
      </div>
      <div class="picture">
        <img v-lazy="`https://source.unsplash.com/200x200/weekly?nature,${i}`" alt="pic">
      </div>
    </div>
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
        articleList: []
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
      box-shadow: 0px 0px 5px $color-gray;
      padding: 10px;
      margin-bottom: 20px;
      .text {
        text-align: left;
        margin-right: 10px;
        .title {
          font-weight: bold;
          font-size: 22px;
          margin-bottom: 5px;
        }
        .message {
          display: flex;
          color: $color-gray;
          font-size: 14px;
          .msg {
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>

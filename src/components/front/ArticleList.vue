<template>
  <div class="article-list">
    <div class="article-wrapper" v-for="(article, i) in articleList" :key="i">
      <div class="txt">
        <div class="title">{{ article.title }}</div>
        <div class="markdown-body" v-html="article.summary"></div>
      </div>
      <div class="pic">
        <img v-lazy="`https://source.unsplash.com/200x200/weekly?nature,${Math.random()}`" alt="pic">
      </div>
    </div>
  </div>
</template>

<script>
  import IconFont from '@/components/Iconfont'
  import apiUrl from '@/serviceAPI.config.js'
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
          } else {
            this.$message.error(res.data.message)
          }
        })
      }
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
      .txt {
        text-align: left;
        margin-right: 10px;
        .title {
          font-weight: bold;
          font-size: 22px;
          margin-bottom: 10px;
        }
      }
    }
  }
</style>

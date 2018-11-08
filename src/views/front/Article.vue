<template>
  <div class="article-detail">
    <h1>{{ article.title }}</h1>
    <div class="markdown-body" v-html="article.html"></div>
  </div>
</template>

<script>
  import { apiUrl } from '@/serviceAPI.config.js'
  import { dateFormat } from '@/common/js/tool.js'
  export default {
    name: 'ArticleDetail',
    data() {
      return {
        article: {}
      }
    },
    created() {
      this.getArticle()
    },
    methods: {
      getArticle() {
        this.$http.post(apiUrl.getArticle, {
          data: {id: this.$route.params.id}
        }).then(res => {
          if (res.data.code === 200) {
            this.article = res.data.message[0]
            this.article.createTime = dateFormat(this.article.createTime, 'yyyy-MM-dd')
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
  .article-detail {
    h1 {
      font-size: 2em;
      font-weight: bold;
      margin-bottom: 20px;
      color: $color-blue;
    }
  }
</style>

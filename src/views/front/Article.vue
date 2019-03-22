<template>
  <div class="article-detail" :class="{mobile: mobileFlag}">
    <h1>{{ article.title }}</h1>
    <div class="markdown-body" v-html="article.html"></div>
  </div>
</template>

<script>
  import { apiUrl } from '@/serviceAPI.config.js'
  import { dateFormat } from '@/common/js/tool.js'
  import { mapGetters } from 'vuex'
  export default {
    name: 'ArticleDetail',
    data() {
      return {
        article: {},
        chapterData: []
      }
    },
    computed: {
      ...mapGetters([
        'mobileFlag'
      ])
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
            this.chapterFormat()
            this.$emit('chapterFormat', this.chapterData)
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      chapterFormat(content) {
        // 文章目录处理
        this.chapterData = [];
        let hs = this.article.html.match(/<h\d{1}.*<\/h\d{1}>*/g);
        if (!hs) {
          return;
        }
        for (let i = 0, len = hs.length; i < len; i++) {
          let h = hs[i]
          let text = h.match(/>(.*)</)[1]
          let num = h.match(/^<h(\d{1})/)[1]
          let id = "item" + i
          let obj = {label: text, num: num, id: id, children: []}
          let str = h.replace(/id=".*"/, 'id="' + id + '"')
          this.article.html = this.article.html.replace(h, str)
          this.chapterDataHandle(obj, this.chapterData)
        }
      },
      chapterDataHandle(obj, arr) {
        let len = arr.length, index = len - 1
        if (arr.length === 0) {
          arr.push(obj)
        } else {
          if (arr[index].num < obj.num) {
            this.chapterDataHandle(obj, arr[index].children)
          } else {
            arr.push(obj)
          }
        }
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
      color: $color-black;
    }
    &.mobile {
      padding: 60px 10px 10px 10px;
    }
  }
</style>

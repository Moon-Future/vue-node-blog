<template>
  <div>
    <left-entry :chapterData="chapterData" @leftEntry="leftEntry"></left-entry>
    <div class="article-container" ref="articleContainer">
      <top-header ref="topHeader"></top-header>
      <div class="article-detail" :class="{mobile: mobileFlag}">
        <h1>{{ article.title }}</h1>
        <div class="markdown-body" v-html="article.html"></div>
      </div>
      <bottom-footer v-if="!mobileFlag"></bottom-footer>
    </div>
    <div class="back-to-top" v-show="topShow" @click="backToTop">
      <icon-font :icon="topIcon" fontSize="42"></icon-font>
    </div>
  </div>
</template>

<script>
  import IconFont from '@/components/Iconfont'
  import TopHeader from '@/components/front/TopHeader'
  import BottomFooter from '@/components/front/BottomFooter'
  import LeftEntry from '@/components/front/LeftEntry'
  import { apiUrl } from '@/serviceAPI.config.js'
  import { dateFormat } from '@/common/js/tool.js'
  import { mapGetters } from 'vuex'
  export default {
    name: 'ArticleDetail',
    data() {
      return {
        article: {},
        chapterData: [],
        topShow: false,
        topIcon: 'icon-top-static',
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
    mounted() {
      window.addEventListener('scroll', this.bodyScroll)
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
            // this.$emit('chapterFormat', this.chapterData)
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
      },
      leftEntry({flag, width}) {
        if (!this.mobileFlag) {
          let options = {}
          if (flag) {
            options = {width: (document.documentElement.clientWidth - width) + 'px', left: width + 'px'}
          } else {
            options = {width: '100%', left: '0'}
          }
          this.$refs.articleContainer.style.width = options.width
          this.$refs.articleContainer.style.left = options.left
          this.$refs.topHeader.setWidth(options.width)
          // this.$refs.breadCrumb.setWidth({width: options.width, left: options.left})
        }
      },
      bodyScroll() {
        const viewWrapper = this.$refs.viewWrapper
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        this.topShow = scrollTop > 500 ? true : false
      },
      backToTop() {
        this.topIcon = 'icon-top-start'
        this.animateToTop()
      },
      animateToTop() {
        let timer = setInterval(() => {
          const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
          const ispeed = Math.floor(-scrollTop / 6)
          if( scrollTop === 0 ){
            this.topIcon = 'icon-top-static'
            clearInterval(timer)
          }
          document.documentElement.scrollTop = document.body.scrollTop = scrollTop + ispeed
        }, 30)
      },
    },
    components: {
      TopHeader,
      BottomFooter,
      LeftEntry,
      IconFont
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/css/variable.scss';
  .article-container {
    position: relative;
  }
  .article-detail {
    background: $color-white;
    width: 80%;
    margin: auto;
    padding: 20px;
    padding-top: 100px;
    padding-bottom: 32px;
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
  .back-to-top {
    position: fixed;
    bottom: 32px;
    right: 20px;
    cursor: pointer;
  }
</style>

<template>
  <div>
    <div class="article-detail">
      <div class="article-title">
        {{ changeData }}
        <div v-if="loading"><i class="el-icon-loading"></i></div>
        <h1>{{ article.title }}</h1>
        <div class="article-mes" v-if="show">
          <span class="article-postdata">{{ article.post_time }}</span>
          <span class="article-view"><i class="el-icon-search title-icon"></i>{{ article.view }}</span>
          <span class="article-start" @click="addStart"><i :class="['title-icon', hasAddSatrt ? 'el-icon-star-on' : 'el-icon-star-off']"></i>{{ article.start }}</span>
          <span class="article-tags">
            <template v-for="tag in article.tags">
              <el-tag type="primary" :key="tag.id">{{ tag.name }}</el-tag>
            </template>
          </span>
        </div>
      </div>
      <div class="markdown-body" v-html="content"></div>
    </div>
    <Comment v-if="show"></Comment>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import Comment from './Comment'
  export default {
    name: 'articleInfo',
    components: {
      Comment
    },
    data() {
      return {
        article: {},
        content: '',
        show: false,
        loading: false,
        treeData: [],
        hasAddSatrt: false
      }
    },
    created() {
      // let params = this.$route.params;
      // this.getData({id: params.id, title: params.title});
      this.currentArticleHanle({catalog: []});
    },
    methods: {
      ...mapActions({
        currentArticleHanle: 'currentArticle'
      }),
      getData(options) {
        this.show = false;
        this.loading = true;
        this.$http.get('/api/article/getArticleById', {
          params: {id: options.id, title: options.title}
        }).then((res) => {
          this.loading = false;
          if (res.data.status === false) {
            this.$set(this.article, 'title', res.data.msg);
            return;
          }
          this.article = res.data[0];
          this.article.post_time = this.timeFormat(this.article.post_time);
          this.content = this.article.content;
          this.show = true;
          // 文章目录处理
          this.treeData = [];
          this.currentArticleHanle({catalog: this.treeData});
          let hs = this.content.match(/<h\d{1}.*<\/h\d{1}>*/g);
          if (!hs) {
            return;
          }
          // hs.shift();
          for (let i = 0, len = hs.length; i < len; i++) {
            let h = hs[i],
              text = h.match(/>(.*)</)[1],
              tag = h.match(/^<(h\d{1})/)[1],
              num = h.match(/^<h(\d{1})/)[1],
              id = "item" + i,
              obj = {label: text, num: num, id: id, children: []},
              str = h.replace(/id=".*"/, 'id="' + id + '"');
            this.content = this.content.replace(h, str);
            this.treeDataHandle(obj, this.treeData);
          }
          this.currentArticleHanle({catalog: this.treeData});
          this.addViewOrStart('view');
        }).catch((err) => {
          console.log('err', err);
        });
      },
      treeDataHandle(obj, arr) {
        let len = arr.length, index = len - 1;
        if (arr.length === 0) {
          arr.push(obj);
        } else {
          if (arr[index].num < obj.num) {
            this.treeDataHandle(obj, arr[index].children);
          } else {
            arr.push(obj);
          }
        }
      },
      addViewOrStart(type) {
        this.$http.post('/api/article/addViewOrStart', {
          id: this.article.id,
          count: this.article[type] + 1,
          type
        }).then((res) => {
          this.article[type] += 1;
        }).catch((err) => {
          throw err;
        })
      },
      addStart() {
        if(this.hasAddSatrt) {
          return false;
        }
        this.addViewOrStart('start');
        this.hasAddSatrt = true;
      }
    },
    computed: {
      ...mapState(['currentArticle']),
      changeData() {
        this.getData({id: this.currentArticle.id, title: this.currentArticle.title});
      }
    }
  }
</script>

<style scoped>
  .article-detail {
    padding: 20px;
    background: #fff;
    text-align: left;
  }
  .article-title {
    text-align: center
  }
  .article-mes {
    height: 60px;
    line-height: 30px;
  }

  .article-title span {
    font: 400 12px/22px Arial;
    color: #999;
    padding: 0 5px;
  }

  .article-title .title-icon {
    margin-right: 5px;
  }

  .article-tags span {
    margin-right: 5px;
    height: 25px;
  }

  .article-start {
    cursor: pointer;
  }
</style>
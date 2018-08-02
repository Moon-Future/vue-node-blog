<template>
  <div class="box-catalog">
    <el-row :gutter="10">
      <template v-for="article in articles">
        <el-col :md="boxCol" :key="article.id">
          <el-card class="box-card">
            <div class="article-title">
              <router-link to="" @click.native="readAll(article.id, article.title)"><h2 :title="article.title">{{ article.title }}</h2></router-link>
              <div class="article-mes">
                <span class="article-postdata">{{ article.post_time }}</span>
                <span class="article-view"><i class="el-icon-search title-icon"></i>{{ article.view }}</span>
                <span class="article-start"><i class="title-icon el-icon-star-on"></i>{{ article.start }}</span>
                <span class="article-tags" v-for="tag in article.tags" :key="tag.id">
                  <el-tag type="primary">{{ tag.name }}</el-tag>
                </span>
              </div>
            </div>
            <img v-if="article.cover" :src="article.cover" class="box-card-image">
            <!-- <img v-else :src="imageDefault" class="box-card-image"> -->
            <div class="article-summary">
              <!-- <p :title="article.summary">{{ article.summary }}</p> -->
              <div class="markdown-body" v-html="article.summary" ></div>
              <!-- <el-button type="primary" @click="readAll(article.id, article.title)">阅读全文</el-button> -->
              <a type="primary" @click="readAll(article.id, article.title)">阅读全文 »</a>
            </div>
          </el-card>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import axios from 'axios'
  export default {
    name: 'boxCatalog',
    data() {
      return {
        imageDefault: '../../../static/images/pic9.jpg',
        articles: []
      }
    },
    created() {
      axios.get('/api/article/getArticleAll', {
          params: {noDel: true}
        }).then((res) => {
          this.articles = res.data;
          this.articles.sort((a, b) => {
            return b.post_time - a.post_time
          })
          this.articles.map((article) => {
            article.post_time = this.timeFormat(article.post_time);
          })
        }).catch((err) => {
          console.log('err', err);
        });
    },
    computed: {
      ...mapState(['boxCol'])
    },
    methods: {
      readAll(articleId, title) {
        this.$router.push({name: 'Article', params: { id: articleId, title: title}});
        this.currentArticle({id: articleId, title: title});
        this.crumbFlag([{index: 1, newValue: false}]);
      },
      ...mapActions(['crumbFlag', 'currentArticle'])
    }
  }

</script>

<style scoped>
  .clearfix:after {
    content: '';
    display: block;
    overflow: hidden;
    clear: both;
  }

  .box-card {
    text-align: center;
    margin-bottom: 10px;
  }

  .box-card-image {
    /* width: 60%; */
    max-width: 100%;
  }
  /* @media only screen and (min-width: 992px) {
    .box-card-image {
      height: 250px;
    }
  } */

  .box-card:hover {
    background: #EFF2F7;
  }

  .article-title {
    margin-bottom: 10px;
  }

  .article-title h2 {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .article-title a {
    text-decoration: none;
    color: #000;
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

  .article-start {
    cursor: pointer;
  }

  .article-tags span {
    cursor: pointer;
    height: 25px;
  }

  .article-summary div {
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;
    -webkit-box-orient: vertical;
  }

  .article-summary a {
    float: left;
    margin: 20px 0;
    cursor: pointer;
    color: #555;
    padding-bottom: 10px;
    border-bottom: 2px solid #666;
    text-decoration: none;
  }
  /* .article-summary a:hover {
    text-decoration: underline
  } */
</style>

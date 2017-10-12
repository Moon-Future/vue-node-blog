<template>
    <div>
        <article class="article-detail">
            <div class="article-title">
                {{ changeData }}
                <div v-if="loading"><i class="el-icon-loading"></i></div>
                <h1>{{ article.title }}</h1>
                <div class="article-mes" v-if="show">
                    <span class="article-postdata">{{ article.post_time }}</span>
                    <span class="article-view"><i class="el-icon-search title-icon"></i>{{ article.view }}</span>
                    <span class="article-start"><i class="title-icon el-icon-star-on"></i>{{ article.start }}</span>
                    <span class="article-tags">
                        <template v-for="tag in article.tags">
                            <el-tag type="primary" :key="tag.id">{{ tag.name }}</el-tag>
                        </template>
                    </span>
                </div>
            </div>
            <div class="markdown-body" v-html="content"></div>
        </article>
        <Comment v-if="show"></Comment>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import marked from 'marked'
    import Comment from './Comment'
    marked.setOptions({
        highlight: function (code) {
            return require('highlight.js').highlightAuto(code).value;
        }
    });
    export default {
        name: 'article',
        components: {
            Comment
        },
        data() {
            return {
                article: {},
                content: '',
                show: false,
                loading: false
            }
        },
        created() {
            let params = this.$route.params;
            this.getData({id: params.id, title: params.title});
        },
        methods: {
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
                    this.content = marked(this.article.content);
                    this.show = true;
                }).catch((err) => {
                    console.log('err', err);
                });
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
    }
</style>
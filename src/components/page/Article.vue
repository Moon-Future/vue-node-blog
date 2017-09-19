<template>
    <div>
        <!-- <article class="article-detail">
            <div class="article-title">
                <h1>node+vue搭建个人博客111</h1>
                <div class="article-mes">
                    <span class="article-postdata">2017-07-04 01:02</span>
                    <span class="article-view"><i class="el-icon-search title-icon"></i>222</span>
                    <span class="article-start"><i class="title-icon el-icon-star-on"></i>333</span>
                    <span class="article-tags">
                        <el-tag type="primary">vue</el-tag>
                    </span>
                </div>
            </div>
            <div class="markdown-body" v-html="article"></div>
        </article> -->
        <Comment></Comment>
    </div>
</template>

<script>
    import marked from 'marked'
    import axios from 'axios'
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
                article: ''
            }
        },
        created() {
            // axios.get('../../../static/README.md')
            axios.get('../../../static/articles/README.md')
                .then((res) => {
                    var mdData = res.data;
                    this.article = marked(mdData);
                })
                .catch((err) => {
                    console.log(err);
                })
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
</style>
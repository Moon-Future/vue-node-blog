<template>
    <transition name="fade">
        <div class="article-catalog" v-if="catalogDisplay">
            <div class="catalog-search">
                <el-input placeholder="article search" icon="search" @click="searchArticle" @keyup.enter.native="searchArticle"></el-input>
            </div>
            <div class="btn-hide">
                <i class="iconfont icon-zhankai-copy" @click="hiddenPanel"></i>
            </div>
            <div class="catalog-tags">
                <el-switch v-model="tagOn" on-color="#13ce66" off-color="#ff4949" @change="changeTagStatus"></el-switch>
                <div class="tag-list" v-show="tagOn">
                    <template v-for="(tag, i) in tags">
                        <el-tag @click.native="tagSelect(tag)" :style="{background: tag.bgColor}" :key="i">{{ tag.name }}</el-tag>
                    </template>
                </div>
            </div>
            <el-breadcrumb separator="/" class="catalog-breadcrumb">
                <el-breadcrumb-item @click.native="clickBread(0)">目录</el-breadcrumb-item>
                <el-breadcrumb-item v-if="crumbFlag[1] && crumbFlag[0]" @click.native="clickBread(1)">{{ crumbFlag[1] }}</el-breadcrumb-item>
                <el-breadcrumb-item v-if="crumbFlag[2] && crumbFlag[0]">{{ crumbFlag[2] }}</el-breadcrumb-item>
            </el-breadcrumb>
            <p class="currentArticle" v-if="currentArticle.title">当前正在阅读：<span @click="gotoCurrentArticle">{{ currentArticle.title }}</span></p>
            <div class="catalog-list" v-if="!crumbFlag[2]">
                <ul>
                    <li v-for="(article, i) in articleShow" :key="article.id">
                        <router-link to="" @click.native="articleSelect(article)"><p class="title">{{ i+1 }}、{{ article.title }}</p></router-link>
                        <p class="mes">
                            <span>{{ article.post_time }}</span>
                            <span><i class="el-icon-search"></i>{{ article.view }}</span>
                            <span v-for="tag in article.tags" :key="tag.id">{{ tag.name }}</span>
                        </p>
                    </li>
                </ul>
                <el-button v-if="hasMore" type="primary" size="mini" :loading="loadFlag" class="load-more" @click="loadData"><span v-show="!loadFlag">加载更多...</span><span v-show="loadFlag">加载中</span></el-button>
                <p class="no-more" v-if="!hasMore">没有更多了</p>
            </div>
            <div class="article-chapter" v-if="crumbFlag[2] && currentArticle.catalog.length != 0">
                <!-- <el-tree :data="currentArticle.catalog" :props="defaultProps" :default-expand-all="true" @node-click="handleNodeClick"></el-tree> -->
                <ul v-for="data in currentArticle.catalog" :key="data.num">
                    <li><a :href="'#' + data.id" >{{ data.label }}</a></li>
                    <ul v-for="child1 in data.children" :key="child1.num">
                        <li><a :href="'#' + child1.id" >{{ child1.label }}</a></li>
                        <ul v-for="child2 in child1.children" :key="child2.num">
                            <li><a :href="'#' + child2.id" >{{ child2.label }}</a></li>
                            <ul v-for="child3 in child2.children" :key="child3.num">
                                <li><a :href="'#' + child3.id" >{{ child3.label }}</a></li>
                                <ul v-for="child4 in child3.children" :key="child4.num">
                                    <li><a :href="'#' + child4.id" >{{ child4.label }}</a></li>
                                    <ul v-for="child5 in child4.children" :key="child5.num">
                                        <li><a :href="'#' + child5.id" >{{ child5.label }}</a></li>
                                    </ul>
                                </ul>
                            </ul>
                        </ul>
                    </ul>
                </ul>
                <ul>
                    <li><a href="#liuyan" >留言</a></li>
                </ul>
            </div>
        </div>
    </transition>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    export default {
        data() {
            return {
                LIMIT_STEP: 10,
                tagOn: false,
                tags: [],
                articles: {
                    all: {
                        total: 0,
                        limit: 0,
                        data: []
                    }
                },
                loadFlag: false,
                hasMore: true,
                articleShow: [],
                key: 'all',
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        created() {
            this.loadData();
            this.$http.get('/api/tag/getTagAll')
                .then((res) => {
                    this.tags = res.data;
                    for (let i = 0, len = this.tags.length; i < len; i++) {
                        this.articles[this.tags[i].id] = {
                            name: this.tags[i].name,
                            total: 0,
                            limit: 0,
                            data: []
                        }
                    }
                })
                .catch((err) => {
                    console.log('err', err);
                }); 
        },
        methods: {
            tagSelect(tagObj) {
                this.tags.map(function(tag){
                    delete tag.bgColor;
                })
                tagObj.bgColor = '#1D8CE0';
                this.crumbFlagHanle([{'index':0,'newValue':true},{'index':1,'newValue':tagObj.name},{'index':2,'newValue':false}]);
                this.key = tagObj.id;
                let objAll = this.articles.all, objTag = this.articles[this.key];
                if (objAll.data.length === objAll.total) {
                    objTag.data = this.fileterData(objAll.data, objTag.name);
                    objTag.total = objTag.data.length;
                    this.articleShow = objTag.data;
                } else {
                    if (objTag.data.length === 0 && objTag.limit === 0) {
                        this.loadData();
                    } else {
                        this.articleShow = objTag.data;
                    }
                }
                this.hasMore = (objTag.data.length === objTag.total) ? false : true;
            },
            changeTagStatus() {
                this.tags.map(function(tag){
                    delete tag.bgColor;
                });
                this.crumbFlagHanle([{'index':1,'newValue':false}]);
                this.key = 'all';
                this.articleShow = this.articles.all.data;
                this.hasMore = (this.articles.all.data.length === this.articles.all.total) ? false : true;
            },
            searchArticle() {
                
            },
            clickBread(index) {
                if(index == 0 && this.crumbFlag[0]){
                    this.crumbFlagHanle([{'index':1,'newValue':false},{'index':2,'newValue':false}]);
                    this.tags.map(function(tag){
                        delete tag.bgColor;
                    })
                }else if(index ==1 && this.crumbFlag[2]){
                    this.crumbFlagHanle([{'index':2,'newValue':false}]);
                }
            },
            articleSelect(article) {
                this.crumbFlagHanle([{'index':2,'newValue':article.title}]);
                this.currentArticleHanle({'flag':true,'id':article.id,'title':article.title,'tag':this.crumbFlag[1]});
                this.$router.push({name: 'Article', params: {id: article.id, title: article.title}});
            },
            gotoCurrentArticle() {
                this.crumbFlagHanle([{'index':2,'newValue':this.currentArticle.title},{'index':1,'newValue':false}]);
                if(this.currentArticle.tag){
                    this.crumbFlagHanle([{'index':1,'newValue':this.currentArticle.tag}]);
                }
            },
            ...mapActions({
                hiddenPanel: 'changeCatalogDiaplay',
                crumbFlagHanle: 'crumbFlag',
                currentArticleHanle: 'currentArticle'
            }),
            loadData() {
                let url = '/api/article/' + (this.key === 'all' ? 'getArticleAll' : 'getArticleByTagId');
                this.articles[this.key].limit += this.LIMIT_STEP;
                this.loadFlag = true;
                this.$http.get(url, {
                        params: {noDel: true, limit: this.articles[this.key].limit, tagId: this.key}
                    }).then((res) => {
                        this.loadFlag = false;
                        let dataArr;
                        if (res.data.data !== undefined) {
                            dataArr = res.data.data;
                            this.articles[this.key].total = res.data.total;
                        } else {
                            dataArr = res.data;
                        }
                        dataArr.map((data) => {
                            data.post_time = this.timeFormat(data.post_time);
                        })
                        this.articles[this.key].data = this.articles[this.key].data.concat(dataArr);
                        this.hasMore = (this.articles[this.key].total <= this.articles[this.key].data.length) ? false : true;
                        this.articleShow = this.articles[this.key].data;
                    }).catch((err) => {
                        console.log('err', err);
                    });
            },
            fileterData(datas, name) {
                let self = this;
                return datas.filter(function(data){
                    for(let i = 0, len = data.tags.length; i < len; i++){
                        if(data.tags[i].name.toLowerCase() === name.toLowerCase()){
                            return data;
                        }
                    }
                })
            },
            // 点击目录
            handleNodeClick() {

            }
        },
        computed: {
            ...mapState(['catalogDisplay', 'crumbFlag', 'currentArticle']),
        }
    }
</script>

<style scoped>
    .article-catalog {
        position: fixed;
        width: 20%;
        height: 100%;
        background: #324157;
        color: #fff;
        opacity: 0.9;
        padding: 10px;
        box-sizing: border-box;
        overflow: auto;
    }
    
    .article-catalog a {
        text-decoration: none;
    }
    
    @media only screen and (max-width: 992px) {
        .article-catalog {
            display: none;
        }
    }
    
    /* .catalog-search input {
        background-color: transparent;
        color: #fff;
    } */
    
    .catalog-search i {
        cursor: pointer;
    }
    
    .catalog-breadcrumb {
        padding-top: 20px;
    }
    
    .catalog-breadcrumb span {
        color: #fff; 
    }
    
    .catalog-tags {
        margin-top: 10px;
        text-align: left;
    }
    
    .tag-list {
        margin-top: 10px;
    }
    
    .tag-list span {
        margin: 0 10px 10px 0;
        cursor: pointer;
    }
    
    .tag-list span:hover {
        color: #FFFF00;
    }

    .catalog-list {
        text-align: center;
    }
    
    .catalog-list ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        text-align: left;
    }
    
    .catalog-list .title {
        margin-bottom: 2px;
        /*white-space: nowrap;*/
        text-overflow: ellipsis;
        overflow: hidden;
        color: #fff;
    }
    
    .catalog-list .mes {
        color: #97a8be;
        font-size: 13px;
        margin: 0;
    }
    
    .catalog-list .mes span {
        margin-right: 10px;
        cursor: pointer;
    }
    
    .catalog-list .mes span:hover{
        text-decoration: underline;
    }
    
    .catalog-list .mes i {
        margin-right: 5px;
    }
    
    .currentArticle {
        margin: 3px 0 0 0;
        text-align: left;
        font-size: 13px;
        color: #FFFF00;
    }
    .currentArticle span {
        cursor: pointer;
    }
    
    .btn-hide {
        float: right;
        margin-top: 15px;
        cursor: pointer;
    }
    
    .fade-leave-active {
        left: 0px;
        transition: left .5s
    }
    
    .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
        left: -400px
    }
    
    .fade-enter-active {
        left: -350px;
        transition: left .5s
    }
    
    .fade-enter-to /* .fade-leave-active in below version 2.1.8 */ {
        left: 0px
    }

    .load-more {
        margin-top: 10px
    }

    .no-more {
        color: #97a8be;
        font-size: 13px;
    }

    .article-chapter {
        margin-top: 10px;
    }

    .article-chapter ul {
        list-style: none;
        padding-left: 15px;
        margin: 5px 0;
    }

    .article-chapter>ul {
        padding-left: 0;
    }

    .article-chapter ul li a {
        display: block;
        color: #fff;
        font-size: 14px;
        padding: 5px;
    }

    .article-chapter ul li a:hover {
        background: #00a8e6;
        /* background: #444; */
    }
</style>
<template>
	<transition name="fade">
		<div class="blog-catalog" v-if="catalogDisplay">
			<div class="catalog-search">
				<el-input placeholder="blog search" icon="search" @click="searchBlog" @keyup.enter.native="searchBlog"></el-input>
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
			<p class="currentBlog" v-if="currentArticle.title">当前正在阅读：<span @click="gotoCurrentArticle">{{ currentArticle.title }}</span></p>
			<div class="catalog-list" v-if="!crumbFlag[2]">
				<ul>
					<li v-for="(blog, i) in fileterBlog" :key="blog.id">
						<router-link to="" @click.native="blogSelect(blog)"><p class="title">{{ i+1 }}、{{ blog.title }}</p></router-link>
						<p class="mes">
							<span>{{ blog.post_time }}</span>
							<span><i class="el-icon-search"></i>{{ blog.view }}</span>
							<span v-for="tag in blog.tags" :key="tag.id">{{ tag.name }}</span>
						</p>
					</li>
				</ul>
			</div>
			<div class="blog-chapter" v-if="crumbFlag[2]">
				{{ crumbFlag[2] }}
			</div>
		</div>
	</transition>
</template>

<script>
	import {mapState, mapActions} from 'vuex'
	import axios from 'axios'
	export default {
		data() {
			return {
				'tagOn': false,
				'tags': [
					{'name':'Vue', 'id':'0'},
					{'name':'HTML5', 'id':'1'},
					{'name':'Javascript', 'id':'2'},
					{'name':'Python', 'id':'3'},
					{'name':'Java', 'id':'4'},
					{'name':'Ruby', 'id':'5'},
					{'name':'CSS', 'id':'6'},
					{'name':'MySql', 'id':'7'}
				],
				'blogs': [
					{
						'title': 'Vue+MySql从0搭建个人博客',
						'tags': [{'id':0,'name':'vue'}, {'id':1,'name':'mysql'}],
						'post_time': '2017-07-25',
						'upd_time': '2017-08-26',
						'view': '666',
						'start': '555',
						'summary': 'nskgbgbtgbgnior'
					},
					{
						'title': '个人博客数据表设计',
						'tags': [{'id':1,'name':'mysql'}],
						'post_time': '2016-07-25',
						'upd_time': '2018-08-26',
						'view': '159628',
						'start': '666',
						'summary': '通话录音软件论坛已经'
					},
					{
						'title': '入门到放弃',
						'tags': [{'id':2,'name':'javascript'}],
						'post_time': '2017-03-25',
						'upd_time': '2017-06-26',
						'view': '865921',
						'start': '85961',
						'summary': '钢铁行业调节阀的海能翻'
					}
				],
//				crumbFlag: [true, false, false], // 三级面包屑	// 目录/标签/文章标题		crumbCata/crumbSub/crumbTitle
//				currentArticle: {title: '', tag: ''}
			}
		},
		created() {
			var self = this;
			axios.get('/api/article/getArticleAll')
				.then((res) => {
					self.blogs = res.data;
					self.blogs.map((blog) => {
						blog.post_time = self.timeFormat(blog.post_time);
					})
				})
				.catch((err) => {
					console.log('err', err);
				});
			axios.get('/api/tag/getTagAll')
				.then((res) => {
					self.tags = res.data;
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
			},
			changeTagStatus() {
				this.tags.map(function(tag){
					delete tag.bgColor;
				});
				this.crumbFlagHanle([{'index':1,'newValue':false}]);
			},
			searchBlog() {
				
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
			blogSelect(blog) {
				this.crumbFlagHanle([{'index':2,'newValue':blog.title}]);
				this.currentArticleHanle({'flag':true,'title':blog.title,'tag':this.crumbFlag[1]});
				this.$router.push({name: 'Article', params: {id: blog.id, title: blog.title}});
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
			})
		},
		computed: {
			fileterBlog() {
				var self = this;
				return this.blogs.filter(function(blog){
					if(self.crumbFlag[1]){
						for(let i = 0, len = blog.tags.length; i < len; i++){
							if(blog.tags[i].name.toLowerCase()  == self.crumbFlag[1].toLowerCase() ){
								return blog;
							}
						}
					}else{
						return blog;
					}
				})
			},
			...mapState(['catalogDisplay', 'crumbFlag', 'currentArticle']),
		}
	}
</script>

<style scoped>
	.blog-catalog {
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
	
	.blog-catalog a {
		text-decoration: none;
	}
	
	@media only screen and (max-width: 992px) {
		.blog-catalog {
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
	
	.catalog-list ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		text-align: left;
	}
	
	.catalog-list .title {
		margin-bottom: 2px;
		white-space: nowrap;
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
	
	.currentBlog {
		margin: 3px 0 0 0;
		text-align: left;
		font-size: 13px;
		color: #FFFF00;
	}
	.currentBlog span {
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
</style>
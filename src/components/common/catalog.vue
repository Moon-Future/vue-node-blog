<template>
	<transition name="fade">
		<div class="blog-catalog" v-if="catalogDisplay">
			<div class="catalog-search">
				<el-input placeholder="blog search" icon="search" @click="searchBlog" @keyup.enter.native="searchBlog"></el-input>
			</div>
			<div class="btn-hide">
				<!-- <i class="el-icon-caret-left" @click="hiddenPanel"></i> -->
				<i class="iconfont icon-zhankai-copy" @click="hiddenPanel"></i>
			</div>
			<div class="catalog-tags">
				<el-switch v-model="tagOn" on-color="#13ce66" off-color="#ff4949" @change="changeTagStatus"></el-switch>
				<div class="tag-list" v-show="tagOn">
					<template v-for="tag in tags">
						<el-tag @click.native="tagSelect(tag)" :style="{background: tag.bgColor}">{{ tag.name }}</el-tag>
					</template>
				</div>
			</div>
			<el-breadcrumb separator="/" class="catalog-breadcrumb">
				<el-breadcrumb-item @click.native="clickBread(0)">目录</el-breadcrumb-item>
				<el-breadcrumb-item v-if="crumbFlag[1] && crumbFlag[0]" @click.native="clickBread(1)">{{ crumbFlag[1] }}</el-breadcrumb-item>
				<el-breadcrumb-item v-if="crumbFlag[2] && crumbFlag[0]">{{ crumbFlag[2] }}</el-breadcrumb-item>
			</el-breadcrumb>
			<p class="currentBlog" v-if="currentBlog.flag">当前正在阅读：<span @click="gotoCurrentBlog">{{ currentBlog.title }}</span></p>
			<div class="catalog-list" v-if="!crumbFlag[2]">
				<ul>
					<li v-for="(blog, i) in fileterBlog">
						<router-link to=""><p class="title" @click="blogSel(blog)">{{ i+1 }}、{{ blog.title }}</p></router-link>
						<p class="mes">
							<span>{{ blog.post_time }}</span>
							<span><i class="el-icon-search"></i>{{ blog.view }}</span>
							<span v-for="tag in blog.tags">{{ tag.name }}</span>
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
				tagOn: false,
				tags: [
					{'name':'Vue2', 'id':'0'},
					{'name':'HTML5', 'id':'1'},
					{'name':'Javascript', 'id':'2'},
					{'name':'Python', 'id':'3'},
					{'name':'Java', 'id':'4'},
					{'name':'Ruby', 'id':'5'},
					{'name':'CSS', 'id':'6'},
					{'name':'MySql', 'id':'7'}
				],
				blogs: [
					{
						'title': 'Vue+MySql从0搭建个人博客',
						'tags': [{'id': 0, 'name': 'vue2'}, {'id': 1, 'name': 'mysql'}],
						'post_time': '2017-07-25',
						'upd_time': '2017-08-26',
						'view': '666',
						'start': '555',
						'summary': 'nskgbgbtgbgnior'
					},
					{
						'title': '个人博客数据表设计',
						'tags': [{'id': 1, 'name': 'mysql'}],
						'post_time': '2016-07-25',
						'upd_time': '2018-08-26',
						'view': '159628',
						'start': '666',
						'summary': 'ͨ通话录音软件论坛已经'
					},
					{
						'title': '入门到放弃',
						'tags': [{'id': 2, 'name': 'Javascript'}],
						'post_time': '2017-03-25',
						'upd_time': '2017-06-26',
						'view': '865921',
						'start': '85961',
						'summary': '钢铁行业调节阀的海能翻'
					}
				],
				crumbFlag: [true, false, false], // 三级面包屑	// 目录/标签/文章标题		crumbCata/crumbSub/crumbTitle
				currentBlog: {flag: false, title: '', tag: ''}
			}
		},
		created() {
			var self = this;
			axios.get('/api/blog/getBlogAll')
				.then((res) => {
					console.log('res', res);
					self.blogs = res.data;
					self.blogs.map((obj) => {
						obj.post_time = self.timeFormat(obj.post_time);
					});
				})
				.catch((err) => {
					throw err;
				})
			console.log(this.timeFormat(1501260407904));
		},
		methods: {
			tagSelect(tagObj) {
				this.tags.map(function(tag){
					delete tag.bgColor;
				})
				tagObj.bgColor = '#1D8CE0';
				this.crumbFlag.splice(0, 1, true);
				this.crumbFlag.splice(1, 1, tagObj.name);
				this.crumbFlag.splice(2, 1, false);
				axios.get('/api/blog/getBlogAll')
					.then((res) => {
						console.log(res);
					})
					.catch((err) => {
						throw err;
					})
			},
			changeTagStatus() {
				this.tags.map(function(tag){
					delete tag.bgColor;
				});
				this.crumbFlag.splice(1, 1, false);
			},
			searchBlog() {
				
			},
			clickBread(index) {
				if(index == 0 && this.crumbFlag[0]){
					this.crumbFlag.splice(1, 1, false);
					this.crumbFlag.splice(2, 1, false);
					this.tags.map(function(tag){
						delete tag.bgColor;
					})
				}else if(index ==1 && this.crumbFlag[2]){
					this.crumbFlag.splice(2, 1, false);
				}
			},
			blogSel(blog) {
				this.crumbFlag.splice(2, 1, blog.title);
				this.currentBlog.flag = true;
				this.currentBlog.title = blog.title;
				this.currentBlog.tag = this.crumbFlag[1];
			},
			gotoCurrentBlog() {
				this.crumbFlag.splice(2, 1, this.currentBlog.title);
				this.crumbFlag.splice(1, 1, false);
				if(this.currentBlog.tag){
					this.crumbFlag.splice(1, 1, this.currentBlog.tag);
				}
			},
			hiddenPanel() {
				this.$store.dispatch('changeCatalogDiaplay');
				
			},
//			...mapActions({
//				hiddenPanel: 'changeCatalogDiaplay'
//			})
		},
		computed: {
			fileterBlog() {
				var self = this;
				return this.blogs.filter(function(blog){
					if(self.crumbFlag[1]){
						for(let i = 0, len = blog.tagName.length; i < len; i++){
							if(blog.tagName[i].toLowerCase()  == self.crumbFlag[1].toLowerCase() ){
								return blog;
							}
						}
					}else{
						return blog;
					}
				})
			},
			...mapState(['catalogDisplay']),
		}
	}
</script>

<style>
	@import url("../../../static/css/catalog.css");
</style>
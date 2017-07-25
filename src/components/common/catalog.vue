<template>
	<div class="blog-catalog">
		<div class="catalog-search">
			<el-input placeholder="blog search" icon="search" @click="searchBlog" @keyup.enter.native="searchBlog"></el-input>
		</div>
		<div class="catalog-tags">
			<el-switch v-model="tagOn" on-color="#13ce66" off-color="#ff4949" @change="changeTag"></el-switch>
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
						<span>{{ blog.postTime }}</span>
						<span><i class="el-icon-search"></i>{{ blog.view }}</span>
						<span v-for="tag in blog.tagName">{{ tag }}</span>
					</p>
				</li>
			</ul>
		</div>
		<div class="blog-chapter" v-if="crumbFlag[2]">
			{{ crumbFlag[2] }}
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				'tagOn': false,
				'tags': [
					{'name':'Vue2', 'id':'0'},
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
						'tagName': ['vue2', 'mysql'],
						'postTime': '2017-07-25',
						'updTime': '2017-08-26',
						'view': '666',
						'start': '555',
						'summary': 'nskgbgbtgbgnior'
					},
					{
						'title': '个人博客数据表设计',
						'tagName': ['mysql'],
						'postTime': '2016-07-25',
						'updTime': '2018-08-26',
						'view': '159628',
						'start': '666',
						'summary': '通话录音软件论坛已经'
					},
					{
						'title': '入门到放弃',
						'tagName': ['Javascript'],
						'postTime': '2017-03-25',
						'updTime': '2017-06-26',
						'view': '865921',
						'start': '85961',
						'summary': '钢铁行业调节阀的海能翻'
					}
				],
				crumbFlag: [true, false, false], // 三级面包屑	// 目录/标签/文章标题		crumbCata/crumbSub/crumbTitle
				currentBlog: {flag: false, title: '', tag: ''}
			}
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
			},
			changeTag() {
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
			}
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
			}
		}
	}
</script>

<style>
	@import url("../../../static/css/catalog.css");
</style>
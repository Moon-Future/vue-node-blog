<template>
	<div class="blog-article">
		<leftNav></leftNav>
		<catalog></catalog>
		<mHeader></mHeader>
		<div class="blog-content">
			<div class="blog-header">
				<el-breadcrumb separator="/" class="breadcrumb">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>活动管理</el-breadcrumb-item>
					<el-breadcrumb-item>活动列表</el-breadcrumb-item>
					<el-breadcrumb-item>活动详情</el-breadcrumb-item>
				</el-breadcrumb>
				<i class="switch-type iconfont" :class="switchType ? 'icon-zhanshiguanli01' : 'icon-show'" @click="switchHandle"></i>
			</div>
			<el-row :gutter="10">
				<template v-for="(blog, i) in blogs">
					<el-col :md="contentCol">
						<el-card class="box-card">
							<div class="blog-title">
								<router-link to="/"><h2>{{ blog.title }}</h2></router-link>
								<span class="blog-postdata">{{ blog.postdate }}</span>
								<span class="blog-view"><i class="el-icon-search title-icon"></i>{{ blog.view }}</span>
								<span class="blog-start"><i class="title-icon el-icon-star-on"></i>{{ blog.start }}</span>
								<span class="blog-tags" v-for="tag in blog.tags">
									<el-tag type="primary">{{ tag }}</el-tag>
								</span>
							</div>
							<img v-if="blog.image" :src="blog.image" class="box-card-image">
							<img v-else :src="imageDefault" class="box-card-image">
							<div class="blog-summary">
								<p :title="blog.summary">{{ blog.summary }}</p>
								<el-button type="primary">阅读全文</el-button>
							</div>
						</el-card>
					</el-col>
				</template>
			</el-row>
		</div>
	</div>
</template>

<script>
	import leftNav from '../common/leftNav'
	import mHeader from '../common/Header'
	import catalog from '../common/catalog'
	import marked from 'marked'
	import axios from 'axios'
	export default {
		name: 'article',
		data() {
			return {
				imageDefault: '../../../static/images/pic3.jpg',
				switchType: true,
				contentCol: 12,
				blogs: [
					{
						title: '使用Vue的时候，是如何写特效的1？',
						postdate: '2017-07-22',
						view: 569821,
						start: 95681,
						tags: ['Vue','Javascript','MySql'],
						summary: '摘要: 学习完Bootstrap之后。想做一个管理台。但是Bootstrap是可是自适应，但我的需求是希望左侧菜单栏固定大小。 排除万难~走向胜利！',
//						image: '../../../static/images/pic1.jpg'
					},
					{
						title: '使用Vue的时候，是如何写特效的2？',
						postdate: '2017-07-22',
						view: 569821,
						start: 95681,
						tags: ['Vue','Javascript','MySql'],
						summary: '摘要: 学习完Bootstrap之后。想做一个管理台。但是Bootstrap是可是自适应，但我的需求是希望左侧菜单栏固定大小。 排除万难~走向胜利！学习完Bootstrap之后。想做一个管理台。但是Bootstrap是可是自适应，但我的需求是希望左侧菜单栏固定大小。 排除万难~走向胜利！',
						image: '../../../static/images/pic2.jpg'
					},
					{
						title: '使用Vue的时候，是如何写特效的3？',
						postdate: '2017-07-22',
						view: 569821,
						start: 95681,
						tags: ['Vue','Javascript','MySql'],
						summary: '摘要: 学习完Bootstrap之后。想做一个管理台。但是Bootstrap是可是自适应，但我的需求是希望左侧菜单栏固定大小。 排除万难~走向胜利！',
						image: '../../../static/images/pic7.jpg'
					},
					{
						title: '使用Vue的时候，是如何写特效的4？',
						postdate: '2017-07-22',
						view: 569821,
						start: 95681,
						tags: ['Vue','Javascript','MySql'],
						summary: '摘要: 学习完Bootstrap之后。想做一个管理台。但是Bootstrap是可是自适应，但我的需求是希望左侧菜单栏固定大小。 排除万难~走向胜利！',
						image: '../../../static/images/pic4.jpg'
					}
				]
			}
		},
		components: {
			leftNav,
			mHeader,
			catalog
		},
		methods: {
			switchHandle() {
				this.switchType = !this.switchType;
				this.contentCol = this.contentCol == 12 ? 24 : 12;
			},
		},
		created() {
			// var self = this;
			// let LocalAPI = "../../../static/demo.md";
			// let GitHubAPI = "https://api.github.com/users/johnny";
			// axios.get(LocalAPI).then( (response) => {
            //     console.log(response);
            //     this.content = marked(response.data);
            // },(response) => {
            //     console.log('error');
            // })
		}
	}
	
</script>

<style scoped>
	@import url("../../../static/css/article.css");
</style>
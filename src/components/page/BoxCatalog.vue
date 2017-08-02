<template>
	<div class="box-catalog">
		<el-row :gutter="10">
			<template v-for="blog in blogs">
				<el-col :md="boxCol">
					<el-card class="box-card">
						<div class="blog-title">
							<router-link to="" @click.native="readAll(blog.id, blog.title)"><h2>{{ blog.title }}</h2></router-link>
							<span class="blog-postdata">{{ blog.post_time }}</span>
							<span class="blog-view"><i class="el-icon-search title-icon"></i>{{ blog.view }}</span>
							<span class="blog-start"><i class="title-icon el-icon-star-on"></i>{{ blog.start }}</span>
							<span class="blog-tags" v-for="tag in blog.tags">
								<el-tag type="primary">{{ tag.name }}</el-tag>
							</span>
						</div>
						<img v-if="blog.image" :src="blog.image" class="box-card-image">
						<img v-else :src="imageDefault" class="box-card-image">
						<div class="blog-summary">
							<p :title="blog.summary">{{ blog.summary }}</p>
							<el-button type="primary" @click="readAll(blog.id, blog.title)">阅读全文</el-button>
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
		name: 'article',
		data() {
			return {
				imageDefault: '../../../static/images/pic3.jpg',
				blogs: [
					{
						id: 0,
						title: '使用Vue的时候，是如何写特效的1？',
						postdate: '2017-07-22',
						view: 569821,
						start: 95681,
						tags: ['Vue','Javascript','MySql'],
						summary: '摘要: 学习完Bootstrap之后。想做一个管理台。但是Bootstrap是可是自适应，但我的需求是希望左侧菜单栏固定大小。 排除万难~走向胜利！',
//						image: '../../../static/images/pic1.jpg'
					},
					{
						id: 1,
						title: '使用Vue的时候，是如何写特效的2？',
						post_time: '2017-07-22',
						view: 569821,
						start: 95681,
						tags: ['Vue','Javascript','MySql'],
						summary: '摘要: 学习完Bootstrap之后。想做一个管理台。但是Bootstrap是可是自适应，但我的需求是希望左侧菜单栏固定大小。 排除万难~走向胜利！学习完Bootstrap之后。想做一个管理台。但是Bootstrap是可是自适应，但我的需求是希望左侧菜单栏固定大小。 排除万难~走向胜利！',
						image: '../../../static/images/pic2.jpg'
					},
					{
						id: 2,
						title: '使用Vue的时候，是如何写特效的3？',
						postdate: '2017-07-22',
						view: 569821,
						start: 95681,
						tags: ['Vue','Javascript','MySql'],
						summary: '摘要: 学习完Bootstrap之后。想做一个管理台。但是Bootstrap是可是自适应，但我的需求是希望左侧菜单栏固定大小。 排除万难~走向胜利！',
						image: '../../../static/images/pic7.jpg'
					},
					{
						id: 3,
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
		},
		computed: {
			...mapState(['boxCol'])
		},
		methods: {
			readAll(blogId, title) {
				this.$router.push({name: 'Article', params: { id: blogId, title: title}});
				this.currentArticle({title: title});
				this.crumbFlag([{index: 1, newValue: false}]);
			},
			...mapActions(['crumbFlag', 'currentArticle'])
		}
	}
	
</script>

<style scoped>
	.box-card {
		margin-bottom: 10px;
	}
	
	.box-card-image {
		width: 60%;
	}
	@media only screen and (min-width: 992px) {
		.box-card-image {
			height: 250px;
		}
	}
	
	.box-card:hover {
		background: #EFF2F7;
	}
	
	.blog-title {
		margin-bottom: 10px;
	}
	
	.blog-title a {
		text-decoration: none;
		color: #000;
	}
	
	.blog-title span {
		font: 400 12px/22px Arial;
		color: #999;
		padding: 0 5px;
	}
	
	.blog-title .title-icon {
		margin-right: 5px;
	}
	
	.blog-start {
		cursor: pointer;
	}
	
	.blog-tags span {
		cursor: pointer;
	}
	
	.blog-summary p {
		text-align: left;
		text-indent: 2em;
		height: 4em;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}
	
	.blog-summary button {
		float: right;
		margin-bottom: 20px;
	}
</style>
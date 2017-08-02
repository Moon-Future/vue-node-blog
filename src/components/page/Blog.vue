<template>
	<div>
		<Leftnav></Leftnav>
		<Catalog></Catalog>
		<div class="blog-content">
			<div class="blog-header">
				<el-breadcrumb separator="/" class="breadcrumb">
					<el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/blog' }" @click.native="backBlog">Blog</el-breadcrumb-item>
					<el-breadcrumb-item to="">{{ currentArticle.title }}</el-breadcrumb-item>
				</el-breadcrumb>
				<i class="switch-type iconfont" :class="switchType ? 'icon-zhanshiguanli01' : 'icon-show'" @click="switchHandle"></i>
			</div>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import Catalog from '../common/Catalog'
	import Leftnav from '../common/Leftnav'
	import mHeader from '../common/Header'
	import {mapState, mapActions} from 'vuex'
	export default {
		name: 'blog',
		data() {
			return {
				switchType: true,
			}
		},
		components: {
			Catalog,
			Leftnav,
			mHeader
		},
		methods: {
			switchHandle() {
				this.switchType = !this.switchType;
				this.boxSwitchType();
			},
			backBlog() {
				this.currentArticleHanle({'title': ''});
				this.crumbFlagHanle([{'index':2, 'newValue':false}]);
			},
			...mapActions({
				crumbFlagHanle: 'crumbFlag',
				currentArticleHanle: 'currentArticle',
				boxSwitchType: 'boxSwitchType'
			})
		},
		computed: {
			...mapState(['crumbFlag', 'currentArticle', 'boxCol']),
		}
	}
	
</script>

<style scoped>
	.blog-content {
		position: absolute;
		right: 0;
		box-sizing: border-box;
		padding: 20px;
		width: 80%;
		background: #EBEBEB;
		overflow-y: auto;
	}
	@media only screen and (max-width: 992px) {
		.blog-content {
			width: 100%;
		}
		.switch-type {
			display: none;
		}
	}
	@media only screen and (min-width: 992px) {
		.blog-content {
			width: 80%;
			height: 100%;
		}
	}
	.blog-header {
		padding: 20px;
		margin-bottom: 10px;
		margin-top: -20px;
	}
	.breadcrumb {
		float: left;
	}
	.switch-type {
		float: right;
		cursor: pointer;
	}
</style>
<template>
	<div>
		<Leftnav :avatar="avatar"></Leftnav>
		<Catalog></Catalog>
		<div class="blog-content">
			<vHeader :avatar="avatar"></vHeader>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import Catalog from '../common/CatalogItem'
	import Leftnav from '../common/LeftNavItem.vue'
	import vHeader from '../common/HeaderItem'
	import {mapState, mapActions} from 'vuex'
	export default {
		name: 'blog',
		data() {
			return {
				switchType: true,
				avatar: 'head2.jpg'
			}
		},
		components: {
			Catalog,
			Leftnav,
			vHeader
		},
		created() {
			this.$http.get('/api/getSession')
				.then((res) => {
						res.data.avatar ? this.avatar = res.data.avatar : false;
				})
				.catch((err) => {
						throw err;
				})
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
		padding: 20px 10%;
		width: 80%;
		height: 100%;
		/* background: #EBEBEB; */
		overflow-y: auto;
		/* background: url(../../../static/images/bg1.jpg) no-repeat; */
		background: #f5f5f5;
		background-size: cover;
	}
	@media only screen and (max-width: 992px) {
		.blog-content {
			width: 100%;
			padding: 20px;
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


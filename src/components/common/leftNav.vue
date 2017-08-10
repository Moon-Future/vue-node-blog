<template>
	<div class="left-nav">
		<div class="left-search">
			<el-input placeholder="blog search" icon="search"></el-input>
		</div>
		<div class="btn-show">
			<!-- <i class="el-icon-caret-right" @click="showPanel"></i> -->
			<i class="iconfont icon-zhankai" @click="showPanel"></i>
		</div>
		<div class="left-header">
			<el-row>
				<el-col :span="24">
					<router-link to="/login">
						<img class="left-avatar" src="../../../static/images/head1.jpg"/>
					</router-link>
				</el-col>
			</el-row>
			<div class="left-mes">
				<p>I am chenliang</p>
				<p>I am chenliang</p>
				<p>I am chenliang</p>
			</div>
		</div>
		<div class="left-menu">
			<el-menu theme="dark" class="tabs-menu" router default-active="blog">
				<el-menu-item index="/"><i class="iconfont icon-wenzhang"></i>Home</el-menu-item>
				<el-menu-item index="blog"><i class="iconfont icon-wenzhang"></i>Blog</el-menu-item>
				<el-menu-item index="about"><i class="iconfont icon-about"></i>About</el-menu-item>
				<el-menu-item index="comment"><i class="iconfont icon-comments"></i>Comment</el-menu-item>
				<el-menu-item index="contact"><i class="iconfont icon-icon3"></i>Contact</el-menu-item>
			</el-menu>
		</div>
		<div class="left-social">
			<el-col :span="24"><i class="iconfont icon-github"></i></el-col>
		</div>
		<div class="left-social">
			<el-col :span="24"><i class="iconfont icon-weibo"></i></el-col>
		</div>
		<div class="left-social">
			<el-col :span="24"><i class="iconfont icon-weixin"></i></el-col>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			showPanel() {
				this.$store.dispatch('changeCatalogDiaplay');
			}
		}
	}
</script>

<style scoped>
	.left-nav {
		position: fixed;
		height: 100%;
		background: #324157;
		float: left;
		color: #fff;
		text-align: center;
	}

	@media only screen and (max-width: 992px) {
		.left-nav {
			display: none;
		}
	}

	@media only screen and (min-width: 992px) {
		.left-nav {
			width: 20%;
		}
	}

	.left-search {
		margin: 10px;
		cursor: pointer;
	}

	/* .left-search input {
		background-color: transparent;
		color: #fff;
	} */

	.left-header {
		position: relative;
		padding: 30px;
	}

	.left-avatar {
		width: 30%;
		border-radius: 50%;
		cursor: pointer;
	}

	.left-social {
		position: relative;
		top: 100px;
		padding: 10px;
	}

	.left-social i {
		font-size: 32px;
		cursor: pointer;
	}

	.left-social .icon-github:hover {
		color: #f66;
	}

	.left-social .icon-weibo:hover {
		color: #f08787;
	}

	.left-social .icon-weixin:hover {
		color: #46af35;
	}

	.btn-show {
		width: 45px;
		cursor: pointer;
		margin-top: 15px;
	}
</style>
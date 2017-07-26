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
				<el-col :span="24"><img class="left-avatar" src="../../../static/images/head1.jpg"/></el-col>
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
	@import url("../../../static/css/leftnav.css");
</style>
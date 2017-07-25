<template>
	<div class="left-nav">
		<div class="left-search">
			<el-input placeholder="blog search" icon="search"></el-input>
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
			<el-menu theme="dark" class="tabs-menu">
				<!-- <el-menu-item index="0"><i class="el-icon-document"></i>Article</el-menu-item>
				<el-menu-item index="1"><i class="el-icon-setting"></i>About</el-menu-item>
				<el-menu-item index="2"><i class="el-icon-edit"></i>Comment</el-menu-item>
				<el-menu-item index="3"><i class="el-icon-message"></i>Contact</el-menu-item> -->
				<el-menu-item index="0"><i class="iconfont icon-wenzhang"></i>Article</el-menu-item>
				<el-menu-item index="1"><i class="iconfont icon-about"></i>About</el-menu-item>
				<el-menu-item index="2"><i class="iconfont icon-comments"></i>Comment</el-menu-item>
				<el-menu-item index="3"><i class="iconfont icon-icon3"></i>Contact</el-menu-item>
			</el-menu>
		</div>
		<!-- <div class="left-social">
			<el-row>
				<el-col :span="24">
					<ul>
						<li><i class="iconfont icon-github"></i></li>
						<li><i class="iconfont icon-weibo"></i></li>
						<li><i class="iconfont icon-weixin"></i></li>
					</ul>
				</el-col>
			</el-row>
		</div> -->
		<!-- <el-row class="left-social">
			<el-col :span="2" :offset="6">
				<i class="iconfont icon-github"></i>
			</el-col>
			<el-col :span="2" :offset="3">
				<i class="iconfont icon-weibo"></i>
			</el-col>
			<el-col :span="2" :offset="3">
				<i class="iconfont icon-weixin1"></i>
			</el-col>
		</el-row> -->
		<el-row class="left-social">
			<el-col :span="24">
				<i class="iconfont icon-github"></i>
			</el-col>
		</el-row>
		<el-row class="left-social">
			<el-col :span="24">
				<i class="iconfont icon-weibo"></i>
			</el-col>
		</el-row>
		<el-row class="left-social">
			<el-col :span="24">
				<i class="iconfont icon-weixin"></i>
			</el-col>
		</el-row>
	</div>
</template>

<script>
</script>

<style scoped>
	@import url("../../../static/css/leftnav.css");
</style>
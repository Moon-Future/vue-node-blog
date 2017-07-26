<template>
	<div class="blog-home">
		<div class="blog-main">
			<div class="blog-avatar">
				<img src="../../../static/images/head1.jpg" alt="" />
			</div>
			<div class="blog-nav">
				<ul>
					<li><router-link to="/blog">blog</router-link></li>
					<li><router-link to="/about">about</router-link></li>
					<li><router-link to="/comment">comment</router-link></li>
					<li><router-link to="/contact">contact</router-link></li>
				</ul>
			</div>
			<div class="blog-sear">
				<el-input placeholder="sear" icon="search"></el-input>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Home'
	}
</script>

<style>
	@import url("../../../static/css/home.css");
</style>
<template>
	<div class="blog-home">
		<div class="blog-main">
			<div class="blog-avatar">
				<div @click="gotoAdmin">
					<img src="../../../static/images/head1.jpg" alt="" />
				</div>
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
    name: 'Home',
    methods: {
      gotoAdmin() {
        this.$http.get('/api/getSession')
          .then((res) => {
            res.data === false ? this.$router.push('/login') : this.$router.push('/admin');
          })
          .catch((err) => {
            throw err;
          })
      }
    }
	}
</script>

<style scoped>
	.blog-home{
		background: #5E7382;
		color: #fff;
		width: 100%;
		height: 100%;
		background: url("../../../static/images/pic1.jpg") no-repeat;
	}
	.blog-main{
		position: absolute;
		left: 50%;
		top: 50%;
		width: 400px;
		height: 200px;
		margin-left: -200px;
		margin-top: -100px;
		/*background: #008000;*/
	}
	.blog-avatar{
		width: 100px;
		height: 100px;
		position: relative;
		left: 50%;
		margin-left: -50px;
	}
	.blog-avatar img{
		width: 100%;
		border-radius: 50%;
		cursor: pointer;
	}
	.blog-nav{
		position: absolute;
		width: 100%;
		color: #fff;
	}
	.blog-nav a{
		text-decoration: none;
		color: #fff;
	}
	.blog-nav ul{
		list-style-type: none;
		padding: 0;
	}
	.blog-nav ul li{
		display: inline-block;
		cursor: pointer;
		padding: 0 10px 5px 10px;
	}
	.blog-nav ul li:hover{
		border-bottom: 3px solid #20a0ff;
	}
	.blog-sear{
		position: absolute;
		width: 100%;
		bottom: 0;
	}
	.blog-sear i.el-icon-search{
		cursor: pointer;
	}
</style>

<template>
	<div>
		<!-- <article class="article-detail markdown-body" v-html="article"></article> -->
		<Comment></Comment>
	</div>
</template>

<script>
	import marked from 'marked'
	import axios from 'axios'
	import Comment from './Comment'
	marked.setOptions({
	  	highlight: function (code) {
			return require('highlight.js').highlightAuto(code).value;
		}
	});
	export default {
		name: 'article',
		components: {
			Comment
		},
		data() {
			return {
				article: ''
			}
		},
		created() {
			axios.get('../../../static/README.md')
				.then((res) => {
					var mdData = res.data;
					this.article = marked(mdData);
				})
				.catch((err) => {
					console.log(err);
				})
		}
	}
</script>

<style scoped>
	.article-detail{
		padding: 20px;
		background: #fff;
		text-align: left; 
	}
</style>
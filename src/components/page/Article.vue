<template>
	<div>
		<leftNav></leftNav>
		<!--<catalog></catalog>-->
		<!--<mHeader></mHeader>-->
		<router-view></router-view>
	</div>
</template>

<script>
	import leftNav from '../common/leftNav'
//	import catalog from '../common/catalog'
//	import mHeader from '../common/Header'
	export default {
		name: 'Article',
		components: {
			leftNav
		},
	}
	
</script>

<style scoped>
	/*@import url("../../../static/css/article.css");*/
</style>
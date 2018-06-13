<template>
	<div>
		<div class="father-area">
			id: <input type="text" v-model="getId">
			title: <input type="text" v-model="getTitle">
			tag: <input type="text" v-model="getTag">

			<!-- id: <input type="text" v-model="currentArticle.id">
			title: <input type="text" v-model="currentArticle.title">
			tag: <input type="text" v-model="currentArticle.tag"> -->
		</div>
		<div class="child-area">
			<Leftnav></Leftnav>
		</div>
	</div>
</template>

<script>
	import Leftnav from '../common/LeftNavItem'
	import store from '../../store/demo'
	import { mapState } from 'vuex';
	export default {
		name: 'blog',
		data() {
			return {
				message: 'father message'
			}
		},
		components: {
			Leftnav
		},
		methods: {

		},
		computed: {
			getId() {
				console.log(this.currentArticle);
				return store.state.currentArticle.id
			},
			getTitle() {
				return store.state.currentArticle.title
			},
			getTag() {
				return store.state.currentArticle.tag
			},
			...mapState(['currentArticle'])
		}
	}
</script>

<style scoped>
	.father-area {
		background-color: aqua;
		padding: 10px;
	}
	.child-area {
		background-color: bisque;
		padding: 10px;
	}
</style>


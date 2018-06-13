<template>
	<div>
		<label for="id">id</label><input type="text" id="id">
		<label for="title">title</label><input type="text" id="title">
		<label for="tag">tag</label><input type="text" id="tag">
	</div>
</template>

<script>
	export default {
		name: 'LeftNav',
		props: ['childMes'],
		methods: {
			toParent() {
				this.$emit('mesFunc', 'from children')
				console.log(this.$parent);
			}
		}
	}
</script>

<style lang="scss">

</style>

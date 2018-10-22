<template>
  <div class="home">
    <top-header></top-header>
    <div class="blog-list">
      <div v-for="(item, i) in data" :key="i">{{ item }}</div>
      <div v-for="(item, i) in data" :key="i">{{ item }}</div>
      <div v-for="(item, i) in data" :key="i">{{ item }}</div>
    </div>
  </div>
</template>

<script>
  import TopHeader from '@/components/front/TopHeader'
  export default {
    name: 'home',
    data() {
      return {
        data: [1,2,3,4,5,6,7,8,9,10,11,12,13,15]
      }
    },
    components: {
      TopHeader
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/css/variable.scss';
  .home {
    color: $color-black;
  }
  .blog-list {
    background: $color-white;
    margin-top: 520px;
  }
</style>


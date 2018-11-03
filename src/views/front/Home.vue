<template>
  <div class="home">
    <top-header></top-header>
    <div class="content-container">
      <article-list></article-list>
    </div>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
  import TopHeader from '@/components/front/TopHeader'
  import BottomFooter from '@/components/front/BottomFooter'
  import ArticleList from '@/components/front/ArticleList'
  export default {
    name: 'home',
    data() {
      return {
        data: [1,2,3,4,5,6,7,8,9,10,11,12,13,15]
      }
    },
    components: {
      TopHeader,
      BottomFooter,
      ArticleList
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/css/variable.scss';
  .home {
    color: $color-black;
  }
  .content-container {
    background: url('../../assets/bg.jpg');
    margin-top: 520px;
    height: 1000px;
    padding: 20px 30px;
  }
</style>


<template>
  <div class="home">
    <div class="background-wrapper">
      <div class="background"></div>
      <!-- <div class="txt">
        <p class="first-line">心有猛虎</p>
        <p class="second-line">细嗅蔷薇</p>
      </div> -->
    </div>
    <div class="content-container" ref="contentContainer">
      <article-list></article-list>
      <right-search></right-search>
    </div>
  </div>
</template>

<script>
  import ArticleList from '@/components/front/ArticleList'
  import RightSearch from '@/components/front/RightSearch'
  export default {
    name: 'home',
    data() {
      return {
        
      }
    },
    // mounted() {
    //   this.$refs.contentContainer.style.minHeight = (document.documentElement.clientHeight - 50) + 'px'
    // },
    components: {
      ArticleList,
      RightSearch
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/css/variable.scss';
  .home {
    color: $color-black;
    height: 100%;
    width: 100%;
  }
  .background-wrapper {
    .background {
      width: 100%;
      background: url(https://source.unsplash.com/1360x520/daily) no-repeat;
      background-size: cover;
      background-attachment: fixed;
      height: 520px;
    }
    .txt {
      position: fixed;
      top: 50%;
      width: 100%;
      color: $color-white;
      font-size: 32px;
      font-family: KaiTi, SimSun;
      .first-line {
        text-indent: -50px;
      }
      .second-line {
        text-indent: 50px;
      }
    }
  }
  .content-container {
    padding-top: 520px;
    padding: 20px 30px;
    display: flex;
  }
</style>


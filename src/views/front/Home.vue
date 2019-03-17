<template>
  <div class="home">
    <div class="background-wrapper" v-if="!mobileFlag">
      <div class="background" ref="background">
        <div class="txt">
          <p class="first-line">心有猛虎</p>
          <p class="second-line">细嗅蔷薇</p>
        </div>
      </div>
    </div>
    <div class="content-container" :class="{mobile: mobileFlag}" ref="contentContainer">
      <article-list></article-list>
      <!-- <right-search></right-search> -->
    </div>
  </div>
</template>

<script>
  import ArticleList from '@/components/front/ArticleList'
  import RightSearch from '@/components/front/RightSearch'
  import { mapGetters } from 'vuex'
  export default {
    name: 'home',
    props: ['resize'],
    computed: {
      ...mapGetters([
        'mobileFlag'
      ])
    },
    mounted() {
      if (!this.mobileFlag) {
        this.setHeight()
      }
    },
    methods: {
      setHeight(flag = false) {
        const width = document.documentElement.clientWidth
        const height = document.documentElement.clientHeight
        if (!flag) {
          // this.$refs.background.style.backgroundImage = `url(https://source.unsplash.com/1360x768/daily)`
          // this.$refs.background.style.backgroundImage = this.bgImg
        }
        this.$refs.background.style.height = height + 'px'
        this.$refs.contentContainer.style.minHeight = (height - 115) + 'px'
      }
    },
    watch: {
      resize() {
        if (this.resize) {
          if (!this.mobileFlag) {
            this.setHeight()
          }
        }
      }
    },
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
      background: url('../../assets/bg-3.jpg') no-repeat;
      background-size: cover;
      background-attachment: fixed;
    }
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
  .content-container {
    padding: 20px 30px;
    display: flex;
    position: relative;
    &.mobile {
      padding: initial;
    }
  }
</style>


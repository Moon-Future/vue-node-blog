<template>
  <div class="container">
    <top-header></top-header>
    <router-view/>
    <bottom-footer></bottom-footer>
    <div class="back-to-top" v-show="topShow" @click="backToTop">
      <icon-font :icon="topIcon" fontSize="42"></icon-font>
    </div>
  </div>
</template>

<script>
  import IconFont from '@/components/Iconfont'
  import TopHeader from '@/components/front/TopHeader'
  import BottomFooter from '@/components/front/BottomFooter'
  export default {
    name: 'container',
    data() {
      return {
        topShow: false,
        topIcon: 'icon-top-static'
      }
    },
    mounted(){
      window.addEventListener('scroll', this.bodyScroll)
    },
    methods: {
      bodyScroll() {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        this.topShow = scrollTop > 500 ? true : false
      },
      backToTop() {
        this.topIcon = 'icon-top-start'
        this.animateToTop()
      },
      animateToTop() {
        let timer = setInterval(() => {
          const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          const ispeed = Math.floor(-scrollTop / 6);
          if( scrollTop === 0 ){
            this.topIcon = 'icon-top-static'
            clearInterval(timer);
          }
          document.documentElement.scrollTop = document.body.scrollTop = scrollTop + ispeed;
        }, 30)
      }
    },
    components: {
      TopHeader,
      BottomFooter,
      IconFont
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/css/variable.scss';
  .container {
    color: $color-black;
    height: 100%;
    .back-to-top {
      position: fixed;
      bottom: 32px;
      right: 20px;
      cursor: pointer;
    }
  }
</style>


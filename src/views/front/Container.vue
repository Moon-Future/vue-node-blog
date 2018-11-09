<template>
  <div class="container" ref="container">
    <top-header @playVideo="playVideo"></top-header>
    <bread-crumb></bread-crumb>
    <div class="view-wrapper" :class="{childPage: !homeFlag}" ref="viewWrapper">
      <router-view v-if="!$route.meta.keepAlive" :resize="resize"/>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" :resize="resize"/>
      </keep-alive>
    </div>
    <bottom-footer></bottom-footer>
    <div class="back-to-top" v-show="topShow" @click="backToTop">
      <icon-font :icon="topIcon" fontSize="42"></icon-font>
    </div>
    <div class="bg-video" ref="bgVideo">
      <video v-if="videoFlag" autoplay loop muted ref="video">
        <source :src="video" type="video/mp4">
      </video>
      <img v-else class="bg-picture" src="../../assets/bg-3.jpg" alt="">
    </div>
  </div>
</template>

<script>
  import IconFont from '@/components/Iconfont'
  import TopHeader from '@/components/front/TopHeader'
  import BreadCrumb from '@/components/front/BreadCrumb'
  import BottomFooter from '@/components/front/BottomFooter'
  export default {
    name: 'container',
    data() {
      return {
        topShow: false,
        topIcon: 'icon-top-static',
        video: require('@/assets/bg-video.mp4'),
        videoFlag: false,
        homeFlag: true,
        resize: false
      }
    },
    mounted() {
      this.setHeight()
      window.addEventListener('scroll', this.bodyScroll)
      window.onresize = () => {
        clearTimeout(this.onresizeTime)
        this.onresizeTime = setTimeout(() => {
          this.setHeight()
          this.resize = true
          clearTimeout(this.resizeTimer)
          this.resizeTimer = setTimeout(() => {
            this.resize = false
          }, 100)
        }, 500)
      }
    },
    methods: {
      setHeight() {
        this.height = document.documentElement.clientHeight
        this.$refs.container.style.minHeight = this.height + 'px'
        this.$refs.viewWrapper.style.minHeight = (this.height - 32) + 'px'
        this.$refs.bgVideo.style.height = (this.height - 50) + 'px'
        this.$refs.bgVideo.style.top = this.height + 'px'
        this.routeWatch()
        this.bodyScroll()
      },
      routeWatch() {
        if (this.$route.path === '/') {
          this.$refs.bgVideo.style.position = 'absolute'
          this.$refs.bgVideo.style.top = this.height + 'px'
          this.homeFlag = true
        } else {
          this.$refs.bgVideo.style.position = 'fixed'
          this.$refs.bgVideo.style.top = '50px'
          this.homeFlag = false
        }
      },
      bodyScroll() {
        const viewWrapper = this.$refs.viewWrapper
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        this.topShow = scrollTop > 500 ? true : false
        if (this.$route.path === '/') {
          if (scrollTop <= this.height - 50) {
            this.$refs.bgVideo.style.position = 'absolute'
            this.$refs.bgVideo.style.top = this.height + 'px'
          } else {
            this.$refs.bgVideo.style.position = 'fixed'
            this.$refs.bgVideo.style.top = '50px'
          }
        }
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
      },
      playVideo(flag) {
        if (flag) {
          this.$refs.video.play()
        } else {
          this.$refs.video.pause()
        }
      }
    },
    watch: {
      $route() {
        this.routeWatch()
      }
    },
    components: {
      TopHeader,
      BottomFooter,
      IconFont,
      BreadCrumb
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/css/variable.scss';
  .container {
    // background: url('../../assets/bg.jpg');
    color: $color-black;
    min-height: 100%;
    width: 100%;
    .view-wrapper {
      opacity: 0.8;
      margin: auto;
      min-height: 100%;
      box-sizing: border-box;
      &.childPage {
        background: $color-white;
        width: 80%;
        padding: 20px;
        padding-top: 80px;
        padding-bottom: 32px;
      }
    }
    .back-to-top {
      position: fixed;
      bottom: 32px;
      right: 20px;
      cursor: pointer;
    }
    .bg-video {
      position: absolute;
      // top: 520px;
      height: 100%;
      z-index: -1;
      video {
        object-fit: fill;
        height: 100%;
        width: 100%;
      }
    }
    .bg-picture {
      width: 100%;
    }
  }
</style>


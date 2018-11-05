<template>
  <div class="container" ref="container">
    <top-header @playVideo="playVideo"></top-header>
    <router-view/>
    <bottom-footer></bottom-footer>
    <div class="back-to-top" v-show="topShow" @click="backToTop">
      <icon-font :icon="topIcon" fontSize="42"></icon-font>
    </div>
    <div class="bg-video" ref="bgVideo">
      <video autoplay loop muted ref="video">
        <source :src="video" type="video/mp4">
      </video>
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
        topIcon: 'icon-top-static',
        video: require('@/assets/bg-video.mp4')
      }
    },
    mounted(){
      window.addEventListener('scroll', this.bodyScroll)
      this.$refs.container.style.minHeight = document.documentElement.clientHeight + 'px'
    },
    methods: {
      bodyScroll() {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        this.topShow = scrollTop > 500 ? true : false
        if (this.$route.path === '/') {
          if (scrollTop >= 520) {
            this.$refs.bgVideo.style.position = 'fixed'
            this.$refs.bgVideo.style.top = '0'
          } else {
            this.$refs.bgVideo.style.position = 'absolute'
            this.$refs.bgVideo.style.top = '520px'
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
        if (this.$route.path === '/') {
          this.$refs.bgVideo.style.position = 'absolute'
          this.$refs.bgVideo.style.top = '520px'
        } else {
          this.$refs.bgVideo.style.position = 'fixed'
          this.$refs.bgVideo.style.top = '0'
        }
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
    // background: url('../../assets/bg.jpg');
    color: $color-black;
    height: 100%;
    .back-to-top {
      position: fixed;
      bottom: 32px;
      right: 20px;
      cursor: pointer;
    }
    .bg-video {
      position: absolute;
      top: 520px;
      height: 100%;
      z-index: -1;
      video {
        object-fit: fill;
        height: 100%;
        width: 100%;
      }
    }
  }
</style>


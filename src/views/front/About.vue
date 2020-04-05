<template>
  <div class="about">
    <div class="preloader animated fadeOut" v-if="!loader">
      <div class="loader">Loading...</div>
    </div>

    <img class="img-background" ref="imgBackground" src="https://cl8023-1255423800.cos.ap-guangzhou.myqcloud.com/about-1.png" alt="">

    <video class="video-background" autoplay loop muted plays-inline>
        <source src="https://cl8023-1255423800.cos.ap-guangzhou.myqcloud.com/about-2.mp4" type="video/mp4">
    </video>

    <div class="about-content">
      <div class="about-item about-self about-item-active" ref="item1">
        <div class="animated fadeInDown">
          <h1 class="animated heartBeat">HELLO</h1>
          <p class="desc">{{ workText }}</p>
          <div class="contact">
            <a class="contatc-item" href="https://github.com/Moon-Future/vue-node-blog" target="_blank">
              <icon-font class="social-icon" icon="icon-github" fontSize="42"></icon-font>
            </a>
            <el-popover
              placement="bottom"
              trigger="hover">
              <img class="wechat" src="../../assets/Wechat.jpg" alt="">
              <template slot="reference">
                <icon-font class="social-icon" icon="icon-weixin-active" fontSize="42"></icon-font>
              </template>
            </el-popover>
          </div>
        </div>
      </div>

      <div class="about-item about-self" ref="item2">
        <div class="animated fadeInDown">
          <h1>HELLO</h1>
          <p class="desc">{{ workText }}</p>
          <div class="contact">
            <a class="contatc-item" href="https://github.com/Moon-Future/vue-node-blog" target="_blank">
              <icon-font class="social-icon" icon="icon-github" fontSize="42"></icon-font>
            </a>
            <el-popover
              placement="bottom"
              trigger="hover">
              <img class="wechat" src="../../assets/Wechat.jpg" alt="">
              <template slot="reference">
                <icon-font class="social-icon" icon="icon-weixin-active" fontSize="42"></icon-font>
              </template>
            </el-popover>
          </div>
        </div>
      </div>

      <div class="about-item about-self about-item-3" ref="item3">
        <div class="animated fadeInDown">
          <h1>HELLO</h1>
          <p class="desc">{{ workText }}</p>
          <div class="contact">
            <a class="contatc-item" href="https://github.com/Moon-Future/vue-node-blog" target="_blank">
              <icon-font class="social-icon" icon="icon-github" fontSize="42"></icon-font>
            </a>
            <el-popover
              placement="bottom"
              trigger="hover">
              <img class="wechat" src="../../assets/Wechat.jpg" alt="">
              <template slot="reference">
                <icon-font class="social-icon" icon="icon-weixin-active" fontSize="42"></icon-font>
              </template>
            </el-popover>
          </div>
        </div>
      </div>
    </div>

    <div>

    </div>
  </div>
</template>

<script>
  import IconFont from '@/components/Iconfont'
  export default {
    data() {
      return {
        work: '程序不过是梦， 生于无形无象的禅中， 我们只是那做梦的人。',
        workText: '',
        loader: false
      }
    },
    components: {
      IconFont
    },
    created() {
      this.writeText()
    },
    mounted() {
      const self = this
      this.$refs.imgBackground.onload = function() {
        setTimeout(() => {
          self.loader = true
        }, 800);
      }
    },
    methods: {
      writeText() {
        let arr = this.work.split('')
        let timer = setInterval(() => {
          if (arr.length === 0) {
            clearInterval(timer)
          } else {
            this.workText += arr.shift()
          }
        }, 100)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/css/variable.scss';
  .about {
    height: 100%;
    // background: url('https://cl8023-1255423800.cos.ap-guangzhou.myqcloud.com/about-1.png') no-repeat;
    // background-size: cover;
    // background-attachment: fixed;
    display: flex;
    align-items: center;
  }
  .preloader {
    position: fixed;
    background: #000;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    z-index: 9998;
  }
  .loader {
    position: absolute;
    border-left: 2px solid #ffffff;
    border-top: 2px solid rgba(255, 255, 255, 0.2);
    border-right: 2px solid rgba(255, 255, 255, 0.2);
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    height: 46px;
    width: 46px;
    left: 50%;
    top: 50%;
    margin: -23px 0 0 -23px;
    text-indent: -9999em;
    font-size: 10px;
    z-index: 9999;
    animation: load 0.8s infinite linear;
  }
  .loader, .loader:after {
    border-radius: 50%;
    width: 46px;
    height: 46px;
  }
  @keyframes load {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  .img-background {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .video-background {
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
  }
  .about-content {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99;
    margin: auto;
    color: #FFF;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .about-item {
    position: absolute;
    background: #000;
    opacity: 0.3;
    width: 60%;
    height: 60%;
    border-radius: 4px;
  }

  .about-self {
    display: flex;
    flex-flow: column;
    justify-content: center;
    h1 {
      font-size: 72px;
      font-weight: 700;
      font-family: 'Roboto Slab';
    }
    .desc {
      font-size: 20px;
      margin: 20px;
    }
    .contatc-item {
      margin-right: 20px;
    }
  }

  .about-item-active {
    
  }
</style>


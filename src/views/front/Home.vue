<template>
  <div class="home">
    <top-header ref="topHeader"></top-header>
    <div :class="['preloader', {'displayn': imgLoad || mobileFlag}]" :style="{height: height}" >
      <div :class="['loader', {'displayn': loadered}]" ></div>
    </div>
    <div class="background-wrapper" v-if="!mobileFlag">
      <img class="background" src="https://cl8023-1255423800.cos.ap-guangzhou.myqcloud.com/bg.jpg" alt="" ref="background">
      <div class="txt">
        <p>{{ verseText }} <span :class="{'dom-hidden': finished}">|</span> </p>
      </div>
    </div>
    <div :class="['content-container', {'displayn': !imgLoad && !mobileFlag, mobile: mobileFlag}]" ref="contentContainer">
      <div class="content-container-1">
        <article-list></article-list>
        <right-content></right-content>
      </div>
    </div>
    <bottom-footer v-if="!mobileFlag"></bottom-footer>
  </div>
</template>

<script>
  import TopHeader from '@/components/front/TopHeader'
  import BottomFooter from '@/components/front/BottomFooter'
  import ArticleList from '@/components/front/ArticleList'
  import RightContent from '@/components/front/RightContent'
  import IconFont from '@/components/Iconfont'
  import { mapGetters, mapMutations } from 'vuex'
  const jinrishici = require('jinrishici')
  export default {
    name: 'home',
    props: ['resize'],
    data() {
      return {
        mobileFlag: false,
        verse: '帝里重清明，人心自愁思。',
        verseText: '',
        finished: false,
        imgLoad: false,
        loadered: false,
        height: 0
        // verse: ''
      }
    },
    created() {
      this.setMobile()
    },
    mounted() {
      if (!this.mobileFlag) {
        this.setHeight()
        jinrishici.load(result => {
          this.verse = result.data.content
          this.writeText()
        })
      }
    },
    methods: {
      setMobile() {
        const width = document.documentElement.clientWidth
        if (width <= 736) {
          this.mobileFlag = true
        } else {
          this.mobileFlag = false
        }
        this.setMobileFlag(this.mobileFlag)
      },
      setHeight(flag = false) {
        let height = document.documentElement.clientHeight
        const width = document.documentElement.clientWidth
        const self = this
        this.height = height + 'px'
        this.$refs.background.style.height = height + 'px'
        this.$refs.contentContainer.style.minHeight = height + 'px'
        this.$refs.background.onload = function() {
          self.loadered = true
          let timer = setInterval(() => {
            if (height > 0) {
              height -= 20
              self.height = height + 'px'
            } else {
              self.imgLoad = true
              clearInterval(timer)
            }
          }, 10)
        }
      },
      writeText() {
        let arr = this.verse.split('')
        let timer = setInterval(() => {
          if (arr.length === 0) {
            clearInterval(timer)
            this.finished = true
          } else {
            this.verseText += arr.shift()
          }
        }, 150)
      },
      ...mapMutations({
        setMobileFlag: 'SET_MOBILE_FLAG'
      }),
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
      TopHeader,
      BottomFooter,
      ArticleList,
      IconFont,
      RightContent
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
    background: $color-gray-1;
    .background {
      width: 100%;
      object-fit: cover;
      // background: url('https://cl8023-1255423800.cos.ap-guangzhou.myqcloud.com/bg.jpg') no-repeat;
      // background-size: cover;
      // background-attachment: fixed;
      // display: flex;
      // align-items: center;
    }
  }
  .txt {
    position: fixed;
    width: 100%;
    color: $color-white;
    font-size: 32px;
    font-family: KaiTi, SimSun;
    top: 50%;
    margin-top: -32px;
    .first-line {
      text-indent: -50px;
    }
    .second-line {
      text-indent: 50px;
    }
  }
  .social-wrapper {
    margin-top: 10px;
    .social-icon {
      cursor: pointer;
      margin-right: 10px;
      &:hover {
        color: $color-blue;
      }
    }
    .wechat {
      width: 200px;
      height: 200px;;
    }
  }
  .content-container {
    padding: 20px 30px;
    background: $color-gray-1;
    display: flex;
    position: relative;
    box-sizing: border-box;
    .content-container-1 {
      width: 80%;
      display: flex;
      margin: 0 auto;
    }
    &.mobile {
      padding: initial;
      .content-container-1 {
        width: 95%;
      }
    }
  }
  .dom-hidden {
    visibility: hidden;
  }
  .preloader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 99999999;
  }
  .displayn {
    display: none;
  }
  .loader {
    position: absolute;
    left: 53%;
    top: 53%;
    background-repeat: no-repeat;
    background-position: center;
    margin: -100px 0 0 -100px;
    border: 10px solid #f3f3f3;
    border-radius: 50%;
    border-top: 10px solid #ed553b;
    border-bottom: 10px solid #232d39;
    width: 90px;
    height: 90px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>


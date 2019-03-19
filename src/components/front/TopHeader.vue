<template>
  <div class="header-nav" ref="headerNav" :class="{mobile: mobileFlag}">
    <ul>
      <li v-for="(item, i) in navList" :key="i">
        <router-link tag="a" :to="item.to">
          {{ item.name }}
          <div class="nav-border" :class="i === activeIndex ? 'active' : ''" ></div>
        </router-link>
      </li>
      

      <!-- <router-link tag="li" to="/">
        <p>主页</p>
        <div class="nav-border"></div>
      </router-link>
      <router-link tag="li" to="/catalog">
        <p>目录</p>
        <div class="nav-border"></div>
      </router-link>
      <li v-if="!mobileFlag" class="avatar"><img class="play" :class="{pause: !playing}" :src="`//${avatar}`" alt=""></li>
      <router-link tag="li" to="/other">
        <p>其他</p>
        <div class="nav-border"></div>
      </router-link>
      <router-link tag="li" to="/about">
        <p>关于</p>
        <div class="nav-border"></div>
      </router-link> -->
    </ul>
  </div>
</template>

<script>
  import { apiUrl } from '@/serviceAPI.config.js'
  import { mapGetters } from 'vuex'
  export default {
    name: 'topHeader',
    data() {
      return {
        playing: false,
        avatar: 'cl8023-1255423800.cos.ap-guangzhou.myqcloud.com/avatar/default.jpg',
        navList: [
          {name: '主页', to: '/'},
          {name: '目录', to: '/catalog'},
          {name: '主页', to: '/'},
          {name: '其他', to: '/other'},
          {name: '关于', to: '/about'}
        ],
        activeIndex: 0
      }
    },
    computed: {
      ...mapGetters([
        'mobileFlag'
      ])
    },
    created() {
      this.$http.post(apiUrl.getSession).then(res => {
        if (res.data.code === 200) {
          const userInfo = res.data.message
          this.avatar = userInfo.avatar
        }
      })
    },
    mounted() {
      window.addEventListener('scroll', this.bodyScroll)
    },
    methods: {
      palyVideo() {
        this.playing = !this.playing
        this.$emit('playVideo', this.playing)
      },
      setWidth(width) {
        this.$refs.headerNav.style.width = width
      },
      bodyScroll() {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        const headerNav = this.$refs.headerNav
        if (scrollTop >= 150) {
          headerNav.style.top = '-55px';
        } else {
          headerNav.style.top = '0';
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/css/variable.scss';
  .header-nav {
    position: fixed;
    top: 0;
    transition: top 0.6s ease;
    width: 100%;
    height: 50px;
    // background: $color-deepgray;
    background: transparent;
    color: $color-white;
    // border-bottom: 5px solid #ddd;
    display: flex;
    justify-content: center;
    z-index: 100;
    ul {
      display: flex;
      justify-content: space-around;
      // width: 50%;
      line-height: 50px;
      li {
        width: 125px;
        cursor: pointer;
        &.avatar img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          &.play {
            animation: rotate 15s linear infinite;
            animation-play-state: running;
          }
          &.pause {
            animation-play-state: paused;
          }
        }
        a {
          color: $color-white;
          width: 100%;
          display: inline-block;
          font-size: 14px;
          &:hover {
            .nav-border {
              width: 100%;
              transition: width 0.6s ease;
            }
          }
        }
        .nav-border {
          height: 3px;
          background-color: $color-white;
          width: 0;
          transition: width 0.6s ease;
          &.active {
            width: 100%;
          }
        }
      }
    }
    // 适应移动端
    &.mobile {
      ul {
        width: 100%;
        justify-content: flex-end;
        li {
          margin: 0 10px;
        }
      }
    }
  }
  @keyframes rotate {
    from {transform: rotate(0)}
    to {transform: rotate(360deg)}
  }
</style>
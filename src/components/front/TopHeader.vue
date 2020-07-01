<template>
  <div class="header-nav" ref="headerNav" :class="{mobile: mobileFlag, 'content-nav': contentNav}">
    <ul>
      <li v-for="(item, i) in navList" :key="i">
        <router-link tag="a" :to="item.to">
          {{ item.name }}
          <div class="nav-border" :class="i === activeIndex ? 'active' : ''" ></div>
        </router-link>
      </li>
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
          // {name: 'BLOG', to: '/'},
          // {name: '其他', to: '/'},
          {name: '关于', to: '/about'}
        ],
        activeIndex: -1,
        activeMap: {
          'Home': 0,
          'Catalog': 1,
          'Article': -1,
          'Other': 3,
          'About': 4
        },
        contentNav: false
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
      this.headerStyle()
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
        if (this.contentNav) {
          return
        }
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        const headerNav = this.$refs.headerNav
        if (headerNav) {
          if (scrollTop >= 150) {
            headerNav.style.top = '-55px'
          } else {
            headerNav.style.top = '0'
          }
        }
      },
      headerStyle() {
        const name = this.$route.name
        if (name === 'Home') {
          this.contentNav = false
        } else {
          this.contentNav = true
          this.$refs.headerNav.style.top = '0'
        }
        this.activeIndex = this.activeMap[name]
      }
    },
    watch: {
      $route() {
        this.headerStyle()
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
    background: transparent;
    color: $color-white;
    display: flex;
    justify-content: center;
    z-index: 100;
    ul {
      display: flex;
      justify-content: space-around;
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
    &.content-nav {
      background-color: #fff;
      color: $color-black;
      border-bottom: 1px solid #ddd;
      a {
        color: $color-black;
      }
      .nav-border {
        background-color: $color-red;
      }
    }
    // 适应移动端
    &.mobile {
      background: $color-white;
      ul {
        width: 100%;
        justify-content: flex-end;
        li {
          margin: 0 10px;
        }
        a {
          color: $color-black;
        }
      }
      .nav-border {
        &.active {
          background-color: $color-red;
        }
      }
    }
  }
  @keyframes rotate {
    from {transform: rotate(0)}
    to {transform: rotate(360deg)}
  }
</style>
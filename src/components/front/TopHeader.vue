<template>
  <div class="header-nav" ref=headerNav :class="{mobile: mobileFlag}">
    <ul>
      <router-link tag="li" to="/">主页</router-link>
      <router-link tag="li" to="/catalog">目录</router-link>
      <li v-if="!mobileFlag" class="avatar"><img class="play" :class="{pause: !playing}" :src="`//${avatar}`" alt=""></li>
      <router-link tag="li" to="/other">其他</router-link>
      <router-link tag="li" to="/about">关于</router-link>
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
        avatar: 'cl8023-1255423800.cos.ap-guangzhou.myqcloud.com/avatar/default.jpg'
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
    methods: {
      palyVideo() {
        this.playing = !this.playing
        this.$emit('playVideo', this.playing)
      },
      setWidth(width) {
        this.$refs.headerNav.style.width = width
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/css/variable.scss';
  .header-nav {
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    background: $color-deepgray;
    color: $color-white;
    display: flex;
    justify-content: center;
    z-index: 100;
    ul {
      display: flex;
      justify-content: space-around;
      width: 50%;
      line-height: 50px;
      li {
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
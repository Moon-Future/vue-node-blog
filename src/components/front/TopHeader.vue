<template>
  <div class="header-nav">
    <ul>
      <router-link tag="li" to="/">主页</router-link>
      <router-link tag="li" to="/catalog">目录</router-link>
      <li class="avatar"><img class="play" :class="{pause: !playing}" src="../../assets/avatar.jpg" alt="" @click="palyVideo"></li>
      <router-link tag="li" to="/other">其他</router-link>
      <router-link tag="li" to="/about">关于</router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'topHeader',
    data() {
      return {
        playing: true
      }
    },
    methods: {
      palyVideo() {
        this.playing = !this.playing
        this.$emit('playVideo', this.playing)
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
  }
  @keyframes rotate {
    from {transform: rotate(0)}
    to {transform: rotate(360deg)}
  }
</style>
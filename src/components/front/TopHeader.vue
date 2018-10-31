<template>
  <div class="header">
    <div class="background">
      <img v-lazy="bgimg" alt="">
      <div class="txt">
        <p class="first-line">心有猛虎</p>
        <p class="second-line">细嗅蔷薇</p>
      </div>
    </div>
    <div class="nav">
      <ul>
        <li>主页</li>
        <li>目录</li>
        <li class="avatar">
          <img src="../../assets/avatar.jpg" alt="" @click="login">
        </li>
        <li>其他</li>
        <li>关于</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'topHeader',
    data() {
      return {
        // bgimg: 'https://source.unsplash.com/random/1366x520/daily'
        bgimg: 'https://source.unsplash.com/random/1366x520'
      }
    },
    methods: {
      login() {
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/css/variable.scss';
  .background {
    position: fixed;
    top: 0;
    z-index: -1;
    width: 100%;
    img {
      width: 100%;
      height: 520px;
    }
    .txt {
      position: absolute;
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
  }
  .nav {
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    background: $color-deepgray;
    color: $color-white;
    display: flex;
    justify-content: center;
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
        }
      }
    }
  }
</style>
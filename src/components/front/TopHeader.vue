<template>
  <div class="header-nav">
    <ul>
      <router-link tag="li" to="/">主页</router-link>
      <router-link tag="li" to="/catalog">目录</router-link>
      <router-link tag="li" to="/login" class="avatar">
        <img src="../../assets/avatar.jpg" alt="">
      </router-link>
      <router-link tag="li" to="/other">其他</router-link>
      <router-link tag="li" to="/about">关于</router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'topHeader'
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
        }
      }
    }
  }
</style>
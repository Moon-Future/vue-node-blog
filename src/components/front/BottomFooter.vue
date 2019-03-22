<template>
  <div class="footer-containe">
    <div class="rights">
      <p>Copyright © 2017 - {{ new Date().getFullYear() }} ChenLiang's Blog</p>
    </div>
    <!-- 2017-12-01 上线至今 -->
    <div class="to-admin">
      <router-link tag="a" to="/login">后台登陆</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/common/css/variable.scss';
  .footer-containe {
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    color: $color-black;
    display: flex;
    justify-content: center;
    .rights {
      margin-right: 10px;
    }
    a {
      color: $color-black;
      &:hover {
        color: $color-blue;
      }
    }
  }
</style>

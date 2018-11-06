<template>
  <div class="footer-containe">
    <div class="rights">
      <p>Copyright © 2017 - {{ new Date().getFullYear() }} ChenLiang's Blog</p>
    </div>
    <div class="to-admin">
      <router-link to="/login">后台登陆</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/common/css/variable.scss';
  .footer-containe {
    height: 32px;
    margin-top: -32px;
    line-height: 32px;
    font-size: 12px;
    color: $color-white;
    display: flex;
    justify-content: center;
    .rights {
      margin-right: 10px;
    }
  }
</style>

<template>
  <div class="footer-containe">
    <div class="rights">
      <p>Copyright © 2017 - {{ new Date().getFullYear() }} ChenLiang's Blog</p>
    </div>
    <div class="to-admin">
      <router-link to="/login">后台登陆</router-link>
    </div>
    <div class="history-version">
      <a href="//version.cl8023.com">历史版本</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/common/css/variable.scss';
  .footer-containe {
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    color: $color-blue;
    display: flex;
    justify-content: center;
    .rights {
      margin-right: 10px;
    }
    .history-version {
      margin-left: 20px;
    }
  }
</style>

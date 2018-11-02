<template>
  <div class="footer-containe">
    <div class="rights">
      <p>Copyright © 2017 - {{ new Date().getFullYear() }} ChenLiang's Blog</p>
    </div>
  </div>
</template>
 
<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
  @import '@/common/css/variable.scss';
  .footer-containe {
    background-color: $color-deepgray;
    color: $color-white;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
  }
</style>

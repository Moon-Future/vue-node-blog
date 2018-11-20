<template>
  <div class="mask-screen" ref="maskScreen">

  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
  @import '@/common/css/variable.scss';
  .mask-screen {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: $color-deepgray;
    opacity: 0.5;
  }
</style>

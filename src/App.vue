<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import '@/common/css/reset.scss';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: auto;
    background: url('./assets/bg.jpg');
  }
</style>

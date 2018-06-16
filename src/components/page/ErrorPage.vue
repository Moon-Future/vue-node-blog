<template>
  <div class="error-page">
    <div class="header">
      <h1>Fantasy error page</h1>
    </div>
    <div class="w3-main">
      <div class="agile-info">
        <h2>404</h2>
        <h3>SORRY</h3>
        <p>The Page You're Looking for Was Not Found.</p>
        <router-link to="/">go back</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Error'
  }
</script>

<style scoped>
  @import '../../../static/css/ErrorPage.css';
  .error-page {
    height: 100%;
  }
</style>
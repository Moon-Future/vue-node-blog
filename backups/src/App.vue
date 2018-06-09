<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /* text-align: center; */
        color: #2c3e50;
        /*margin-top: 60px;*/
    }
    body, html, #app{
        margin: 0;
        padding: 0;
        height: 100%;
    }
    .iconfont {
        margin-right: 10px;
        cursor: pointer;
    }
    .catalog-search input {
        background-color: transparent;
        color: #fff;
    }
    .left-search input {
        background-color: transparent;
        color: #fff;
    }
</style>

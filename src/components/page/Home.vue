<template>
  <div class="blog-home">
    <div class="blog-main">
      <div class="blog-avatar">
        <div @click="gotoAdmin">
          <img :src="avatar" alt="" />
        </div>
      </div>
      <div class="blog-nav">
        <ul>
          <li><router-link to="/blog">blog</router-link></li>
        </ul>
      </div>
    </div>
    <div class="heart">
      <div class="heart-left"></div>
      <div class="heart-middle"></div>
      <div class="heart-right"></div>
    </div>
    <div class="area">
      <div class="area-left"></div>
      <div class="area-right"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        avatarRoot: '../../../../static/images/avatar/',
        avatar: '../../../../static/images/avatar/head2.jpg'
      }
    },
    beforeCreate() {

    },
    methods: {
      gotoAdmin() {

      }
    }
  }
</script>

<style scoped>
  .blog-home{
    background: #5E7382;
    color: #fff;
    width: 100%;
    height: 100%;
    overflow: hidden;
    /* background: url("../../../static/images/LOVE_HAND.png") no-repeat; */
  }
  .blog-main{
    z-index: 2;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 400px;
    height: 200px;
    margin-left: -200px;
    margin-top: -100px;
    /*background: #008000;*/
  }
  .blog-avatar{
    width: 100px;
    height: 100px;
    position: relative;
    left: 50%;
    margin-left: -50px;
    top: 45px;
  }
  .blog-avatar img{
    width: 100%;
    border-radius: 50%;
    cursor: pointer;
  }
  .blog-nav{
    position: absolute;
    width: 100%;
    color: #fff;
  }
  .blog-nav a{
    text-decoration: none;
    color: #fff;
  }
  .blog-nav ul{
    list-style-type: none;
    padding: 0;
    text-align: center;
  }
  .blog-nav ul li a{
    display: inline-block;
    cursor: pointer;
    padding: 0 5px 5px 5px;
  }
  .blog-nav ul li a:hover{
    /* border-bottom: 3px solid #20a0ff; */
    color: #20a0ff;
  }
  .blog-sear{
    position: absolute;
    width: 100%;
    bottom: 0;
  }
  .blog-sear i.el-icon-search{
    cursor: pointer;
  }

  .heart {
    z-index: 1;
    width: 180px;
    height: 160px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -90px;
    margin-top: -80px;
    -webkit-animation: shan 1.5s infinite alternate;
    animation: shan 1.5s infinite alternate;
  }

  @-webkit-keyframes shan {
    0% {
      opacity: 0.5;
      -webkit-transform: scale(0.8, 0.8);
      transform: scale(0.8, 0.8);
    }
    100% {
      opacity: 1;
    }
  }

  .heart div {
    position: absolute;
    width: 100px;
    height: 100px;
    background: #f52323;
  }

  .heart img {
    display: inline
  }

  .heart-left, .heart-right {
    border-radius: 50%;
  }
  .heart-left {
    left: 0;
  }
  .heart-right {
    left: 80px;
  }
  .heart-middle {
    -webkit-transform: rotate(135deg);
    left: 40px;
    top: 40px;
  }

  .area {
    width: 100%;
    height: 100%;
  }

  .area-left, .area-right {
    width: 50%;
    height: 100%;
    position: relative;
    display: block;
    float: left;
  }
  .area-left {
    background-color: #fab27b; 
  }
  .area-right {
    background-color: #cde6c7; 
  }
  .area-top, .area-bottom {
    width: 100%;
    height: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .area-top img {
    position: absolute;
    width: 80%;
  }
  .area-bottom {
    background: #3c1f40;
    text-align: center;
    font-size: 23em;
  }
  .area-bottom p {
    /* font-size: 23em; */
    font-size: 50%;
    margin: 0;
    display: inline;
    padding: 0 10px;
  }
</style>

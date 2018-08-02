<template>
  <div>
    <!--移动端-->
    <div class="m-header">
      <div class="clearfix">
        <div class="m-avatar">
          <img :src="getAvatar" alt="headPice" class="left-avatar" @click="gotoAdmin" />
          <p>我的博客我的博客我的博客我的博客</p>
        </div>
        <div class="md-menu">
          <el-menu mode="horizontal">
            <el-menu-item index="0"><i class="iconfont icon-wenzhang"></i>Article</el-menu-item>
            <el-menu-item index="1"><i class="iconfont icon-about"></i>About</el-menu-item>
            <el-menu-item index="2"><i class="iconfont icon-comments"></i>Comment</el-menu-item>
            <el-menu-item index="3"><i class="iconfont icon-icon3"></i>Contact</el-menu-item>
          </el-menu>
        </div>
        <div class="xs-menu">
          <i class="iconfont" :class="menuOpen ? 'icon-caidandakai' : 'icon-caidan'" @click="menuHandle"></i>
        </div>
      </div>
      <div class="m-detail" v-show="menuOpen">
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="0"><i class="iconfont icon-wenzhang"></i>Article</el-menu-item>
          <el-menu-item index="1"><i class="iconfont icon-about"></i>About</el-menu-item>
          <el-menu-item index="2"><i class="iconfont icon-comments"></i>Comment</el-menu-item>
          <el-menu-item index="3"><i class="iconfont icon-icon3"></i>Contact</el-menu-item>
        </el-menu>
      </div>
    </div>
    <!--PC端-->
    <div class="blog-header">
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/blog' }" @click.native="backBlog">Blog</el-breadcrumb-item>
        <el-breadcrumb-item to="" v-if="currentArticle.title">{{ currentArticle.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <i class="switch-type iconfont" :class="switchType ? 'icon-zhanshiguanli01' : 'icon-show'" @click="switchHandle"></i>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    props: ['avatar'],
    data() {
      return {
        avatarRoot: '../../../static/images/avatar/',
        menuOpen: false,
        switchType: false
      }
    },
    methods: {
      menuHandle() {
        this.menuOpen = !this.menuOpen;
      },
      switchHandle() {
        // this.switchType = !this.switchType;
        // this.boxSwitchType();
      },
      backBlog() {
        this.currentArticleHanle({'title': ''});
        this.crumbFlagHanle([{'index':2, 'newValue':false}]);
      },
      gotoAdmin() {
        this.$http.get('/api/getSession')
        .then((res) => {
          res.data === false ? this.$router.push('/login') : this.$router.push('/admin');
        })
        .catch((err) => {
          throw err;
        })
      },
      ...mapActions({
        crumbFlagHanle: 'crumbFlag',
        currentArticleHanle: 'currentArticle',
        boxSwitchType: 'boxSwitchType'
      })
    },
    computed: {
      ...mapState(['crumbFlag', 'currentArticle', 'boxCol']),
      getAvatar() {
        return this.avatarRoot + this.avatar;
      }
    }
  }
</script>

<style>
  .clearfix:after{
    content: '';
    display: block;
    clear: both;
  }
  
  .blog-header {
    padding: 20px;
    margin-bottom: 10px;
    margin-top: -20px;
  }
  
  .breadcrumb {
    float: left;
  }
  
  .switch-type {
    float: right;
    cursor: pointer;
  }
  
  .m-header {
    margin-top: -10px;
    height: 60px;
    margin-bottom: 10px;
  }
  
  .m-avatar {
    width: 200px;
    float: left;
  }
  
  .m-avatar img {
    float: left;
    width: 30%;
    margin-right: 10px;
    border-radius: 50%;
    cursor: pointer;
  }
  
  .m-avatar p {
    line-height: 30px;
    margin: 0;
  }
  
  .md-menu {
    float: right;
    display: none;
  }
  
  .md-menu ul {
    background: #fff;
  }
  
  .xs-menu {
    line-height: 60px;
    float: right;
    /*margin-right: 30px;*/
  }
  
  .m-detail {
    position: relative;
    width: 100%;
    /* opacity: 0.8; */
    color: #fff;
    z-index: 99;
    margin-top: 10px;
  }
  
  @media only screen and (min-width: 992px) {
    .m-header {
      display: none;
    }
  }
  
  @media only screen and (min-width: 768px) {
    .xs-menu,
    .m-detail {
      display: none;
    }
    
    .md-menu {
      display: block;
      
    }
  }
  
  @media only screen and (max-width: 992px) {
    .blog-header {
      display: none;
    }
  }
</style>
<template>
  <div class="right-search" v-if="!mobileFlag">
    <div class="self-info">
      <div class="avatar-wrapper">
        <img class="avatar" src="../../assets/selfInfo.jpg" alt="">
        <div class="message">
          <p>陈亮</p>
          <p>前段攻城狮</p>
        </div>
      </div>
      <div class="descr-wrapper">
        <p>码上有你，码上有我</p>
      </div>
      <div class="social-wrapper">
        <a href="https://github.com/Moon-Future/vue-node-blog" target="_blank">
          <icon-font class="social-icon" icon="icon-github" fontSize="42"></icon-font>
        </a>
        <el-popover
          placement="bottom"
          trigger="hover">
          <img class="wechat" src="../../assets/Wechat.jpg" alt="">
          <template slot="reference">
            <icon-font class="social-icon" icon="icon-weixin" fontSize="42"></icon-font>
          </template>
        </el-popover>
      </div>
    </div>
    <div class="search">
      <el-input placeholder="搜索文章"></el-input>
    </div>
    <div class="hot-warppre">
      
    </div>
    <div class="article-tags">

    </div>
  </div>
</template>

<script>
  import IconFont from '@/components/Iconfont'
  import { apiUrl } from '@/serviceAPI.config.js'
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        hotArticle: []
      }
    },
    computed: {
      ...mapGetters([
        'mobileFlag'
      ])
    },
    methods: {
      getHotArticle() {
        this.$http.post(apiUrl.getHotArticle, {
          data: {hot: true}
        }).then(() => {

        })
      }
    },
    components: {
      IconFont
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/css/variable.scss';
  .right-search {
    width: 30%;
    margin-left: 20px;
    opacity: 0.8;
  }
  .self-info {
    text-align: left;
    background: $color-white;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 3px;
    font-size: 14px;
    p {
      padding: 5px 0;
    }
    .avatar-wrapper {
      display: flex;
      .avatar {
        width: 100px;
        height: 100px;
        margin-right: 10px;
      }
    }
    .social-wrapper {
      margin-top: 10px;
      .social-icon {
        cursor: pointer;
        margin-right: 10px;
        &:hover {
          color: $color-blue;
        }
      }
      .wechat {
        width: 200px;
        height: 200px;;
      }
    }
  }
</style>

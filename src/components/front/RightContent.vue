<template>
  <div class="right-content" v-if="!mobileFlag">
    <div class="right-item contact">
      <div class="contact-1">
        <h3>联系我啊  么么哒!</h3>
      </div>
      <div class="contact-2">
        <a href="https://github.com/Moon-Future/vue-node-blog" target="_blank">
          <icon-font class="social-icon" icon="icon-github" fontSize="42"></icon-font>
        </a>
        <el-popover
          placement="bottom"
          trigger="hover">
          <img class="wechat" src="../../assets/Wechat.jpg" alt="">
          <template slot="reference">
            <icon-font class="social-icon" icon="icon-weixin-active" fontSize="42"></icon-font>
          </template>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
  import IconFont from '@/components/Iconfont'
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'mobileFlag'
      ])
    },
    components: {
      IconFont
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/css/variable.scss';
  .right-content {
    width: 20%;
  }
  .right-item {
    background: $color-white;
    padding: 20px;
  }
  .contact-1 {
    border-bottom: 1px solid #eaeaea;
    position: relative;
    text-align: center;
    margin-top: 15px;
    h3 {
      background: #fff;
      font-size: 15px;
      position: absolute;
      width: 136px;
      margin-left: -68px;
      left: 50%;
      bottom: -8px;
      color: #666;
      letter-spacing: 1px;
      padding: 0 10px;
    }
  }
  .contact-2 {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
  }
</style>

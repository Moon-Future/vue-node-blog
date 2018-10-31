<template>
  <div>
    <topHeader></topHeader>
    <Aside></Aside>
    <div class="content">
      <transition name="move" mode="out-in"><router-view :userInfo="userInfo"></router-view></transition>
    </div>
  </div>
</template>

<script>
  import TopHeader from '@/components/admin/TopHeader.vue'
  import Aside from '@/components/admin/Aside.vue'
  import apiUrl from '@/serviceAPI.config.js'
  export default {
    name: 'Admin',
    data() {
      return {
        userInfo: {}
      }
    },
    beforeCreate() {
      this.$http.post(apiUrl.getSession).then(res => {
        if (res.data.code === 200) {
          this.userInfo = res.data.message
        } else {
          this.$message.error(res.data.message)
          this.$router.push({path: '/login'})
        }
      })
    },
    components: {
      Aside,
      TopHeader
    },
  }
</script>

<style lang="scss" scoped>
  .content {
    background: none repeat scroll 0 0 #fff;
    position: absolute;
    left: 250px;
    right: 0;
    top: 70px;
    bottom:0;
    width: auto;
    padding: 10px;
    box-sizing: border-box;
    overflow-y: scroll;
  }
  .crumbs{
    margin-bottom: 20px;
  }
  @media only screen and (max-width: 768px) {
    .content {
      left: 0;
      padding: 20px;
    }
  }

  /* 上传头像组件自适应 */
  @media only screen and (max-width: 568px) {
    #avatar-upload .vicp-wrap {
      width: 300px;
      height: 500px;
    }
    #avatar-upload .vicp-wrap .vicp-close {
      background: #a9a7a7;
      right: 0px;
      top: 0px;
    }
  }

  @media only screen and (min-width: 568px) and (max-width: 667px){
    #avatar-upload .vicp-wrap {
      width: 550px;
      height: 280px;
    }
    #avatar-upload .vicp-wrap .vicp-close {
      background: #a9a7a7;
      right: 0px;
      top: 0px;
    }
  }
</style>

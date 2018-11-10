<template>
  <div class="left-entry">
    <div class="open" @click="open" v-show="!showFlag">
      <icon-font :icon="openIcon" :fontSize="fontSize"></icon-font>
    </div>
    <transition
      mode="in-out"
      enter-active-class="animated slideInLeft fast"
      leave-active-class="animated slideOutLeft fast"
    >
      <div class="content-wrapper" v-show="showFlag">
        <div class="close" @click="close">
          <icon-font :icon="closeIcon" :fontSize="fontSize" @click="close"></icon-font>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import IconFont from '@/components/Iconfont'
  export default {
    name: 'LeftEntry',
    data() {
      return {
        openIcon: 'icon-arrow-open',
        closeIcon: 'icon-arrow-close',
        fontSize: '26',
        showFlag: false
      }
    },
    methods: {
      open() {
        this.showFlag = true
      },
      close() {
        this.showFlag = false
      }
    },
    components: {
      IconFont
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/css/variable.scss';
  .left-entry {
    position: fixed;
    z-index: 200;
    color: $color-white;
    height: 100%;
    .open {
      padding: 10px;
      cursor: pointer;
      position: absolute;
    }
  }
  .content-wrapper {
    height: 100%;
    width: 220px;
    position: absolute;
    top: 0;
    background: $color-white;
    .close {
      position: absolute;
      color: $color-black;
      padding: 10px;
      right: 0;
    }
  }
</style>

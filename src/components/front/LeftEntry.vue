<template>
  <div class="left-entry" v-show="showFlag">
    <div class="icon-btn" :class="[openFlag ? 'close' : 'open']" @click="toggleShow">
      <icon-font :icon="openFlag ? closeIcon : openIcon" :fontSize="fontSize"></icon-font>
    </div>
    <!-- <transition
      enter-active-class="animated slideInLeft"
      leave-active-class="animated slideOutLeft"
    > -->
      <div class="content-wrapper" v-show="openFlag">
        <div class="header-wrapper">
          <h1>目录</h1>
        </div>
        <div class="catalog-wrapper">
          <ul v-for="data in chapterData" :key="data.id">
            <li><a :href="'#' + data.id" >{{ data.label }}</a></li>
            <ul v-for="child1 in data.children" :key="child1.id">
              <li><a :href="'#' + child1.id" >{{ child1.label }}</a></li>
              <ul v-for="child2 in child1.children" :key="child2.id">
                <li><a :href="'#' + child2.id" >{{ child2.label }}</a></li>
                <ul v-for="child3 in child2.children" :key="child3.id">
                  <li><a :href="'#' + child3.id" >{{ child3.label }}</a></li>
                  <ul v-for="child4 in child3.children" :key="child4.id">
                    <li><a :href="'#' + child4.id" >{{ child4.label }}</a></li>
                    <ul v-for="child5 in child4.children" :key="child5.id">
                      <li><a :href="'#' + child5.id" >{{ child5.label }}</a></li>
                    </ul>
                  </ul>
                </ul>
              </ul>
            </ul>
          </ul>
        </div>
      </div>
    <!-- </transition> -->
  </div>
</template>

<script>
  import IconFont from '@/components/Iconfont'
  import { apiUrl } from '@/serviceAPI.config.js'
  import { dateFormat } from '@/common/js/tool.js'
  export default {
    name: 'LeftEntry',
    props: ['chapterData'],
    data() {
      return {
        openIcon: 'icon-arrow_right',
        closeIcon: 'icon-arrow_left',
        fontSize: '16',
        openFlag: false,
        showFlag: false
      }
    },
    created() {
      this.routeWWatch()
    },
    methods: {
      toggleShow() {
        this.openFlag = !this.openFlag
        this.$emit('leftEntry', {flag: this.openFlag, width: 250})
      },
      routeWWatch() {
        if (this.$route.name === 'Article') {
          this.showFlag = true
        } else {
          this.showFlag = false
        }
      }
    },
    watch: {
      $route() {
        this.routeWWatch()
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
    color: $color-blue;
    height: 100%;
    .icon-btn {
      cursor: pointer;
      position: absolute;
      top: 10px;
      width: 30px;
      height: 30px;
      background: $color-shallowgray;
      border: 1px solid $color-gray;
      border-radius: 3px;
      color: $color-black;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      box-sizing: border-box;
      &.open {
        left: 10px;
      }
      &.close {
        left: 210px;
      }
      &:hover {
        color: $color-blue;
        background: #f3f5f7;
      }
    }
  }
  .content-wrapper {
    height: 100%;
    width: 250px;
    position: absolute;
    top: 0;
    background: $color-white;
  }
  .header-wrapper {
    height: 50px;
    line-height: 50px;
    background: $color-shallowgray;
    text-align: left;
    padding-left: 10px;
  }
  .catalog-wrapper {
    text-align: left;
    color: $color-blue;
    padding-left: 10px;
    ul {
      margin: 5px 0;
      text-indent: 15px;
      li a {
        display: block;
        font-size: 12px;
        padding: 5px;
        color: $color-blue;
        &:hover {
          background: $color-gray;
        }
      }
    }
    &>ul {
      text-indent: 0;
    }
  }
</style>

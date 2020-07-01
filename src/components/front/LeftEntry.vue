<template>
  <div class="left-entry" v-show="showFlag">
    <div class="icon-btn" :class="[openFlag ? 'close' : 'open']" @click="toggleShow">
      <icon-font :icon="openFlag ? closeIcon : openIcon" :fontSize="fontSize"></icon-font>
    </div>
    <div class="content-wrapper" v-show="openFlag">
      <div class="header-wrapper">
        <h1>目录</h1>
      </div>
      <div class="catalog-wrapper">
        <ul class="catalog-item" v-for="data in chapterData" :key="data.id">
          <!-- <li><a :href="'#' + data.id" @click="goTitle" >{{ data.label }}</a></li>
          <ul v-for="child1 in data.children" :key="child1.id">
            <li><a :href="'#' + child1.id" @click="goTitle" >{{ child1.label }}</a></li>
            <ul v-for="child2 in child1.children" :key="child2.id">
              <li><a :href="'#' + child2.id" @click="goTitle" >{{ child2.label }}</a></li>
              <ul v-for="child3 in child2.children" :key="child3.id">
                <li><a :href="'#' + child3.id" @click="goTitle" >{{ child3.label }}</a></li>
                <ul v-for="child4 in child3.children" :key="child4.id">
                  <li><a :href="'#' + child4.id" @click="goTitle" >{{ child4.label }}</a></li>
                  <ul v-for="child5 in child4.children" :key="child5.id">
                    <li><a :href="'#' + child5.id" @click="goTitle" >{{ child5.label }}</a></li>
                  </ul>
                </ul>
              </ul>
            </ul>
          </ul> -->
          <li :class="{ 'li-hover': !mobileFlag }" @click="goTitle(data.id)">{{ data.label }}</li>
          <ul v-for="child1 in data.children" :key="child1.id">
            <li :class="{ 'li-hover': !mobileFlag }" @click="goTitle(child1.id)">{{ child1.label }}</li>
            <ul v-for="child2 in child1.children" :key="child2.id">
              <li :class="{ 'li-hover': !mobileFlag }" @click="goTitle(child2.id)">{{ child2.label }}</li>
              <ul v-for="child3 in child2.children" :key="child3.id">
                <li :class="{ 'li-hover': !mobileFlag }" @click="goTitle(child3.id)">{{ child3.label }}</li>
                <ul v-for="child4 in child3.children" :key="child4.id">
                  <li :class="{ 'li-hover': !mobileFlag }" @click="goTitle(child4.id)">{{ child4.label }}</li>
                  <ul v-for="child5 in child4.children" :key="child5.id">
                    <li :class="{ 'li-hover': !mobileFlag }" @click="goTitle(child5.id)">{{ child5.label }}</li>
                  </ul>
                </ul>
              </ul>
            </ul>
          </ul>
        </ul>
      </div>
    </div>
    <!-- <mask-screen></mask-screen> -->
  </div>
</template>

<script>
  import IconFont from '@/components/Iconfont'
  import MaskScreen from '@/components/front/MaskScreen'
  import { apiUrl } from '@/serviceAPI.config.js'
  import { dateFormat } from '@/common/js/tool.js'
  import { mapGetters } from 'vuex'
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
    computed: {
      ...mapGetters([
        'mobileFlag'
      ])
    },
    created() {
      this.routeWatch()
      if (this.mobileFlag) {
        this.showFlag = true
      }
    },
    methods: {
      toggleShow() {
        this.openFlag = !this.openFlag
        this.$emit('leftEntry', {flag: this.openFlag, width: 250})
      },
      routeWatch() {
        if (this.$route.name === 'Article') {
          this.showFlag = true
        } else {
          this.showFlag = false
          this.openFlag = false
        }
        if (this.mobileFlag) {
          this.showFlag = true
        }
      },
      goTitle(id) {
        document.getElementById(id).scrollIntoView()
        setTimeout(() => {
          const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
          document.documentElement.scrollTop = document.body.scrollTop = scrollTop - 60
        }, 30)
      }
    },
    watch: {
      $route() {
        this.routeWatch()
      }
    },
    components: {
      IconFont,
      MaskScreen
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/css/variable.scss';
  .left-entry {
    position: fixed;
    z-index: 200;
    color: $color-black;
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
        color: $color-black;
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
    border-right: 1px solid #ddd;
  }
  .header-wrapper {
    height: 50px;
    line-height: 50px;
    background: $color-shallowgray;
    text-align: left;
    padding-left: 10px;
    border-bottom: 1px solid #ddd;
    h1 {
      font-weight: bold;
    }
  }
  .catalog-wrapper {
    width: 100%;
    text-align: left;
    color: $color-black;
    position: absolute;
    top: 50px;
    bottom: 0;
    overflow: auto;
    ul {
      text-indent: 15px;
      li {
        display: block;
        font-size: 12px;
        line-height: 16px;
        padding: 6px 10px;
        color: $color-black;
        cursor: pointer;
      }
      li.li-hover:hover {
        background: #edf6ff;
      }
    }
    &>ul {
      text-indent: 0;
    }
    ul.catalog-item:first-child {
      >li:first-child {
        padding-top: 6px;
      }
    }
  }
</style>

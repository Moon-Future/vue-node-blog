<template>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated slideInDown"
    leave-active-class="animated slideOutUp"
  >
    <div class="bread-crumb" v-show="crumbsShow" @mouseover="mouseover" @mouseout="mouseout">
      <ul class="item-wrapper">
        <li class="item" :class="[i != crumbs.length -1 ? 'active' : '']" v-for="(crumb, i) in crumbs" :key="i">
          <span class="name">{{ crumb.name }}</span>
          <icon-font v-if="i !== crumbs.length - 1" icon="icon-arrow-right" fontSize="14" class="icon-arrow"></icon-font>
        </li>
      </ul>
      <div class="go-back" @click="goBack">返回</div>
    </div>
  </transition>
</template>

<script>
  import IconFont from '@/components/Iconfont'
  export default {
    name: 'BreadCrumb',
    data() {
      return {
        crumbs: [
          {name: '首页', router: '/'},
          {name: '目录', router: '/'},
          {name: '文章', router: '/'},
          {name: '关于', router: '/'},
        ],
        currentTop: 0,
        crumbsShow: false
      }
    },
    mounted() {
      window.addEventListener('scroll', this.bodyScroll)
    },
    methods: {
      bodyScroll() {
        if (this.$route.path === '/') {
          return
        }
        this.show = false
        clearTimeout(this.timer)
        this.crumbsShow = true
        this.timer = setTimeout(() => {
          this.crumbsShow = false
        }, 2000)
      },
      mouseover() {
        clearTimeout(this.timer)
      },
      mouseout() {
        if (this.show) {
          return
        }
        this.timer = setTimeout(() => {
          this.crumbsShow = false
        }, 2000)
      },
      goBack() {
        this.$router.go(-1)
      }
    },
    watch: {
      $route() {
        if (this.$route.path === '/') {
          this.crumbsShow = false
          this.show = false
        } else {
          this.crumbsShow = true
          this.show = true
        }
        // this.$nextTick(() => {
        //   const clientHeight = document.documentElement.clientHeight
        //   const scrollHeight = document.documentElement.scrollHeight
        //   console.log(clientHeight, scrollHeight)
        //   if (clientHeight >= scrollHeight) {
        //     this.crumbsShow = true
        //     this.show = true
        //     clearTimeout(this.timer)
        //   } else {
        //     this.crumbsShow = false
        //     this.show = false
        //   }
        // })
      }
    },
    components: {
      IconFont
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/css/variable.scss';
  .bread-crumb {
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    width: 80%;
    margin: auto;
    padding: 10px 20px;
    box-sizing: border-box;
    color: $color-black;
    background: $color-white;
    display: flex;
    justify-content: space-between;
    z-index: 10;
    opacity: 0.8;
  }
  .go-back {
    cursor: pointer;
    color: $color-blue;
    &:hover {
      color: $color-red;
      text-decoration: underline;
    }
  }
  .item-wrapper {
    display: flex;
  }
  .item {
    color: $color-gray;
    .icon-arrow {
      margin: 0 5px;
      color: $color-deepgray;
    }
    &.active {
      color: $color-black;
      .name {
        font-weight: bold;
        cursor: pointer;
        &:hover {
          color: $color-blue;
        }
      }
    }
  }
</style>

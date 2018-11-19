<template>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated slideInDown"
    leave-active-class="animated slideOutUp"
  >
    <div class="bread-crumb" v-show="crumbsShow" ref="breadCrumb">
      <ul class="item-wrapper">
        <router-link
          v-for="(crumb, i) in crumbs"
          tag="li"
          :to="crumb.router" 
          class="item"
          :class="[i != crumbs.length -1 ? 'active' : '']"
          :key="i">
          <span class="name">{{ crumb.name }}</span>
          <icon-font v-if="i !== crumbs.length - 1" icon="icon-arrow_right" fontSize="14" class="icon-arrow"></icon-font>
        </router-link>
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
          {name: '首页', router: ''}
        ],
        currentTop: 0,
        crumbsShow: false
      }
    },
    mounted() {
      this.currentTop = 0
      window.addEventListener('scroll', this.bodyScroll)
      if (this.$route.path === '/') {
        this.crumbsShow = false
      } else {
        this.crumbsShow = true
      }
    },
    methods: {
      bodyScroll() {
        if (this.$route.path === '/') {
          return
        }
        const scrollTop = document.documentElement.scrollTop
        if (scrollTop > this.currentTop) {
          this.crumbsShow = false
        } else {
          this.crumbsShow = true
        }
        this.currentTop = scrollTop
      },
      goBack() {
        this.$router.go(-1)
      },
      setWidth({width, left}) {
        this.$refs.breadCrumb.style.width = width.indexOf('px') === -1 ? '80%' : width.replace('px', '') * 0.8 + 'px'
        this.$refs.breadCrumb.style.left = left
      }
    },
    watch: {
      $route() {
        const name = this.$route.name
        if (this.$route.path === '/') {
          this.crumbsShow = false
        } else {
          this.crumbsShow = true
        }
        switch(name) {
          case 'Article':
            this.crumbs = [{name: '首页', router: '/'}, {name: '文章', router: ''}]
            break;
          case 'Catalog':
            this.crumbs = [{name: '首页', router: '/'}, {name: '目录', router: ''}]
            break;
          default:
            this.crumbs = [{name: '首页', router: '/'}]
            break;
        }
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

<template>
  <div class="catalog-wrapper" :class="{mobile: mobileFlag}">
    <div class="month-devide" v-for="(list, key) in catalog" :key="key">
      <h1 class="month">{{ key }}</h1>
      <div class="month-data" v-for="(item, i) in list" :key="i">
        <span class="content day">{{ item.day }}</span>
        <div class="content link">
          <span class="title" @click="goDetail(item)">{{ item.title }}</span>
          <span class="view">{{ item.view }} 浏览</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { apiUrl } from '@/serviceAPI.config.js'
  import { dateFormat } from '@/common/js/tool.js'
  import { computeStyleMixin } from '@/common/js/mixin.js'
  import { mapGetters } from 'vuex'
  export default {
    name: 'catalog',
    data() {
      return {
        catalog: {}
      }
    },
    computed: {
      ...mapGetters([
        'mobileFlag'
      ])
    },
    created() {
      this.getCatalog()
    },
    methods: {
      getCatalog() {
        this.$http.post(apiUrl.getArticle, {
          data: {catalog: true}
        }).then((res) => {
          if (res.data.code === 200) {
            let data = res.data.message
            data.forEach(ele => {
              let time = dateFormat(ele.createTime, 'yyyy-MM')
              let day = dateFormat(ele.createTime, 'yyyy-MM-dd').split('-')[2]
              ele.day = day
              if (!this.catalog[time]) {
                this.$set(this.catalog, time, [])
              }
              this.catalog[time].push(ele)
            })
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      goDetail(article) {
        this.$router.push(`/article/${article._id}`)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/css/variable.scss';
  .catalog-wrapper {
    text-align: left;
    &.mobile {
      padding: 60px 10px 10px 10px;
    }
  }
  .month-devide {
    .month {
      font-weight: bold;
      font-size: 22px;
      margin-bottom: 10px;
    }
    .month-data {
      border-left: 1px solid $color-blue;
      border-right: 1px solid $color-blue;
      border-bottom: 1px solid $color-blue;
      display: flex;
      &:nth-child(2) {
        border-top: 1px solid $color-blue;
      }
      &:nth-child(odd) {
        background: $color-shallowgreend;
      }
      &:hover {
        background: $color-origin;
      }
    }
  }
  .content {
    padding: 10px;
    &.day {
      border-right: 1px solid $color-blue;
    }
    &.link {
      cursor: pointer;
      width: 100%;
      display: inline-block;
      position: relative;
      .title {
        &:hover {
          text-decoration: underline;
          color: $color-red;
        }
      }
      .view {
        font-size: 14px;
        color: $color-deepgray;
        margin-left: 20px;
      }
    }
  }
</style>

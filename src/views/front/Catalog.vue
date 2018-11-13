<template>
  <div class="catalog-wrapper">
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
  export default {
    name: 'catalog',
    data() {
      return {
        catalog: {}
      }
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
  }
  .month-devide {
    .month {
      font-weight: bold;
      font-size: 22px;
      margin-bottom: 10px;
    }
    .month-data {
      border-left: 1px solid $color-gray;
      border-right: 1px solid $color-gray;
      border-bottom: 1px solid $color-gray;
      display: flex;
      &:nth-child(2) {
        border-top: 1px solid $color-gray;
      }
      &:nth-child(odd) {
        background: $color-shallowgreend;
      }
      &:hover {
        background: $color-blue;
      }
    }
  }
  .content {
    padding: 10px;
    &.day {
      border-right: 1px solid $color-gray;
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

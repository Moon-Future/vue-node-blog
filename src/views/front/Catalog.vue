<template>
  <div class="catalog-wrapper">
    <div class="month-devide" v-for="(list, key) in catalog" :key="key">
      <h1 class="month">{{ key }}</h1>
      <div class="month-data" v-for="(item, i) in list" :key="i">
        <span class="content day">{{ item.day }}</span>
        <span class="content title">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import apiUrl from '@/serviceAPI.config.js'
  import { dateFormat } from '@/common/js/tool.js'
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
      &:nth-child(1) {
        background: $color-red;

      }
    }
  }
  .content {
    padding: 10px;
    &:hover {
      background: $color-gray;
    }
    &.day {
      border-right: 1px solid $color-gray;
    }
    &.title {
      cursor: pointer;
      width: 100%;
      display: inline-block;
    }
  }
</style>

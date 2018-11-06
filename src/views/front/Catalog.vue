<template>
  <div class="catalog-wrapper">
    <div class="month-devide" v-for="(item, i) in catalog" :key="i">
      <h1>{{ item.title }}</h1>
    </div>
  </div>
</template>

<script>
  import apiUrl from '@/serviceAPI.config.js'
  export default {
    data() {
      return {
        catalog: []
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
            this.catalog = res.data.message
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
    .month-devide {
      
    }
  }
</style>

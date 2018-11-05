<template>
  <div class="catalog-wrapper">

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

    },
    methods: {
      getCatalog() {
        this.$http.post(api).then((res) => {

        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

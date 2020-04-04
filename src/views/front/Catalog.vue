<template>
  <div>
    <top-header ref="topHeader"></top-header>
    <div class="catalog-wrapper" :class="{mobile: mobileFlag}">
      <el-timeline>
        <el-timeline-item v-for="(list, key) in catalog" :key="key" :timestamp="key" placement="top">
          <el-card class="catalog-card" v-for="(item, i) in list" :key="i" @click.native="goDetail(item)">
            <h4>{{ item.title }}</h4>
            <p>浏览量 {{ item.view }}，最后编辑于 {{ item.updateTime }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <bottom-footer v-if="!mobileFlag"></bottom-footer>
  </div>
</template>

<script>
  import TopHeader from '@/components/front/TopHeader'
  import BottomFooter from '@/components/front/BottomFooter'
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
              let time = dateFormat(ele.createTime, 'yyyy-MM-dd')
              ele.createTime = dateFormat(ele.createTime, 'yyyy-MM-dd hh:mm')
              ele.updateTime = ele.updateTime ? dateFormat(ele.updateTime, 'yyyy-MM-dd hh:mm') : ele.createTime
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
    },
    components: {
      TopHeader,
      BottomFooter
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/css/variable.scss';
  .catalog-wrapper {
    text-align: left;
    width: 70%;
    padding-top: 100px;
    margin: auto;
    &.mobile {
      padding: 60px 10px 10px 10px;
      width: 95%;
    }
  }
  .catalog-card {
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
      border-color: $color-blue;
    }
    h4 {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    p {
      color: $color-gray;
    }
  }
</style>

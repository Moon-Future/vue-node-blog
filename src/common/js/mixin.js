export const computeStyleMixin = {
  mounted() {
    this.routeWacth()
  },
  methods: {
    routeWacth() {
      this.$nexttick(() => {
        if (this.$route.path === '/') {
          this.$refs.bgVideo.style.position = 'absolute'
          this.$refs.bgVideo.style.top = this.height + 'px'
          this.homeFlag = true
        } else {
          this.$refs.bgVideo.style.position = 'fixed'
          this.$refs.bgVideo.style.top = '50px'
          this.homeFlag = false
        }
      })
    }
  },
  watch: {
    $route() {
      this.routeWacth()
    }
  },
}
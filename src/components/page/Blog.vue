<template>
  <div>
    <div class="father-area">
      id: <input type="text" v-model="currentArticle.id">
      title: <input type="text" v-model="currentArticle.title">
      tag: <input type="text" v-model="currentArticle.tag">
      count: <input type="text" v-model="count">
    </div>
    <div class="child-area">
      <Leftnav></Leftnav>
    </div>
  </div>
</template>

<script>
  import Leftnav from '../common/LeftNavItem'
  import { mapState } from 'vuex';
  export default {
    name: 'blog',
    data() {
      return {
        message: 'father message'
      }
    },
    components: {
      Leftnav
    },
    methods: {

    },
    // computed: mapState(['currentArticle', 'count'])
    computed: mapState({
      currentArticle: 'currentArticle',
      count: 'count',
    })
  }
</script>

<style scoped>
  .father-area {
    background-color: aqua;
    padding: 10px;
  }
  .child-area {
    background-color: bisque;
    padding: 10px;
  }
</style>


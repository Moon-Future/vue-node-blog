import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action'
import mutations from './mutation'

Vue.use(Vuex);

const state = {
  catalogDisplay: true,   // 左侧导航目录显示状态
  crumbFlag: [true, false, false], // 左侧导航目录面包屑 [true, false, false], 三级面包屑：目录/标签/文章标题    crumbCata/crumbSub/crumbTitle
  currentArticle: {id: '', title: '', tag: '', catalog: []},   // 当前文章状态, 名字, 标签
  boxCol: 24
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
})

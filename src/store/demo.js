import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  currentArticle: {id: '1', title: '学习笔记', tag: 'vue'}   // 当前文章状态, 名字, 标签
}

const types = {
  CURRENT_ARTICLE: 'CURRENT_ARTICLE'
}

const actions = {
  currentArticle({commit}, obj) {
    commit(types.CURRENT_ARTICLE, obj);
  },
}

const mutations = {
  [types.CURRENT_ARTICLE](state, obj) {
    obj.id == undefined ? false : state.currentArticle.id = obj.id;
    obj.title == undefined ? false : state.currentArticle.title = obj.title;
    obj.tag == undefined ? false : state.currentArticle.tag = obj.tag;
    obj.catalog == undefined ? false : state.currentArticle.catalog = obj.catalog;
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
})
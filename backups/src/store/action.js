import * as types from './mutation_type'

export default {
    changeCatalogDiaplay({commit}) {
        commit(types.CATALOG_DISPLAY);
    },
    crumbFlag({commit}, arr) {
        commit(types.CRUMB_FLAG, arr);
    },
    currentArticle({commit}, obj) {
        commit(types.CURRENT_ARTICLE, obj);
    },
    boxSwitchType({commit}) {
        commit(types.BOX_SWITCH);
  }
}

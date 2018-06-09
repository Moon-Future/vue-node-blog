import * as types from './mutation_type'

export default {
    [types.CATALOG_DISPLAY](state) {
        state.catalogDisplay = !state.catalogDisplay;
    },
    [types.CRUMB_FLAG](state, arr) {
        for(let i = 0, len = arr.length; i < len; i++){
            state.crumbFlag.splice(arr[i].index, 1, arr[i].newValue);
        }
    },
    [types.CURRENT_ARTICLE](state, obj) {
        obj.id == undefined ? false : state.currentArticle.id = obj.id;
        obj.title == undefined ? false : state.currentArticle.title = obj.title;
        obj.tag == undefined ? false : state.currentArticle.tag = obj.tag;
        obj.catalog == undefined ? false : state.currentArticle.catalog = obj.catalog;
    },
    [types.BOX_SWITCH](state) {
        state.boxCol = state.boxCol == 12 ? 24 : 12;
  }
}

import * as types from './mutation-types'

const mutations = {
  [types.SET_MOBILE_FLAG](state, flag) {
    state.mobileFlag = flag
  }
}

export default mutations
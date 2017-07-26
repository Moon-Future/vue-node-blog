import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action'
import mutations from './mutation'

Vue.use(Vuex);

const state = {
	catalogDisplay: true
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})

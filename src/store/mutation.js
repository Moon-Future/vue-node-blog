import * as types from './mutation_type'

export default {
	[types.CATALOG_DISPLAY](state) {
		state.catalogDisplay = !state.catalogDisplay;
	}
}

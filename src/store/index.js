import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		themeColor: '#00c471',
	},
	mutations: {},
	actions: {},
	modules: {},
	getters: {
		themeColor(state) {
			return state.themeColor;
		},
	},
});

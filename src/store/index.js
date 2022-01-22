import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		themeColor: '#809bce',
		themeColorDark: '#364fc7',
	},
	mutations: {},
	actions: {},
	modules: {},
	getters: {
		themeColor(state) {
			return state.themeColor;
		},

		themeColorDark(state) {
			return state.themeColorDark;
		},
	},
});

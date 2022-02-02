import Vue from 'vue';
import Vuex from 'vuex';

// modules
import modules from './modules';

console.log(modules);

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		themeColor: '#809bce',
		themeColorDark: '#364fc7',

		// 거래 내역 추가/수정 모달 open 여부
		isTransactionModal: false,
	},
	mutations: {
		OPEN_TRANSACTION_MODAL(state) {
			state.isTransactionModal = true;
		},

		CLOSE_TRANSACTION_MODAL(state) {
			state.isTransactionModal = false;
		},
	},
	actions: {},
	modules,
	getters: {
		themeColor(state) {
			return state.themeColor;
		},

		themeColorDark(state) {
			return state.themeColorDark;
		},
	},
});

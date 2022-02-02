import Vue from 'vue';
import Vuex from 'vuex';

// modules
import modules from './modules';

// utils
import { getToday } from '@/utils/date';

Vue.use(Vuex);

const today = getToday().toISOString();

console.log(today);

export default new Vuex.Store({
	state: {
		// 오늘 날짜
		todayDate: today,
		currentDate: today,

		// 테마
		themeColor: '#809bce',
		themeColorDark: '#364fc7',

		// 거래 내역 추가/수정 모달 open 여부
		isTransactionModal: false,
	},
	mutations: {
		// 거래 내역 추가/수정 모달 열기
		OPEN_TRANSACTION_MODAL(state) {
			state.isTransactionModal = true;
		},

		// 거래 내역 추가/수정 모달 닫기
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

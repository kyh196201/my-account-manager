import Vue from 'vue';
import Vuex from 'vuex';

// modules
import modules from './modules';

// utils
import { getToday, formatDate } from '@/utils/date';

Vue.use(Vuex);

const today = getToday().toISOString();

export default new Vuex.Store({
	state: {
		// 오늘 날짜
		todayDate: today,

		// 헤더에 보여질 날짜
		currentDate: today,

		// 'year', 'month'
		// 헤더 날짜 포맷 타입
		dateType: 'month',

		// 테마
		themeColor: '#809bce',
		themeColorDark: '#364fc7',

		// 거래 내역 추가/수정 모달 open 여부
		isTransactionModal: false,
	},
	getters: {
		dateType: state => {
			return state.dateType;
		},

		currentDate: state => {
			return state.currentDate;
		},

		formattedCurrentDate: state => {
			const format = state.dateType === 'month' ? 'YYYY년 M월' : 'YYYY년';

			return formatDate(state.currentDate, format);
		},

		themeColor(state) {
			return state.themeColor;
		},

		themeColorDark(state) {
			return state.themeColorDark;
		},
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

		// 현재 날짜 변경
		SET_CURRENT_DATE(state, date) {
			state.currentDate = date;
		},
	},
	actions: {
		// 거래 내역 추가/수정 모달 닫기
		CLOSE_TRANSACTION_MODAL({ commit, getters }) {
			commit('CLOSE_TRANSACTION_MODAL');

			// 수정 중 일 경우 거래 내역 상세 정보 초기화
			if (getters['transactions/isEditing']) {
				commit('transactions/SET_TRANSACTION_INFO', null);
			}
		},
	},
	modules,
});

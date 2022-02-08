/**
 * 거래 내역 스토어 모듈
 */
// api
import {
	addTransaction,
	getTransactions,
	getTransactionInfo,
	updateTransactionInfo,
	removeTransactions,
} from '@/api';

// utils
import {
	filterIncomes,
	filterOutcomes,
	getFirstAndLastDate,
	getYearFirstAndLastDate,
} from '@/utils';

export default {
	namespaced: true,

	state: () => ({
		// 거래 내역 목록
		transactions: [],

		// 선택된 거래 내역 정보
		transactionInfo: null,
	}),
	getters: {
		// 총 수입
		totalIncome: state => {
			const incomes = filterIncomes(state.transactions);

			return incomes.reduce(
				(amount, transaction) => amount + Number(transaction.cost),
				0,
			);
		},

		// 총 지출
		totalOutcome: state => {
			const outcomes = filterOutcomes(state.transactions);

			const totalAmount = outcomes.reduce((amount, transaction) => {
				return amount + Number(transaction.cost);
			}, 0);

			return -1 * totalAmount;
		},

		transactionInfo: state => state.transactionInfo,

		// 수정 중 여부
		isEditing: state => !!state.transactionInfo,
	},
	mutations: {
		// 거래 내역 리스트 세팅
		SET_TRANSACTIONS(state, transactions = []) {
			state.transactions = transactions;
		},

		// 선택된 거래 내역 정보 세팅
		SET_TRANSACTION_INFO(state, info = {}) {
			state.transactionInfo = info;
		},
	},
	actions: {
		/**
		 * 거래 내역 추가
		 * @param {object} context
		 * @param {object} transactionData
		 */
		async ADD_TRANSACTION(context, transactionData) {
			await addTransaction(transactionData);
		},

		/**
		 * 거래 내역 조회
		 * @param {object} context
		 * @param {object} params
		 * @param {number} params.start
		 * @param {number} params.end
		 */
		async GET_TRANSACTIONS({ commit, rootState }) {
			try {
				const { dateType, currentDate } = rootState;

				const { start, end } =
					dateType === 'month'
						? getFirstAndLastDate(currentDate)
						: getYearFirstAndLastDate(currentDate);

				const transactions = await getTransactions(
					start.unix() * 1000,
					end.unix() * 1000,
				);

				commit('SET_TRANSACTIONS', transactions);
			} catch (error) {
				commit('SET_TRANSACTIONS', []);
				throw error;
			}
		},

		/**
		 * 거래 내역 상세 조회
		 * @param {object} context
		 * @param {string} id : 거래 내역 id
		 */
		async GET_TRANSACTION_INFO({ commit }, id) {
			const info = await getTransactionInfo(id);

			commit('SET_TRANSACTION_INFO', {
				...info,
				id,
			});
		},

		/**
		 * 참고: https://firebase.google.com/docs/database/web/read-and-write?authuser=0#updating_or_deleting_data
		 * 거래 내역 정보 수정하기
		 * @param {object} context
		 * @param {object} params
		 * @param {string} id : 거래 내역 id
		 * @param {object} transactionData : 거래 내역 데이터
		 */
		async UPDATE_TRANSACTION_INFO(context, { id, transactionData }) {
			await updateTransactionInfo(id, transactionData);
		},

		/**
		 * * 참고: https://firebase.google.com/docs/database/web/read-and-write?authuser=0#updating_or_deleting_data
		 * 거래 내역 삭제하기
		 * @param {object} context
		 * @param {Array.<string>} transactionIds : 삭제할 거래 내역 id 리스트
		 */
		async REMOVE_TRANSACTIONS(context, transactionIds = []) {
			await removeTransactions(transactionIds);
		},
	},
};

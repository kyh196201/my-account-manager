/**
 * 거래 내역 스토어 모듈
 */
// api
import { addTransaction, getTransactions } from '@/api';

// utils
import { filterIncomes, filterOutcomes } from '@/utils/helper';

export default {
	namespaced: true,

	state: () => ({
		// 거래 내역 목록
		transactions: [],
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
	},
	mutations: {
		SET_TRANSACTIONS(state, transactions = []) {
			state.transactions = transactions;
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
		async GET_TRANSACTIONS({ commit }, { start, end }) {
			try {
				const transactions = await getTransactions(start, end);

				commit('SET_TRANSACTIONS', transactions);
			} catch (error) {
				commit('SET_TRANSACTIONS', []);
				throw error;
			}
		},
	},
};

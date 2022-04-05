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

		// 로딩
		fetches: {
			transactions: false,
			transactionInfo: false,
		},
	}),
	getters: {
		// 거래 내역 리스트
		transactions: state => state.transactions,

		/**
		 * 날짜별로 그룹핑된 객체
		 */
		transactionsGroupByDate: state => {
			const { transactions } = state;

			if (!transactions.length) return [];

			// https://stackoverflow.com/questions/46802448/how-do-i-group-items-in-an-array-by-date
			const groups = transactions.reduce((groups, transaction) => {
				const date = transaction.date;
				if (!groups[date]) {
					groups[date] = [];
				}
				groups[date].push(transaction);
				return groups;
			}, {});

			return groups;
		},

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

		// 로딩 여부
		isFetching: state => {
			return (key = '') => {
				return state.fetches[key] === true;
			};
		},
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

		START_FETCHING(state, key = '') {
			if (undefined !== state.fetches[key]) {
				state.fetches[key] = true;
			}
		},

		END_FETCHING(state, key = '') {
			if (undefined !== state.fetches[key]) {
				state.fetches[key] = false;
			}
		},
	},
	actions: {
		/**
		 * 거래 내역 추가
		 * @param {object} context
		 * @param {object} transactionData
		 */
		async ADD_TRANSACTION({ rootGetters }, transactionData) {
			const userUID = rootGetters['auth/userUID'];

			await addTransaction(transactionData, userUID);
		},

		/**
		 * 거래 내역 조회
		 *
		 * @param {object} context : vuex context
		 * @param {string} userUID : 사용자 UID
		 */
		async GET_TRANSACTIONS({ commit, rootState, rootGetters }) {
			try {
				commit('START_FETCHING', 'transactions');

				const { dateType, currentDate } = rootState;

				const userUID = rootGetters['auth/userUID'];

				if (!userUID)
					throw new Error(`auth is required user uid = ${userUID}`);

				const { start, end } =
					dateType === 'month'
						? getFirstAndLastDate(currentDate)
						: getYearFirstAndLastDate(currentDate);

				const transactions = await getTransactions(
					start.unix() * 1000,
					end.unix() * 1000,
					userUID,
				);

				commit('SET_TRANSACTIONS', transactions);
			} catch (error) {
				console.error(error);

				throw error;
			} finally {
				commit('END_FETCHING', 'transactions');
			}
		},

		/**
		 * 거래 내역 상세 조회
		 * @param {object} context
		 * @param {string} id : 거래 내역 id
		 */
		async GET_TRANSACTION_INFO({ commit, rootGetters }, id) {
			const userUID = rootGetters['auth/userUID'];

			const info = await getTransactionInfo(id, userUID);

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
		async UPDATE_TRANSACTION_INFO(
			{ rootGetters },
			{ id, transactionData },
		) {
			const userUID = rootGetters['auth/userUID'];

			await updateTransactionInfo(id, transactionData, userUID);
		},

		/**
		 * * 참고: https://firebase.google.com/docs/database/web/read-and-write?authuser=0#updating_or_deleting_data
		 * 거래 내역 삭제하기
		 * @param {object} context
		 * @param {Array.<string>} transactionIds : 삭제할 거래 내역 id 리스트
		 */
		async REMOVE_TRANSACTIONS({ rootGetters }, transactionIds = []) {
			const userUID = rootGetters['auth/userUID'];

			await removeTransactions(transactionIds, userUID);
		},
	},
};

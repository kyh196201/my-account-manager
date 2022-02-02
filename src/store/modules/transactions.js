// 거래 내역 스토어 모듈
import { addTransaction } from '@/api';

export default {
	namespaced: true,

	state: () => ({
		// 거래 내역 목록
		transactions: [],
	}),
	getters: {},
	mutations: {},
	actions: {
		// 거래 내역 추가
		ADD_TRANSACTION(context, transactionData) {
			return addTransaction(transactionData);
		},
	},
};

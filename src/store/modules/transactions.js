import { addTransaction } from '@/api';

export default {
	state: () => ({}),
	getters: {},
	mutations: {},
	actions: {
		// 거래 내역 추가
		ADD_TRANSACTION(context, transactionData) {
			return addTransaction(transactionData);
		},
	},
};

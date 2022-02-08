import { TRANSACTION_TYPE } from '@/constants';

/**
 * 지출, 이체 여부
 * @param {string} type : 거래 내역 타입(수입, 지출, 이체)
 * @returns {boolean}
 */
function isOutcomeType(type = '') {
	return (
		type === TRANSACTION_TYPE.OUTCOME || type === TRANSACTION_TYPE.TRANSFER
	);
}

/**
 * 수입 여부
 * @param {string} type : 거래 내역 타입(수입, 지출, 이체)
 * @returns {boolean}
 */
function isIncomeType(type = '') {
	return type === TRANSACTION_TYPE.INCOME;
}

/**
 * 거래 내역 중에서 수입에 해당하는 내역만 필터링
 * @param {array} transactions : 거래 내역
 * @returns {array} : 수입에 해당하는 거래 내역
 */
function filterIncomes(transactions = []) {
	return transactions.filter(t => isIncomeType(t.type));
}

/**
 * 거래 내역 중에서 지출에 해당하는 내역만 필터링(지출, 이체)
 * @param {array} transactions : 거래 내역
 * @returns {array} : 지출에 해당하는 거래 내역
 */
function filterOutcomes(transactions = []) {
	return transactions.filter(t => isOutcomeType(t.type));
}

export { isIncomeType, isOutcomeType, filterIncomes, filterOutcomes };

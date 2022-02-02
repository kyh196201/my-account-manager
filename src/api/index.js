import { getDatabase, ref, push, set } from 'firebase/database';

const db = getDatabase();

/**
 * 거래 내역 추가하기
 * @param {object} transactionData
 * @param {string} date : 거래 날짜('YYYY-MM-DD')
 * @param {string} time : 거래 시간('HH:mm')
 * @param {number} timestamp : 거래 시간(unix timestamp * 1000)
 * @param {number} cost : 금액
 * @param {string} category: 분류
 * @param {string} asset : 자산
 * @param {string} description : 내용
 * @param {string} memo : 메모
 * @param {string} type : 거래 유형(소비, 지출, 이체)
 * @returns {void}
 */
function addTransaction(transactionData) {
	const transactionsRef = ref(db, 'transactions');
	const key = push(transactionsRef);

	console.log('transactionData', transactionData);

	return set(key, transactionData);
}

export { addTransaction };

import {
	getDatabase,
	ref,
	push,
	set,
	query,
	get,
	update,
	orderByChild,
	startAt,
	endAt,
} from 'firebase/database';

const db = getDatabase();

/**
 * 거래 내역 추가
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
	const transactionsRef = ref(db, `transactions/testUser`);
	const key = push(transactionsRef);

	return set(key, transactionData);
}

/**
 * 거래 내역 조회
 * @param {number} start : 검색 기간 처음 날짜(unix timestamp * 1000)
 * @param {number} end : 검색 기간 마지막 날짜(unix timestamp * 1000)
 * @param {string} userId : 사용자 Id
 * @returns {array}
 */
async function getTransactions(start = 0, end = Date.now()) {
	const transactionsRef = ref(db, `transactions/testUser`);

	console.log('transactionsRef', transactionsRef);

	const transactionsQuery = query(
		transactionsRef,
		startAt(start),
		endAt(end),
		orderByChild('timestamp'),
	);

	const snapshot = await get(transactionsQuery);
	// const transactions = Object.values(snapshot.val());
	const snapshotValue = snapshot.val();

	const transactions = [];

	if (!snapshotValue) return transactions;

	for (const [key, value] of Object.entries(snapshot.val())) {
		transactions.push({
			id: key,
			...value,
		});
	}

	// FIXME orderByChild를 이용해서 내림차순 정렬
	//  내림차순으로 정렬
	return transactions.sort((a, b) => b.timestamp - a.timestamp);
}

/**
 * 거래 내역 정보 조회하기
 * @param {string | null} transactionId : 거래 내역 키 값
 */
async function getTransactionInfo(transactionId = null) {
	const transactionsRef = ref(db, `transactions/testUser/${transactionId}`);

	const snapshot = await get(transactionsRef);

	return snapshot.val();
}

/**
 * 거래 내역 정보 수정하기
 * @param {string | null} transactionId : 거래 내역 키 값
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
 */
async function updateTransactionInfo(
	transactionId = null,
	transactionData = {},
) {
	const transactionsRef = ref(db, `transactions/testUser/${transactionId}`);

	return await update(transactionsRef, transactionData);
}

/**
 * 거래 내역 삭제하기
 * @param {Array.<string>} transactionIds : 삭제할 거래 내역 id 리스트
 */
async function removeTransactions(transactionIds = []) {
	const updates = transactionIds.reduce((updates, id) => {
		updates[`transactions/testUser/${id}`] = null;
		return updates;
	}, {});

	return await update(ref(db), updates);
}

export {
	addTransaction,
	getTransactions,
	getTransactionInfo,
	updateTransactionInfo,
	removeTransactions,
};

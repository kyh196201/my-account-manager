// 비용 타입
const TRANSACTION_TYPE = {
	INCOME: 'income', // 수입
	OUTCOME: 'outcome', // 지출
	TRANSFER: 'transfer',
};

// 자산
const ASSETS = [
	{
		name: '현금',
		value: 'CASH',
	},
	{
		name: '카드',
		value: 'CARD',
	},
];

// 분류
const CATEGORIES = [];

export { TRANSACTION_TYPE, ASSETS, CATEGORIES };

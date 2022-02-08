// 비용 타입
const TRANSACTION_TYPE = {
	INCOME: 'income', // 수입
	OUTCOME: 'outcome', // 지출
	TRANSFER: 'transfer', // 이체
};

// 자산
const ASSETS = [
	{
		name: '현금',
		value: 'cash',
	},
	{
		name: '카드',
		value: 'card',
	},
];

// 분류
const CATEGORIES = [
	{
		name: '식비',
		value: 'food',
	},
	{
		name: '교통/차량',
		value: 'transportation',
	},
	{
		name: '문화생활',
		value: 'culture',
	},
	{
		name: '기타',
		value: 'etc',
	},
];

export { TRANSACTION_TYPE, ASSETS, CATEGORIES };

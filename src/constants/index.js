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
const CATEGORIES = [
	{
		name: '식비',
		value: 'FOOD',
	},
	{
		name: '교통/차량',
		value: 'TRANSPORTATION',
	},
	{
		name: '문화생활',
		value: 'CULTURE',
	},
	{
		name: '기타',
		value: 'ETC',
	},
];

export { TRANSACTION_TYPE, ASSETS, CATEGORIES };

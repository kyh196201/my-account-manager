import { ASSETS, CATEGORIES } from '@/constants';

// TODO 소스 깔끔하게 정리 또는 더 좋은 방법 찾아보기
// { card: '카드', cash: '현금' }
const assetsMap = ASSETS.reduce((map, asset) => {
	const { name, value } = asset;

	map[value] = name;
	return map;
}, {});

// { food: '식비', transportation: '교통/차량' }
const categoriesMap = CATEGORIES.reduce((map, category) => {
	const { name, value } = category;

	map[value] = name;
	return map;
}, {});

/**
 * 거래내역 자산 구하기
 * @param {string}} asset : 거래내역 자산 value
 * @returns
 */
function getAssetName(asset = 'card') {
	return assetsMap[asset] ?? '';
}

/**
 * 거래내역 카테고리 구하기
 * @param {string} category : 거래내역 카테고리 value
 * @returns
 */
function getCategoryName(category = 'food') {
	return categoriesMap[category] ?? '';
}

export { getAssetName, getCategoryName };

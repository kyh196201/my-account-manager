// 금액에 콤마 찍기
function numberWithCommas(x = 0) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 숫자를 제외한 모든 문자 제거
// https://bobbyhadz.com/blog/javascript-remove-all-characters-except-numbres
function filterOnlyNumbers(string = '') {
	return string.replace(/[^\d]/g, '');
}

// 숫자로만 이루어진 문자열인지 체크
function isOnlyNumberString(string = '') {
	const reg = /^\d+$/;
	return reg.test(string);
}

export { numberWithCommas, filterOnlyNumbers, isOnlyNumberString };

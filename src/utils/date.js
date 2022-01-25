import dayjs from 'dayjs';

//	dayjs formats
const DATE_FORMATS = {
	DATE: 'YYYY-MM-DD',
	DATE_TIME: 'YYYY-MM-DD HH:mm:ss',
};

/**
 * 오늘 날짜 구하기
 * @returns Dayjs
 */
function getToday() {
	return dayjs();
}

/**
 * 올바른 Date인지 검증
 * @param {string | number | Date} date
 * @returns {boolean}
 */
function validateDate(date) {
	return !!date && dayjs(date).isValid();
}

// dayjs 날짜 포맷 변경하기
function formatDate(date = '', format = 'YYYY-MM-DD') {
	if (!date) return '';

	const dateObj = dayjs(date);

	return dateObj.isValid() ? dateObj.format(format) : '';
}

export { formatDate, getToday, validateDate, DATE_FORMATS };

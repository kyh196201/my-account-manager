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

// https://stackoverflow.com/questions/5563028/how-to-validate-with-javascript-an-input-text-with-hours-and-minutes
/**
 * 입력된 문자열이 올바른 HH:mm 인지 검증
 * @param {string} time
 * @returns {boolean}
 */
function validateHhMm(time = '') {
	const regex = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;

	return regex.test(time);
}

/**
 * HH:mm 포맷을 오전/오후 h:mm 형태로 포맷 변경
 * @param {string} time
 * @returns {string} formattedTime
 */
function formatTime(time = '') {
	if (!validateHhMm(time)) return '';

	// hour 0 ~ 23
	// min 0 ~ 59
	const [hour, min] = time.split(':').map(t => Number(t));

	const AmPm = hour < 12 ? '오전' : '오후';

	return `${AmPm} ${hour < 12 ? hour : hour - 12}:${min}`;
}

export {
	formatDate,
	getToday,
	validateDate,
	validateHhMm,
	formatTime,
	DATE_FORMATS,
};

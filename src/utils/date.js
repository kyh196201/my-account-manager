import dayjs from 'dayjs';

//	dayjs formats
const DATE_FORMATS = {
	DATE: 'YYYY-MM-DD',
	DATE_TIME: 'YYYY-MM-DD HH:mm:ss',
};

/**
 * 오늘 날짜 구하기
 * @returns {Dayjs}
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

/**
 * 날짜를 dayjs를 이용해서 포맷 변경
 * @param {string | number | Date} date
 * @param {string} format
 * @returns {boolean}
 */
function formatDate(date, format = 'YYYY-MM-DD') {
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

	return !!time && regex.test(time);
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

	const hours = hour < 12 ? hour : hour - 12;
	const minutes = min < 10 ? `0${min}` : `${min}`;

	return `${AmPm} ${hours}:${minutes}`;
}

/**
 * timestamp 구하기
 * @param {string} date : YYYY-MM-DD 형태 날짜 데이터
 * @param {*} time : HH:mm 형태 시간 데이터
 * @returns {number} : unix timestamp
 */
function getTimestamp(date, time) {
	const dateString = `${date} ${time}`;

	if (!validateDate(dateString)) return Date.now();

	const dateObj = dayjs(dateString);

	return dateObj.unix() * 1000;
}

export {
	formatDate,
	getToday,
	validateDate,
	validateHhMm,
	formatTime,
	getTimestamp,
	DATE_FORMATS,
};

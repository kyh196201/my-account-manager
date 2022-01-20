import dayjs from 'dayjs';
import 'dayjs/locale/ko';

export default {
	install(Vue) {
		dayjs.locale('ko');
		// https://stackoverflow.com/questions/39373047/include-global-functions-in-vue-js
		Vue.prototype.$dayjs = dayjs;
	},
};

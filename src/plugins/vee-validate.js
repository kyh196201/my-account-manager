import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

export default {
	install(Vue) {
		Vue.component('ValidationProvider', ValidationProvider);
		Vue.component('ValidationObserver', ValidationObserver);

		// 규칙 추가
		extend('required', required);
	},
};

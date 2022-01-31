import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueCompositionAPI from '@vue/composition-api';

// plugins
import VueDayjs from '@/plugins/dayjs';
import VeeValidate from '@/plugins/vee-validate';

// mixins
import globalMixin from '@/mixins/global';

import '@/scss/_index.scss';

Vue.use(VueCompositionAPI);
Vue.use(VueDayjs);
Vue.use(VeeValidate);
Vue.mixin(globalMixin);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
}).$mount('#app');

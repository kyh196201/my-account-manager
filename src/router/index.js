import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '@/store';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		redirect: {
			name: 'Daily',
		},
	},
	{
		path: '/home',
		name: 'Home',
		redirect: {
			name: 'Daily',
		},
		meta: {
			requireAuth: true,
		},
		component: () => import('@/views/home-page.vue'),
		children: [
			{
				path: '',
				name: 'Daily',
				component: () => import('@/views/daily-page.vue'),
				meta: {
					requireAuth: true,
				},
			},
			{
				path: 'calendar',
				name: 'Calendar',
				component: () => import('@/views/calendar-page.vue'),
				meta: {
					requireAuth: true,
				},
			},
		],
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/login-page.vue'),
	},
	{
		path: '*',
		name: 'NotFound',
		component: () => import('@/views/not-found.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	const isAuthenticated = store.getters['auth/isAuthenticated'];

	if (to.matched.some(({ meta }) => !!meta.requireAuth) && !isAuthenticated) {
		// 로그인이 되어있지 않으면 로그인 페이지로 리다이렉트
		next({
			name: 'Login',
		});
	} else {
		next();
	}
});

export default router;

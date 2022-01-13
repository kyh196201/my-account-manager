import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		redirect: {
			name: 'Home',
		},
	},
	{
		path: '/home',
		name: 'Home',
		component: () => import('@/views/home-page.vue'),
		children: [
			{
				path: '',
				name: 'Daily',
				component: () => import('@/views/daily-page.vue'),
			},
			{
				path: 'calendar',
				name: 'Calendar',
				component: () => import('@/views/calendar-page.vue'),
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

export default router;

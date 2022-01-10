import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'HomePage',
		component: () => import('@/views/home-page.vue'),
	},
	{
		path: '/login',
		name: 'LoginPage',
		component: () => import('@/views/login-page.vue'),
	},
	{
		path: '*',
		name: 'NotFound',
		component: () => import('@/views/not-found-page.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;

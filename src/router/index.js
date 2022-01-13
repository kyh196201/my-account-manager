import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/home-page.vue'),
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

<template>
	<app-layout>
		<div>
			<router-link to="/">Home</router-link>
			<router-link to="/login">Login</router-link>
		</div>
		<router-view></router-view>
	</app-layout>
</template>

<script>
import AppLayout from '@/layouts/app-layout.vue';

export default {
	name: 'App',

	components: {
		AppLayout,
	},

	data: () => ({
		//
	}),
};
</script>

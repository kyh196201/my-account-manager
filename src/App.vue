<template>
	<app-layout>
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

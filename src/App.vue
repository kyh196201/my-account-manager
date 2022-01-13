<template>
	<app-layout>
		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
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

<style lang="scss" scoped>
// transition
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}
</style>

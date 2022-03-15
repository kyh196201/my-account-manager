<template>
	<v-app>
		<app-layout>
			<transition name="fade" mode="out-in">
				<router-view></router-view>
			</transition>
		</app-layout>
	</v-app>
</template>

<script>
import { provide } from '@vue/composition-api';

// Components
import AppLayout from '@/layouts/app-layout.vue';

export default {
	name: 'App',

	components: {
		AppLayout,
	},

	computed: {
		// 로그인 페이지에 있는지 여부
		isLoginPage() {
			return this.$route.name === 'Login';
		},
	},

	setup(_, { root }) {
		// https://stackoverflow.com/questions/68848942/how-to-call-a-custom-global-function-using-composition-api-vue3
		provide('$dayjs', root.$dayjs);
	},
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

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

// Auth
import auth, { onAuthStateChanged } from '@/libraries/firebase/auth';

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

	created() {
		const unsubscribe = onAuthStateChanged(
			auth,
			async user => {
				// 로그인 성공
				if (user) {
					console.log(user);
					this.setAuth(user);

					if (this.isLoginPage) {
						this.$router.push({
							name: 'Daily',
						});
					}

					this.fetchData();

					unsubscribe();
				}
			},
			error => {
				console.error(error);
				unsubscribe();
			},
		);
	},

	setup(_, { root }) {
		// https://stackoverflow.com/questions/68848942/how-to-call-a-custom-global-function-using-composition-api-vue3
		provide('$dayjs', root.$dayjs);
	},

	methods: {
		// 거래 내역 조회
		async fetchData() {
			return await this.$store.dispatch('transactions/GET_TRANSACTIONS');
		},

		setAuth(user) {
			this.$store.dispatch('auth/SET_AUTH', user);
		},
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

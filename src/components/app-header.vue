<template>
	<header
		class="header"
		:style="{
			'background-color': themeColor,
		}"
	>
		<div class="header__inner">
			<div class="header__date">
				<DateNavigator></DateNavigator>
			</div>
			<nav class="header__nav">
				<button
					v-if="isAuthenticated"
					type="button"
					class="header__signout"
					@click="handleSignout()"
				>
					<span>로그아웃</span>
				</button>
				<!-- <ul class="header__icons">
					<li class="header__icon">
						<v-btn icon>
							<v-icon small color="white">fas fa-search</v-icon>
						</v-btn>
					</li>
					<li class="header__icon">
						<v-btn icon>
							<v-icon small color="white">fas fa-filter</v-icon>
						</v-btn>
					</li>
				</ul> -->
			</nav>
		</div>
		<!-- <div>
			<router-link to="/login">로그인하기</router-link>
			<router-link to="/home">홈 페이지로</router-link>
		</div> -->
	</header>
</template>

<script>
import DateNavigator from '@/components/common/date-navigator.vue';

import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('auth');

export default {
	name: 'AppHeader',

	components: {
		DateNavigator,
	},

	computed: {
		isAuthenticated() {
			return this.$store.getters['auth/isAuthenticated'];
		},
	},

	methods: {
		...mapActions(['SIGN_OUT']),

		async handleSignout() {
			try {
				await this.SIGN_OUT();

				this.$store.commit('auth/SIGN_OUT');

				window.location.reload();

				// TODO: 재 로그인 안됨
				// this.$router.push('/login');
			} catch (error) {
				if (error instanceof Error) {
					alert(error.message);
				}
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.header {
	padding: 1rem 2rem;
	font-size: 2rem;
	text-align: center;

	&__inner {
		display: flex;
	}

	// #region nav
	&__nav {
		flex: 1;
		display: flex;
		justify-content: flex-end;
	}

	&__signout {
		color: $black-color;
		font-weight: bold;
	}

	&__icons {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding: 0;
	}

	&__icon {
		button {
			width: 3.6rem;
			height: 3.6rem;

			.v-icon {
				font-size: 1.8rem !important;
			}
		}
	}
	// #endregion
}
</style>

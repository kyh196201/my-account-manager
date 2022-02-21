<template>
	<section class="login-page">
		<div class="login-page__inner">
			<h2 class="login-page__title">
				<figure class="login-page__logo">
					<img :src="logo" alt="로고" />
				</figure>
				<span>나만의 가계부</span>
			</h2>
			<div class="login-page__providers">
				<h3 class="providers__title">간편 로그인하기</h3>

				<ul class="providers__list">
					<li class="providers__item">
						<button
							class="provider-button github"
							type="button"
							disabled
						>
							<span class="provider-button__title">GitHub</span>
						</button>
					</li>
					<li class="providers__item">
						<button
							class="provider-button google"
							type="button"
							@click="GOOGLE_SIGNIN()"
						>
							<span class="provider-button__title">Google</span>
						</button>
					</li>
					<li class="providers__item">
						<button
							class="provider-button kakao"
							type="button"
							disabled
						>
							<span class="provider-button__title">Kakao</span>
						</button>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>

<script>
import logo from '@/assets/images/icons8-book.png';

import { createNamespacedHelpers } from 'vuex';

// Vuex Modules
const { mapActions } = createNamespacedHelpers('auth');

export default {
	name: 'LoginPage',

	data() {
		return {
			logo,
		};
	},

	methods: {
		...mapActions(['GOOGLE_SIGNIN']),
	},
};
</script>

<style lang="scss" scoped>
@import '@/scss/views/login-page.scss';
</style>

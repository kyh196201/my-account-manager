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
						<button class="provider-button github" type="button">
							<span class="provider-button__title">GitHub</span>
						</button>
					</li>
					<li class="providers__item">
						<button class="provider-button google" type="button">
							<span class="provider-button__title">Google</span>
						</button>
					</li>
					<li class="providers__item">
						<button class="provider-button kakao" type="button">
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

export default {
	name: 'LoginPage',

	data() {
		return {
			logo,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/scss/views/login-page.scss';
</style>

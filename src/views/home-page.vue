<template>
	<section class="home">
		<!-- #region 헤더 -->
		<header class="home__header">
			<nav class="home__nav" :style="{ 'background-color': themeColor }">
				<NavList></NavList>
			</nav>

			<!-- 수입, 지출, 합계 -->
			<div class="home__counter">
				<!-- TODO 컴포넌트로 분리하기 -->
				<div class="counter__box">
					<span class="counter__title">수입</span>
					<strong class="counter__ammount income">0</strong>
				</div>
				<div class="counter__box">
					<span class="counter__title">지출</span>
					<strong class="counter__ammount outcome">197,200</strong>
				</div>
				<div class="counter__box">
					<span class="counter__title">합계</span>
					<strong class="counter__ammount">-197,200</strong>
				</div>
			</div>
		</header>
		<!-- #endregion -->

		<div class="home__content">
			<!-- https://kr.vuejs.org/v2/guide/transitions.html#%ED%8A%B8%EB%9E%9C%EC%A7%80%EC%85%98-%EB%AA%A8%EB%93%9C -->
			<transition name="fade" mode="out-in">
				<router-view></router-view>
			</transition>
		</div>

		<v-btn
			icon
			fab
			elevation="2"
			color="white"
			class="home__plus-btn"
			@click="modalOpen = true"
		>
			<v-icon small>fas fa-plus</v-icon>
		</v-btn>

		<AddTransaction
			v-if="modalOpen"
			@close="modalOpen = false"
		></AddTransaction>
	</section>
</template>

<script>
import { ref, computed } from '@vue/composition-api';

// components
import NavList from '../components/home/nav-list.vue';

// modals
import AddTransaction from '../components/home/add-transaction.vue';

export default {
	name: 'HomePage',

	components: {
		NavList,
		AddTransaction,
	},

	setup(props, { root }) {
		// 메인 컬러
		const themeColor = computed(() => root.$store.getters.themeColor);

		// 입력 모달 open
		const modalOpen = ref(false);

		return {
			themeColor,
			modalOpen,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/scss/views/home-page.scss';
</style>
